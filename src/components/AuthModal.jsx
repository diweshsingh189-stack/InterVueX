import React, { useState } from 'react';
import { X, LogIn, UserPlus, KeyRound, CheckCircle2 } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [tab, setTab] = useState('login'); // 'login' | 'signup' | 'forgot'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('alex.morgan@example.com');
  const [password, setPassword] = useState('••••••••');
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (tab === 'forgot') {
      if (!email.includes('@')) {
        setError('Please enter a valid email address.');
        return;
      }
      setResetSent(true);
      return;
    }

    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    // Success login/signup
    const user = {
      name: tab === 'signup' && name.trim() ? name.trim() : (email.split('@')[0] || 'Candidate'),
      email: email.trim(),
      targetRole: 'Full Stack Developer',
      experienceLevel: 'Intermediate',
      skills: ['JavaScript', 'React', 'Node.js', 'System Design']
    };

    onLoginSuccess(user);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>
              {tab === 'login' && 'Sign In to InterVueX'}
              {tab === 'signup' && 'Create Candidate Account'}
              {tab === 'forgot' && 'Reset Password'}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              {tab === 'login' && 'Access your personalized analytics and interview logs'}
              {tab === 'signup' && 'Start realistic role-based technical practice'}
              {tab === 'forgot' && 'Enter your email to receive recovery instructions'}
            </p>
          </div>
          <button onClick={onClose} className="btn btn-sm btn-ghost" style={{ padding: '0.35rem' }}>
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        {tab !== 'forgot' && (
          <div style={{
            display: 'flex',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-md)',
            padding: '0.3rem',
            marginBottom: '1.5rem',
            border: '1px solid var(--border-subtle)'
          }}>
            <button
              onClick={() => { setTab('login'); setError(''); }}
              style={{
                flex: 1,
                padding: '0.5rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                backgroundColor: tab === 'login' ? 'var(--surface-card)' : 'transparent',
                color: tab === 'login' ? 'var(--accent-cyan)' : 'var(--text-muted)',
                transition: 'all 0.2s ease'
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => { setTab('signup'); setError(''); }}
              style={{
                flex: 1,
                padding: '0.5rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                backgroundColor: tab === 'signup' ? 'var(--surface-card)' : 'transparent',
                color: tab === 'signup' ? 'var(--accent-cyan)' : 'var(--text-muted)',
                transition: 'all 0.2s ease'
              }}
            >
              Create Account
            </button>
          </div>
        )}

        {/* Reset Confirmation Notice */}
        {tab === 'forgot' && resetSent ? (
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--accent-cyan)',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem',
            textAlign: 'center',
            marginBottom: '1.5rem'
          }}>
            <CheckCircle2 size={36} style={{ color: 'var(--accent-cyan)', margin: '0 auto 0.75rem' }} />
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.4rem' }}>Reset Link Dispatched</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              We have sent a simulated password recovery email to <strong style={{ color: 'var(--accent-cyan)' }}>{email}</strong>.
            </p>
            <button
              onClick={() => { setTab('login'); setResetSent(false); }}
              className="btn btn-sm btn-primary"
              style={{ marginTop: '1.25rem', width: '100%' }}
            >
              Return to Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{
                backgroundColor: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid var(--accent-cyan)',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem',
                fontSize: '0.85rem',
                color: 'var(--accent-cyan)',
                marginBottom: '1rem'
              }}>
                {error}
              </div>
            )}

            {tab === 'signup' && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {tab !== 'forgot' && (
              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className="form-label">Password</label>
                  <button
                    type="button"
                    onClick={() => setTab('forgot')}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '0.75rem',
                      color: 'var(--accent-cyan)',
                      cursor: 'pointer'
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              {tab === 'login' && <><LogIn size={16} /> Sign In</>}
              {tab === 'signup' && <><UserPlus size={16} /> Create Free Account</>}
              {tab === 'forgot' && <><KeyRound size={16} /> Send Recovery Instructions</>}
            </button>

            {tab === 'forgot' && (
              <button
                type="button"
                onClick={() => setTab('login')}
                className="btn btn-ghost btn-sm"
                style={{ width: '100%', marginTop: '0.75rem' }}
              >
                Back to Sign In
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
