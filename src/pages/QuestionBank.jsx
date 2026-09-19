import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Terminal, 
  Lightbulb, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Eye,
  EyeOff,
  Sparkles,
  Award,
  ArrowRight,
  Code2,
  Building2,
  Layers,
  Check,
  Play
} from 'lucide-react';
import { 
  QUESTIONS_DATABASE, 
  TOPIC_QUESTIONS,
  JOB_ROLES, 
  INTERVIEW_TYPES, 
  DIFFICULTIES, 
  COMPANIES, 
  CS_SUBJECTS 
} from '../data/questionsData';

import CustomSelect from '../components/CustomSelect';

export default function QuestionBank({ onStartCustomInterview }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDiff, setSelectedDiff] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [viewMode, setViewMode] = useState('practice'); // 'practice' (Guided 10-Question mode) | 'browse' (Full accordion list)
  
  // Practice Mode State
  const [currentPracticeIndex, setCurrentPracticeIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('intervuex_completed_questions') || '[]');
    } catch {
      return [];
    }
  });

  // Browse Mode Accordion expanded question ID
  const [expandedId, setExpandedId] = useState(null);

  // Save completed questions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('intervuex_completed_questions', JSON.stringify(completedQuestions));
    } catch (err) {
      console.error(err);
    }
  }, [completedQuestions]);

  // Reset practice question index and hide answer when company or filters change
  const handleCompanyChange = (companyId) => {
    setSelectedCompany(companyId);
    // When a specific company is selected, reset sub-filters so all 10 curated questions load immediately
    if (companyId !== 'all') {
      setSelectedRole('all');
      setSelectedType('all');
      setSelectedDiff('all');
      setSelectedSubject('all');
      setSearchTerm('');
    }
    setCurrentPracticeIndex(0);
    setShowAnswer(false);
    setExpandedId(null);
  };

  const handleSubjectChange = (subjId) => {
    setSelectedSubject(subjId);
    if (subjId !== 'all') {
      setSelectedRole('all');
      setSelectedType('all');
      setSelectedDiff('all');
      setSelectedCompany('all');
      setSearchTerm('');
    }
    setCurrentPracticeIndex(0);
    setShowAnswer(false);
    setExpandedId(null);
  };

  const handleRoleChange = (roleId) => {
    setSelectedRole(roleId);
    setCurrentPracticeIndex(0);
    setShowAnswer(false);
  };

  const handleTypeChange = (typeId) => {
    setSelectedType(typeId);
    setCurrentPracticeIndex(0);
    setShowAnswer(false);
  };

  const handleDiffChange = (diffId) => {
    setSelectedDiff(diffId);
    setCurrentPracticeIndex(0);
    setShowAnswer(false);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setCurrentPracticeIndex(0);
    setShowAnswer(false);
  };

  // Helper to normalize company identifiers for bulletproof matching
  const normalizeCompany = (val) => {
    if (!val) return '';
    return String(val).toLowerCase().trim().replace(/[\s-_]+/g, '');
  };

  // Resolve current selected company object
  const currentCompanyObj = COMPANIES.find(c => 
    c.id === selectedCompany || 
    c.name.toLowerCase() === selectedCompany.toLowerCase() ||
    normalizeCompany(c.id) === normalizeCompany(selectedCompany) ||
    normalizeCompany(c.name) === normalizeCompany(selectedCompany)
  ) || COMPANIES[0];

  const currentSubjectObj = CS_SUBJECTS.find(s => s.id === selectedSubject) || CS_SUBJECTS[0];
  const activeCompanyId = currentCompanyObj ? currentCompanyObj.id : selectedCompany;

  // Filter questions according to active criteria
  let filteredQuestions = QUESTIONS_DATABASE.filter(q => {
    const matchesSearch = !searchTerm.trim() || 
                          (q.question && q.question.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (q.category && q.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (q.keyConcepts && q.keyConcepts.some(c => c.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesRole = selectedRole === 'all' || q.role === selectedRole;
    const matchesType = selectedType === 'all' || q.type === selectedType;
    const matchesDiff = selectedDiff === 'all' || q.difficulty === selectedDiff;
    
    // Exact & normalized matching for companies
    const matchesCompany = selectedCompany === 'all' || 
                          (q.company && (
                            q.company === selectedCompany ||
                            q.company === activeCompanyId ||
                            normalizeCompany(q.company) === normalizeCompany(selectedCompany) ||
                            normalizeCompany(q.company) === normalizeCompany(currentCompanyObj.name)
                          ));

    const matchesSubject = selectedSubject === 'all' || 
                          (q.subject === selectedSubject) || 
                          (selectedSubject === 'coding-problems' && (q.subject === 'coding-problems' || q.type === 'coding')) ||
                          (selectedSubject === 'hr' && (q.subject === 'hr' || q.type === 'hr' || q.type === 'behavioral')) ||
                          (selectedSubject === 'dsa' && (q.subject === 'dsa' || q.category?.includes('DSA') || q.category?.includes('Data Structures')));
    
    return matchesSearch && matchesRole && matchesType && matchesDiff && matchesCompany && matchesSubject;
  });

  // When a core CS subject topic is selected without company/sub-filters, load the dedicated 10 questions for that topic
  if (selectedSubject !== 'all' && selectedCompany === 'all' && selectedRole === 'all' && selectedType === 'all' && selectedDiff === 'all' && !searchTerm.trim()) {
    const topicQuestions = TOPIC_QUESTIONS.filter(q => q.subject === selectedSubject);
    if (topicQuestions.length > 0) {
      filteredQuestions = topicQuestions;
    }
  }

  // Practice Mode & Browse Mode share the active filtered question set
  const practiceQuestions = filteredQuestions;

  const safePracticeIndex = practiceQuestions.length > 0 
    ? Math.min(currentPracticeIndex, practiceQuestions.length - 1) 
    : 0;
  const currentQuestion = practiceQuestions[safePracticeIndex] || null;
  const totalQuestions = practiceQuestions.length;

  // Toggle mark as completed for current question
  const toggleCompleted = (questionId) => {
    setCompletedQuestions(prev => {
      if (prev.includes(questionId)) {
        return prev.filter(id => id !== questionId);
      } else {
        return [...prev, questionId];
      }
    });
  };

  // Restart questions for current track
  const handleRestart = () => {
    const currentIds = practiceQuestions.map(q => q.id);
    setCompletedQuestions(prev => prev.filter(id => !currentIds.includes(id)));
    setCurrentPracticeIndex(0);
    setShowAnswer(false);
  };

  // Count how many questions in the current practice set are completed
  const completedInCurrentTrack = practiceQuestions.filter(q => completedQuestions.includes(q.id)).length;
  const isAllCompleted = totalQuestions > 0 && completedInCurrentTrack === totalQuestions;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '4rem', width: '100%', boxSizing: 'border-box' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
        <span className="badge badge-cyan" style={{ marginBottom: '0.5rem' }}>
          {selectedSubject !== 'all' ? `${currentSubjectObj.name} Track` : 'Interview Question Repository'}
        </span>
        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.3rem)', color: 'var(--text-primary)', marginBottom: '0.5rem', fontWeight: 700 }}>
          {selectedCompany !== 'all' 
            ? `${currentCompanyObj.name} Interview Questions` 
            : selectedSubject !== 'all' 
              ? `${currentSubjectObj.name} Interview Questions` 
              : 'Company & Core CS Interview Questions Repository'}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '750px', margin: '0 auto' }}>
          {selectedCompany !== 'all' 
            ? `Master 10 trending questions asked at ${currentCompanyObj.name} (${currentCompanyObj.subName}) with detailed solutions, evaluation rubrics & code.`
            : selectedSubject !== 'all'
              ? `Master 10 curated interview questions in ${currentSubjectObj.name} with detailed model solutions, evaluation rubrics & insights.`
              : 'Master authentic interview questions across Top Product (Tier-1) and Service Tech Giants with step-by-step solutions.'}
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
              onClick={() => handleSubjectChange(subj.id)}
              className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                borderRadius: 'var(--radius-full)',
                padding: '0.35rem 0.85rem',
                fontSize: '0.8rem',
                transition: 'all 0.2s ease'
              }}
            >
              {subj.name}
            </button>
          );
        })}
      </div>

      {/* Filter & Search Bar */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1.25rem', position: 'relative', zIndex: 40, overflow: 'visible' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '0.85rem', position: 'relative', overflow: 'visible' }}>
          
          {/* Search Input */}
          <div style={{ position: 'relative', gridColumn: '1 / -1' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="form-input"
              placeholder="Search concepts, algorithms, data structures..."
              style={{ paddingLeft: '2.4rem' }}
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>

          {/* Company Filter Dropdown */}
          <CustomSelect
            value={selectedCompany}
            onChange={(val) => handleCompanyChange(val)}
            options={COMPANIES.map(c => ({ id: c.id, name: c.name, icon: c.icon }))}
            placeholder="Select Company"
            searchable={true}
          />

          {/* Role Filter */}
          <CustomSelect
            value={selectedRole}
            onChange={(val) => handleRoleChange(val)}
            options={[
              { id: 'all', name: 'All Roles & Tracks' },
              ...JOB_ROLES.map(r => ({ id: r.id, name: r.name }))
            ]}
            placeholder="All Roles & Tracks"
          />

          {/* Type Filter */}
          <CustomSelect
            value={selectedType}
            onChange={(val) => handleTypeChange(val)}
            options={[
              { id: 'all', name: 'All Round Types' },
              ...INTERVIEW_TYPES.map(t => ({ id: t.id, name: t.name }))
            ]}
            placeholder="All Round Types"
          />

          {/* Difficulty Filter */}
          <CustomSelect
            value={selectedDiff}
            onChange={(val) => handleDiffChange(val)}
            options={[
              { id: 'all', name: 'All Difficulties' },
              ...DIFFICULTIES.map(d => ({ id: d.id, name: d.name }))
            ]}
            placeholder="All Difficulties"
          />
        </div>
      </div>

      {/* Company Info Banner & Mode Switcher */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '1.25rem',
        backgroundColor: 'var(--bg-secondary)',
        padding: '0.85rem 1.15rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '1.4rem' }}>{selectedCompany !== 'all' ? currentCompanyObj.icon : '📚'}</span>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>
              {selectedCompany !== 'all' 
                ? `${currentCompanyObj.name} • ${currentCompanyObj.subName}` 
                : selectedSubject !== 'all'
                  ? `${currentSubjectObj.name} • 10 Essential Questions`
                  : 'Universal Question Pool • All Topics'}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {selectedCompany !== 'all' 
                ? `${currentCompanyObj.tier} • Focus: `
                : selectedSubject !== 'all'
                  ? 'Subject Track • Focus: '
                  : 'All Tracks • Focus: '}
              <span style={{ color: 'var(--accent-cyan)' }}>
                {selectedCompany !== 'all' ? currentCompanyObj.focus : selectedSubject !== 'all' ? `Master key concepts & solutions in ${currentSubjectObj.name}` : currentCompanyObj.focus}
              </span>
            </div>
          </div>
        </div>

        {/* View Mode Toggle: Interactive Practice vs Browse All */}
        <div style={{ display: 'flex', gap: '0.4rem', backgroundColor: 'var(--bg-primary)', padding: '0.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
          <button
            type="button"
            onClick={() => setViewMode('practice')}
            className={`btn btn-sm ${viewMode === 'practice' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
          >
            🎯 Step-by-Step Practice
          </button>
          <button
            type="button"
            onClick={() => setViewMode('browse')}
            className={`btn btn-sm ${viewMode === 'browse' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
          >
            📋 View All ({filteredQuestions.length})
          </button>
        </div>
      </div>

      {/* ========================================== */}
      {/* MODE 1: GUIDED STEP-BY-STEP PRACTICE CARD */}
      {/* ========================================== */}
      {viewMode === 'practice' && (
        <div>
          {practiceQuestions.length === 0 ? (
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
            <div>
              {/* Progress & Quick-Jump Bar */}
              <div className="card" style={{ marginBottom: '1.25rem', padding: '1rem 1.25rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Question <span style={{ color: 'var(--accent-cyan)' }}>{currentPracticeIndex + 1}</span> of {totalQuestions}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <strong>{completedInCurrentTrack}/{totalQuestions}</strong> Completed
                    </span>
                    <button
                      type="button"
                      onClick={handleRestart}
                      className="btn btn-sm btn-secondary"
                      style={{ padding: '0.25rem 0.55rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                      title="Reset completed questions for this track"
                    >
                      <RotateCcw size={13} />
                      Restart
                    </button>
                  </div>
                </div>

                {/* Progress bar line */}
                <div style={{
                  width: '100%',
                  height: '6px',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '3px',
                  overflow: 'hidden',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    width: `${Math.round(((currentPracticeIndex + 1) / totalQuestions) * 100)}%`,
                    height: '100%',
                    backgroundColor: 'var(--accent-cyan)',
                    transition: 'width 0.3s ease'
                  }} />
                </div>

                {/* Question Number Quick Jump Pills */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.4rem',
                  alignItems: 'center'
                }}>
                  {practiceQuestions.map((q, idx) => {
                    const isCurrent = idx === currentPracticeIndex;
                    const isDone = completedQuestions.includes(q.id);
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => {
                          setCurrentPracticeIndex(idx);
                          setShowAnswer(false);
                        }}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: 'var(--radius-sm)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          border: isCurrent 
                            ? '2px solid var(--accent-cyan)' 
                            : isDone 
                              ? '1px solid #10B981' 
                              : '1px solid var(--border-subtle)',
                          backgroundColor: isCurrent 
                            ? 'rgba(6, 182, 212, 0.15)' 
                            : isDone 
                              ? 'rgba(16, 185, 129, 0.15)' 
                              : 'var(--bg-secondary)',
                          color: isCurrent 
                            ? 'var(--accent-cyan)' 
                            : isDone 
                              ? '#10B981' 
                              : 'var(--text-secondary)'
                        }}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Completion Celebration Alert if 10/10 Completed */}
              {isAllCompleted && (
                <div style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid #10B981',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem 1.25rem',
                  marginBottom: '1.25rem',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <CheckCircle2 size={24} style={{ color: '#10B981', flexShrink: 0 }} />
                    <div>
                      <strong style={{ color: '#10B981', fontSize: '0.95rem' }}>
                        🎉 {totalQuestions}/{totalQuestions} Questions Completed!
                      </strong>
                      <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                        You have mastered all questions for {currentCompanyObj.name}. Ready for a simulated live interview?
                      </div>
                    </div>
                  </div>
                  {onStartCustomInterview && (
                    <button
                      onClick={onStartCustomInterview}
                      className="btn btn-sm btn-primary"
                      style={{ padding: '0.45rem 0.9rem' }}
                    >
                      Start Mock Interview &rarr;
                    </button>
                  )}
                </div>
              )}

              {/* Active Practice Question Card */}
              {currentQuestion && (
                <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid var(--border-subtle)' }}>
                  
                  {/* Question Header & Meta Info */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.45rem' }}>
                      <span className="badge badge-cyan" style={{ fontSize: '0.75rem' }}>
                        Question {currentPracticeIndex + 1} of {totalQuestions}
                      </span>
                      {currentQuestion.company && (() => {
                        const comp = COMPANIES.find(c => c.id === currentQuestion.company || normalizeCompany(c.name) === normalizeCompany(currentQuestion.company) || normalizeCompany(c.id) === normalizeCompany(currentQuestion.company));
                        return (
                          <span className="badge" style={{ fontSize: '0.75rem' }}>
                            {comp ? `${comp.icon} ${comp.name}` : currentQuestion.company}
                          </span>
                        );
                      })()}
                      <span className="badge" style={{ fontSize: '0.75rem', textTransform: 'capitalize' }}>
                        {currentQuestion.difficulty}
                      </span>
                      <span className="badge" style={{ fontSize: '0.75rem', textTransform: 'capitalize' }}>
                        {currentQuestion.category || currentQuestion.type}
                      </span>
                    </div>

                    {/* Completion Status Badge */}
                    <button
                      type="button"
                      onClick={() => toggleCompleted(currentQuestion.id)}
                      className={`btn btn-sm ${completedQuestions.includes(currentQuestion.id) ? 'btn-primary' : 'btn-secondary'}`}
                      style={{
                        padding: '0.35rem 0.75rem',
                        fontSize: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      <Check size={14} />
                      {completedQuestions.includes(currentQuestion.id) ? 'Marked Completed' : 'Mark as Completed'}
                    </button>
                  </div>

                  {/* Question Text */}
                  <h2 style={{
                    fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
                    color: 'var(--text-primary)',
                    fontWeight: 600,
                    lineHeight: '1.5',
                    marginBottom: '1.5rem'
                  }}>
                    {currentQuestion.question}
                  </h2>

                  {/* Show Answer / Hide Answer Action Button */}
                  <div style={{ marginBottom: showAnswer ? '1.25rem' : '0' }}>
                    <button
                      type="button"
                      onClick={() => setShowAnswer(prev => !prev)}
                      className={`btn ${showAnswer ? 'btn-secondary' : 'btn-primary'}`}
                      style={{
                        padding: '0.55rem 1.15rem',
                        fontSize: '0.875rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontWeight: 600
                      }}
                    >
                      {showAnswer ? <EyeOff size={16} /> : <Eye size={16} />}
                      {showAnswer ? 'Hide Answer' : 'Show Answer'}
                    </button>
                  </div>

                  {/* Expandable Model Answer & Solutions Panel */}
                  {showAnswer && (
                    <div style={{
                      marginTop: '1.25rem',
                      paddingTop: '1.25rem',
                      borderTop: '1px solid var(--border-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.15rem'
                    }}>
                      
                      {/* Key Evaluation Concepts */}
                      {currentQuestion.keyConcepts && (
                        <div>
                          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.45rem', letterSpacing: '0.05em' }}>
                            Key Evaluation Concepts
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                            {currentQuestion.keyConcepts.map((kc, i) => (
                              <span key={i} className="badge" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                                &bull; {kc}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Interviewer Insight Tip */}
                      {currentQuestion.tips && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.65rem',
                          backgroundColor: 'var(--bg-secondary)',
                          padding: '0.75rem 1rem',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.875rem',
                          color: 'var(--text-secondary)'
                        }}>
                          <Lightbulb size={18} style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '2px' }} />
                          <div>
                            <strong style={{ color: 'var(--accent-cyan)' }}>Interviewer Insight: </strong>
                            {currentQuestion.tips}
                          </div>
                        </div>
                      )}

                      {/* Comprehensive Model Answer & Approach */}
                      {currentQuestion.idealAnswer && (
                        <div style={{
                          backgroundColor: 'var(--bg-secondary)',
                          borderLeft: '4px solid var(--accent-cyan)',
                          padding: '1rem 1.15rem',
                          borderRadius: 'var(--radius-sm)'
                        }}>
                          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '0.45rem' }}>
                            Correct Model Answer & Detailed Explanation:
                          </div>
                          <div style={{
                            fontSize: '0.9rem',
                            color: 'var(--text-secondary)',
                            lineHeight: '1.65',
                            whiteSpace: 'pre-wrap',
                            fontFamily: 'inherit'
                          }}>
                            {currentQuestion.idealAnswer}
                          </div>
                        </div>
                      )}

                      {/* Code Starter Template if present */}
                      {currentQuestion.starterCode && (
                        <div style={{
                          backgroundColor: 'var(--bg-primary)',
                          padding: '1rem 1.15rem',
                          borderRadius: 'var(--radius-sm)',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.825rem',
                          overflowX: 'auto',
                          border: '1px solid var(--border-subtle)'
                        }}>
                          <div style={{ color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.8rem' }}>
                            // Expected Implementation & Code Structure
                          </div>
                          <pre style={{ color: 'var(--text-secondary)', margin: 0 }}>
                            {currentQuestion.starterCode.javascript}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Bottom Navigation Buttons (Previous, Next, Mark Completed) */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginTop: '1.75rem',
                    paddingTop: '1.25rem',
                    borderTop: '1px solid var(--border-subtle)'
                  }}>
                    <button
                      type="button"
                      onClick={() => {
                        if (currentPracticeIndex > 0) {
                          setCurrentPracticeIndex(prev => prev - 1);
                          setShowAnswer(false);
                        }
                      }}
                      disabled={currentPracticeIndex === 0}
                      className="btn btn-secondary"
                      style={{
                        padding: '0.5rem 1rem',
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        opacity: currentPracticeIndex === 0 ? 0.4 : 1,
                        cursor: currentPracticeIndex === 0 ? 'not-allowed' : 'pointer'
                      }}
                    >
                      <ChevronLeft size={16} />
                      Previous Question
                    </button>

                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <button
                        type="button"
                        onClick={() => toggleCompleted(currentQuestion.id)}
                        className={`btn btn-sm ${completedQuestions.includes(currentQuestion.id) ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}
                      >
                        {completedQuestions.includes(currentQuestion.id) ? '✓ Completed' : 'Mark Completed'}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (currentPracticeIndex < totalQuestions - 1) {
                            setCurrentPracticeIndex(prev => prev + 1);
                            setShowAnswer(false);
                          }
                        }}
                        disabled={currentPracticeIndex === totalQuestions - 1}
                        className="btn btn-primary"
                        style={{
                          padding: '0.5rem 1.15rem',
                          fontSize: '0.85rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          opacity: currentPracticeIndex === totalQuestions - 1 ? 0.4 : 1,
                          cursor: currentPracticeIndex === totalQuestions - 1 ? 'not-allowed' : 'pointer'
                        }}
                      >
                        Next Question
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>

                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ========================================== */}
      {/* MODE 2: BROWSE ALL ACCORDION LIST VIEW     */}
      {/* ========================================== */}
      {viewMode === 'browse' && (
        <div>
          {/* Results Count & Action */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
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
              filteredQuestions.map((q, idx) => {
                const isExpanded = expandedId === q.id;
                const isDone = completedQuestions.includes(q.id);
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
                            #{idx + 1} {q.category || 'Technical Question'}
                          </span>
                          {q.company && (() => {
                            const compObj = COMPANIES.find(c => c.id === q.company || normalizeCompany(c.name) === normalizeCompany(q.company) || normalizeCompany(c.id) === normalizeCompany(q.company));
                            return (
                              <span className="badge" style={{ fontSize: '0.7rem' }}>
                                {compObj ? `${compObj.icon} ${compObj.name}` : `🏢 ${q.company}`}
                              </span>
                            );
                          })()}
                          <span className="badge" style={{ fontSize: '0.7rem', textTransform: 'capitalize' }}>
                            {q.difficulty}
                          </span>
                          <span className="badge" style={{ fontSize: '0.7rem', textTransform: 'capitalize' }}>
                            {q.type}
                          </span>
                          {isDone && (
                            <span className="badge" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10B981', fontSize: '0.7rem' }}>
                              ✓ Completed
                            </span>
                          )}
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
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6', whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                              {q.idealAnswer}
                            </div>
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

                        {/* Mark Completed Toggle */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0.5rem' }}>
                          <button
                            type="button"
                            onClick={() => toggleCompleted(q.id)}
                            className={`btn btn-sm ${isDone ? 'btn-primary' : 'btn-secondary'}`}
                            style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
                          >
                            {isDone ? '✓ Completed' : 'Mark as Completed'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
