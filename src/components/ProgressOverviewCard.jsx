import React, { useState } from 'react';
import { 
  TrendingUp, 
  Target, 
  Star, 
  Clock, 
  FileText, 
  HelpCircle,
  ChevronDown
} from 'lucide-react';

export default function ProgressOverviewCard({ history = [] }) {
  const [selectedRange, setSelectedRange] = useState('Last 7 Attempts');

  // Realistic sample points matching screenshot or user history
  const dataPoints = [
    { date: 'Apr 20', val: 48 },
    { date: 'Apr 21', val: 48 },
    { date: 'Apr 22', val: 60 },
    { date: 'Apr 23', val: 60 },
    { date: 'Apr 24', val: 74 },
    { date: 'Apr 25', val: 76 },
    { date: 'Apr 26', val: 87 }
  ];

  const totalInterviews = history && history.length > 0 ? history.length : 5;
  const avgScore = history && history.length > 0 
    ? Math.round((history.reduce((a, b) => a + (b.overallScore || 7.8), 0) / history.length) * 10) 
    : 78;
  const bestScore = history && history.length > 0 
    ? Math.round(Math.max(...history.map(h => h.overallScore || 0)) * 10) 
    : 92;
  const streakDays = 2;
  const overallScoreVal = 78;

  // Graph coordinate calculations
  const svgWidth = 320;
  const svgHeight = 145;
  const padLeft = 32;
  const padRight = 14;
  const padTop = 14;
  const padBottom = 25;

  const chartW = svgWidth - padLeft - padRight;
  const chartH = svgHeight - padTop - padBottom;

  const yTicks = [100, 80, 60, 40, 20, 0];

  const points = dataPoints.map((dp, i) => {
    const x = padLeft + (i / (dataPoints.length - 1)) * chartW;
    const y = padTop + (1 - dp.val / 100) * chartH;
    return { ...dp, x, y };
  });

  // Build SVG path
  const pathD = points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = points[i - 1];
    const cx = (prev.x + p.x) / 2;
    return `${acc} C ${cx} ${prev.y}, ${cx} ${p.y}, ${p.x} ${p.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${padTop + chartH} L ${points[0].x} ${padTop + chartH} Z`;

  // Circular gauge calculations
  const radius = 38;
  const circumference = 2 * Math.PI * radius; // ~238.76
  const strokeDashoffset = circumference - (overallScoreVal / 100) * circumference;

  return (
    <div style={{
      marginTop: '1.25rem',
      backgroundColor: '#070E1C',
      border: '1px solid #1E293B',
      borderRadius: '14px',
      padding: '1.25rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      boxShadow: '0 4px 20px rgba(0,0,0,0.25)'
    }}>
      {/* 1. Header with 3 cyan vertical bars */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2.5px', height: '22px', flexShrink: 0 }}>
          <div style={{ width: '4.5px', height: '12px', backgroundColor: '#06B6D4', borderRadius: '3px' }}></div>
          <div style={{ width: '4.5px', height: '20px', backgroundColor: '#06B6D4', borderRadius: '3px' }}></div>
          <div style={{ width: '4.5px', height: '15px', backgroundColor: '#06B6D4', borderRadius: '3px' }}></div>
        </div>
        <div>
          <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#F8FAFC', margin: 0, lineHeight: 1.2 }}>
            Your Progress Overview
          </h4>
          <p style={{ fontSize: '0.8rem', color: '#94A3B8', margin: '0.2rem 0 0 0' }}>
            Track your performance and improvement over time
          </p>
        </div>
      </div>

      {/* 2. Top Row: Line Graph & Circular Gauge */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.45fr 1fr',
        gap: '0.75rem'
      }}>
        {/* Left Card: Average Score Trend */}
        <div style={{
          backgroundColor: '#0B1222',
          border: '1px solid #1E293B',
          borderRadius: '10px',
          padding: '0.85rem 0.85rem 0.65rem 0.85rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          {/* Card Header with Dropdown */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#F8FAFC' }}>
              Average Score Trend
            </span>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: '#111C33',
              border: '1px solid #334155',
              borderRadius: '9999px',
              padding: '0.2rem 0.55rem',
              fontSize: '0.7rem',
              color: '#CBD5E1',
              cursor: 'pointer'
            }}>
              <span>{selectedRange}</span>
              <ChevronDown size={11} style={{ color: '#94A3B8' }} />
            </div>
          </div>

          {/* SVG Line Chart */}
          <div style={{ width: '100%', overflow: 'hidden' }}>
            <svg width="100%" height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ overflow: 'visible' }}>
              <defs>
                <linearGradient id="cyanAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.02" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines & Y-axis labels */}
              {yTicks.map((tick) => {
                const yPos = padTop + (1 - tick / 100) * chartH;
                return (
                  <g key={tick}>
                    <text
                      x={padLeft - 6}
                      y={yPos + 3}
                      fill="#64748B"
                      fontSize="8.5"
                      textAnchor="end"
                      fontFamily="sans-serif"
                    >
                      {tick}
                    </text>
                    <line
                      x1={padLeft}
                      y1={yPos}
                      x2={padLeft + chartW}
                      y2={yPos}
                      stroke="#1E293B"
                      strokeWidth="1"
                    />
                  </g>
                );
              })}

              {/* Area Fill */}
              <path d={areaD} fill="url(#cyanAreaGradient)" />

              {/* Cyan Polyline */}
              <path
                d={pathD}
                fill="none"
                stroke="#06B6D4"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data Points & X-axis labels */}
              {points.map((p, idx) => (
                <g key={idx}>
                  {/* Point Circle */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="3.5"
                    fill="#06B6D4"
                    stroke="#0B1222"
                    strokeWidth="1.5"
                  />
                  {/* X Date Label */}
                  <text
                    x={p.x}
                    y={padTop + chartH + 15}
                    fill="#64748B"
                    fontSize="8.5"
                    textAnchor="middle"
                    fontFamily="sans-serif"
                  >
                    {p.date}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Right Card: Overall Score Circular Ring */}
        <div style={{
          backgroundColor: '#0B1222',
          border: '1px solid #1E293B',
          borderRadius: '10px',
          padding: '0.85rem 0.75rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          {/* Circular Donut Gauge */}
          <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 0.4rem auto' }}>
            <svg width="100" height="100" viewBox="0 0 100 100">
              {/* Background Track */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke="#132038"
                strokeWidth="7.5"
              />
              {/* Progress Ring */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke="#06B6D4"
                strokeWidth="7.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                style={{ transition: 'stroke-dashoffset 0.8s ease' }}
              />
            </svg>
            {/* Center Text */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '1.45rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1 }}>
                {overallScoreVal}%
              </span>
              <span style={{ fontSize: '0.65rem', color: '#94A3B8', marginTop: '2px', whiteSpace: 'nowrap' }}>
                Overall Score
              </span>
            </div>
          </div>

          {/* Readiness Text */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3.5px',
            fontSize: '0.78rem',
            color: '#CBD5E1',
            fontWeight: 500,
            marginTop: '0.2rem'
          }}>
            <span>Interview Readiness</span>
            <HelpCircle size={12} style={{ color: '#06B6D4' }} />
          </div>

          <div style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            color: '#06B6D4',
            marginTop: '0.2rem'
          }}>
            You're on track! Keep going!
          </div>
        </div>
      </div>

      {/* 3. Middle Row: 4 Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '0.65rem'
      }}>
        {/* Total Interviews */}
        <div style={{
          backgroundColor: '#0B1222',
          border: '1px solid #1E293B',
          borderRadius: '8px',
          padding: '0.85rem 0.5rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <FileText size={18} style={{ color: '#06B6D4' }} />
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', margin: '0.25rem 0 0.1rem 0' }}>
            {totalInterviews}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
            Total Interviews
          </div>
        </div>

        {/* Average Score */}
        <div style={{
          backgroundColor: '#0B1222',
          border: '1px solid #1E293B',
          borderRadius: '8px',
          padding: '0.85rem 0.5rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Star size={18} style={{ color: '#06B6D4', fill: '#06B6D4' }} />
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', margin: '0.25rem 0 0.1rem 0' }}>
            {avgScore}%
          </div>
          <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
            Average Score
          </div>
        </div>

        {/* Best Score */}
        <div style={{
          backgroundColor: '#0B1222',
          border: '1px solid #1E293B',
          borderRadius: '8px',
          padding: '0.85rem 0.5rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <TrendingUp size={18} style={{ color: '#06B6D4' }} />
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', margin: '0.25rem 0 0.1rem 0' }}>
            {bestScore}%
          </div>
          <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
            Best Score
          </div>
        </div>

        {/* Days Streak */}
        <div style={{
          backgroundColor: '#0B1222',
          border: '1px solid #1E293B',
          borderRadius: '8px',
          padding: '0.85rem 0.5rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Clock size={18} style={{ color: '#06B6D4' }} />
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', margin: '0.25rem 0 0.1rem 0' }}>
            {streakDays}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
            Days Streak
          </div>
        </div>
      </div>

      {/* 4. Bottom Motivation Banner */}
      <div style={{
        backgroundColor: '#0B1222',
        border: '1px solid #1E293B',
        borderRadius: '10px',
        padding: '0.75rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Target concentric ring badge */}
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '1.5px solid #06B6D4',
            backgroundColor: 'rgba(6, 182, 212, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Target size={22} style={{ color: '#06B6D4' }} />
          </div>
          <div style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#F8FAFC',
            lineHeight: 1.3
          }}>
            “Small steps every day<br />lead to big results.”
          </div>
        </div>

        {/* Right message with vertical divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          paddingLeft: '1rem',
          borderLeft: '1px solid #1E293B'
        }}>
          <div style={{ textAlign: 'left', fontSize: '0.78rem', lineHeight: 1.3 }}>
            <div style={{ color: '#38BDF8' }}>Keep practicing,</div>
            <div style={{ color: '#06B6D4', fontWeight: 600 }}>you're doing great!</div>
          </div>
        </div>
      </div>
    </div>
  );
}
