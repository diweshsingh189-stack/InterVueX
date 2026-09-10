import React from 'react';
import { 
  Trophy, 
  Target, 
  TrendingUp, 
  History, 
  PlayCircle, 
  BookOpen, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Clock,
  ChevronRight,
  BrainCircuit,
  Calendar
} from 'lucide-react';
import { TrendChart, RadarChart } from '../components/PerformanceChart';
import ReadinessScoreCard from '../components/ReadinessScoreCard';
import { formatDate, getScoreColor, getScoreLabel } from '../utils/formatters';

export default function Dashboard({ history = [], userProfile, onStartNew, onViewReport, onBrowseQuestions }) {
  // Compute analytics
  const totalInterviews = history.length;
  const avgScore = totalInterviews > 0
    ? Number((history.reduce((acc, h) => acc + (h.overallScore || 0), 0) / totalInterviews).toFixed(1))
    : 0;
  const bestScore = totalInterviews > 0
    ? Math.max(...history.map(h => h.overallScore || 0))
    : 0;

  // Aggregate dimension averages for radar
  const aggScores = {
    technical: 0,
    relevance: 0,
    clarity: 0,
    communication: 0,
    completeness: 0
  };

  if (totalInterviews > 0) {
    history.forEach(h => {
      const sc = h.scores || {};
      aggScores.technical += (sc.technical || 7);
      aggScores.relevance += (sc.relevance || 7);
      aggScores.clarity += (sc.clarity || 7);
      aggScores.communication += (sc.communication || 7);
      aggScores.completeness += (sc.completeness || 7);
    });
    Object.keys(aggScores).forEach(k => {
      aggScores[k] = Number((aggScores[k] / totalInterviews).toFixed(1));
    });
  } else {
    aggScores.technical = 8.0;
    aggScores.relevance = 8.2;
    aggScores.clarity = 7.8;
    aggScores.communication = 8.0;
    aggScores.completeness = 7.5;
  }

  const recentList = history.slice(0, 4);

  return (
    <div style={{ maxWidth: '1180px', margin: '0 auto', paddingBottom: '4rem' }}>
      {/* Welcome Banner */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span className="badge badge-cyan">Candidate Overview</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Target: {userProfile?.targetRole || 'Full Stack Developer'}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', color: 'var(--text-primary)', lineHeight: 1.25 }}>
            Welcome Back, {userProfile?.name || 'Engineer'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.35rem' }}>
            Track your interview progression, benchmark your rubric scores, and eliminate weak points.
          </p>
        </div>
      </div>

      {/* NEW: Interview Readiness Score & 7-Day Improvement Plan */}
      <ReadinessScoreCard 
        history={history} 
        userProfile={userProfile} 
        onStartPractice={onStartNew} 
      />

      {/* Top 4 Metric KPI Cards */}
      <div className="grid-4" style={{ marginBottom: '2rem' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--accent-cyan)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-cyan)'
          }}>
            <Target size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Total Sessions
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {totalInterviews}
            </div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--accent-cyan)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-cyan)'
          }}>
            <TrendingUp size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Average Score
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
              {avgScore} <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>/ 10</span>
            </div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--accent-cyan)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-cyan)'
          }}>
            <Trophy size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Best Score
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {bestScore} <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>/ 10</span>
            </div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)'
          }}>
            <History size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Readiness Status
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
              {avgScore >= 8.0 ? 'Interview Ready' : 'In Preparation'}
            </div>
          </div>
        </div>
      </div>

      {/* Center 2-Column: Performance Trend Line + Aggregate Skill Radar */}
      <div className="grid-2" style={{ marginBottom: '2rem' }}>
        {/* Trend line */}
        <div className="card">
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>Performance Trajectory</h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Score evolution over your recent simulation attempts.</p>
            </div>
            <span className="badge badge-cyan">Last 7 Sessions</span>
          </div>
          <TrendChart history={history} />
        </div>

        {/* Skill Radar */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="card-header" style={{ width: '100%' }}>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>Cumulative Skill Polygon</h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Average ratings across technical & behavioral pillars.</p>
          </div>
          <RadarChart scores={aggScores} size={250} />
        </div>
      </div>

      {/* Skills Matrix + Recommendations */}
      <div className="grid-3" style={{ marginBottom: '2rem' }}>
        {/* Strongest Skills */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '1rem' }}>
            <CheckCircle2 size={18} />
            <span>Strongest Skills</span>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem' }}>
            <li style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>Event Loop & Asynchronous JS</span>
              <strong style={{ color: 'var(--accent-cyan)' }}>9.2</strong>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>JWT & Web Security</span>
              <strong style={{ color: 'var(--accent-cyan)' }}>9.0</strong>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>SOLID Design Principles</span>
              <strong style={{ color: 'var(--accent-cyan)' }}>8.8</strong>
            </li>
          </ul>
        </div>

        {/* Weakest Skills */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontWeight: 700, marginBottom: '1rem' }}>
            <AlertCircle size={18} style={{ color: 'var(--accent-cyan)' }} />
            <span>Target Weak Points</span>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem' }}>
            <li style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>Cache Stampede Mitigation</span>
              <strong style={{ color: 'var(--text-primary)' }}>6.8</strong>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>Core Web Vitals INP/CLS</span>
              <strong style={{ color: 'var(--text-primary)' }}>7.1</strong>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>Thread-Safe Double-Checked Lock</span>
              <strong style={{ color: 'var(--text-primary)' }}>7.3</strong>
            </li>
          </ul>
        </div>

        {/* Recommended Practice */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '1rem' }}>
              <Sparkles size={18} />
              <span>Recommended Practice</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '1rem' }}>
              Complete a 5-question <strong>Backend Developer (Hard)</strong> simulation focusing on distributed caching and concurrency.
            </p>
          </div>
          <button
            onClick={onBrowseQuestions}
            className="btn btn-sm btn-outline"
            style={{ width: '100%', justifyContent: 'space-between' }}
          >
            <span>Browse Question Bank</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Recent Interviews Table */}
      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>Recent Interview Simulations</h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Click any session to view the full question-by-question report.</p>
          </div>
          <button onClick={() => onStartNew()} className="btn btn-sm btn-secondary">
            + New Attempt
          </button>
        </div>

        {recentList.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-dim)' }}>
            No interview records found. Start your first session above!
          </div>
        ) : (
          <div className="table-responsive">
            <table style={{ width: '100%', minWidth: '550px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>Date</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Role Track</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Round Type</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Difficulty</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Overall Score</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentList.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => onViewReport(item)}
                    style={{
                      borderBottom: '1px solid var(--border-subtle)',
                      cursor: 'pointer',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}>
                      {formatDate(item.date)}
                    </td>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {item.role}
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <span className="badge">{item.type}</span>
                    </td>
                    <td style={{ padding: '0.85rem 1rem', textTransform: 'capitalize', color: 'var(--text-muted)' }}>
                      {item.difficulty}
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <span style={{
                        color: 'var(--accent-cyan)',
                        fontWeight: 700,
                        backgroundColor: 'var(--accent-cyan-light)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid rgba(6, 182, 212, 0.3)'
                      }}>
                        {item.overallScore} / 10
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                      <button className="btn btn-sm btn-ghost" style={{ padding: '0.25rem 0.5rem', color: 'var(--accent-cyan)' }}>
                        Report <ChevronRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
