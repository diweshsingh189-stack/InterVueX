/**
 * Adaptive Interview Engine
 * Dynamically adjusts interview question difficulty based on the candidate's running answer performance.
 */

import { QUESTIONS_DATABASE } from '../data/questionsData';

export const adaptiveService = {
  /**
   * Determine the next difficulty level given recent evaluation score
   * @param {number} currentScore - The score of the latest answered question (0 - 10)
   * @param {string} currentDifficulty - Current difficulty ('easy', 'medium', 'hard')
   * @returns {{ nextDifficulty: string, reason: string }}
   */
  getNextDifficulty(currentScore, currentDifficulty = 'medium') {
    if (currentScore >= 7.5) {
      if (currentDifficulty === 'easy') {
        return {
          nextDifficulty: 'medium',
          reason: 'Strong answer! Stepping up to Medium difficulty questions.'
        };
      } else if (currentDifficulty === 'medium') {
        return {
          nextDifficulty: 'hard',
          reason: 'Excellent performance! Advancing to Hard/Architectural depth questions.'
        };
      }
      return {
        nextDifficulty: 'hard',
        reason: 'Mastery sustained at Hard difficulty.'
      };
    } else if (currentScore < 5.8) {
      if (currentDifficulty === 'hard') {
        return {
          nextDifficulty: 'medium',
          reason: 'Calibrating to Medium difficulty to test foundational mechanisms.'
        };
      } else if (currentDifficulty === 'medium') {
        return {
          nextDifficulty: 'easy',
          reason: 'Switching to core conceptual questions to reinforce fundamentals.'
        };
      }
      return {
        nextDifficulty: 'easy',
        reason: 'Continuing on core conceptual fundamentals.'
      };
    }

    return {
      nextDifficulty: currentDifficulty,
      reason: `Maintaining ${currentDifficulty} difficulty level.`
    };
  },

  /**
   * Get an alternative question calibrated to the new difficulty
   */
  getAdaptiveReplacement(roleId, typeId, targetDifficulty, excludedQuestionIds = []) {
    const candidates = QUESTIONS_DATABASE.filter(q => 
      (q.role === roleId || q.type === typeId) &&
      q.difficulty === targetDifficulty &&
      !excludedQuestionIds.includes(q.id)
    );

    if (candidates.length > 0) {
      const randomIndex = Math.floor(Math.random() * candidates.length);
      return candidates[randomIndex];
    }

    // Fallback if none found with exact filters
    const fallbackCandidates = QUESTIONS_DATABASE.filter(q => 
      q.difficulty === targetDifficulty && 
      !excludedQuestionIds.includes(q.id)
    );

    return fallbackCandidates[0] || null;
  }
};
