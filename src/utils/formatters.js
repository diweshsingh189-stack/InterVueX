/**
 * Utility formatting functions
 */

export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function formatDate(isoString) {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export function getScoreColor(score) {
  if (score >= 8.5) return 'var(--accent-cyan)';
  if (score >= 7.0) return '#38BDF8';
  if (score >= 5.0) return '#94A3B8';
  return '#64748B';
}

export function getScoreLabel(score) {
  if (score >= 9.0) return 'Exceptional';
  if (score >= 8.0) return 'Strong Hire';
  if (score >= 7.0) return 'Qualified';
  if (score >= 5.5) return 'Needs Polish';
  return 'Requires Practice';
}
