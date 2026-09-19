/**
 * Part 3: Service / Enterprise Companies (TCS, Infosys, Wipro, Accenture, Cognizant, HCLTech)
 * 6 Companies x 10 Questions = 60 Questions
 */

export const COMPANY_QUESTIONS_PART3 = [
  // ==========================================
  // 13. TCS (Tata Consultancy Services)
  // ==========================================
  {
    id: 'tcs-1',
    company: 'tcs',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'Core Java & OOP Concepts',
    subject: 'oop',
    question: 'Explain the 4 Pillars of Object-Oriented Programming (OOP) in Java: Encapsulation, Inheritance, Polymorphism, and Abstraction with clear real-world examples.',
    keyConcepts: ['Encapsulation (Getters/Setters, Private fields)', 'Inheritance (extends keyword, Code Reusability)', 'Polymorphism (Method Overloading vs Overriding)', 'Abstraction (Interfaces and Abstract Classes)'],
    tips: 'Use clear real-world analogies: Car interface (Abstraction), Bank Account balance (Encapsulation), Vehicle -> ElectricCar (Inheritance), Shape.draw() (Polymorphism).',
    idealAnswer: `OOP Fundamentals:
1. Encapsulation: Bundles data (fields) and methods operating on that data into a single unit, hiding internal state via \`private\` access modifiers and exposing controlled \`getters/setters\`. Example: Bank account with private \`balance\` modified only via \`deposit()\` and \`withdraw()\`.
2. Abstraction: Hides implementation complexity and exposes only essential features via \`interface\` or \`abstract class\`. Example: Turning on a car engine by pressing a button without knowing internal fuel combustion mechanics.
3. Inheritance: Mechanism where a child class acquires properties of a parent class via \`extends\`, enabling code reusability. Example: \`class Dog extends Animal\`.
4. Polymorphism: Ability of an object to take many forms.
   - Compile-Time (Static): Method Overloading (same name, different parameter types).
   - Runtime (Dynamic): Method Overriding (child class redefines parent method with \`@Override\`).`
  },
  {
    id: 'tcs-2',
    company: 'tcs',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'easy',
    category: 'DSA - Array & Two Pointers',
    subject: 'dsa',
    question: 'Find the Second Largest Element in an array in a single traversal (O(N) time and O(1) space).',
    keyConcepts: ['Single Pass Traversal', 'Two Variable Tracking (first, second)', 'Handling Duplicates', 'O(N) Time and O(1) Space'],
    tips: 'Initialize first = -Infinity and second = -Infinity. When num > first, update second = first, first = num.',
    idealAnswer: `Single-Pass Algorithm:
1. Initialize \`first = -Infinity\` and \`second = -Infinity\`.
2. Loop through each number in array:
   - If \`num > first\`:
     - \`second = first\`
     - \`first = num\`
   - Else if \`num > second && num !== first\`:
     - \`second = num\`
3. Return \`second === -Infinity ? -1 : second\`.

Complexity: Time O(N) single pass, Space O(1) constant.`,
    starterCode: {
      javascript: `function getSecondLargest(arr) {
  let first = -Infinity, second = -Infinity;
  for (const num of arr) {
    if (num > first) {
      second = first;
      first = num;
    } else if (num > second && num !== first) {
      second = num;
    }
  }
  return second === -Infinity ? -1 : second;
}`
    }
  },
  {
    id: 'tcs-3',
    company: 'tcs',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'Database & SQL Queries',
    subject: 'dbms',
    question: 'Explain SQL Joins (INNER, LEFT, RIGHT, FULL OUTER), GROUP BY with HAVING clause, and Primary Key vs Unique Key.',
    keyConcepts: ['INNER JOIN vs OUTER JOIN', 'GROUP BY & Aggregate Functions (COUNT, SUM, AVG)', 'WHERE (Pre-filter) vs HAVING (Post-aggregation filter)', 'Primary Key (1 per table, NOT NULL) vs Unique Key (Multiple, Allows NULL)'],
    tips: 'Explain that WHERE filters individual rows before grouping, while HAVING filters aggregated groups.',
    idealAnswer: `SQL Fundamentals:
1. Joins:
   - INNER JOIN: Returns rows with matching keys in both tables.
   - LEFT JOIN: Returns all rows from left table + matched rows from right table (NULL if no match).
   - RIGHT JOIN: Returns all rows from right table + matched rows from left table.
   - FULL OUTER JOIN: Returns all rows when there is a match in either left or right table.
2. GROUP BY & HAVING:
   - \`GROUP BY\`: Groups rows sharing a column value for aggregate functions (SUM, COUNT).
   - \`HAVING\`: Filters groups after aggregation (\`HAVING COUNT(*) > 5\`), whereas \`WHERE\` filters rows before grouping.
3. Primary Key vs Unique Key:
   - Primary Key: Uniquely identifies each row; cannot contain NULL; exactly 1 per table.
   - Unique Key: Enforces uniqueness; allows 1 NULL value; multiple unique keys allowed per table.`
  },
  {
    id: 'tcs-4',
    company: 'tcs',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'easy',
    category: 'DSA - String Manipulation',
    subject: 'dsa',
    question: 'Reverse Words in a String: Given an input string s, reverse the order of the words while removing extra leading, trailing, and multiple spaces.',
    keyConcepts: ['String Trimming & Splitting', 'Two Pointer Reversal', 'Space Normalization', 'O(N) Time and Space'],
    tips: 'Trim the string, split by regex /\\s+/, reverse the array of words, and join with a single space.',
    idealAnswer: `Approach:
1. Trim whitespace from beginning and end of string.
2. Split string using regex matching one or more spaces: \`s.trim().split(/\\s+/)\`.
3. Reverse the array of words.
4. Join words with a single space.

Complexity: Time O(N), Space O(N).`,
    starterCode: {
      javascript: `function reverseWords(s) {
  return s.trim().split(/\\s+/).reverse().join(' ');
}`
    }
  },
  {
    id: 'tcs-5',
    company: 'tcs',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'Core Java Collections Framework',
    subject: 'oop',
    question: 'What is the internal difference between ArrayList vs LinkedList, and HashMap vs Hashtable in Java?',
    keyConcepts: ['ArrayList (Dynamic contiguous array, O(1) random access)', 'LinkedList (Doubly linked list nodes, O(1) insertion)', 'HashMap (Non-synchronized, allows 1 null key)', 'Hashtable (Synchronized, legacy, no nulls)'],
    tips: 'Mention that HashMap uses an array of linked nodes that convert to Red-Black Trees (TREEIFY_THRESHOLD = 8) in Java 8+ for O(log N) worst-case collision handling.',
    idealAnswer: `Java Collections Internals:
1. ArrayList vs LinkedList:
   - ArrayList: Backed by dynamic contiguous array. Provides O(1) random index access (\`get(i)\`), but slow O(n) insertions/deletions in the middle due to element shifting.
   - LinkedList: Backed by doubly linked list nodes. Fast O(1) insertions given node reference, but slow O(n) index traversal.
2. HashMap vs Hashtable:
   - HashMap: Non-synchronized (fast for single-threaded or concurrent locks), allows 1 \`null\` key and multiple \`null\` values.
   - Hashtable: Thread-safe with synchronized methods (legacy), does not allow \`null\` keys or values.`
  },
  {
    id: 'tcs-6',
    company: 'tcs',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'easy',
    category: 'DSA - Math & Number Theory',
    subject: 'dsa',
    question: 'Check if a number is an Armstrong Number and check if it is a Prime Number.',
    keyConcepts: ['Armstrong calculation (sum of digits^totalDigits)', 'Prime check up to sqrt(N)', 'Modulo and Integer Division'],
    tips: 'For prime checking, test divisibility only up to sqrt(N) in O(sqrt(N)) time rather than O(N).',
    idealAnswer: `Algorithms:
1. Armstrong Number:
   - Find number of digits d.
   - Sum each digit raised to power d: \`sum += Math.pow(digit, d)\`.
   - If \`sum === originalNum\`, return true.
2. Prime Number:
   - If \`n <= 1\`, return false. If \`n <= 3\`, return true.
   - If \`n % 2 === 0 || n % 3 === 0\`, return false.
   - Loop \`i\` from 5 to \`sqrt(n)\` stepping by 6: if \`n % i === 0 || n % (i + 2) === 0\`, return false.
   - Return true.`,
    starterCode: {
      javascript: `function isArmstrong(num) {
  const s = String(num);
  const d = s.length;
  let sum = 0;
  for (const c of s) sum += Math.pow(parseInt(c), d);
  return sum === num;
}

function isPrime(n) {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}`
    }
  },
  {
    id: 'tcs-7',
    company: 'tcs',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'Web Basics - HTTP & MVC Architecture',
    subject: 'system-design',
    question: 'Explain HTTP GET vs POST methods, and describe Model-View-Controller (MVC) Architecture.',
    keyConcepts: ['GET (Idempotent, URL query string, cached) vs POST (Request body payload, non-idempotent)', 'Model (Data & Business Logic)', 'View (User Interface)', 'Controller (Request Router & Coordinator)'],
    tips: 'Highlight that GET requests should be safe and idempotent (no state change on server), whereas POST modifies server state.',
    idealAnswer: `Web Concepts:
1. GET vs POST:
   - GET: Requests data from server. Parameters appended to URL query string (\`?key=val\`), length restricted, cached by browsers, idempotent.
   - POST: Submits data to server. Parameters sent in HTTP request body, no size limit, not cached, non-idempotent.
2. MVC Architecture:
   - Model: Encapsulates database entities, validation rules, and business logic.
   - View: Renders presentation UI (HTML, React, JSP) to user.
   - Controller: Receives client HTTP requests, invokes Model business logic, and selects View to render response.`
  },
  {
    id: 'tcs-8',
    company: 'tcs',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'easy',
    category: 'DSA - Sorting & Searching',
    subject: 'dsa',
    question: 'Binary Search: Implement Binary Search on a sorted array of integers returning the index of target, or -1 if not found in O(log N) time.',
    keyConcepts: ['Binary Search', 'Dividing search space in half', 'mid = low + Math.floor((high - low) / 2)', 'O(log N) Time Complexity'],
    tips: 'Avoid integer overflow when calculating mid by using low + Math.floor((high - low) / 2).',
    idealAnswer: `Binary Search Implementation:
1. Set \`low = 0, high = arr.length - 1\`.
2. While low <= high:
   - \`mid = low + Math.floor((high - low) / 2)\`.
   - If \`arr[mid] === target\`: return mid.
   - If \`arr[mid] < target\`: \`low = mid + 1\`.
   - Else: \`high = mid - 1\`.
3. Return -1.

Complexity: Time O(log N), Space O(1).`,
    starterCode: {
      javascript: `function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`
    }
  },
  {
    id: 'tcs-9',
    company: 'tcs',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'Operating Systems - Deadlock',
    subject: 'os',
    question: 'What is a Deadlock in Operating Systems, what are the 4 Coffman Conditions, and how can Deadlock be prevented?',
    keyConcepts: ['Deadlock definition', '4 Coffman Conditions (Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait)', 'Banker\'s Algorithm', 'Deadlock Prevention via Resource Ordering'],
    tips: 'If you break ANY ONE of the 4 Coffman conditions, deadlock cannot physically occur.',
    idealAnswer: `Deadlock Fundamentals:
1. Deadlock: A state where a set of processes are blocked because each process is holding a resource and waiting for another resource held by another process.
2. 4 Coffman Conditions:
   - Mutual Exclusion: Resources cannot be shared simultaneously.
   - Hold and Wait: A process holds at least 1 resource while waiting for others.
   - No Preemption: Resources cannot be forcibly taken from a process.
   - Circular Wait: Process P1 waits for P2, P2 waits for P3... Pn waits for P1.
3. Prevention: Eliminate Circular Wait by imposing a strict global numeric hierarchy on all resources (processes must acquire resources in ascending numerical order).`
  },
  {
    id: 'tcs-10',
    company: 'tcs',
    role: 'software-developer',
    type: 'behavioral',
    difficulty: 'easy',
    category: 'HR & Cultural Adaptability',
    subject: 'hr',
    question: 'Why do you want to join TCS, and are you flexible with relocation and working across different technology domains?',
    keyConcepts: ['Company Knowledge (TCS global presence, ILP training)', 'Flexibility & Adaptability', 'Continuous Learning', 'Professional Communication'],
    tips: 'Mention TCS\'s world-class Initial Learning Program (ILP), vast domain exposure, and express an enthusiastic, adaptable attitude toward relocation and learning new tech stacks.',
    idealAnswer: `Model Response:
"I want to start my career at TCS because of its stellar reputation as a global IT leader with unmatched training programs like the Initial Learning Program (ILP) and extensive multi-industry project exposure. I value continuous learning and am eager to work with cutting-edge cloud, full-stack, and enterprise systems. I am completely flexible and excited about relocating to any TCS delivery center and adapting to whichever technology stack best drives customer value."`
  },

  // ==========================================
  // 14. INFOSYS (Infosys SP / DSE / SE)
  // ==========================================
  {
    id: 'infy-1',
    company: 'infosys',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'Core Java - String Immutability',
    subject: 'oop',
    question: 'Explain why String is Immutable in Java, and compare String vs StringBuilder vs StringBuffer.',
    keyConcepts: ['String Constant Pool (SCP)', 'Security & Thread-Safety', 'StringBuilder (Mutable, Non-synchronized)', 'StringBuffer (Mutable, Synchronized)'],
    tips: 'Explain that String immutability enables String Constant Pool caching in the heap, saving significant memory and ensuring thread-safe sharing.',
    idealAnswer: `String Memory & Mutability:
1. Why String is Immutable:
   - Memory Optimization: Enables the String Constant Pool (SCP) in JVM heap where identical string literals share the same object reference.
   - Security: String parameters (DB connection URLs, passwords, usernames) cannot be modified maliciously by other threads.
   - Thread-Safety: Multiple threads can read string instances concurrently without synchronization locks.
2. Comparison:
   - String: Immutable; every concatenation creates a new heap object.
   - StringBuilder: Mutable; allows in-place append operations; non-synchronized (fast for single-threaded).
   - StringBuffer: Mutable; synchronized thread-safe methods (slower due to lock overhead).`
  },
  {
    id: 'infy-2',
    company: 'infosys',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'easy',
    category: 'DSA - Array & Two Sum',
    subject: 'dsa',
    question: 'Find all Pairs with given Sum K in an array in O(N) time.',
    keyConcepts: ['Hash Set / Hash Map', 'Complement lookup (K - num)', 'O(N) Time and O(N) Space'],
    tips: 'Use a Hash Set to check if the complement (k - num) has already been seen in a single pass.',
    idealAnswer: `Hash Set Single-Pass:
1. Initialize \`seen = new Set()\` and \`pairs = []\`.
2. Loop through numbers in array:
   - \`complement = k - num\`.
   - If \`seen.has(complement)\`: push \`[complement, num]\` to pairs.
   - \`seen.add(num)\`.
3. Return pairs.

Complexity: Time O(N), Space O(N).`,
    starterCode: {
      javascript: `function findPairsWithSum(arr, k) {
  const seen = new Set();
  const pairs = [];
  for (const num of arr) {
    const comp = k - num;
    if (seen.has(comp)) {
      pairs.push([comp, num]);
    }
    seen.add(num);
  }
  return pairs;
}`
    }
  },
  {
    id: 'infy-3',
    company: 'infosys',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'Database & SQL Queries',
    subject: 'dbms',
    question: 'Write a SQL query to find the Nth Highest Salary from an Employee table using Window Functions and subqueries.',
    keyConcepts: ['DENSE_RANK() Window Function', 'LIMIT OFFSET clause', 'Handling duplicate salaries', 'Correlated Subquery'],
    tips: 'Use DENSE_RANK() OVER (ORDER BY salary DESC) because it gives duplicate salaries the same rank without skipping rank numbers.',
    idealAnswer: `SQL Solutions for Nth Highest Salary:
1. Using DENSE_RANK() (Standard & Best Practice):
\`\`\`sql
SELECT salary 
FROM (
  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rnk 
  FROM Employee
) ranked 
WHERE rnk = N 
LIMIT 1;
\`\`\`
2. Using LIMIT and OFFSET:
\`\`\`sql
SELECT DISTINCT salary 
FROM Employee 
ORDER BY salary DESC 
LIMIT 1 OFFSET N-1;
\`\`\``
  },
  {
    id: 'infy-4',
    company: 'infosys',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Linked List / Floyd\'s Cycle',
    subject: 'dsa',
    question: 'Linked List Cycle II (Find Start of Loop): Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null in O(N) time and O(1) space.',
    keyConcepts: ['Floyd\'s Tortoise and Hare Algorithm', 'Fast and Slow pointers', 'Mathematical proof for cycle start (L1 = L2)', 'O(1) Space'],
    tips: 'Once fast and slow meet, reset slow to head. Move both slow and fast 1 step at a time; they will meet exactly at the cycle entrance.',
    idealAnswer: `Floyd's Cycle Algorithm:
1. Initialize \`slow = head\` and \`fast = head\`.
2. While \`fast !== null && fast.next !== null\`:
   - \`slow = slow.next\`.
   - \`fast = fast.next.next\`.
   - If \`slow === fast\` (cycle detected):
     - Reset \`slow = head\`.
     - While \`slow !== fast\`:
       - \`slow = slow.next\`.
       - \`fast = fast.next\`.
     - Return \`slow\` (start of loop).
3. Return null (no cycle).

Complexity: Time O(N), Space O(1).`,
    starterCode: {
      javascript: `function detectCycle(head) {
  if (!head || !head.next) return null;
  let slow = head, fast = head;
  
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      slow = head;
      while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
      }
      return slow;
    }
  }
  return null;
}`
    }
  },
  {
    id: 'infy-5',
    company: 'infosys',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'easy',
    category: 'DSA - Stack & String',
    subject: 'dsa',
    question: 'Valid Parentheses: Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
    keyConcepts: ['Stack Data Structure', 'Bracket matching hash map', 'LIFO ordering', 'O(N) Time and Space'],
    tips: 'Push opening brackets to stack. When closing bracket arrives, verify stack top matches corresponding opening bracket.',
    idealAnswer: `Stack Matching:
1. Maintain \`stack = []\` and mapping \`map = { ')': '(', '}': '{', ']': '[' }\`.
2. Loop through characters in s:
   - If char is closing bracket:
     - If stack top !== map[char], return false.
     - \`stack.pop()\`.
   - Else: push char to stack.
3. Return \`stack.length === 0\`.

Complexity: Time O(N), Space O(N).`,
    starterCode: {
      javascript: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  
  for (const c of s) {
    if (map[c]) {
      if (stack.length === 0 || stack[stack.length - 1] !== map[c]) return false;
      stack.pop();
    } else {
      stack.push(c);
    }
  }
  return stack.length === 0;
}`
    }
  },
  {
    id: 'infy-6',
    company: 'infosys',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'Cloud & Web Services',
    subject: 'system-design',
    question: 'Explain Cloud Computing service models (IaaS vs PaaS vs SaaS) and HTTP Status Codes (200, 201, 400, 401, 403, 404, 500).',
    keyConcepts: ['IaaS (Infrastructure as a Service - AWS EC2)', 'PaaS (Platform as a Service - Heroku, App Engine)', 'SaaS (Software as a Service - Google Workspace)', 'HTTP Status Code Categories (2xx Success, 4xx Client Error, 5xx Server Error)'],
    tips: 'Differentiate 401 Unauthorized (unauthenticated user needs login) from 403 Forbidden (authenticated user lacks permissions).',
    idealAnswer: `Cloud & HTTP Fundamentals:
1. Cloud Service Models:
   - IaaS: Provides raw virtual machines, storage, and networking (e.g. AWS EC2, Azure VMs). User manages OS and runtime.
   - PaaS: Provides application deployment platform (e.g. Heroku, AWS Elastic Beanstalk). Cloud provider manages OS/runtime.
   - SaaS: Complete end-user software delivered over the web (e.g. Microsoft 365, Google Drive).
2. Key HTTP Status Codes:
   - 200 OK: Request succeeded.
   - 201 Created: New resource successfully created.
   - 400 Bad Request: Invalid payload or syntax.
   - 401 Unauthorized: Authentication required (missing/invalid token).
   - 403 Forbidden: Authenticated but unauthorized to access resource.
   - 404 Not Found: Resource does not exist.
   - 500 Internal Server Error: Unhandled server crash.`
  },
  {
    id: 'infy-7',
    company: 'infosys',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Matrix Manipulation',
    subject: 'dsa',
    question: 'Rotate Matrix by 90 Degrees Clockwise in-place without allocating another 2D matrix.',
    keyConcepts: ['Matrix Transpose', 'Row Reversal', 'In-place swap', 'O(N^2) Time and O(1) Space'],
    tips: 'Two simple steps: 1. Transpose the matrix (swap matrix[i][j] with matrix[j][i]). 2. Reverse each row horizontally.',
    idealAnswer: `Transpose and Reverse:
1. Step 1 (Transpose): Loop \`r\` from 0 to N-1, loop \`c\` from \`r + 1\` to N-1: swap \`matrix[r][c]\` with \`matrix[c][r]\`.
2. Step 2 (Reverse Rows): For each row, reverse elements using two pointers from left and right.

Complexity: Time O(N^2), Space O(1) in-place.`,
    starterCode: {
      javascript: `function rotate(matrix) {
  const n = matrix.length;
  // Transpose
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const temp = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = temp;
    }
  }
  // Reverse each row
  for (let i = 0; i < n; i++) {
    matrix[i].reverse();
  }
}`
    }
  },
  {
    id: 'infy-8',
    company: 'infosys',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'Core Java - Polymorphism & Keywords',
    subject: 'oop',
    question: 'What is the difference between this and super keywords, and explain static variables and static methods in Java.',
    keyConcepts: ['this (Current class instance reference)', 'super (Parent class reference & constructor invocation)', 'static (Class-level memory allocation in Metaspace)', 'static methods cannot access this/instance variables'],
    tips: 'Explain that static members belong to the Class itself rather than any individual object instance.',
    idealAnswer: `Java Keywords & static:
1. this vs super:
   - \`this\`: Refers to the current class instance (e.g. \`this.name = name\` to resolve variable shadowing).
   - \`super\`: Refers to the immediate parent class (e.g. \`super.display()\` or calling parent constructor \`super()\`).
2. static keyword:
   - Static Variables: Exactly 1 copy shared across all object instances of the class; allocated memory once when class loads.
   - Static Methods: Can be invoked directly via Class name (\`Math.sqrt()\`) without creating an object; cannot access \`this\` or non-static instance fields.`
  },
  {
    id: 'infy-9',
    company: 'infosys',
    role: 'software-developer',
    type: 'behavioral',
    difficulty: 'easy',
    category: 'Infosys SP/DSE - Technical Project Roadblock',
    subject: 'hr',
    question: 'Describe a challenging technical problem you faced during a project or academic lab and how you methodically solved it.',
    keyConcepts: ['Problem Solving', 'Debugging Methodology', 'Analytical Thinking', 'Team Communication', 'STAR Format'],
    tips: 'Explain your systematic troubleshooting steps rather than just saying you googled it.',
    idealAnswer: `Model Response (STAR):
- Situation: During my final year capstone project, our React frontend kept receiving CORS (Cross-Origin Resource Sharing) network errors when communicating with our Spring Boot REST API.
- Task: Fix API communication securely without disabling browser security headers.
- Action: I inspected the HTTP pre-flight OPTIONS request in browser developer tools. I realized the backend lacked a configured \`@CrossOrigin\` filter for our frontend development port. I configured a global WebMvcConfigurer bean to allow specified origin URLs and allowed headers.
- Result: API calls functioned seamlessly across environments, and I documented the local configuration setup in our GitHub README.`
  },
  {
    id: 'infy-10',
    company: 'infosys',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Recursion / Divide & Conquer',
    subject: 'dsa',
    question: 'Merge Sort: Implement the Merge Sort algorithm for an array of integers with O(N log N) time complexity.',
    keyConcepts: ['Divide and Conquer', 'Recursive Half Splitting', 'Merge Two Sorted Subarrays', 'O(N log N) Time Complexity'],
    tips: 'Divide array into left and right halves recursively, then merge the two sorted halves using two pointers.',
    idealAnswer: `Merge Sort Algorithm:
1. Base case: If \`arr.length <= 1\`, return arr.
2. Find \`mid = Math.floor(arr.length / 2)\`.
3. Recursively sort: \`left = mergeSort(arr.slice(0, mid))\`, \`right = mergeSort(arr.slice(mid))\`.
4. Merge sorted halves using helper function with two pointers.

Complexity: Time O(N log N) in all cases, Space O(N).`,
    starterCode: {
      javascript: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`
    }
  },

  // ==========================================
  // 15. WIPRO (Turbo / Elite)
  // ==========================================
  {
    id: 'wipro-1',
    company: 'wipro',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'Core Java - Equality & HashCode',
    subject: 'oop',
    question: 'Explain the difference between == operator and .equals() method in Java, and explain the hashCode() and equals() contract.',
    keyConcepts: ['== (Reference comparison / memory address)', '.equals() (Value / Content comparison)', 'hashCode() and equals() Contract', 'HashMap Bucket Collision'],
    tips: 'If two objects are equal via equals(), they MUST return the exact same hashCode(). Otherwise, HashMap lookups will fail.',
    idealAnswer: `Java Equality Contract:
1. == vs .equals():
   - \`==\`: Compares primitive values or object reference addresses in memory (checks if both variables point to the exact same heap memory location).
   - \`.equals()\`: Method in \`Object\` class meant to be overridden to compare logical state/content (e.g. comparing student IDs).
2. hashCode() Contract:
   - If \`objA.equals(objB) === true\`, then \`objA.hashCode()\` MUST equal \`objB.hashCode()\`.
   - If two objects have the same hashCode(), they may or may not be equal (hash collision).`
  },
  {
    id: 'wipro-2',
    company: 'wipro',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Array / Kadane\'s Algorithm',
    subject: 'dsa',
    question: 'Maximum Subarray Sum (Kadane\'s Algorithm): Given an integer array nums, find the subarray with the largest sum and return its sum in O(N) time.',
    keyConcepts: ['Kadane\'s Algorithm', 'currSum = Math.max(x, currSum + x)', 'maxSum tracker', 'O(N) Time and O(1) Space'],
    tips: 'At each element, decide whether to start a fresh subarray at current element or add current element to running sum.',
    idealAnswer: `Kadane's Algorithm:
1. Initialize \`currSum = nums[0]\` and \`maxSum = nums[0]\`.
2. Loop \`i\` from 1 to nums.length - 1:
   - \`currSum = Math.max(nums[i], currSum + nums[i])\`.
   - \`maxSum = Math.max(maxSum, currSum)\`.
3. Return maxSum.

Complexity: Time O(N) single pass, Space O(1).`,
    starterCode: {
      javascript: `function maxSubArray(nums) {
  let currSum = nums[0], maxSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currSum = Math.max(nums[i], currSum + nums[i]);
    maxSum = Math.max(maxSum, currSum);
  }
  return maxSum;
}`
    }
  },
  {
    id: 'wipro-3',
    company: 'wipro',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'Database Normalization',
    subject: 'dbms',
    question: 'Explain Database Normalization: 1NF, 2NF, 3NF, and BCNF with simple relational examples.',
    keyConcepts: ['Data Redundancy & Anomalies', '1NF (Atomic columns, no repeating groups)', '2NF (1NF + No partial dependency on composite PK)', '3NF (2NF + No transitive dependencies)', 'BCNF (Every determinant is candidate key)'],
    tips: 'Explain that normalization eliminates Insertion, Update, and Deletion anomalies.',
    idealAnswer: `Database Normalization Forms:
1. 1NF (First Normal Form): Each table cell contains atomic (indivisible) values, and there are no repeating groups/arrays.
2. 2NF (Second Normal Form): Table is in 1NF, and every non-key column is fully functionally dependent on the primary key (eliminates partial dependencies on composite keys).
3. 3NF (Third Normal Form): Table is in 2NF, and there are no transitive dependencies (no non-key attribute depends on another non-key attribute). Example: storing DepartmentName alongside DepartmentID in Employee table violates 3NF.
4. BCNF (Boyce-Codd Normal Form): Stricter version of 3NF where for every functional dependency X -> Y, X must be a super key.`
  },
  {
    id: 'wipro-4',
    company: 'wipro',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'easy',
    category: 'DSA - String & Anagrams',
    subject: 'dsa',
    question: 'Valid Anagram: Given two strings s and t, return true if t is an anagram of s, and false otherwise in O(N) time and O(1) auxiliary space.',
    keyConcepts: ['Character Frequency Count', '26-element array', 'O(N) Time and O(1) Space'],
    tips: 'Increment counts for string s and decrement for string t using an integer array of size 26. Check that all counts return to 0.',
    idealAnswer: `Frequency Array Approach:
1. If \`s.length !== t.length\`, return false.
2. Create \`count\` array of size 26 filled with 0.
3. For \`i\` from 0 to s.length - 1:
   - \`count[s.charCodeAt(i) - 97]++\`.
   - \`count[t.charCodeAt(i) - 97]--\`.
4. Verify every element in \`count\` is 0. If any !== 0, return false. Return true.

Complexity: Time O(N), Space O(1) (fixed 26-element array).`,
    starterCode: {
      javascript: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - 97]++;
    count[t.charCodeAt(i) - 97]--;
  }
  return count.every(x => x === 0);
}`
    }
  },
  {
    id: 'wipro-5',
    company: 'wipro',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'Operating Systems & Paging',
    subject: 'os',
    question: 'Explain Virtual Memory, Paging, Page Faults, and the Least Recently Used (LRU) Page Replacement Algorithm.',
    keyConcepts: ['Virtual Memory Pages vs Physical Frames', 'MMU Address Translation', 'Page Fault OS Interrupt', 'LRU Page Replacement', 'Belady\'s Anomaly (FIFO)'],
    tips: 'Mention that LRU does NOT suffer from Belady\'s Anomaly (where increasing page frames can increase page faults in FIFO).',
    idealAnswer: `Paging & Memory Management:
1. Paging: Divides process virtual address space into fixed-size Pages (e.g. 4KB) and physical RAM into Frames.
2. Page Fault: When a process accesses a page not loaded in RAM, CPU generates a page fault trap to the OS kernel to load the page from disk swap.
3. LRU Page Replacement: When RAM frames are full, the OS selects and evicts the page that has not been accessed for the longest duration in the past.`
  },
  {
    id: 'wipro-6',
    company: 'wipro',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'easy',
    category: 'DSA - Binary Trees',
    subject: 'dsa',
    question: 'Maximum Depth / Height of Binary Tree: Given the root of a binary tree, return its maximum depth in O(N) time.',
    keyConcepts: ['Recursion / Post-order DFS', '1 + Math.max(leftDepth, rightDepth)', 'O(N) Time and O(H) Space'],
    tips: 'Base case: If root is null, return 0. Otherwise return 1 + Math.max(maxDepth(root.left), maxDepth(root.right)).',
    idealAnswer: `Recursive Post-Order DFS:
1. If \`root === null\`, return 0.
2. \`left = maxDepth(root.left)\`.
3. \`right = maxDepth(root.right)\`.
4. Return \`1 + Math.max(left, right)\`.

Complexity: Time O(N) visiting each node, Space O(H) recursion call stack.`,
    starterCode: {
      javascript: `function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`
    }
  },
  {
    id: 'wipro-7',
    company: 'wipro',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'Web - Client vs Server Rendering',
    subject: 'system-design',
    question: 'Explain Client-Side Rendering (CSR) vs Server-Side Rendering (SSR), and Cookies vs LocalStorage.',
    keyConcepts: ['CSR (Single Page Apps, React DOM execution)', 'SSR (Server-rendered HTML, Next.js, SEO)', 'Cookies (4KB, sent with HTTP headers)', 'LocalStorage (5-10MB, persistent client storage)'],
    tips: 'Cookies are automatically attached to HTTP headers on every network request; LocalStorage stays exclusively on the browser.',
    idealAnswer: `Web Concepts:
1. CSR vs SSR:
   - CSR: Server sends bare HTML + JS bundle. Browser executes JS to build DOM. Fast transitions, but slower initial page load and poor SEO.
   - SSR: Server executes code and sends pre-rendered full HTML. Fast First Contentful Paint and excellent search engine SEO.
2. Cookies vs LocalStorage:
   - Cookies: Small (4KB), can be secured with \`HttpOnly\` and \`SameSite\` flags, automatically sent to server with every HTTP request.
   - LocalStorage: Larger (5-10MB), client-side only, persists across browser restarts until manually cleared.`
  },
  {
    id: 'wipro-8',
    company: 'wipro',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'easy',
    category: 'DSA - Math & GCD',
    subject: 'dsa',
    question: 'GCD and LCM: Calculate the Greatest Common Divisor (GCD) and Least Common Multiple (LCM) of two numbers using Euclidean Algorithm.',
    keyConcepts: ['Euclidean GCD algorithm: gcd(a, b) = b === 0 ? a : gcd(b, a % b)', 'LCM formula: (a * b) / gcd(a, b)', 'O(log(min(a, b))) Complexity'],
    tips: 'The Euclidean algorithm computes GCD in logarithmic time by repeatedly taking remainders.',
    idealAnswer: `Euclidean Algorithm:
1. GCD Function: \`gcd(a, b) = b === 0 ? a : gcd(b, a % b)\`.
2. LCM Formula: \`lcm(a, b) = (a * b) / gcd(a, b)\`.

Complexity: Time O(log(min(a, b))), Space O(1).`,
    starterCode: {
      javascript: `function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}`
    }
  },
  {
    id: 'wipro-9',
    company: 'wipro',
    role: 'software-developer',
    type: 'behavioral',
    difficulty: 'easy',
    category: 'Wipro Values - Spirit of Wipro',
    subject: 'hr',
    question: 'Where do you see yourself in 3 to 5 years, and how do you handle tight project deadlines?',
    keyConcepts: ['Career Growth Trajectory', 'Technical Leadership & Full-Stack Mastery', 'Time Management (MoSCoW Matrix)', 'Workplace Professionalism'],
    tips: 'Outline realistic technical growth (progressing from junior developer to senior/full-stack engineer leading module design) and structured prioritization.',
    idealAnswer: `Model Response:
"In 3 to 5 years, I see myself growing into a Senior Software Engineer / Module Lead at Wipro, with deep expertise in cloud architectures and enterprise software delivery. When handling tight deadlines, I break down requirements using the MoSCoW prioritization framework (Must-have vs Nice-to-have), communicate proactively with project leads, and focus on delivering robust, well-tested core functionality on time."`
  },
  {
    id: 'wipro-10',
    company: 'wipro',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'easy',
    category: 'DSA - Recursion & Dynamic Programming',
    subject: 'dsa',
    question: 'Fibonacci Number: Calculate the Nth Fibonacci number in O(N) time and O(1) space.',
    keyConcepts: ['Fibonacci recurrence F(n) = F(n-1) + F(n-2)', 'Iterative DP with 2 variables', 'O(N) Time and O(1) Space'],
    tips: 'Use two variables (prev2 and prev1) to compute Fibonacci in O(N) time without allocating an array.',
    idealAnswer: `Iterative O(1) Space DP:
1. If \`n <= 1\`, return n.
2. Initialize \`prev2 = 0, prev1 = 1\`.
3. Loop \`i\` from 2 to n:
   - \`curr = prev1 + prev2\`.
   - \`prev2 = prev1\`.
   - \`prev1 = curr\`.
4. Return \`prev1\`.

Complexity: Time O(N), Space O(1).`,
    starterCode: {
      javascript: `function fib(n) {
  if (n <= 1) return n;
  let prev2 = 0, prev1 = 1;
  for (let i = 2; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}`
    }
  },

  // ==========================================
  // 16. ACCENTURE (ASE / FSE)
  // ==========================================
  {
    id: 'acn-1',
    company: 'accenture',
    role: 'frontend-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'Modern JavaScript & ES6+',
    subject: 'oop',
    question: 'Explain JavaScript ES6 features: Arrow Functions, Promises, async/await, Destructuring, Spread/Rest operators, and Closures.',
    keyConcepts: ['Closures (Function + Lexical Scope)', 'Arrow Functions & lexical this binding', 'Promises & async/await', 'Destructuring & Spread Operator (...)'],
    tips: 'A Closure is created when an inner function retains access to variables of its outer enclosing function even after the outer function has returned.',
    idealAnswer: `Modern JavaScript Essentials:
1. Closure: An inner function that preserves access to its outer lexical scope variables even after the outer function finishes executing. Used for data privacy/encapsulation.
2. Arrow Functions: Concise syntax \`() => {}\` that binds \`this\` lexically from enclosing scope (no own \`this\` or \`arguments\`).
3. Promises & async/await: Cleaner asynchronous syntax avoiding callback hell. \`async/await\` is syntactic sugar on top of Promises for writing async code like synchronous code.
4. Spread vs Rest:
   - Spread: Expands array/object elements (\`[...arr1, ...arr2]\`).
   - Rest: Condenses multiple function arguments into an array (\`function(...args)\`).`
  },
  {
    id: 'acn-2',
    company: 'accenture',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'easy',
    category: 'DSA - String / Prefix',
    subject: 'dsa',
    question: 'Longest Common Prefix: Write a function to find the longest common prefix string amongst an array of strings in O(N * M) time.',
    keyConcepts: ['Horizontal Scanning', 'Prefix trimming with indexOf', 'O(N * M) Time and O(1) Space'],
    tips: 'Start with prefix = strs[0]. Loop through remaining strings and trim prefix using prefix = prefix.slice(0, -1) until str.indexOf(prefix) === 0.',
    idealAnswer: `Horizontal Scanning Approach:
1. If \`strs.length === 0\`, return "".
2. Let \`prefix = strs[0]\`.
3. Loop \`i\` from 1 to strs.length - 1:
   - While \`strs[i].indexOf(prefix) !== 0\`:
     - \`prefix = prefix.slice(0, prefix.length - 1)\`.
     - If \`prefix === ""\`, return "".
4. Return prefix.

Complexity: Time O(N * M) where N is number of strings and M is length of first string. Space O(1).`,
    starterCode: {
      javascript: `function longestCommonPrefix(strs) {
  if (!strs || strs.length === 0) return "";
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, prefix.length - 1);
      if (prefix === "") return "";
    }
  }
  return prefix;
}`
    }
  },
  {
    id: 'acn-3',
    company: 'accenture',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'Database - Stored Procedures & Triggers',
    subject: 'dbms',
    question: 'Explain Stored Procedures, Triggers, Views, and Indexes in relational databases with use cases.',
    keyConcepts: ['Stored Procedure (Precompiled server-side code)', 'Trigger (Automatic event listener on INSERT/UPDATE/DELETE)', 'View (Virtual table from SELECT query)', 'Index (B-Tree search acceleration)'],
    tips: 'Stored procedures reduce network traffic by executing complex multi-step queries directly on the database server.',
    idealAnswer: `Database Objects:
1. Stored Procedure: Precompiled set of SQL statements stored on database server. Executed via \`CALL procedureName()\`, reducing network round-trips and improving security against SQL injection.
2. Trigger: Special procedure that automatically executes in response to database events (BEFORE/AFTER \`INSERT\`, \`UPDATE\`, \`DELETE\`). Used for audit logging.
3. View: Virtual table defined by a SQL SELECT query; does not store duplicate data physically; provides security by hiding sensitive columns.
4. Index: B-Tree data structure that enables high-speed row lookups without scanning the entire table.`
  },
  {
    id: 'acn-4',
    company: 'accenture',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Monotonic Stack',
    subject: 'dsa',
    question: 'Next Greater Element I: Given an array of integers nums, find the next greater element for each element (the first greater element to its right, or -1 if none exists) in O(N) time.',
    keyConcepts: ['Monotonic Stack', 'Right-to-Left traversal', 'O(N) Time and Space'],
    tips: 'Traverse array from right to left with a stack. Pop all stack elements <= current element. The stack top is the next greater element.',
    idealAnswer: `Monotonic Stack (Right-to-Left):
1. Initialize \`stack = []\` and \`result = new Array(nums.length)\`.
2. Loop \`i\` from nums.length - 1 down to 0:
   - While stack is not empty and \`stack[stack.length - 1] <= nums[i]\`:
     - \`stack.pop()\`.
   - \`result[i] = stack.length === 0 ? -1 : stack[stack.length - 1]\`.
   - \`stack.push(nums[i])\`.
3. Return result.

Complexity: Time O(N), Space O(N).`,
    starterCode: {
      javascript: `function nextGreaterElements(nums) {
  const n = nums.length;
  const res = new Array(n);
  const stack = [];
  
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length > 0 && stack[stack.length - 1] <= nums[i]) {
      stack.pop();
    }
    res[i] = stack.length === 0 ? -1 : stack[stack.length - 1];
    stack.push(nums[i]);
  }
  return res;
}`
    }
  },
  {
    id: 'acn-5',
    company: 'accenture',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'Software Engineering - Agile Scrum',
    subject: 'system-design',
    question: 'Explain SDLC Models: Waterfall vs Agile Scrum, and explain Scrum Ceremonies (Sprint Planning, Daily Standup, Review, Retrospective).',
    keyConcepts: ['Waterfall (Linear Sequential)', 'Agile Scrum (Iterative Increments)', 'Sprint Ceremonies (Planning, Standup, Review, Retrospective)', 'User Stories & Story Points'],
    tips: 'Emphasize that Agile embraces changing requirements through 2-week sprint feedback cycles.',
    idealAnswer: `Agile Methodology:
1. Waterfall vs Agile:
   - Waterfall: Linear sequential phases (Requirements -> Design -> Implementation -> Testing -> Deployment). Rigid and risky for evolving requirements.
   - Agile: Iterative development delivering working software in 2-4 week sprints. Adaptable to feedback.
2. Scrum Ceremonies:
   - Sprint Planning: Team scopes user story commitments from the product backlog.
   - Daily Standup: 15-min daily sync answering: What did I do yesterday? What will I do today? Any blockers?
   - Sprint Review: Demo completed sprint features to stakeholders.
   - Sprint Retrospective: Team reviews what went well, what didn't, and action items for continuous improvement.`
  },
  {
    id: 'acn-6',
    company: 'accenture',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Matrix / BFS & DFS',
    subject: 'dsa',
    question: 'Number of Islands: Given an m x n 2D binary grid grid which represents a map of \'1\'s (land) and \'0\'s (water), return the total number of islands in O(M * N) time.',
    keyConcepts: ['DFS / BFS Grid Traversal', 'In-place sinking of land cells (\'1\' -> \'0\')', 'Connected Components in 2D grid'],
    tips: 'Traverse grid. When a \'1\' is found, increment island count and run DFS to recursively mark all horizontally/vertically connected \'1\'s as \'0\'.',
    idealAnswer: `DFS Island Sinking Approach:
1. Initialize \`count = 0\`.
2. Loop \`r\` from 0 to m - 1, loop \`c\` from 0 to n - 1:
   - If \`grid[r][c] === '1'\`:
     - \`count++\`.
     - Call \`dfs(r, c)\` which sinks all 4-directional connected '1's by setting them to '0'.
3. Return count.

Complexity: Time O(M * N), Space O(M * N) recursion stack.`,
    starterCode: {
      javascript: `function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;
  let count = 0;
  const m = grid.length, n = grid[0].length;
  
  function dfs(r, c) {
    if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] !== '1') return;
    grid[r][c] = '0'; // sink island
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }
  
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }
  return count;
}`
    }
  },
  {
    id: 'acn-7',
    company: 'accenture',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'Microservices vs Monoliths',
    subject: 'system-design',
    question: 'Compare Monolithic Architecture vs Microservices Architecture, and explain API Gateway and Load Balancers.',
    keyConcepts: ['Monolith (Single deployable archive)', 'Microservices (Decoupled, independently deployable services)', 'API Gateway (Central routing & auth entry point)', 'Load Balancer (Traffic distribution)'],
    tips: 'Microservices allow teams to deploy independently in different tech stacks, but introduce network latency and distributed data consistency challenges.',
    idealAnswer: `Architecture Principles:
1. Monolith vs Microservices:
   - Monolithic: All application components bundled into a single codebase and deployment unit. Easy to test initially, but scales poorly as team grows.
   - Microservices: Application split into small, autonomous services organized around business domains. Enables independent scaling, technology diversity, and fault isolation.
2. Infrastructure Components:
   - API Gateway: Single entry point for client requests handling routing, JWT token validation, rate limiting, and SSL termination.
   - Load Balancer: Distributes incoming network traffic evenly across server instances using algorithms like Round Robin or Least Connections.`
  },
  {
    id: 'acn-8',
    company: 'accenture',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'easy',
    category: 'DSA - Linked List',
    subject: 'dsa',
    question: 'Merge Two Sorted Lists: You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list and return its head in O(N + M) time and O(1) space.',
    keyConcepts: ['Two Pointers on Linked List', 'Dummy Head Node', 'In-place pointer manipulation', 'O(N + M) Time and O(1) Space'],
    tips: 'Use a dummy node. Compare l1.val and l2.val, attach smaller node to tail.next, and advance pointer.',
    idealAnswer: `Iterative Merge:
1. Create \`dummy = { val: 0, next: null }\` and \`tail = dummy\`.
2. While list1 !== null && list2 !== null:
   - If list1.val <= list2.val: \`tail.next = list1\`, \`list1 = list1.next\`.
   - Else: \`tail.next = list2\`, \`list2 = list2.next\`.
   - \`tail = tail.next\`.
3. \`tail.next = list1 || list2\` (attach remaining nodes).
4. Return \`dummy.next\`.

Complexity: Time O(N + M), Space O(1).`,
    starterCode: {
      javascript: `function mergeTwoLists(list1, list2) {
  const dummy = { val: 0, next: null };
  let tail = dummy;
  
  while (list1 && list2) {
    if (list1.val <= list2.val) {
      tail.next = list1;
      list1 = list1.next;
    } else {
      tail.next = list2;
      list2 = list2.next;
    }
    tail = tail.next;
  }
  tail.next = list1 || list2;
  return dummy.next;
}`
    }
  },
  {
    id: 'acn-9',
    company: 'accenture',
    role: 'software-developer',
    type: 'behavioral',
    difficulty: 'easy',
    category: 'Accenture Core Values - Inclusion & Diversity',
    subject: 'hr',
    question: 'Tell me about a time you worked successfully in a diverse, cross-functional team or resolved a team conflict.',
    keyConcepts: ['Cross-Cultural Collaboration', 'Active Listening & Empathy', 'Conflict Resolution', 'Shared Team Goals'],
    tips: 'Show how you listened actively to different perspectives, focused on objective goals, and reached a constructive compromise.',
    idealAnswer: `Model Response (STAR):
- Situation: During our university project, a teammate and I disagreed on whether to build our mobile application using Flutter or React Native.
- Task: Align on the tech stack without creating resentment or missing our sprint milestone.
- Action: I organized a structured discussion where we listed our team's existing skill sets, delivery timeline, and feature requirements. Since 3 out of 4 teammates already knew JavaScript, we objectively chose React Native to minimize ramp-up risk.
- Result: We delivered the application 3 days ahead of deadline with high collaboration and received an \'A\' grade.`
  },
  {
    id: 'acn-10',
    company: 'accenture',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'easy',
    category: 'DSA - String / Bitmask',
    subject: 'dsa',
    question: 'Check if a Sentence is a Pangram: A pangram is a sentence where every letter of the English alphabet appears at least once. Given a string sentence containing only lowercase English letters, return true if sentence is a pangram.',
    keyConcepts: ['Set Data Structure / Bitmask', '26 distinct alphabet letters', 'O(N) Time and O(1) Space'],
    tips: 'Insert characters into a Set and check if set.size === 26, or use a 32-bit integer bitmask.',
    idealAnswer: `Set Approach:
1. Add all characters of \`sentence\` into a \`Set\`.
2. Return \`new Set(sentence).size === 26\`.

Complexity: Time O(N), Space O(1) (at most 26 characters).`,
    starterCode: {
      javascript: `function checkIfPangram(sentence) {
  return new Set(sentence).size === 26;
}`
    }
  },

  // ==========================================
  // 17. COGNIZANT (GenC Next / Pro)
  // ==========================================
  {
    id: 'cts-1',
    company: 'cognizant',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'Core Java - Exception Handling',
    subject: 'oop',
    question: 'Explain final vs finally vs finalize in Java, and compare Checked Exceptions vs Unchecked Exceptions.',
    keyConcepts: ['final (Constants, Immutable methods/classes)', 'finally (Guaranteed execution block for cleanup)', 'finalize (Deprecated GC hook)', 'Checked (Compile-time IOException) vs Unchecked (Runtime NPE)'],
    tips: 'Checked exceptions inherit from Exception (excluding RuntimeException) and must be handled with try-catch or declared with throws. Unchecked inherit from RuntimeException.',
    idealAnswer: `Java Exception Handling:
1. final vs finally vs finalize:
   - \`final\`: Keyword used to declare constants, prevent method overriding, and prevent class inheritance.
   - \`finally\`: Code block that always executes after try-catch (used to close DB connections, file streams) regardless of whether an exception was thrown.
   - \`finalize\`: Deprecated method in Object class invoked by GC before reclaiming memory.
2. Checked vs Unchecked Exceptions:
   - Checked Exceptions: Checked at compile-time (e.g. \`IOException\`, \`SQLException\`). The compiler forces you to handle them via \`try-catch\` or \`throws\`.
   - Unchecked Exceptions: Occur at runtime (e.g. \`NullPointerException\`, \`ArrayIndexOutOfBoundsException\`). Caused by programming errors.`
  },
  {
    id: 'cts-2',
    company: 'cognizant',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'easy',
    category: 'DSA - Array / Two Sum',
    subject: 'dsa',
    question: 'Two Sum: Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target in O(N) time.',
    keyConcepts: ['Single Pass Hash Map', 'target - num complement', 'O(N) Time and Space'],
    tips: 'Use a Hash Map mapping value -> index. Check if target - num exists in the map in a single pass.',
    idealAnswer: `Single-Pass Hash Map:
1. Maintain \`map = new Map()\`.
2. Loop \`i\` from 0 to nums.length - 1:
   - \`comp = target - nums[i]\`.
   - If \`map.has(comp)\`: return \`[map.get(comp), i]\`.
   - \`map.set(nums[i], i)\`.
3. Return [].

Complexity: Time O(N), Space O(N).`,
    starterCode: {
      javascript: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const comp = target - nums[i];
    if (map.has(comp)) return [map.get(comp), i];
    map.set(nums[i], i);
  }
  return [];
}`
    }
  },
  {
    id: 'cts-3',
    company: 'cognizant',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'DBMS - ACID Properties & SQL Duplicates',
    subject: 'dbms',
    question: 'Explain ACID Properties in DBMS and write a SQL query to find and delete duplicate records from a table.',
    keyConcepts: ['ACID (Atomicity, Consistency, Isolation, Durability)', 'GROUP BY ... HAVING COUNT(*) > 1', 'ROW_NUMBER() OVER (PARTITION BY ...)', 'DELETE duplicate rows'],
    tips: 'Use CTE with ROW_NUMBER() partitioned by duplicate columns to delete all rows where row_num > 1.',
    idealAnswer: `ACID & Duplicate SQL:
1. ACID Properties:
   - Atomicity: All operations in a transaction succeed, or the entire transaction rolls back ("All-or-Nothing").
   - Consistency: Database moves from one valid state to another, preserving integrity constraints.
   - Isolation: Concurrent transactions do not interfere with each other.
   - Durability: Once committed, changes survive system crashes (via WAL logs).
2. SQL to Find Duplicates:
\`\`\`sql
SELECT email, COUNT(*) FROM Users GROUP BY email HAVING COUNT(*) > 1;
\`\`\`
3. SQL to Delete Duplicates (using CTE):
\`\`\`sql
WITH RankedUsers AS (
  SELECT id, ROW_NUMBER() OVER(PARTITION BY email ORDER BY id) as rn
  FROM Users
)
DELETE FROM Users WHERE id IN (SELECT id FROM RankedUsers WHERE rn > 1);
\`\`\``
  },
  {
    id: 'cts-4',
    company: 'cognizant',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Binary Search Trees',
    subject: 'dsa',
    question: 'Validate Binary Search Tree: Given the root of a binary tree, determine if it is a valid binary search tree (BST) in O(N) time.',
    keyConcepts: ['DFS Range Validation (min < val < max)', 'BST Invariance', 'O(N) Time and O(H) Space'],
    tips: 'Every node in left subtree must be < current node, and every node in right subtree must be > current node. Carry valid range (min, max) in recursive DFS.',
    idealAnswer: `DFS Range Checking:
1. Helper \`validate(node, minVal, maxVal)\`:
   - If node is null, return true.
   - If \`node.val <= minVal || node.val >= maxVal\`, return false.
   - Return \`validate(node.left, minVal, node.val) && validate(node.right, node.val, maxVal)\`.
2. Return \`validate(root, -Infinity, Infinity)\`.

Complexity: Time O(N), Space O(H).`,
    starterCode: {
      javascript: `function isValidBST(root) {
  function validate(node, min, max) {
    if (!node) return true;
    if (node.val <= min || node.val >= max) return false;
    return validate(node.left, min, node.val) && validate(node.right, node.val, max);
  }
  return validate(root, -Infinity, Infinity);
}`
    }
  },
  {
    id: 'cts-5',
    company: 'cognizant',
    role: 'frontend-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'JavaScript - DOM & Event Delegation',
    subject: 'oop',
    question: 'Explain the DOM, Event Bubbling vs Event Capturing, and how Event Delegation improves web application performance.',
    keyConcepts: ['Event Propagation Phases (Capture -> Target -> Bubble)', 'Event Bubbling (Child to Root)', 'Event Delegation (Single listener on parent)', 'event.target vs event.currentTarget'],
    tips: 'Instead of adding 1,000 click event listeners to 1,000 list items, Event Delegation attaches 1 single listener to the parent <ul> container.',
    idealAnswer: `DOM Event Propagation:
1. Event Phases:
   - Capturing Phase: Event travels down from \`window\` to target element.
   - Target Phase: Event fires on target element.
   - Bubbling Phase: Event bubbles upwards from target element back up to \`window\`.
2. Event Delegation: Technique of attaching a single event listener to a parent container to manage events for all current and dynamically created child elements via \`event.target\`. Saves memory and eliminates redundant listeners.`
  },
  {
    id: 'cts-6',
    company: 'cognizant',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'easy',
    category: 'DSA - String Rotation',
    subject: 'dsa',
    question: 'Rotate String: Given two strings s and goal, return true if and only if s can become goal after some number of shifts (e.g. s = "abcde", goal = "cdeab").',
    keyConcepts: ['String Concatenation (s + s)', 'Substring Inclusion check', 'O(N) Time and Space'],
    tips: 'If s and goal have identical length, concatenating s + s contains all possible rotated variations of s.',
    idealAnswer: `Concatenation Trick:
1. If \`s.length !== goal.length\`, return false.
2. Return \`(s + s).includes(goal)\`.

Complexity: Time O(N), Space O(N).`,
    starterCode: {
      javascript: `function rotateString(s, goal) {
  return s.length === goal.length && (s + s).includes(goal);
}`
    }
  },
  {
    id: 'cts-7',
    company: 'cognizant',
    role: 'java-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'Core Java 8+ Features',
    subject: 'oop',
    question: 'Explain Interface vs Abstract Class in Java 8+ (including default and static interface methods), and Lambda Expressions.',
    keyConcepts: ['Abstract Class (Constructors, instance fields, single inheritance)', 'Interface (Contracts, multiple inheritance, default methods in Java 8+)', 'Functional Interface (@FunctionalInterface)', 'Lambda Expressions'],
    tips: 'Java 8 added default methods to interfaces to allow adding new methods to interfaces without breaking existing implementing classes.',
    idealAnswer: `Java 8+ Interface vs Abstract Class:
1. Abstract Class: Can maintain instance state/fields and constructors. A class can extend only ONE abstract class (single inheritance).
2. Interface: Defines a behavioral contract without state fields. Supports multiple inheritance. Java 8 introduced:
   - \`default\` methods (methods with body implementation).
   - \`static\` utility methods.
3. Lambda Expressions: Concise syntax for implementing Single Abstract Method (SAM) interfaces: \`(a, b) -> a + b\`.`
  },
  {
    id: 'cts-8',
    company: 'cognizant',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Math & Binary Exponentiation',
    subject: 'dsa',
    question: 'Pow(x, n): Implement pow(x, n), which calculates x raised to the power n (i.e., x^n) in O(log N) time using Binary Exponentiation.',
    keyConcepts: ['Binary Exponentiation / Fast Power', 'Divide and conquer (x^n = (x^2)^(n/2))', 'Handling negative exponents', 'O(log N) Time Complexity'],
    tips: 'If n is even, x^n = (x*x)^(n/2). If n is odd, x^n = x * (x*x)^((n-1)/2). If n < 0, invert x = 1/x and n = -n.',
    idealAnswer: `Binary Exponentiation Algorithm:
1. If \`n === 0\`, return 1.
2. If \`n < 0\`: \`x = 1 / x\`, \`n = -n\`.
3. \`result = 1\`, \`currProd = x\`.
4. While n > 0:
   - If \`n % 2 === 1\`: \`result *= currProd\`.
   - \`currProd *= currProd\`.
   - \`n = Math.floor(n / 2)\`.
5. Return result.

Complexity: Time O(log N), Space O(1).`,
    starterCode: {
      javascript: `function myPow(x, n) {
  if (n === 0) return 1;
  let exp = n;
  if (exp < 0) {
    x = 1 / x;
    exp = -exp;
  }
  let res = 1;
  let curr = x;
  while (exp > 0) {
    if (exp % 2 === 1) res *= curr;
    curr *= curr;
    exp = Math.floor(exp / 2);
  }
  return res;
}`
    }
  },
  {
    id: 'cts-9',
    company: 'cognizant',
    role: 'software-developer',
    type: 'behavioral',
    difficulty: 'easy',
    category: 'Cognizant Culture - Agility & Learning',
    subject: 'hr',
    question: 'Tell me about a time you quickly learned a new programming framework or tool to deliver a project milestone.',
    keyConcepts: ['Continuous Learning', 'Ramp-Up Speed', 'Documentation & Prototyping', 'Execution Focus'],
    tips: 'Highlight structured learning: reading official documentation, building a prototype, and shipping working features.',
    idealAnswer: `Model Response (STAR):
- Situation: During a hackathon, our project required integrating a MongoDB database, but our team only had experience with relational SQL databases.
- Task: Learn MongoDB document modeling and Mongoose ODM within 24 hours.
- Action: I dedicated 3 hours to official MongoDB University documentation, built a small CRUD test script, designed our JSON schema with sub-documents, and connected it to our Node.js backend.
- Result: We deployed the application on time, achieved 2nd place in the hackathon, and MongoDB became one of my core technical strengths.`
  },
  {
    id: 'cts-10',
    company: 'cognizant',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'easy',
    category: 'DSA - Array / Math & XOR',
    subject: 'dsa',
    question: 'Missing Number: Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array in O(N) time and O(1) space.',
    keyConcepts: ['Gauss Sum Formula: n * (n + 1) / 2', 'Bitwise XOR approach (XOR index ^ num)', 'O(N) Time and O(1) Space'],
    tips: 'Use the XOR approach to prevent potential integer overflow: XOR all numbers from 0 to n and XOR with all elements in nums.',
    idealAnswer: `XOR Bitwise Approach:
1. Initialize \`missing = nums.length\`.
2. Loop \`i\` from 0 to nums.length - 1:
   - \`missing ^= i ^ nums[i]\`.
3. Return missing.

Complexity: Time O(N) single pass, Space O(1) constant space.`,
    starterCode: {
      javascript: `function missingNumber(nums) {
  let missing = nums.length;
  for (let i = 0; i < nums.length; i++) {
    missing ^= i ^ nums[i];
  }
  return missing;
}`
    }
  },

  // ==========================================
  // 18. HCLTECH (HCL Technologies)
  // ==========================================
  {
    id: 'hcl-1',
    company: 'hcl',
    role: 'cpp-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'Core C/C++ - Memory Segments & Pointers',
    subject: 'os',
    question: 'Explain the Memory Layout of a C/C++ Program (Text/Code, Data, BSS, Heap, Stack) and Pointer arithmetic.',
    keyConcepts: ['Text Segment (Executable instructions)', 'Data Segment (Initialized globals)', 'BSS Segment (Uninitialized globals)', 'Stack (Local variables, LIFO call frames)', 'Heap (malloc/free dynamic memory)'],
    tips: 'Stack grows downwards toward lower addresses, while Heap grows upwards toward higher addresses.',
    idealAnswer: `Memory Layout:
1. Text/Code Segment: Read-only memory segment holding compiled CPU machine instructions.
2. Data Segment: Stores initialized global and static variables.
3. BSS Segment: Stores uninitialized global and static variables (zero-initialized by OS).
4. Heap: Dynamically allocated memory via \`malloc\` / \`new\`, managed manually or by runtime.
5. Stack: Stores function call frames, parameters, and local variables. Operates in LIFO order with fast automatic push/pop.`
  },
  {
    id: 'hcl-2',
    company: 'hcl',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'easy',
    category: 'DSA - Array / Two Pointers',
    subject: 'dsa',
    question: 'Move Zeroes: Given an integer array nums, move all 0\'s to the end of it while maintaining the relative order of the non-zero elements in-place in O(N) time and O(1) space.',
    keyConcepts: ['Two Pointers', 'In-place Array Swap', 'O(N) Time and O(1) Space'],
    tips: 'Maintain nonZeroIndex pointer. Loop through array: whenever a non-zero element is seen, swap with nonZeroIndex and increment nonZeroIndex.',
    idealAnswer: `Two-Pointer In-Place Swap:
1. Initialize \`insertPos = 0\`.
2. Loop \`i\` from 0 to nums.length - 1:
   - If \`nums[i] !== 0\`:
     - Swap \`nums[insertPos]\` with \`nums[i]\`.
     - \`insertPos++\`.

Complexity: Time O(N) single pass, Space O(1) in-place.`,
    starterCode: {
      javascript: `function moveZeroes(nums) {
  let insertPos = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      const temp = nums[insertPos];
      nums[insertPos] = nums[i];
      nums[i] = temp;
      insertPos++;
    }
  }
}`
    }
  },
  {
    id: 'hcl-3',
    company: 'hcl',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'Database - DELETE vs TRUNCATE vs DROP',
    subject: 'dbms',
    question: 'Explain the difference between DELETE, TRUNCATE, and DROP SQL commands.',
    keyConcepts: ['DELETE (DML, WHERE clause, fires triggers, rollback possible)', 'TRUNCATE (DDL, reallocates pages, high speed, resets auto-increment)', 'DROP (DDL, destroys schema and data)'],
    tips: 'DELETE is row-by-row logging (slower). TRUNCATE deallocates data pages in bulk without row logging.',
    idealAnswer: `SQL Command Comparison:
1. DELETE (DML - Data Manipulation Language):
   - Deletes specific rows using a \`WHERE\` clause.
   - Logs each deleted row in transaction log; can be rolled back; fires database triggers.
2. TRUNCATE (DDL - Data Definition Language):
   - Deletes ALL rows by deallocating data page blocks in bulk.
   - Fast, resets identity/auto-increment counters, does not fire individual row triggers.
3. DROP (DDL - Data Definition Language):
   - Completely removes the entire table structure, indexes, and data from database schema.`
  },
  {
    id: 'hcl-4',
    company: 'hcl',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'easy',
    category: 'DSA - Linked List / Fast & Slow',
    subject: 'dsa',
    question: 'Middle of the Linked List: Given the head of a singly linked list, return the middle node of the linked list in a single pass in O(N) time and O(1) space.',
    keyConcepts: ['Tortoise and Hare (Fast/Slow Pointers)', 'Single Pass Traversal', 'O(1) Space'],
    tips: 'Fast pointer moves 2 steps while slow pointer moves 1 step. When fast reaches end, slow is at the middle node.',
    idealAnswer: `Fast and Slow Pointer Algorithm:
1. Initialize \`slow = head\` and \`fast = head\`.
2. While \`fast !== null && fast.next !== null\`:
   - \`slow = slow.next\`.
   - \`fast = fast.next.next\`.
3. Return \`slow\`.

Complexity: Time O(N) single pass, Space O(1).`,
    starterCode: {
      javascript: `function middleNode(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}`
    }
  },
  {
    id: 'hcl-5',
    company: 'hcl',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'Networking & OSI Model',
    subject: 'cn',
    question: 'Explain the 7 Layers of the OSI Model and the end-to-end DNS Resolution Flow when typing a URL in a browser.',
    keyConcepts: ['7 OSI Layers (Physical, Data Link, Network, Transport, Session, Presentation, Application)', 'DNS Resolution Flow (Browser Cache -> OS -> Resolver -> Root -> TLD -> Authoritative)'],
    tips: 'Remember OSI acronym: "Please Do Not Throw Sausage Pizza Away" (Physical to Application).',
    idealAnswer: `Networking Fundamentals:
1. 7 OSI Layers:
   - 1. Physical: Raw bit transmission over physical media (cables, radio waves).
   - 2. Data Link: Frame transmission via MAC addresses (Ethernet, Wi-Fi switches).
   - 3. Network: Packet routing via IP addresses (Routers).
   - 4. Transport: End-to-end connections and reliability (TCP, UDP, ports).
   - 5. Session: Establishes, manages, and terminates sessions.
   - 6. Presentation: Data format translation, encryption, and compression (SSL/TLS, JSON).
   - 7. Application: User-facing network protocols (HTTP, HTTPS, DNS, SMTP).
2. DNS Resolution Flow:
   - Browser Cache -> OS Cache -> Local ISP Recursive DNS Resolver -> Root Nameserver ('.') -> TLD Nameserver ('.com') -> Authoritative Nameserver ('google.com') -> Returns IP address to browser.`
  },
  {
    id: 'hcl-6',
    company: 'hcl',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'easy',
    category: 'DSA - Stack & String',
    subject: 'dsa',
    question: 'Remove All Adjacent Duplicates In String: Given a string s, repeatedly remove duplicate adjacent characters (e.g. "abbaca" -> "ca") in O(N) time.',
    keyConcepts: ['Stack Data Structure', 'Adjacent character cancellation', 'O(N) Time and Space'],
    tips: 'Use a stack. For each character, if it matches the stack top, pop it; otherwise push it.',
    idealAnswer: `Stack-Based Cancellation:
1. Maintain \`stack = []\`.
2. For each character \`c\` in \`s\`:
   - If \`stack.length > 0 && stack[stack.length - 1] === c\`: \`stack.pop()\`.
   - Else: \`stack.push(c)\`.
3. Return \`stack.join('')\`.

Complexity: Time O(N), Space O(N).`,
    starterCode: {
      javascript: `function removeDuplicates(s) {
  const stack = [];
  for (const c of s) {
    if (stack.length > 0 && stack[stack.length - 1] === c) {
      stack.pop();
    } else {
      stack.push(c);
    }
  }
  return stack.join('');
}`
    }
  },
  {
    id: 'hcl-7',
    company: 'hcl',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'Core Java - Multithreading Lifecycle',
    subject: 'oop',
    question: 'Explain Thread Lifecycle in Java (New, Runnable, Blocked, Waiting, Timed Waiting, Terminated) and how to create threads (Thread class vs Runnable interface).',
    keyConcepts: ['Thread Lifecycle States', 'extends Thread vs implements Runnable', 'ExecutorService & Thread Pools', 'Race Conditions & Synchronization'],
    tips: 'Prefer implementing Runnable over extending Thread because Java supports single class inheritance but multiple interface implementations.',
    idealAnswer: `Java Threading:
1. Thread States:
   - New: Thread created but not yet started (\`new Thread()\`).
   - Runnable: Ready to run, waiting for CPU scheduling or actively executing.
   - Blocked: Waiting to acquire a monitor lock.
   - Waiting: Waiting indefinitely for another thread (\`wait()\`, \`join()\`).
   - Timed Waiting: Waiting with a specified timeout (\`sleep(ms)\`, \`wait(ms)\`).
   - Terminated: Execution completed.
2. Creating Threads:
   - Extending \`Thread\` class.
   - Implementing \`Runnable\` interface (recommended for clean OOP design and thread pool reuse).`
  },
  {
    id: 'hcl-8',
    company: 'hcl',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'easy',
    category: 'DSA - Binary Search',
    subject: 'dsa',
    question: 'Search Insert Position: Given a sorted array of distinct integers and a target value, return the index if target is found. If not, return the index where it would be if it were inserted in order in O(log N) time.',
    keyConcepts: ['Binary Search (lower_bound)', 'left pointer convergence', 'O(log N) Time Complexity'],
    tips: 'Standard binary search. When loop finishes (low > high), the low pointer points precisely to the correct insertion index.',
    idealAnswer: `Binary Search Insertion:
1. Set \`low = 0, high = nums.length - 1\`.
2. While low <= high:
   - \`mid = low + Math.floor((high - low) / 2)\`.
   - If \`nums[mid] === target\`: return mid.
   - If \`nums[mid] < target\`: \`low = mid + 1\`.
   - Else: \`high = mid - 1\`.
3. Return \`low\`.

Complexity: Time O(log N), Space O(1).`,
    starterCode: {
      javascript: `function searchInsert(nums, target) {
  let low = 0, high = nums.length - 1;
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return low;
}`
    }
  },
  {
    id: 'hcl-9',
    company: 'hcl',
    role: 'software-developer',
    type: 'behavioral',
    difficulty: 'easy',
    category: 'HCLTech Culture - Ideapreneurship & Reliability',
    subject: 'hr',
    question: 'How do you handle production support responsibilities, on-call alerts, and transparent client communication during critical deliverables?',
    keyConcepts: ['Production Support Discipline', 'Incident Runbooks & Escalation', 'Client Communication', 'Root Cause Post-Mortem'],
    tips: 'Emphasize proactive updates, documented runbooks, and following structured escalation procedures.',
    idealAnswer: `Model Response:
"I handle production support with structured discipline: during incidents, I acknowledge alerts immediately, follow documented operational runbooks, and provide clear, timely status updates to client stakeholders every 30 minutes without technical jargon. After restoring service stability, I author a detailed Root Cause Analysis (RCA) document and implement automated alerts to prevent recurrence."`
  },
  {
    id: 'hcl-10',
    company: 'hcl',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'easy',
    category: 'DSA - Math & Logic',
    subject: 'dsa',
    question: 'Leap Year and Palindrome Number: Check if a given year is a Leap Year, and check if an integer is a Palindrome without converting it to a string.',
    keyConcepts: ['Leap year condition: (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)', 'Reverse integer mathematically with modulo 10', 'O(log10 N) Time and O(1) Space'],
    tips: 'For palindrome numbers, reverse digits mathematically: rev = rev * 10 + n % 10. If negative, it is never a palindrome.',
    idealAnswer: `Algorithms:
1. Leap Year:
   - \`isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)\`.
2. Palindrome Number:
   - If \`x < 0\`, return false.
   - \`original = x, rev = 0\`.
   - While x > 0: \`rev = rev * 10 + (x % 10)\`, \`x = Math.floor(x / 10)\`.
   - Return \`rev === original\`.

Complexity: Time O(log10 N), Space O(1).`,
    starterCode: {
      javascript: `function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function isPalindromeNumber(x) {
  if (x < 0) return false;
  let original = x, rev = 0;
  while (x > 0) {
    rev = rev * 10 + (x % 10);
    x = Math.floor(x / 10);
  }
  return rev === original;
}`
    }
  }
];
