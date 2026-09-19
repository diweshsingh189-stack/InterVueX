/**
 * InterVueX Dedicated Topic Question Bank
 * 8 Core CS & Interview Topics x 10 Curated Comprehensive Questions = 80 Questions
 * Topics: DSA, DBMS & SQL, Operating Systems, Computer Networks, OOP & Design Patterns, System Design, Coding Sandbox, HR / Behavioral
 */

export const TOPIC_QUESTIONS = [
  // ==========================================
  // 1. DATA STRUCTURES & ALGORITHMS (10 Questions)
  // ==========================================
  {
    id: 'topic-dsa-1',
    subject: 'dsa',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'DSA - Arrays & Hash Maps',
    question: 'Two Sum: Explain the optimal approach to find two numbers in an array that add up to a specific target value. What are the time and space complexities?',
    keyConcepts: ['Hash Map lookup', 'Complement calculation (target - current)', 'O(n) time single-pass', 'O(n) space trade-off'],
    tips: 'Mention why the brute-force nested loop O(n^2) is suboptimal and how a hash map achieves O(1) average lookup time.',
    idealAnswer: 'Use a Hash Map to store each visited number along with its index. During a single linear iteration, compute complement = target - nums[i]. If complement exists in the map, return [map.get(complement), i]; otherwise, add nums[i] to the map. Time complexity is O(n) and space complexity is O(n).'
  },
  {
    id: 'topic-dsa-2',
    subject: 'dsa',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'DSA - Stacks',
    question: 'Valid Parentheses: How do you verify whether a string containing brackets \'()\', \'{}\', \'[]\' is valid in terms of opening and closing order?',
    keyConcepts: ['LIFO Stack principle', 'Matching pairs map', 'Early exit on mismatch', 'Empty stack validation'],
    tips: 'Ensure you check that the stack is completely empty at the end, not just that mismatches did not occur during iteration.',
    idealAnswer: 'Use a Stack data structure. Iterate through each character: if it is an opening bracket, push it onto the stack. If it is a closing bracket, pop the top of the stack and check if it matches the corresponding opening bracket. If the stack is empty or types mismatch, return false. After iteration, the string is valid if the stack is completely empty. Time O(n), Space O(n).'
  },
  {
    id: 'topic-dsa-3',
    subject: 'dsa',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'DSA - Linked Lists',
    question: 'Merge Two Sorted Lists: How do you merge two sorted singly linked lists into a single continuous sorted linked list without allocating new node data?',
    keyConcepts: ['Dummy head node pointer', 'Two-pointer comparison', 'Pointer rewiring', 'O(1) auxiliary space', 'O(m + n) time'],
    tips: 'Using a dummy head node simplifies edge cases like initializing the merged head.',
    idealAnswer: 'Create a dummy head node and a current pointer initialized to it. Compare the values at list1 and list2 heads: attach the smaller node to current.next and advance that list\'s pointer. Advance current. Once one list is exhausted, attach the remaining tail of the other list directly. Return dummy.next. Time complexity is O(m + n), Auxiliary Space is O(1).'
  },
  {
    id: 'topic-dsa-4',
    subject: 'dsa',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'DSA - Dynamic Programming / Greedy',
    question: 'Best Time to Buy and Sell Stock: How do you determine the maximum single-transaction profit given an array of daily stock prices?',
    keyConcepts: ['Tracking minimum price seen so far', 'Greedy max profit comparison', 'Single pass O(n)', 'O(1) space'],
    tips: 'Explain that you cannot sell before you buy; tracking minPrice so far guarantees chronological validity.',
    idealAnswer: 'Maintain minPrice initialized to Infinity and maxProfit initialized to 0. Traverse the price array: update minPrice = min(minPrice, price) and update maxProfit = max(maxProfit, price - minPrice). Return maxProfit. Time complexity is O(n), Space complexity is O(1).'
  },
  {
    id: 'topic-dsa-5',
    subject: 'dsa',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'DSA - Dynamic Programming',
    question: 'Kadane\'s Algorithm (Maximum Subarray): How do you find the contiguous subarray with the largest sum in O(n) time?',
    keyConcepts: ['Kadane\'s algorithm', 'Local maximum vs Global maximum', 'Resetting on negative running sum', 'O(n) time', 'O(1) space'],
    tips: 'Clarify how negative numbers are handled: localMax = max(nums[i], localMax + nums[i]).',
    idealAnswer: 'Kadane\'s algorithm tracks maxCurrent and maxGlobal initialized to nums[0]. At each element nums[i], maxCurrent is updated as max(nums[i], maxCurrent + nums[i]) deciding whether to start a fresh subarray or extend the previous one. maxGlobal = max(maxGlobal, maxCurrent). Returns maxGlobal in O(n) time and O(1) auxiliary space.'
  },
  {
    id: 'topic-dsa-6',
    subject: 'dsa',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'DSA - Binary Search',
    question: 'Binary Search: Explain how Binary Search achieves O(log n) time complexity on a sorted array and how to avoid integer overflow when calculating mid.',
    keyConcepts: ['Divide and Conquer', 'Search space halving', 'mid = low + Math.floor((high - low) / 2)', 'Sorted prerequisite'],
    tips: 'Highlight that calculating mid = (low + high) / 2 can overflow 32-bit integers in languages like Java/C++.',
    idealAnswer: 'Binary search maintains two pointers (low and high). In each iteration, calculate mid = low + (high - low) / 2. If target == arr[mid], return mid; if target < arr[mid], set high = mid - 1; else set low = mid + 1. Because the search space halves every iteration, time complexity is O(log n) with O(1) space.'
  },
  {
    id: 'topic-dsa-7',
    subject: 'dsa',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'DSA - Binary Trees',
    question: 'Invert / Flip Binary Tree: How do you invert a binary tree such that left and right subtrees are swapped for every node?',
    keyConcepts: ['Recursive DFS traversal', 'Subtree pointer swapping', 'Base case null check', 'O(n) time complexity'],
    tips: 'Mention that both recursive DFS and iterative BFS queue approaches yield O(n) time and O(h) call stack memory.',
    idealAnswer: 'Base case: if root is null, return null. Swap root.left and root.right. Recursively invert root.left and invert root.right. Return root. Time complexity is O(n) where n is total nodes; Space complexity is O(h) where h is tree height due to recursion stack.'
  },
  {
    id: 'topic-dsa-8',
    subject: 'dsa',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'DSA - Advanced Design',
    question: 'LRU Cache Design: What underlying data structures enable get() and put() operations in O(1) average time with Least Recently Used eviction?',
    keyConcepts: ['Doubly Linked List (O(1) node removal & insertion)', 'Hash Map (O(1) key-to-node lookup)', 'Head/Tail dummy sentinels', 'Capacity management'],
    tips: 'Explain why a singly linked list cannot delete a node in O(1) without a previous pointer.',
    idealAnswer: 'Combine a Doubly Linked List with a Hash Map. The Hash Map stores key -> DoublyLinkedListNode for O(1) lookups. The Doubly Linked List maintains node ordering from Most Recently Used (near head) to Least Recently Used (near tail). On get() or update, remove node and insert at head in O(1). When capacity is exceeded, evict tail.prev in O(1).'
  },
  {
    id: 'topic-dsa-9',
    subject: 'dsa',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'DSA - Binary Trees',
    question: 'Lowest Common Ancestor (LCA): How do you find the lowest common ancestor of two designated nodes p and q in a Binary Tree?',
    keyConcepts: ['Post-order DFS traversal', 'Subtree search propagation', 'Base case identification', 'O(n) time complexity'],
    tips: 'If left and right recursive calls both return non-null, the current root is the LCA.',
    idealAnswer: 'Recursively traverse the tree: if current node is null, p, or q, return current node. Recurse on left and right subtrees. If both left and right return non-null, the current node is the LCA. If only one branch returns non-null, propagate that non-null node upwards. Time O(n), Space O(h).'
  },
  {
    id: 'topic-dsa-10',
    subject: 'dsa',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'DSA - Two Pointers',
    question: 'Trapping Rain Water: Given an array of elevation heights, how do you compute total water trapped after raining in O(n) time and O(1) space?',
    keyConcepts: ['Two Pointers (left, right)', 'leftMax and rightMax bounds', 'Bounded height calculation: min(leftMax, rightMax) - height[i]', 'O(1) space optimization'],
    tips: 'Explain why the lower boundary determines the trapped water at that step regardless of what lies between.',
    idealAnswer: 'Use two pointers (left at 0, right at n - 1) and two trackers (leftMax, rightMax). While left < right: if height[left] <= height[right], update leftMax = max(leftMax, height[left]) and add leftMax - height[left] to water, increment left; else update rightMax = max(rightMax, height[right]) and add rightMax - height[right] to water, decrement right. Time O(n), Space O(1).'
  },

  // ==========================================
  // 2. DBMS & SQL (10 Questions)
  // ==========================================
  {
    id: 'topic-dbms-1',
    subject: 'dbms',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'DBMS - ACID & Transactions',
    question: 'Explain the ACID properties of database transactions and the 4 standard ANSI SQL Transaction Isolation Levels.',
    keyConcepts: ['Atomicity, Consistency, Isolation, Durability', 'Read Uncommitted, Read Committed, Repeatable Read, Serializable', 'Dirty Read, Non-repeatable Read, Phantom Read'],
    tips: 'Contrast Repeatable Read (prevents modified rows from changing) with Serializable (prevents phantom insertions via range/predicate locks).',
    idealAnswer: 'ACID guarantees: Atomicity (all-or-nothing execution), Consistency (maintains schema invariants), Isolation (concurrent transactions do not interfere), Durability (committed data survives crashes via WAL). The 4 isolation levels trade throughput for consistency: Read Uncommitted (allows dirty reads), Read Committed (prevents dirty reads), Repeatable Read (prevents non-repeatable reads), and Serializable (eliminates phantom reads using range locks or MVCC/SSI).'
  },
  {
    id: 'topic-dbms-2',
    subject: 'dbms',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'DBMS - Indexing Internals',
    question: 'How do B-Tree and B+ Tree indexes work internally, and what is the exact difference between Clustered and Non-Clustered Indexes?',
    keyConcepts: ['B+ Tree leaf node linked list', 'High fan-out & shallow tree depth', 'Clustered index stores row data on leaf pages', 'Non-clustered index stores pointers to primary key'],
    tips: 'Highlight that B+ trees store actual record pointers only at leaf nodes, making internal nodes lightweight and leaf range scans sequential.',
    idealAnswer: 'B+ Trees store search keys in internal nodes and all actual data/pointers in sequentially linked leaf nodes, enabling fast range scans and shallow tree heights (logB N). A Clustered Index dictates the physical order of data on disk (only 1 per table) where leaf pages ARE the table rows. A Non-Clustered Index is a secondary structure containing index keys and pointers (row ID or primary key) back to the clustered index.'
  },
  {
    id: 'topic-dbms-3',
    subject: 'dbms',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'DBMS - Normalization',
    question: 'Explain Database Normalization forms (1NF, 2NF, 3NF, BCNF) and discuss when denormalization is preferred for read-heavy systems.',
    keyConcepts: ['1NF: Atomic values', '2NF: Elimination of partial dependencies', '3NF: Elimination of transitive dependencies', 'BCNF: Superkey determinants', 'Denormalization for read speed'],
    tips: 'Explain that 3NF reduces write anomalies and data duplication, but denormalization avoids costly multi-table joins in high-traffic analytics and reads.',
    idealAnswer: '1NF requires atomic column values and unique rows. 2NF removes partial key dependencies (non-prime attributes depend on full candidate key). 3NF removes transitive dependencies (A -> B -> C). BCNF requires that for every functional dependency X -> Y, X is a superkey. Denormalization intentionally adds redundant data to eliminate expensive JOINs in high-read architectures (e.g. data warehouses, Redis caches).'
  },
  {
    id: 'topic-dbms-4',
    subject: 'dbms',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'DBMS - Concurrency Control',
    question: 'What is the difference between Optimistic Concurrency Control (OCC) and Pessimistic Concurrency Control (PCC)? When should you use each?',
    keyConcepts: ['Pessimistic locking (SELECT FOR UPDATE)', 'Optimistic version checking (version column / CAS)', 'Lock contention overhead', 'Read vs write collision probability'],
    tips: 'Use Optimistic Locking when conflicts are rare (web e-commerce cart), and Pessimistic Locking when contention is high (banking balance transfers).',
    idealAnswer: 'Pessimistic Locking acquires exclusive locks on records up front (e.g., SELECT ... FOR UPDATE), blocking concurrent readers/writers until commit; best for high-contention writes. Optimistic Locking allows concurrent reads/writes without locking, checking at commit time if a version/timestamp column changed (e.g., UPDATE ... WHERE version = 1); best for read-heavy, low-collision workflows.'
  },
  {
    id: 'topic-dbms-5',
    subject: 'dbms',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'DBMS - Scalability & Sharding',
    question: 'How does Database Sharding work, and what are the trade-offs between Range-Based, Hash-Based, and Directory-Based Partitioning?',
    keyConcepts: ['Horizontal Sharding', 'Shard Key selection', 'Range Partitioning (hot spots)', 'Hash Partitioning (even distribution)', 'Cross-shard JOIN limitations'],
    tips: 'Emphasize that poor shard key selection causes hotspot nodes and complex distributed cross-shard transactions.',
    idealAnswer: 'Sharding horizontally partitions database rows across multiple distinct server instances. Range-Based partitions by data ranges (e.g., dates/alphabet) but risks hot spots on recent data. Hash-Based partitions using hash(shardKey) % N ensuring even distribution but complicating range queries. Sharding increases throughput but makes cross-shard JOINs and distributed transactions (2PC) complex.'
  },
  {
    id: 'topic-dbms-6',
    subject: 'dbms',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'SQL - Querying & Joins',
    question: 'Explain the difference between INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN, and CROSS JOIN in SQL.',
    keyConcepts: ['INNER: Matching keys in both tables', 'LEFT: All rows from left + matched right', 'FULL OUTER: Union of matched and unmatched', 'CROSS JOIN: Cartesian product (M * N)'],
    tips: 'Provide clear visual mental models: Venn diagram intersections and Cartesian products.',
    idealAnswer: 'INNER JOIN returns only rows with matching keys in both tables. LEFT JOIN returns all rows from the left table and matched rows from the right (or NULL). RIGHT JOIN returns all rows from the right table and matched left. FULL OUTER JOIN returns all rows from both tables, filling mismatches with NULL. CROSS JOIN produces the Cartesian product (every row in table A paired with every row in table B).'
  },
  {
    id: 'topic-dbms-7',
    subject: 'dbms',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'DBMS - Durability & Recovery',
    question: 'What is Write-Ahead Logging (WAL), and how does the ARIES recovery algorithm ensure Durability during system crashes?',
    keyConcepts: ['Append-only Write-Ahead Log', 'Dirty buffer pool flush', 'ARIES algorithm: Analysis, Redo, Undo phases', 'Checkpoints & LSN (Log Sequence Number)'],
    tips: 'WAL ensures changes are written sequentially to persistent disk log before dirty data pages are flushed asynchronously.',
    idealAnswer: 'Write-Ahead Logging (WAL) requires logging all transaction mutations to an append-only log on disk BEFORE modifying database data pages. If a crash occurs, ARIES recovers state via 3 phases: 1) Analysis: scan log forward from last checkpoint to identify active transactions. 2) Redo: replay all logged changes (committed or uncommitted) to restore exact pre-crash state. 3) Undo: roll back all uncommitted active transactions backwards.'
  },
  {
    id: 'topic-dbms-8',
    subject: 'dbms',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'Distributed DBMS - CAP & PACELC',
    question: 'Explain the CAP Theorem and the PACELC Theorem with real-world database examples (PostgreSQL vs Cassandra vs DynamoDB).',
    keyConcepts: ['Consistency, Availability, Partition Tolerance', 'PACELC: If Partition -> A/C, Else -> Latency/Consistency', 'Eventual consistency (Cassandra)', 'Strong consistency (Postgres)'],
    tips: 'Clarify that Partition Tolerance (P) is mandatory in distributed networks, so systems choose between Consistency (CP) and Availability (AP).',
    idealAnswer: 'CAP states that in a partitioned distributed network (P), you must choose either Consistency (CP - reject writes if replicas cannot be reached) or Availability (AP - accept writes with eventual consistency). PACELC extends this: if Partition (P), choose Availability (A) or Consistency (C); Else (E), choose Latency (L) or Consistency (C). E.g., MongoDB/HBase are CP/PC/EC; Cassandra/DynamoDB are AP/PA/EL.'
  },
  {
    id: 'topic-dbms-9',
    subject: 'dbms',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'DBMS - Performance & ORM',
    question: 'What is the N+1 Query Problem in ORMs (Hibernate/Prisma/Sequelize), and how do you diagnose and fix it?',
    keyConcepts: ['Initial query (1) + per-row query (N)', 'Database round-trip saturation', 'Eager loading / JOIN FETCH', 'Batch querying (WHERE id IN (...))'],
    tips: 'Show an example: querying 100 users then executing 100 individual queries for each user\'s posts.',
    idealAnswer: 'The N+1 problem occurs when an application executes 1 query to fetch N parent records, then triggers N additional queries to fetch child relationships for each record (total 1 + N queries). Fix it by using Eager Loading with JOIN FETCH (e.g. JOIN posts), Batch Fetching (WHERE user_id IN (...)), or GraphQL sub-field resolvers with DataLoader batching.'
  },
  {
    id: 'topic-dbms-10',
    subject: 'dbms',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'DBMS - Replication Topologies',
    question: 'Compare Single-Leader, Multi-Leader, and Leaderless (Quorum) database replication architectures.',
    keyConcepts: ['Single-Leader: Read replicas, failover master', 'Multi-Leader: Cross-datacenter writes, conflict resolution', 'Leaderless: Dynamo style, R + W > N quorum consensus'],
    tips: 'Mention Quorum formula R + W > N ensuring read overlap with updated replicas.',
    idealAnswer: 'Single-Leader routes all writes to 1 primary node; replicas replicate asynchronously for read scaling (simple, but single write bottleneck). Multi-Leader allows multiple master nodes (e.g., across datacenters) accepting writes, requiring conflict resolution strategies (LWW or CRDTs). Leaderless (Cassandra/Dynamo) allows client writes to any node; uses Quorum consensus (R + W > N) to guarantee reading updated data.'
  },

  // ==========================================
  // 3. OPERATING SYSTEMS (10 Questions)
  // ==========================================
  {
    id: 'topic-os-1',
    subject: 'os',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'OS - Processes & Threads',
    question: 'Explain the fundamental differences between a Process and a Thread in terms of memory layout, PCB vs TCB, and context switching overhead.',
    keyConcepts: ['Isolated address space vs Shared memory', 'PCB (Process Control Block) vs TCB (Thread Control Block)', 'Stack/Registers private per thread; Heap/Data shared', 'Context switch CPU cache & TLB invalidation'],
    tips: 'Emphasize that process context switching invalidates the CPU TLB cache and page tables, making thread switching substantially faster.',
    idealAnswer: 'A Process is an isolated execution environment with its own address space (Code, Data, Heap, Stack) managed by a PCB. A Thread is a lightweight unit of execution within a process; threads share Code, Data, Heap, and file descriptors but have private Stacks and Registers managed by TCBs. Process switching requires replacing page tables and invalidating TLB caches, incurring higher overhead than thread switching.'
  },
  {
    id: 'topic-os-2',
    subject: 'os',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'OS - Virtual Memory & Paging',
    question: 'How does Virtual Memory work? Explain Paging, Page Tables, Translation Lookaside Buffer (TLB), and the exact sequence when a Page Fault occurs.',
    keyConcepts: ['Virtual to Physical Address Translation', 'MMU (Memory Management Unit)', 'TLB hardware cache', 'Page Fault interrupt sequence: Trap, OS swap fetch from disk, Page table update, Resume instruction'],
    tips: 'Walk through the exact 6-step hardware/kernel interrupt cycle for handling a page fault.',
    idealAnswer: 'Virtual memory isolates process address spaces and allows physical memory overcommit. The MMU translates virtual addresses to physical frames using Page Tables. The TLB caches recent translations for fast 1-cycle lookup. On a Page Fault (valid page not in RAM): 1) MMU traps to OS kernel. 2) OS verifies address validity. 3) OS allocates a free physical frame (evicting via LRU if full). 4) Disk I/O reads missing page into frame. 5) Page table and TLB are updated. 6) Instruction restarts.'
  },
  {
    id: 'topic-os-3',
    subject: 'os',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'OS - CPU Scheduling',
    question: 'Compare CPU Scheduling Algorithms: Round Robin, FCFS, Shortest Job First (SJF), and Multi-Level Feedback Queue (MLFQ). What is Priority Inversion?',
    keyConcepts: ['Time Quantum in Round Robin', 'Convoy effect in FCFS', 'MLFQ adaptive priority boost', 'Priority Inversion & Priority Inheritance protocol'],
    tips: 'Explain how Mars Pathfinder bug was caused by Priority Inversion and resolved via Priority Inheritance.',
    idealAnswer: 'FCFS processes tasks sequentially (suffers from convoy effect). SJF optimizes average turnaround time but risks starvation. Round Robin assigns fixed time slices (time quantum) for fairness. MLFQ uses multiple priority queues, promoting I/O-bound jobs and penalizing CPU-heavy jobs. Priority Inversion occurs when a low-priority thread holds a lock needed by a high-priority thread, preempted by medium threads; resolved using Priority Inheritance.'
  },
  {
    id: 'topic-os-4',
    subject: 'os',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'OS - Deadlocks',
    question: 'What are the 4 Coffman conditions required for a Deadlock to occur, and how does Banker\'s Algorithm achieve Deadlock Avoidance?',
    keyConcepts: ['Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait', 'Resource Allocation Graph', 'Safe State vs Unsafe State', 'Banker\'s Algorithm'],
    tips: 'To prevent deadlocks, eliminate any ONE of the four conditions (e.g. acquire locks in globally strict hierarchical order).',
    idealAnswer: 'Deadlocks require all 4 Coffman conditions: 1) Mutual Exclusion (non-shareable resources). 2) Hold and Wait (holding resource while requesting another). 3) No Preemption (resources cannot be forcibly taken). 4) Circular Wait (cycle in resource dependency graph). Banker\'s Algorithm tests whether granting a resource request leaves the system in a "Safe State" (where a safe sequence exists to satisfy all max demands); if unsafe, request is denied.'
  },
  {
    id: 'topic-os-5',
    subject: 'os',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'OS - Inter-Process Communication',
    question: 'Compare Inter-Process Communication (IPC) mechanisms: Anonymous/Named Pipes, Shared Memory, Message Queues, Sockets, and Signals.',
    keyConcepts: ['Shared Memory: Fastest (zero-copy), requires mutexes', 'Pipes: Unidirectional byte stream', 'Sockets: Network & local (Unix domain sockets)', 'Signals: Asynchronous notifications'],
    tips: 'Highlight that Shared Memory is the fastest IPC because it avoids kernel context copying, but requires synchronization primitives.',
    idealAnswer: 'Pipes provide unidirectional FIFO byte streams between related processes. Shared Memory maps the same physical memory page into multiple processes\' address spaces, offering the fastest IPC (zero-copy) but requiring semaphores/mutexes for synchronization. Message Queues store structured messages in kernel memory. Sockets enable communication over network interfaces or local domain sockets. Signals deliver lightweight async notifications (e.g. SIGKILL, SIGINT).'
  },
  {
    id: 'topic-os-6',
    subject: 'os',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'OS - Page Replacement',
    question: 'Explain Page Replacement Algorithms: LRU (Least Recently Used), FIFO, Clock (Second Chance), and Belady\'s Anomaly.',
    keyConcepts: ['LRU page eviction', 'Bélády\'s Anomaly (FIFO faults increase with more frames)', 'Clock / Second Chance bit algorithm', 'Optimal Page Replacement (Bélády\'s MIN)'],
    tips: 'Explain that Bélády\'s anomaly occurs in FIFO because it is not a stack-based algorithm, whereas LRU is immune to it.',
    idealAnswer: 'FIFO evicts the oldest page in memory; it is susceptible to Bélády\'s Anomaly where increasing physical page frames can paradoxically increase page faults. LRU evicts the page unaccessed for the longest duration, which is optimal but expensive in hardware. The Clock / Second-Chance algorithm approximates LRU using a single reference bit in a circular buffer, clearing the bit and giving a page a second chance before eviction.'
  },
  {
    id: 'topic-os-7',
    subject: 'os',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'OS - Architecture & Kernel',
    question: 'What is the difference between User Mode and Kernel Mode? How do System Calls (syscalls) transition execution privilege?',
    keyConcepts: ['Dual-mode CPU operation (Ring 3 vs Ring 0)', 'Trap / Software interrupt', 'Syscall table dispatcher', 'Hardware protection & isolated address space'],
    tips: 'Explain that user applications cannot directly access hardware I/O; they must execute a trap instruction (e.g. syscall / int 0x80) to enter Ring 0.',
    idealAnswer: 'CPUs operate in dual modes: User Mode (Ring 3) has restricted privileges preventing direct hardware/memory access; Kernel Mode (Ring 0) has unrestricted execution access. When an app needs OS services (file read, network I/O, process fork), it executes a System Call instruction triggering a hardware trap. The CPU saves user registers, elevates privilege to Kernel Mode, executes the kernel handler, and returns via sysret.'
  },
  {
    id: 'topic-os-8',
    subject: 'os',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'OS - Synchronization & Locks',
    question: 'Compare Mutex, Binary Semaphore, Counting Semaphore, Spinlock, and Condition Variables.',
    keyConcepts: ['Mutex: Mutual exclusion with ownership', 'Semaphore: Signaling mechanism / counter', 'Spinlock: Busy-wait CPU loop for short critical sections', 'Condition variable: wait() and signal() with mutex'],
    tips: 'Emphasize that a Mutex has ownership (only the lock owner can unlock it), whereas a Semaphore can be signaled by any thread.',
    idealAnswer: 'A Mutex provides mutual exclusion with strict ownership (only the locking thread can release it). A Binary Semaphore (0 or 1) is a signaling mechanism without ownership. A Counting Semaphore manages access to a pool of N shared resources. A Spinlock uses busy-waiting (CPU polling) for ultra-short lock durations where thread sleep overhead exceeds lock hold time. Condition Variables allow threads to sleep until notified of a state change.'
  },
  {
    id: 'topic-os-9',
    subject: 'os',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'OS - File Systems',
    question: 'Explain File System architecture in Linux/Unix: Inodes, Superblocks, Directory Entries (Dentries), and Hard Links vs Symbolic (Soft) Links.',
    keyConcepts: ['Inode contains metadata, permissions, and block pointers (no filename)', 'Dentry maps filename to inode number', 'Hard link: additional dentry to same inode', 'Soft link: separate file storing path string'],
    tips: 'Deleting a file decrements the inode reference count; data blocks are freed only when link count reaches 0 and no process holds it open.',
    idealAnswer: 'Inodes store file metadata (permissions, file size, timestamps, data block pointers) but NOT the filename. Directory entries (dentries) map human-readable filenames to inode numbers. A Hard Link creates another directory entry pointing to the identical inode number (cannot cross filesystems; file persists until link count = 0). A Soft (Symbolic) Link is a distinct inode whose data block contains the target path string.'
  },
  {
    id: 'topic-os-10',
    subject: 'os',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'OS - Memory Thrashing',
    question: 'What is Thrashing in Operating Systems, what causes it, and how does the Working Set Model resolve it?',
    keyConcepts: ['Thrashing: OS spends more time swapping pages than executing code', 'Total working set size > Total physical RAM', 'Page fault frequency monitor', 'Process suspension / swap-out'],
    tips: 'Explain that when CPU utilization drops due to paging wait, the OS mistakenly attempts to spawn more processes, exacerbating thrashing.',
    idealAnswer: 'Thrashing occurs when the sum of working set sizes across all active processes exceeds physical RAM capacity, causing high-frequency page faults where the CPU spends >90% of its time swapping pages from disk rather than computing. The Working Set Model defines W(t, Δ) as pages accessed in time window Δ. The OS tracks total working set demand; if demand exceeds RAM, it suspends/swaps out whole processes until balance is restored.'
  },

  // ==========================================
  // 4. COMPUTER NETWORKS (10 Questions)
  // ==========================================
  {
    id: 'topic-cn-1',
    subject: 'cn',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'CN - OSI & TCP/IP Models',
    question: 'Explain the 7 layers of the OSI Model and how they map to the 4 layers of the TCP/IP protocol suite.',
    keyConcepts: ['Physical, Data Link, Network, Transport, Session, Presentation, Application', 'TCP/IP: Network Access, Internet (IP), Transport (TCP/UDP), Application (HTTP/DNS)', 'Encapsulation & Decapsulation (Frame, Packet, Segment, Payload)'],
    tips: 'Walk through packet encapsulation from Application data down to Ethernet physical frames.',
    idealAnswer: 'OSI 7 Layers: Physical (bits), Data Link (frames / MAC), Network (packets / IP), Transport (segments / TCP/UDP), Session (connections), Presentation (formatting/TLS), Application (HTTP/FTP/DNS). TCP/IP consolidates this into 4 layers: Network Interface (Physical+Data Link), Internet (IP), Transport (TCP/UDP), and Application (Session+Presentation+Application). During transit, data is encapsulated with headers at each layer down and decapsulated up.'
  },
  {
    id: 'topic-cn-2',
    subject: 'cn',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'CN - TCP Handshake & Teardown',
    question: 'Detail the TCP 3-Way Handshake and 4-Way Connection Teardown. Why is the TIME_WAIT state essential?',
    keyConcepts: ['SYN, SYN-ACK, ACK handshake', 'Initial Sequence Numbers (ISN)', 'FIN, ACK, FIN, ACK teardown', 'TIME_WAIT 2MSL duration to prevent old duplicate packets'],
    tips: 'Explain that TIME_WAIT (typically 2 * Maximum Segment Lifetime = 60-120s) ensures the final ACK was received by the remote server.',
    idealAnswer: '3-Way Handshake: Client sends SYN(seq=x) -> Server replies SYN(seq=y)+ACK(ack=x+1) -> Client sends ACK(ack=y+1). 4-Way Teardown: Client sends FIN -> Server sends ACK -> Server sends FIN -> Client sends ACK and enters TIME_WAIT state. TIME_WAIT lasts 2 * MSL (Maximum Segment Lifetime) to: 1) Resend final ACK if lost so server closes cleanly. 2) Allow delayed duplicate packets from the connection to expire in the network.'
  },
  {
    id: 'topic-cn-3',
    subject: 'cn',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'CN - TCP vs UDP & Congestion Control',
    question: 'Compare TCP and UDP. How does TCP guarantee reliability and manage Flow Control (Sliding Window) vs Congestion Control (Slow Start, AIMD)?',
    keyConcepts: ['TCP connection-oriented vs UDP connectionless datagram', 'Flow control: Receiver advertised window (rwnd)', 'Congestion control: cwnd, Slow Start, Congestion Avoidance (AIMD), Fast Retransmit', 'Cumulative ACKs and checksums'],
    tips: 'Distinguish Flow Control (protects slow receiver from fast sender) from Congestion Control (protects the shared network pipes from saturation).',
    idealAnswer: 'TCP is connection-oriented, reliable (in-order, retries, checksums), whereas UDP is lightweight, connectionless, and best for real-time video/gaming. Flow Control uses the Receiver Window (rwnd) to prevent overwhelming the receiver\'s buffer. Congestion Control uses the Congestion Window (cwnd): starts with Slow Start (exponential growth), transitions to AIMD (Additive Increase, Multiplicative Decrease) upon packet loss, and uses Fast Retransmit on 3 duplicate ACKs.'
  },
  {
    id: 'topic-cn-4',
    subject: 'cn',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'CN - DNS Resolution',
    question: 'Walk through the step-by-step DNS resolution process when a user navigates to a domain like \'example.com\'.',
    keyConcepts: ['Browser cache -> OS resolver -> Local DNS Resolver (ISP/8.8.8.8)', 'Root Nameservers (.) -> TLD Nameservers (.com) -> Authoritative Nameserver', 'DNS Records: A, AAAA, CNAME, MX, TXT, TTL caching'],
    tips: 'Mention that recursive resolution is done by the ISP resolver, which queries iterative root/TLD/authoritative servers.',
    idealAnswer: '1) Browser checks browser cache, OS hosts file, and OS DNS cache. 2) If missing, queries Recursive DNS Resolver (ISP/Cloudflare 1.1.1.1). 3) Recursive resolver checks cache; if miss, queries Root Nameserver (.) which refers to .com TLD server. 4) Queries TLD Nameserver which refers to Authoritative Nameserver (e.g., Route53). 5) Queries Authoritative server which returns A record (IPv4 address). 6) Resolver caches with TTL and returns IP to browser.'
  },
  {
    id: 'topic-cn-5',
    subject: 'cn',
    role: 'frontend-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'CN - HTTP Protocols Evolution',
    question: 'Compare HTTP/1.1, HTTP/2, and HTTP/3 (QUIC). How does each solve Head-of-Line (HoL) blocking and latency bottlenecks?',
    keyConcepts: ['HTTP/1.1: Pipelining, persistent connections, domain sharding', 'HTTP/2: Binary framing, multiplexed streams over 1 TCP connection, header compression (HPACK)', 'HTTP/3: QUIC over UDP, independent streams (no TCP HoL blocking), 0-RTT handshakes'],
    tips: 'Explain that HTTP/2 solved application-layer HoL blocking via streams, but TCP transport-layer packet loss still stalled all streams; HTTP/3 over UDP completely eliminated TCP HoL blocking.',
    idealAnswer: 'HTTP/1.1 introduced keep-alive persistent connections but suffered from Head-of-Line (HoL) blocking where slow requests stalled subsequent ones on a TCP socket. HTTP/2 introduced binary framing, multiplexing multiple concurrent streams over a single TCP connection, and HPACK header compression. HTTP/3 replaced TCP with QUIC over UDP: individual streams are isolated so packet loss on one stream does not stall other streams, and TLS 1.3 encryption is built-in with 0-RTT reconnects.'
  },
  {
    id: 'topic-cn-6',
    subject: 'cn',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'CN - HTTPS & TLS 1.3 Handshake',
    question: 'Explain how HTTPS encrypts traffic. Detail the TLS 1.3 Handshake, Public/Private Key Cryptography, and Certificate Authority (CA) validation.',
    keyConcepts: ['Asymmetric encryption (Key exchange) vs Symmetric encryption (Bulk payload encryption)', 'TLS 1.3 1-RTT Handshake: ClientHello + Key Share -> ServerHello + Cert -> Finished', 'Diffie-Hellman Ephemeral (PFS)', 'Digital Certificates & Chain of Trust'],
    tips: 'Explain that asymmetric encryption is only used during handshake to securely exchange a shared session key; symmetric AES-GCM is used for actual data transmission for CPU performance.',
    idealAnswer: 'HTTPS combines HTTP with TLS. In TLS 1.3 (1-RTT handshake): 1) Client sends ClientHello with supported ciphers and an Ephemeral Diffie-Hellman Key Share. 2) Server replies with ServerHello, its Key Share, Digital Certificate, and Finished message. 3) Client verifies the Certificate against Root CA certificates installed in the OS. 4) Both compute a shared symmetric session key (AES-256-GCM). All subsequent communication is encrypted symmetrically for low latency.'
  },
  {
    id: 'topic-cn-7',
    subject: 'cn',
    role: 'fullstack-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'CN - Real-Time Protocols',
    question: 'Compare WebSockets, Server-Sent Events (SSE), HTTP Long Polling, and WebRTC for real-time web communication.',
    keyConcepts: ['WebSockets: Full-duplex bidirectional TCP stream', 'SSE: Unidirectional server-to-client HTTP streaming', 'Long Polling: Hanging HTTP request', 'WebRTC: Peer-to-peer UDP audio/video/data'],
    tips: 'Choose SSE for unidirectional notifications/feeds (simple, auto-reconnect) and WebSockets for bidirectional messaging/gaming.',
    idealAnswer: 'Long Polling opens an HTTP request that hangs until new data arrives, requiring constant connection recreation. Server-Sent Events (SSE) provides unidirectional server-to-client streaming over standard HTTP with built-in auto-reconnection (ideal for live scoreboards/news feeds). WebSockets provides full-duplex, bidirectional communication over a single long-lived TCP connection (ideal for chat/gaming). WebRTC establishes peer-to-peer UDP connections for low-latency media/audio streaming.'
  },
  {
    id: 'topic-cn-8',
    subject: 'cn',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'CN - IP Addressing & Subnetting',
    question: 'Explain IPv4 Subnetting using CIDR notation (e.g., /24 vs /16), Public vs Private IP ranges (RFC 1918), and Network Address Translation (NAT).',
    keyConcepts: ['CIDR prefix mask', 'Host count formula 2^(32 - prefix) - 2', 'Private ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16', 'NAT (Network Address Translation) router port translation (PAT)'],
    tips: 'Explain that -2 in host calculations reserves the Network Address (.0) and Broadcast Address (.255).',
    idealAnswer: 'CIDR notation (e.g., 192.168.1.0/24) defines subnet size where /24 indicates 24 network bits and 8 host bits (2^8 - 2 = 254 usable IPs). RFC 1918 reserves private IP ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) for internal LANs. NAT (Network Address Translation) on routers maps thousands of private local IPs to a single public IP using unique port numbers (PAT), conserving IPv4 address space.'
  },
  {
    id: 'topic-cn-9',
    subject: 'cn',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'CN - Load Balancing & Routing',
    question: 'What is the architectural difference between Layer 4 (Transport) and Layer 7 (Application) Load Balancing? When would you use each?',
    keyConcepts: ['Layer 4: TCP/UDP port routing (high throughput, no packet inspection)', 'Layer 7: HTTP header, path, cookie routing (SSL termination, smart routing)', 'HAProxy, NGINX, AWS ALB vs NLB'],
    tips: 'L4 operates at packet level without inspecting payload (fast); L7 inspects URL path `/api/v1` and cookies to route to specific microservices.',
    idealAnswer: 'Layer 4 Load Balancers (AWS NLB, IPVS) route traffic at the TCP/UDP transport layer based on IP:Port without inspecting packet payloads; they offer extreme throughput (millions QPS) and low latency. Layer 7 Load Balancers (AWS ALB, NGINX) terminate TLS and inspect HTTP headers, cookies, and URL paths (e.g. routing `/auth` to Auth service and `/video` to Streaming service); they support sticky sessions and rate limiting at higher CPU cost.'
  },
  {
    id: 'topic-cn-10',
    subject: 'cn',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'CN - CDN Architecture',
    question: 'How do Content Delivery Networks (CDNs) deliver static and dynamic assets with sub-50ms latency using Anycast Routing and Edge Caching?',
    keyConcepts: ['BGP Anycast Routing to closest geographical PoP', 'Edge Caching & Origin shielding', 'Cache-Control headers (max-age, s-maxage, stale-while-revalidate)', 'Edge compute / Cloudflare Workers'],
    tips: 'Explain that Anycast advertises the same single IP address from hundreds of data centers globally via BGP routing.',
    idealAnswer: 'CDNs deploy Point-of-Presence (PoP) edge servers globally. Using BGP Anycast, a single IP address is announced from all PoPs, and Internet routers route the user to the topologically closest edge server. Static assets are served directly from edge SSD/RAM cache. Cache-Control headers govern freshness (s-maxage, stale-while-revalidate), while Origin Shielding aggregates cache misses to protect primary backend origins.'
  },

  // ==========================================
  // 5. OOP & DESIGN PATTERNS (10 Questions)
  // ==========================================
  {
    id: 'topic-oop-1',
    subject: 'oop',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'OOP - 4 Pillars',
    question: 'Explain the 4 Pillars of Object-Oriented Programming (Encapsulation, Abstraction, Inheritance, Polymorphism) with real-world software design examples.',
    keyConcepts: ['Encapsulation: Data hiding with getters/setters', 'Abstraction: Hiding implementation details via interfaces/abstract classes', 'Inheritance: Code reuse via parent-child classes', 'Polymorphism: Method overriding (runtime) vs overloading (compile-time)'],
    tips: 'Use clear engineering examples: PaymentGateway interface (Abstraction), BankAccount balance (Encapsulation), Vehicle -> ElectricVehicle (Inheritance), Shape.draw() (Polymorphism).',
    idealAnswer: '1) Encapsulation bundles data with methods and restricts direct field access using private modifiers and validation. 2) Abstraction exposes essential behavior while hiding complex internals (e.g. PaymentGateway interface with processPayment()). 3) Inheritance enables sub-classes to inherit state/behavior from a base class. 4) Polymorphism allows objects of different types to respond to the same method invocation (dynamic dispatch at runtime).'
  },
  {
    id: 'topic-oop-2',
    subject: 'oop',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'OOP - SOLID Principles',
    question: 'Walk through all 5 SOLID Principles with concrete violation vs refactored solution examples.',
    keyConcepts: ['Single Responsibility (one reason to change)', 'Open/Closed (open for extension, closed for modification)', 'Liskov Substitution (subtypes must honor base contracts)', 'Interface Segregation (small role interfaces)', 'Dependency Inversion (depend on abstractions)'],
    tips: 'Mention the classic Liskov violation: Square inheriting from Rectangle breaks the setWidth/setHeight contract.',
    idealAnswer: 'S: Single Responsibility - a class should have only 1 reason to change (e.g. separate InvoiceCalculator from InvoicePDFPrinter). O: Open/Closed - add new payment methods by implementing a PaymentMethod interface rather than modifying an if/else switch. L: Liskov Substitution - sub-classes must satisfy base class invariants. I: Interface Segregation - split monolithic Worker interface into Workable and Feedable. D: Dependency Inversion - high-level modules depend on abstractions, not concrete DB classes.'
  },
  {
    id: 'topic-oop-3',
    subject: 'oop',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'Design Patterns - Singleton',
    question: 'How do you design a thread-safe Singleton pattern? Compare Double-Checked Locking with the Bill Pugh Initialization-on-Demand Holder idiom.',
    keyConcepts: ['Private constructor & static instance', 'volatile keyword prevents instruction reordering', 'Double-Checked Locking synchronization block', 'Bill Pugh static inner class (lazy, thread-safe, no lock overhead)'],
    tips: 'Explain that the Bill Pugh static inner class approach leverages JVM class-loading guarantees to provide thread safety without synchronization overhead.',
    idealAnswer: 'Double-Checked Locking checks if instance is null, synchronizes on the class, and checks null again; instance MUST be volatile to prevent CPU instruction reordering. The Bill Pugh idiom uses a private static inner holder class containing the static final instance. When the outer class loads, the inner class is not loaded until getInstance() is called, providing lazy initialization with JVM-guaranteed thread safety and zero locking overhead.'
  },
  {
    id: 'topic-oop-4',
    subject: 'oop',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'Design Patterns - Factory vs Abstract Factory',
    question: 'Compare Factory Method Pattern and Abstract Factory Pattern. When should you use each in software architecture?',
    keyConcepts: ['Factory Method: Single product creation via sub-class inheritance', 'Abstract Factory: Family of related/dependent products without specifying concrete classes', 'Decoupling object creation from business logic'],
    tips: 'Use Factory Method for single items (e.g. ButtonFactory -> LinuxButton / WindowsButton) and Abstract Factory for full UI themes (GUIFactory creates Button, Checkbox, Window together).',
    idealAnswer: 'Factory Method uses inheritance and relies on a derived class method to instantiate a single product (e.g., Dialog.createButton()). Abstract Factory uses object composition to provide an interface for creating families of related or dependent objects without specifying concrete classes (e.g., UIFactory creating DarkButton + DarkCheckbox vs LightButton + LightCheckbox together, ensuring compatibility across a theme).'
  },
  {
    id: 'topic-oop-5',
    subject: 'oop',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'Design Patterns - Observer & Pub-Sub',
    question: 'Explain the Observer Pattern and contrast it with the Publish-Subscribe (Pub-Sub) Pattern. How do they handle coupling?',
    keyConcepts: ['Observer: Subject directly maintains list of Observers (in-memory, synchronous coupling)', 'Pub-Sub: Message Broker / Event Bus completely decouples Publishers from Subscribers (async, distributed)', 'Event-driven architecture'],
    tips: 'In Observer pattern, Subject knows its observers; in Pub-Sub, publishers and subscribers never know about each other, communicating solely through an event channel (Kafka/EventBus).',
    idealAnswer: 'In the Observer Pattern, a Subject directly maintains a list of observer objects and invokes notify() on them synchronously (tight in-process coupling). In the Pub-Sub Pattern, publishers emit events to an intermediary Message Broker (Kafka, Redis Pub/Sub, EventEmitter); publishers and subscribers have zero direct knowledge of each other, enabling asynchronous, distributed decoupling.'
  },
  {
    id: 'topic-oop-6',
    subject: 'oop',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'Design Patterns - Strategy vs State',
    question: 'Compare the Strategy Pattern and the State Pattern. Both have similar UML class diagrams; how do their intents differ?',
    keyConcepts: ['Strategy: Client chooses interchangeable algorithm (e.g. PaymentStrategy: Card, PayPal, Crypto)', 'State: Object dynamically alters behavior when internal state changes (e.g. OrderState: Pending, Shipped, Delivered)', 'Eliminating complex if/else switch blocks'],
    tips: 'In Strategy, the client typically configures the strategy once; in State, state objects manage transitions to the next state automatically.',
    idealAnswer: 'Strategy encapsulates interchangeable algorithms configured by the client (e.g. choosing CompressionStrategy = Zip vs Gzip, or PaymentStrategy = PayPal vs Stripe). State encapsulates state-specific behavior where the Context object appears to change its class dynamically; state objects hold references to the Context and trigger transitions to subsequent states (e.g., VendingMachine states: NoCoin -> HasCoin -> Dispensing).'
  },
  {
    id: 'topic-oop-7',
    subject: 'oop',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'Design Patterns - Decorator vs Adapter',
    question: 'What is the architectural difference between the Decorator Pattern and the Adapter Pattern?',
    keyConcepts: ['Decorator: Adds new responsibilities dynamically without modifying interface', 'Adapter: Converts incompatible interface into expected target interface', 'Wrapper patterns comparison'],
    tips: 'Adapter changes the interface to make incompatible classes work together; Decorator keeps the same interface while adding behavior.',
    idealAnswer: 'The Adapter Pattern converts an existing incompatible interface into a target interface expected by clients (e.g., wrapping a 3rd-party PaymentV1 API to fit our PaymentGateway interface). The Decorator Pattern retains the exact same interface as the wrapped component while dynamically attaching additional behavior (e.g., wrapping SimpleCoffee with MilkDecorator and SugarDecorator, or Java InputStream with BufferedInputStream).'
  },
  {
    id: 'topic-oop-8',
    subject: 'oop',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'OOP - Composition over Inheritance',
    question: 'Why is \'Composition over Inheritance\' considered a core principle in modern software design? What is the Fragile Base Class problem?',
    keyConcepts: ['Fragile Base Class problem: Parent changes break subclass assumptions', 'Tight coupling vs Loose coupling', 'HAS-A relationship flexibility vs IS-A rigidity', 'Runtime dynamic delegation'],
    tips: 'Show how changing a private helper method in a base class can silently break subclass overrides in inheritance hierarchies.',
    idealAnswer: 'Inheritance creates tight compile-time coupling (IS-A); changes to base class implementation can unintentionally break sub-classes (Fragile Base Class problem) and leads to class explosion. Composition (HAS-A) embeds helper objects inside a class and delegates tasks to them. This allows swapping behaviors at runtime, eliminates rigid hierarchies, and makes units easily mockable and testable.'
  },
  {
    id: 'topic-oop-9',
    subject: 'oop',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'OOP - Dependency Injection & IoC',
    question: 'Explain Inversion of Control (IoC) and Dependency Injection (Constructor, Setter, Interface). How does DI improve unit testability?',
    keyConcepts: ['IoC: Framework controls lifecycle rather than object creating dependencies', 'Constructor Injection vs Field Injection', 'Mocking interfaces in unit tests', 'Spring / NestJS / Dagger IoC container'],
    tips: 'Explain that injecting dependencies via constructor allows passing MockRepository in unit tests without starting a real database.',
    idealAnswer: 'Inversion of Control (IoC) inverts the flow of control: instead of an object instantiating its own dependencies (e.g., new MySQLDatabase()), dependencies are supplied by an external container. Constructor Injection is the best practice where dependencies are passed via parameters. This allows unit tests to inject mock objects (e.g. MockPaymentGateway) in isolated tests without live network/DB connections.'
  },
  {
    id: 'topic-oop-10',
    subject: 'oop',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'easy',
    category: 'Design Patterns - Builder Pattern',
    question: 'When should you use the Builder Pattern instead of telescoping constructors or setter methods? How does it enforce immutability?',
    keyConcepts: ['Telescoping constructor antipattern', 'Step-by-step fluent API construction (build())', 'Immutable object guarantees', 'Validation during construction'],
    tips: 'Setters create mutable objects that can be left in an inconsistent halfway state; Builder creates fully validated immutable objects.',
    idealAnswer: 'The Builder Pattern constructs complex objects step-by-step using a fluent method chaining API. It eliminates the Telescoping Constructor anti-pattern (constructors with 10 parameters where many are null). Unlike setter methods which leave objects temporarily inconsistent and mutable, Builder performs all validation before instantiating a private constructor with immutable (final/frozen) fields upon calling .build().'
  },

  // ==========================================
  // 6. SYSTEM DESIGN (10 Questions)
  // ==========================================
  {
    id: 'topic-sys-1',
    subject: 'system-design',
    role: 'fullstack-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'System Design - URL Shortener',
    question: 'How would you design a Scalable URL Shortener service (like TinyURL) handling 100M daily active URLs with low latency and 99.99% availability?',
    keyConcepts: ['Base62 Encoding (62^7 ~ 3.5 Trillion URLs)', 'Distributed Counter / Snowflake ID generator', 'Redis multi-tier caching (80-20 Pareto Rule)', 'Database Sharding & Read-Replicas'],
    tips: 'Estimate QPS: 100M writes/day ~ 1,200 write QPS; 10:1 read ratio ~ 12,000 read QPS. Use Base62 on unique 64-bit integer IDs.',
    idealAnswer: '1) ID Generation: Use a distributed counter (Twitter Snowflake / ZooKeeper range allocator) to generate unique 64-bit IDs, encoded into Base62 (7 characters yields 3.5 Trillion combinations). 2) Storage: NoSQL key-value store (DynamoDB / Cassandra) or sharded PostgreSQL mapping short_code -> original_url. 3) Caching: Multi-region Redis cluster caching top 20% active links serving 80% traffic with < 10ms latency. 4) HTTP 301 vs 302 redirects: Use 302 (Temporary Redirect) to track click analytics.'
  },
  {
    id: 'topic-sys-2',
    subject: 'system-design',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'System Design - Real-Time Chat',
    question: 'How would you design a Real-Time Chat Application (like WhatsApp / Slack) supporting 50M concurrent connections, 1-on-1 chats, and group messaging?',
    keyConcepts: ['WebSocket Gateway cluster', 'Redis Pub/Sub / Kafka session routing', 'Message Persistence in Cassandra / HBase', 'Offline message delivery queue & push notifications'],
    tips: 'Detail how user presence and routing is maintained across distributed WebSocket servers via a Redis User-to-Server connection registry.',
    idealAnswer: '1) Connection Management: Distributed WebSocket Gateway nodes maintain stateful TCP connections. 2) Session Registry: In-memory Redis cluster maps active userId -> gatewayServerId. 3) Message Routing: When User A sends message to User B, Gateway queries Redis for User B\'s server and forwards via internal gRPC/Kafka. 4) Offline Handling: If User B is offline, persist message to Cassandra and trigger Apple APNs / Google FCM Push Notification. 5) Group Chats: Kafka partitioned topic per group with fan-out workers.'
  },
  {
    id: 'topic-sys-3',
    subject: 'system-design',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'System Design - Rate Limiter',
    question: 'How would you design a Distributed API Rate Limiter handling 1 Million requests/sec? Compare Token Bucket, Leaky Bucket, and Sliding Window Counter.',
    keyConcepts: ['Token Bucket (handles bursts)', 'Sliding Window Counter (smooth & accurate)', 'Redis Lua Scripts for atomic execution', 'HTTP 429 Too Many Requests with Retry-After header'],
    tips: 'Explain why Redis Lua scripts are crucial: they execute check-and-decrement atomically without race conditions.',
    idealAnswer: 'Algorithms: Token Bucket adds tokens at a constant rate (allows bursts). Leaky Bucket processes at constant rate (smooths traffic). Sliding Window Counter maintains request counts in micro-windows inside a Redis Sorted Set (ZSET) or hashed counters. In a distributed setup: evaluate requests against Redis using an atomic Lua script to prevent race conditions. If limit is exceeded, return HTTP 429 with headers `X-RateLimit-Remaining` and `Retry-After`.'
  },
  {
    id: 'topic-sys-4',
    subject: 'system-design',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'System Design - Notification System',
    question: 'How would you design a multi-channel Notification System (Push, Email, SMS) with deduplication, priority queuing, and user preferences?',
    keyConcepts: ['Priority Message Queues (RabbitMQ / Kafka)', 'Idempotency & Deduplication cache (Redis)', 'Rate limiting & quiet hours', '3rd-party providers integration (Twilio, SendGrid, APNs)'],
    tips: 'Use message deduplication keys (hash of userId + eventType + window) to prevent spamming users if upstream service retries.',
    idealAnswer: '1) Ingestion: API Gateway validates events and pushes to Kafka topics partitioned by priority (High: OTP/Security, Medium: Chat, Low: Marketing). 2) Deduplication: Workers check Redis hash of `hash(userId, eventId)` with TTL to discard duplicate triggers. 3) User Preferences & Quiet Hours: Check DynamoDB user settings. 4) Delivery: Workers invoke 3rd-party gateways (APNs/FCM for push, SendGrid for email, Twilio for SMS) with exponential backoff retries.'
  },
  {
    id: 'topic-sys-5',
    subject: 'system-design',
    role: 'fullstack-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'System Design - Video Streaming',
    question: 'How would you design a Video Streaming Platform (like YouTube / Netflix) handling petabyte-scale video ingestion, transcoding, and adaptive bitrate playback?',
    keyConcepts: ['Chunked video upload to S3', 'Distributed Transcoding pipeline (HLS / DASH at 1080p, 720p, 480p)', 'CDN Edge Caching of video chunks (.ts / .m4s)', 'Adaptive Bitrate Streaming (ABR) algorithm'],
    tips: 'Explain how the client player dynamically switches video resolution based on current network bandwidth using manifest files (.m3u8).',
    idealAnswer: '1) Upload: Client uploads video in chunks to S3 via pre-signed multipart URLs. 2) Transcoding Pipeline: S3 triggers an event to message queue -> Worker cluster transcodes video into multiple bitrates (1080p, 720p, 480p, 360p) split into 2-6 second chunks using HLS/DASH protocols. 3) Manifest Generation: Master .m3u8 index file lists available streams. 4) Delivery: Global CDNs cache video chunks at edge servers. 5) Client Player: Adaptive Bitrate (ABR) algorithm monitors bandwidth and switches chunk quality smoothly.'
  },
  {
    id: 'topic-sys-6',
    subject: 'system-design',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'System Design - Cloud Storage Sync',
    question: 'How would you design a Cloud File Storage and Sync service (like Google Drive / Dropbox) supporting delta syncing, chunk deduplication, and offline conflicts?',
    keyConcepts: ['File chunking (4MB blocks) & SHA-256 hash deduplication', 'Metadata database (PostgreSQL / DynamoDB)', 'S3 Blob Storage for raw chunks', 'Synchronization protocol with vector clocks'],
    tips: 'Chunking identical file blocks across different users allows global deduplication, saving massive storage costs.',
    idealAnswer: '1) Client Chunking: Split files into 4MB chunks and compute SHA-256 hash. If hash exists in S3 (deduplication), skip uploading that block. 2) Delta Sync: Only upload modified chunks rather than full files. 3) Metadata DB: Relational DB stores directory hierarchy, permissions, and chunk lists per file version. 4) Notification Service: Long Polling / WebSockets push file change notifications to other linked devices. 5) Conflict Resolution: Use Vector Clocks / Optimistic Locking; on conflict, create conflicted copy file.'
  },
  {
    id: 'topic-sys-7',
    subject: 'system-design',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'System Design - Flash Sale',
    question: 'How would you design an E-Commerce Flash Sale / Ticketing system handling 500,000 concurrent checkout attempts in 1 minute without overselling?',
    keyConcepts: ['Redis in-memory inventory decrement (DECR / Lua script)', 'Message Queue buffering for asynchronous DB write', 'Rate Limiting & Virtual Waiting Room', 'Idempotent payment capture & stock reservation TTL'],
    tips: 'Never hit relational database directly for inventory decrement during flash sale spikes; use Redis atomic Lua script.',
    idealAnswer: '1) Traffic Shaping: CDN serves cached static product page; virtual waiting room queues incoming checkout traffic. 2) Inventory Reservation: Pre-load inventory count into Redis. Use atomic Lua script: `if redis.call("get", key) > 0 then return redis.call("decr", key) else return 0 end`. 3) Async Order Processing: Push successful reservations to Kafka; order service creates pending order with 10-minute payment TTL. 4) Failure Recovery: If payment fails or times out, release stock back into Redis.'
  },
  {
    id: 'topic-sys-8',
    subject: 'system-design',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'System Design - Distributed Key-Value Store',
    question: 'How would you design a Distributed Key-Value Store (like DynamoDB / Cassandra) achieving high availability, consistent hashing, and tunable consistency?',
    keyConcepts: ['Consistent Hashing ring with virtual nodes', 'SSTables & LSM-Trees (Log-Structured Merge-tree)', 'Gossip Protocol for node membership', 'Quorum consensus (R + W > N) & Vector Clocks'],
    tips: 'Explain how virtual nodes solve data imbalance on consistent hashing rings.',
    idealAnswer: '1) Data Partitioning: Use Consistent Hashing with virtual nodes to distribute keys uniformly and handle node join/leave with minimal key migrations. 2) Storage Engine: LSM-Tree with in-memory MemTable and immutable SSTables on disk for O(1) sequential write throughput. 3) Replication: Replicate each key to N consecutive nodes on the ring. 4) Tunable Consistency: Set R (read replicas) + W (write replicas) > N to achieve strong consistency. 5) Failure Detection: Gossip Protocol monitors node health.'
  },
  {
    id: 'topic-sys-9',
    subject: 'system-design',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'System Design - API Gateway',
    question: 'What are the core responsibilities of an Enterprise API Gateway? How does it implement Circuit Breaking and Service Discovery?',
    keyConcepts: ['Authentication / JWT verification', 'Rate Limiting & Throttling', 'Dynamic Request Routing & Service Discovery (Consul / Eureka)', 'Circuit Breaker (Closed, Open, Half-Open states)'],
    tips: 'Explain the 3 states of a Circuit Breaker: Closed (normal), Open (fast fail after error threshold), Half-Open (trial requests to test recovery).',
    idealAnswer: 'An API Gateway acts as the single entry point for client requests, handling: 1) Auth verification (validating JWT tokens once before forwarding). 2) Service Discovery: resolving microservice instance IPs dynamically via Consul/Eureka. 3) Load Balancing: distributing requests across healthy instances. 4) Circuit Breaking (Netflix Hystrix pattern): trips to OPEN state when error rate exceeds threshold to fast-fail and prevent cascade failures, transitioning to HALF-OPEN after a cool-down window.'
  },
  {
    id: 'topic-sys-10',
    subject: 'system-design',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'System Design - Web Crawler',
    question: 'How would you design a Distributed Web Crawler (like Googlebot) indexing 1 Billion web pages with politeness, deduplication, and high throughput?',
    keyConcepts: ['URL Frontier Queue (Priority queue + Politeness queue)', 'DNS Caching & Resolver pool', 'Document Fingerprinting / SimHash content deduplication', 'Robots.txt parsing & domain rate limiting'],
    tips: 'Explain that Politeness queues ensure no single host receives more than 1 request every few seconds.',
    idealAnswer: '1) URL Frontier: Maintains a Priority Queue (page rank / freshness) and Politeness Queues (one FIFO queue per host with delay timer to avoid overloading websites). 2) Fetcher: Distributed worker cluster using asynchronous I/O and dedicated local DNS caching. 3) Deduplication: Use Bloom Filters on visited URLs and SimHash / MinHash on parsed HTML content to discard duplicate or mirror pages. 4) Storage: Document storage (HBase/S3) stores raw HTML and extracted text for inverted index pipeline.'
  },

  // ==========================================
  // 7. CODING SANDBOX (10 Questions with Starter Code)
  // ==========================================
  {
    id: 'topic-code-1',
    subject: 'coding-problems',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'easy',
    category: 'Coding - Linked Lists',
    question: 'Reverse Linked List: Given the head of a singly linked list, reverse the list, and return the reversed list head.',
    keyConcepts: ['Three pointers (prev, curr, next)', 'Iterative pointer rewiring', 'O(n) time', 'O(1) space'],
    tips: 'Maintain prev pointer initialized to null. In each iteration, save curr.next, point curr.next = prev, and advance prev and curr.',
    idealAnswer: `Iterative Approach:
1. Initialize prev = null and curr = head.
2. While curr is not null:
   - Save nextTemp = curr.next
   - Point curr.next = prev
   - Advance prev = curr
   - Advance curr = nextTemp
3. Return prev (new head).
Time: O(n), Space: O(1).`,
    starterCode: {
      javascript: `function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr !== null) {
    const nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  return prev;
}`
    }
  },
  {
    id: 'topic-code-2',
    subject: 'coding-problems',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'easy',
    category: 'Coding - Strings & Hash Maps',
    question: 'Valid Anagram: Given two strings s and t, return true if t is an anagram of s (contains same characters with same frequencies), and false otherwise.',
    keyConcepts: ['Frequency counter array (size 26)', 'Single pass increment/decrement', 'O(n) time', 'O(1) auxiliary space'],
    tips: 'If string lengths differ, return false immediately.',
    idealAnswer: `Approach: Frequency Count Array
1. If s.length !== t.length, return false.
2. Initialize an integer array of size 26 with 0s.
3. Iterate through s and t: increment count for s[i], decrement count for t[i].
4. If all 26 counts are 0, return true; else false.
Time: O(n), Space: O(1) (fixed 26-element array).`,
    starterCode: {
      javascript: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - 97]++;
    count[t.charCodeAt(i) - 97]--;
  }
  return count.every(c => c === 0);
}`
    }
  },
  {
    id: 'topic-code-3',
    subject: 'coding-problems',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'Coding - Two Pointers',
    question: 'Container With Most Water: Given an integer array height where each element represents vertical lines, find two lines that together with the x-axis form a container holding the most water.',
    keyConcepts: ['Two Pointers (left, right)', 'Area = min(height[left], height[right]) * (right - left)', 'Greedy inward shift of shorter line', 'O(n) time'],
    tips: 'Always move the pointer pointing to the shorter line inward, because moving the taller line can never produce a larger area.',
    idealAnswer: `Two Pointers Approach:
1. Initialize left = 0, right = height.length - 1, maxArea = 0.
2. While left < right:
   - currentArea = Math.min(height[left], height[right]) * (right - left)
   - maxArea = Math.max(maxArea, currentArea)
   - If height[left] < height[right], left++; else right--.
3. Return maxArea.
Time: O(n), Space: O(1).`,
    starterCode: {
      javascript: `function maxArea(height) {
  let left = 0, right = height.length - 1;
  let max = 0;
  while (left < right) {
    const h = Math.min(height[left], height[right]);
    max = Math.max(max, h * (right - left));
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return max;
}`
    }
  },
  {
    id: 'topic-code-4',
    subject: 'coding-problems',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'Coding - Sliding Window',
    question: 'Longest Substring Without Repeating Characters: Given a string s, find the length of the longest substring without repeating characters.',
    keyConcepts: ['Sliding Window', 'Hash Map storing character last seen index', 'left pointer jump', 'O(n) time single pass'],
    tips: 'When a duplicate character is found, jump the left window pointer directly to map.get(char) + 1.',
    idealAnswer: `Sliding Window Approach:
1. Use a Hash Map storing char -> lastSeenIndex and left pointer = 0, maxLen = 0.
2. Iterate right from 0 to s.length - 1:
   - If s[right] in map and map.get(s[right]) >= left, set left = map.get(s[right]) + 1.
   - Update map.set(s[right], right).
   - maxLen = Math.max(maxLen, right - left + 1).
3. Return maxLen. Time O(n), Space O(min(m, n)).`,
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {
  const map = new Map();
  let left = 0, maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    if (map.has(char) && map.get(char) >= left) {
      left = map.get(char) + 1;
    }
    map.set(char, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`
    }
  },
  {
    id: 'topic-code-5',
    subject: 'coding-problems',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'Coding - Two Pointers & Sorting',
    question: '3Sum: Given an integer array nums, return all unique triplets [nums[i], nums[j], nums[k]] such that i != j != k and nums[i] + nums[j] + nums[k] == 0.',
    keyConcepts: ['Array Sorting O(n log n)', 'Fixed element + Two Pointer search', 'Duplicate skipping', 'O(n^2) time complexity'],
    tips: 'Sort array first. Skip duplicate values for both the outer loop and the two pointers to avoid duplicate triplet sets.',
    idealAnswer: `Sorting + Two Pointers:
1. Sort nums in ascending order.
2. Loop i from 0 to n - 3:
   - If i > 0 and nums[i] === nums[i - 1], continue (skip duplicate).
   - Set left = i + 1, right = n - 1.
   - While left < right:
     - sum = nums[i] + nums[left] + nums[right].
     - If sum === 0: add triplet, increment left and decrement right while skipping duplicates.
     - Else if sum < 0: left++; else right--.
Time: O(n^2), Space: O(1) (excluding result array).`,
    starterCode: {
      javascript: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1, right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        res.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  return res;
}`
    }
  },
  {
    id: 'topic-code-6',
    subject: 'coding-problems',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'Coding - Binary Search',
    question: 'Search in Rotated Sorted Array: Given a sorted array rotated at an unknown pivot, find the index of target in O(log n) time.',
    keyConcepts: ['Modified Binary Search', 'Identifying sorted half (left or right)', 'Checking target within sorted bounds', 'O(log n) time'],
    tips: 'At any pivot mid, either the left half (arr[low] <= arr[mid]) or right half (arr[mid] <= arr[high]) is guaranteed to be sorted.',
    idealAnswer: `Modified Binary Search:
1. Set low = 0, high = nums.length - 1.
2. While low <= high:
   - mid = Math.floor((low + high) / 2).
   - If nums[mid] === target, return mid.
   - If left half is sorted (nums[low] <= nums[mid]):
     - If target >= nums[low] and target < nums[mid], high = mid - 1; else low = mid + 1.
   - Else (right half is sorted):
     - If target > nums[mid] and target <= nums[high], low = mid + 1; else high = mid - 1.
3. Return -1 if not found. Time O(log n), Space O(1).`,
    starterCode: {
      javascript: `function search(nums, target) {
  let low = 0, high = nums.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (nums[mid] === target) return mid;
    if (nums[low] <= nums[mid]) {
      if (target >= nums[low] && target < nums[mid]) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    } else {
      if (target > nums[mid] && target <= nums[high]) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
  }
  return -1;
}`
    }
  },
  {
    id: 'topic-code-7',
    subject: 'coding-problems',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'easy',
    category: 'Coding - Dynamic Programming',
    question: 'Climbing Stairs: You are climbing a staircase of n steps. Each time you can climb 1 or 2 steps. In how many distinct ways can you reach the top?',
    keyConcepts: ['Fibonacci recurrence dp[i] = dp[i-1] + dp[i-2]', 'Space optimization to O(1)', 'Base cases n=1, n=2'],
    tips: 'To reach step n, you can arrive from step n-1 (1 step) or step n-2 (2 steps).',
    idealAnswer: `Fibonacci DP Approach:
- Base cases: dp[1] = 1, dp[2] = 2.
- Transition: ways(n) = ways(n - 1) + ways(n - 2).
- Optimize space by keeping only two variables prev1 and prev2.
Time: O(n), Space: O(1).`,
    starterCode: {
      javascript: `function climbStairs(n) {
  if (n <= 2) return n;
  let prev2 = 1, prev1 = 2;
  for (let i = 3; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}`
    }
  },
  {
    id: 'topic-code-8',
    subject: 'coding-problems',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'Coding - Binary Trees',
    question: 'Binary Tree Level Order Traversal: Given the root of a binary tree, return the level order traversal of its nodes\' values (level by level from left to right).',
    keyConcepts: ['BFS Queue traversal', 'Level size snapshot (queue.length)', 'Subarray per level', 'O(n) time and space'],
    tips: 'Record queue.length at the start of each level loop to process all nodes at the current depth together.',
    idealAnswer: `BFS Queue Approach:
1. If root is null, return [].
2. Initialize queue = [root], res = [].
3. While queue is not empty:
   - levelSize = queue.length, currentLevel = [].
   - Loop levelSize times: pop node = queue.shift(), push node.val to currentLevel; if node.left, push left; if node.right, push right.
   - Push currentLevel to res.
4. Return res. Time O(n), Space O(n).`,
    starterCode: {
      javascript: `function levelOrder(root) {
  if (!root) return [];
  const res = [];
  const queue = [root];
  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    res.push(currentLevel);
  }
  return res;
}`
    }
  },
  {
    id: 'topic-code-9',
    subject: 'coding-problems',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'Coding - Heap & Frequency',
    question: 'Top K Frequent Elements: Given an integer array nums and an integer k, return the k most frequent elements in O(n) or O(n log k) time.',
    keyConcepts: ['Frequency map', 'Bucket Sort (frequency as index)', 'Min-Heap approach', 'O(n) time complexity'],
    tips: 'Bucket sort using array of lists where index = frequency achieves O(n) linear time without a heap.',
    idealAnswer: `Bucket Sort Approach (O(n) Time):
1. Build frequency map of number -> count.
2. Create buckets array of length nums.length + 1 where buckets[freq] holds numbers with that frequency.
3. Iterate buckets backwards from highest frequency to lowest, accumulating elements into result array until length reaches k.
Time: O(n), Space: O(n).`,
    starterCode: {
      javascript: `function topKFrequent(nums, k) {
  const map = new Map();
  for (const num of nums) map.set(num, (map.get(num) || 0) + 1);
  
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, freq] of map.entries()) {
    buckets[freq].push(num);
  }
  
  const res = [];
  for (let i = buckets.length - 1; i >= 0 && res.length < k; i--) {
    if (buckets[i].length > 0) {
      res.push(...buckets[i]);
    }
  }
  return res.slice(0, k);
}`
    }
  },
  {
    id: 'topic-code-10',
    subject: 'coding-problems',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'Coding - Graphs / DFS',
    question: 'Number of Islands: Given an m x n 2D binary grid grid representing a map of \'1\'s (land) and \'0\'s (water), return the total number of connected islands.',
    keyConcepts: ['Grid DFS / BFS traversal', 'In-place sink / visited marking (grid[r][c] = \'0\')', '4-directional exploration', 'O(M * N) time'],
    tips: 'Mutating visited land cells directly to \'0\' avoids auxiliary visited matrix memory.',
    idealAnswer: `DFS Sinking Approach:
1. Initialize islandCount = 0.
2. Traverse each cell (r, c):
   - If grid[r][c] === '1': increment islandCount, and run dfs(r, c) to sink all connected land cells by setting grid[r][c] = '0'.
3. In dfs(r, c): if out of bounds or cell is '0', return; set cell to '0', and recurse on 4 cardinal neighbors (r+1, r-1, c+1, c-1).
Time: O(M * N), Space: O(M * N) recursion stack.`,
    starterCode: {
      javascript: `function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;
  let count = 0;
  const m = grid.length, n = grid[0].length;
  
  function dfs(r, c) {
    if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] === '0') return;
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

  // ==========================================
  // 8. HR / BEHAVIORAL (10 Questions)
  // ==========================================
  {
    id: 'topic-hr-1',
    subject: 'hr',
    role: 'software-developer',
    type: 'hr',
    difficulty: 'easy',
    category: 'HR - Introduction & Elevator Pitch',
    question: 'Tell me about yourself, your technical journey, and why you are excited about this software engineering role.',
    keyConcepts: ['Present-Past-Future framework', 'Core technical strengths & tech stack', 'Key milestone / impactful deliverable', 'Alignment with company mission'],
    tips: 'Keep it within 90-120 seconds: summarize current role, top accomplishment, and exact reasons this team is your ideal next step.',
    idealAnswer: 'Structure using the Present-Past-Future framework: 1) Present: Current engineering focus and technical stack (e.g. Full Stack/Backend development with React, Node.js, distributed systems). 2) Past: Significant milestone delivered (e.g. optimized high-scale service reducing latency by 40%). 3) Future: Why this specific engineering team and culture aligns with your long-term growth.'
  },
  {
    id: 'topic-hr-2',
    subject: 'hr',
    role: 'software-developer',
    type: 'hr',
    difficulty: 'easy',
    category: 'HR - Strengths & Growth Areas',
    question: 'What do you consider your greatest technical strength, and what is an area you are actively leveling up?',
    keyConcepts: ['Concrete strength backed by evidence', 'Constructive self-awareness', 'Actionable learning plan', 'Growth mindset'],
    tips: 'Never give fake weaknesses like "I work too hard". Share a genuine technical domain (e.g. distributed storage internals, Kubernetes) and the specific courses/projects you use to master it.',
    idealAnswer: 'Highlight a proven strength backed by a measurable outcome (e.g. deep debugging and performance profiling under pressure). Pair it with a genuine technical domain you are actively leveling up (e.g. deep distributed consensus protocols), citing specific actions like reading whitepapers, building open-source prototypes, and completing certifications.'
  },
  {
    id: 'topic-hr-3',
    subject: 'hr',
    role: 'software-developer',
    type: 'behavioral',
    difficulty: 'medium',
    category: 'Behavioral - Conflict Resolution',
    question: 'Describe a situation where you had a strong technical disagreement with a teammate or tech lead. How did you resolve it (STAR Method)?',
    keyConcepts: ['Situation: Conflicting architectural proposals', 'Task: Deliver performant solution on deadline', 'Action: Benchmark prototypes & data-driven discussion', 'Result: Consensus, respectful collaboration, and timely delivery'],
    tips: 'Demonstrate emotional maturity: focus on objective benchmarks, trade-off matrices, and aligning with the team goal rather than winning an argument.',
    idealAnswer: 'Using STAR format: Situation (teammate preferred REST while I recommended gRPC for internal low-latency microservices). Task (decide on communication protocol before sprint deadline). Action (I built a side-by-side benchmark prototype measuring payload serialization latency and throughput, presented data respectfully, and listened to teammate\'s tooling concerns). Result (team agreed on gRPC for high-throughput RPCs with REST fallback, shipping on time).'
  },
  {
    id: 'topic-hr-4',
    subject: 'hr',
    role: 'software-developer',
    type: 'behavioral',
    difficulty: 'hard',
    category: 'Behavioral - Failure & Resilience',
    question: 'Tell me about a time a production release or project failed or missed a deadline. How did you respond and prevent recurrence?',
    keyConcepts: ['Ownership without blaming others', 'Immediate mitigation / blast radius containment', 'Blameless post-mortem', 'Automated safeguards implemented (CI/CD, alerts)'],
    tips: 'Focus heavily on the lessons learned and the systemic guardrails (automated integration tests, canary deployments) you put in place.',
    idealAnswer: 'STAR format: Situation (a database migration caused connection pool exhaustion in production). Task (restore uptime and protect user data). Action (I immediately triggered an automated rollback to the previous canary version, analyzed DB query logs, identified a missing composite index, and conducted a blameless post-mortem). Result (restored service in 7 minutes and added automated migration load-testing to the CI/CD pipeline).'
  },
  {
    id: 'topic-hr-5',
    subject: 'hr',
    role: 'software-developer',
    type: 'behavioral',
    difficulty: 'medium',
    category: 'Behavioral - Prioritization & Pressure',
    question: 'How do you handle tight deadlines or sudden shifting requirements when multiple stakeholders demand competing priorities?',
    keyConcepts: ['Impact vs Effort prioritization', 'Proactive stakeholder communication', 'Scope negotiation / MVP delivery', 'Maintaining code quality under pressure'],
    tips: 'Show that you do not silently accept impossible deadlines; you communicate trade-offs clearly and negotiate an MVP milestone.',
    idealAnswer: 'I organize requirements using an Impact vs Urgency matrix, identify critical path dependencies, and schedule an alignment sync with stakeholders. I transparently present trade-offs: delivering a hardened MVP milestone with essential functionality by the deadline, while scheduling non-critical enhancements for the subsequent sprint.'
  },
  {
    id: 'topic-hr-6',
    subject: 'hr',
    role: 'software-developer',
    type: 'hr',
    difficulty: 'medium',
    category: 'HR - Career Vision & Roadmap',
    question: 'Where do you see yourself in 3 to 5 years, and how does this engineering role fit into your long-term career roadmap?',
    keyConcepts: ['Deep technical ownership & architecture', 'Mentorship & engineering culture leadership', 'Continuous learning', 'Commitment to scalable systems'],
    tips: 'Align your ambition with technical excellence: progressing from building features to designing resilient architectures and mentoring junior engineers.',
    idealAnswer: 'In 3-5 years, I aim to be a Senior Staff Technical Contributor who designs core distributed architectures, drives engineering standards, and mentors junior developers. This role offers the scale and technical challenges where I can deepen my domain expertise and deliver measurable business impact.'
  },
  {
    id: 'topic-hr-7',
    subject: 'hr',
    role: 'software-developer',
    type: 'behavioral',
    difficulty: 'hard',
    category: 'Behavioral - Problem Solving & Debugging',
    question: 'Describe a challenging bug or performance bottleneck you diagnosed and resolved end-to-end.',
    keyConcepts: ['Structured diagnostic methodology (metrics, profilers, APM)', 'Root cause identification', 'Targeted optimization', 'Verification and performance benchmark improvement'],
    tips: 'Explain the tools you used (Chrome DevTools, memory heap dumps, Datadog/Prometheus metrics, EXPLAIN ANALYZE) to isolate the root cause scientifically.',
    idealAnswer: 'STAR format: Situation (our payment service latency spiked to 4.2s under peak load). Task (diagnose and reduce latency below 200ms). Action (I inspected APM distributed traces, discovered an N+1 query pattern in an ORM relationship combined with unindexed foreign keys, rewrote the query with JOIN FETCH, and added Redis caching for static product metadata). Result (P99 response times dropped to 65ms).'
  },
  {
    id: 'topic-hr-8',
    subject: 'hr',
    role: 'software-developer',
    type: 'behavioral',
    difficulty: 'medium',
    category: 'Behavioral - Code Reviews & Collaboration',
    question: 'How do you approach giving and receiving code review feedback to maintain high code quality and positive team culture?',
    keyConcepts: ['Constructive, respectful feedback', 'Focus on code architecture & standards (not personal preference)', 'Automated linters for formatting', 'Openness to critique'],
    tips: 'Separate automated style checks (Prettier/ESLint) from human design review (security, performance, architectural edge cases).',
    idealAnswer: 'I treat code reviews as collaborative learning opportunities. For receiving feedback, I view critiques objectively as ways to improve system resilience. For giving feedback, I ensure automated linters handle formatting, focus comments on architecture, security, and edge cases, explain the "why" behind suggestions with documentation links, and praise elegant solutions.'
  },
  {
    id: 'topic-hr-9',
    subject: 'hr',
    role: 'software-developer',
    type: 'behavioral',
    difficulty: 'medium',
    category: 'Behavioral - Initiative & Continuous Learning',
    question: 'Tell me about a time you took the initiative to learn a new technology or solve an engineering problem without being asked.',
    keyConcepts: ['Proactive initiative', 'Self-directed learning', 'Proof of concept prototype', 'Measurable team benefit (developer velocity/cost savings)'],
    tips: 'Showcase curiosity and how your proactive initiative saved time, money, or developer friction for the entire team.',
    idealAnswer: 'STAR format: Situation (our team spent 45 minutes manually deploying microservices to staging environments). Task (streamline developer velocity). Action (over a weekend, I researched GitHub Actions and Docker container caching, built an automated CI/CD pipeline prototype, and demonstrated it to the team on Monday). Result (staging deployment time dropped from 45 min to 3 min, adopted across 4 teams).'
  },
  {
    id: 'topic-hr-10',
    subject: 'hr',
    role: 'software-developer',
    type: 'hr',
    difficulty: 'easy',
    category: 'HR - Company Motivation & Questions',
    question: 'Why do you want to work at our company, and what thoughtful questions do you have for the engineering team?',
    keyConcepts: ['Specific knowledge of company products and challenges', 'Cultural alignment', 'Thoughtful reverse interview questions (architecture, roadmap, team dynamics)'],
    tips: 'Always have 2-3 specific questions ready for the interviewer about system scale, engineering challenges, or team culture.',
    idealAnswer: 'Express genuine passion for the company\'s engineering scale, user impact, and technology stack. Conclude with strong questions for the interviewer: 1) "What is the most challenging architectural bottleneck your team is tackling this quarter?" 2) "How does the engineering team balance shipping new features with technical debt refactoring?"'
  }
];
