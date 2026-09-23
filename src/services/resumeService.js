/**
 * Resume Parsing, Candidate Shortlisting & Question Generation Service
 * Extracts technical skills, experience level, frameworks, and projects from resume text/files
 * and creates customized interview questions.
 */

import { QUESTIONS_DATABASE } from '../data/questionsData.js';

export const COMMON_SKILLS = [
  'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'Java', 'C++', 'SQL',
  'PostgreSQL', 'MongoDB', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP',
  'Git', 'HTML', 'CSS', 'Redux', 'Next.js', 'Express', 'Django', 'FastAPI',
  'Spring Boot', 'REST API', 'GraphQL', 'Microservices', 'System Design',
  'Data Structures', 'Algorithms', 'Machine Learning', 'TensorFlow', 'PyTorch',
  'CI/CD', 'Linux', 'Redis', 'Kafka', 'Tailwind', 'DevOps', 'Pandas', 'Tableau'
];

export const SAMPLE_CANDIDATES = [
  {
    id: 'candidate-alex-chen',
    name: 'Alex Chen',
    targetRole: 'Full Stack Developer',
    roleId: 'fullstack-developer',
    experienceLevel: 'intermediate',
    experienceYears: 4,
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS', 'Redis', 'GraphQL'],
    avatar: '👨‍💻',
    summary: 'Senior Full Stack Engineer with 4 years building scalable microservices, Next.js web applications, and low-latency APIs.',
    resumeText: `Alex Chen - Full Stack Engineer
Summary: Results-oriented Full Stack Developer with 4 years of experience building resilient cloud-native applications. Proficient in React, Node.js, TypeScript, PostgreSQL, Docker, AWS, and Redis.
Experience:
- Architected decoupled microservice architecture handling 2.5M daily requests with Node.js and PostgreSQL.
- Implemented real-time telemetry caching using Redis, reducing API p99 latency by 38%.
- Built high-performance responsive frontend dashboards using React, TypeScript, and Next.js.
- Containerized development and staging environments using Docker and automated CI/CD pipelines on AWS.
Skills: React, Node.js, TypeScript, PostgreSQL, Docker, AWS, Redis, GraphQL, REST API, Git.`
  },
  {
    id: 'candidate-priya-sharma',
    name: 'Priya Sharma',
    targetRole: 'Frontend Developer',
    roleId: 'frontend-developer',
    experienceLevel: 'intermediate',
    experienceYears: 3,
    skills: ['React', 'TypeScript', 'Next.js', 'Redux', 'Tailwind', 'JavaScript', 'HTML', 'CSS'],
    avatar: '👩‍💻',
    summary: 'Frontend Engineer with 3 years specializing in component design systems, state architecture, and Core Web Vitals optimization.',
    resumeText: `Priya Sharma - Frontend Developer
Summary: Frontend Engineer with 3 years of expertise in building enterprise web applications with React, TypeScript, Next.js, and Redux.
Experience:
- Led frontend design system migration to Tailwind and TypeScript, reducing client bundle size by 30%.
- Optimized Core Web Vitals (LCP/CLS/INP), improving conversion rates by 22%.
- Architected scalable client-side caching with Redux Toolkit and React Query for asynchronous data fetching.
Skills: React, JavaScript, TypeScript, Next.js, Redux, Tailwind, HTML, CSS, REST API, Git.`
  },
  {
    id: 'candidate-rahul-verma',
    name: 'Rahul Verma',
    targetRole: 'Backend Developer',
    roleId: 'backend-developer',
    experienceLevel: 'advanced',
    experienceYears: 5,
    skills: ['Python', 'FastAPI', 'Django', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'Microservices'],
    avatar: '👨‍💼',
    summary: 'Backend Systems Engineer with 5 years designing high-throughput distributed microservices, message queues, and caching.',
    resumeText: `Rahul Verma - Senior Backend Developer
Summary: Backend specialist with 5 years experience designing distributed REST APIs, relational schemas, and asynchronous event pipelines.
Experience:
- Designed and delivered distributed event-driven microservices using Python, FastAPI, Docker, and Kubernetes.
- Optimized high-concurrency PostgreSQL queries, connection pooling, and multi-region replication.
- Integrated Redis pub/sub and distributed rate-limiting to protect mission-critical payment gateways.
Skills: Python, FastAPI, Django, PostgreSQL, Redis, Docker, Kubernetes, Microservices, System Design, Git.`
  },
  {
    id: 'candidate-maya-patel',
    name: 'Maya Patel',
    targetRole: 'Data Analyst',
    roleId: 'data-analyst',
    experienceLevel: 'beginner',
    experienceYears: 2,
    skills: ['SQL', 'Python', 'Pandas', 'Tableau', 'Data Structures', 'PostgreSQL'],
    avatar: '👩‍🔬',
    summary: 'Data Analyst with 2 years analyzing product telemetry, building SQL pipelines, and creating executive business dashboards.',
    resumeText: `Maya Patel - Data Analyst
Summary: Analytical problem solver with 2 years analyzing complex business metrics, customer cohorts, and building SQL pipelines.
Experience:
- Authored complex SQL queries (window functions, CTEs, self-joins) over 50M+ rows of event logs.
- Built interactive Tableau and Power BI dashboards for executive KPI tracking and revenue attribution.
- Developed automated data cleaning pipelines using Python and Pandas.
Skills: SQL, PostgreSQL, Python, Pandas, Tableau, Data Structures, Algorithms, Git.`
  },
  {
    id: 'candidate-anita-roy',
    name: 'Anita Roy',
    targetRole: 'Software Developer',
    roleId: 'software-developer',
    experienceLevel: 'fresher',
    experienceYears: 0,
    skills: ['Data Structures', 'Algorithms', 'C++', 'Java', 'SQL', 'OOP'],
    avatar: '🎓',
    summary: 'Computer Science Graduate with strong foundation in DSA, competitive programming, C++, OOP, and operating systems.',
    resumeText: `Anita Roy - Graduate Software Engineer (Fresher)
Summary: Recent Computer Science graduate with strong problem-solving skills, solid grounding in Data Structures, Algorithms, and Object-Oriented Design.
Projects & Experience:
- Solved 350+ algorithmic problems on LeetCode/CodeForces covering Trees, Dynamic Programming, and Graph Traversals.
- Built student management system using C++, OOP principles, and SQL database storage.
- Completed academic coursework in Operating Systems, Database Management Systems, and Computer Networks.
Skills: Data Structures, Algorithms, C++, Java, SQL, Linux, Git, Object-Oriented Programming.`
  }
];

export const resumeService = {
  getSampleCandidates() {
    return SAMPLE_CANDIDATES;
  },

  /**
   * Parse resume text and extract candidate profile signals
   */
  parseResumeText(text) {
    if (!text || typeof text !== 'string') {
      return {
        detectedRole: 'Software Developer',
        roleId: 'software-developer',
        skills: ['Problem Solving', 'Data Structures', 'JavaScript'],
        experienceYears: 2,
        detectedLevel: 'intermediate',
        projectHighlights: ['Web Application Development', 'API Design'],
        rawLength: 0
      };
    }

    // Clean text and remove binary artifacts if any
    const cleanText = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, ' ').toLowerCase();

    // 1. Detect skills
    const detectedSkills = COMMON_SKILLS.filter(skill => {
      const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(^|[^a-zA-Z0-9])${escaped.toLowerCase()}([^a-zA-Z0-9]|$)`, 'i');
      return regex.test(cleanText);
    });

    // Ensure at least some default skills if none detected
    const finalSkills = detectedSkills.length > 0
      ? detectedSkills
      : ['Data Structures', 'Algorithms', 'Software Engineering'];

    // 2. Detect experience level
    let experienceYears = 2;
    let detectedLevel = 'intermediate';

    if (/fresher|intern|student|graduate|entry[- ]level|0\s*years/i.test(cleanText)) {
      experienceYears = 0;
      detectedLevel = 'fresher';
    } else if (/\b([1-2]|one|two)\s*years?\b/i.test(cleanText) || /junior|beginner|associate/i.test(cleanText)) {
      experienceYears = 2;
      detectedLevel = 'beginner';
    } else if (/\b([3-5]|three|four|five)\+?\s*years?\b/i.test(cleanText) || /intermediate|mid[- ]level/i.test(cleanText)) {
      experienceYears = 4;
      detectedLevel = 'intermediate';
    } else if (/\b([6-9]|1[0-9]|six|seven|eight|nine|ten|senior|lead|architect|principal)\+?\s*years?\b/i.test(cleanText)) {
      experienceYears = 6;
      detectedLevel = 'advanced';
    }

    // 3. Detect primary role
    let detectedRole = 'Software Developer';
    let roleId = 'software-developer';

    if (/full[- ]stack|fullstack|mern|mean/i.test(cleanText) || (/(react|vue|angular|frontend)/i.test(cleanText) && /(node|express|django|backend|api)/i.test(cleanText))) {
      detectedRole = 'Full Stack Developer';
      roleId = 'fullstack-developer';
    } else if (/frontend|react|vue|angular|css|html|ui\/ux|web design/i.test(cleanText)) {
      detectedRole = 'Frontend Developer';
      roleId = 'frontend-developer';
    } else if (/backend|api|server|microservice|database|sql|express|django|spring/i.test(cleanText)) {
      detectedRole = 'Backend Developer';
      roleId = 'backend-developer';
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
      .filter(s => /built|developed|created|implemented|architected|designed|led|delivered|authored/i.test(s) && s.length > 20 && s.length < 140)
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
      question: `Looking at your resume, you highlighted "${firstProject.slice(0, 80)}...". What were the primary architectural trade-offs you faced during implementation, and how did you resolve them?`,
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

    // Question 4: Behavioral / STAR validation
    const behavioralFromDb = QUESTIONS_DATABASE.filter(q => q.type === 'behavioral');
    if (behavioralFromDb.length > 0) {
      generated.push({
        ...behavioralFromDb[0],
        id: `resume-q-4-${Date.now()}`,
        category: 'Resume Behavioral Validation'
      });
    }

    // Question 5 & remaining: Role-specific technical / coding questions
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
