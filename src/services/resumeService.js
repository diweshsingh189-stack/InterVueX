/**
 * Resume Parsing, Candidate Shortlisting & Question Generation Service
 * Extracts technical skills, experience level, frameworks, and projects from resume text/files
 * and creates customized interview questions.
 */

import { QUESTIONS_DATABASE } from '../data/questionsData.js';
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker for client-side browser execution
if (typeof window !== 'undefined' && pdfjsLib.GlobalWorkerOptions) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
}

export const COMMON_SKILLS = [
  'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'Java', 'C++', 'SQL',
  'PostgreSQL', 'MongoDB', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP',
  'Git', 'HTML', 'CSS', 'Redux', 'Next.js', 'Express', 'Django', 'FastAPI',
  'Spring Boot', 'REST API', 'GraphQL', 'Microservices', 'System Design',
  'Data Structures', 'Algorithms', 'Machine Learning', 'TensorFlow', 'PyTorch',
  'CI/CD', 'Linux', 'Redis', 'Kafka', 'Tailwind', 'DevOps', 'Pandas', 'Tableau',
  'Vue.js', 'Angular', 'C#', '.NET', 'Kotlin', 'Swift', 'MySQL', 'DynamoDB',
  'Ollama', 'FFmpeg', 'Whisper', 'RAG', 'Vector Embeddings', 'Cosine Similarity',
  'Postman', 'Upstash', 'Scikit-learn', 'NumPy', 'OOP', 'DBMS'
];

export const SAMPLE_CANDIDATES = [
  {
    id: 'candidate-vatsal-mishra',
    name: 'Vatsal Mishra',
    targetRole: 'Full Stack & AI Engineer',
    roleId: 'fullstack-developer',
    experienceLevel: 'intermediate',
    experienceYears: 1,
    skills: ['React', 'Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Redis', 'Python', 'C++', 'SQL', 'FastAPI', 'Docker', 'Git', 'REST API', 'System Design', 'Data Structures', 'Algorithms', 'RAG', 'Machine Learning', 'Tailwind', 'Pandas'],
    avatar: '🚀',
    summary: 'Full Stack & AI Engineer (B.Tech CSE, 8.0/10) with MERN internship, ICPC Regionalist, LeetCode 1654 rating, and builder of NanoLink & Local RAG systems.',
    resumeText: `👤 VATSAL MISHRA
Greater Noida, Uttar Pradesh, India | +91 8127858685 | vatsal.vns@gmail.com | LinkedIn | Github

════════════════════════════════════════════════════════════════
📌 EDUCATION
════════════════════════════════════════════════════════════════
B.Tech in Computer Science and Engineering                          2022 – 2026
I.T.S Engineering College — GPA: 8.0/10                     Greater Noida, India

════════════════════════════════════════════════════════════════
📌 EXPERIENCE
════════════════════════════════════════════════════════════════
Software Engineer Intern (Sort String Solutions LLP)          Oct 2025 – Apr 2026
  • Contributed to the development and maintenance of MERN stack applications by implementing features, fixing bugs, and improving functionality.
  • Built responsive user interfaces and integrated RESTful APIs using MongoDB, Express.js, React.js, and Node.js.
  • Collaborated with developers to enhance application performance and participated in testing, debugging, and code reviews for high-quality software delivery.
  • Gained hands-on experience with real-world software development workflows, version control systems, and agile development practices.

════════════════════════════════════════════════════════════════
📌 TECHNICAL SKILLS
════════════════════════════════════════════════════════════════
  • Languages: C/C++, Python, JavaScript, Java, SQL
  • Frontend: React.js, Tailwind CSS, shadcn/ui, HTML, CSS
  • Backend: Node.js, Express.js, REST APIs
  • Databases: MongoDB, MySQL, PostgreSQL, Redis
  • Developer Tools: Git, GitHub, VS Code, Ollama, FFmpeg, Postman
  • AI/ML: RAG, OpenAI Whisper, bge-m3, llama3.2, NumPy, Pandas, Scikit-learn, Vector Embeddings, Cosine Similarity
  • System Design: Scalable Architecture, Load Balancing, Caching, Microservices, Database Sharding, CDN, CAP Theorem
  • CS Fundamentals: Data Structures & Algorithms, OOP, Operating Systems, DBMS, Computer Networks

════════════════════════════════════════════════════════════════
📌 PROJECTS
════════════════════════════════════════════════════════════════
NanoLink | React.js, Node.js, Express.js, PostgreSQL, Upstash Redis
  • A production-ready URL shortening web app that converts long URLs into compact short links.
  • Built a highly scalable, full-stack service optimized for read-heavy workloads (100:1 ratio), capable of handling high-concurrency redirect traffic.
  • Engineered a collision-free Base62 algorithm using sequential PostgreSQL IDs to guarantee O(1) short-code generation.
  • Integrated an Upstash Redis cache-aside layer, decreasing latency by 95% and significantly relieving persistent database read loads.
  • Implemented IP-based Rate Limiting to defend API infrastructure against DDoS attacks and malicious storage exhaustion.
  • Designed a RESTful API with clear separation of concerns across route, controller, and service layers for maintainability and future scaling.

Local RAG Video Search Engine | Python, llama3.2 (Local LLM), OpenAI Whisper, Pandas
  • Architected a Retrieval-Augmented Generation (RAG) system using local LLMs to enable semantic search and Q&A over video course content without external API dependencies.
  • Engineered a video ETL pipeline using FFmpeg, OpenAI Whisper, and bge-m3 for embedding generation.
  • Implemented custom vector retrieval logic with Pandas and Cosine Similarity to identify relevant video segments.
  • Integrated llama3.2 via Ollama to generate context-aware answers with precise timestamped navigation.
  • Designed a zero-cost, fully offline AI assistant eliminating cloud API dependencies, ensuring complete data privacy and sub-second query response time.

════════════════════════════════════════════════════════════════
📌 ACHIEVEMENTS & CERTIFICATES
════════════════════════════════════════════════════════════════
  • ICPC Regionals: Certificate — Qualified for the Amritapuri Regionals, Kerala in the International Collegiate Programming Contest (ICPC) as part of team Binary Brain.
  • LeetCode (VatsalMishra27): Peak contest rating of 1654 with 600+ problems solved; best contest rank of 2908 globally among thousands of participants.
  • CodeChef (vatsalmishra27): Max Rating 1459; secured a global best rank of 279 in an official contest, showcasing strong problem-solving and analytical thinking under competitive pressure.
  • GeeksforGeeks (vatsal_mishra27): Achieved a Contest Rating of 1558 in Data Structures & Algorithms challenges.
  • Codeforces (Vatsal_Mishra): Reached a maximum rating of 1029 through consistent participation in algorithmic contests.
  • Coursera: IBM Certified in React, focusing on UI development, state management, and hooks.`
  },
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
    resumeText: `👤 ALEX CHEN
San Francisco, CA | alex.chen@example.com | (555) 349-2810 | linkedin.com/in/alexchen-dev

════════════════════════════════════════════════════════════════
📌 PROFESSIONAL SUMMARY
════════════════════════════════════════════════════════════════
Results-oriented Full Stack Developer with 4 years of experience building resilient cloud-native applications and low-latency distributed microservices.

════════════════════════════════════════════════════════════════
📌 WORK EXPERIENCE
════════════════════════════════════════════════════════════════
Senior Software Engineer — CloudScale Labs (2022 – Present)
  • Architected decoupled microservice architecture handling 2.5M daily requests with Node.js and PostgreSQL.
  • Implemented real-time telemetry caching using Redis, reducing API p99 latency by 38%.
  • Built high-performance responsive frontend dashboards using React, TypeScript, and Next.js.
  • Containerized development and staging environments using Docker and automated CI/CD pipelines on AWS.

════════════════════════════════════════════════════════════════
📌 TECHNICAL SKILLS
════════════════════════════════════════════════════════════════
  • Languages: JavaScript, TypeScript, Python, SQL, HTML, CSS
  • Frontend: React, Next.js, Redux, Tailwind CSS, Webpack
  • Backend: Node.js, Express.js, REST APIs, GraphQL, Microservices
  • Databases & Caching: PostgreSQL, MongoDB, Redis, Upstash
  • Cloud & DevOps: Docker, Kubernetes, AWS (ECS, S3, RDS), Git, CI/CD`
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
    resumeText: `👤 PRIYA SHARMA
Bengaluru, Karnataka, India | priya.sharma@example.com | linkedin.com/in/priyasharma

════════════════════════════════════════════════════════════════
📌 PROFESSIONAL SUMMARY
════════════════════════════════════════════════════════════════
Frontend Engineer with 3 years of expertise in building enterprise web applications with React, TypeScript, Next.js, and Redux Toolkit.

════════════════════════════════════════════════════════════════
📌 WORK EXPERIENCE
════════════════════════════════════════════════════════════════
Frontend Engineer — PixelFlow Systems (2023 – Present)
  • Led frontend design system migration to Tailwind CSS and TypeScript, reducing client bundle size by 30%.
  • Optimized Core Web Vitals (LCP/CLS/INP), improving end-user conversion rates by 22%.
  • Architected scalable client-side caching with Redux Toolkit and React Query for asynchronous data fetching.

════════════════════════════════════════════════════════════════
📌 TECHNICAL SKILLS
════════════════════════════════════════════════════════════════
  • Core: React.js, JavaScript (ES6+), TypeScript, HTML5, CSS3/SCSS
  • Frameworks & State: Next.js, Redux Toolkit, React Query, Zustand
  • UI & Styling: Tailwind CSS, shadcn/ui, Framer Motion, Material UI
  • Tools & Testing: Git, Jest, Cypress, Vite, Webpack, Figma`
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
    resumeText: `👤 RAHUL VERMA
Hyderabad, Telangana, India | rahul.verma@example.com | linkedin.com/in/rahulverma

════════════════════════════════════════════════════════════════
📌 PROFESSIONAL SUMMARY
════════════════════════════════════════════════════════════════
Backend specialist with 5 years experience designing distributed REST APIs, high-throughput microservices, and asynchronous event pipelines.

════════════════════════════════════════════════════════════════
📌 WORK EXPERIENCE
════════════════════════════════════════════════════════════════
Lead Backend Engineer — DataPulse Networks (2021 – Present)
  • Designed and delivered distributed event-driven microservices using Python, FastAPI, Docker, and Kubernetes.
  • Optimized high-concurrency PostgreSQL queries, connection pooling, and multi-region replication.
  • Integrated Redis pub/sub and distributed rate-limiting to protect mission-critical payment gateways.

════════════════════════════════════════════════════════════════
📌 TECHNICAL SKILLS
════════════════════════════════════════════════════════════════
  • Languages: Python, Go, SQL, Bash
  • Backend: FastAPI, Django, Flask, gRPC, RESTful APIs
  • Databases: PostgreSQL, MongoDB, Redis, Elasticsearch
  • Distributed Systems: Kafka, RabbitMQ, Docker, Kubernetes, Microservices`
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
    resumeText: `👤 MAYA PATEL
Mumbai, Maharashtra, India | maya.patel@example.com | linkedin.com/in/mayapatel

════════════════════════════════════════════════════════════════
📌 PROFESSIONAL SUMMARY
════════════════════════════════════════════════════════════════
Analytical problem solver with 2 years analyzing complex business metrics, customer cohorts, and building SQL pipelines.

════════════════════════════════════════════════════════════════
📌 WORK EXPERIENCE
════════════════════════════════════════════════════════════════
Data Analyst — InsightsCorp Analytics (2024 – Present)
  • Authored complex SQL queries (window functions, CTEs, self-joins) over 50M+ rows of event logs.
  • Built interactive Tableau and Power BI dashboards for executive KPI tracking and revenue attribution.
  • Developed automated data cleaning pipelines using Python and Pandas.

════════════════════════════════════════════════════════════════
📌 TECHNICAL SKILLS
════════════════════════════════════════════════════════════════
  • Database & Querying: SQL (PostgreSQL, MySQL, Snowflake), CTEs, Window Functions
  • Programming & Analytics: Python, Pandas, NumPy, Scikit-learn
  • Visualization & BI: Tableau, Power BI, Metabase, Excel (Advanced)`
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
    resumeText: `👤 ANITA ROY
New Delhi, India | anita.roy@example.com | github.com/anitaroy

════════════════════════════════════════════════════════════════
📌 EDUCATION
════════════════════════════════════════════════════════════════
B.Tech in Computer Science and Engineering (2022 – 2026)
GPA: 8.8 / 10 | Delhi Technological University

════════════════════════════════════════════════════════════════
📌 PROJECTS & ACHIEVEMENTS
════════════════════════════════════════════════════════════════
  • Solved 350+ algorithmic problems on LeetCode covering Dynamic Programming, Trees, and Graph Traversals.
  • Built scalable student management system using C++, OOP principles, and SQL database storage.
  • Completed core academic coursework in Operating Systems, DBMS, Computer Networks, and Compiler Design.

════════════════════════════════════════════════════════════════
📌 TECHNICAL SKILLS
════════════════════════════════════════════════════════════════
  • Core Languages: C++, Java, Python, C, SQL
  • CS Fundamentals: Data Structures & Algorithms, Object-Oriented Programming (OOP), OS, DBMS, Networks
  • Tools: Git, GitHub, VS Code, Linux/Unix`
  }
];

/**
 * Sanitizes and cleans text by removing binary artifacts, PDF stream tokens,
 * non-printable characters.
 */
export function cleanResumeText(raw) {
  if (!raw || typeof raw !== 'string') return '';

  let text = raw;

  // Check if raw contains PDF internal binary signatures
  const hasPdfSignatures = /%PDF|\bobj\b|\bendobj\b|\bstream\b|\bendstream\b|\bxref\b|FlateDecode/i.test(text);

  if (hasPdfSignatures) {
    text = text
      .replace(/%PDF-[0-9.]+/g, '')
      .replace(/<<[\s\S]*?>>/g, ' ')
      .replace(/\b\d+\s+\d+\s+obj\b[\s\S]*?\bendobj\b/gi, ' ')
      .replace(/\bstream[\s\S]*?endstream\b/gi, ' ')
      .replace(/\bxref[\s\S]*?trailer/gi, ' ')
      .replace(/\bstartxref[\s\S]*?%%EOF/gi, ' ')
      .replace(/\[<[0-9a-fA-F]+>\]/g, ' ')
      .replace(/\/[\w\d]+/g, ' ');
  }

  // Remove non-printable control characters, corrupted unicode replacement characters
  text = text
    .replace(/\uFFFD/g, ' ')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, ' ')
    .replace(/[^\x20-\x7E\n\r\t•–—|/()#+&@%:.,-]/g, ' ');

  // Filter out lines that look like raw binary noise
  const lines = text
    .split(/\r?\n/)
    .map(line => line.trim().replace(/\s+/g, ' '))
    .filter(line => {
      if (!line) return false;
      const alphaCount = (line.match(/[a-zA-Z]/g) || []).length;
      return alphaCount >= 2 && line.length >= 2;
    });

  return lines.join('\n');
}

/**
 * Intelligently structures, cleans, and formats any resume text into
 * an organized, professional layout with clean section dividers.
 */
export function formatResumeForDisplay(raw) {
  if (!raw || typeof raw !== 'string') return '';

  const cleaned = cleanResumeText(raw);
  if (!cleaned) return '';

  // 1. Remove isolated single-character icon artifacts (e.g. "R vatsal...", "W |", etc.)
  let text = cleaned
    .replace(/(^|\s)[A-Za-z]\s+([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, '$1| $2')
    .replace(/(^|\s)[A-Za-z]\s*\|\s*/g, ' | ')
    .replace(/\s+([.,;:])/g, '$1') // Fix "word ." -> "word."
    .replace(/([(\[{])\s+/g, '$1')
    .replace(/\s+([)\]}])/g, '$1');

  // 2. Identify Standard Resume Sections
  const SECTION_KEYWORDS = [
    'EDUCATION',
    'EXPERIENCE',
    'WORK EXPERIENCE',
    'PROFESSIONAL EXPERIENCE',
    'INTERNSHIP EXPERIENCE',
    'TECHNICAL SKILLS',
    'SKILLS',
    'CORE COMPETENCIES',
    'PROJECTS',
    'KEY PROJECTS',
    'ACADEMIC PROJECTS',
    'ACHIEVEMENTS & CERTIFICATES',
    'ACHIEVEMENTS AND CERTIFICATES',
    'ACHIEVEMENTS',
    'CERTIFICATES & ACHIEVEMENTS',
    'CERTIFICATIONS',
    'AWARDS & ACHIEVEMENTS',
    'HONORS & AWARDS',
    'PUBLICATIONS',
    'POSITIONS OF RESPONSIBILITY',
    'LEADERSHIP',
    'SUMMARY',
    'PROFESSIONAL SUMMARY',
    'PROFILE SUMMARY',
    'ABOUT ME'
  ];

  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const formattedBlocks = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const normalizedHeader = line.toUpperCase().replace(/[^A-Z\s&]/g, '').trim();

    // Check if line is a section header (or starts with a section header)
    const matchedSection = SECTION_KEYWORDS.find(sec => sec === normalizedHeader || normalizedHeader === sec.replace('&', 'AND'));

    if (matchedSection) {
      formattedBlocks.push(`\n════════════════════════════════════════════════════════════════\n📌 ${matchedSection}\n════════════════════════════════════════════════════════════════`);
    } else if (/^(Languages|Frontend|Backend|Databases|Developer Tools|Tools|Cloud|DevOps|AI\/ML|Machine Learning|System Design|CS Fundamentals|Frameworks|Libraries|Core Skills):/i.test(line)) {
      // Subcategories under technical skills
      formattedBlocks.push(`  • ${line}`);
    } else if (/^[•\-\*▪–]/.test(line)) {
      // Bullet points
      const content = line.replace(/^[•\-\*▪–]\s*/, '').trim();
      formattedBlocks.push(`  • ${content}`);
    } else if (i === 0 && line.length < 50 && !line.includes('@') && !line.includes('+')) {
      // Candidate Name header
      formattedBlocks.push(`👤 ${line.toUpperCase()}`);
    } else {
      formattedBlocks.push(line);
    }
  }

  return formattedBlocks.join('\n').trim();
}

export const resumeService = {
  getSampleCandidates() {
    return SAMPLE_CANDIDATES;
  },

  /**
   * Extracts clean, structured text from uploaded File (.pdf, .txt, .md, .docx)
   */
  async extractTextFromFile(file) {
    if (!file) return '';

    const fileName = file.name.toLowerCase();
    const isPdf = file.type === 'application/pdf' || fileName.endsWith('.pdf');

    if (isPdf) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({
          data: new Uint8Array(arrayBuffer),
          useSystemFonts: true,
          disableFontFace: true
        });
        
        const pdf = await loadingTask.promise;
        const pageTextPromises = [];

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          pageTextPromises.push(
            pdf.getPage(pageNum).then(async (page) => {
              const textContent = await page.getTextContent();
              let lastY = null;
              let text = '';
              for (const item of textContent.items) {
                if (lastY !== null && Math.abs(item.transform[5] - lastY) > 5) {
                  text += '\n';
                } else if (text.length > 0 && !text.endsWith('\n') && !text.endsWith(' ')) {
                  text += ' ';
                }
                text += item.str;
                lastY = item.transform[5];
              }
              return text;
            })
          );
        }

        const pages = await Promise.all(pageTextPromises);
        const fullPdfText = pages.join('\n\n');
        const formatted = formatResumeForDisplay(fullPdfText);

        if (formatted.trim().length >= 30) {
          return formatted;
        }
      } catch (pdfErr) {
        console.warn('PDF.js text parsing encountered an error, applying fallback cleaner:', pdfErr);
      }
    }

    // Standard text fallback for .txt, .md, or unparsed files
    try {
      const raw = await file.text();
      return formatResumeForDisplay(raw);
    } catch {
      return '';
    }
  },

  cleanResumeText(text) {
    return cleanResumeText(text);
  },

  formatResumeForDisplay(text) {
    return formatResumeForDisplay(text);
  },

  /**
   * Parse resume text and extract candidate profile signals
   */
  parseResumeText(rawText) {
    const text = cleanResumeText(rawText);

    if (!text || typeof text !== 'string' || text.trim().length < 15) {
      return {
        detectedRole: 'Software Developer',
        roleId: 'software-developer',
        skills: ['Problem Solving', 'Data Structures', 'JavaScript'],
        experienceYears: 2,
        detectedLevel: 'intermediate',
        projectHighlights: ['Web Application Development', 'API Design'],
        rawLength: text ? text.length : 0
      };
    }

    const cleanLower = text.toLowerCase();

    // 1. Detect skills
    const detectedSkills = COMMON_SKILLS.filter(skill => {
      const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(^|[^a-zA-Z0-9])${escaped.toLowerCase()}([^a-zA-Z0-9]|$)`, 'i');
      return regex.test(cleanLower);
    });

    // Ensure at least some default skills if none detected
    const finalSkills = detectedSkills.length > 0
      ? detectedSkills
      : ['Data Structures', 'Algorithms', 'Software Engineering'];

    // 2. Detect experience level
    let experienceYears = 2;
    let detectedLevel = 'intermediate';

    if (/fresher|intern|student|graduate|entry[- ]level|0\s*years/i.test(cleanLower)) {
      experienceYears = 0;
      detectedLevel = 'fresher';
    } else if (/\b([1-2]|one|two)\s*years?\b/i.test(cleanLower) || /junior|beginner|associate/i.test(cleanLower)) {
      experienceYears = 2;
      detectedLevel = 'beginner';
    } else if (/\b([3-5]|three|four|five)\+?\s*years?\b/i.test(cleanLower) || /intermediate|mid[- ]level/i.test(cleanLower)) {
      experienceYears = 4;
      detectedLevel = 'intermediate';
    } else if (/\b([6-9]|1[0-9]|six|seven|eight|nine|ten|senior|lead|architect|principal)\+?\s*years?\b/i.test(cleanLower)) {
      experienceYears = 6;
      detectedLevel = 'advanced';
    }

    // 3. Detect primary role
    let detectedRole = 'Software Developer';
    let roleId = 'software-developer';

    if (/full[- ]stack|fullstack|mern|mean/i.test(cleanLower) || (/(react|vue|angular|frontend)/i.test(cleanLower) && /(node|express|django|backend|api)/i.test(cleanLower))) {
      detectedRole = 'Full Stack Developer';
      roleId = 'fullstack-developer';
    } else if (/frontend|react|vue|angular|css|html|ui\/ux|web design/i.test(cleanLower)) {
      detectedRole = 'Frontend Developer';
      roleId = 'frontend-developer';
    } else if (/backend|api|server|microservice|database|sql|express|django|spring/i.test(cleanLower)) {
      detectedRole = 'Backend Developer';
      roleId = 'backend-developer';
    } else if (/data\s*analyst|sql|tableau|power\s*bi|pandas|numpy|analytics/i.test(cleanLower)) {
      detectedRole = 'Data Analyst';
      roleId = 'data-analyst';
    } else if (/python|django|fastapi|flask/i.test(cleanLower)) {
      detectedRole = 'Python Developer';
      roleId = 'python-developer';
    } else if (/java|spring\s*boot|jvm|hibernate/i.test(cleanLower)) {
      detectedRole = 'Java Developer';
      roleId = 'java-developer';
    } else if (/c\+\+|cpp|embedded|stl|low[- ]level/i.test(cleanLower)) {
      detectedRole = 'C++ Developer';
      roleId = 'cpp-developer';
    }

    // 4. Extract Project Highlights
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
