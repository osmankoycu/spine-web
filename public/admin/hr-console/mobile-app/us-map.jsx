// US tile cartogram - square tile per state, FiveThirtyEight-style layout
// Each entry: [code, col, row]
const US_TILES = [
  ["ME", 10, 0],
  ["VT", 9, 1], ["NH", 10, 1],
  ["WA", 0, 2], ["ID", 1, 2], ["MT", 2, 2], ["ND", 3, 2], ["MN", 4, 2], ["WI", 6, 2], ["MI", 8, 2], ["NY", 9, 2], ["MA", 10, 2],
  ["OR", 0, 3], ["NV", 1, 3], ["WY", 2, 3], ["SD", 3, 3], ["IA", 4, 3], ["IL", 5, 3], ["IN", 6, 3], ["OH", 7, 3], ["PA", 8, 3], ["NJ", 9, 3], ["CT", 10, 3], ["RI", 11, 3],
  ["CA", 0, 4], ["UT", 1, 4], ["CO", 2, 4], ["NE", 3, 4], ["MO", 4, 4], ["KY", 5, 4], ["WV", 6, 4], ["VA", 7, 4], ["MD", 8, 4], ["DE", 9, 4],
  ["AZ", 1, 5], ["NM", 2, 5], ["KS", 3, 5], ["AR", 4, 5], ["TN", 5, 5], ["NC", 6, 5], ["SC", 7, 5], ["DC", 8, 5],
  ["AK", 0, 6], ["OK", 3, 6], ["LA", 4, 6], ["MS", 5, 6], ["AL", 6, 6], ["GA", 7, 6],
  ["HI", 0, 7], ["TX", 3, 7], ["FL", 7, 7],
];

// Render a tile cartogram. `valueFor(code)` returns numeric value; intensity 0..1 = value/max.
function USTileMap({ valueFor, names, max, colorFor }) {
  const TILE = 44;
  const GAP = 5;
  const COLS = 12;
  const ROWS = 8;
  const W = COLS * TILE + (COLS - 1) * GAP;
  const H = ROWS * TILE + (ROWS - 1) * GAP;

  return (
    <svg className="us-tile-map" viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto' }}>
      {US_TILES.map(([code, c, r]) => {
        const v = valueFor(code) || 0;
        const x = c * (TILE + GAP);
        const y = r * (TILE + GAP);
        const fill = colorFor(v);
        const isData = v > 0;
        const textColor = isData && v / max > 0.45 ? '#07090F' : 'var(--text-tertiary)';
        return (
          <g key={code}>
            <rect x={x} y={y} width={TILE} height={TILE} rx="7" fill={fill} stroke="var(--border-subtle)" strokeWidth="0.5">
              <title>{(names && names[code]) || code}: {v}</title>
            </rect>
            <text
              x={x + TILE / 2}
              y={y + TILE / 2 - 4}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fontFamily="Inter"
              fill={textColor}
              style={{ pointerEvents: 'none', letterSpacing: '0.04em' }}
            >
              {code}
            </text>
            {isData && (
              <text
                x={x + TILE / 2}
                y={y + TILE / 2 + 10}
                textAnchor="middle"
                fontSize="10.5"
                fontWeight="600"
                fontFamily="Inter"
                fill={textColor}
                style={{ pointerEvents: 'none', fontVariantNumeric: 'tabular-nums' }}
              >
                {v}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

window.US_TILES = US_TILES;
window.USTileMap = USTileMap;
