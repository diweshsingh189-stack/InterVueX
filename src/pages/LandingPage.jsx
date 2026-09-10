import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Bot, 
  Layers, 
  ShieldCheck, 
  Clock, 
  BarChart3, 
  Terminal, 
  Cpu, 
  MessageSquareCode, 
  ChevronDown,
  HelpCircle,
  Award,
  Zap
} from 'lucide-react';
import { JOB_ROLES, INTERVIEW_TYPES } from '../data/questionsData';
import ThreeDCarousel from '../components/ThreeDCarousel';

export default function LandingPage({ setActivePage }) {
  const [openFaq, setOpenFaq] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);


  const faqs = [
    {
      q: 'How does the AI evaluation work?',
      a: 'InterVueX analyzes your spoken or typed response using structured technical evaluation rubrics. It assesses technical accuracy, core keyword coverage, clarity, structure (like STAR format for behavioral questions), and communication confidence.'
    },
    {
      q: 'Do I need to pay or provide an API key to practice?',
      a: 'No! InterVueX includes a comprehensive offline semantic evaluation engine with curated questions and mock data ready out of the box. You can optionally add your own Gemini API key in Profile settings for custom generative evaluations.'
    },
    {
      q: 'Can I practice by speaking instead of typing?',
      a: 'Yes. InterVueX features built-in Web Speech recognition so you can speak your answers naturally as well as hear the interviewer read questions aloud.'
    },
    {
      q: 'Which roles are supported?',
      a: 'We support 8 dedicated engineering tracks including Software Developer, Frontend, Backend, Full Stack, Data Analyst, Python, Java, and C++ across Fresher to Advanced levels.'
    },
    {
      q: 'How are my reports and scores saved?',
      a: 'All interview transcripts, metrics, and progress logs are persisted locally in your browser so your history is always preserved.'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2vw, 1.75rem)', paddingBottom: '2.5rem' }}>
      {/* Hero Section */}
      {/* Hero Section with Responsive 3D 5-Page Auto-Scroller Showcase */}
      <section className="landing-hero-section" style={{
        maxWidth: '1360px',
        margin: '0 auto',
        padding: '0.5rem 0.5rem 0.25rem',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div className="landing-hero-grid">
          {/* Left Column: Hero Text Content & Highlights */}
          <div className="landing-hero-content" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'left',
            width: '100%'
          }}>
            {/* Badge - shifted slightly to right as requested */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'var(--accent-cyan-light)',
              border: '1px solid var(--accent-cyan)',
              borderRadius: 'var(--radius-full)',
              padding: '0.4rem 1.15rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--accent-cyan)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              marginLeft: 'clamp(0.5rem, 2.5vw, 1.85rem)',
              boxShadow: '0 0 16px rgba(6, 182, 212, 0.15)'
            }}>
              <Sparkles size={14} /> Production-Grade Interview Simulation
            </div>

            {/* Heading */}
            <h1 style={{
              fontSize: 'clamp(1.85rem, 4.5vw, 3.4rem)',
              fontWeight: 800,
              lineHeight: '1.18',
              letterSpacing: '-0.03em',
              marginBottom: '1rem',
              color: 'var(--text-primary)'
            }}>
              Practice Smarter. <br />
              <span style={{ color: 'var(--accent-cyan)' }}>Interview Better.</span>
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              maxWidth: '560px',
              marginBottom: '1.5rem'
            }}>
              Realistic, role-tailored technical and behavioral interview practice with instant rubric evaluation, speech recognition, and actionable feedback.
            </p>

            {/* CTAs */}
            <div className="hero-cta-group" style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '0.75rem',
              width: '100%',
              marginBottom: '0'
            }}>
              <button
                onClick={() => setActivePage('setup')}
                className="btn btn-primary btn-lg hero-btn"
                style={{ minWidth: '200px' }}
              >
                Start Interview <ArrowRight size={18} />
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('how-it-works');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-secondary btn-lg hero-btn"
                style={{ minWidth: '180px' }}
              >
                Explore Features
              </button>
            </div>
          </div>

          {/* Right Column: Premium 3D 5-Page Auto-Scroller Visual Showcase */}
          <div className="landing-hero-visual-wrapper" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            maxWidth: '750px',
            margin: '0 auto'
          }}>
            <ThreeDCarousel 
              currentSlide={currentSlide} 
              onSlideChange={setCurrentSlide} 
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works">
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '0.4rem' }}>Workflow</span>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', color: 'var(--text-primary)' }}>How InterVueX Works</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.3rem', fontSize: '0.95rem' }}>
            Four structured steps from setup to deep performance breakdown.
          </p>
        </div>

        <div className="grid-4">
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--accent-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-cyan)',
              fontWeight: 800
            }}>
              01
            </div>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>Configure Session</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Select your target role, experience level, interview style (Technical, HR, Behavioral, or Mixed), and difficulty.
            </p>
          </div>

          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--accent-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-cyan)',
              fontWeight: 800
            }}>
              02
            </div>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>Live Simulation</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Experience timed questions read aloud with optional camera preview. Answer via speech-to-text or structured typing.
            </p>
          </div>

          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--accent-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-cyan)',
              fontWeight: 800
            }}>
              03
            </div>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>Instant AI Evaluation</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Receive immediate grading on relevance, technical accuracy, clarity, and completeness with constructive tips.
            </p>
          </div>

          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--accent-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-cyan)',
              fontWeight: 800
            }}>
              04
            </div>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>Full Analytics Report</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Inspect your scorecards, radar skill breakdowns, strong areas, weaknesses, and personalized study recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* Role Tracks Grid */}
      <section id="specializations-tracks">
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '0.4rem' }}>Specializations</span>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', color: 'var(--text-primary)' }}>8 Tailored Engineering Tracks</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.3rem', fontSize: '0.95rem' }}>
            Questions calibrated precisely for each technology domain and hiring level.
          </p>
        </div>

        <div className="grid-4">
          {JOB_ROLES.map(role => (
            <div 
              key={role.id} 
              className="card"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <Terminal size={18} style={{ color: 'var(--accent-cyan)' }} />
                  <h3 style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>{role.name}</h3>
                </div>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                  {role.description}
                </p>
              </div>
              <button
                onClick={() => setActivePage('setup')}
                className="btn btn-sm btn-secondary"
                style={{ width: '100%', justifyContent: 'space-between' }}
              >
                <span>Practice Track</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Why InterVueX Comparison */}
      <section id="why-choose-us" style={{
        backgroundColor: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: 'clamp(1.25rem, 2.5vw, 2rem)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '0.4rem' }}>Value Proposition</span>
          <h2 style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', color: 'var(--text-primary)' }}>Why Choose InterVueX?</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.3rem', fontSize: '0.95rem' }}>
            Engineered specifically to mirror real FAANG, tier-1 tech, and enterprise hiring rubrics.
          </p>
        </div>

        <div className="grid-3">
          <div style={{ display: 'flex', gap: '0.85rem' }}>
            <div style={{ color: 'var(--accent-cyan)', marginTop: '0.2rem', flexShrink: 0 }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>Zero Fake Fluff</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                No generic chatbot responses. Every evaluation is grounded in concrete concepts, algorithmic accuracy, and delivery clarity.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.85rem' }}>
            <div style={{ color: 'var(--accent-cyan)', marginTop: '0.2rem', flexShrink: 0 }}>
              <MessageSquareCode size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>STAR Method Scoring</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Behavioral questions evaluate Situation, Task, Action, and Result formatting to ensure answers stand out in leadership rounds.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.85rem' }}>
            <div style={{ color: 'var(--accent-cyan)', marginTop: '0.2rem', flexShrink: 0 }}>
              <BarChart3 size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>Quantified Skill Radars</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Track metrics across sessions to visually pinpoint your exact weak points before stepping into real interview loops.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '0.5rem' }}>FAQ</span>
          <h2 style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', color: 'var(--text-primary)' }}>Frequently Asked Questions</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.4rem', fontSize: '0.95rem' }}>
            Everything you need to know about the simulator and evaluation engine.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                style={{
                  backgroundColor: 'var(--surface-card)',
                  border: isOpen ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s ease'
                }}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  style={{
                    width: '100%',
                    padding: '1rem 1.25rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    textAlign: 'left',
                    cursor: 'pointer',
                    gap: '0.75rem'
                  }}
                >
                  <span style={{ wordBreak: 'break-word' }}>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      color: isOpen ? 'var(--accent-cyan)' : 'var(--text-muted)',
                      flexShrink: 0
                    }}
                  />
                </button>
                {isOpen && (
                  <div style={{
                    padding: '0 1.25rem 1.25rem',
                    color: 'var(--text-secondary)',
                    fontSize: '0.875rem',
                    lineHeight: '1.6',
                    borderTop: '1px solid var(--border-subtle)',
                    paddingTop: '0.75rem',
                    wordBreak: 'break-word'
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Final CTA */}
      <section style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--accent-cyan)',
        borderRadius: 'var(--radius-lg)',
        padding: 'clamp(1.75rem, 4vw, 3rem) 1.25rem',
        textAlign: 'center',
        boxShadow: '0 0 25px rgba(6, 182, 212, 0.1)'
      }}>
        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', color: 'var(--text-primary)', marginBottom: '0.75rem', lineHeight: 1.25 }}>
          Ready to Ace Your Next Technical Round?
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 1.75rem', fontSize: '0.95rem', lineHeight: '1.6' }}>
          Start your first simulation in seconds. No sign-up required to test questions.
        </p>
        <button
          onClick={() => setActivePage('setup')}
          className="btn btn-primary btn-lg"
          style={{ maxWidth: '280px', margin: '0 auto' }}
        >
          <Sparkles size={18} /> Launch Simulator Now
        </button>
      </section>
    </div>
  );
}
