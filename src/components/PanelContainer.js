import { useEffect, useRef } from 'react';
import { useNavigation } from './NavigationContext';
import './styles/Panel.css';

function PanelContainer() {
  const { panels, activePanelIndex, isAnimating, onAnimationDone } = useNavigation();
  const trackRef = useRef(null);

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
