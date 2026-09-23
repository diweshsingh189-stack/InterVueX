import { INITIAL_INTERVIEW_HISTORY, INITIAL_USER_PROFILE } from '../data/mockHistoryData';

const STORAGE_KEYS = {
  HISTORY: 'intervuex_history_v1',
  PROFILE: 'intervuex_profile_v1',
  ACTIVE_SESSION: 'intervuex_active_session_v1',
  SAVED_REPORT: 'intervuex_last_report_v1',
  FEEDBACKS: 'intervuex_feedbacks_v1'
};

export const INITIAL_SAMPLE_FEEDBACKS = [
  {
    id: 1727136000000,
    name: 'Vatsal Mishra',
    email: 'vatsal.vns@gmail.com',
    phone: '+91 8127858685',
    address: 'Greater Noida, Uttar Pradesh, India',
    rating: 5,
    message: 'The AI technical interview simulation is extraordinarily realistic! The speech-to-text input and granular scoring rubric accurately mirrored real company technical rounds.',
    date: '2026-09-23T18:45:00.000Z'
  },
  {
    id: 1727128000000,
    name: 'Alex Chen',
    email: 'alex.chen@example.com',
    phone: '+1 (555) 349-2810',
    address: 'San Francisco, CA, USA',
    rating: 5,
    message: 'Loved the distributed systems and PostgreSQL questions. The instant feedback on code complexity and architecture trade-offs is unmatched.',
    date: '2026-09-23T14:20:00.000Z'
  },
  {
    id: 1727115000000,
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 98765 43210',
    address: 'Bengaluru, Karnataka, India',
    rating: 5,
    message: 'Great platform for frontend interview prep. The timer and voice questions helped reduce real interview anxiety significantly.',
    date: '2026-09-23T10:15:00.000Z'
  }
];

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
  },

  /* ---------------- Feedback Storage Management ---------------- */
  getFeedbacks() {
    try {
      // Check for v1 key
      const stored = localStorage.getItem(STORAGE_KEYS.FEEDBACKS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }

      // Check for legacy key migration
      const legacy = localStorage.getItem('intervuex_feedbacks');
      if (legacy) {
        try {
          const legacyParsed = JSON.parse(legacy);
          if (Array.isArray(legacyParsed) && legacyParsed.length > 0) {
            this.saveFeedbacks(legacyParsed);
            return legacyParsed;
          }
        } catch {
          // ignore legacy parse errors
        }
      }

      // Initialize with default sample feedbacks
      localStorage.setItem(STORAGE_KEYS.FEEDBACKS, JSON.stringify(INITIAL_SAMPLE_FEEDBACKS));
      return INITIAL_SAMPLE_FEEDBACKS;
    } catch (err) {
      console.error('Failed to read feedbacks from storage:', err);
      return INITIAL_SAMPLE_FEEDBACKS;
    }
  },

  saveFeedbacks(feedbackList) {
    try {
      localStorage.setItem(STORAGE_KEYS.FEEDBACKS, JSON.stringify(feedbackList));
      // Keep legacy key in sync for backwards-compatibility
      localStorage.setItem('intervuex_feedbacks', JSON.stringify(feedbackList));
    } catch (e) {
      console.error('Failed to save feedbacks', e);
    }
  },

  addFeedback(feedback) {
    const list = this.getFeedbacks();
    const newEntry = {
      id: feedback.id || Date.now(),
      name: feedback.name || 'Anonymous Candidate',
      email: feedback.email || '',
      phone: feedback.phone || '',
      address: feedback.address || '',
      rating: Number(feedback.rating) || 5,
      message: feedback.message || '',
      date: feedback.date || new Date().toISOString()
    };
    const updated = [newEntry, ...list];
    this.saveFeedbacks(updated);
    return updated;
  },

  deleteFeedback(id) {
    const list = this.getFeedbacks();
    const updated = list.filter(item => item.id !== id);
    this.saveFeedbacks(updated);
    return updated;
  },

  clearFeedbacks() {
    this.saveFeedbacks([]);
    return [];
  },

  getFeedbackStats() {
    const list = this.getFeedbacks();
    if (!list || list.length === 0) {
      return { total: 0, average: 5.0, distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } };
    }
    const total = list.length;
    const sum = list.reduce((acc, curr) => acc + (Number(curr.rating) || 5), 0);
    const average = Number((sum / total).toFixed(1));
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    list.forEach(item => {
      const r = Math.round(Number(item.rating) || 5);
      if (distribution[r] !== undefined) distribution[r]++;
    });
    return { total, average, distribution };
  }
};
