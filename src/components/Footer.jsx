import React, { useState } from 'react';
import { Terminal, Shield, Cpu, Sparkles, MessageSquare } from 'lucide-react';
import FeedbackAdminModal from './FeedbackAdminModal';

export default function Footer({ setActivePage }) {
  const [feedbackAdminOpen, setFeedbackAdminOpen] = useState(false);

  return (
    <>
      <footer style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        padding: 'clamp(2rem, 4vw, 3rem) 1rem 1.5rem',
        marginTop: 'auto'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Col 1: Brand info */}
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--text-primary)' }}>
                InterVue<span style={{ color: 'var(--accent-cyan)' }}>X</span>
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1rem' }}>
              Realistic, AI-powered interview simulator engineered for modern software engineers, analysts, and tech job seekers.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>
              <span className="live-dot" /> High-Fidelity Evaluation Engine Active
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Platform Tracks
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem' }}>
              <li><button onClick={() => setActivePage('setup')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}>Software Engineering</button></li>
              <li><button onClick={() => setActivePage('setup')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}>Frontend & React</button></li>
              <li><button onClick={() => setActivePage('setup')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}>Backend & Distributed DBs</button></li>
              <li><button onClick={() => setActivePage('setup')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}>Data Analytics & SQL</button></li>
              <li><button onClick={() => setActivePage('questions')} style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer', padding: 0 }}>Browse Question Bank &rarr;</button></li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div>
            <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Candidate Tools
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem' }}>
              <li><button onClick={() => setActivePage('dashboard')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}>Performance Dashboard</button></li>
              <li><button onClick={() => setActivePage('history')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}>Past Session Reports</button></li>
              <li><button onClick={() => setActivePage('profile')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}>Target Role & Skills Matrix</button></li>
              <li><button onClick={() => setFeedbackAdminOpen(true)} style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer', padding: 0 }}>Feedback & Reviews Admin &rarr;</button></li>
            </ul>
          </div>

        {/* Col 4: Quality & Integrity */}
        <div>
          <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Core Philosophy
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '0.75rem' }}>
            Zero artificial fluff or fake scoring. Built to simulate authentic pressure, structured technical dialogue, and rigorous hiring rubric evaluation.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <Shield size={16} style={{ color: 'var(--accent-cyan)' }} />
            <span>Privacy First &bull; 100% Client Persistent</span>
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        paddingTop: '1.5rem',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '0.75rem',
        fontSize: '0.8rem',
        color: 'var(--text-dim)'
      }}>
        <div>&copy; {new Date().getFullYear()} InterVueX. Built for elite technical interview preparation.</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1rem' }}>
          <span>Strict 2-Color Architecture</span>
          <span>&bull;</span>
          <span>Web Speech Synthesis & Speech-to-Text</span>
        </div>
      </div>
    </footer>

    {/* Candidate Feedback & Reviews Admin Modal */}
    <FeedbackAdminModal
      isOpen={feedbackAdminOpen}
      onClose={() => setFeedbackAdminOpen(false)}
    />
    </>
  );
}
