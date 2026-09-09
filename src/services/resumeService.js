/**
 * Resume Parsing and Question Generation Service
 * Extracts technical skills, experience level, frameworks, and projects from resume text/files
 * and creates customized interview questions.
 */

import { QUESTIONS_DATABASE } from '../data/questionsData';

const COMMON_SKILLS = [
  'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'Java', 'C++', 'SQL',
  'PostgreSQL', 'MongoDB', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP',
  'Git', 'HTML', 'CSS', 'Redux', 'Next.js', 'Express', 'Django', 'FastAPI',
  'Spring Boot', 'REST API', 'GraphQL', 'Microservices', 'System Design',
  'Data Structures', 'Algorithms', 'Machine Learning', 'TensorFlow', 'PyTorch',
  'CI/CD', 'Linux', 'Redis', 'Kafka', 'Tailwind', 'DevOps'
];

export const resumeService = {
  /**
   * Parse resume text and extract candidate profile signals
   */
  parseResumeText(text) {
    if (!text || typeof text !== 'string') {
      return {
        detectedRole: 'Software Developer',
        skills: ['Problem Solving', 'Data Structures', 'JavaScript'],
        experienceYears: 2,
        detectedLevel: 'intermediate',
        projectHighlights: ['Web Application Development', 'API Design'],
        rawLength: 0
      };
    }

    const cleanText = text.toLowerCase();

    // 1. Detect skills
    const detectedSkills = COMMON_SKILLS.filter(skill => {
      const regex = new RegExp(`\\b${skill.toLowerCase()}\\b`, 'i');
      return regex.test(cleanText);
    });

    // Ensure at least some default skills if none detected
    const finalSkills = detectedSkills.length > 0
      ? detectedSkills
      : ['Data Structures', 'Algorithms', 'Software Engineering'];

    // 2. Detect experience level
    let experienceYears = 1;
    let detectedLevel = 'beginner';

    if (/fresher|intern|student|graduate|entry[- ]level/i.test(cleanText)) {
      experienceYears = 0;
      detectedLevel = 'fresher';
    } else if (/\b([3-5]|three|four|five)\+?\s*years?\b/i.test(cleanText) || /intermediate|mid[- ]level/i.test(cleanText)) {
      experienceYears = 3;
      detectedLevel = 'intermediate';
    } else if (/\b([6-9]|1[0-9]|six|seven|eight|senior|lead|architect)\+?\s*years?\b/i.test(cleanText)) {
      experienceYears = 6;
      detectedLevel = 'advanced';
    }

    // 3. Detect primary role
    let detectedRole = 'Software Developer';
    let roleId = 'software-developer';

    if (/frontend|react|vue|angular|css|html|ui\/ux|web design/i.test(cleanText)) {
      detectedRole = 'Frontend Developer';
      roleId = 'frontend-developer';
    } else if (/backend|api|server|microservice|database|sql|express|django|spring/i.test(cleanText)) {
      detectedRole = 'Backend Developer';
      roleId = 'backend-developer';
    } else if (/full[- ]stack|fullstack|mern|mean/i.test(cleanText)) {
      detectedRole = 'Full Stack Developer';
      roleId = 'fullstack-developer';
    } else if (/data\s*analyst|sql|tableau|power\s*bi|pandas|numpy|analytics/i.test(cleanText)) {
      detectedRole = 'Data Analyst';
      roleId = 'data-analyst';
    } else if (/python|django|fastapi|flask/i.test(cleanText)) {
      detectedRole = 'Python Developer';
      roleId = 'python-developer';
    } else if (/java|spring\s*boot|jvm|hibernate/i.test(cleanText)) {
      detectedRole = 'Java Developer';
      roleId = 'java-developer';
    } else if (/c\+\+|cpp|embedded|stl|low[- ]level/i.test(cleanText)) {
      detectedRole = 'C++ Developer';
      roleId = 'cpp-developer';
    }

    // 4. Extract Project Highlights (simple sentence extraction mentioning project/built/developed)
    const sentences = text.split(/[.\n]/).map(s => s.trim()).filter(Boolean);
    const projectHighlights = sentences
      .filter(s => /built|developed|created|implemented|architected|designed|led/i.test(s) && s.length > 20 && s.length < 140)
      .slice(0, 3);

    return {
      detectedRole,
      roleId,
      skills: finalSkills,
      experienceYears,
      detectedLevel,
      projectHighlights: projectHighlights.length > 0 ? projectHighlights : ['Full-lifecycle project implementation and system delivery'],
      rawLength: text.length
    };
  },

  /**
   * Generate customized interview questions based on parsed resume
   */
  generateResumeQuestions(parsedResume, count = 5) {
    const { skills, detectedRole, roleId, detectedLevel, projectHighlights } = parsedResume;

    // 1. Fetch related questions from existing database
    const matchingRoleQuestions = QUESTIONS_DATABASE.filter(q => q.role === roleId || q.type === 'technical');

    const generated = [];

    // Question 1: Project Deep-Dive based on resume
    const firstProject = projectHighlights[0] || 'your core technical project listed on your resume';
    generated.push({
      id: `resume-q-1-${Date.now()}`,
      role: roleId,
      type: 'technical',
      difficulty: detectedLevel === 'fresher' ? 'easy' : 'medium',
      category: 'Resume Project Deep Dive',
      question: `Looking at your resume, you mentioned "${firstProject.slice(0, 80)}...". What were the primary architectural trade-offs you faced during implementation, and how did you resolve them?`,
      keyConcepts: ['architecture decisions', 'trade-offs', 'scalability', 'debugging', 'performance'],
      tips: 'Explain your decision-making process, any constraints you encountered, and quantifiable outcomes.',
      idealAnswer: 'Articulate the problem statement, why you selected the tech stack, what bottlenecks appeared (e.g. database latency or state management complexity), and the precise architectural steps taken to resolve them.'
    });

    // Question 2: Deep dive into top detected skill
    const topSkill = skills[0] || 'System Architecture';
    generated.push({
      id: `resume-q-2-${Date.now()}`,
      role: roleId,
      type: 'technical',
      difficulty: detectedLevel === 'advanced' ? 'hard' : 'medium',
      category: `${topSkill} Core Mastery`,
      question: `Your resume highlights extensive experience with ${topSkill}. Can you explain how ${topSkill} manages internal lifecycle and state, and what best practices you follow for performance optimization?`,
      keyConcepts: [topSkill, 'lifecycle', 'performance optimization', 'memory management', 'best practices'],
      tips: `Provide real-world scenarios where deep ${topSkill} knowledge prevented bugs or latency.`,
      idealAnswer: `Detail the core execution mechanics of ${topSkill}, memory allocation considerations, error handling strategies, and production benchmarking approaches.`
    });

    // Question 3: Secondary skill or database/concurrency
    const secondSkill = skills[1] || 'Database Design';
    generated.push({
      id: `resume-q-3-${Date.now()}`,
      role: roleId,
      type: 'technical',
      difficulty: 'medium',
      category: `${secondSkill} & Data Flow`,
      question: `How have you utilized ${secondSkill} to ensure high availability, data consistency, and reliable error recovery in production?`,
      keyConcepts: [secondSkill, 'concurrency', 'data consistency', 'reliability', 'error recovery'],
      tips: 'Mention transactions, caching, or distributed failure recovery patterns.',
      idealAnswer: 'Explain consistency guarantees (ACID/BASE), connection pooling, retry strategies, and logging/telemetry pipelines.'
    });

    // Question 4 & 5: Behavioral and blended questions from database
    const behavioralFromDb = QUESTIONS_DATABASE.filter(q => q.type === 'behavioral');
    if (behavioralFromDb.length > 0) {
      generated.push({
        ...behavioralFromDb[0],
        id: `resume-q-4-${Date.now()}`,
        category: 'Resume Behavioral Validation'
      });
    }

    // Fill remaining from database
    let dbIndex = 0;
    while (generated.length < count && dbIndex < matchingRoleQuestions.length) {
      const candidate = matchingRoleQuestions[dbIndex];
      if (!generated.some(g => g.question === candidate.question)) {
        generated.push({
          ...candidate,
          id: `resume-q-${generated.length + 1}-${Date.now()}`
        });
      }
      dbIndex++;
    }

    return generated.slice(0, count);
  }
};
