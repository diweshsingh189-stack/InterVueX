import React, { useState } from 'react';
import { 
  Terminal, 
  PlayCircle, 
  LayoutDashboard, 
  BookOpen, 
  History, 
  User, 
  Menu, 
  X, 
  LogIn, 
  LogOut, 
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';

export default function Navbar({ activePage, setActivePage, userProfile, theme, onToggleTheme, onOpenAuth, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'setup', label: 'New Interview', icon: PlayCircle },
    { id: 'questions', label: 'Question Bank', icon: BookOpen },
    { id: 'history', label: 'History', icon: History },
  ];

  const isDark = theme === 'dark';

  return (
    <nav style={{
      backgroundColor: 'var(--bg-primary)',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      transition: 'background-color 0.25s ease, border-color 0.25s ease'
    }}>
      <div className="nav-container" style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0.75rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => setActivePage('landing')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--surface-card)',
            border: '1px solid var(--accent-cyan)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-cyan)',
            flexShrink: 0
          }}>
            <Terminal size={20} />
          </div>
          <div>
            <div className="nav-brand-title" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontWeight: 800,
              fontSize: '1.25rem',
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)'
            }}>
              InterVue<span style={{ color: 'var(--accent-cyan)' }}>X</span>
            </div>
            <div className="nav-brand-subtitle" style={{
              fontSize: '0.68rem',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontWeight: 600,
              marginTop: '-2px'
            }}>
              AI Interview Simulator
            </div>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div style={{
          display: 'none',
          alignItems: 'center',
          gap: '0.5rem'
        }} className="desktop-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`btn btn-sm ${isActive ? 'btn-secondary' : 'btn-ghost'}`}
                style={{
                  color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  borderColor: isActive ? 'var(--accent-cyan)' : 'transparent',
                  backgroundColor: isActive ? 'var(--surface-card)' : 'transparent'
                }}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* User Account / Actions & Theme Switcher */}
        <div style={{
          display: 'none',
          alignItems: 'center',
          gap: '0.75rem'
        }} className="desktop-actions">
          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="btn btn-sm btn-secondary"
            title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            style={{
              padding: '0.4rem 0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              fontWeight: 600
            }}
          >
            {isDark ? (
              <>
                <Sun size={15} style={{ color: '#F59E0B' }} />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon size={15} style={{ color: '#0284C7' }} />
                <span>Dark Mode</span>
              </>
            )}
          </button>

          {userProfile ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button 
                onClick={() => setActivePage('profile')}
                className="btn btn-sm btn-ghost"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  border: activePage === 'profile' ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.35rem 0.85rem'
                }}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-cyan-light)',
                  color: 'var(--accent-cyan)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}>
                  {userProfile.name ? userProfile.name.charAt(0) : 'U'}
                </div>
                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{userProfile.name}</span>
              </button>
              <button 
                onClick={onLogout}
                className="btn btn-sm btn-ghost"
                title="Log Out"
                style={{ padding: '0.4rem', color: 'var(--text-muted)' }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button 
              onClick={onOpenAuth}
              className="btn btn-sm btn-secondary"
            >
              <LogIn size={16} />
              Sign In
            </button>
          )}

          <button
            onClick={() => setActivePage('setup')}
            className="btn btn-sm btn-primary"
          >
            <Sparkles size={16} />
            Start Session
          </button>
        </div>

        {/* Mobile Menu & Theme Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="mobile-toggle">
          <button
            onClick={onToggleTheme}
            className="btn btn-sm btn-secondary"
            title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            style={{ padding: '0.45rem', borderRadius: 'var(--radius-full)' }}
          >
            {isDark ? <Sun size={18} style={{ color: '#F59E0B' }} /> : <Moon size={18} style={{ color: '#0284C7' }} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-sm btn-ghost"
            style={{ padding: '0.5rem' }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div style={{
          padding: '1rem 1.5rem 1.5rem',
          backgroundColor: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem'
        }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`btn ${isActive ? 'btn-secondary' : 'btn-ghost'}`}
                style={{
                  justifyContent: 'flex-start',
                  color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)'
                }}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
          <button
            onClick={onToggleTheme}
            className="btn btn-secondary"
            style={{ justifyContent: 'flex-start', gap: '0.6rem' }}
          >
            {isDark ? <Sun size={18} style={{ color: '#F59E0B' }} /> : <Moon size={18} style={{ color: '#0284C7' }} />}
            <span>{isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}</span>
          </button>
          <hr style={{ borderColor: 'var(--border-subtle)', margin: '0.5rem 0' }} />
          {userProfile ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button 
                onClick={() => { setActivePage('profile'); setMobileMenuOpen(false); }}
                className="btn btn-ghost" 
                style={{ justifyContent: 'flex-start' }}
              >
                <User size={18} /> Profile & Settings
              </button>
              <button 
                onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                className="btn btn-ghost" 
                style={{ justifyContent: 'flex-start', color: 'var(--text-muted)' }}
              >
                <LogOut size={18} /> Log Out
              </button>
            </div>
          ) : (
            <button 
              onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
              className="btn btn-secondary"
            >
              <LogIn size={18} /> Sign In
            </button>
          )}
          <button
            onClick={() => { setActivePage('setup'); setMobileMenuOpen(false); }}
            className="btn btn-primary"
            style={{ marginTop: '0.25rem' }}
          >
            <Sparkles size={18} /> Start Interview Session
          </button>
        </div>
      )}

      {/* Responsive media style fixes */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .desktop-actions { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
        @media (max-width: 480px) {
          nav .nav-container { padding: 0.6rem 1rem !important; }
          .nav-brand-title { font-size: 1.1rem !important; }
          .nav-brand-subtitle { font-size: 0.6rem !important; }
        }
      `}</style>
    </nav>
  );
}
