import { useEffect, useRef } from 'react';
import { useNavigation } from './NavigationContext';
import useSwipeGestures from './useSwipeGestures';
import './styles/Panel.css';

/* Fallback timeout slightly longer than the CSS transition (300ms) to ensure
   the animation-done event fires even when transitionend is missed */
const ANIMATION_FALLBACK_MS = 400;

function PanelContainer() {
  const { panels, activePanelIndex, isAnimating, onAnimationDone } = useNavigation();
  const trackRef = useRef(null);
  const viewportRef = useRef(null);

  useSwipeGestures(viewportRef);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    function handleTransitionEnd(e) {
      if (e.target === el) onAnimationDone();
    }
    el.addEventListener('transitionend', handleTransitionEnd);
    return () => el.removeEventListener('transitionend', handleTransitionEnd);
  }, [onAnimationDone]);

  useEffect(() => {
    if (isAnimating) {
      const id = setTimeout(onAnimationDone, ANIMATION_FALLBACK_MS);
      return () => clearTimeout(id);
    }
  }, [isAnimating, onAnimationDone]);

  return (
    <div className="panel-viewport" ref={viewportRef}>
      <div
        className={`panel-track${isAnimating ? ' is-sliding' : ''}`}
        ref={trackRef}
        style={{ transform: `translateX(-${activePanelIndex * 100}vw)` }}
      >
        {panels.map((PanelComponent, idx) => (
          <div
            className={`panel-slide${idx === activePanelIndex ? ' is-active' : ''}`}
            key={idx}
            aria-hidden={idx !== activePanelIndex}
            inert={idx !== activePanelIndex ? "" : undefined}
          >
            <PanelComponent />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PanelContainer;
