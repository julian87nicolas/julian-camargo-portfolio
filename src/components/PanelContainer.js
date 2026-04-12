import { useEffect, useRef } from 'react';
import { useNavigation } from './NavigationContext';
import './styles/Panel.css';

/**
 * PanelContainer renders all panels and handles horizontal slide transitions.
 * Only the active panel is interactive; neighbors are translated off-screen.
 */
function PanelContainer() {
  const { panels, activePanelIndex, direction, isAnimating, onAnimationDone } = useNavigation();
  const trackRef = useRef(null);

  // Mark animation done after CSS transition ends
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    function handleTransitionEnd(e) {
      if (e.target === el) {
        onAnimationDone();
      }
    }
    el.addEventListener('transitionend', handleTransitionEnd);
    return () => el.removeEventListener('transitionend', handleTransitionEnd);
  }, [onAnimationDone]);

  // Fallback: if no transitionend fires (e.g. first render), clear after timeout
  useEffect(() => {
    if (isAnimating) {
      const id = setTimeout(onAnimationDone, 400);
      return () => clearTimeout(id);
    }
  }, [isAnimating, onAnimationDone]);

  return (
    <div className="panel-viewport">
      <div
        className={`panel-track${isAnimating ? ' is-sliding' : ''}`}
        ref={trackRef}
        style={{ transform: `translateX(-${activePanelIndex * 100}vw)` }}
        data-direction={direction}
      >
        {panels.map((PanelComponent, idx) => (
          <div
            className={`panel-slide${idx === activePanelIndex ? ' is-active' : ''}`}
            key={idx}
            aria-hidden={idx !== activePanelIndex}
            inert={idx !== activePanelIndex ? '' : undefined}
          >
            <PanelComponent />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PanelContainer;
