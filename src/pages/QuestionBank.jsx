import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Terminal, 
  Lightbulb, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp,
  Tag,
  ArrowRight,
  Code2,
  Building2,
  Layers
} from 'lucide-react';
import { 
  QUESTIONS_DATABASE, 
  JOB_ROLES, 
  INTERVIEW_TYPES, 
  DIFFICULTIES, 
  COMPANIES,
  CS_SUBJECTS 
} from '../data/questionsData';

export default function QuestionBank({ onStartCustomInterview }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDiff, setSelectedDiff] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  const filteredQuestions = QUESTIONS_DATABASE.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (q.category && q.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (q.keyConcepts && q.keyConcepts.some(c => c.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesRole = selectedRole === 'all' || q.role === selectedRole;
    const matchesType = selectedType === 'all' || q.type === selectedType;
    const matchesDiff = selectedDiff === 'all' || q.difficulty === selectedDiff;
    const matchesCompany = selectedCompany === 'all' || q.company === selectedCompany;
    const matchesSubject = selectedSubject === 'all' || 
                          (q.subject === selectedSubject) || 
                          (selectedSubject === 'coding-problems' && q.type === 'coding') ||
                          (selectedSubject === 'hr' && (q.type === 'hr' || q.type === 'behavioral')) ||
                          (selectedSubject === 'dsa' && (q.category?.includes('DSA') || q.category?.includes('Data Structures')));
    
    return matchesSearch && matchesRole && matchesType && matchesDiff && matchesCompany && matchesSubject;
  });

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '4rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <span className="badge badge-cyan" style={{ marginBottom: '0.5rem' }}>Question Repository</span>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.2rem)', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          Explore Interview Question Bank
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Browse curated questions across DSA, DBMS, OS, Networks, System Design, Coding Challenges & Company Tracks.
        </p>
      </div>

      {/* CS Subject Category Chips */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        justifyContent: 'center',
        marginBottom: '1.5rem'
      }}>
        {CS_SUBJECTS.map(subj => {
          const isSelected = selectedSubject === subj.id;
          return (
            <button
              key={subj.id}
              type="button"
              onClick={() => setSelectedSubject(subj.id)}
              className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                borderRadius: 'var(--radius-full)',
                padding: '0.35rem 0.85rem',
                fontSize: '0.8rem'
              }}
            >
              {subj.name}
            </button>
          );
        })}
      </div>

      {/* Filter & Search Bar */}
      <div className="card" style={{ marginBottom: '2rem', padding: '1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
          {/* Search Input */}
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="form-input"
              placeholder="Search concepts, algorithms..."
              style={{ paddingLeft: '2.4rem' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Company Filter */}
          <select
            className="form-select"
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
          >
            {COMPANIES.map(c => (
              <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
            ))}
          </select>

          {/* Role Filter */}
          <select
            className="form-select"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="all">All Roles & Tracks</option>
            {JOB_ROLES.map(r => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            className="form-select"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">All Round Types</option>
            {INTERVIEW_TYPES.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>

          {/* Difficulty Filter */}
          <select
            className="form-select"
            value={selectedDiff}
            onChange={(e) => setSelectedDiff(e.target.value)}
          >
            <option value="all">All Difficulties</option>
            {DIFFICULTIES.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count & Action */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Showing <strong style={{ color: 'var(--text-primary)' }}>{filteredQuestions.length}</strong> questions
        </div>
        {onStartCustomInterview && (
          <button
            onClick={onStartCustomInterview}
            className="btn btn-sm btn-primary"
          >
            Launch Interview Session &rarr;
          </button>
        )}
      </div>

      {/* Questions Accordion List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredQuestions.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <p style={{ color: 'var(--text-muted)' }}>No questions match your current filters.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedRole('all'); setSelectedType('all'); setSelectedDiff('all'); setSelectedCompany('all'); setSelectedSubject('all'); }}
              className="btn btn-secondary btn-sm"
              style={{ marginTop: '1rem' }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isExpanded = expandedId === q.id;
            return (
              <div
                key={q.id}
                className="card"
                style={{
                  border: isExpanded ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                  transition: 'border-color 0.2s ease',
                  padding: '1.25rem'
                }}
              >
                {/* Header row */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : q.id)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
                      <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>
                        {q.category || 'Technical Question'}
                      </span>
                      {q.company && (
                        <span className="badge" style={{ fontSize: '0.7rem', textTransform: 'capitalize' }}>
                          🏢 {q.company}
                        </span>
                      )}
                      <span className="badge" style={{ fontSize: '0.7rem', textTransform: 'capitalize' }}>
                        {q.difficulty}
                      </span>
                      <span className="badge" style={{ fontSize: '0.7rem', textTransform: 'capitalize' }}>
                        {q.type}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: 600, lineHeight: '1.4' }}>
                      {q.question}
                    </h3>
                  </div>

                  <button
                    style={{
                      background: 'none',
                      border: 'none',
                      color: isExpanded ? 'var(--accent-cyan)' : 'var(--text-muted)',
                      cursor: 'pointer',
                      padding: '0.25rem'
                    }}
                  >
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>

                {/* Expanded Details Panel */}
                {isExpanded && (
                  <div style={{
                    marginTop: '1.25rem',
                    paddingTop: '1.25rem',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                  }}>
                    {/* Expected Key Concepts */}
                    {q.keyConcepts && (
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
                          Key Evaluation Concepts
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                          {q.keyConcepts.map((kc, i) => (
                            <span key={i} className="badge" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                              &bull; {kc}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Interviewer Tip */}
                    {q.tips && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        backgroundColor: 'var(--bg-secondary)',
                        padding: '0.65rem 0.85rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.85rem',
                        color: 'var(--text-muted)'
                      }}>
                        <Lightbulb size={16} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
                        <span><strong>Interviewer Insight:</strong> {q.tips}</span>
                      </div>
                    )}

                    {/* Ideal Model Answer / Code */}
                    {q.idealAnswer && (
                      <div style={{
                        backgroundColor: 'var(--bg-secondary)',
                        borderLeft: '3px solid var(--accent-cyan)',
                        padding: '0.85rem 1rem',
                        borderRadius: 'var(--radius-sm)'
                      }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '0.35rem' }}>
                          Model Solution Outline:
                        </div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                          {q.idealAnswer}
                        </p>
                      </div>
                    )}

                    {/* Coding Starter Code Preview if present */}
                    {q.starterCode && (
                      <div style={{
                        backgroundColor: 'var(--bg-primary)',
                        padding: '0.85rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                        overflowX: 'auto',
                        border: '1px solid var(--border-subtle)'
                      }}>
                        <div style={{ color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '0.4rem' }}>// JavaScript Starter Template</div>
                        <pre style={{ color: 'var(--text-secondary)', margin: 0 }}>{q.starterCode.javascript}</pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
