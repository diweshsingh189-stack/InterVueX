/**
 * InterVueX Comprehensive Interview Question Bank
 * Covers 8 Job Roles, 4 Interview Types, 3 Difficulty Levels
 */

export const JOB_ROLES = [
  { id: 'software-developer', name: 'Software Developer', description: 'Core CS fundamentals, problem solving, algorithms, and system design.' },
  { id: 'frontend-developer', name: 'Frontend Developer', description: 'Modern JavaScript, React, DOM manipulation, performance, and CSS architecture.' },
  { id: 'backend-developer', name: 'Backend Developer', description: 'APIs, database design, caching, microservices, and server scalability.' },
  { id: 'fullstack-developer', name: 'Full Stack Developer', description: 'End-to-end web engineering, state management, REST/GraphQL, and DB integration.' },
  { id: 'data-analyst', name: 'Data Analyst', description: 'SQL querying, data modeling, statistical analysis, and business metrics interpretation.' },
  { id: 'python-developer', name: 'Python Developer', description: 'Pythonic patterns, concurrency, Django/FastAPI frameworks, and memory management.' },
  { id: 'java-developer', name: 'Java Developer', description: 'JVM architecture, Spring Boot, multithreading, OOP design patterns, and garbage collection.' },
  { id: 'cpp-developer', name: 'C++ Developer', description: 'Memory management, pointers, modern C++ (C++17/20), STL, and low-level performance.' }
];

export const EXPERIENCE_LEVELS = [
  { id: 'fresher', name: 'Fresher (0 Years)', desc: 'Core fundamentals and conceptual clarity' },
  { id: 'beginner', name: 'Beginner (1-2 Years)', desc: 'Applied knowledge and basic architecture' },
  { id: 'intermediate', name: 'Intermediate (3-5 Years)', desc: 'System design, optimization, and real-world debugging' },
  { id: 'advanced', name: 'Advanced (5+ Years)', desc: 'High-scale architecture, leadership, and deep trade-offs' }
];

export const INTERVIEW_TYPES = [
  { id: 'technical', name: 'Technical', desc: 'Coding concepts, algorithms, systems, and domain knowledge' },
  { id: 'coding', name: 'Coding Round', desc: 'Interactive code editor, live algorithm execution, and test cases' },
  { id: 'hr', name: 'HR / Culture', desc: 'Background, motivation, career trajectory, and workplace fit' },
  { id: 'behavioral', name: 'Behavioral', desc: 'STAR method, conflict resolution, leadership, and resilience' },
  { id: 'mixed', name: 'Mixed (Comprehensive)', desc: 'Balanced blend of technical depth, coding, and behavioral scenarios' }
];

export const DIFFICULTIES = [
  { id: 'easy', name: 'Easy', color: '#06B6D4' },
  { id: 'medium', name: 'Medium', color: '#38BDF8' },
  { id: 'hard', name: 'Hard', color: '#0284C7' }
];

export const COMPANIES = [
  { id: 'all', name: 'All Companies', subName: 'Universal Track', category: 'all', tier: 'General', lpa: '3.5 - 80+ LPA', icon: '🏢', focus: 'Universal hiring rubrics & standard questions' },
  // Top Product Companies (MAANG / Tier-1)
  { id: 'google', name: 'Google', subName: 'SWE / L3-L5', category: 'product', tier: 'Top Product (Tier-1)', lpa: '35 - 65 LPA', icon: '🌐', focus: 'DSA, System Design, Concurrency & Scale' },
  { id: 'microsoft', name: 'Microsoft', subName: 'SDE-1 / SDE-2', category: 'product', tier: 'Top Product (Tier-1)', lpa: '30 - 55 LPA', icon: '🪟', focus: 'Data Structures, OOP, OS & Memory Internals' },
  { id: 'amazon', name: 'Amazon', subName: 'SDE-1 / SDE-2', category: 'product', tier: 'Top Product (Tier-1)', lpa: '28 - 50 LPA', icon: '📦', focus: 'Leadership Principles, Scalability, Trees & Graphs' },
  { id: 'meta', name: 'Meta', subName: 'E3 - E5 Engineer', category: 'product', tier: 'Top Product (Tier-1)', lpa: '40 - 70 LPA', icon: '♾️', focus: 'Graph Algorithms, React, Product Architecture' },
  { id: 'netflix', name: 'Netflix', subName: 'Senior Software Dev', category: 'product', tier: 'Top Product (Tier-1)', lpa: '45 - 80 LPA', icon: '🍿', focus: 'Distributed Systems, High Throughput, Microservices' },
  { id: 'uber', name: 'Uber', subName: 'Software Engineer', category: 'product', tier: 'Top Product (Tier-1)', lpa: '35 - 60 LPA', icon: '🚗', focus: 'Geospatial algorithms, Real-time APIs, Low Latency' },
  { id: 'adobe', name: 'Adobe', subName: 'MTS / Software Dev', category: 'product', tier: 'Top Product (Tier-1)', lpa: '24 - 45 LPA', icon: '🎨', focus: 'Algorithms, C++, OOP Architecture, Graphics' },
  { id: 'apple', name: 'Apple', subName: 'ICT3 / ICT4 Engineer', category: 'product', tier: 'Top Product (Tier-1)', lpa: '35 - 65 LPA', icon: '🍎', focus: 'OS Internals, Swift/C++, Low Latency, Systems' },
  { id: 'atlassian', name: 'Atlassian', subName: 'P3 / P4 Software Eng', category: 'product', tier: 'Top Product (Tier-1)', lpa: '32 - 58 LPA', icon: '🔷', focus: 'Distributed Systems, Java/React, Microservices & Scale' },
  { id: 'flipkart', name: 'Flipkart', subName: 'SDE-1 / SDE-2', category: 'product', tier: 'Top Product (Tier-1)', lpa: '26 - 48 LPA', icon: '🛍️', focus: 'High Scale E-Commerce, Concurrency, Kafka & Redis' },
  { id: 'goldman-sachs', name: 'Goldman Sachs', subName: 'Analyst / Associate', category: 'product', tier: 'Top Product (Tier-1)', lpa: '28 - 52 LPA', icon: '📈', focus: 'FinTech Systems, Core Java, Algorithms & Math' },
  { id: 'oracle', name: 'Oracle', subName: 'SMTS / Software Dev', category: 'product', tier: 'Top Product (Tier-1)', lpa: '22 - 42 LPA', icon: '🏛️', focus: 'Cloud Infrastructure, Database Internals, High Availability' },
  // Service / Enterprise Companies
  { id: 'tcs', name: 'TCS', subName: 'Digital / Prime / Ninja', category: 'service', tier: 'Service / Enterprise', lpa: '3.6 - 9.5 LPA', icon: '💼', focus: 'Core CS, Aptitude, Java/C++, DBMS & SQL' },
  { id: 'infosys', name: 'Infosys', subName: 'DSE / SP / SE', category: 'service', tier: 'Service / Enterprise', lpa: '3.6 - 9.5 LPA', icon: '🏢', focus: 'Core CS, Algorithms, OOP, Database Queries' },
  { id: 'wipro', name: 'Wipro', subName: 'Turbo / Elite', category: 'service', tier: 'Service / Enterprise', lpa: '3.6 - 8.5 LPA', icon: '⚡', focus: 'Java, Python, SQL, Aptitude, Core Fundamentals' },
  { id: 'accenture', name: 'Accenture', subName: 'ASE / FSE', category: 'service', tier: 'Service / Enterprise', lpa: '4.5 - 11.5 LPA', icon: '🚀', focus: 'Cloud fundamentals, Problem solving, Full Stack' },
  { id: 'cognizant', name: 'Cognizant', subName: 'GenC Next / Pro', category: 'service', tier: 'Service / Enterprise', lpa: '4.0 - 10.0 LPA', icon: '💡', focus: 'Java, Full Stack, Cloud & Problem Solving' },
  { id: 'hcl', name: 'HCLTech', subName: 'Software Engineer', category: 'service', tier: 'Service / Enterprise', lpa: '3.6 - 8.5 LPA', icon: '⚙️', focus: 'Core CS, C++, Python, Data Engineering & Support' }
];

export const CS_SUBJECTS = [
  { id: 'all', name: 'All Topics' },
  { id: 'dsa', name: 'DSA' },
  { id: 'dbms', name: 'DBMS & SQL' },
  { id: 'os', name: 'Operating Systems' },
  { id: 'cn', name: 'Computer Networks' },
  { id: 'oop', name: 'OOP & Design Patterns' },
  { id: 'system-design', name: 'System Design' },
  { id: 'coding-problems', name: 'Coding Sandbox' },
  { id: 'hr', name: 'HR / Behavioral' }
];

export const QUESTIONS_DATABASE = [
  // ==========================================
  // SOFTWARE DEVELOPER - TECHNICAL
  // ==========================================
  {
    id: 'sd-tech-1',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'Data Structures & Algorithms',
    question: 'What is the difference between an Array and a Linked List in terms of memory allocation, insertion, and access time complexities?',
    keyConcepts: ['contiguous memory', 'pointers/nodes', 'O(1) random access', 'O(n) search', 'O(1) insertion at head/tail'],
    tips: 'Mention CPU cache locality for arrays and node overhead for linked lists.',
    idealAnswer: 'Arrays use contiguous memory providing O(1) random access via index, but resizing and mid-insertions cost O(n). Linked lists use non-contiguous nodes linked via pointers, allowing O(1) insertions given a node reference, but lack random access requiring O(n) traversal.'
  },
  {
    id: 'sd-tech-2',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'Object-Oriented Programming',
    question: 'Explain the SOLID principles with a concrete real-world software design example for at least two principles.',
    keyConcepts: ['Single Responsibility', 'Open-Closed', 'Liskov Substitution', 'Interface Segregation', 'Dependency Inversion'],
    tips: 'Use examples like payment processors (Open-Closed) or notification services (Dependency Inversion).',
    idealAnswer: 'SOLID stands for Single Responsibility (one reason to change), Open/Closed (open for extension, closed for modification), Liskov Substitution (subtypes must be substitutable for base types), Interface Segregation (small specific interfaces), and Dependency Inversion (depend on abstractions, not concretions).'
  },
  {
    id: 'sd-tech-3',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'System Design & OS',
    question: 'How do you design a thread-safe Singleton pattern, and what is Double-Checked Locking?',
    keyConcepts: ['volatile keyword', 'synchronization lock', 'memory reordering', 'race condition', 'lazy initialization'],
    tips: 'Explain why volatile is critical in Java/C++ to prevent instruction reordering before object initialization.',
    idealAnswer: 'Double-Checked Locking checks if the instance is null before acquiring a lock, then checks again inside the synchronized block before instantiation. The instance variable must be declared volatile to prevent instruction reordering.'
  },

  // ==========================================
  // FRONTEND DEVELOPER - TECHNICAL
  // ==========================================
  {
    id: 'fe-tech-1',
    role: 'frontend-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'JavaScript & Browser DOM',
    question: 'How does the JavaScript Event Loop handle synchronous tasks, microtasks (Promises), and macrotasks (setTimeout)?',
    keyConcepts: ['call stack', 'microtask queue', 'macrotask queue', 'Promise resolution', 'event loop cycle'],
    tips: 'Walk through an execution sequence showing that microtasks drain completely before the next macrotask runs.',
    idealAnswer: 'The JS Call Stack executes synchronous code first. When asynchronous operations resolve, Promise callbacks enter the Microtask Queue while setTimeout/setInterval callbacks enter the Macrotask Queue. After the call stack clears, the Event Loop processes all microtasks before picking the next macrotask.'
  },
  {
    id: 'fe-tech-2',
    role: 'frontend-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'React Architecture',
    question: 'What are the main causes of unnecessary re-renders in React, and how do you mitigate them using useMemo, useCallback, and React.memo?',
    keyConcepts: ['referential equality', 'virtual DOM reconciliation', 'props drilling', 'memoization', 'pure components'],
    tips: 'Distinguish between memoizing expensive calculations (useMemo) and stabilizing callback references (useCallback).',
    idealAnswer: 'Re-renders occur when parent components re-render or state/props change. Even if props are identical, new object/function references trigger child re-renders. We mitigate this by wrapping pure child components in React.memo and stabilizing props with useCallback for functions and useMemo for derived data.'
  },
  {
    id: 'fe-tech-3',
    role: 'frontend-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'Web Performance & Security',
    question: 'How would you diagnose and optimize Core Web Vitals (LCP, INP, CLS) for a high-traffic e-commerce application?',
    keyConcepts: ['Largest Contentful Paint', 'Interaction to Next Paint', 'Cumulative Layout Shift', 'code splitting', 'CDN caching', 'aspect-ratio'],
    tips: 'Specify strategies for LCP (preload critical hero image, SSR/SSG), INP (break long JS tasks via scheduler), and CLS (reserve image dimensions).',
    idealAnswer: 'To optimize LCP, preload hero assets, use edge CDNs, and inline critical CSS. For INP, yield the main thread using scheduler.yield() or requestIdleCallback and defer heavy third-party scripts. For CLS, specify explicit width/height on images and dynamically injected ads.'
  },

  // ==========================================
  // BACKEND DEVELOPER - TECHNICAL
  // ==========================================
  {
    id: 'be-tech-1',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'Databases & APIs',
    question: 'What is the difference between SQL (relational) and NoSQL (document/key-value) databases, and when would you choose one over the other?',
    keyConcepts: ['ACID compliance', 'schema flexibility', 'horizontal vs vertical scaling', 'joins', 'eventual consistency'],
    tips: 'Mention transactional integrity (banking/e-commerce) for SQL vs high write throughput / unstructured data for NoSQL.',
    idealAnswer: 'SQL databases use structured schemas and provide ACID transactions, ideal for relational data needing complex joins and strict integrity. NoSQL databases offer flexible schemas and horizontal scalability via sharding, ideal for high-throughput, semi-structured data.'
  },
  {
    id: 'be-tech-2',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'Caching & Reliability',
    question: 'Explain the Cache-Aside (Lazy Loading) pattern vs Write-Through caching. What strategies prevent Cache Stampede / Thundering Herd?',
    keyConcepts: ['Redis/Memcached', 'cache invalidation', 'TTL', 'mutex locks / probabilistic early expiration', 'database load'],
    tips: 'Discuss using distributed locks (Redlock) or XFetch probabilistic algorithm to prevent thousands of concurrent DB hits when a key expires.',
    idealAnswer: 'In Cache-Aside, the app reads from cache; on a miss, it reads from DB and writes to cache. In Write-Through, writes update DB and cache synchronously. To prevent cache stampede, use distributed mutex locks on misses or set background early re-computation.'
  },
  {
    id: 'be-tech-3',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'Distributed Systems',
    question: 'How would you design an Idempotent payment processing API to ensure users are never double-charged during network retries?',
    keyConcepts: ['Idempotency-Key header', 'unique database constraints', 'atomic transactions', 'distributed locking', 'status machine'],
    tips: 'Detail how the server checks for existing Idempotency Key in Redis or DB with a status like PENDING/SUCCESS before initiating charge.',
    idealAnswer: 'Clients generate a unique Idempotency-Key per checkout. On request, the server atomically checks if that key exists in a transactional database or Redis lock. If in-flight, return 409 Conflict. If completed, return cached response without re-processing.'
  },

  // ==========================================
  // FULL STACK DEVELOPER - TECHNICAL
  // ==========================================
  {
    id: 'fs-tech-1',
    role: 'fullstack-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'Authentication & Architecture',
    question: 'How does JWT authentication work from client to server, and what are the security trade-offs between storing tokens in localStorage vs httpOnly Cookies?',
    keyConcepts: ['Header.Payload.Signature', 'XSS vs CSRF', 'httpOnly cookie', 'SameSite attribute', 'token refresh rotation'],
    tips: 'Explain that localStorage is vulnerable to XSS token theft, while httpOnly cookies are immune to XSS theft but require CSRF protection (SameSite=Strict, CSRF tokens).',
    idealAnswer: 'JWTs encode claims signed with a secret or private key. Storing tokens in localStorage leaves them vulnerable to XSS script injection. Storing in httpOnly, Secure, SameSite=Strict cookies prevents JS access and mitigates CSRF, making it the industry best practice.'
  },

  // ==========================================
  // DATA ANALYST - TECHNICAL
  // ==========================================
  {
    id: 'da-tech-1',
    role: 'data-analyst',
    type: 'technical',
    difficulty: 'easy',
    category: 'SQL & Data Wrangling',
    question: 'What is the difference between WHERE and HAVING clauses in SQL, and how do Window Functions (like ROW_NUMBER vs DENSE_RANK) work?',
    keyConcepts: ['filtering before vs after GROUP BY', 'aggregation', 'ROW_NUMBER', 'RANK vs DENSE_RANK', 'OVER(PARTITION BY)'],
    tips: 'Clarify that WHERE filters individual rows before aggregation, while HAVING filters aggregated groups.',
    idealAnswer: 'WHERE filters rows prior to grouping, while HAVING filters grouped rows after aggregation. Window functions compute values across sets of rows without collapsing them: ROW_NUMBER assigns unique sequential integers, while DENSE_RANK assigns identical ranks to ties without skipping numbers.'
  },

  // ==========================================
  // PYTHON DEVELOPER - TECHNICAL
  // ==========================================
  {
    id: 'py-tech-1',
    role: 'python-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'Python Internals',
    question: 'What is the Global Interpreter Lock (GIL) in CPython, and how do you achieve true parallelism for CPU-bound vs I/O-bound tasks in Python?',
    keyConcepts: ['GIL mutex', 'multiprocessing vs threading', 'asyncio event loop', 'CPU-bound vs I/O-bound', 'memory sharing'],
    tips: 'Explain that threading/asyncio is great for I/O bound, while multiprocessing or C extensions bypass GIL for CPU bound.',
    idealAnswer: 'The GIL is a mutex that allows only one native thread to execute Python bytecode at a time in CPython. For I/O-bound tasks, threading and asyncio provide high concurrency by releasing GIL during I/O wait. For CPU-bound tasks, multiprocessing or ProcessPoolExecutor spawns separate processes with individual interpreters.'
  },

  // ==========================================
  // JAVA DEVELOPER - TECHNICAL
  // ==========================================
  {
    id: 'java-tech-1',
    role: 'java-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'JVM & Concurrency',
    question: 'Explain how JVM Garbage Collection works (Generational Hypothesis: Eden, Survivor, Tenured), and how Java prevents Memory Leaks.',
    keyConcepts: ['Minor GC vs Major GC', 'Eden space', 'Survivor spaces (S0/S1)', 'Old Generation', 'WeakReference', 'unclosed resources'],
    tips: 'Mention try-with-resources and removing event listeners to prevent unintended object retention.',
    idealAnswer: 'JVM divides heap into Young Generation (Eden, S0, S1) and Old Generation. New objects start in Eden; survivors of Minor GCs migrate to Survivor spaces, and long-lived objects are promoted to Tenured space for Major GC. Memory leaks are prevented by dereferencing unused objects, clearing listeners, and using try-with-resources.'
  },

  // ==========================================
  // C++ DEVELOPER - TECHNICAL
  // ==========================================
  {
    id: 'cpp-tech-1',
    role: 'cpp-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'Modern C++ & Memory',
    question: 'Explain RAII (Resource Acquisition Is Initialization) and the difference between std::unique_ptr, std::shared_ptr, and std::weak_ptr.',
    keyConcepts: ['deterministic destruction', 'exclusive ownership', 'reference counting control block', 'circular reference prevention'],
    tips: 'Emphasize that unique_ptr has zero runtime overhead over raw pointer, while weak_ptr breaks shared_ptr reference cycles.',
    idealAnswer: 'RAII binds resource lifecycle to object lifetime so destructors automatically release memory/locks upon leaving scope. std::unique_ptr maintains sole ownership with zero overhead. std::shared_ptr uses reference counting. std::weak_ptr observes a shared_ptr without increasing reference count, preventing cyclical deadlocks.'
  },

  // ==========================================
  // HR / CULTURE QUESTIONS (Universal)
  // ==========================================
  {
    id: 'hr-1',
    role: 'software-developer',
    type: 'hr',
    difficulty: 'easy',
    category: 'Introduction & Background',
    question: 'Tell me about yourself, your technical journey, and what made you interested in this role.',
    keyConcepts: ['structured elevator pitch', 'past accomplishments', 'relevant technical stack', 'future alignment with company'],
    tips: 'Follow the Present-Past-Future framework: where you are now, key technical projects, and why this specific role excites you.',
    idealAnswer: 'Structure as: 1) Current role/studies and core tech strengths. 2) Key milestone or impactful project delivered. 3) Genuine interest in solving problems in this domain.'
  },
  {
    id: 'hr-2',
    role: 'software-developer',
    type: 'hr',
    difficulty: 'easy',
    category: 'Strengths & Self-Awareness',
    question: 'What do you consider your greatest professional strength, and what is an area you are actively working to improve?',
    keyConcepts: ['genuine strength with proof', 'constructive weakness', 'actionable growth steps', 'self-awareness'],
    tips: 'Never say "I am too much of a perfectionist" without depth. Give a real technical or process area you are actively refining with courses/practice.',
    idealAnswer: 'State a real strength backed by a concrete outcome, followed by a genuine skill you are leveling up and the specific actions you are taking to master it.'
  },
  {
    id: 'hr-3',
    role: 'software-developer',
    type: 'hr',
    difficulty: 'medium',
    category: 'Career Vision & Fit',
    question: 'Where do you see yourself in 3 to 5 years, and how does this position fit into your long-term engineering career roadmap?',
    keyConcepts: ['technical mastery', 'mentorship/ownership', 'realistic career progression', 'commitment to engineering excellence'],
    tips: 'Demonstrate ambition to deepen technical expertise, take ownership of complex systems, and contribute to team mentorship.',
    idealAnswer: 'In 3-5 years, I aim to be a senior technical contributor with deep architectural ownership, driving resilient system design and mentoring junior developers.'
  },

  // ==========================================
  // BEHAVIORAL QUESTIONS (STAR Method)
  // ==========================================
  {
    id: 'beh-1',
    role: 'software-developer',
    type: 'behavioral',
    difficulty: 'medium',
    category: 'Conflict Resolution & Teamwork',
    question: 'Describe a situation where you had a technical disagreement with a teammate or lead. How did you handle it and what was the outcome?',
    keyConcepts: ['Situation', 'Task', 'Action (data-driven, respectful discussion)', 'Result (objective trade-offs, consensus)'],
    tips: 'Structure answer using STAR: Focus on evaluating technical benchmarks/trade-offs rather than emotional ego.',
    idealAnswer: 'Use the STAR method: Situation (different architecture proposals), Task (choose optimal approach for deadline), Action (built quick prototype/benchmarks, compared pros/cons objectively), Result (reached consensus and delivered on schedule).'
  },
  {
    id: 'beh-2',
    role: 'software-developer',
    type: 'behavioral',
    difficulty: 'hard',
    category: 'Failure & Resilience',
    question: 'Tell me about a time a project or deployment failed or missed a critical deadline. What went wrong, how did you respond, and what did you learn?',
    keyConcepts: ['ownership/no blame', 'immediate mitigation', 'root cause analysis (post-mortem)', 'preventive safeguards implemented'],
    tips: 'Take personal accountability, explain the immediate fix, and emphasize long-term automated guardrails created (tests, alerts).',
    idealAnswer: 'In STAR format: Explain the root cause calmly, how you rolled back or mitigated user impact immediately, and how you introduced automated integration tests and alerts to ensure the incident never repeats.'
  },
  {
    id: 'beh-3',
    role: 'software-developer',
    type: 'behavioral',
    difficulty: 'medium',
    category: 'Prioritization & Deadlines',
    question: 'How do you handle tight deadlines or sudden shifting requirements when multiple stakeholders demand competing priorities?',
    keyConcepts: ['impact vs effort matrix', 'transparent communication', 'scope negotiation', 'stakeholder alignment'],
    tips: 'Highlight breaking down deliverables into MVP vs nice-to-have and keeping stakeholders informed proactively.',
    idealAnswer: 'I categorize requirements by business impact and dependencies, proactively communicate trade-offs to stakeholders, and negotiate an MVP milestone to ship critical value on time without compromising code quality.'
  },

  // ==========================================
  // CODING ROUND PROBLEMS (Interactive Coding)
  // ==========================================
  {
    id: 'code-1',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'easy',
    category: 'DSA',
    company: 'google',
    subject: 'dsa',
    question: 'Two Sum: Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.',
    keyConcepts: ['hash map lookup', 'O(n) time complexity', 'single pass', 'space-time trade-off'],
    tips: 'Use a hash map to store complement (target - current num) for O(1) lookup.',
    idealAnswer: 'Using a Hash Map gives O(n) time and O(n) space by checking if target - nums[i] is already in our map during a single linear traversal.',
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Your code here
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      python: `def two_sum(nums, target):
    # Your code here
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int comp = target - nums[i];
            if (map.containsKey(comp)) {
                return new int[] { map.get(comp), i };
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`,
      cpp: `#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> map;
    for (int i = 0; i < nums.size(); i++) {
        int comp = target - nums[i];
        if (map.count(comp)) return {map[comp], i};
        map[nums[i]] = i;
    }
    return {};
}`
    },
    testCases: [
      { input: 'nums = [2,7,11,15], target = 9', expected: '[0, 1]' },
      { input: 'nums = [3,2,4], target = 6', expected: '[1, 2]' },
      { input: 'nums = [3,3], target = 6', expected: '[0, 1]' }
    ]
  },
  {
    id: 'code-2',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA',
    company: 'amazon',
    subject: 'dsa',
    question: 'Valid Parentheses: Given a string `s` containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.',
    keyConcepts: ['stack LIFO', 'matching brackets', 'O(n) time complexity', 'early exit'],
    tips: 'Use a stack to push expected closing brackets or pop matching open brackets.',
    idealAnswer: 'Push opening brackets to a stack, and on closing bracket check if stack top matches. Return true if stack is empty at the end.',
    starterCode: {
      javascript: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const char of s) {
    if (map[char]) {
      if (stack.pop() !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}`,
      python: `def is_valid(s: str) -> bool:
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in pairs:
            if not stack or stack.pop() != pairs[char]:
                return False
        else:
            stack.append(char)
    return len(stack) == 0`,
      java: `class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`,
      cpp: `#include <string>
#include <stack>
using namespace std;

bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(') st.push(')');
        else if (c == '{') st.push('}');
        else if (c == '[') st.push(']');
        else if (st.empty() || st.top() != c) return false;
        else st.pop();
    }
    return st.empty();
}`
    },
    testCases: [
      { input: 's = "()"', expected: 'true' },
      { input: 's = "()[]{}"', expected: 'true' },
      { input: 's = "(]"', expected: 'false' }
    ]
  },
  {
    id: 'code-3',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA',
    company: 'microsoft',
    subject: 'dsa',
    question: 'Reverse a Linked List: Given the head of a singly linked list, reverse the list and return the reversed list head.',
    keyConcepts: ['three pointers (prev, curr, next)', 'in-place reversal', 'O(n) time', 'O(1) auxiliary space'],
    tips: 'Iterate with `prev = null`, `curr = head`, store `next = curr.next`, set `curr.next = prev`, then advance pointers.',
    idealAnswer: 'Maintain prev, curr, next pointers. Reverse curr.next to prev at each node until curr becomes null, returning prev as new head.',
    starterCode: {
      javascript: `function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr !== null) {
    let nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  return prev;
}`,
      python: `def reverse_list(head):
    prev = None
    curr = head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev`,
      java: `public ListNode reverseList(ListNode head) {
    ListNode prev = null;
    ListNode curr = head;
    while (curr != null) {
        ListNode nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}`,
      cpp: `ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr) {
        ListNode* nextNode = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextNode;
    }
    return prev;
}`
    },
    testCases: [
      { input: 'head = [1,2,3,4,5]', expected: '[5,4,3,2,1]' },
      { input: 'head = [1,2]', expected: '[2,1]' },
      { input: 'head = []', expected: '[]' }
    ]
  },

  // ==========================================
  // CORE CS SUBJECTS (DBMS, OS, CN, OOP, SYSTEM DESIGN)
  // ==========================================
  {
    id: 'cs-dbms-1',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'DBMS',
    company: 'tcs',
    subject: 'dbms',
    question: 'What are ACID properties in Database Management Systems, and how does Write-Ahead Logging (WAL) enforce Durability?',
    keyConcepts: ['Atomicity', 'Consistency', 'Isolation', 'Durability', 'WAL mechanism', 'redo/undo logs'],
    tips: 'Contrast relational ACID guarantees with NoSQL eventual consistency models.',
    idealAnswer: 'ACID guarantees Atomicity (all-or-nothing), Consistency (integrity constraints), Isolation (concurrent safety), and Durability (committed data survives crashes). WAL writes changes to non-volatile disk logs before updating pages, enabling crash recovery.'
  },
  {
    id: 'cs-os-1',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'Operating Systems',
    company: 'infosys',
    subject: 'os',
    question: 'Explain the difference between a Process and a Thread, Virtual Memory, and how Page Faults are handled by the OS.',
    keyConcepts: ['isolated address space vs shared memory', 'PCB vs TCB', 'virtual address translation', 'MMU', 'page replacement algorithms (LRU)'],
    tips: 'Mention context switching overhead differences between processes and kernel/user threads.',
    idealAnswer: 'Processes have independent address spaces and file descriptors managed by PCBs. Threads share memory space within a process. Virtual memory allows processes to use disk space as RAM via MMU page tables; a Page Fault interrupts CPU to fetch missing pages from disk.'
  },
  {
    id: 'cs-cn-1',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'Computer Networks',
    company: 'microsoft',
    subject: 'cn',
    question: 'What happens under the hood during a TCP 3-Way Handshake, and how does TCP provide reliable transmission over unreliable IP?',
    keyConcepts: ['SYN', 'SYN-ACK', 'ACK', 'sequence numbers', 'sliding window flow control', 'checksums & retransmission timeouts'],
    tips: 'Mention connection teardown (4-Way FIN) and how congestion control (Slow Start, AIMD) operates.',
    idealAnswer: 'Client sends SYN with initial sequence number, server replies SYN-ACK with acknowledgment and its own sequence number, client responds ACK. TCP guarantees reliability through sequence numbering, cumulative acknowledgments, checksums, and adaptive retransmissions.'
  },
  {
    id: 'cs-sys-1',
    role: 'fullstack-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'System Design',
    company: 'amazon',
    subject: 'system-design',
    question: 'How would you design a scalable URL Shortener service (like TinyURL) handling 100 Million daily active requests with low latency?',
    keyConcepts: ['Base62 encoding vs Hash MD5', 'distributed ID generation (Snowflake)', 'caching layer (Redis)', 'read-heavy optimization', 'database sharding'],
    tips: 'Calculate QPS, storage estimation for 5 years, and cache hit ratio strategies.',
    idealAnswer: 'Use Base62 encoding on unique 64-bit integer IDs generated by a distributed counter (Snowflake). Route reads through a multi-region Redis cache cluster (80-20 Pareto rule), with a partitioned NoSQL/SQL database backend for persistence.'
  }
];

/**
 * Helper to get questions for a session with support for Company, Role, Type, and Difficulty
 */
export function getQuestionsForInterview(roleId, typeId, difficultyId, count = 5, companyId = 'all') {
  let filtered = QUESTIONS_DATABASE.filter(q => {
    // Company match
    const companyMatch = (companyId === 'all' || !q.company || q.company === companyId);
    
    // Type match
    const typeMatch = (typeId === 'mixed') 
      ? true 
      : (typeId === 'coding' ? q.type === 'coding' : q.type === typeId);

    // Role match
    const roleMatch = (typeId === 'coding' || typeId === 'hr' || typeId === 'behavioral') 
      ? true 
      : (q.role === roleId || !q.role || q.type === 'hr' || q.type === 'behavioral');

    // Difficulty match
    const diffMatch = difficultyId 
      ? (q.difficulty === difficultyId || q.difficulty === 'medium' || !q.difficulty) 
      : true;

    return companyMatch && typeMatch && roleMatch && diffMatch;
  });

  // If filtered pool is smaller than desired count, supplement from matching type or universal database
  if (filtered.length < count) {
    const backupPool = QUESTIONS_DATABASE.filter(q => {
      if (typeId === 'coding') return q.type === 'coding' && !filtered.some(f => f.id === q.id);
      return !filtered.some(f => f.id === q.id);
    });
    filtered = [...filtered, ...backupPool];
  }

  // Shuffle and slice
  const shuffled = [...filtered].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

