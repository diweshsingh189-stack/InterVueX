/**
 * Preloaded Realistic Interview Attempts
 * Provides immediate rich data for Dashboard & History visualizations
 */

export const INITIAL_INTERVIEW_HISTORY = [
  {
    id: 'inv-1049',
    date: '2026-03-08T14:30:00.000Z',
    role: 'Full Stack Developer',
    roleId: 'fullstack-developer',
    level: 'Intermediate',
    type: 'Technical',
    difficulty: 'Medium',
    questionCount: 5,
    durationSeconds: 780,
    overallScore: 8.8,
    scores: {
      technical: 9.0,
      communication: 8.5,
      relevance: 9.2,
      confidence: 8.6,
      completeness: 8.7
    },
    status: 'Completed',
    summary: 'Strong grasp of REST/GraphQL API tradeoffs and state hydration. Answers were well-structured with clear examples.',
    weakAreas: ['Edge-case handling in caching strategies', 'Explaining memory overhead of Redux vs Zustand'],
    strongAreas: ['JWT token security implementation', 'Asynchronous JS Event Loop and Microtasks', 'React reconciliation internals'],
    recommendations: 'Practice system design scenarios with high write throughput and database sharding.',
    answers: [
      {
        questionId: 'fe-tech-1',
        question: 'How does the JavaScript Event Loop handle synchronous tasks, microtasks, and macrotasks?',
        userAnswer: 'The call stack processes synchronous code first. Promises and MutationObserver callbacks go to the microtask queue, while setTimeout callbacks go to the macrotask queue. Microtasks run completely before the next macrotask is dequeued.',
        score: 9.2,
        feedback: {
          doneWell: 'Precise explanation of microtask queue priority over macrotasks.',
          improvement: 'Could mention requestAnimationFrame timing in relation to browser paints.',
          tip: 'Use standard browser diagrams when discussing visual repaint cycles.'
        }
      },
      {
        questionId: 'fs-tech-1',
        question: 'How does JWT authentication work and what are the trade-offs of localStorage vs httpOnly Cookies?',
        userAnswer: 'JWT has Header, Payload, Signature. Storing in localStorage is simple but vulnerable to XSS script theft. Storing in httpOnly cookie protects from XSS but requires CSRF mitigation with SameSite=Strict and CSRF tokens.',
        score: 9.0,
        feedback: {
          doneWell: 'Accurately compared XSS vulnerability against CSRF mitigation.',
          improvement: 'Mention short-lived access tokens combined with secure refresh token rotation.',
          tip: 'Always emphasize defense-in-depth security principles.'
        }
      }
    ]
  },
  {
    id: 'inv-1048',
    date: '2026-03-05T10:15:00.000Z',
    role: 'Frontend Developer',
    roleId: 'frontend-developer',
    level: 'Intermediate',
    type: 'Mixed',
    difficulty: 'Medium',
    questionCount: 5,
    durationSeconds: 650,
    overallScore: 8.2,
    scores: {
      technical: 8.4,
      communication: 8.0,
      relevance: 8.5,
      confidence: 8.0,
      completeness: 8.1
    },
    status: 'Completed',
    summary: 'Demonstrated solid understanding of React render cycles and Core Web Vitals optimization.',
    weakAreas: ['Quantifying metrics for INP optimization', 'Pacing in behavioral responses'],
    strongAreas: ['useMemo & useCallback distinction', 'STAR methodology in conflict resolution'],
    recommendations: 'Refine explanation of scheduler.yield() and web workers for heavy thread computation.'
  },
  {
    id: 'inv-1047',
    date: '2026-03-01T16:45:00.000Z',
    role: 'Software Developer',
    roleId: 'software-developer',
    level: 'Fresher',
    type: 'HR',
    difficulty: 'Easy',
    questionCount: 5,
    durationSeconds: 520,
    overallScore: 7.9,
    scores: {
      technical: 7.5,
      communication: 8.2,
      relevance: 8.0,
      confidence: 7.8,
      completeness: 8.0
    },
    status: 'Completed',
    summary: 'Clear elevator pitch and positive demeanor. Stated self-improvement goals with good authenticity.',
    weakAreas: ['Structuring career roadmap with specific milestones'],
    strongAreas: ['Present-Past-Future introduction structure', 'Authentic discussion of technical challenges'],
    recommendations: 'Align future career goals more closely with business impact and system leadership.'
  }
];

export const INITIAL_USER_PROFILE = {
  name: 'Alex Morgan',
  email: 'alex.morgan@example.com',
  targetRole: 'Full Stack Developer',
  experienceLevel: 'Intermediate',
  skills: ['JavaScript', 'React', 'Node.js', 'PostgreSQL', 'System Design', 'Git', 'REST APIs', 'Docker'],
  apiKey: '',
  targetCompanies: ['Google', 'Microsoft', 'Stripe', 'Atlassian', 'Amazon'],
  bio: 'Software engineer focused on building performant, accessible web systems and distributed backend services.'
};
