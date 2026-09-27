import React, { useState } from 'react';
import { 
  Bot, 
  Mic, 
  Code2, 
  Building2, 
  ArrowRight, 
  Sparkles, 
  Trophy, 
  Target, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Award, 
  Briefcase, 
  Layers, 
  BarChart3, 
  Grid, 
  Rocket, 
  Compass, 
  ChevronDown, 
  ChevronUp,
  FileCode,
  Terminal
} from 'lucide-react';
import { TrendChart, RadarChart } from '../components/PerformanceChart';
import ReadinessScoreCard from '../components/ReadinessScoreCard';
import { formatDate } from '../utils/formatters';

// Clean SVG Company Icons
const CompanyLogos = {
  google: () => (
    <svg width="22" height="22" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
    </svg>
  ),
  amazon: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M13.9 14.6c-2.3 1.7-5.7 2.6-8.6 2.6-4.1 0-7.7-1.5-10.5-4.1-.2-.2 0-.5.2-.4 3 1.8 6.8 2.8 10.7 2.8 2.6 0 5.5-.6 8-1.5.4-.2.7.3.2.6z" fill="#FF9900"/>
      <path d="M15.4 13.5c-.3-.4-1.9-.2-2.6-.1-.2 0-.3-.2-.1-.3 1.3-.9 3.5-.7 3.8-.3.3.4-.1 2.5-1.3 3.5-.2.1-.3 0-.3-.1.2-.7.8-2.3.5-2.7z" fill="#FF9900"/>
      <path d="M12.5 4.5C8 4.5 4.5 7.5 4.5 11c0 2.2 1.4 4.2 3.5 5.3.3.2.6 0 .6-.3v-.8c0-.2-.1-.4-.3-.5-1.5-.9-2.4-2.3-2.4-3.7 0-2.6 2.8-4.8 6.6-4.8s6.6 2.2 6.6 4.8c0 1.4-.9 2.8-2.4 3.7-.2.1-.3.3-.3.5v.8c0 .3.3.5.6.3 2.1-1.1 3.5-3.1 3.5-5.3 0-3.5-3.5-6.5-8-6.5z" fill="#FFFFFF"/>
    </svg>
  ),
  microsoft: () => (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <rect x="1" y="1" width="10" height="10" fill="#F25022"/>
      <rect x="13" y="1" width="10" height="10" fill="#7FBA00"/>
      <rect x="1" y="13" width="10" height="10" fill="#00A4EF"/>
      <rect x="13" y="13" width="10" height="10" fill="#FFB900"/>
    </svg>
  ),
  meta: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#0668E1">
      <path d="M12 4.2C7.3 4.2 3.6 7.4 3.6 11.4c0 2.3 1.2 4.4 3.1 5.7-.2.7-.8 2.5-.9 2.8-.1.4.2.6.5.4.4-.3 2.5-1.7 3.3-2.2.8.2 1.6.3 2.4.3 4.7 0 8.4-3.2 8.4-7.2S16.7 4.2 12 4.2z"/>
    </svg>
  ),
  apple: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.58.67-.99 1.74-.86 2.77 1.01.08 2.05-.52 2.59-1.27z"/>
    </svg>
  )
};

export default function Dashboard({ 
  history = [], 
  userProfile, 
  onStartNew, 
  onViewReport, 
  onBrowseQuestions 
}) {
  const [showDeepAnalytics, setShowDeepAnalytics] = useState(false);

  // Compute stats from real history or realistic baseline
  const totalInterviews = history.length > 0 ? history.length : 12;
  const avgScore = history.length > 0
    ? Number((history.reduce((acc, h) => acc + (h.overallScore || 0), 0) / history.length).toFixed(1))
    : 7.8;
  const bestScore = history.length > 0
    ? Math.max(...history.map(h => h.overallScore || 0))
    : 9.2;
  const completedCount = history.length > 0 ? history.filter(h => h.overallScore >= 7.0).length : 8;

  // Fallback realistic recent activity if history is fresh
  const recentSessions = history.length > 0 ? history.slice(0, 4) : [
    {
      id: 'inv-demo-1',
      role: 'Full Stack Developer',
      company: 'Google',
      type: 'Technical Interview',
      overallScore: 7.8,
      date: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
      timeAgo: '2 hours ago'
    },
    {
      id: 'inv-demo-2',
      role: 'Software Engineer',
      company: 'Amazon',
      type: 'Behavioral Interview',
      overallScore: 8.5,
      date: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
      timeAgo: '5 hours ago'
    },
    {
      id: 'inv-demo-3',
      role: 'Frontend Developer',
      company: 'General Tech',
      type: 'Coding Practice - DSA',
      overallScore: 9.0,
      date: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
      timeAgo: '1 day ago'
    }
  ];

  // Aggregated radar scores
  const aggScores = {
    technical: 8.4,
    relevance: 8.6,
    clarity: 8.0,
    communication: 8.2,
    completeness: 7.9
  };

  if (history.length > 0) {
    let t = 0, r = 0, cl = 0, cm = 0, cp = 0;
    history.forEach(h => {
      const sc = h.scores || {};
      t += sc.technical || 7.5;
      r += sc.relevance || 7.5;
      cl += sc.clarity || 7.5;
      cm += sc.communication || 7.5;
      cp += sc.completeness || 7.5;
    });
    aggScores.technical = Number((t / history.length).toFixed(1));
    aggScores.relevance = Number((r / history.length).toFixed(1));
    aggScores.clarity = Number((cl / history.length).toFixed(1));
    aggScores.communication = Number((cm / history.length).toFixed(1));
    aggScores.completeness = Number((cp / history.length).toFixed(1));
  }

  const handleLaunchMode = (modeType) => {
    if (onStartNew) {
      onStartNew({ type: modeType });
    }
  };

  const handleCompanyClick = (companyId) => {
    if (onStartNew) {
      onStartNew({ company: companyId });
    }
  };

  return (
    <div style={{ maxWidth: '1180px', margin: '0 auto', paddingBottom: '3.5rem', width: '100%', boxSizing: 'border-box' }}>
      
      {/* ========================================================= */}
      {/* 1. HERO PRODUCT BANNER                                   */}
      {/* ========================================================= */}
      <div 
        style={{
          position: 'relative',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(11, 17, 32, 0.98) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          padding: 'clamp(1.5rem, 3.5vw, 2.25rem)',
          marginBottom: '2rem',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: '1.75rem',
          alignItems: 'center',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
        }}
      >
        {/* Left Hero Details */}
        <div style={{ zIndex: 2 }}>
          <h1 style={{ 
            fontSize: 'clamp(1.8rem, 3.8vw, 2.5rem)', 
            fontWeight: 800, 
            color: '#FFFFFF', 
            letterSpacing: '-0.025em',
            lineHeight: 1.2,
            marginBottom: '0.4rem'
          }}>
            Hello, <span style={{ color: 'var(--accent-cyan)' }}>{userProfile?.name || 'Diwesh'}</span> 👋
          </h1>

          <h2 style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            fontWeight: 600,
            color: '#E2E8F0',
            marginBottom: '0.65rem',
            letterSpacing: '-0.01em'
          }}>
            Your AI-powered interview preparation partner
          </h2>

          <p style={{ 
            color: '#94A3B8', 
            fontSize: '0.925rem', 
            lineHeight: '1.55',
            maxWidth: '520px',
            marginBottom: '1.25rem'
          }}>
            Practice real interview questions, get instant feedback, and build the confidence you need to get hired.
          </p>

          {/* 3 Interactive Value Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center' }}>
            {/* Pill 1: AI Feedback */}
            <button
              type="button"
              onClick={() => {
                setShowDeepAnalytics(true);
                setTimeout(() => {
                  const el = document.getElementById('deep-analytics-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }, 50);
              }}
              title="Click to view AI Rubric & Feedback Breakdown"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: 'rgba(6, 182, 212, 0.15)',
                border: '1px solid rgba(6, 182, 212, 0.45)',
                color: '#38BDF8',
                fontSize: '0.8rem',
                fontWeight: 600,
                padding: '0.4rem 0.85rem',
                borderRadius: '9999px',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 2px 8px rgba(6, 182, 212, 0.15)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.25)';
                e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(6, 182, 212, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.45)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(6, 182, 212, 0.15)';
              }}
            >
              <Sparkles size={14} style={{ color: 'var(--accent-cyan)' }} />
              AI Feedback
            </button>

            {/* Pill 2: Real Interview Experience */}
            <button
              type="button"
              onClick={() => onStartNew?.({ type: 'technical' })}
              title="Click to start a realistic AI Interview simulation"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: 'rgba(30, 41, 59, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#F1F5F9',
                fontSize: '0.8rem',
                fontWeight: 600,
                padding: '0.4rem 0.85rem',
                borderRadius: '9999px',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(51, 65, 85, 0.95)';
                e.currentTarget.style.borderColor = '#A855F7';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(168, 85, 247, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.85)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.color = '#F1F5F9';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
              }}
            >
              <Briefcase size={14} style={{ color: '#C084FC' }} />
              Real Interview Experience
            </button>

            {/* Pill 3: Personalized Roadmap */}
            <button
              type="button"
              onClick={() => onBrowseQuestions?.()}
              title="Click to open your Personalized Practice Questions Roadmap"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: 'rgba(30, 41, 59, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#F1F5F9',
                fontSize: '0.8rem',
                fontWeight: 600,
                padding: '0.4rem 0.85rem',
                borderRadius: '9999px',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(51, 65, 85, 0.95)';
                e.currentTarget.style.borderColor = '#10B981';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(16, 185, 129, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.85)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.color = '#F1F5F9';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
              }}
            >
              <Target size={14} style={{ color: '#34D399' }} />
              Personalized Roadmap
            </button>
          </div>
        </div>

        {/* Right Hero Visual Card with Full Uncropped Photo */}
        <div style={{
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundColor: '#070C18',
          border: '1px solid rgba(6, 182, 212, 0.35)',
          boxShadow: '0 12px 35px rgba(0, 0, 0, 0.6)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          minHeight: '250px',
          aspectRatio: '16 / 9',
          width: '100%'
        }}>
          {/* Main Photo */}
          <img 
            src="/interview-slide-1.jpg" 
            alt="InterVueX AI Interview Simulator"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center center',
              display: 'block'
            }}
          />

          {/* Smooth Bottom Vignette Overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(7, 12, 24, 0.95) 0%, rgba(7, 12, 24, 0.35) 45%, transparent 100%)',
            pointerEvents: 'none'
          }} />

          {/* Bottom Floating Info & Action Bar */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            padding: '1rem 1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '0.75rem',
            backgroundColor: 'rgba(7, 12, 24, 0.75)',
            backdropFilter: 'blur(8px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div>
              <div style={{
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                color: 'var(--accent-cyan)',
                fontWeight: 800,
                letterSpacing: '0.08em',
                marginBottom: '0.2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}>
                <Sparkles size={11} /> Next-Gen Simulator
              </div>
              <div style={{ fontSize: '0.975rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
                Ready to level up your career?
              </div>
            </div>

            <button
              onClick={() => onStartNew?.()}
              className="btn btn-primary btn-sm"
              style={{
                padding: '0.45rem 0.95rem',
                fontSize: '0.8rem',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 15px rgba(6, 182, 212, 0.35)'
              }}
            >
              Start Now <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. CHOOSE YOUR INTERVIEW MODE                             */}
      {/* ========================================================= */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em', marginBottom: '0.2rem' }}>
            Choose Your Interview Mode
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '0.85rem' }}>
            Select a mode and start your interview journey
          </p>
        </div>

        {/* 4 Mode Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 245px), 1fr))',
          gap: '1rem'
        }}>
          {/* Card 1: AI Interviewer */}
          <div 
            onClick={() => handleLaunchMode('technical')}
            style={{
              backgroundColor: '#070E1E',
              border: '1px solid rgba(6, 182, 212, 0.35)',
              borderRadius: '14px',
              padding: '1.25rem',
              cursor: 'pointer',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.borderColor = 'var(--accent-cyan)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(6, 182, 212, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.35)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
            }}
          >
            <div>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(6, 182, 212, 0.16)',
                border: '1px solid rgba(6, 182, 212, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#38BDF8',
                marginBottom: '1rem'
              }}>
                <Bot size={24} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem', letterSpacing: '-0.01em' }}>
                AI Interviewer
              </h3>
              <p style={{ fontSize: '0.84rem', color: '#CBD5E1', lineHeight: '1.45', marginBottom: '1.25rem', fontWeight: 500 }}>
                Real-time AI questions with intelligent feedback
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'rgba(6, 182, 212, 0.18)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#38BDF8'
              }}>
                <ArrowRight size={15} />
              </div>
            </div>
          </div>

          {/* Card 2: Voice Interview */}
          <div 
            onClick={() => handleLaunchMode('behavioral')}
            style={{
              backgroundColor: '#100C1F',
              border: '1px solid rgba(168, 85, 247, 0.35)',
              borderRadius: '14px',
              padding: '1.25rem',
              cursor: 'pointer',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.borderColor = '#C084FC';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(168, 85, 247, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.35)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
            }}
          >
            <div>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(168, 85, 247, 0.16)',
                border: '1px solid rgba(168, 85, 247, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#C084FC',
                marginBottom: '1rem'
              }}>
                <Mic size={24} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem', letterSpacing: '-0.01em' }}>
                Voice Interview
              </h3>
              <p style={{ fontSize: '0.84rem', color: '#CBD5E1', lineHeight: '1.45', marginBottom: '1.25rem', fontWeight: 500 }}>
                Speak your answers and get evaluated
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'rgba(168, 85, 247, 0.18)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#C084FC'
              }}>
                <ArrowRight size={15} />
              </div>
            </div>
          </div>

          {/* Card 3: Practice Mode */}
          <div 
            onClick={() => onBrowseQuestions?.()}
            style={{
              backgroundColor: '#081715',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              borderRadius: '14px',
              padding: '1.25rem',
              cursor: 'pointer',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.borderColor = '#34D399';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(16, 185, 129, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.35)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
            }}
          >
            <div>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(16, 185, 129, 0.16)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#34D399',
                marginBottom: '1rem'
              }}>
                <Code2 size={24} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem', letterSpacing: '-0.01em' }}>
                Practice Mode
              </h3>
              <p style={{ fontSize: '0.84rem', color: '#CBD5E1', lineHeight: '1.45', marginBottom: '1.25rem', fontWeight: 500 }}>
                Solve coding questions and get instant results
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'rgba(16, 185, 129, 0.18)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#34D399'
              }}>
                <ArrowRight size={15} />
              </div>
            </div>
          </div>

          {/* Card 4: Mock Interview */}
          <div 
            onClick={() => handleLaunchMode('mixed')}
            style={{
              backgroundColor: '#1E1208',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              borderRadius: '14px',
              padding: '1.25rem',
              cursor: 'pointer',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.borderColor = '#FBBF24';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(245, 158, 11, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.35)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
            }}
          >
            <div>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(245, 158, 11, 0.16)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FBBF24',
                marginBottom: '1rem'
              }}>
                <Building2 size={24} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem', letterSpacing: '-0.01em' }}>
                Mock Interview
              </h3>
              <p style={{ fontSize: '0.84rem', color: '#CBD5E1', lineHeight: '1.45', marginBottom: '1.25rem', fontWeight: 500 }}>
                Full interview simulation with score & feedback
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'rgba(245, 158, 11, 0.18)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FBBF24'
              }}>
                <ArrowRight size={15} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. POPULAR COMPANIES                                      */}
      {/* ========================================================= */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em', marginBottom: '0.2rem' }}>
              Popular Companies
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '0.85rem' }}>
              Prepare for top tech companies and boost your chances.
            </p>
          </div>

          <button 
            onClick={() => onBrowseQuestions?.()}
            className="btn btn-sm btn-ghost"
            style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem', padding: '0.3rem 0.6rem' }}
          >
            View All &rarr;
          </button>
        </div>

        {/* Company Logos Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 120px), 1fr))',
          gap: '0.75rem'
        }}>
          {[
            { id: 'google', name: 'Google', icon: <CompanyLogos.google /> },
            { id: 'amazon', name: 'Amazon', icon: <CompanyLogos.amazon /> },
            { id: 'microsoft', name: 'Microsoft', icon: <CompanyLogos.microsoft /> },
            { id: 'meta', name: 'Meta', icon: <CompanyLogos.meta /> },
            { id: 'tcs', name: 'TCS', customLabel: <span style={{ color: '#EF4444', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.05em' }}>tcs</span> },
            { id: 'infosys', name: 'Infosys', customLabel: <span style={{ color: '#007CC3', fontWeight: 700, fontSize: '1rem', fontStyle: 'italic' }}>Infosys</span> },
            { id: 'apple', name: 'Apple', icon: <CompanyLogos.apple /> },
            { id: 'more', name: 'More', icon: <Grid size={20} style={{ color: '#94A3B8' }} /> }
          ].map(comp => (
            <div
              key={comp.id}
              onClick={() => comp.id === 'more' ? onBrowseQuestions?.() : handleCompanyClick(comp.id)}
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '1rem 0.75rem',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(20, 30, 55, 0.85)';
                e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.4)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.6)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {comp.customLabel || comp.icon}
              </div>
              <span style={{ fontSize: '0.78rem', color: '#CBD5E1', fontWeight: 500 }}>
                {comp.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. TWO-COLUMN GRID: YOUR PROGRESS & RECENT ACTIVITY       */}
      {/* ========================================================= */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {/* Left Column: Your Progress */}
        <div style={{
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.25rem' }}>
              Your Progress
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '0.825rem', marginBottom: '1.25rem' }}>
              Track your improvement over time
            </p>

            {/* 4 Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.85rem'
            }}>
              {/* Total Interviews */}
              <div style={{
                backgroundColor: 'rgba(11, 17, 32, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '12px',
                padding: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94A3B8', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  <Target size={14} style={{ color: 'var(--accent-cyan)' }} />
                  <span>Total Interviews</span>
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#FFFFFF' }}>
                  {totalInterviews}
                </div>
              </div>

              {/* Average Score */}
              <div style={{
                backgroundColor: 'rgba(11, 17, 32, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '12px',
                padding: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94A3B8', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  <Trophy size={14} style={{ color: '#F59E0B' }} />
                  <span>Average Score</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                  <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#FFFFFF' }}>
                    {Math.round(avgScore * 10)}%
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 700 }}>
                    +12%
                  </span>
                </div>
              </div>

              {/* Best Score */}
              <div style={{
                backgroundColor: 'rgba(11, 17, 32, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '12px',
                padding: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94A3B8', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  <Award size={14} style={{ color: '#EAB308' }} />
                  <span>Best Score</span>
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#FFFFFF' }}>
                  {Math.round(bestScore * 10)}%
                </div>
              </div>

              {/* Completed */}
              <div style={{
                backgroundColor: 'rgba(11, 17, 32, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '12px',
                padding: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94A3B8', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  <CheckCircle2 size={14} style={{ color: '#10B981' }} />
                  <span>Completed</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    border: '3px solid #10B981',
                    borderTopColor: 'transparent',
                    transform: 'rotate(45deg)'
                  }} />
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF' }}>
                    {completedCount}/10
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Activity */}
        <div style={{
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.15rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF' }}>
                Recent Activity
              </h3>
              <button 
                onClick={() => onBrowseQuestions?.()}
                className="btn btn-sm btn-ghost"
                style={{ color: 'var(--accent-cyan)', fontSize: '0.8rem', padding: '0.2rem 0.5rem' }}
              >
                View All &rarr;
              </button>
            </div>

            {/* List of Recent Activities */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {recentSessions.map((session, idx) => (
                <div
                  key={session.id || idx}
                  onClick={() => onViewReport ? onViewReport(session) : onStartNew?.()}
                  style={{
                    backgroundColor: 'rgba(11, 17, 32, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '10px',
                    padding: '0.75rem 1rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.75rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(20, 30, 55, 0.85)';
                    e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.35)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(11, 17, 32, 0.7)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '8px',
                      backgroundColor: idx === 0 ? 'rgba(99, 102, 241, 0.2)' : (idx === 1 ? 'rgba(168, 85, 247, 0.2)' : 'rgba(6, 182, 212, 0.2)'),
                      color: idx === 0 ? '#818CF8' : (idx === 1 ? '#C084FC' : 'var(--accent-cyan)'),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {idx === 0 ? <Code2 size={16} /> : (idx === 1 ? <Briefcase size={16} /> : <Terminal size={16} />)}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#F8FAFC' }}>
                        {session.type || `${session.role} - ${session.company || 'Tech'}`}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                        Score: <strong style={{ color: 'var(--accent-cyan)' }}>{Math.round((session.overallScore || 7.5) * 10)}%</strong>
                      </div>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.75rem', color: '#64748B', whiteSpace: 'nowrap' }}>
                    {session.timeAgo || formatDate(session.date)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 5. BOTTOM CTA BANNER: READY FOR OPPORTUNITY               */}
      {/* ========================================================= */}
      <div style={{
        borderRadius: '16px',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(14, 28, 56, 0.95) 100%)',
        border: '1px solid rgba(6, 182, 212, 0.35)',
        padding: '1.25rem 1.75rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '2rem',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            fontSize: '1.8rem',
            lineHeight: 1
          }}>
            🚀
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.2rem' }}>
              Ready for your next big opportunity?
            </h3>
            <p style={{ fontSize: '0.825rem', color: '#94A3B8' }}>
              Keep practicing, stay consistent, and achieve your dream job!
            </p>
          </div>
        </div>

        <button
          onClick={() => onStartNew?.()}
          className="btn btn-primary"
          style={{ padding: '0.6rem 1.35rem', fontSize: '0.875rem' }}
        >
          Start Interview <ArrowRight size={16} />
        </button>
      </div>

      {/* ========================================================= */}
      {/* 6. EXPANDABLE DEEP-DIVE ANALYTICS & SKILLS RADAR          */}
      {/* ========================================================= */}
      <div 
        id="deep-analytics-section"
        style={{
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '1.25rem 1.5rem',
          scrollMarginTop: '2rem'
        }}
      >
        <div 
          onClick={() => setShowDeepAnalytics(prev => !prev)}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <BarChart3 size={20} style={{ color: 'var(--accent-cyan)' }} />
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF' }}>
                Advanced Rubric Analytics & Readiness Breakdown
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                Explore 5-pillar skill polygon, historical trend line, and 7-day preparation roadmap.
              </p>
            </div>
          </div>

          <button className="btn btn-sm btn-ghost" style={{ color: 'var(--accent-cyan)' }}>
            {showDeepAnalytics ? <><ChevronUp size={16} /> Collapse</> : <><ChevronDown size={16} /> Expand</>}
          </button>
        </div>

        {showDeepAnalytics && (
          <div style={{ marginTop: '1.5rem', animation: 'fadeIn 0.3s ease' }}>
            {/* Readiness Scorecard */}
            <div style={{ marginBottom: '1.5rem' }}>
              <ReadinessScoreCard 
                history={history} 
                userProfile={userProfile} 
                onStartPractice={onStartNew} 
              />
            </div>

            {/* Performance Trend Line + Aggregate Skill Radar */}
            <div className="grid-2" style={{ gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div className="card" style={{ padding: '1.25rem' }}>
                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div>
                    <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>Performance Trajectory</h4>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Score progression over recent simulation attempts.</p>
                  </div>
                  <span className="badge badge-cyan">Last Sessions</span>
                </div>
                <TrendChart history={history} />
              </div>

              <div className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="card-header" style={{ width: '100%', marginBottom: '0.75rem' }}>
                  <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>Cumulative Skill Polygon</h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Average ratings across technical & behavioral pillars.</p>
                </div>
                <RadarChart scores={aggScores} size={230} />
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
