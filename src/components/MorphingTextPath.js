import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigation } from './NavigationContext';
import './styles/MorphingTextPath.css';

/**
 * Morphing SVG text-path animation.
 * - Text fills the entire path as a closed loop (no gaps).
 * - When navigating between panels, the shape morphs smoothly.
 * - Uses getPointAtLength() to sample paths, then interpolates.
 */

/* All shapes normalized to viewBox 0 0 400 400 */
const SHAPE_PATHS = {
  home: "M200,55 L370,175 L370,345 L230,345 L230,245 L170,245 L170,345 L30,345 L30,175 Z",
  highlights: "M140,40 L260,40 L280,120 L320,120 L320,160 L280,160 L260,200 C260,280 330,300 330,340 L330,380 L70,380 L70,340 C70,300 140,280 140,200 L120,160 L80,160 L80,120 L120,120 Z",
  projects: "M175,30 L225,30 L235,70 L270,85 L305,60 L340,95 L315,130 L330,165 L370,175 L370,225 L330,235 L315,270 L340,305 L305,340 L270,315 L235,330 L225,370 L175,370 L165,330 L130,315 L95,340 L60,305 L85,270 L70,235 L30,225 L30,175 L70,165 L85,130 L60,95 L95,60 L130,85 L165,70 Z",
  contact: "M30,90 L200,220 L370,90 L370,310 L30,310 Z",
};

const PANEL_KEYS = ['home', 'highlights', 'projects', 'contact'];
const NUM_SAMPLES = 128;
/* Repeat text enough times to fill even the longest path (gear) with no gaps */
const TEXT_REPETITIONS = 14;

function samplePath(pathEl, numSamples) {
  const totalLen = pathEl.getTotalLength();
  const points = [];
  for (let i = 0; i < numSamples; i++) {
    const p = pathEl.getPointAtLength((i / numSamples) * totalLen);
    points.push([p.x, p.y]);
  }
  return points;
}

function pointsToPath(points) {
  if (!points || points.length === 0) return '';
  let d = `M${points[0][0].toFixed(2)},${points[0][1].toFixed(2)}`;
  for (let i = 1; i < points.length; i++) {
    d += ` L${points[i][0].toFixed(2)},${points[i][1].toFixed(2)}`;
  }
  d += ' Z';
  return d;
}

function interpolatePoints(from, to, t) {
  return from.map((pt, i) => [
    pt[0] + (to[i][0] - pt[0]) * t,
    pt[1] + (to[i][1] - pt[1]) * t,
  ]);
}

/* ease-in-out quadratic */
function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function MorphingTextPath({ text }) {
  const { activePanelIndex, contentOpen, openContent } = useNavigation();
  const samplerRef = useRef(null);
  const [sampledPaths, setSampledPaths] = useState(null);
  const [currentPath, setCurrentPath] = useState('');
  const animRef = useRef(null);
  const prevPanelRef = useRef(0);

  /* Sample all paths on mount using a hidden SVG element */
  useEffect(() => {
    const svg = samplerRef.current;
    if (!svg) return;
    const pathEl = svg.querySelector('path');
    /* getPointAtLength may not exist in test environments (jsdom) */
    if (!pathEl || typeof pathEl.getTotalLength !== 'function') {
      /* Fallback: use the raw path strings directly without morphing */
      setCurrentPath(SHAPE_PATHS[PANEL_KEYS[0]]);
      return;
    }
    const sampled = {};
    for (const key of PANEL_KEYS) {
      pathEl.setAttribute('d', SHAPE_PATHS[key]);
      sampled[key] = samplePath(pathEl, NUM_SAMPLES);
    }
    setSampledPaths(sampled);
    setCurrentPath(pointsToPath(sampled[PANEL_KEYS[0]]));
  }, []);

  /* Morph animation when active panel changes */
  useEffect(() => {
    const fromKey = PANEL_KEYS[prevPanelRef.current];
    const toKey = PANEL_KEYS[activePanelIndex];
    prevPanelRef.current = activePanelIndex;

    if (fromKey === toKey) return;

    /* If sampledPaths not available (test env), just swap the raw path */
    if (!sampledPaths) {
      setCurrentPath(SHAPE_PATHS[toKey]);
      return;
    }

    const from = sampledPaths[fromKey];
    const to = sampledPaths[toKey];
    const duration = 300;
    const start = performance.now();

    if (animRef.current) cancelAnimationFrame(animRef.current);

    function animate(now) {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = easeInOut(t);
      const interpolated = interpolatePoints(from, to, eased);
      setCurrentPath(pointsToPath(interpolated));
      if (t < 1) {
        animRef.current = requestAnimationFrame(animate);
      }
    }
    animRef.current = requestAnimationFrame(animate);

    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [activePanelIndex, sampledPaths]);

  const handleClick = useCallback(() => {
    if (!contentOpen) openContent();
  }, [contentOpen, openContent]);

  const repeatedText = useMemo(() => {
    const separator = " \u00B7 ";
    return Array(TEXT_REPETITIONS).fill(text).join(separator) + separator;
  }, [text]);
  const pathId = "cmr-morph-path";

  return (
    <>
      {/* Hidden SVG used only for sampling path lengths */}
      <svg
        ref={samplerRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 400"
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', pointerEvents: 'none' }}
      >
        <path d="" fill="none" />
      </svg>

      <div
        className={`morph-text-path${contentOpen ? ' content-open' : ' preview-mode'}`}
        aria-hidden="true"
        onClick={handleClick}
        role={!contentOpen ? "button" : undefined}
        tabIndex={!contentOpen ? 0 : undefined}
      >
        <svg
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
          className="morph-svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <path id={pathId} d={currentPath} fill="none" />
          </defs>
          {/* Faint outline of the shape */}
          <path
            d={currentPath}
            fill="none"
            stroke="rgba(249, 249, 248, 0.06)"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
          {/* Two text elements offset by 50% to create a seamless closed loop */}
          <text className="morph-text">
            <textPath href={`#${pathId}`} startOffset="0%">
              <animate
                attributeName="startOffset"
                from="0%"
                to="100%"
                dur="25s"
                repeatCount="indefinite"
              />
              {repeatedText}
            </textPath>
          </text>
          <text className="morph-text">
            <textPath href={`#${pathId}`} startOffset="-100%">
              <animate
                attributeName="startOffset"
                from="-100%"
                to="0%"
                dur="25s"
                repeatCount="indefinite"
              />
              {repeatedText}
            </textPath>
          </text>
        </svg>
      </div>
    </>
  );
}

export default MorphingTextPath;
