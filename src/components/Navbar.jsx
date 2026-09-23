import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  PlayCircle, 
  LayoutDashboard, 
  BookOpen, 
  History, 
  User, 
  MoreVertical,
  Menu,
  X, 
  LogIn, 
  LogOut, 
  Sparkles,
  Sun,
  Moon,
  ChevronRight,
  Zap,
  Star,
  MessageSquare,
  Send,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Eye,
  ListChecks
} from 'lucide-react';
import { storageService } from '../services/storageService';
import FeedbackAdminModal from './FeedbackAdminModal';

export default function Navbar({ activePage, setActivePage, userProfile, theme, onToggleTheme, onOpenAuth, onLogout }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedBtn, setSelectedBtn] = useState(() => activePage === 'setup' ? 'new-interview' : activePage);
  const [feedbackForm, setFeedbackForm] = useState({
    name: userProfile?.name || '',
    address: '',
    email: userProfile?.email || '',
    phone: '',
    rating: 5,
    message: ''
  });

  useEffect(() => {
    if (activePage === 'setup') {
      setSelectedBtn('new-interview');
    } else if (activePage === 'start-session') {
      setSelectedBtn('start-session');
    } else {
      setSelectedBtn(activePage);
    }
  }, [activePage]);

  const handleNavClick = (btnKey, pageId) => {
    setSelectedBtn(btnKey);
    setActivePage(pageId);
  };

  useEffect(() => {
    if (userProfile?.name && !feedbackForm.name) {
      setFeedbackForm(prev => ({
        ...prev,
        name: userProfile.name,
        email: userProfile.email || prev.email
      }));
    }
  }, [userProfile]);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!feedbackForm.name.trim()) {
      alert('Please enter your Full Name');
      return;
    }
    const newFeedback = {
      ...feedbackForm,
      id: Date.now(),
      date: new Date().toISOString()
    };
    storageService.addFeedback(newFeedback);
    setFeedbackSubmitted(true);
  };

  // Workflow-ordered navigation
  const navItems = [
    { 
      id: 'setup', 
      btnKey: 'new-interview',
      label: 'New Interview', 
      desc: 'Start AI Mock Interview session',
      icon: PlayCircle 
    },
    { 
      id: 'questions', 
      btnKey: 'questions',
      label: 'Question Bank', 
      desc: 'Explore technical questions & scenarios',
      icon: BookOpen 
    },
    { 
      id: 'dashboard', 
      btnKey: 'dashboard',
      label: 'Dashboard', 
      desc: 'Overview, analytics & readiness score',
      icon: LayoutDashboard 
    },
    { 
      id: 'history', 
      btnKey: 'history',
      label: 'History', 
      desc: 'Past interview reports & transcripts',
      icon: History 
    },
  ];

  const isDark = theme === 'dark';

  // Handle drawer escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <nav style={{
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        transition: 'background-color 0.25s ease, border-color 0.25s ease',
        backdropFilter: 'blur(8px)',
        width: '100%',
        maxWidth: '100vw'
      }}>
        <div className="nav-container" style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0.55rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.65rem',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          
          {/* Left Section: Brand Logo */}
          <div className="nav-left-group" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            minWidth: 0,
            flexShrink: 0
          }}>
            {/* Brand Logo */}
            <div 
              onClick={() => setActivePage('landing')}
              className="nav-brand-wrapper"
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                userSelect: 'none',
                minWidth: 0
              }}
            >
              <div className="nav-brand-text-block">
                <div className="nav-brand-title" style={{
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: 'var(--text-primary)',
                  lineHeight: 1.15
                }}>
                  InterVue<span style={{ color: 'var(--accent-cyan)' }}>X</span>
                </div>
                <div className="nav-brand-subtitle" style={{
                  fontSize: '0.62rem',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  fontWeight: 600,
                  marginTop: '1px'
                }}>
                  AI Interview Simulator
                </div>
              </div>
            </div>
          </div>

          {/* Center Section: Desktop Nav Links (Consistent rounded pill / capsule styling) */}
          <div className="desktop-nav" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem'
          }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = selectedBtn === item.btnKey;
              return (
                <button
                  key={item.btnKey}
                  onClick={() => handleNavClick(item.btnKey, item.id)}
                  className={`btn btn-sm btn-secondary ${isActive ? 'active-glow-pulse' : ''}`}
                  style={{
                    color: isActive ? 'var(--accent-cyan)' : 'var(--text-primary)',
                    border: isActive ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                    backgroundColor: isActive ? 'var(--accent-cyan-light)' : 'var(--surface-card)',
                    fontWeight: isActive ? 700 : 600,
                    gap: '0.45rem',
                    padding: '0.4rem 0.8rem',
                    fontSize: '0.82rem',
                    borderRadius: 'var(--radius-full)',
                    boxShadow: isActive ? '0 0 10px var(--accent-cyan-glow)' : 'none',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                >
                  <Icon size={15} style={{ color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)' }} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Section Desktop: Primary Action -> User Profile -> Theme Toggle -> 3-Dot Menu */}
          <div className="desktop-actions" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            flexShrink: 0
          }}>
            {/* Action Button (Start Session - Dedicated Quick Interview Launch Workspace) */}
            <button
              onClick={() => handleNavClick('start-session', 'start-session')}
              className={`btn btn-sm btn-secondary ${selectedBtn === 'start-session' ? 'active-glow-pulse' : ''}`}
              title="Quick Interview Launch Workspace"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontWeight: selectedBtn === 'start-session' ? 700 : 600,
                padding: '0.4rem 0.8rem',
                fontSize: '0.82rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: selectedBtn === 'start-session' ? 'var(--accent-cyan-light)' : 'var(--surface-card)',
                border: selectedBtn === 'start-session' ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                color: selectedBtn === 'start-session' ? 'var(--accent-cyan)' : 'var(--text-primary)',
                boxShadow: selectedBtn === 'start-session' ? '0 0 12px var(--accent-cyan-glow)' : 'none',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
            >
              <Sparkles size={15} style={{ color: 'var(--accent-cyan)' }} />
              <span>Start Session</span>
            </button>

            {/* Profile / Account */}
            {userProfile ? (
              <button 
                onClick={() => handleNavClick('profile', 'profile')}
                className="btn btn-sm btn-ghost"
                title="View Profile & Settings"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  border: selectedBtn === 'profile' ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.35rem 0.75rem',
                  backgroundColor: selectedBtn === 'profile' ? 'var(--accent-cyan-light)' : 'var(--surface-card)',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-cyan-light)',
                  color: 'var(--accent-cyan)',
                  border: '1px solid var(--accent-cyan)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.72rem',
                  fontWeight: 700
                }}>
                  {userProfile.name ? userProfile.name.charAt(0) : 'U'}
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, maxWidth: '110px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {userProfile.name}
                </span>
              </button>
            ) : (
              <button 
                onClick={onOpenAuth}
                className="btn btn-sm btn-secondary"
                style={{ fontSize: '0.82rem', padding: '0.4rem 0.75rem' }}
              >
                <LogIn size={14} />
                Sign In
              </button>
            )}

            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="btn btn-sm btn-secondary"
              title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              style={{
                padding: '0.4rem 0.7rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 600
              }}
            >
              {isDark ? (
                <>
                  <Sun size={14} style={{ color: '#F59E0B' }} />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon size={14} style={{ color: '#0284C7' }} />
                  <span>Dark Mode</span>
                </>
              )}
            </button>

            {/* 3-Dot / Menu Quick Button (Desktop & All Views) */}
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open Navigation Menu"
              title="All Options & Menu"
              className="btn btn-secondary nav-three-dot-btn"
              style={{
                width: '34px',
                height: '34px',
                minWidth: '34px',
                minHeight: '34px',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--surface-card)',
                color: 'var(--accent-cyan)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                flexShrink: 0
              }}
            >
              <MoreVertical size={18} style={{ color: 'var(--accent-cyan)' }} />
            </button>
          </div>

          {/* Mobile Right Controls: Compact, Never Overflows */}
          <div className="mobile-toggle" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.35rem',
            flexShrink: 0
          }}>
            {/* Mobile Theme Toggle Icon Button */}
            <button
              onClick={onToggleTheme}
              className="btn btn-sm btn-secondary mobile-icon-btn"
              title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-full)',
                padding: 0
              }}
            >
              {isDark ? <Sun size={16} style={{ color: '#F59E0B' }} /> : <Moon size={16} style={{ color: '#0284C7' }} />}
            </button>

            {/* Mobile Profile Avatar or Quick Start Button */}
            {userProfile ? (
              <button
                onClick={() => setActivePage('profile')}
                className="btn btn-sm btn-ghost mobile-avatar-btn"
                title={`Profile: ${userProfile.name}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  borderRadius: '50%',
                  backgroundColor: 'var(--surface-card)',
                  border: '1px solid var(--accent-cyan)'
                }}
              >
                <div style={{
                  color: 'var(--accent-cyan)',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}>
                  {userProfile.name ? userProfile.name.charAt(0) : 'U'}
                </div>
              </button>
            ) : (
              <button
                onClick={() => setActivePage('setup')}
                className="btn btn-sm btn-primary mobile-start-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontWeight: 700
                }}
              >
                <Sparkles size={13} />
                <span>Start</span>
              </button>
            )}

            {/* Mobile 3-Dot / Menu Button */}
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open Navigation Menu"
              title="Menu & All Options"
              className="btn btn-secondary mobile-icon-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--surface-card)',
                color: 'var(--accent-cyan)',
                padding: 0,
                width: '34px',
                height: '34px',
                minWidth: '34px',
                minHeight: '34px',
                flexShrink: 0
              }}
            >
              <MoreVertical size={18} style={{ color: 'var(--accent-cyan)' }} />
            </button>
          </div>

        </div>
      </nav>

      {/* Slide-out Right Drawer / Quick Menu (Triggered by Three-dot button on Right) */}
      {drawerOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'flex-end',
          overflow: 'hidden'
        }}>
          {/* Backdrop Overlay (Crystal clear, zero blur, closes drawer on click) */}
          <div 
            onClick={() => setDrawerOpen(false)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.15)',
              cursor: 'pointer'
            }}
          />

          {/* Right Drawer Panel */}
          <div className="nav-drawer-panel" style={{
            position: 'relative',
            height: '100%',
            backgroundColor: 'var(--bg-primary)',
            borderLeft: '1px solid var(--border-subtle)',
            boxShadow: '-8px 0 35px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 10000,
            animation: 'navSlideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            overflowY: 'auto',
            boxSizing: 'border-box'
          }}>
            {/* Drawer Header */}
            <div style={{
              padding: '1.1rem 1.25rem',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--surface-card)',
                  border: '1px solid var(--accent-cyan)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-cyan)',
                  flexShrink: 0
                }}>
                  <Terminal size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--text-primary)', lineHeight: 1.2 }}>
                    InterVue<span style={{ color: 'var(--accent-cyan)' }}>X</span>
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                    Quick Navigation
                  </div>
                </div>
              </div>

              <button
                onClick={() => setDrawerOpen(false)}
                className="btn btn-sm btn-ghost"
                aria-label="Close Drawer"
                style={{ 
                  width: '32px', 
                  height: '32px', 
                  padding: 0, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  borderRadius: 'var(--radius-full)' 
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Fast Action CTA Banner */}
            <div style={{ padding: '0.85rem 1rem 0.4rem' }}>
              <div style={{
                padding: '0.9rem',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(6, 182, 212, 0.05))',
                border: '1px solid var(--accent-cyan)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Zap size={16} style={{ color: 'var(--accent-cyan)' }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Ready for Interview?
                  </span>
                </div>
                <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: 1.35, margin: 0 }}>
                  Fast-track technical interview simulation with calibrated candidate profile.
                </p>
                <button
                  onClick={() => {
                    setActivePage('start-session');
                    setDrawerOpen(false);
                  }}
                  className="btn btn-sm btn-primary"
                  style={{ width: '100%', justifyContent: 'center', fontWeight: 700 }}
                >
                  <Sparkles size={15} /> Quick Launch Workspace
                </button>
              </div>
            </div>

            {/* Navigation Section (Strict Priority Order: #1 New Interview -> #2 Questions -> #3 Dashboard -> #4 History) */}
            <div style={{ padding: '0.6rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <div style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-muted)',
                marginBottom: '0.2rem',
                paddingLeft: '0.35rem'
              }}>
                Workflow Steps (Priority Order)
              </div>

              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActivePage(item.id);
                      setDrawerOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.65rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: isActive ? 'var(--accent-cyan-light)' : 'var(--surface-card)',
                      border: isActive ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.18s ease',
                      width: '100%',
                      boxSizing: 'border-box'
                    }}
                  >
                    <div style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: isActive ? 'var(--accent-cyan)' : 'var(--bg-primary)',
                      color: isActive ? '#0F172A' : 'var(--accent-cyan)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontWeight: 700
                    }}>
                      <Icon size={15} />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        color: isActive ? 'var(--accent-cyan)' : 'var(--text-primary)'
                      }}>
                        <span>{item.label}</span>
                        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>#{index + 1}</span>
                      </div>
                      <div style={{
                        fontSize: '0.7rem',
                        color: 'var(--text-muted)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {item.desc}
                      </div>
                    </div>
                    
                    <ChevronRight size={14} style={{ color: isActive ? 'var(--accent-cyan)' : 'var(--text-muted)', flexShrink: 0 }} />
                  </button>
                );
              })}
            </div>

            {/* Candidate Feedback & Rating Form Section (Fills empty drawer space) */}
            <div style={{ padding: '0.5rem 1rem 1rem', flex: 1 }}>
              <div style={{
                backgroundColor: 'var(--surface-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.4rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <MessageSquare size={15} style={{ color: 'var(--accent-cyan)' }} />
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Candidate Feedback
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <button
                      type="button"
                      onClick={() => setAdminModalOpen(true)}
                      className="btn btn-sm btn-ghost"
                      style={{
                        fontSize: '0.68rem',
                        padding: '0.15rem 0.45rem',
                        color: 'var(--accent-cyan)',
                        border: '1px solid var(--accent-cyan)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}
                      title="View all submitted reviews & feedback"
                    >
                      <Eye size={12} /> Admin View
                    </button>
                    <span className="badge badge-cyan" style={{ fontSize: '0.62rem', padding: '0.12rem 0.4rem' }}>
                      ⭐ Review
                    </span>
                  </div>
                </div>

                {feedbackSubmitted ? (
                  <div style={{
                    padding: '0.85rem 0.5rem',
                    textAlign: 'center',
                    backgroundColor: 'var(--accent-cyan-light)',
                    border: '1px solid var(--accent-cyan)',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}>
                    <CheckCircle2 size={24} style={{ color: 'var(--accent-cyan)' }} />
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Thank You for Your Feedback!
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                      Your rating of {feedbackForm.rating} ★ has been recorded into storage.
                    </div>
                    <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.3rem' }}>
                      <button
                        onClick={() => setAdminModalOpen(true)}
                        className="btn btn-sm btn-secondary"
                        style={{ fontSize: '0.72rem', padding: '0.25rem 0.6rem' }}
                      >
                        <Eye size={12} /> View All Reviews
                      </button>
                      <button
                        onClick={() => setFeedbackSubmitted(false)}
                        className="btn btn-sm btn-ghost"
                        style={{ fontSize: '0.72rem', padding: '0.25rem 0.6rem' }}
                      >
                        New Response
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFeedbackSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {/* Star Rating Bar */}
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.25rem' }}>
                        Your Rating: <span style={{ color: '#F59E0B', fontWeight: 700 }}>{hoverRating || feedbackForm.rating} / 5 Stars</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        {[1, 2, 3, 4, 5].map((star) => {
                          const active = (hoverRating || feedbackForm.rating) >= star;
                          return (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setFeedbackForm(prev => ({ ...prev, rating: star }))}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                              aria-label={`Rate ${star} Star`}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '2px',
                                display: 'flex',
                                alignItems: 'center',
                                transition: 'transform 0.15s ease'
                              }}
                            >
                              <Star
                                size={18}
                                fill={active ? '#F59E0B' : 'transparent'}
                                color={active ? '#F59E0B' : 'var(--text-muted)'}
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Full Name */}
                    <div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.15rem' }}>
                        Full Name *
                      </div>
                      <div style={{ position: 'relative' }}>
                        <User size={13} style={{ position: 'absolute', left: '0.55rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                          type="text"
                          required
                          value={feedbackForm.name}
                          onChange={(e) => setFeedbackForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="e.g. Diwesh Singh"
                          className="form-input"
                          style={{ paddingLeft: '1.75rem', fontSize: '0.78rem', padding: '0.35rem 0.5rem 0.35rem 1.75rem' }}
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.15rem' }}>
                        Address *
                      </div>
                      <div style={{ position: 'relative' }}>
                        <MapPin size={13} style={{ position: 'absolute', left: '0.55rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                          type="text"
                          required
                          value={feedbackForm.address}
                          onChange={(e) => setFeedbackForm(prev => ({ ...prev, address: e.target.value }))}
                          placeholder="e.g. New Delhi, India"
                          className="form-input"
                          style={{ paddingLeft: '1.75rem', fontSize: '0.78rem', padding: '0.35rem 0.5rem 0.35rem 1.75rem' }}
                        />
                      </div>
                    </div>

                    {/* Email & Phone side by side */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
                      <div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.15rem' }}>
                          Email *
                        </div>
                        <div style={{ position: 'relative' }}>
                          <Mail size={12} style={{ position: 'absolute', left: '0.5rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                          <input
                            type="email"
                            required
                            value={feedbackForm.email}
                            onChange={(e) => setFeedbackForm(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="mail@ex.com"
                            className="form-input"
                            style={{ paddingLeft: '1.5rem', fontSize: '0.75rem', padding: '0.35rem 0.4rem 0.35rem 1.5rem' }}
                          />
                        </div>
                      </div>

                      <div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.15rem' }}>
                          Phone Number *
                        </div>
                        <div style={{ position: 'relative' }}>
                          <Phone size={12} style={{ position: 'absolute', left: '0.5rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                          <input
                            type="tel"
                            required
                            value={feedbackForm.phone}
                            onChange={(e) => setFeedbackForm(prev => ({ ...prev, phone: e.target.value }))}
                            placeholder="+91 9876..."
                            className="form-input"
                            style={{ paddingLeft: '1.5rem', fontSize: '0.75rem', padding: '0.35rem 0.4rem 0.35rem 1.5rem' }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Message / Suggestions */}
                    <div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.15rem' }}>
                        Feedback / Suggestion (Optional)
                      </div>
                      <textarea
                        rows={2}
                        value={feedbackForm.message}
                        onChange={(e) => setFeedbackForm(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Write your suggestions..."
                        className="form-input"
                        style={{ fontSize: '0.75rem', padding: '0.35rem 0.5rem', resize: 'none' }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-sm btn-primary"
                      style={{
                        marginTop: '0.2rem',
                        justifyContent: 'center',
                        gap: '0.4rem',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        padding: '0.45rem'
                      }}
                    >
                      <Send size={13} /> Submit Feedback
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Drawer Footer / Profile & Preferences */}
            <div style={{
              padding: '1rem',
              borderTop: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-secondary)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem'
            }}>

              {/* User Account Controls */}
              {userProfile ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <button 
                    onClick={() => { setActivePage('profile'); setDrawerOpen(false); }}
                    className="btn btn-ghost" 
                    style={{ 
                      justifyContent: 'flex-start',
                      gap: '0.6rem',
                      padding: '0.5rem 0.65rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--surface-card)',
                      border: '1px solid var(--border-subtle)',
                      width: '100%',
                      boxSizing: 'border-box'
                    }}
                  >
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-cyan-light)',
                      color: 'var(--accent-cyan)',
                      border: '1px solid var(--accent-cyan)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      flexShrink: 0
                    }}>
                      {userProfile.name ? userProfile.name.charAt(0) : 'U'}
                    </div>
                    <div style={{ textAlign: 'left', flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {userProfile.name}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                        {userProfile.targetRole || 'Candidate'}
                      </div>
                    </div>
                    <User size={15} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                  </button>

                  <button 
                    onClick={() => { onLogout(); setDrawerOpen(false); }}
                    className="btn btn-ghost" 
                    style={{ 
                      justifyContent: 'center', 
                      color: 'var(--text-muted)',
                      fontSize: '0.78rem',
                      padding: '0.4rem'
                    }}
                  >
                    <LogOut size={14} /> Log Out
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => { onOpenAuth(); setDrawerOpen(false); }}
                  className="btn btn-secondary"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.82rem' }}
                >
                  <LogIn size={15} /> Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Comprehensive CSS Rules for Bulletproof Responsiveness */}
      <style>{`
        @keyframes navFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes navSlideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        @keyframes activePulse {
          0% { box-shadow: 0 0 0 0 rgba(6, 182, 212, 0.45); }
          70% { box-shadow: 0 0 0 7px rgba(6, 182, 212, 0); }
          100% { box-shadow: 0 0 0 0 rgba(6, 182, 212, 0); }
        }

        .active-glow-pulse {
          animation: activePulse 2.2s infinite ease-in-out;
        }

        .nav-container {
          padding: 0.6rem 1rem;
          gap: 0.65rem;
        }

        .nav-left-group {
          gap: 0.5rem;
        }

        .nav-three-dot-btn {
          width: 34px !important;
          height: 34px !important;
          min-width: 34px !important;
          min-height: 34px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          background-color: var(--surface-card) !important;
          border: 1px solid var(--border-subtle) !important;
          color: var(--accent-cyan) !important;
          border-radius: var(--radius-full) !important;
          flex-shrink: 0 !important;
          transition: all 0.2s ease;
        }

        .nav-three-dot-btn:hover {
          background-color: var(--surface-card-hover) !important;
          border-color: var(--accent-cyan) !important;
          color: var(--accent-cyan) !important;
          box-shadow: 0 0 10px var(--accent-cyan-glow);
        }

        .nav-brand-wrapper {
          gap: 0.55rem;
        }

        .nav-brand-icon {
          width: 34px;
          height: 34px;
        }

        .nav-brand-title {
          font-size: 1.2rem;
        }

        .nav-drawer-panel {
          width: min(320px, 85vw);
        }

        /* Desktop Views (>= 860px) */
        @media (min-width: 860px) {
          .desktop-nav { 
            display: flex !important; 
            align-items: center !important; 
            gap: 0.35rem !important; 
          }
          .desktop-actions { 
            display: flex !important; 
            align-items: center !important; 
            gap: 0.45rem !important; 
          }
          .mobile-toggle { 
            display: none !important; 
          }
        }

        /* Tablet & Mobile Views (< 860px) */
        @media (max-width: 859px) {
          .desktop-nav { 
            display: none !important; 
          }
          .desktop-actions { 
            display: none !important; 
          }
          .mobile-toggle { 
            display: flex !important; 
            gap: 0.4rem;
          }
          .mobile-icon-btn {
            width: 34px;
            height: 34px;
          }
          .mobile-avatar-btn {
            width: 34px;
            height: 34px;
          }
          .mobile-start-btn {
            padding: 0.35rem 0.65rem !important;
            font-size: 0.78rem !important;
          }
        }

        /* Compact Mobile Screen (< 540px) */
        @media (max-width: 539px) {
          .nav-container {
            padding: 0.5rem 0.75rem !important;
            gap: 0.4rem !important;
          }
          .nav-brand-subtitle {
            display: none !important;
          }
          .nav-brand-title {
            font-size: 1.05rem !important;
          }
          .nav-brand-icon {
            width: 30px !important;
            height: 30px !important;
          }
          .nav-three-dot-btn {
            width: 32px !important;
            height: 32px !important;
          }
          .mobile-icon-btn {
            width: 32px !important;
            height: 32px !important;
          }
          .mobile-avatar-btn {
            width: 32px !important;
            height: 32px !important;
          }
        }

        /* Ultra Compact Screens (< 360px) */
        @media (max-width: 359px) {
          .nav-container {
            padding: 0.4rem 0.5rem !important;
          }
          .nav-brand-wrapper {
            gap: 0.35rem !important;
          }
          .nav-brand-title {
            font-size: 0.95rem !important;
          }
          .nav-brand-icon {
            display: none !important;
          }
        }
      `}</style>

      {/* Candidate Feedback & Reviews Admin Modal */}
      <FeedbackAdminModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />
    </>
  );
}
