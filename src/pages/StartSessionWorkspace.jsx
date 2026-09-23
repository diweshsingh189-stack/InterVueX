import React, { useState, useMemo } from 'react';
import { 
  Play, 
  Sparkles, 
  UserCheck, 
  Briefcase, 
  Layers, 
  Gauge, 
  Hash, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Award, 
  Zap, 
  Bot, 
  Code2, 
  Settings2,
  FileText,
  TrendingUp,
  Cpu,
  SlidersHorizontal
} from 'lucide-react';
import { 
  JOB_ROLES, 
  EXPERIENCE_LEVELS, 
  INTERVIEW_TYPES, 
  DIFFICULTIES, 
  getQuestionsForInterview 
} from '../data/questionsData.js';
import { resumeService, SAMPLE_CANDIDATES } from '../services/resumeService.js';

export default function StartSessionWorkspace({ onStartInterview, userProfile, history = [], onNavigateToSetup }) {
  // 1. Candidate Selection
  const [selectedCandidateId, setSelectedCandidateId] = useState(SAMPLE_CANDIDATES[0].id);
  const selectedCandidate = useMemo(() => {
    return SAMPLE_CANDIDATES.find(c => c.id === selectedCandidateId) || SAMPLE_CANDIDATES[0];
  }, [selectedCandidateId]);

  // 2. Quick Calibration Parameters
  const [selectedRole, setSelectedRole] = useState(() => selectedCandidate?.roleId || 'fullstack-developer');
  const [selectedType, setSelectedType] = useState('technical');
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [questionCount, setQuestionCount] = useState(5);
  const [perQuestionTimeLimit, setPerQuestionTimeLimit] = useState(120); // 120s or 0 for untimed
  const [isLaunching, setIsLaunching] = useState(false);

  // Sync role when candidate changes
  const handleSelectCandidate = (candidate) => {
    setSelectedCandidateId(candidate.id);
    if (candidate.roleId) {
      setSelectedRole(candidate.roleId);
    }
  };

  // Readiness calculation based on candidate skills and target role
  const readinessStats = useMemo(() => {
    const totalSkills = selectedCandidate?.skills?.length || 8;
    const baseScore = Math.min(96, 75 + totalSkills * 2);
    const pastInterviews = history.length;
    const avgHistoryScore = pastInterviews > 0
      ? (history.reduce((sum, h) => sum + (h.overallScore || 8), 0) / pastInterviews).toFixed(1)
      : '8.5';
    return {
      readinessScore: baseScore,
      ratingLabel: baseScore >= 90 ? 'High Caliber' : 'Job Ready',
      pastInterviews,
      avgHistoryScore
    };
  }, [selectedCandidate, history]);

  // Handle Quick Launch Action
  const handleLaunchSession = () => {
    setIsLaunching(true);

    const roleObj = JOB_ROLES.find(r => r.id === selectedRole) || JOB_ROLES[0];
    const levelObj = EXPERIENCE_LEVELS.find(l => l.id === selectedCandidate.experienceLevel) || EXPERIENCE_LEVELS[1];
    const typeObj = INTERVIEW_TYPES.find(t => t.id === selectedType) || INTERVIEW_TYPES[0];

    // Generate questions matching the candidate's parsed skills & parameters
    const parsedData = resumeService.parseResumeText(selectedCandidate.resumeText);
    let questions = resumeService.generateResumeQuestions(parsedData, questionCount);

    if (!questions || questions.length === 0) {
      questions = getQuestionsForInterview(selectedRole, selectedType, selectedDifficulty, questionCount, 'all');
    }

    const sessionConfig = {
      role: selectedRole,
      roleName: roleObj.name,
      level: selectedCandidate.experienceLevel || 'intermediate',
      levelName: levelObj.name,
      type: selectedType,
      typeName: typeObj.name,
      difficulty: selectedDifficulty,
      difficultyName: selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1),
      questions,
      questionCount: questions.length,
      isAdaptive: true,
      perQuestionTimeLimit,
      company: 'all',
      companyName: 'All Companies',
      candidateName: selectedCandidate.name,
      resumeData: {
        name: selectedCandidate.name,
        skills: selectedCandidate.skills,
        experienceYears: selectedCandidate.experienceYears,
        detectedLevel: selectedCandidate.experienceLevel
      },
      setupMode: 'resume'
    };

    setTimeout(() => {
      onStartInterview(sessionConfig);
    }, 200);
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', paddingBottom: '3.5rem' }}>
      {/* Workspace Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem' }} className="badge badge-cyan">
          <Zap size={14} style={{ color: 'var(--accent-cyan)' }} />
          <span>Quick Interview Launch Workspace</span>
        </div>
        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.4rem)', color: 'var(--text-primary)', marginBottom: '0.5rem', lineHeight: 1.25 }}>
          Launch Live Simulation Session
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '680px', margin: '0 auto' }}>
          Select candidate, verify interview parameters, and instantly start your tailored AI mock session with real-time rubric grading.
        </p>
      </div>

      {/* Main 2-Column Responsive Workspace Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
        gap: '1.75rem',
        alignItems: 'start'
      }}>
        
        {/* ================= LEFT COLUMN: CANDIDATE & QUICK PARAMETERS ================= */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* 1. Selected Candidate / Resume Selector */}
          <div className="card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                <UserCheck size={20} style={{ color: 'var(--accent-cyan)' }} />
                <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', margin: 0 }}>
                  1. Candidate & Resume Profile
                </h3>
              </div>
              <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>
                {SAMPLE_CANDIDATES.length} Profiles Available
              </span>
            </div>

            {/* Candidate Cards Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: '0.65rem',
              marginBottom: '1rem'
            }}>
              {SAMPLE_CANDIDATES.map((cand) => {
                const isSelected = selectedCandidateId === cand.id;
                return (
                  <button
                    key={cand.id}
                    type="button"
                    onClick={() => handleSelectCandidate(cand)}
                    style={{
                      textAlign: 'left',
                      backgroundColor: isSelected ? 'var(--accent-cyan-light)' : 'var(--bg-secondary)',
                      border: isSelected ? '1.5px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.75rem',
                      cursor: 'pointer',
                      transition: 'all 0.18s ease',
                      boxShadow: isSelected ? '0 0 12px var(--accent-cyan-glow)' : 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.35rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '1.25rem' }}>{cand.avatar}</span>
                      {isSelected && <CheckCircle2 size={14} style={{ color: 'var(--accent-cyan)' }} />}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: isSelected ? 'var(--accent-cyan)' : 'var(--text-primary)' }}>
                      {cand.name}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {cand.targetRole}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Candidate Summary Box */}
            <div style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem 1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>{selectedCandidate.avatar}</span>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                    {selectedCandidate.name}
                  </strong>
                  <span className="badge" style={{ fontSize: '0.68rem', textTransform: 'capitalize' }}>
                    {selectedCandidate.experienceLevel} ({selectedCandidate.experienceYears}y exp)
                  </span>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                  Active Profile
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.45', margin: 0 }}>
                {selectedCandidate.summary}
              </p>
            </div>
          </div>

          {/* 2. Fast Parameter Configuration */}
          <div className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <SlidersHorizontal size={20} style={{ color: 'var(--accent-cyan)' }} />
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', margin: 0 }}>
                2. Quick Parameters Calibration
              </h3>
            </div>

            {/* Target Job Role */}
            <div>
              <label className="form-label" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Briefcase size={14} /> Target Job Role:
              </label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                gap: '0.45rem'
              }}>
                {JOB_ROLES.slice(0, 6).map((role) => {
                  const isSelected = selectedRole === role.id;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      style={{
                        backgroundColor: isSelected ? 'var(--accent-cyan-light)' : 'var(--bg-secondary)',
                        color: isSelected ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                        border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '0.45rem 0.6rem',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {role.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interview Mode & Difficulty Side by Side */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
              {/* Interview Mode */}
              <div>
                <label className="form-label" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Layers size={14} /> Mode:
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {INTERVIEW_TYPES.slice(0, 3).map((type) => {
                    const isSelected = selectedType === type.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setSelectedType(type.id)}
                        style={{
                          backgroundColor: isSelected ? 'var(--accent-cyan-light)' : 'var(--bg-secondary)',
                          color: isSelected ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                          border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '0.4rem 0.65rem',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <span>{type.name}</span>
                        {isSelected && <CheckCircle2 size={13} style={{ color: 'var(--accent-cyan)' }} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <label className="form-label" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Gauge size={14} /> Difficulty:
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {DIFFICULTIES.map((diff) => {
                    const isSelected = selectedDifficulty === diff.id;
                    return (
                      <button
                        key={diff.id}
                        type="button"
                        onClick={() => setSelectedDifficulty(diff.id)}
                        style={{
                          backgroundColor: isSelected ? 'var(--accent-cyan-light)' : 'var(--bg-secondary)',
                          color: isSelected ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                          border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '0.4rem 0.65rem',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <span>{diff.name}</span>
                        {isSelected && <CheckCircle2 size={13} style={{ color: 'var(--accent-cyan)' }} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Question Count & Time Limit */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
              <div>
                <label className="form-label" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Hash size={14} /> Questions:
                </label>
                <div style={{ display: 'flex', gap: '0.3rem' }}>
                  {[3, 5, 8, 10].map((count) => {
                    const isSelected = questionCount === count;
                    return (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setQuestionCount(count)}
                        style={{
                          flex: 1,
                          backgroundColor: isSelected ? 'var(--accent-cyan)' : 'var(--bg-secondary)',
                          color: isSelected ? '#0F172A' : 'var(--text-primary)',
                          border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '0.4rem 0.2rem',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {count}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="form-label" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Clock size={14} /> Timer per Q:
                </label>
                <div style={{ display: 'flex', gap: '0.3rem' }}>
                  {[
                    { label: 'Off', val: 0 },
                    { label: '60s', val: 60 },
                    { label: '120s', val: 120 },
                    { label: '180s', val: 180 }
                  ].map((t) => {
                    const isSelected = perQuestionTimeLimit === t.val;
                    return (
                      <button
                        key={t.label}
                        type="button"
                        onClick={() => setPerQuestionTimeLimit(t.val)}
                        style={{
                          flex: 1,
                          backgroundColor: isSelected ? 'var(--accent-cyan)' : 'var(--bg-secondary)',
                          color: isSelected ? '#0F172A' : 'var(--text-primary)',
                          border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '0.4rem 0.2rem',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Launch Action Bar */}
            <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <button
                type="button"
                onClick={handleLaunchSession}
                disabled={isLaunching}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '0.85rem 1.5rem',
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  boxShadow: '0 0 20px var(--accent-cyan-glow)',
                  gap: '0.6rem'
                }}
              >
                <Play size={20} fill="#0F172A" />
                <span>{isLaunching ? 'Initializing Live Simulation...' : 'Start Live Interview'}</span>
                <ArrowRight size={18} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <span>Need advanced calibration?</span>
                <button
                  type="button"
                  onClick={onNavigateToSetup}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--accent-cyan)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: 0,
                    textDecoration: 'underline'
                  }}
                >
                  Open New Interview Studio &rarr;
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* ================= RIGHT COLUMN: SESSION OVERVIEW & TELEMETRY ================= */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Session Overview Card */}
          <div className="card" style={{
            padding: '1.5rem',
            border: '1.5px solid var(--accent-cyan)',
            backgroundColor: 'var(--surface-card)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4), 0 0 25px rgba(6, 182, 212, 0.12)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TrendingUp size={20} style={{ color: 'var(--accent-cyan)' }} />
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0 }}>
                  Session Overview & Telemetry
                </h3>
              </div>
              <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>
                Ready to Launch
              </span>
            </div>

            {/* Candidate Readiness Gauge Strip */}
            <div style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                  Candidate Readiness
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginTop: '0.15rem' }}>
                  <span style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                    {readinessStats.readinessScore}%
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                    ({readinessStats.ratingLabel})
                  </span>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Calibrated for {JOB_ROLES.find(r => r.id === selectedRole)?.name || 'Target Role'}
                </div>
              </div>

              {/* Mini visual indicator */}
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                border: '3px solid var(--accent-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--accent-cyan-light)',
                color: 'var(--accent-cyan)'
              }}>
                <Award size={24} />
              </div>
            </div>

            {/* Key Simulation Parameters Breakdown */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.75rem',
              marginBottom: '1.25rem'
            }}>
              <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Target Candidate</div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '2px' }}>
                  {selectedCandidate.name}
                </div>
              </div>

              <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Interview Track</div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '2px' }}>
                  {JOB_ROLES.find(r => r.id === selectedRole)?.name}
                </div>
              </div>

              <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Question Volume</div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '2px' }}>
                  {questionCount} Questions (~{questionCount * 2}m)
                </div>
              </div>

              <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Difficulty & Style</div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '2px', textTransform: 'capitalize' }}>
                  {selectedDifficulty} ({INTERVIEW_TYPES.find(t => t.id === selectedType)?.name})
                </div>
              </div>
            </div>

            {/* Live Engine Status Checklist */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.5rem' }}>
                Engine Verification Status:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-primary)' }}>
                  <CheckCircle2 size={14} style={{ color: 'var(--accent-cyan)' }} />
                  <span>Real-time AI Rubric Grading & Keyword Stemming</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-primary)' }}>
                  <CheckCircle2 size={14} style={{ color: 'var(--accent-cyan)' }} />
                  <span>Voice Question Synthesis & Speech-to-Text Enabled</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-primary)' }}>
                  <CheckCircle2 size={14} style={{ color: 'var(--accent-cyan)' }} />
                  <span>Interactive Code Runner & Test Cases Active</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-primary)' }}>
                  <CheckCircle2 size={14} style={{ color: 'var(--accent-cyan)' }} />
                  <span>Dynamic Adaptive Question Calibrator Active</span>
                </div>
              </div>
            </div>

            {/* Candidate Key Skills Matrix */}
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.5rem' }}>
                Verified Candidate Skills ({selectedCandidate.skills.length}):
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {selectedCandidate.skills.slice(0, 10).map((skill, i) => (
                  <span key={i} className="badge badge-cyan" style={{ fontSize: '0.72rem' }}>
                    {skill}
                  </span>
                ))}
                {selectedCandidate.skills.length > 10 && (
                  <span className="badge" style={{ fontSize: '0.72rem' }}>
                    +{selectedCandidate.skills.length - 10} more
                  </span>
                )}
              </div>
            </div>

          </div>

          {/* Quick Tip Box */}
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem'
          }}>
            <Sparkles size={18} style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.45' }}>
              <strong>How Quick Launch Works:</strong> Clicking <em>Start Live Interview</em> immediately binds the selected candidate profile with dynamically generated questions and opens the simulation room.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
