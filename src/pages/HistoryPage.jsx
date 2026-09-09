import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Calendar, 
  ChevronRight, 
  Play, 
  Trash2, 
  Award, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { formatDate, formatTime, getScoreColor, getScoreLabel } from '../utils/formatters';

export default function HistoryPage({ history = [], onViewReport, onStartNew, onClearHistory }) {
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const filteredHistory = history.filter(item => {
    const matchesSearch = item.role.toLowerCase().includes(search.toLowerCase()) ||
                          item.type.toLowerCase().includes(search.toLowerCase()) ||
                          (item.summary && item.summary.toLowerCase().includes(search.toLowerCase()));
    const matchesRole = filterRole === 'all' || item.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const uniqueRoles = Array.from(new Set(history.map(h => h.role)));

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '4rem' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div>
          <span className="badge badge-cyan" style={{ marginBottom: '0.4rem' }}>Historical Archive</span>
          <h1 style={{ fontSize: '2.2rem', color: 'var(--text-primary)' }}>Interview Simulation History</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Review past transcripts, performance trajectories, and detailed rubrics.
          </p>
        </div>

        <button onClick={onStartNew} className="btn btn-primary">
          <Play size={16} /> Start New Interview
        </button>
      </div>

      {/* Filter controls */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="form-input"
              placeholder="Search previous sessions..."
              style={{ paddingLeft: '2.4rem' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="form-select"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="all">All Track Roles</option>
            {uniqueRoles.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      {/* History Table / Cards */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {filteredHistory.length === 0 ? (
          <div style={{ padding: '3.5rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <History size={40} style={{ color: 'var(--border-subtle)', margin: '0 auto 1rem' }} />
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>No Interview Sessions Found</h3>
            <p style={{ fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              {search || filterRole !== 'all' ? 'Try adjusting your search filters.' : 'Launch a new simulation to generate your first scorecard.'}
            </p>
            <button onClick={onStartNew} className="btn btn-primary btn-sm">
              Start Simulation
            </button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '1rem 1.25rem' }}>Date</th>
                  <th style={{ padding: '1rem 1.25rem' }}>Role Track</th>
                  <th style={{ padding: '1rem 1.25rem' }}>Format</th>
                  <th style={{ padding: '1rem 1.25rem' }}>Difficulty</th>
                  <th style={{ padding: '1rem 1.25rem' }}>Questions</th>
                  <th style={{ padding: '1rem 1.25rem' }}>Overall Score</th>
                  <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((item) => (
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
                    <td style={{ padding: '1rem 1.25rem', color: 'var(--text-secondary)' }}>
                      {formatDate(item.date)}
                    </td>
                    <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {item.role}
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 400 }}>{item.level}</div>
                    </td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <span className="badge">{item.type}</span>
                    </td>
                    <td style={{ padding: '1rem 1.25rem', textTransform: 'capitalize', color: 'var(--text-muted)' }}>
                      {item.difficulty}
                    </td>
                    <td style={{ padding: '1rem 1.25rem', color: 'var(--text-muted)' }}>
                      {item.answeredCount || item.answers?.length || 5} Qs &bull; {formatTime(item.durationSeconds || 450)}
                    </td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{
                          color: 'var(--accent-cyan)',
                          fontWeight: 800,
                          backgroundColor: 'var(--accent-cyan-light)',
                          padding: '0.25rem 0.65rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid rgba(6, 182, 212, 0.3)'
                        }}>
                          {item.overallScore} / 10
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                          {getScoreLabel(item.overallScore)}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                      <button className="btn btn-sm btn-ghost" style={{ color: 'var(--accent-cyan)' }}>
                        View Report <ChevronRight size={14} />
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
