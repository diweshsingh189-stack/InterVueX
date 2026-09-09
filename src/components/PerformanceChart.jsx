import React from 'react';

/**
 * Clean SVG Radar and Trend Charts (Zero heavy charting dependencies, strict 2-color theme)
 */

export function RadarChart({ scores = {}, size = 260 }) {
  const categories = [
    { key: 'technical', label: 'Technical' },
    { key: 'relevance', label: 'Relevance' },
    { key: 'clarity', label: 'Clarity' },
    { key: 'communication', label: 'Communication' },
    { key: 'completeness', label: 'Completeness' }
  ];

  const center = size / 2;
  const radius = (size / 2) - 35;
  const angleStep = (Math.PI * 2) / categories.length;

  // Grid levels (0.2, 0.4, 0.6, 0.8, 1.0)
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  // Calculate polygon points for candidate scores
  const scorePoints = categories.map((cat, i) => {
    const rawVal = scores[cat.key] || 7.0;
    const normalized = Math.max(0.1, Math.min(1.0, rawVal / 10));
    const angle = (i * angleStep) - (Math.PI / 2);
    const x = center + radius * normalized * Math.cos(angle);
    const y = center + radius * normalized * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background Grid Rings */}
        {levels.map((lvl) => {
          const ringPoints = categories.map((_, i) => {
            const angle = (i * angleStep) - (Math.PI / 2);
            const x = center + radius * lvl * Math.cos(angle);
            const y = center + radius * lvl * Math.sin(angle);
            return `${x},${y}`;
          }).join(' ');

          return (
            <polygon
              key={lvl}
              points={ringPoints}
              fill="none"
              stroke="var(--border-subtle)"
              strokeWidth="1"
              strokeDasharray={lvl === 1.0 ? 'none' : '3 3'}
            />
          );
        })}

        {/* Axes */}
        {categories.map((cat, i) => {
          const angle = (i * angleStep) - (Math.PI / 2);
          const x2 = center + radius * Math.cos(angle);
          const y2 = center + radius * Math.sin(angle);
          return (
            <line
              key={cat.key}
              x1={center}
              y1={center}
              x2={x2}
              y2={y2}
              stroke="var(--border-subtle)"
              strokeWidth="1"
            />
          );
        })}

        {/* Data Shape */}
        <polygon
          points={scorePoints}
          fill="rgba(6, 182, 212, 0.2)"
          stroke="var(--accent-cyan)"
          strokeWidth="2"
        />

        {/* Vertex Points & Labels */}
        {categories.map((cat, i) => {
          const rawVal = scores[cat.key] || 7.0;
          const normalized = Math.max(0.1, Math.min(1.0, rawVal / 10));
          const angle = (i * angleStep) - (Math.PI / 2);
          const px = center + radius * normalized * Math.cos(angle);
          const py = center + radius * normalized * Math.sin(angle);

          // Label positions (slightly outside)
          const lx = center + (radius + 20) * Math.cos(angle);
          const ly = center + (radius + 20) * Math.sin(angle);

          return (
            <g key={cat.key}>
              <circle cx={px} cy={py} r="4" fill="var(--accent-cyan)" />
              <text
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="central"
                fill="var(--text-secondary)"
                fontSize="10"
                fontWeight="600"
              >
                {cat.label} ({rawVal})
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function TrendChart({ history = [] }) {
  if (!history || history.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.875rem' }}>
        No past sessions recorded yet.
      </div>
    );
  }

  // Reverse so oldest is left, latest is right
  const data = [...history].reverse().slice(-7);
  const width = 450;
  const height = 150;
  const padX = 35;
  const padY = 25;

  const stepX = data.length > 1 ? (width - padX * 2) / (data.length - 1) : 0;

  const points = data.map((d, i) => {
    const x = padX + (i * stepX);
    // score 0 to 10 mapped to height - padY down to padY
    const y = (height - padY) - ((d.overallScore / 10) * (height - padY * 2));
    return { x, y, score: d.overallScore, date: d.date, role: d.role };
  });

  const polylineStr = points.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ minWidth: '320px' }}>
        {/* Horizontal grid lines for scores 5.0, 7.5, 10.0 */}
        {[5, 7.5, 10].map(score => {
          const y = (height - padY) - ((score / 10) * (height - padY * 2));
          return (
            <g key={score}>
              <line x1={padX} y1={y} x2={width - padX} y2={y} stroke="var(--border-subtle)" strokeDasharray="3 3" />
              <text x={padX - 8} y={y + 3} fill="var(--text-dim)" fontSize="9" textAnchor="end">{score}</text>
            </g>
          );
        })}

        {/* Score Trend Line */}
        <polyline
          points={polylineStr}
          fill="none"
          stroke="var(--accent-cyan)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {points.map((p, idx) => (
          <g key={idx}>
            <circle cx={p.x} cy={p.y} r="5" fill="var(--bg-primary)" stroke="var(--accent-cyan)" strokeWidth="2" />
            <text x={p.x} y={p.y - 10} fill="var(--text-primary)" fontSize="10" fontWeight="700" textAnchor="middle">
              {p.score}
            </text>
            <text x={p.x} y={height - 6} fill="var(--text-dim)" fontSize="8.5" textAnchor="middle">
              #{idx + 1}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
