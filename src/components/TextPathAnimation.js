import "./styles/TextPathAnimation.css";

/**
 * CMR2-style text path animation.
 * Text moves along an SVG path outline like letters on a rally circuit.
 * Uses SVG <animate> on startOffset for smooth infinite scrolling.
 */

/* Each panel gets a unique SVG path that represents its theme */
const PANEL_PATHS = {
  /* Home — stylized house / starting grid shape */
  home: {
    viewBox: "0 0 400 350",
    d: "M200,30 L370,150 L370,320 L230,320 L230,220 L170,220 L170,320 L30,320 L30,150 Z",
  },
  /* Highlights — trophy / medal shape */
  highlights: {
    viewBox: "0 0 400 400",
    d: "M140,40 L260,40 L280,120 L320,120 L320,160 L280,160 L260,200 C260,280 330,300 330,340 L330,380 L70,380 L70,340 C70,300 140,280 140,200 L120,160 L80,160 L80,120 L120,120 Z",
  },
  /* Projects — gear / cog shape */
  projects: {
    viewBox: "0 0 400 400",
    d: "M175,30 L225,30 L235,70 L270,85 L305,60 L340,95 L315,130 L330,165 L370,175 L370,225 L330,235 L315,270 L340,305 L305,340 L270,315 L235,330 L225,370 L175,370 L165,330 L130,315 L95,340 L60,305 L85,270 L70,235 L30,225 L30,175 L70,165 L85,130 L60,95 L95,60 L130,85 L165,70 Z",
  },
  /* Contact — envelope / message shape */
  contact: {
    viewBox: "0 0 400 320",
    d: "M30,50 L200,180 L370,50 L370,270 L30,270 Z",
  },
};

function TextPathAnimation({ panelKey, text, onClick }) {
  const pathConfig = PANEL_PATHS[panelKey];
  const pathId = `cmr-path-${panelKey}`;

  /* Repeat text to fill the entire path length */
  const separator = " · ";
  const repeatedText = Array(12).fill(text).join(separator) + separator;

  if (!pathConfig) return null;

  return (
    <div
      className={`text-path-animation${onClick ? ' clickable' : ''}`}
      aria-hidden="true"
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter') onClick(); } : undefined}
    >
      <svg
        viewBox={pathConfig.viewBox}
        xmlns="http://www.w3.org/2000/svg"
        className="text-path-svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <path id={pathId} d={pathConfig.d} fill="none" />
        </defs>
        {/* Faint outline of the shape */}
        <path
          d={pathConfig.d}
          fill="none"
          stroke="rgba(249, 249, 248, 0.06)"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
        {/* Moving text along the path */}
        <text className="text-path-text">
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
      </svg>
    </div>
  );
}

export default TextPathAnimation;
