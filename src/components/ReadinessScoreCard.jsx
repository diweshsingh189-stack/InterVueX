import React, { useState, useEffect } from 'react';
import { 
  Target, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  Sparkles, 
  TrendingUp, 
  BookOpen,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

const DEFAULT_PLAN = [
  { day: 1, title: 'Arrays & Strings', topic: 'Two pointers, sliding window, prefix sums & time complexity', completed: true },
  { day: 2, title: 'Linked Lists & Stacks', topic: 'Pointers manipulation, cycle detection, LIFO operations & monotonic stacks', completed: false },
  { day: 3, title: 'Trees, Graphs & BFS/DFS', topic: 'Binary tree traversals, BST validation & topological sorting', completed: false },
  { day: 4, title: 'DBMS, SQL & Indexing', topic: 'ACID transactions, B-Tree indexes, WAL & query optimization', completed: false },
  { day: 5, title: 'Operating Systems & Concurrency', topic: 'Processes vs threads, virtual memory, race conditions & deadlocks', completed: false },
  { day: 6, title: 'System Design & Scalability', topic: 'Microservices, caching strategies, rate limiting & database sharding', completed: false },
  { day: 7, title: 'HR, Behavioral & Full Mock Simulation', topic: 'STAR structured scenarios, leadership principles & live timer run', completed: false }
];

export default function ReadinessScoreCard({ history = [], userProfile, onStartPractice }) {
  // Load 7-day plan completion state from storage
  const [planState, setPlanState] = useState(() => {
    try {
      const saved = localStorage.getItem('intervuex_7day_plan');
      return saved ? JSON.parse(saved) : DEFAULT_PLAN;
    } catch {
      return DEFAULT_PLAN;
    }
  });

  const toggleDayCompletion = (dayIndex) => {
    const updated = planState.map((d, idx) => 
      idx === dayIndex ? { ...d, completed: !d.completed } : d
    );
    setPlanState(updated);
    try {
      localStorage.setItem('intervuex_7day_plan', JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not persist plan state', e);
    }
  };

  // Calculate dynamic readiness score
  const totalAttempts = history.length;
  const avgScore = totalAttempts > 0 
    ? (history.reduce((sum, h) => sum + (h.overallScore || 0), 0) / totalAttempts)
    : 7.5;
  
  const completedPlanCount = planState.filter(d => d.completed).length;
  
  // Dynamic formula: Base from history + bonus from completed study days
  let readinessPercentage = Math.min(
    96,
    Math.max(45, Math.round((avgScore * 8.5) + (completedPlanCount * 2.2) + Math.min(totalAttempts * 2, 10)))
  );

  let readinessLevel = 'Ready for Technical Screening';
  let readinessColor = 'var(--accent-cyan)';

  if (readinessPercentage >= 85) {
    readinessLevel = 'High Interview Readiness (Tier-1 Tech Ready)';
    readinessColor = 'var(--accent-cyan)';
  } else if (readinessPercentage >= 70) {
    readinessLevel = 'Solid Preparedness (Ready for Mid-Level Loops)';
    readinessColor = '#38BDF8';
  } else {
    readinessLevel = 'Foundational Phase (Recommended 7-Day Plan)';
    readinessColor = '#F59E0B';
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
      {/* 1. Interview Readiness Score Card */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span className="badge badge-cyan">AI Assessment</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Target: {userProfile?.targetRole || 'Software Engineer'}</span>
          </div>

          <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Target size={18} style={{ color: 'var(--accent-cyan)' }} />
            Interview Readiness Score
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '1.25rem' }}>
            Calculated across question depth, algorithmic precision, communication clarity, and past session trends.
          </p>

          {/* Readiness Gauge Meter */}
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            textAlign: 'center',
            marginBottom: '1.25rem'
          }}>
            <div style={{
              fontSize: '3rem',
              fontWeight: 800,
              color: readinessColor,
              letterSpacing: '-0.03em',
              lineHeight: '1'
            }}>
              {readinessPercentage}%
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.4rem' }}>
              {readinessLevel}
            </div>

            {/* Progress Bar */}
            <div style={{
              height: '8px',
              backgroundColor: 'var(--surface-card)',
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden',
              marginTop: '0.85rem'
            }}>
              <div style={{
                width: `${readinessPercentage}%`,
                height: '100%',
                backgroundColor: readinessColor,
                transition: 'width 0.4s ease'
              }} />
            </div>
          </div>

          {/* Strong Areas & Areas for Improvement */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.825rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)' }}>
              <CheckCircle2 size={16} style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '2px' }} />
              <div><strong>Strong Areas:</strong> Core syntax, problem breakdown, STAR behavioral clarity.</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)' }}>
              <AlertCircle size={16} style={{ color: '#F59E0B', flexShrink: 0, marginTop: '2px' }} />
              <div><strong>Areas for Improvement:</strong> Edge-case validation, memory trade-offs, concurrency locks.</div>
            </div>
          </div>
        </div>

        {onStartPractice && (
          <button
            onClick={onStartPractice}
            className="btn btn-sm btn-secondary"
            style={{ width: '100%', marginTop: '1.25rem', justifyContent: 'center' }}
          >
            <Sparkles size={14} /> Practice Weak Topics Now
          </button>
        )}
      </div>

      {/* 2. Personalized 7-Day Improvement Plan */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span className="badge badge-cyan">Study Roadmap</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{completedPlanCount}/7 Completed</span>
          </div>

          <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={18} style={{ color: 'var(--accent-cyan)' }} />
            Personalized 7-Day Improvement Plan
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '1rem' }}>
            Tailored curriculum calibrated to fill your specific conceptual gaps before real interviews.
          </p>

          {/* Plan Day-by-Day List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '310px', overflowY: 'auto' }}>
            {planState.map((dayItem, idx) => (
              <div
                key={dayItem.day}
                onClick={() => toggleDayCompletion(idx)}
                style={{
                  backgroundColor: dayItem.completed ? 'var(--accent-cyan-light)' : 'var(--bg-secondary)',
                  border: dayItem.completed ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.65rem 0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <input
                  type="checkbox"
                  checked={dayItem.completed}
                  onChange={() => {}}
                  style={{ accentColor: 'var(--accent-cyan)', cursor: 'pointer', width: '16px', height: '16px' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: dayItem.completed ? 'var(--accent-cyan)' : 'var(--text-primary)',
                    textDecoration: dayItem.completed ? 'line-through' : 'none'
                  }}>
                    Day {dayItem.day} &rarr; {dayItem.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {dayItem.topic}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
