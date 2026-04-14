import { useEffect, useRef } from 'react';
import { useNavigation } from './NavigationContext';

const SWIPE_THRESHOLD = 50;
const SWIPE_DISTANCE_THRESHOLD = 100;
const SWIPE_VELOCITY_THRESHOLD = 0.3;

/**
 * Touch gesture navigation:
 * - Swipe left  → next section
 * - Swipe right → previous section (or close content / go back)
 */
export default function useSwipeGestures(containerRef) {
  const {
    activePanelIndex,
    panelCount,
    contentOpen,
    goToPanel,
    closeContent,
  } = useNavigation();

  const touchRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function onTouchStart(e) {
      if (e.touches.length !== 1) return;
      const touch = e.touches[0];
      touchRef.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        startTime: Date.now(),
      };
    }

    function onTouchEnd(e) {
      if (!touchRef.current) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - touchRef.current.startX;
      const dy = touch.clientY - touchRef.current.startY;
      const dt = Date.now() - touchRef.current.startTime;
      touchRef.current = null;

      // Only count horizontal swipes (ignore vertical scrolls)
      if (Math.abs(dy) > Math.abs(dx)) return;
      if (Math.abs(dx) < SWIPE_THRESHOLD) return;

      const velocity = Math.abs(dx) / dt;
      if (velocity < SWIPE_VELOCITY_THRESHOLD && Math.abs(dx) < SWIPE_DISTANCE_THRESHOLD) return;

      if (dx < 0) {
        // Swipe left → next section
        if (!contentOpen) {
          goToPanel((activePanelIndex + 1) % panelCount);
        }
      } else {
        // Swipe right → previous section or close content
        if (contentOpen) {
          closeContent();
        } else {
          goToPanel((activePanelIndex - 1 + panelCount) % panelCount);
        }
      }
    }

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [containerRef, activePanelIndex, panelCount, contentOpen, goToPanel, closeContent]);
}
