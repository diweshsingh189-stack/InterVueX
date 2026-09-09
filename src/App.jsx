import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import LandingPage from './pages/LandingPage';
import InterviewSetup from './pages/InterviewSetup';
import InterviewRoom from './pages/InterviewRoom';
import InterviewReport from './pages/InterviewReport';
import Dashboard from './pages/Dashboard';
import QuestionBank from './pages/QuestionBank';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';
import { storageService } from './services/storageService';

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('intervuex_theme') || 'dark');
  const [activePage, setActivePage] = useState('landing');
  const [userProfile, setUserProfile] = useState(() => storageService.getProfile());
  const [history, setHistory] = useState(() => storageService.getHistory());
  const [activeSession, setActiveSession] = useState(() => storageService.getActiveSession());
  const [activeReport, setActiveReport] = useState(() => storageService.getLastReport() || storageService.getHistory()[0] || null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Sync theme with document attribute & storage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('intervuex_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  // Start new interview simulation session
  const handleStartInterview = (sessionConfig) => {
    setActiveSession(sessionConfig);
    storageService.saveActiveSession(sessionConfig);
    setActivePage('interview');
  };

  // Finish interview and generate report
  const handleFinishInterview = (report) => {
    const updatedHistory = storageService.addInterviewRecord(report);
    setHistory(updatedHistory);
    setActiveReport(report);
    storageService.saveLastReport(report);
    storageService.saveActiveSession(null);
    setActiveSession(null);
    setActivePage('report');
  };

  // View specific report from history or dashboard
  const handleViewReport = (report) => {
    setActiveReport(report);
    setActivePage('report');
  };

  // Save profile updates
  const handleSaveProfile = (updatedProfile) => {
    setUserProfile(updatedProfile);
    storageService.saveProfile(updatedProfile);
  };

  // User auth login
  const handleLoginSuccess = (user) => {
    const updated = { ...userProfile, ...user };
    setUserProfile(updated);
    storageService.saveProfile(updated);
  };

  // Logout
  const handleLogout = () => {
    const guestProfile = {
      name: 'Guest Candidate',
      email: 'guest@intervuex.internal',
      targetRole: 'Software Developer',
      experienceLevel: 'Intermediate',
      skills: ['Problem Solving', 'Data Structures']
    };
    setUserProfile(guestProfile);
    storageService.saveProfile(guestProfile);
  };

  return (
    <div className="app-container">
      {/* Navigation */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        userProfile={userProfile}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {activePage === 'landing' && (
          <LandingPage
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'dashboard' && (
          <Dashboard
            history={history}
            userProfile={userProfile}
            onStartNew={() => setActivePage('setup')}
            onViewReport={handleViewReport}
            onBrowseQuestions={() => setActivePage('questions')}
          />
        )}

        {activePage === 'setup' && (
          <InterviewSetup
            onStartInterview={handleStartInterview}
            userProfile={userProfile}
            history={history}
          />
        )}

        {activePage === 'interview' && activeSession && (
          <InterviewRoom
            session={activeSession}
            userProfile={userProfile}
            onFinishInterview={handleFinishInterview}
            onExit={() => setActivePage('dashboard')}
          />
        )}

        {activePage === 'report' && (
          <InterviewReport
            report={activeReport}
            onRetake={() => setActivePage('setup')}
            onGoDashboard={() => setActivePage('dashboard')}
            onBrowseQuestions={() => setActivePage('questions')}
          />
        )}

        {activePage === 'questions' && (
          <QuestionBank
            onStartCustomInterview={() => setActivePage('setup')}
          />
        )}

        {activePage === 'history' && (
          <HistoryPage
            history={history}
            onViewReport={handleViewReport}
            onStartNew={() => setActivePage('setup')}
          />
        )}

        {activePage === 'profile' && (
          <ProfilePage
            userProfile={userProfile}
            onSaveProfile={handleSaveProfile}
            history={history}
          />
        )}
      </main>

      {/* Footer */}
      {activePage !== 'interview' && (
        <Footer setActivePage={setActivePage} />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
