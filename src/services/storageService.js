import { INITIAL_INTERVIEW_HISTORY, INITIAL_USER_PROFILE } from '../data/mockHistoryData';

const STORAGE_KEYS = {
  HISTORY: 'intervuex_history_v1',
  PROFILE: 'intervuex_profile_v1',
  ACTIVE_SESSION: 'intervuex_active_session_v1',
  SAVED_REPORT: 'intervuex_last_report_v1'
};

export const storageService = {
  getHistory() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.HISTORY);
      if (stored) return JSON.parse(stored);
      // Initialize with mock history
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(INITIAL_INTERVIEW_HISTORY));
      return INITIAL_INTERVIEW_HISTORY;
    } catch {
      return INITIAL_INTERVIEW_HISTORY;
    }
  },

  saveHistory(historyList) {
    try {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(historyList));
    } catch (e) {
      console.error('Failed to save history', e);
    }
  },

  addInterviewRecord(record) {
    const history = this.getHistory();
    const updated = [record, ...history];
    this.saveHistory(updated);
    return updated;
  },

  getProfile() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (stored) return JSON.parse(stored);
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(INITIAL_USER_PROFILE));
      return INITIAL_USER_PROFILE;
    } catch {
      return INITIAL_USER_PROFILE;
    }
  },

  saveProfile(profile) {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile', e);
    }
  },

  getActiveSession() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ACTIVE_SESSION);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  saveActiveSession(session) {
    try {
      if (session) {
        localStorage.setItem(STORAGE_KEYS.ACTIVE_SESSION, JSON.stringify(session));
      } else {
        localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
      }
    } catch (e) {
      console.error('Failed to update active session', e);
    }
  },

  getLastReport() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SAVED_REPORT);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  saveLastReport(report) {
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED_REPORT, JSON.stringify(report));
    } catch (e) {
      console.error('Failed to save last report', e);
    }
  }
};
