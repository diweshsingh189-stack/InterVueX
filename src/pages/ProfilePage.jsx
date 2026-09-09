import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Briefcase, 
  GraduationCap, 
  Key, 
  Save, 
  CheckCircle2, 
  Sparkles, 
  Plus, 
  X, 
  Award,
  ShieldCheck,
  Building
} from 'lucide-react';
import { JOB_ROLES, EXPERIENCE_LEVELS } from '../data/questionsData';

export default function ProfilePage({ userProfile, onSaveProfile, history = [] }) {
  const [formData, setFormData] = useState({
    name: userProfile?.name || 'Alex Morgan',
    email: userProfile?.email || 'alex.morgan@example.com',
    targetRole: userProfile?.targetRole || 'Full Stack Developer',
    experienceLevel: userProfile?.experienceLevel || 'Intermediate',
    skills: userProfile?.skills || ['JavaScript', 'React', 'Node.js', 'System Design'],
    apiKey: userProfile?.apiKey || '',
    targetCompanies: userProfile?.targetCompanies || ['Google', 'Microsoft', 'Amazon', 'Stripe'],
    bio: userProfile?.bio || 'Passionate software engineer practicing for senior and lead engineering interview rounds.'
  });

  const [newSkill, setNewSkill] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Compute stats
  const totalInterviews = history.length;
  const avgScore = totalInterviews > 0
    ? Number((history.reduce((acc, h) => acc + (h.overallScore || 0), 0) / totalInterviews).toFixed(1))
    : 8.5;

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  const handleAddCompany = () => {
    if (newCompany.trim() && !formData.targetCompanies.includes(newCompany.trim())) {
      setFormData(prev => ({
        ...prev,
        targetCompanies: [...prev.targetCompanies, newCompany.trim()]
      }));
      setNewCompany('');
    }
  };

  const handleRemoveCompany = (comp) => {
    setFormData(prev => ({
      ...prev,
      targetCompanies: prev.targetCompanies.filter(c => c !== comp)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', paddingBottom: '4rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="badge badge-cyan" style={{ marginBottom: '0.5rem' }}>Candidate Portfolio</span>
        <h1 style={{ fontSize: '2.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          Profile & Target Configuration
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Customize your target career track, core competencies, and interview engine preferences.
        </p>
      </div>

      {savedSuccess && (
        <div style={{
          backgroundColor: 'rgba(6, 182, 212, 0.12)',
          border: '1px solid var(--accent-cyan)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          color: 'var(--accent-cyan)',
          marginBottom: '1.5rem',
          animation: 'fadeIn 0.2s ease'
        }}>
          <CheckCircle2 size={18} />
          <span>Profile configuration saved successfully to local storage!</span>
        </div>
      )}

      {/* Top Profile Summary Card */}
      <div style={{
        backgroundColor: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-secondary)',
            border: '2px solid var(--accent-cyan)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-cyan)',
            fontSize: '1.5rem',
            fontWeight: 800
          }}>
            {formData.name.charAt(0)}
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)' }}>{formData.name}</h2>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', display: 'flex', gap: '0.75rem', marginTop: '0.2rem' }}>
              <span>{formData.email}</span>
              <span>&bull;</span>
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>{formData.targetRole}</span>
            </div>
          </div>
        </div>

        {/* Stats summary */}
        <div style={{ display: 'flex', gap: '2rem', borderLeft: '1px solid var(--border-subtle)', paddingLeft: '1.5rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Interviews Done</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>{totalInterviews}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Avg Rubric Score</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>{avgScore} / 10</div>
          </div>
        </div>
      </div>

      {/* Main Edit Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Personal & Career Details */}
        <div className="card">
          <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
            Basic Information
          </h3>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Primary Target Role</label>
              <select
                className="form-select"
                value={formData.targetRole}
                onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
              >
                {JOB_ROLES.map(r => (
                  <option key={r.id} value={r.name}>{r.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Experience Level</label>
              <select
                className="form-select"
                value={formData.experienceLevel}
                onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
              >
                {EXPERIENCE_LEVELS.map(l => (
                  <option key={l.id} value={l.name}>{l.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Candidate Bio / Focus Statement</label>
            <textarea
              className="form-textarea"
              style={{ minHeight: '80px' }}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            />
          </div>
        </div>

        {/* Technical Skills & Target Companies */}
        <div className="card">
          <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
            Skills & Target Companies
          </h3>

          {/* Skills Tags */}
          <div className="form-group">
            <label className="form-label">Technical Skills & Focus Topics</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
              {formData.skills.map((skill) => (
                <span
                  key={skill}
                  style={{
                    backgroundColor: 'var(--accent-cyan-light)',
                    border: '1px solid rgba(6, 182, 212, 0.4)',
                    color: 'var(--accent-cyan)',
                    padding: '0.3rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.85rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontWeight: 600
                  }}
                >
                  {skill}
                  <X
                    size={14}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleRemoveSkill(skill)}
                  />
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Add a new skill (e.g. Docker, GraphQL, Redis)..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSkill(); } }}
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="btn btn-secondary"
              >
                <Plus size={16} /> Add
              </button>
            </div>
          </div>

          {/* Target Companies */}
          <div className="form-group" style={{ marginBottom: 0, marginTop: '1.5rem' }}>
            <label className="form-label">Dream Companies / Targets</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
              {formData.targetCompanies.map((comp) => (
                <span
                  key={comp}
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)',
                    padding: '0.3rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.85rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <Building size={12} style={{ color: 'var(--accent-cyan)' }} />
                  {comp}
                  <X
                    size={14}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleRemoveCompany(comp)}
                  />
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Add target company (e.g. Microsoft, Uber, Razorpay)..."
                value={newCompany}
                onChange={(e) => setNewCompany(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCompany(); } }}
              />
              <button
                type="button"
                onClick={handleAddCompany}
                className="btn btn-secondary"
              >
                <Plus size={16} /> Add
              </button>
            </div>
          </div>
        </div>

        {/* AI API Configuration (Optional) */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <Key size={18} style={{ color: 'var(--accent-cyan)' }} />
            <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>Custom AI API Key (Optional)</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1rem' }}>
            By default, InterVueX uses our built-in high-precision heuristic rubric engine. If you would like to connect your own Google Gemini API key for live generative evaluations, enter it here. Your key is stored strictly in your browser's localStorage and never transmitted to any third-party server.
          </p>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Gemini API Key</label>
            <input
              type="password"
              className="form-input"
              placeholder="AIzaSy..."
              value={formData.apiKey}
              onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
            />
          </div>
        </div>

        {/* Submit Save Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button
            type="submit"
            className="btn btn-primary btn-lg"
          >
            <Save size={18} /> Save Profile Settings
          </button>
        </div>
      </form>
    </div>
  );
}
