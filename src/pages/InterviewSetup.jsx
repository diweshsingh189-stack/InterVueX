import React, { useState } from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  Layers, 
  Gauge, 
  Hash, 
  Play, 
  ArrowRight, 
  ShieldCheck,
  Sparkles,
  Info,
  FileText,
  UploadCloud,
  CheckCircle2,
  Building2,
  BrainCircuit,
  Clock
} from 'lucide-react';
import { 
  JOB_ROLES, 
  EXPERIENCE_LEVELS, 
  INTERVIEW_TYPES, 
  DIFFICULTIES, 
  COMPANIES,
  getQuestionsForInterview 
} from '../data/questionsData';
import { resumeService } from '../services/resumeService';
import ProgressOverviewCard from '../components/ProgressOverviewCard';

export default function InterviewSetup({ onStartInterview, userProfile, history = [] }) {
  // Mode selection: 'manual' | 'resume'
  const [setupMode, setSetupMode] = useState('manual');

  // Manual configurations
  const [selectedRole, setSelectedRole] = useState(userProfile?.targetRole ? 
    (JOB_ROLES.find(r => r.name.toLowerCase() === userProfile.targetRole.toLowerCase())?.id || 'software-developer') 
    : 'software-developer'
  );
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('intermediate');
  const [selectedType, setSelectedType] = useState('technical');
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [questionCount, setQuestionCount] = useState(5);
  const [isAdaptive, setIsAdaptive] = useState(true);
  const [perQuestionTimeLimit, setPerQuestionTimeLimit] = useState(120); // 120s per question or 0 for untimed

  // Resume mode state
  const [resumeText, setResumeText] = useState('');
  const [fileName, setFileName] = useState('');
  const [parsedResume, setParsedResume] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      setResumeText(typeof content === 'string' ? content : '');
      analyzeResume(typeof content === 'string' ? content : '');
    };
    reader.readAsText(file);
  };

  const analyzeResume = (textToAnalyze) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const parsed = resumeService.parseResumeText(textToAnalyze || resumeText);
      setParsedResume(parsed);
      setIsAnalyzing(false);
    }, 400);
  };

  const handleLaunch = () => {
    let questions = [];
    let roleObj = JOB_ROLES.find(r => r.id === selectedRole);
    let levelObj = EXPERIENCE_LEVELS.find(l => l.id === selectedLevel);
    let typeObj = INTERVIEW_TYPES.find(t => t.id === selectedType);
    let compObj = COMPANIES.find(c => c.id === selectedCompany);

    if (setupMode === 'resume' && parsedResume) {
      questions = resumeService.generateResumeQuestions(parsedResume, questionCount);
      roleObj = JOB_ROLES.find(r => r.id === parsedResume.roleId) || roleObj;
      levelObj = EXPERIENCE_LEVELS.find(l => l.id === parsedResume.detectedLevel) || levelObj;
    } else {
      questions = getQuestionsForInterview(selectedRole, selectedType, selectedDifficulty, questionCount, selectedCompany);
    }

    const sessionConfig = {
      roleId: setupMode === 'resume' && parsedResume ? parsedResume.roleId : selectedRole,
      roleName: setupMode === 'resume' && parsedResume ? parsedResume.detectedRole : (roleObj ? roleObj.name : 'Software Developer'),
      companyId: selectedCompany,
      companyName: compObj ? compObj.name : 'All Companies',
      levelId: setupMode === 'resume' && parsedResume ? parsedResume.detectedLevel : selectedLevel,
      levelName: levelObj ? levelObj.name : 'Intermediate',
      typeId: selectedType,
      typeName: typeObj ? typeObj.name : 'Technical',
      difficulty: selectedDifficulty,
      questionCount: questions.length,
      questions,
      isAdaptive,
      perQuestionTimeLimit,
      isResumeBased: setupMode === 'resume',
      parsedResume: setupMode === 'resume' ? parsedResume : null,
      startedAt: new Date().toISOString()
    };

    onStartInterview(sessionConfig);
  };

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto', paddingBottom: '3rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <span className="badge badge-cyan" style={{ marginBottom: '0.5rem' }}>
          Session Customization
        </span>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          Configure Your Interview Simulation
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Select custom role parameters, target company tracks, or upload your resume for tailored AI evaluation.
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0.75rem',
        marginBottom: '2rem'
      }}>
        <button
          type="button"
          onClick={() => setSetupMode('manual')}
          className={`btn ${setupMode === 'manual' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '0.65rem 1.25rem', borderRadius: 'var(--radius-full)' }}
        >
          <Briefcase size={16} /> Manual Role Calibration
        </button>
        <button
          type="button"
          onClick={() => setSetupMode('resume')}
          className={`btn ${setupMode === 'resume' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '0.65rem 1.25rem', borderRadius: 'var(--radius-full)' }}
        >
          <FileText size={16} /> Resume-Based Interview
        </button>
      </div>

      {/* RESUME MODE VIEW */}
      {setupMode === 'resume' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
          <div className="card">
            <div className="card-header" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <UploadCloud size={22} style={{ color: 'var(--accent-cyan)' }} />
              <div>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>Upload or Paste Resume</h3>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                  We parse technical skills, experience milestones, and projects to generate custom questions.
                </p>
              </div>
            </div>

            {/* File Upload Box */}
            <div style={{
              border: '2px dashed var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem 1.5rem',
              textAlign: 'center',
              backgroundColor: 'var(--bg-secondary)',
              cursor: 'pointer',
              marginBottom: '1.25rem'
            }}>
              <input
                type="file"
                id="resumeFileInput"
                accept=".txt,.md,.pdf,.doc,.docx"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              <label htmlFor="resumeFileInput" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <UploadCloud size={32} style={{ color: 'var(--accent-cyan)' }} />
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                  {fileName ? `Loaded: ${fileName}` : 'Click to Upload Resume (.txt, .md, .pdf)'}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Secure and parsed locally in your browser.
                </span>
              </label>
            </div>

            {/* Paste Text Option */}
            <div className="form-group">
              <label className="form-label">Or Paste Resume Content / Skills Summary:</label>
              <textarea
                className="form-textarea"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Example: Software Developer with 3 years of experience in React, Node.js, PostgreSQL, Docker, AWS. Built scalable microservices, reduced API latency by 40%..."
                style={{ minHeight: '120px' }}
              />
            </div>

            <button
              type="button"
              onClick={() => analyzeResume(resumeText)}
              disabled={!resumeText.trim() || isAnalyzing}
              className="btn btn-secondary"
              style={{ borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)' }}
            >
              <Sparkles size={16} /> {isAnalyzing ? 'Analyzing Signals...' : 'Analyze Resume Signals'}
            </button>
          </div>

          {/* Parsed Resume Signals Preview */}
          {parsedResume && (
            <div className="card" style={{ border: '1px solid var(--accent-cyan)', backgroundColor: 'var(--surface-card)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--accent-cyan)' }} />
                <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>Resume Analysis Results</h4>
              </div>

              <div className="grid-3" style={{ marginBottom: '1rem' }}>
                <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Detected Role</div>
                  <div style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>{parsedResume.detectedRole}</div>
                </div>
                <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Calibrated Level</div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', textTransform: 'capitalize' }}>{parsedResume.detectedLevel}</div>
                </div>
                <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Detected Skills</div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{parsedResume.skills.length} Technical Skills</div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Key Skills Extracted:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {parsedResume.skills.map((skill, i) => (
                    <span key={i} className="badge badge-cyan" style={{ fontSize: '0.75rem' }}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MANUAL SETUP VIEW */}
      {setupMode === 'manual' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.75rem' }}>
          {/* Section 1: Job Role Selection */}
          <div className="card">
            <div className="card-header" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Briefcase size={20} style={{ color: 'var(--accent-cyan)' }} />
              <div>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>1. Select Job Role</h3>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Tailors domain questions, architecture, and algorithms.</p>
              </div>
            </div>

            <div className="grid-4" style={{ gap: '0.75rem' }}>
              {JOB_ROLES.map((role) => {
                const isSelected = selectedRole === role.id;
                return (
                  <div
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    style={{
                      backgroundColor: isSelected ? 'var(--accent-cyan-light)' : 'var(--bg-secondary)',
                      border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.925rem', color: isSelected ? 'var(--accent-cyan)' : 'var(--text-primary)', marginBottom: '0.4rem' }}>
                      {role.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                      {role.description.substring(0, 55)}...
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Target Company & Interview Type */}
          <div className="grid-2">
            {/* Company Target Track */}
            <div className="card">
              <div className="card-header" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <Building2 size={20} style={{ color: 'var(--accent-cyan)' }} />
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>2. Target Company Track & Package (LPA)</h3>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Calibrated with real hiring packages & interview standards.</p>
                </div>
              </div>

              {/* All Companies Option */}
              <div style={{ marginBottom: '0.85rem' }}>
                {COMPANIES.filter(c => c.id === 'all').map(comp => {
                  const isSelected = selectedCompany === comp.id;
                  return (
                    <button
                      key={comp.id}
                      type="button"
                      onClick={() => setSelectedCompany(comp.id)}
                      className="btn btn-sm"
                      style={{
                        width: '100%',
                        backgroundColor: isSelected ? 'var(--accent-cyan-light)' : 'var(--bg-secondary)',
                        border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                        color: isSelected ? 'var(--accent-cyan)' : 'var(--text-primary)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.6rem 0.85rem',
                        fontSize: '0.825rem',
                        fontWeight: 600
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>{comp.icon}</span>
                        <span>{comp.name}</span>
                      </span>
                      <span className="badge" style={{ backgroundColor: 'var(--surface-card)', fontSize: '0.75rem' }}>
                        {comp.lpa}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Group 1: Top Product Companies (MAANG / Tier-1) */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--accent-cyan)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}>
                  ⭐ Top Product Companies (MAANG / Tier-1)
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '0.6rem' }}>
                  {COMPANIES.filter(c => c.category === 'product').map((comp) => {
                    const isSelected = selectedCompany === comp.id;
                    return (
                      <div
                        key={comp.id}
                        onClick={() => setSelectedCompany(comp.id)}
                        style={{
                          backgroundColor: isSelected ? 'var(--accent-cyan-light)' : 'var(--bg-secondary)',
                          border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-md)',
                          padding: '0.75rem 0.85rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '0.5rem',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
                          <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{comp.icon}</span>
                          <div style={{ minWidth: 0 }}>
                            <div style={{
                              fontWeight: 700,
                              fontSize: '0.875rem',
                              color: isSelected ? 'var(--accent-cyan)' : 'var(--text-primary)',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}>
                              {comp.name}
                            </div>
                            <div style={{
                              fontSize: '0.7rem',
                              color: 'var(--text-muted)',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}>
                              {comp.subName}
                            </div>
                          </div>
                        </div>

                        <span style={{
                          fontSize: '0.725rem',
                          color: isSelected ? 'var(--accent-cyan)' : '#38BDF8',
                          backgroundColor: 'var(--surface-card)',
                          border: '1px solid var(--border-subtle)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: 'var(--radius-sm)',
                          fontWeight: 700,
                          whiteSpace: 'nowrap',
                          flexShrink: 0
                        }}>
                          {comp.lpa}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Group 2: Service / Enterprise Companies */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}>
                  🏢 Service / IT Enterprise Companies
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '0.6rem' }}>
                  {COMPANIES.filter(c => c.category === 'service').map((comp) => {
                    const isSelected = selectedCompany === comp.id;
                    return (
                      <div
                        key={comp.id}
                        onClick={() => setSelectedCompany(comp.id)}
                        style={{
                          backgroundColor: isSelected ? 'var(--accent-cyan-light)' : 'var(--bg-secondary)',
                          border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-md)',
                          padding: '0.75rem 0.85rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '0.5rem',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
                          <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{comp.icon}</span>
                          <div style={{ minWidth: 0 }}>
                            <div style={{
                              fontWeight: 700,
                              fontSize: '0.875rem',
                              color: isSelected ? 'var(--accent-cyan)' : 'var(--text-primary)',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}>
                              {comp.name}
                            </div>
                            <div style={{
                              fontSize: '0.7rem',
                              color: 'var(--text-muted)',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}>
                              {comp.subName}
                            </div>
                          </div>
                        </div>

                        <span style={{
                          fontSize: '0.725rem',
                          color: isSelected ? 'var(--accent-cyan)' : 'var(--text-muted)',
                          backgroundColor: 'var(--surface-card)',
                          border: '1px solid var(--border-subtle)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: 'var(--radius-sm)',
                          fontWeight: 700,
                          whiteSpace: 'nowrap',
                          flexShrink: 0
                        }}>
                          {comp.lpa}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Selected Company CTC & Focus Overview Banner */}
              {selectedCompany && (
                <div style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.65rem 0.85rem',
                  fontSize: '0.78rem',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Target CTC: </span>
                    <strong style={{ color: 'var(--accent-cyan)' }}>
                      {COMPANIES.find(c => c.id === selectedCompany)?.lpa}
                    </strong>
                  </div>
                  <div style={{ color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Focus: </span>
                    {COMPANIES.find(c => c.id === selectedCompany)?.focus}
                  </div>
                </div>
              )}
            </div>

            {/* Interview Format / Mode */}
            <div className="card">
              <div className="card-header" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Layers size={20} style={{ color: 'var(--accent-cyan)' }} />
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>3. Interview Mode</h3>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Technical, Coding, HR, Behavioral, or Mixed.</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {INTERVIEW_TYPES.map((type) => {
                  const isSelected = selectedType === type.id;
                  return (
                    <div
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      style={{
                        backgroundColor: isSelected ? 'rgba(6, 182, 212, 0.06)' : 'var(--bg-secondary)',
                        border: isSelected ? '1.5px solid #06B6D4' : '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-md)',
                        padding: '0.75rem 1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.75rem',
                        boxShadow: isSelected ? '0 0 12px rgba(6, 182, 212, 0.12)' : 'none',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div>
                        <div style={{
                          fontWeight: 700,
                          fontSize: '0.92rem',
                          color: isSelected ? '#22D3EE' : 'var(--text-primary)'
                        }}>
                          {type.name}
                        </div>
                        <div style={{
                          fontSize: '0.78rem',
                          color: 'var(--text-muted)',
                          marginTop: '0.15rem',
                          lineHeight: 1.3
                        }}>
                          {type.desc}
                        </div>
                      </div>
                      {isSelected && (
                        <div style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: '#06B6D4',
                          flexShrink: 0
                        }} />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Progress Overview Section below Interview Mode */}
              <ProgressOverviewCard history={history} />
            </div>
          </div>

          {/* Section 3: Level & Difficulty */}
          <div className="grid-2">
            {/* Experience Level */}
            <div className="card">
              <div className="card-header" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <GraduationCap size={20} style={{ color: 'var(--accent-cyan)' }} />
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>4. Experience Level</h3>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Calibrates depth of system design & edge cases.</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                {EXPERIENCE_LEVELS.map((level) => {
                  const isSelected = selectedLevel === level.id;
                  return (
                    <button
                      key={level.id}
                      type="button"
                      onClick={() => setSelectedLevel(level.id)}
                      className="btn btn-sm"
                      style={{
                        backgroundColor: isSelected ? 'var(--accent-cyan-light)' : 'var(--bg-secondary)',
                        border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                        color: isSelected ? 'var(--accent-cyan)' : 'var(--text-primary)',
                        padding: '0.6rem 0.5rem',
                        fontSize: '0.8rem',
                        fontWeight: 600
                      }}
                    >
                      {level.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Difficulty & Adaptive Toggle */}
            <div className="card">
              <div className="card-header" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Gauge size={20} style={{ color: 'var(--accent-cyan)' }} />
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>5. Difficulty & Engine</h3>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Initial difficulty and adaptive scaling.</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '0.75rem' }}>
                {DIFFICULTIES.map((diff) => {
                  const isSelected = selectedDifficulty === diff.id;
                  return (
                    <button
                      key={diff.id}
                      type="button"
                      onClick={() => setSelectedDifficulty(diff.id)}
                      className="btn btn-sm"
                      style={{
                        backgroundColor: isSelected ? 'var(--accent-cyan)' : 'var(--bg-secondary)',
                        color: isSelected ? '#0F172A' : 'var(--text-primary)',
                        borderColor: isSelected ? 'var(--accent-cyan)' : 'var(--border-subtle)',
                        fontWeight: 700
                      }}
                    >
                      {diff.name}
                    </button>
                  );
                })}
              </div>

              {/* Adaptive Toggle Switch */}
              <div 
                onClick={() => setIsAdaptive(!isAdaptive)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'var(--bg-secondary)',
                  padding: '0.6rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: isAdaptive ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <BrainCircuit size={16} style={{ color: 'var(--accent-cyan)' }} />
                  <div>
                    <div style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-primary)' }}>Adaptive Interview Engine</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Adjusts question difficulty based on answers</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isAdaptive}
                  onChange={() => {}}
                  style={{ accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>

          {/* Section 4: Timer & Question Count */}
          <div className="grid-2">
            {/* Timer Limit */}
            <div className="card">
              <div className="card-header" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Clock size={20} style={{ color: 'var(--accent-cyan)' }} />
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>6. Question Countdown Timer</h3>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Time limit per question response.</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                {[
                  { label: '2 Mins / Q', val: 120 },
                  { label: '3 Mins / Q', val: 180 },
                  { label: 'Untimed', val: 0 }
                ].map((t) => {
                  const isSelected = perQuestionTimeLimit === t.val;
                  return (
                    <button
                      key={t.val}
                      type="button"
                      onClick={() => setPerQuestionTimeLimit(t.val)}
                      className="btn btn-sm"
                      style={{
                        backgroundColor: isSelected ? 'var(--accent-cyan-light)' : 'var(--bg-secondary)',
                        borderColor: isSelected ? 'var(--accent-cyan)' : 'var(--border-subtle)',
                        color: isSelected ? 'var(--accent-cyan)' : 'var(--text-primary)',
                        fontWeight: 600
                      }}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question Count */}
            <div className="card">
              <div className="card-header" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Hash size={20} style={{ color: 'var(--accent-cyan)' }} />
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>7. Number of Questions</h3>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Estimated duration: 10 - 30 minutes.</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                {[3, 5, 10].map((cnt) => {
                  const isSelected = questionCount === cnt;
                  return (
                    <button
                      key={cnt}
                      type="button"
                      onClick={() => setQuestionCount(cnt)}
                      className="btn btn-sm"
                      style={{
                        backgroundColor: isSelected ? 'var(--accent-cyan)' : 'var(--bg-secondary)',
                        color: isSelected ? '#0F172A' : 'var(--text-primary)',
                        borderColor: isSelected ? 'var(--accent-cyan)' : 'var(--border-subtle)',
                        fontWeight: 700
                      }}
                    >
                      {cnt} Questions
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Launch Summary Card */}
      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--accent-cyan)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem',
        marginTop: '2rem',
        boxShadow: '0 0 20px rgba(6, 182, 212, 0.1)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <Sparkles size={18} style={{ color: 'var(--accent-cyan)' }} />
            <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>
              {setupMode === 'resume' ? 'Resume Simulation Configured' : 'Ready for Live Simulation'}
            </h4>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Track: <strong style={{ color: 'var(--accent-cyan)' }}>{setupMode === 'resume' && parsedResume ? parsedResume.detectedRole : (JOB_ROLES.find(r => r.id === selectedRole)?.name)}</strong> &bull; Format: <strong style={{ color: 'var(--text-secondary)' }}>{INTERVIEW_TYPES.find(t => t.id === selectedType)?.name}</strong> &bull; Adaptive: <strong style={{ color: isAdaptive ? 'var(--accent-cyan)' : 'var(--text-dim)' }}>{isAdaptive ? 'Enabled' : 'Disabled'}</strong>
          </p>
        </div>

        <button
          onClick={handleLaunch}
          className="btn btn-primary btn-lg"
          style={{ minWidth: '220px' }}
        >
          <Play size={18} /> Start Interview
        </button>
      </div>
    </div>
  );
}
