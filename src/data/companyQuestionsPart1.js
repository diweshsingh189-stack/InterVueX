/**
 * Part 1: Top Tier Product Companies (Google, Microsoft, Amazon, Meta, Netflix, Uber)
 * 6 Companies x 10 Questions = 60 Questions
 */

export const COMPANY_QUESTIONS_PART1 = [
  // ==========================================
  // 1. GOOGLE (Top Product Tier-1)
  // ==========================================
  {
    id: 'google-1',
    company: 'google',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Graph / Topological Sort',
    subject: 'dsa',
    question: 'Course Schedule II: Given numCourses and prerequisites array where prerequisites[i] = [a, b] indicates you must take course b before course a, return the ordering of courses you should take to finish all courses. If impossible due to a cycle, return an empty array.',
    keyConcepts: ['Topological Sort', 'Kahn\'s Algorithm (BFS)', 'In-degree array', 'Cycle Detection in Directed Graph', 'O(V + E) complexity'],
    tips: 'Use Kahn\'s Algorithm (BFS) with an in-degree array. If the number of processed courses in the result is less than numCourses, a directed cycle exists.',
    idealAnswer: `Approach: Kahn's Algorithm (BFS Topological Sort)
1. Build an adjacency list representation of the graph and compute the in-degree for every vertex (0 to numCourses - 1).
2. Initialize a Queue with all vertices having in-degree 0 (courses with no prerequisites).
3. Process vertices from the queue: append the current vertex to the course order result array, and decrement the in-degree of all its neighboring nodes.
4. If a neighbor's in-degree becomes 0, push it into the queue.
5. If the length of the result array equals numCourses, return the result array; otherwise return [] (cycle detected).

Complexity: Time O(V + E), Space O(V + E) where V = numCourses and E = prerequisites.length.`,
    starterCode: {
      javascript: `function findOrder(numCourses, prerequisites) {
  const inDegree = new Array(numCourses).fill(0);
  const adj = Array.from({ length: numCourses }, () => []);
  
  for (const [course, pre] of prerequisites) {
    adj[pre].push(course);
    inDegree[course]++;
  }
  
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }
  
  const order = [];
  while (queue.length > 0) {
    const curr = queue.shift();
    order.push(curr);
    for (const next of adj[curr]) {
      inDegree[next]--;
      if (inDegree[next] === 0) queue.push(next);
    }
  }
  
  return order.length === numCourses ? order : [];
}`
    }
  },
  {
    id: 'google-2',
    company: 'google',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'System Design - Distributed Search',
    subject: 'system-design',
    question: 'How would you design Google Search Typeahead Autocomplete handling 10 Billion queries per day with sub-50ms latency?',
    keyConcepts: ['Trie Data Structure', 'Prefix Hash Partitioning', 'Min-Heap Top 5 caching at Trie nodes', 'Redis caching layer', 'Offline MapReduce / Spark batch aggregations'],
    tips: 'Do not compute top 5 suggestions during live user keystroke requests. Precompute and cache the top 5 query strings at every Trie node during offline indexing.',
    idealAnswer: `System Architecture:
1. Data Structure: Trie (Prefix Tree) where each node stores the top 5-10 most frequent search terms with their historical score/frequency.
2. In-Memory Trie Sharding: Partition the Trie across distributed cache nodes based on prefix hashing (e.g., 'a'-'c' on Node 1, 'd'-'f' on Node 2) to prevent hot spots.
3. Edge Caching & CDNs: Cache popular 1-character, 2-character, and 3-character prefixes at the browser and Cloudflare/Google CDN edge nodes with a TTL of 1 hour.
4. Aggregation Pipeline: Real-time queries are logged to Kafka -> Apache Spark/Flink aggregates query counts in 15-minute tumbling windows -> updates Trie storage asynchronously.
5. Latency Optimization: Live request path hits Redis memory cache in < 10ms. If cache misses, queries Trie in memory without database disk I/O.`
  },
  {
    id: 'google-3',
    company: 'google',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'Distributed Systems & Storage',
    subject: 'system-design',
    question: 'Explain how Google Bigtable and Google File System (GFS) achieve high write throughput and fault tolerance.',
    keyConcepts: ['LSM Tree (Log-Structured Merge-tree)', 'MemTable & SSTables', 'Commit Log (WAL)', 'GFS Master and Chunkservers', 'Bloom Filters'],
    tips: 'Contrast random disk writes with sequential append-only writes in LSM Trees and explain why Bloom filters avoid disk reads for non-existent keys.',
    idealAnswer: `Bigtable & GFS Internals:
1. Write Path (O(1) sequential write): All incoming writes are appended to an immutable Commit Log (WAL) on GFS for durability, then written to an in-memory sorted data structure called MemTable (SkipList/Red-Black Tree). Writes are acknowledged immediately without waiting for disk seeks.
2. Flush to SSTable: When the MemTable exceeds a threshold (e.g., 64MB), it is flushed to GFS as an immutable sorted SSTable file.
3. Compaction: Minor compactions merge small SSTables into larger ones. Major compactions eliminate deleted keys (tombstones) and produce consolidated SSTables.
4. Read Optimization: Bigtable uses Bloom Filters in memory to quickly check if a key definitely does NOT exist in an SSTable, skipping unnecessary disk I/O.`
  },
  {
    id: 'google-4',
    company: 'google',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'hard',
    category: 'DSA - Dynamic Programming / String',
    subject: 'dsa',
    question: 'Edit Distance (Levenshtein Distance): Given two strings word1 and word2, return the minimum number of operations (insert, delete, replace a character) required to convert word1 to word2.',
    keyConcepts: ['2D Dynamic Programming', 'State transition', 'String manipulation', 'Space optimization to O(min(M, N))'],
    tips: 'Define dp[i][j] as the edit distance between word1[0...i-1] and word2[0...j-1]. When characters match, dp[i][j] = dp[i-1][j-1].',
    idealAnswer: `DP Recurrence Relation:
Let dp[i][j] be the minimum operations to convert word1[0...i-1] to word2[0...j-1].
- Base cases: dp[i][0] = i (delete i chars), dp[0][j] = j (insert j chars).
- Transition:
  If word1[i-1] === word2[j-1]:
    dp[i][j] = dp[i-1][j-1]
  Else:
    dp[i][j] = 1 + min(
      dp[i-1][j],    // Delete from word1
      dp[i][j-1],    // Insert into word1
      dp[i-1][j-1]   // Replace character
    )

Time Complexity: O(M * N) where M = word1.length, N = word2.length.
Space Complexity: O(M * N), optimizable to O(N) using two rows.`,
    starterCode: {
      javascript: `function minDistance(word1, word2) {
  const m = word1.length, n = word2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }
  return dp[m][n];
}`
    }
  },
  {
    id: 'google-5',
    company: 'google',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'hard',
    category: 'DSA - Binary Trees',
    subject: 'dsa',
    question: 'Binary Tree Maximum Path Sum: A path in a binary tree is a sequence of nodes where each pair of adjacent nodes has an edge connecting them. A node can only appear at most once. Find the maximum path sum of any non-empty path.',
    keyConcepts: ['Post-order DFS', 'Subtree max gain', 'Global maximum tracker', 'Handling negative values with Math.max(0, gain)'],
    tips: 'For any node, the maximum path passing through it as a turning point is node.val + leftMax + rightMax. But the gain returned to the parent can only include ONE branch (node.val + max(leftMax, rightMax)).',
    idealAnswer: `Algorithm:
1. Initialize a global variable maxSum = -Infinity.
2. Define a recursive helper function maxGain(node):
   - Base case: If node is null, return 0.
   - Recursively compute leftGain = Math.max(0, maxGain(node.left)) and rightGain = Math.max(0, maxGain(node.right)). (Ignoring negative paths by taking max with 0).
   - Compute current path sum passing through node: currentPath = node.val + leftGain + rightGain.
   - Update global maximum: maxSum = Math.max(maxSum, currentPath).
   - Return node.val + Math.max(leftGain, rightGain) to its parent.
3. Call maxGain(root) and return maxSum.

Time Complexity: O(N) where N is number of nodes. Space Complexity: O(H) recursion stack height.`,
    starterCode: {
      javascript: `function maxPathSum(root) {
  let maxSum = -Infinity;
  
  function maxGain(node) {
    if (!node) return 0;
    const left = Math.max(0, maxGain(node.left));
    const right = Math.max(0, maxGain(node.right));
    
    maxSum = Math.max(maxSum, node.val + left + right);
    return node.val + Math.max(left, right);
  }
  
  maxGain(root);
  return maxSum;
}`
    }
  },
  {
    id: 'google-6',
    company: 'google',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'Distributed Systems & Consensus',
    subject: 'system-design',
    question: 'Explain how Google Spanner achieves globally distributed transactions with External Consistency (Serializability) using TrueTime API.',
    keyConcepts: ['TrueTime API', 'GPS and Atomic Clocks', 'Time Uncertainty Window [earliest, latest]', 'Commit-Wait Rule', '2-Phase Commit (2PC) + Multi-Paxos'],
    tips: 'Emphasize why standard NTP clocks drift too much for distributed transaction serialization, and how TrueTime bounds time uncertainty to under 7ms.',
    idealAnswer: `Google Spanner & TrueTime:
1. The Core Problem: In distributed databases across continents, unsynchronized server clocks can violate causality (Transaction B committed after Transaction A in real time might receive an earlier timestamp).
2. TrueTime Architecture: TrueTime uses atomic clocks and GPS receivers in every Google datacenter to bound clock skew. TrueTime API returns tt.now() as a time interval [earliest, latest] with guaranteed uncertainty ε <= 7ms.
3. Commit-Wait Rule: When transaction T commits with timestamp s, the leader waits until tt.now().earliest > s before releasing locks and making data visible. This guarantees that any subsequent transaction T2 will strictly receive timestamp s2 > s.
4. Consensus: Uses Multi-Paxos per shard for replication and 2-Phase Commit across shards for distributed ACID transactions.`
  },
  {
    id: 'google-7',
    company: 'google',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Sliding Window & Hash Map',
    subject: 'dsa',
    question: 'Longest Substring with At Most K Distinct Characters: Given a string s and an integer k, return the length of the longest substring of s that contains at most k distinct characters.',
    keyConcepts: ['Sliding Window', 'Character Frequency Hash Map', 'Two Pointers (left, right)', 'O(N) Time Complexity'],
    tips: 'Maintain a frequency map for the current window [left...right]. If map.size > k, increment left pointer and decrement character counts until map.size <= k.',
    idealAnswer: `Sliding Window Approach:
1. If k === 0 or s.length === 0, return 0.
2. Maintain a hash map charMap of character frequencies in the current window [left, right], and maxLength = 0.
3. Iterate right pointer from 0 to s.length - 1:
   - Add s[right] to charMap.
   - While charMap.size > k:
     - Decrement frequency of s[left].
     - If frequency drops to 0, delete s[left] from charMap.
     - Advance left pointer.
   - Update maxLength = Math.max(maxLength, right - left + 1).
4. Return maxLength.

Complexity: Time O(N) since each character is visited at most twice. Space O(K) for character map.`,
    starterCode: {
      javascript: `function lengthOfLongestSubstringKDistinct(s, k) {
  if (k === 0 || !s) return 0;
  const map = new Map();
  let left = 0, maxLen = 0;
  
  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    map.set(char, (map.get(char) || 0) + 1);
    
    while (map.size > k) {
      const leftChar = s[left];
      map.set(leftChar, map.get(leftChar) - 1);
      if (map.get(leftChar) === 0) map.delete(leftChar);
      left++;
    }
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`
    }
  },
  {
    id: 'google-8',
    company: 'google',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'Computer Networks',
    subject: 'cn',
    question: 'How does HTTP/3 (QUIC protocol over UDP) resolve TCP Head-of-Line (HoL) blocking and speed up mobile connection handoffs?',
    keyConcepts: ['QUIC over UDP', 'Head-of-Line (HoL) Blocking', 'Independent Byte Streams', 'Connection ID vs 4-Tuple IP:Port', '0-RTT Connection Resumption'],
    tips: 'Explain that HTTP/2 multiplexes streams over a SINGLE TCP stream, so one lost packet pauses all streams. HTTP/3 gives each stream its own independent flow control.',
    idealAnswer: `HTTP/3 & QUIC Advantages:
1. Eliminates Head-of-Line (HoL) Blocking: In HTTP/2 over TCP, if a single packet is dropped, the TCP stack pauses all multiplexed streams until the missing packet is retransmitted. QUIC runs over UDP and handles packet loss on a per-stream basis; loss in Stream A does not stall Stream B.
2. Fast Connection Setup (0-RTT / 1-RTT): Combines transport handshake and TLS 1.3 cryptographic handshake into a single round-trip, or zero round-trips for repeat connections.
3. Connection Migration: QUIC identifies connections by a 64-bit Connection ID rather than the traditional 4-tuple (Client IP, Client Port, Server IP, Server Port). When a smartphone switches from Wi-Fi to 5G cellular data, the connection continues seamlessly without renegotiating TLS.`
  },
  {
    id: 'google-9',
    company: 'google',
    role: 'software-developer',
    type: 'behavioral',
    difficulty: 'medium',
    category: 'Googleyness & Leadership',
    subject: 'hr',
    question: 'Tell me about a time you worked on a project with ambiguous or changing requirements. How did you define success and navigate the uncertainty?',
    keyConcepts: ['Googleyness', 'Dealing with Ambiguity', 'Data-Driven Validation', 'Stakeholder Alignment', 'Iterative Prototyping'],
    tips: 'Use the STAR format (Situation, Task, Action, Result). Show how you took initiative to interview stakeholders, create technical prototypes, and establish verifiable metrics.',
    idealAnswer: `Model Response (STAR):
- Situation: During my previous team project, our leadership wanted to introduce an automated anomaly detection system for payment failures, but lacked concrete business specifications on alerting thresholds and false-positive tolerance.
- Task: As the lead engineer, I had to clarify the problem space, define engineering requirements, and deliver a reliable service without disrupting live operations.
- Action: I scheduled syncs with product managers and site reliability engineers to map out critical SLAs. I conducted exploratory data analysis on 6 months of historical payment telemetry, identified 3 primary error clusters, and built an MVP with configurable percentile thresholds behind a dark-launch feature flag.
- Result: We achieved 94% precision in catching payment regressions with zero false alarms during peak traffic, saving an estimated $120K in avoided downtime, and my requirement specification document became the team's standard template.`
  },
  {
    id: 'google-10',
    company: 'google',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Trees / BFS',
    subject: 'dsa',
    question: 'Binary Tree Right Side View: Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.',
    keyConcepts: ['Level Order Traversal (BFS)', 'Queue-based BFS', 'Last element of each level', 'O(N) Time Complexity'],
    tips: 'At each BFS level, the last node processed in the current level loop is the rightmost visible node.',
    idealAnswer: `BFS Level-Order Approach:
1. If root is null, return empty array [].
2. Initialize a Queue with [root] and a result array rightView = [].
3. While queue is not empty:
   - Determine levelSize = queue.length.
   - Iterate i from 0 to levelSize - 1:
     - Dequeue curr node.
     - If i === levelSize - 1, push curr.val to rightView (rightmost node).
     - Enqueue curr.left if exists, then curr.right if exists.
4. Return rightView.

Time Complexity: O(N) visiting every node once. Space Complexity: O(D) where D is maximum tree diameter (O(N) in worst case).`,
    starterCode: {
      javascript: `function rightSideView(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];
  
  while (queue.length > 0) {
    const levelSize = queue.length;
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      if (i === levelSize - 1) result.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return result;
}`
    }
  },

  // ==========================================
  // 2. MICROSOFT (Top Product Tier-1)
  // ==========================================
  {
    id: 'ms-1',
    company: 'microsoft',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Design & Linked List',
    subject: 'dsa',
    question: 'Design LRU Cache: Implement an LRU (Least Recently Used) Cache class with get(key) and put(key, value) operations running in O(1) average time complexity.',
    keyConcepts: ['Hash Map + Doubly Linked List', 'Dummy Head and Tail nodes', 'O(1) Get and Put', 'Eviction Policy'],
    tips: 'Use a Hash Map mapping key -> Node, and a Doubly Linked List where most recently used nodes are placed near the head, and least recently used are evicted from the tail.',
    idealAnswer: `LRU Cache Design:
1. Data Structure: Hash Map (Map<key, Node>) + Doubly Linked List with dummy head and dummy tail pointers.
2. Node Structure: { key, value, prev, next }.
3. get(key): If key is not in map, return -1. Otherwise, fetch node from map, remove it from its current position in the linked list, insert it right after dummy head, and return node.value.
4. put(key, value):
   - If key already exists, update its value, remove node, and move to head.
   - If key is new: create node, add to map, insert after head. If size > capacity, remove least recently used node (dummyTail.prev) from both the linked list and the map.

Time Complexity: O(1) strictly for both get and put. Space Complexity: O(capacity).`,
    starterCode: {
      javascript: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
    this.head = { key: 0, val: 0, prev: null, next: null };
    this.tail = { key: 0, val: 0, prev: null, next: null };
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
  
  _remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }
  
  _add(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    const node = this.map.get(key);
    this._remove(node);
    this._add(node);
    return node.val;
  }

  put(key, value) {
    if (this.map.has(key)) {
      this._remove(this.map.get(key));
    }
    const node = { key, val: value, prev: null, next: null };
    this._add(node);
    this.map.set(key, node);
    if (this.map.size > this.capacity) {
      const lru = this.tail.prev;
      this._remove(lru);
      this.map.delete(lru.key);
    }
  }
}`
    }
  },
  {
    id: 'ms-2',
    company: 'microsoft',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'System Design - Real-Time Chat',
    subject: 'system-design',
    question: 'How would you design Microsoft Teams / Skype Real-Time Chat and User Presence system for 300 Million monthly active users?',
    keyConcepts: ['WebSocket Gateway', 'Redis Pub/Sub', 'Cassandra for Chat History', 'Heartbeat-based Presence Engine', 'Ephemeral State vs Persistent Storage'],
    tips: 'Separate the ephemeral real-time presence/delivery service (in-memory Redis cluster with TTL heartbeats) from the persistent message storage service (Cassandra/Cosmos DB).',
    idealAnswer: `Microsoft Teams System Architecture:
1. Connection Gateway: Fleet of WebSocket servers maintaining persistent duplex TCP connections with active client apps. Load-balanced with sticky sessions / consistent hashing.
2. Message Delivery Flow: User A sends message -> Gateway authenticates and assigns monotonic message ID -> Publishes to Kafka topic -> Message Persister writes to Cassandra cluster -> In-memory Redis Pub/Sub delivers payload to User B's connected Gateway server.
3. User Presence Engine (Online/Away/Offline):
   - Client sends heartbeat ping every 30 seconds to Gateway.
   - Gateway sets Redis key 'presence:{userId}' = 'ONLINE' with TTL = 60 seconds.
   - When users query contact status, fetch presence from Redis cache cluster; expired TTL automatically implies 'OFFLINE'.
4. Offline Push Notifications: If recipient is not connected to any WebSocket gateway, trigger Azure Notification Hub / APNs / FCM push notification.`
  },
  {
    id: 'ms-3',
    company: 'microsoft',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'Object-Oriented Design & Design Patterns',
    subject: 'oop',
    question: 'Design an Elevator Control System for a 20-story building using OOP principles and the State Pattern.',
    keyConcepts: ['State Pattern', 'LOOK / SCAN Elevator Algorithm', 'Encapsulation & Polymorphism', 'Request Dispatcher', 'Enum States (IDLE, MOVING_UP, MOVING_DOWN)'],
    tips: 'Use the State Pattern for Elevator states and explain the dispatching strategy (e.g., servicing requests in the current direction before reversing).',
    idealAnswer: `OOP Class Design:
1. Enums: Direction { UP, DOWN, IDLE }, ElevatorState { MOVING, STOPPED, MAINTENANCE, DOOR_OPEN }.
2. Classes:
   - Request: { sourceFloor, destinationFloor, direction, timestamp }.
   - Elevator: fields { id, currentFloor, direction, state, upRequests (Min-Heap), downRequests (Max-Heap) }, methods { move(), stop(), openDoor(), addRequest() }.
   - ElevatorController / Dispatcher: singleton managing fleet of Elevators, implementing the LOOK algorithm (like disk scheduling) to assign incoming floor requests to the closest elevator moving in that direction.
3. State Pattern: ElevatorState interface with implementations IdleState, MovingUpState, MovingDownState, DoorOpenState handling transitions cleanly without deeply nested if/else blocks.`
  },
  {
    id: 'ms-4',
    company: 'microsoft',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'hard',
    category: 'DSA - Trie & Backtracking',
    subject: 'dsa',
    question: 'Word Search II: Given an m x n board of characters and a list of strings words, return all words on the board. Each word must be constructed from letters of sequentially adjacent cells (horizontally or vertically neighboring).',
    keyConcepts: ['Trie (Prefix Tree)', 'DFS Backtracking', 'In-place cell marking (#)', 'Trie node word pruning optimization'],
    tips: 'Insert all words into a Trie first. During DFS on the grid, if the current character is not in the current Trie branch, prune the search immediately.',
    idealAnswer: `Trie + DFS Backtracking Approach:
1. Build a Trie containing all search words. Store the entire word at leaf nodes: node.word = word.
2. Iterate through every cell (r, c) on the board and invoke dfs(r, c, trieRoot).
3. In dfs(r, c, node):
   - Boundary checks: r, c out of bounds or board[r][c] === '#' (visited).
   - Fetch child = node.children[board[r][c]]. If child does not exist, return.
   - If child.word is present: add to results, and set child.word = null (prevents duplicate output).
   - Mark board[r][c] = '#' to avoid revisiting during current path.
   - Recursively visit 4 neighbors (up, down, left, right).
   - Backtrack: restore board[r][c] = originalChar.

Complexity: Time O(M * N * 4^(L)) where L is max word length. Space O(Total letters in words) for Trie.`,
    starterCode: {
      javascript: `function findWords(board, words) {
  const root = {};
  for (const w of words) {
    let node = root;
    for (const char of w) {
      if (!node[char]) node[char] = {};
      node = node[char];
    }
    node.word = w;
  }
  
  const result = [];
  const rows = board.length, cols = board[0].length;
  
  function dfs(r, c, node) {
    if (r < 0 || r >= rows || c < 0 || c >= cols) return;
    const char = board[r][c];
    if (char === '#' || !node[char]) return;
    
    const nextNode = node[char];
    if (nextNode.word) {
      result.push(nextNode.word);
      nextNode.word = null; // deduplicate
    }
    
    board[r][c] = '#';
    dfs(r + 1, c, nextNode);
    dfs(r - 1, c, nextNode);
    dfs(r, c + 1, nextNode);
    dfs(r, c - 1, nextNode);
    board[r][c] = char; // backtrack
  }
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dfs(r, c, root);
    }
  }
  return result;
}`
    }
  },
  {
    id: 'ms-5',
    company: 'microsoft',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'Operating Systems & Memory',
    subject: 'os',
    question: 'Explain Virtual Memory, Paging, Segmentation, and how Page Replacement Algorithms (LRU, Clock) prevent OS Thrashing.',
    keyConcepts: ['Virtual Address Space', 'Page Table & TLB', 'Page Fault Interrupt', 'Thrashing & Working Set Model', 'Clock / Second-Chance Algorithm'],
    tips: 'Define Thrashing as the state where the OS spends more time swapping pages in/out of disk than executing user instructions due to insufficient physical RAM.',
    idealAnswer: `Virtual Memory Fundamentals:
1. Virtual Memory: An abstraction that gives each process an illusion of a large, continuous address space while mapping virtual pages to physical frames via the MMU (Memory Management Unit) and Page Tables.
2. Paging vs Segmentation: Paging divides memory into fixed-size blocks (e.g. 4KB pages) avoiding external fragmentation. Segmentation divides memory into variable-sized logical blocks (code, stack, heap).
3. Page Fault: When a CPU accesses a virtual address whose valid bit is 0, a page fault hardware interrupt traps to the OS kernel, which fetches the page from disk swap space into RAM.
4. Thrashing: Occurs when the sum of working sets of all active processes exceeds available physical RAM. The OS constantly swaps pages in and out, CPU utilization plunges to near zero.
5. Prevention: The OS uses the Working Set Model to suspend processes when total memory demands exceed threshold, and uses Clock/LRU page replacement algorithms.`
  },
  {
    id: 'ms-6',
    company: 'microsoft',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'Database & SQL Internals',
    subject: 'dbms',
    question: 'Explain the internal difference between Clustered and Non-Clustered Indexes in SQL Server, and why B+ Trees are preferred over Hash Indexes.',
    keyConcepts: ['B+ Tree Indexing', 'Clustered Index (Data row ordering)', 'Non-Clustered Index (Row pointer/RID)', 'Leaf-level linked list', 'Range Queries (BETWEEN, >, <)'],
    tips: 'Mention that a table can have only ONE Clustered Index because it dictates physical storage order, but can have up to 999 Non-Clustered Indexes in SQL Server.',
    idealAnswer: `Index Internals:
1. Clustered Index:
   - Dictates the physical sorting order of rows on disk.
   - The leaf nodes of the B+ Tree ARE the actual data pages.
   - Only 1 clustered index is possible per table (commonly on the Primary Key).
2. Non-Clustered Index:
   - Stored in a separate structure from the data table.
   - Leaf nodes contain the index key columns along with a pointer (Clustered Index Key or Row ID) to locate the actual record.
   - Multiple non-clustered indexes can exist per table.
3. Why B+ Trees Over Hash Index:
   - Hash indexes provide O(1) equality lookup (\`WHERE id = 5\`), but fail completely on range queries (\`WHERE age BETWEEN 20 AND 30\`), prefix searches (\`LIKE 'Micro%'\`), and ordering (\`ORDER BY date\`).
   - B+ Trees store keys in sorted order with doubly linked leaf nodes, enabling O(log N) search and high-speed sequential range scans.`
  },
  {
    id: 'ms-7',
    company: 'microsoft',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'hard',
    category: 'DSA - Binary Search',
    subject: 'dsa',
    question: 'Median of Two Sorted Arrays: Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays in O(log(min(m, n))) time complexity.',
    keyConcepts: ['Binary Search on Partition', 'Left/Right partition balance', 'O(log(min(m, n)))', 'Edge cases with -Infinity and Infinity'],
    tips: 'Always perform binary search on the shorter array. Partition both arrays such that the total elements on the left equals total elements on the right.',
    idealAnswer: `Binary Search Partition Approach:
1. Ensure nums1 is the shorter array (if nums1.length > nums2.length, swap them).
2. Binary search on nums1 partition index \`cut1\` between 0 and m:
   - \`cut2 = Math.floor((m + n + 1) / 2) - cut1\`
   - Define:
     - \`l1 = cut1 === 0 ? -Infinity : nums1[cut1 - 1]\`
     - \`r1 = cut1 === m ? Infinity : nums1[cut1]\`
     - \`l2 = cut2 === 0 ? -Infinity : nums2[cut2 - 1]\`
     - \`r2 = cut2 === n ? Infinity : nums2[cut2]\`
3. If \`l1 <= r2\` and \`l2 <= r1\` (valid partition found):
   - If (m + n) is odd: return \`Math.max(l1, l2)\`.
   - If (m + n) is even: return \`(Math.max(l1, l2) + Math.min(r1, r2)) / 2\`.
4. If \`l1 > r2\`, move binary search left: \`high = cut1 - 1\`.
5. Else move right: \`low = cut1 + 1\`.

Time Complexity: O(log(min(M, N))). Space Complexity: O(1).`,
    starterCode: {
      javascript: `function findMedianSortedArrays(nums1, nums2) {
  if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
  const m = nums1.length, n = nums2.length;
  let low = 0, high = m;
  
  while (low <= high) {
    const cut1 = Math.floor((low + high) / 2);
    const cut2 = Math.floor((m + n + 1) / 2) - cut1;
    
    const l1 = cut1 === 0 ? -Infinity : nums1[cut1 - 1];
    const r1 = cut1 === m ? Infinity : nums1[cut1];
    const l2 = cut2 === 0 ? -Infinity : nums2[cut2 - 1];
    const r2 = cut2 === n ? Infinity : nums2[cut2];
    
    if (l1 <= r2 && l2 <= r1) {
      if ((m + n) % 2 === 1) return Math.max(l1, l2);
      return (Math.max(l1, l2) + Math.min(r1, r2)) / 2;
    } else if (l1 > r2) {
      high = cut1 - 1;
    } else {
      low = cut1 + 1;
    }
  }
  return 0;
}`
    }
  },
  {
    id: 'ms-8',
    company: 'microsoft',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'Cloud & Azure Architecture',
    subject: 'system-design',
    question: 'What is the architectural difference between Azure Service Bus Queues vs Topics, and how do you implement Dead Letter Queues (DLQ) and Idempotent Consumers?',
    keyConcepts: ['Point-to-point Queue vs Pub/Sub Topic', 'Subscription Filters', 'Dead-Lettering (poison messages)', 'At-Least-Once Delivery', 'Idempotency Keys with Redis/DB'],
    tips: 'Explain PeekLock receive mode vs ReceiveAndDelete, and how MaxDeliveryCount triggers dead-lettering for unprocessable messages.',
    idealAnswer: `Azure Service Bus Architecture:
1. Queues (Point-to-Point): 1 sender -> 1 consumer. Each message is processed by exactly one receiver (load-balancing among worker instances).
2. Topics (Publish/Subscribe): 1 publisher -> multiple subscriptions. Each subscription receives a copy of the message filtered by SQL correlation rules.
3. Dead Letter Queue (DLQ):
   - Messages that fail processing repeatedly (exceeding \`MaxDeliveryCount\`) or expire before consumption are moved to the secondary \`/$DeadLetterQueue\`.
   - Prevents poison messages from blocking active queue processing and alerts monitoring pipelines for engineer inspection.
4. Idempotent Consumer Pattern:
   - Since cloud queues guarantee At-Least-Once delivery, consumers store processed Message IDs in a Redis cache / database unique constraint table before executing business logic.`
  },
  {
    id: 'ms-9',
    company: 'microsoft',
    role: 'software-developer',
    type: 'behavioral',
    difficulty: 'medium',
    category: 'Growth Mindset & Collaboration',
    subject: 'hr',
    question: 'Describe a situation where you had a strong technical disagreement with a senior engineer or product manager. How did you handle it?',
    keyConcepts: ['Growth Mindset', 'Data-Driven Discussion', 'Disagree and Commit', 'Active Listening', 'Customer Focus'],
    tips: 'Show that you listened to understand their perspective, tested assumptions using concrete benchmarks/data, and focused on business value rather than personal ego.',
    idealAnswer: `Model Response (STAR):
- Situation: During an API redesign, a senior engineer advocated for a GraphQL layer, while I believed REST with sparse fieldsets was significantly better suited for our mobile client caching requirements.
- Task: Align on the best architectural choice without creating friction or delaying project sprint milestones.
- Action: Instead of debating abstract opinions, I proposed a 2-day spike. I built a working prototype benchmark measuring network payload, memory footprint on low-end Android devices, and CDN cache hit ratios for our top 5 heaviest queries. I presented the quantitative results in a collaborative team tech talk.
- Result: The senior engineer agreed that REST with field-filtering was 40% faster on cellular networks for our use case. We adopted the REST approach and documented the decision in an Architecture Decision Record (ADR).`
  },
  {
    id: 'ms-10',
    company: 'microsoft',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'easy',
    category: 'DSA - Trees',
    subject: 'dsa',
    question: 'Symmetric Tree: Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).',
    keyConcepts: ['Recursion / DFS', 'Two-pointer tree comparison', 'Iterative BFS with Queue', 'O(N) Time Complexity'],
    tips: 'A tree is symmetric if left subtree is a mirror reflection of right subtree: t1.val === t2.val and t1.left matches t2.right and t1.right matches t2.left.',
    idealAnswer: `Recursive Mirror Comparison:
1. Define a helper function isMirror(t1, t2):
   - If both t1 and t2 are null, return true.
   - If only one is null, return false.
   - If t1.val !== t2.val, return false.
   - Recursively verify \`isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left)\`.
2. Return isMirror(root.left, root.right).

Complexity: Time O(N) visiting each node once. Space O(H) for recursion stack.`,
    starterCode: {
      javascript: `function isSymmetric(root) {
  if (!root) return true;
  
  function isMirror(t1, t2) {
    if (!t1 && !t2) return true;
    if (!t1 || !t2) return false;
    return (t1.val === t2.val) &&
           isMirror(t1.left, t2.right) &&
           isMirror(t1.right, t2.left);
  }
  
  return isMirror(root.left, root.right);
}`
    }
  },

  // ==========================================
  // 3. AMAZON (Top Product Tier-1)
  // ==========================================
  {
    id: 'amzn-1',
    company: 'amazon',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'System Design - E-Commerce Inventory',
    subject: 'system-design',
    question: 'How would you design Amazon\'s Flash Sale / High-Concurrency Inventory Reservation System to prevent overselling while supporting 500,000 requests/second?',
    keyConcepts: ['Redis Lua Scripts (Atomic DECR)', 'Pessimistic vs Optimistic DB Locking', 'Transactional Outbox & SQS Queue', 'Two-Phase Reservation with TTL', 'Idempotency'],
    tips: 'Do NOT hit relational database for stock checks during flash sales. Decrement in-memory stock counters in Redis atomically using Lua scripts.',
    idealAnswer: `Flash Sale Architecture:
1. In-Memory Atomic Reservation: Pre-load product stock into Redis clusters before sale begins. Use Lua scripts (\`redis.call('DECRBY', key, qty)\`) to guarantee single-threaded atomic stock decrement. If remaining stock < 0, instantly revert and reject checkout in < 2ms.
2. Temporary Cart Hold with TTL: When reserved in Redis, write reservation token with a 10-minute expiration. If user doesn't complete payment within 10 minutes, a scheduled worker / Redis key expiration event increments inventory back.
3. Asynchronous Database Write: Push successful reservation events to AWS SQS FIFO queue -> Order Worker service drains queue and persists order in Aurora PostgreSQL / DynamoDB.
4. Concurrency Guard: DB uses optimistic locking (\`WHERE id = ? AND version = ?\`) as secondary protection against race conditions.`
  },
  {
    id: 'amzn-2',
    company: 'amazon',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'hard',
    category: 'DSA - Graph / Tarjan\'s Algorithm',
    subject: 'dsa',
    question: 'Critical Connections in a Network: There are n servers numbered from 0 to n - 1 connected by undirected server-to-server connections. Find all critical connections (bridges) whose removal would disconnect any server from another.',
    keyConcepts: ['Tarjan\'s Bridge-Finding Algorithm', 'DFS Discovery Time & Lowest Reachable Time', 'low[neighbor] > disc[node] bridge condition', 'O(V + E) Complexity'],
    tips: 'Maintain disc[u] (time when node u was first visited) and low[u] (lowest discovery time reachable from u). If low[v] > disc[u], edge (u, v) is a critical bridge.',
    idealAnswer: `Tarjan's Algorithm for Bridges:
1. Build an undirected adjacency list from connections.
2. Maintain \`disc\` (discovery timestamps), \`low\` (lowest discovery timestamp reachable), and a global \`timer = 0\`.
3. Perform DFS traversal starting from node 0 with parent = -1:
   - Set \`disc[curr] = low[curr] = ++timer\`.
   - For each neighbor of curr:
     - If neighbor === parent, skip (undirected edge).
     - If neighbor is already visited: \`low[curr] = Math.min(low[curr], disc[neighbor])\`.
     - If neighbor is unvisited:
       - Recursively call DFS(neighbor, curr).
       - \`low[curr] = Math.min(low[curr], low[neighbor])\`.
       - If \`low[next] > disc[curr]\`: edge \`[curr, next]\` is a critical bridge, add to results.
4. Return bridges list.

Complexity: Time O(V + E), Space O(V + E).`,
    starterCode: {
      javascript: `function criticalConnections(n, connections) {
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v] of connections) {
    adj[u].push(v);
    adj[v].push(u);
  }
  
  const disc = new Array(n).fill(-1);
  const low = new Array(n).fill(-1);
  const bridges = [];
  let timer = 0;
  
  function dfs(curr, parent) {
    disc[curr] = low[curr] = ++timer;
    for (const next of adj[curr]) {
      if (next === parent) continue;
      if (disc[next] !== -1) {
        low[curr] = Math.min(low[curr], disc[next]);
      } else {
        dfs(next, curr);
        low[curr] = Math.min(low[curr], low[next]);
        if (low[next] > disc[curr]) {
          bridges.push([curr, next]);
        }
      }
    }
  }
  
  dfs(0, -1);
  return bridges;
}`
    }
  },
  {
    id: 'amzn-3',
    company: 'amazon',
    role: 'software-developer',
    type: 'behavioral',
    difficulty: 'medium',
    category: 'Amazon LP - Customer Obsession',
    subject: 'hr',
    question: 'Tell me about a time when you went above and beyond to solve a customer problem by working backwards from their needs.',
    keyConcepts: ['Customer Obsession', 'Working Backwards', 'Root Cause Analysis', 'Quantifiable Business Impact', 'Proactive Ownership'],
    tips: 'Structure your answer around how customer feedback directly guided your technical choices and explain the measured business impact.',
    idealAnswer: `Model Response (STAR):
- Situation: In my previous role, customer support reported that enterprise clients in regions with poor mobile internet experienced 15% transaction checkout timeouts on our web app.
- Task: As the feature owner, I wanted to eliminate checkout drop-offs without forcing users onto high-speed connections.
- Action: I worked backwards from the customer experience. I analyzed network payloads, implemented an offline-first service worker with optimistic UI updates, compressed API payloads using Brotli, and engineered an exponential backoff auto-retry mechanism for idempotent payment submissions.
- Result: Checkout failure rates in low-connectivity areas dropped from 15% to 0.8%, resulting in an additional $350K quarterly retained revenue and an increase of 22 points in our Net Promoter Score (NPS).`
  },
  {
    id: 'amzn-4',
    company: 'amazon',
    role: 'software-developer',
    type: 'behavioral',
    difficulty: 'medium',
    category: 'Amazon LP - Ownership & Bias for Action',
    subject: 'hr',
    question: 'Tell me about a time you took a calculated risk and made an important decision with incomplete information.',
    keyConcepts: ['Bias for Action', 'Two-Way vs One-Way Doors', 'Calculated Risk', 'Telemetry & Rollback Plan', 'Ownership'],
    tips: 'Mention Amazon\'s concept of Two-Way Door decisions (reversible decisions that should be made quickly with ~70% information) versus One-Way Door decisions.',
    idealAnswer: `Model Response (STAR):
- Situation: On Black Friday, our third-party address autocomplete API began returning 504 Gateway Timeouts, stalling all incoming new user orders.
- Task: As the on-call engineer, I had to prevent millions in lost checkout revenue immediately without waiting for the vendor's SLA response.
- Action: Recognizing this as a reversible two-way door decision, I took the calculated risk of bypassing the external validation service. Within 12 minutes, I activated our fallback manual address input flow behind a dynamic feature toggle and configured an automated asynchronous address verification job to run post-checkout before fulfillment.
- Result: 99.4% of checkout requests completed successfully without interruption during peak shopping hours. Only 0.2% required post-order manual correction by our fulfillment team.`
  },
  {
    id: 'amzn-5',
    company: 'amazon',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'System Design - Object Storage',
    subject: 'system-design',
    question: 'How would you design an S3-like Object Storage Service storing Petabytes of unstructured data with 99.999999999% (11 9s) durability?',
    keyConcepts: ['Blob Storage Chunking', 'Reed-Solomon Erasure Coding (8+4)', 'Metadata Engine (Distributed Key-Value)', 'Storage Nodes vs API Gateway', 'Bit-Rot Scrubbing Daemon'],
    tips: 'Do not use simple 3x replication for massive storage scale because of 200% storage overhead. Explain how Reed-Solomon Erasure Coding achieves higher durability with only ~50% overhead.',
    idealAnswer: `S3 Object Storage Architecture:
1. API Gateway Layer: Handles REST requests (PUT, GET, DELETE), authentication, SSL termination, and rate limiting.
2. Metadata Service: High-throughput distributed key-value store (e.g. Cassandra / Spanner) storing object key mappings, bucket policies, access control, version IDs, and block chunk locations.
3. Chunk & Erasure Coding Engine: Incoming objects are split into chunks. Instead of costly 3x replication, uses Reed-Solomon (8+4) Erasure Coding where 8 data fragments + 4 parity fragments are distributed across 12 independent racks/datacenters. The object can survive the simultaneous loss of any 4 storage drives.
4. Background Scrubbing: Continuous background scanner verifies cryptographic checksums (SHA-256) on raw disk blocks to detect and automatically heal silent bit rot.`
  },
  {
    id: 'amzn-6',
    company: 'amazon',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'hard',
    category: 'DSA - Heap / Priority Queue',
    subject: 'dsa',
    question: 'Merge k Sorted Lists: You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it in O(N log k) time.',
    keyConcepts: ['Min-Heap / Priority Queue', 'Divide and Conquer / Merge Sort', 'O(N log k) time complexity', 'Linked List manipulation'],
    tips: 'Use a Min-Heap of size k containing the head of each linked list. Extract the minimum node and push its next node into the heap.',
    idealAnswer: `Min-Heap Approach:
1. Initialize a Min-Priority Queue tracking the smallest current node from each of the k linked lists.
2. Add the head node of every non-empty list into the priority queue (heap size <= k).
3. Create a dummy head node and pointer tail.
4. While the heap is not empty:
   - Extract the minimum node curr from heap.
   - Attach curr to tail.next, and update tail = tail.next.
   - If curr.next is not null, push curr.next into the heap.
5. Return dummy.next.

Time Complexity: O(N log k) where N is the total number of nodes and k is the number of lists. Space Complexity: O(k) for the priority queue.`,
    starterCode: {
      javascript: `function mergeKLists(lists) {
  if (!lists || lists.length === 0) return null;
  
  function mergeTwo(l1, l2) {
    const dummy = { val: 0, next: null };
    let curr = dummy;
    while (l1 && l2) {
      if (l1.val < l2.val) {
        curr.next = l1;
        l1 = l1.next;
      } else {
        curr.next = l2;
        l2 = l2.next;
      }
      curr = curr.next;
    }
    curr.next = l1 || l2;
    return dummy.next;
  }
  
  // Divide and conquer merging
  let step = 1;
  while (step < lists.length) {
    for (let i = 0; i + step < lists.length; i += step * 2) {
      lists[i] = mergeTwo(lists[i], lists[i + step]);
    }
    step *= 2;
  }
  return lists[0] || null;
}`
    }
  },
  {
    id: 'amzn-7',
    company: 'amazon',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'hard',
    category: 'DSA - Two Pointers / Stack',
    subject: 'dsa',
    question: 'Trapping Rain Water: Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    keyConcepts: ['Two Pointers', 'Monotonic Decreasing Stack', 'O(N) Time and O(1) Space', 'Left/Right max boundaries'],
    tips: 'Use two pointers from left and right. Water trapped above any bar is determined by min(maxLeft, maxRight) - height[i]. Always process the side with the smaller max.',
    idealAnswer: `Two-Pointer Approach (Optimal O(1) Space):
1. Initialize left = 0, right = height.length - 1, leftMax = 0, rightMax = 0, totalWater = 0.
2. While left < right:
   - If height[left] < height[right]:
     - If height[left] >= leftMax: update leftMax = height[left].
     - Else: totalWater += leftMax - height[left].
     - Advance left++.
   - Else:
     - If height[right] >= rightMax: update rightMax = height[right].
     - Else: totalWater += rightMax - height[right].
     - Decrement right--.
3. Return totalWater.

Complexity: Time O(N) single pass. Space O(1) strictly constant space.`,
    starterCode: {
      javascript: `function trap(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0;
  let water = 0;
  
  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        water += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        water += rightMax - height[right];
      }
      right--;
    }
  }
  return water;
}`
    }
  },
  {
    id: 'amzn-8',
    company: 'amazon',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'Cloud & AWS DynamoDB',
    subject: 'dbms',
    question: 'Explain Amazon DynamoDB Internals: Partition Keys, Sort Keys, Global Secondary Indexes (GSI), and Eventual vs Strong Consistency.',
    keyConcepts: ['DynamoDB Partitioning Hash Function', 'Composite Primary Key (PK + SK)', 'GSI vs LSI', 'Paxos Storage Node Replication', 'Read Capacity Units (RCU)'],
    tips: 'Explain that GSIs are updated asynchronously with eventual consistency, whereas Strongly Consistent reads query the leader replica partition node.',
    idealAnswer: `DynamoDB Architectural Deep-Dive:
1. Data Partitioning: DynamoDB hashes the Partition Key (PK) using MD5 to determine which physical storage partition node holds the record.
2. Composite Primary Key: A combination of Partition Key (determines physical node) and Sort Key (orders items sequentially on B-Tree within that partition).
3. Global Secondary Indexes (GSI): Creates a completely independent secondary index table with a different PK and SK. DynamoDB replicates data asynchronously to GSIs (eventually consistent).
4. Consistency Models:
   - Eventually Consistent (default): Reads from any of the 3 replicated storage nodes (costs 0.5 RCU per 4KB).
   - Strongly Consistent: Reads from the master partition leader node to guarantee reflection of all previous acknowledged writes (costs 1 RCU per 4KB).`
  },
  {
    id: 'amzn-9',
    company: 'amazon',
    role: 'software-developer',
    type: 'behavioral',
    difficulty: 'medium',
    category: 'Amazon LP - Dive Deep & Insist on Highest Standards',
    subject: 'hr',
    question: 'Tell me about a time you dove deep into metrics or telemetry to identify the root cause of a complex intermittent production bug.',
    keyConcepts: ['Dive Deep', 'Root Cause Analysis (5 Whys)', 'Distributed Tracing / Logs', 'Permanent Fix', 'Insist on Highest Standards'],
    tips: 'Show that you did not stop at surface symptoms or quick band-aids; you inspected logs, flamegraphs, or network traces to solve the architectural root cause.',
    idealAnswer: `Model Response (STAR):
- Situation: Our backend service experienced random 500ms latency spikes every hour during background garbage collection cycles, but CPU and memory utilization looked normal on cloud dashboards.
- Task: Identify the root cause without disrupting live traffic.
- Action: I dove deep into distributed OpenTelemetry traces and JVM garbage collection logs. I discovered that a legacy reporting microservice was executing unindexed queries that pulled 500,000 full records into memory, triggering major JVM Stop-The-World mark-sweep pauses. I refactored the query to use pagination cursors and added streaming reactive backpressure.
- Result: P99 latency dropped from 650ms to 45ms, memory pressure reduced by 70%, and I authored a runbook on memory profiling that was adopted by all backend teams.`
  },
  {
    id: 'amzn-10',
    company: 'amazon',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Intervals & Greedy',
    subject: 'dsa',
    question: 'Non-overlapping Intervals: Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.',
    keyConcepts: ['Greedy Algorithm', 'Interval Scheduling', 'Sorting by end time', 'O(N log N) Complexity'],
    tips: 'Sort intervals by their END times. Always greedily pick the interval that finishes earliest to leave maximum room for subsequent intervals.',
    idealAnswer: `Greedy Interval Scheduling:
1. Sort intervals ascending by their end time: \`intervals.sort((a, b) => a[1] - b[1])\`.
2. Initialize \`removals = 0\` and \`prevEnd = -Infinity\`.
3. Iterate through intervals:
   - If \`interval[0] >= prevEnd\`: no overlap, update \`prevEnd = interval[1]\`.
   - Else: overlap detected. Greedily remove current interval by incrementing \`removals++\`.
4. Return removals.

Complexity: Time O(N log N) for sorting, Space O(1) auxiliary space.`,
    starterCode: {
      javascript: `function eraseOverlapIntervals(intervals) {
  if (intervals.length <= 1) return 0;
  intervals.sort((a, b) => a[1] - b[1]);
  
  let removals = 0;
  let prevEnd = intervals[0][1];
  
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < prevEnd) {
      removals++;
    } else {
      prevEnd = intervals[i][1];
    }
  }
  return removals;
}`
    }
  },

  // ==========================================
  // 4. META (Top Product Tier-1)
  // ==========================================
  {
    id: 'meta-1',
    company: 'meta',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'hard',
    category: 'DSA - Graph / BFS',
    subject: 'dsa',
    question: 'Word Ladder: Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord such that each adjacent pair differs by only 1 letter. Return 0 if no sequence exists.',
    keyConcepts: ['Bidirectional BFS', 'Queue-based BFS', 'HashSet for O(1) dictionary lookup', 'Level tracking'],
    tips: 'Bidirectional BFS (searching simultaneously from beginWord and endWord) reduces time complexity from O(b^d) to O(b^(d/2)), drastically shrinking search space.',
    idealAnswer: `Bidirectional BFS Approach:
1. Put all words into a Set \`wordSet\`. If \`endWord\` is not in \`wordSet\`, return 0.
2. Initialize two sets: \`beginSet = new Set([beginWord])\` and \`endSet = new Set([endWord])\`.
3. Track \`step = 1\` and \`visited = new Set()\`.
4. While \`beginSet\` and \`endSet\` are non-empty:
   - Always expand the smaller set to minimize branching factor.
   - For each word in \`beginSet\`, generate all possible 1-letter mutations ('a' to 'z').
   - If mutated word exists in \`endSet\`, return \`step + 1\`.
   - If mutated word exists in \`wordSet\` and not in \`visited\`, add to \`nextLevelSet\` and mark visited.
   - Increment \`step++\` and swap \`beginSet = nextLevelSet\`.
5. If no path found, return 0.

Complexity: Time O(M^2 * N) where M is word length and N is dictionary size. Space O(N).`,
    starterCode: {
      javascript: `function ladderLength(beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;
  
  let beginSet = new Set([beginWord]);
  let endSet = new Set([endWord]);
  let step = 1;
  
  while (beginSet.size > 0 && endSet.size > 0) {
    if (beginSet.size > endSet.size) {
      const temp = beginSet;
      beginSet = endSet;
      endSet = temp;
    }
    
    const nextSet = new Set();
    for (const word of beginSet) {
      for (let i = 0; i < word.length; i++) {
        for (let c = 97; c <= 122; c++) {
          const newWord = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
          if (endSet.has(newWord)) return step + 1;
          if (wordSet.has(newWord)) {
            nextSet.add(newWord);
            wordSet.delete(newWord);
          }
        }
      }
    }
    beginSet = nextSet;
    step++;
  }
  return 0;
}`
    }
  },
  {
    id: 'meta-2',
    company: 'meta',
    role: 'frontend-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'React Internals & Architecture',
    subject: 'oop',
    question: 'How does React 18 Fiber Reconciler work with Concurrent Mode, Time-Slicing, and Suspense under the hood?',
    keyConcepts: ['Fiber Node Tree Structure', 'Render Phase (Interruptible) vs Commit Phase (Synchronous)', 'Scheduler & MessageChannel (5ms time slices)', 'Double Buffering (current vs workInProgress)'],
    tips: 'Explain that Fiber replaces the old recursive Stack Reconciler with a singly-linked list tree structure where work can be paused, aborted, or prioritized.',
    idealAnswer: `React Fiber Architecture:
1. Fiber Node Structure: Each React element is represented by a Fiber object with pointers: \`child\`, \`sibling\`, \`return\` (parent). This linked list allows pausing and resuming tree traversal without holding the JS call stack.
2. Two-Phase Execution:
   - Render Phase (Asynchronous & Interruptible): React traverses the Fiber tree, computes diffs, and marks effect tags. It yields control back to the browser every 5ms using \`MessageChannel\` / Scheduler to ensure 60fps smooth scrolling.
   - Commit Phase (Synchronous): Applies DOM mutations, updates refs, and executes \`useLayoutEffect\` / \`componentDidMount\` without interruptions.
3. Double Buffering: React maintains two trees: \`current\` (currently rendered on screen) and \`workInProgress\` (being calculated off-screen). Once reconciliation completes, React points the root pointer to \`workInProgress\`.`
  },
  {
    id: 'meta-3',
    company: 'meta',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'System Design - Social Feed',
    subject: 'system-design',
    question: 'How would you design Facebook / Instagram News Feed generation for 2 Billion users with sub-200ms latency?',
    keyConcepts: ['Fan-out on Write (Push) vs Fan-out on Read (Pull)', 'Hybrid Model for Celebrities', 'Feed Generation & Ranking Pipeline', 'Redis Feed Cache', 'Denormalized Posts'],
    tips: 'Use Fan-out-on-write for standard users (<5,000 friends) and Fan-out-on-read for high-follower celebrities (e.g. Cristiano Ronaldo with 600M followers) to avoid write explosions.',
    idealAnswer: `Facebook News Feed System Design:
1. Feed Publishing Flow (Hybrid Fan-Out):
   - When User A posts: Post metadata is saved in distributed DB (e.g. TAO / MySQL).
   - If User A has < 5,000 friends: Fan-out on Write pushes Post ID into friends' in-memory Redis feed lists (ZSET sorted by timestamp).
   - If User A is a celebrity (>50K followers): Fan-out on Read pulls celebrity posts on-demand during client app open and merges them into the feed.
2. Ranking Engine:
   - Fetches candidate posts from user's friend graph.
   - ML Scoring Model (Deep Learning / DLRM) computes engagement probability score: \`P(like)*w1 + P(comment)*w2 + P(share)*w3\`.
   - Sorts top 500 posts and delivers to client in paginated chunks of 20.`
  },
  {
    id: 'meta-4',
    company: 'meta',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Binary Trees',
    subject: 'dsa',
    question: 'Lowest Common Ancestor (LCA) of a Binary Tree: Given a binary tree, find the lowest common ancestor node of two given nodes p and q in O(N) time.',
    keyConcepts: ['Post-order DFS', 'Subtree matching', 'Recursion', 'O(N) Time and O(H) Space'],
    tips: 'If root matches p or q, return root. If left and right subtrees both return non-null, root is the LCA.',
    idealAnswer: `Recursive Post-Order DFS:
1. Base cases:
   - If \`root === null\` return null.
   - If \`root === p || root === q\` return root.
2. Recursively search left and right subtrees:
   - \`left = lowestCommonAncestor(root.left, p, q)\`
   - \`right = lowestCommonAncestor(root.right, p, q)\`
3. Decision:
   - If both \`left\` and \`right\` are non-null, p and q lie in different subtrees of root, so \`root\` is the LCA.
   - If only \`left\` is non-null, return \`left\`.
   - Otherwise return \`right\`.

Complexity: Time O(N) visiting each node once. Space O(H) recursion stack.`,
    starterCode: {
      javascript: `function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  return left || right;
}`
    }
  },
  {
    id: 'meta-5',
    company: 'meta',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'hard',
    category: 'DSA - Sliding Window & String',
    subject: 'dsa',
    question: 'Minimum Window Substring: Given two strings s and t, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If no such substring exists, return "".',
    keyConcepts: ['Sliding Window', 'Frequency Hash Maps', 'Matched characters counter', 'Two Pointers (left, right)'],
    tips: 'Expand the right pointer until all characters in t are satisfied. Then shrink the left pointer as much as possible to find the minimum valid window.',
    idealAnswer: `Sliding Window Approach:
1. Build a target frequency map \`targetMap\` for characters in string t, and track \`required = targetMap.size\`.
2. Maintain \`windowMap\`, \`left = 0\`, \`formed = 0\`, and \`minWindow = [Infinity, 0, 0]\`.
3. Expand \`right\` pointer from 0 to s.length - 1:
   - Add \`s[right]\` to \`windowMap\`.
   - If \`windowMap.get(s[right]) === targetMap.get(s[right])\`, increment \`formed++\`.
   - While \`formed === required\` (window is valid):
     - If current window size \`right - left + 1 < minWindow[0]\`, update \`minWindow = [right - left + 1, left, right]\`.
     - Decrement \`s[left]\` from \`windowMap\`.
     - If \`windowMap.get(s[left]) < targetMap.get(s[left])\`, decrement \`formed--\`.
     - Advance \`left++\`.
4. Return \`minWindow[0] === Infinity ? "" : s.slice(minWindow[1], minWindow[2] + 1)\`.

Complexity: Time O(|S| + |T|), Space O(|S| + |T|).`,
    starterCode: {
      javascript: `function minWindow(s, t) {
  if (!s || !t || s.length < t.length) return "";
  const targetMap = new Map();
  for (const c of t) targetMap.set(c, (targetMap.get(c) || 0) + 1);
  
  const windowMap = new Map();
  let left = 0, formed = 0, required = targetMap.size;
  let minLen = Infinity, minStart = 0;
  
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    windowMap.set(c, (windowMap.get(c) || 0) + 1);
    if (targetMap.has(c) && windowMap.get(c) === targetMap.get(c)) formed++;
    
    while (formed === required) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        minStart = left;
      }
      const leftChar = s[left];
      windowMap.set(leftChar, windowMap.get(leftChar) - 1);
      if (targetMap.has(leftChar) && windowMap.get(leftChar) < targetMap.get(leftChar)) {
        formed--;
      }
      left++;
    }
  }
  return minLen === Infinity ? "" : s.slice(minStart, minStart + minLen);
}`
    }
  },
  {
    id: 'meta-6',
    company: 'meta',
    role: 'frontend-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'Frontend - Virtualized List',
    subject: 'coding-problems',
    question: 'Implement a Virtualized List Component in React that efficiently renders 100,000 items without DOM lag by only rendering visible items in the viewport.',
    keyConcepts: ['Virtual Scrolling / Windowing', 'Scroll event throttling', 'Visible start/end index math', 'Absolute positioning transforms'],
    tips: 'Calculate startIndex = Math.floor(scrollTop / itemHeight) and only render items between startIndex and endIndex with a buffer of 3-5 items.',
    idealAnswer: `Virtualized List Architecture:
1. Principle: Instead of mounting 100,000 DOM nodes which freezes the browser, mount only the ~15 items currently visible in the container's viewport plus a buffer of 3 above and below.
2. Mathematical Calculation:
   - \`totalHeight = totalItems * itemHeight\` (sets container scrollbar size).
   - \`startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer)\`.
   - \`endIndex = Math.min(totalItems - 1, Math.floor((scrollTop + viewportHeight) / itemHeight) + buffer)\`.
   - \`offsetY = startIndex * itemHeight\`.
3. Render: Wrapper div has \`height: totalHeight\`. Inner content div is transformed with \`translateY(offsetY)\` containing only items from \`startIndex\` to \`endIndex\`.`,
    starterCode: {
      javascript: `// React Virtualized List Pattern
function VirtualList({ items, itemHeight, viewportHeight }) {
  const [scrollTop, setScrollTop] = React.useState(0);
  
  const totalHeight = items.length * itemHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - 3);
  const endIndex = Math.min(items.length - 1, Math.floor((scrollTop + viewportHeight) / itemHeight) + 3);
  const visibleItems = items.slice(startIndex, endIndex + 1);
  const offsetY = startIndex * itemHeight;
  
  return (
    <div 
      style={{ height: viewportHeight, overflowY: 'auto', position: 'relative' }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: \`translateY(\${offsetY}px)\` }}>
          {visibleItems.map((item, idx) => (
            <div key={startIndex + idx} style={{ height: itemHeight }}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`
    }
  },
  {
    id: 'meta-7',
    company: 'meta',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Binary Search',
    subject: 'dsa',
    question: 'Search in Rotated Sorted Array: Given an integer array nums sorted in ascending order (with distinct values) that was rotated at an unknown pivot index, and a target value, return the index of target, or -1 if not in nums in O(log N) time.',
    keyConcepts: ['Modified Binary Search', 'Sorted Half Identification', 'Boundary Condition Checks', 'O(log N) Time Complexity'],
    tips: 'In any rotated sorted array, dividing it at mid guarantees that at least one half (left or right) is strictly sorted.',
    idealAnswer: `Modified Binary Search:
1. Set low = 0, high = nums.length - 1.
2. While low <= high:
   - mid = Math.floor((low + high) / 2).
   - If nums[mid] === target, return mid.
   - Case 1: Left half [low...mid] is sorted (nums[low] <= nums[mid]):
     - If target >= nums[low] and target < nums[mid], search left: high = mid - 1.
     - Else search right: low = mid + 1.
   - Case 2: Right half [mid...high] is sorted:
     - If target > nums[mid] and target <= nums[high], search right: low = mid + 1.
     - Else search left: high = mid - 1.
3. Return -1 if not found.

Complexity: Time O(log N), Space O(1).`,
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
    id: 'meta-8',
    company: 'meta',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'System Design - Real-Time Messenger',
    subject: 'system-design',
    question: 'How would you design Meta Messenger\'s Real-Time 1:1 and Group Chat syncing across mobile devices and web clients?',
    keyConcepts: ['MQTT Protocol over WebSockets', 'Monotonic Sequence Numbering', 'Sync Protocol (Iris / SyncEngine)', 'Cassandra Storage Engine', 'Ephemeral Connection Gateway'],
    tips: 'Mention MQTT for low power consumption on mobile devices and explain how Iris sync protocol uses monotonically increasing sequence IDs to backfill missed messages.',
    idealAnswer: `Messenger System Architecture:
1. Protocol: Uses MQTT (Message Queuing Telemetry Transport) over TLS/TCP for mobile clients due to its minimal 2-byte header overhead and battery efficiency.
2. Sync Engine (Iris):
   - Every user has an append-only message sequence queue with monotonic IDs (1, 2, 3...).
   - When a device reconnects after being offline, it requests: \`sync(lastSequenceId = 142)\`. The server streams all delta messages > 142 in order.
3. Storage Layer: Distributed Cassandra cluster partitioned by \`conversation_id\` with clustering key on \`message_timestamp DESC\`.
4. Group Chat Fanout: For small groups (<250 users), gateway publishes message to all active connection queues. For large channels, message is pulled on-demand.`
  },
  {
    id: 'meta-9',
    company: 'meta',
    role: 'software-developer',
    type: 'behavioral',
    difficulty: 'medium',
    category: 'Meta Values - Move Fast & Be Bold',
    subject: 'hr',
    question: 'Tell me about a time you had to balance moving fast to meet an aggressive shipment deadline versus maintaining long-term software architecture quality.',
    keyConcepts: ['Move Fast', 'Be Bold', 'Technical Debt Management', 'Feature Flags', 'Post-Launch Refactoring'],
    tips: 'Demonstrate how you evaluated technical risk, shipped an MVP safely behind feature toggles, and followed through by paying down technical debt post-launch.',
    idealAnswer: `Model Response (STAR):
- Situation: Two weeks before our quarterly company product keynote, we needed to release a collaborative video annotation feature, but the full multi-region database sharding infrastructure was still a month away.
- Task: Enable the feature for beta launch without risking data loss or compromising database stability.
- Action: I proposed a phased rollout. For the MVP, we scoped the real-time annotations to single-region Redis instances with asynchronous snapshot backups to S3, protected by an automatic circuit breaker. I logged technical debt tickets in our sprint board with assigned story points.
- Result: We shipped on time for the keynote with zero downtime. In the following sprint, my team executed the planned migration to partitioned PostgreSQL without customer disruption.`
  },
  {
    id: 'meta-10',
    company: 'meta',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Arrays / Two Pointers',
    subject: 'dsa',
    question: '3Sum: Given an integer array nums, return all the unique triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.',
    keyConcepts: ['Sorting', 'Two Pointers', 'Duplicate Skipping', 'O(N^2) Time Complexity'],
    tips: 'Sort the array first. Loop through the array with pointer i, then use two pointers (left, right) for the remaining sum. Skip duplicate elements to avoid duplicate triplets.',
    idealAnswer: `Two-Pointer Approach (O(N^2)):
1. Sort \`nums\` in ascending order.
2. Iterate \`i\` from 0 to nums.length - 3:
   - If \`nums[i] > 0\`, break (sum cannot be 0 since array is sorted).
   - If \`i > 0 && nums[i] === nums[i - 1]\`, continue (skip duplicate i).
   - Set \`left = i + 1\`, \`right = nums.length - 1\`.
   - While \`left < right\`:
     - \`sum = nums[i] + nums[left] + nums[right]\`.
     - If \`sum === 0\`:
       - Add triplet \`[nums[i], nums[left], nums[right]]\` to results.
       - Advance \`left++\` while \`nums[left] === nums[left + 1]\` (skip duplicate left).
       - Decrement \`right--\` while \`nums[right] === nums[right + 1]\` (skip duplicate right).
     - Else if \`sum < 0\`: \`left++\`.
     - Else: \`right--\`.
3. Return results.

Complexity: Time O(N^2), Space O(log N) for sorting.`,
    starterCode: {
      javascript: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  
  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0) break;
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    
    let left = i + 1, right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
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
  return result;
}`
    }
  },

  // ==========================================
  // 5. NETFLIX (Top Product Tier-1)
  // ==========================================
  {
    id: 'nflx-1',
    company: 'netflix',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'System Design - Video Streaming Architecture',
    subject: 'system-design',
    question: 'How would you design Netflix\'s Global Video Ingestion & Adaptive Bitrate (ABR) Streaming Architecture to deliver 4K streams smoothly?',
    keyConcepts: ['Adaptive Bitrate Streaming (HLS / DASH)', 'Video Chunking & Transcoding Matrix', 'Open Connect CDN Appliances (OCAs)', 'Manifest Files (.m3u8 / .mpd)', 'Pre-fetching Algorithms'],
    tips: 'Explain that the video player switches bitrates dynamically every few seconds based on real-time bandwidth and CPU buffer metrics.',
    idealAnswer: `Netflix Streaming Architecture:
1. Video Ingestion Pipeline: Studio master video uploads to AWS S3 -> Titus containerized microservices split video into 2-6 second chunks -> Transcoded in parallel into ~120 combinations of resolution (480p to 4K), codecs (H.264, AV1, HEVC), and bitrates.
2. Manifest Generation: HLS/DASH manifest files index available chunk URLs and bitrates.
3. Open Connect CDN: Custom FreeBSD appliances deployed directly inside ISP networks and IXPs globally. Nightly off-peak predictive caching pushes trending movies to local OCA boxes.
4. Player ABR Logic: Client player monitors buffer fill rate and throughput, requesting appropriate chunk quality dynamically without video buffering.`
  },
  {
    id: 'nflx-2',
    company: 'netflix',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'Distributed Systems & Resilience',
    subject: 'system-design',
    question: 'Explain the Circuit Breaker Pattern (Netflix Hystrix / Resilience4j), Bulkheads, and Chaos Engineering (Chaos Monkey).',
    keyConcepts: ['Circuit Breaker States (Closed, Open, Half-Open)', 'Cascading Failure Prevention', 'Bulkhead Thread Isolation', 'Fallback Strategies', 'Chaos Monkey Fault Injection'],
    tips: 'Walk through the 3 state transitions of a Circuit Breaker and explain why failing fast is critical for microservice stability.',
    idealAnswer: `Resilience Engineering:
1. Circuit Breaker States:
   - Closed: Normal operation, requests pass through. Error rates monitored over sliding window.
   - Open: When error rate exceeds threshold (e.g. 50%), breaker trips. All subsequent calls fail instantly and execute fallback logic without stressing the failing dependency.
   - Half-Open: After a sleep window (e.g. 10s), trial requests test dependency health. If successful, breaker closes; else resets to Open.
2. Bulkhead Pattern: Isolates thread pools and connection pools per dependency so an outage in Recommendation Service cannot starve Authentication Service threads.
3. Chaos Monkey: Proactively terminates random production server instances in business hours to verify system auto-healing.`
  },
  {
    id: 'nflx-3',
    company: 'netflix',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'hard',
    category: 'DSA - Two Heaps',
    subject: 'dsa',
    question: 'Find Median from Data Stream: Design a data structure that supports adding integer numbers from a stream and finding the current median in O(1) time and O(log N) insertion.',
    keyConcepts: ['Max-Heap for lower half', 'Min-Heap for upper half', 'Heap balance maintenance', 'O(1) findMedian'],
    tips: 'Keep two heaps: max-heap stores the smaller half of numbers, min-heap stores the larger half. Maintain either equal sizes or max-heap size = min-heap size + 1.',
    idealAnswer: `Two-Heap Algorithm:
1. Structures: \`maxHeap\` (lower 50% numbers) and \`minHeap\` (upper 50% numbers).
2. addNum(num):
   - Push to \`maxHeap\`.
   - Pop max from \`maxHeap\` and push to \`minHeap\` (ensures all elements in maxHeap <= minHeap).
   - If \`minHeap.size > maxHeap.size\`: pop min from \`minHeap\` and push to \`maxHeap\` (keeps size balance).
3. findMedian():
   - If \`maxHeap.size > minHeap.size\`: return maxHeap.peek().
   - Else return \`(maxHeap.peek() + minHeap.peek()) / 2\`.

Time Complexity: addNum is O(log N), findMedian is O(1). Space Complexity: O(N).`,
    starterCode: {
      javascript: `class MedianFinder {
  constructor() {
    this.arr = []; // in JS, maintaining sorted insertion or using Binary Insertion
  }
  addNum(num) {
    let low = 0, high = this.arr.length;
    while (low < high) {
      const mid = (low + high) >> 1;
      if (this.arr[mid] < num) low = mid + 1;
      else high = mid;
    }
    this.arr.splice(low, 0, num);
  }
  findMedian() {
    const n = this.arr.length;
    if (n % 2 === 1) return this.arr[Math.floor(n / 2)];
    return (this.arr[n / 2 - 1] + this.arr[n / 2]) / 2;
  }
}`
    }
  },
  {
    id: 'nflx-4',
    company: 'netflix',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Dynamic Programming',
    subject: 'dsa',
    question: 'Decode Ways: A message containing letters from A-Z can be encoded into numbers using \'A\' -> "1" to \'Z\' -> "26". Given a string s containing only digits, return the number of ways to decode it.',
    keyConcepts: ['1D Dynamic Programming', 'Prefix decoding validity', 'Space optimization O(1)', 'Handling leading zeros'],
    tips: "A single digit '1'-'9' is always valid. A pair of digits '10'-'26' is valid. If a digit is '0' without a preceding '1' or '2', it cannot be decoded.",
    idealAnswer: `Dynamic Programming Approach:
1. If \`s[0] === '0'\`, return 0.
2. Initialize \`prev2 = 1\` (dp[i-2]) and \`prev1 = 1\` (dp[i-1]).
3. Iterate \`i\` from 1 to s.length - 1:
   - \`curr = 0\`
   - Check single digit: If \`s[i] !== '0'\`, \`curr += prev1\`.
   - Check two digits: \`twoDigit = parseInt(s.slice(i - 1, i + 1))\`. If \`twoDigit >= 10 && twoDigit <= 26\`, \`curr += prev2\`.
   - Shift: \`prev2 = prev1\`, \`prev1 = curr\`.
4. Return \`prev1\`.

Complexity: Time O(N), Space O(1).`,
    starterCode: {
      javascript: `function numDecodings(s) {
  if (!s || s[0] === '0') return 0;
  let prev2 = 1, prev1 = 1;
  
  for (let i = 1; i < s.length; i++) {
    let curr = 0;
    const one = parseInt(s[i]);
    const two = parseInt(s.slice(i - 1, i + 1));
    
    if (one >= 1 && one <= 9) curr += prev1;
    if (two >= 10 && two <= 26) curr += prev2;
    
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}`
    }
  },
  {
    id: 'nflx-5',
    company: 'netflix',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'Microservices & API Gateway',
    subject: 'system-design',
    question: 'How does Netflix Zuul API Gateway handle dynamic routing, rate limiting, and security filters at high scale?',
    keyConcepts: ['Netty Non-blocking Asynchronous I/O', 'Filter Chains (Pre, Route, Post, Error)', 'Dynamic Groovy Filter Reloading', 'Eureka Service Discovery', 'Distributed Rate Limiting'],
    tips: 'Explain the 4 stages of Zuul filter execution: Pre (auth/logging), Route (routing to microservice), Post (metrics/headers), and Error.',
    idealAnswer: `Netflix Zuul Architecture:
1. Non-Blocking I/O: Zuul 2 runs on Netty event-loop architecture, enabling a small pool of worker threads to handle tens of thousands of concurrent client connections without thread starvation.
2. Filter Chain Pipeline:
   - Pre Filters: Authentication, token verification, rate limiting, and request context injection.
   - Route Filters: Dispatches HTTP request to target microservice using Ribbon client-side load balancing and Eureka service discovery.
   - Post Filters: Injects response headers, measures latency metrics, and Gzip compresses responses.
   - Error Filters: Catch exceptions and format standardized JSON error envelopes.`
  },
  {
    id: 'nflx-6',
    company: 'netflix',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Design & Binary Search',
    subject: 'dsa',
    question: 'Time Based Key-Value Store: Design a time-based key-value data structure that can store multiple values for the same key at different timestamps and retrieve the key\'s value at a certain timestamp.',
    keyConcepts: ['Hash Map of Arrays', 'Binary Search (upper_bound)', 'O(1) Set and O(log N) Get', 'Timestamp Ordering'],
    tips: 'Since timestamps are strictly increasing in set calls, the list of values for each key is naturally sorted. Use binary search in get(key, timestamp).',
    idealAnswer: `Design Pattern:
1. Storage: \`Map<string, Array<{ timestamp: number, value: string }>>\`.
2. set(key, value, timestamp):
   - Fetch array for \`key\` (or create empty).
   - Push \`{ timestamp, value }\` to array (O(1) amortized).
3. get(key, timestamp):
   - If key does not exist, return "".
   - Perform Binary Search on timestamp array to find largest timestamp <= target timestamp.
   - If found return \`entry.value\`, else return "".

Complexity: set is O(1), get is O(log N). Space O(Total entries).`,
    starterCode: {
      javascript: `class TimeMap {
  constructor() {
    this.map = new Map();
  }
  set(key, value, timestamp) {
    if (!this.map.has(key)) this.map.set(key, []);
    this.map.get(key).push({ timestamp, value });
  }
  get(key, timestamp) {
    if (!this.map.has(key)) return "";
    const list = this.map.get(key);
    let low = 0, high = list.length - 1, res = "";
    while (low <= high) {
      const mid = (low + high) >> 1;
      if (list[mid].timestamp <= timestamp) {
        res = list[mid].value;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    return res;
  }
}`
    }
  },
  {
    id: 'nflx-7',
    company: 'netflix',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'Distributed Caching & EVCache',
    subject: 'system-design',
    question: 'Explain Netflix EVCache (Distributed Memcached) architecture and multi-region replication strategies.',
    keyConcepts: ['Memcached Cluster on AWS EC2', 'Spinnaker Deployment Orchestration', 'Kafka Asynchronous Cross-Region Replication', 'Zone Affinity Reads', 'Cache Invalidation'],
    tips: 'Mention that reads always target the local AWS Availability Zone for sub-millisecond latency, while writes asynchronously fan out across zones.',
    idealAnswer: `EVCache Architecture:
1. Core Tech: Wrapper around Memcached with custom Java client supporting multi-cluster topologies and dynamic server discovery.
2. Read Path: Client calculates consistent hash of key -> routes read strictly to the local AWS Availability Zone instance for sub-millisecond retrieval.
3. Write Path: Write requests update all local availability zone cache clusters synchronously, then publish replication events to Kafka topics for asynchronous cross-datacenter replication.
4. Auto-Healing: EVCache monitors cache node dropouts and automatically replaces instances without cold-cache stampedes.`
  },
  {
    id: 'nflx-8',
    company: 'netflix',
    role: 'software-developer',
    type: 'behavioral',
    difficulty: 'medium',
    category: 'Netflix Culture - Freedom & Responsibility',
    subject: 'hr',
    question: 'Tell me about a time you identified a major architectural inefficiency or operational risk and fixed it with complete autonomy without waiting for managerial approval.',
    keyConcepts: ['Freedom and Responsibility', 'High Performance Culture', 'Proactive Ownership', 'Risk Mitigation', 'Retrospective Communication'],
    tips: 'Netflix values high context and low control. Emphasize how you gathered necessary context, took decisive action, and openly shared learnings.',
    idealAnswer: `Model Response (STAR):
- Situation: While inspecting our production telemetry dashboards, I noticed our telemetry log ingestion workers were dropping 4% of events during evening traffic spikes due to synchronous blocking database writes.
- Task: Eliminate data loss and stabilize ingestion without waiting for the next quarterly planning cycle.
- Action: Exercising personal ownership, I designed an asynchronous buffered batch writer using in-memory ring buffers and scheduled flushes. I tested the implementation with load testing tools against a staging mirror, confirmed zero event drops under 3x peak load, and deployed the patch behind a canary rollout.
- Result: Log drop rate fell to 0%, CPU usage dropped by 35%, and I shared a technical retrospective with the engineering organization.`
  },
  {
    id: 'nflx-9',
    company: 'netflix',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'Stream Processing & Data Pipelines',
    subject: 'system-design',
    question: 'How would you design Netflix\'s Real-Time Viewing History and Personalized Recommendation Ingestion Pipeline (Kafka, Apache Flink, Cassandra)?',
    keyConcepts: ['Event Sinks & Kafka Partitioning', 'Apache Flink Stateful Stream Processing', 'Tumbling vs Sliding Windows', 'Cassandra Time-Series Table', 'Near-line ML feature store'],
    tips: 'Differentiate between the offline batch model training and the real-time near-line feature generation stream.',
    idealAnswer: `Viewing History Stream Pipeline:
1. Event Emission: Video player sends heartbeat telemetry event every 10 seconds containing { userId, videoId, playbackPosition, timestamp }.
2. Ingestion: Ingested by API Gateway -> published to Kafka topic partitioned by userId to guarantee ordered per-user message delivery.
3. Stream Processing (Apache Flink): Flink job maintains stateful user session windows, computing watch percentage, bookmark resume position, and skip patterns.
4. Storage: Writes latest bookmark to Redis (for instant UI resume bar) and appends event to Cassandra (partitioned by userId, clustered by timestamp DESC).
5. Recommendation Service: Feeds real-time contextual vectors into ML ranking models.`
  },
  {
    id: 'nflx-10',
    company: 'netflix',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Hash Map & Array',
    subject: 'dsa',
    question: 'Subarray Sum Equals K: Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k in O(N) time.',
    keyConcepts: ['Prefix Sum', 'Hash Map of Prefix Frequencies', 'O(N) Time and O(N) Space', 'Continuous Subarrays'],
    tips: 'Maintain a running prefixSum. If prefixSum - k exists in the hash map, add its frequency to the total count.',
    idealAnswer: `Prefix Sum Hash Map Approach:
1. Maintain \`prefixSum = 0\`, \`count = 0\`, and a hash map \`prefixMap\` storing \`prefixSum -> frequency\`.
2. Initialize \`prefixMap.set(0, 1)\` (handles subarrays starting at index 0).
3. Loop through \`nums\`:
   - \`prefixSum += num\`.
   - If \`prefixMap.has(prefixSum - k)\`: \`count += prefixMap.get(prefixSum - k)\`.
   - Increment \`prefixSum\` in map: \`prefixMap.set(prefixSum, (prefixMap.get(prefixSum) || 0) + 1)\`.
4. Return \`count\`.

Complexity: Time O(N), Space O(N).`,
    starterCode: {
      javascript: `function subarraySum(nums, k) {
  const map = new Map();
  map.set(0, 1);
  let prefixSum = 0, count = 0;
  
  for (const num of nums) {
    prefixSum += num;
    if (map.has(prefixSum - k)) {
      count += map.get(prefixSum - k);
    }
    map.set(prefixSum, (map.get(prefixSum) || 0) + 1);
  }
  return count;
}`
    }
  },

  // ==========================================
  // 6. UBER (Top Product Tier-1)
  // ==========================================
  {
    id: 'uber-1',
    company: 'uber',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'System Design - Geospatial Matching',
    subject: 'system-design',
    question: 'How would you design Uber\'s Real-Time Driver-Rider Dispatch Matching System (DISCO) using H3 Hexagonal Spatial Indexing?',
    keyConcepts: ['Uber H3 Hexagonal Spatial Index', 'Driver Location Pings (every 4s)', 'Geospatial Sharding', 'Bipartite Graph Matching / Hungarian Algorithm', 'Redis Geospatial'],
    tips: 'Explain why hexagons (H3) are superior to squares or circles for geospatial indexing (all neighboring hexagon centroids are equidistant).',
    idealAnswer: `Uber DISCO Dispatch Architecture:
1. Spatial Indexing with H3: Uber divides the world into hierarchical hexagonal cells (Resolution 7-9 ~ 100m to 1km radius). Hexagons ensure equal distance to all 6 adjacent neighbors.
2. Location Ingestion: Active drivers broadcast GPS coordinates every 4 seconds -> Gateway converts lat/long to H3 Cell ID -> Updates in-memory Redis cluster.
3. Batch Dispatcher (every 5-10s window):
   - Gathers all ride requests and available drivers within an H3 cell and its 1-ring neighbors.
   - Formulates a Bipartite Graph with cost edges = ETA + surge multiplier.
   - Executes Hungarian / Kuhn-Munkres algorithm to find the global optimum dispatch pairing that minimizes total passenger wait times.`
  },
  {
    id: 'uber-2',
    company: 'uber',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'hard',
    category: 'DSA - Graph / Dijkstra & A*',
    subject: 'dsa',
    question: 'Network Delay Time / Shortest ETA Road Path: Given a network of n nodes and directed weighted edges times[i] = [u, v, w], compute the minimum time required for a signal from source node k to reach all nodes. Return -1 if impossible.',
    keyConcepts: ['Dijkstra\'s Algorithm', 'Min-Priority Queue / Min-Heap', 'Adjacency List with Edge Weights', 'O((V + E) log V) Complexity'],
    tips: 'Use Dijkstra\'s Algorithm with a Min-Heap. The answer is the maximum distance among all shortest distances from the source node.',
    idealAnswer: `Dijkstra's Algorithm Approach:
1. Build adjacency list: \`adj[u] = [{ node: v, time: w }]\`.
2. Initialize distance array \`dist\` filled with Infinity, and \`dist[k] = 0\`.
3. Priority Queue stores \`[currentDistance, currentNode]\` sorted by smallest distance.
4. While PQ is not empty:
   - Pop \`[d, u]\`. If \`d > dist[u]\`, skip (stale entry).
   - For each neighbor \`{ node: v, time: w }\`:
     - If \`dist[u] + w < dist[v]\`:
       - \`dist[v] = dist[u] + w\`.
       - Push \`[dist[v], v]\` into PQ.
5. Find \`maxDist = Math.max(...dist.slice(1))\`. Return \`maxDist === Infinity ? -1 : maxDist\`.

Complexity: Time O(E log V), Space O(V + E).`,
    starterCode: {
      javascript: `function networkDelayTime(times, n, k) {
  const adj = Array.from({ length: n + 1 }, () => []);
  for (const [u, v, w] of times) adj[u].push({ node: v, weight: w });
  
  const dist = new Array(n + 1).fill(Infinity);
  dist[k] = 0;
  const pq = [{ node: k, d: 0 }];
  
  while (pq.length > 0) {
    pq.sort((a, b) => a.d - b.d);
    const { node: curr, d } = pq.shift();
    if (d > dist[curr]) continue;
    
    for (const { node: next, weight } of adj[curr]) {
      if (dist[curr] + weight < dist[next]) {
        dist[next] = dist[curr] + weight;
        pq.push({ node: next, d: dist[next] });
      }
    }
  }
  
  let maxD = 0;
  for (let i = 1; i <= n; i++) {
    if (dist[i] === Infinity) return -1;
    maxD = Math.max(maxD, dist[i]);
  }
  return maxD;
}`
    }
  },
  {
    id: 'uber-3',
    company: 'uber',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'Concurrency & Distributed Locking',
    subject: 'system-design',
    question: 'How do you prevent race conditions when two Uber drivers accept the exact same ride request simultaneously?',
    keyConcepts: ['Distributed Locking (Redis Redlock / ZooKeeper)', 'Database Conditional Update (Compare-and-Set)', 'Optimistic Concurrency Control', 'Short TTL Leases'],
    tips: 'Use an atomic database conditional update (`UPDATE rides SET driver_id = ?, status = "ACCEPTED" WHERE id = ? AND status = "OFFERED"`) as the ultimate source of truth.',
    idealAnswer: `Race Condition Prevention:
1. Distributed Lock: When Driver A taps 'Accept', the gateway attempts to acquire an in-memory lock: \`SET lock:ride:{rideId} {driverAId} NX PX 5000\`.
2. Atomic DB Conditional Update:
   - \`UPDATE rides SET driver_id = :driverId, status = 'ACCEPTED' WHERE id = :rideId AND status = 'OFFERED';\`
   - Relational DB row-level locking guarantees that only the first transaction updates 1 row; the second concurrent update affects 0 rows.
3. Client Feedback: If rows affected === 1, Driver A is assigned the ride. If rows affected === 0, return immediate error to Driver B ("Ride has already been taken") and refresh their dispatch queue.`
  },
  {
    id: 'uber-4',
    company: 'uber',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'System Design - Surge Pricing Engine',
    subject: 'system-design',
    question: 'How would you design Uber\'s Real-Time Surge Pricing Engine calculating supply/demand multipliers per geospatial cell?',
    keyConcepts: ['Apache Flink Sliding Windows', 'Supply vs Demand Geospatial Aggregation', 'Dynamic Multiplier Pricing Curve', 'Price Lock Guarantees (2-minute window)'],
    tips: 'Demand is tracked via open app sessions / ride requests per H3 cell; supply is tracked via idle driver pings. Multipliers are computed over sliding 5-minute windows.',
    idealAnswer: `Surge Pricing Architecture:
1. Telemetry Streams:
   - Demand Stream: App opens and ride request events published to Kafka.
   - Supply Stream: Available driver location heartbeats.
2. Real-Time Stream Analytics (Apache Flink): Aggregates counts per H3 Hexagon cell over a 5-minute sliding window (updated every 15 seconds).
3. Surge Calculation Formula: \`SurgeMultiplier = f(Demand / Supply)\`. If Demand > Supply * threshold, multiplier scales from 1.2x to 3.5x.
4. Price Lock Mechanism: When rider views estimated fare, server issues a signed cryptographic price token with a 2-minute TTL ensuring the quote remains valid during checkout.`
  },
  {
    id: 'uber-5',
    company: 'uber',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Intervals & Min-Heap',
    subject: 'dsa',
    question: 'Meeting Rooms II (Minimum Vehicles Needed): Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], find the minimum number of conference rooms (or Uber vehicles) required to support all trips.',
    keyConcepts: ['Min-Heap', 'Interval Sorting', 'Concurrent active trips', 'O(N log N) Time Complexity'],
    tips: 'Sort intervals by start time. Use a Min-Heap tracking end times of active meetings. If current start >= min heap root, pop and reuse the room.',
    idealAnswer: `Min-Heap Algorithm:
1. If intervals array is empty, return 0.
2. Sort intervals ascending by start time: \`intervals.sort((a, b) => a[0] - b[0])\`.
3. Initialize a Min-Heap storing active end times.
4. Push the end time of the first interval: \`minHeap.push(intervals[0][1])\`.
5. For i = 1 to intervals.length - 1:
   - If \`intervals[i][0] >= minHeap.peek()\` (an existing room freed up): pop from minHeap.
   - Push \`intervals[i][1]\` into minHeap.
6. The size of the minHeap is the minimum rooms/vehicles required.

Complexity: Time O(N log N), Space O(N).`,
    starterCode: {
      javascript: `function minMeetingRooms(intervals) {
  if (!intervals || intervals.length === 0) return 0;
  intervals.sort((a, b) => a[0] - b[0]);
  
  const heap = []; // min-heap of end times
  for (const [start, end] of intervals) {
    if (heap.length > 0 && heap[0] <= start) {
      heap.shift(); // room freed up
    }
    heap.push(end);
    heap.sort((a, b) => a - b);
  }
  return heap.length;
}`
    }
  },
  {
    id: 'uber-6',
    company: 'uber',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'Distributed Tracing & Observability',
    subject: 'system-design',
    question: 'Explain Jaeger Distributed Tracing created by Uber: Trace ID, Span ID, Baggage Items, and Trace Sampling.',
    keyConcepts: ['W3C TraceContext', 'Trace ID & Span ID propagation', 'Context Injection in gRPC / HTTP headers', 'Probabilistic & Adaptive Sampling', 'OpenTelemetry Standard'],
    tips: 'Explain that Trace ID identifies the entire end-to-end request across 50 microservices, while Span ID identifies a single unit of work in one microservice.',
    idealAnswer: `Jaeger Architecture:
1. Core Concepts:
   - Trace ID: 64/128-bit global ID passed across all downstream RPC network hops via HTTP headers (\`traceparent\`).
   - Span ID: Identifies individual execution segments within a service with start/end timestamps, tags, and error logs.
2. Client Library: Injects TraceContext into outgoing network requests and extracts context on incoming calls.
3. Sampling: Because tracing 100% of 10B events causes high storage costs, Jaeger uses Adaptive Sampling (e.g. 0.1% baseline sampling, auto-increasing to 100% for errors and high-latency outlier requests).
4. Storage & UI: Agents forward UDP spans -> Jaeger Collectors batch-write to Cassandra/Elasticsearch for real-time visualization.`
  },
  {
    id: 'uber-7',
    company: 'uber',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'hard',
    category: 'DSA - Dynamic Programming',
    subject: 'dsa',
    question: 'Regular Expression Matching: Given an input string s and a pattern p, implement regular expression matching with support for \'.\' (matches any single character) and \'*\' (matches zero or more of the preceding element).',
    keyConcepts: ['2D Dynamic Programming', 'State Machine', 'Wildcard matching', 'O(M * N) Time Complexity'],
    tips: 'When encountering \'*\', it can either represent zero occurrences of preceding character (dp[i][j-2]) or one/more occurrences (dp[i-1][j] if char matches).',
    idealAnswer: `2D DP Recurrence:
Let \`dp[i][j]\` be true if \`s[0...i-1]\` matches \`p[0...j-1]\`.
1. Base cases: \`dp[0][0] = true\`. For \`j >= 2\`, \`dp[0][j] = p[j-1] === '*' && dp[0][j-2]\`.
2. Transition for i > 0, j > 0:
   - If \`p[j-1] === s[i-1] || p[j-1] === '.'\`:
     \`dp[i][j] = dp[i-1][j-1]\`
   - Else if \`p[j-1] === '*'\`:
     - 0 occurrences: \`dp[i][j] = dp[i][j-2]\`
     - 1+ occurrences: If \`p[j-2] === s[i-1] || p[j-2] === '.'\`, \`dp[i][j] = dp[i][j] || dp[i-1][j]\`.

Complexity: Time O(M * N), Space O(M * N).`,
    starterCode: {
      javascript: `function isMatch(s, p) {
  const m = s.length, n = p.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
  dp[0][0] = true;
  
  for (let j = 2; j <= n; j++) {
    if (p[j - 1] === '*') dp[0][j] = dp[0][j - 2];
  }
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (p[j - 1] === s[i - 1] || p[j - 1] === '.') {
        dp[i][j] = dp[i - 1][j - 1];
      } else if (p[j - 1] === '*') {
        dp[i][j] = dp[i][j - 2];
        if (p[j - 2] === s[i - 1] || p[j - 2] === '.') {
          dp[i][j] = dp[i][j] || dp[i - 1][j];
        }
      }
    }
  }
  return dp[m][n];
}`
    }
  },
  {
    id: 'uber-8',
    company: 'uber',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'Databases & Schemaless Storage',
    subject: 'dbms',
    question: 'How did Uber design Schemaless (built on top of MySQL) to store billions of trips with high availability and linear scaling?',
    keyConcepts: ['Append-Only Sharded MySQL', 'Immutable Trip Cells', 'Secondary Index Shards', 'Master-Master Active-Active replication', 'Idempotent updates'],
    tips: 'Schemaless avoids complex MySQL ALTER TABLE locks by treating rows as immutable key-value cells with version numbers.',
    idealAnswer: `Uber Schemaless Architecture:
1. Core Concept: Schemaless stores data in immutable cells: \`{ row_key, column_name, ref_key (version) }\` inside thousands of sharded MySQL instances.
2. Append-Only Writes: Never executes \`UPDATE\` in-place. Modifying a trip appends a new row with \`ref_key = previous_ref_key + 1\`, eliminating database lock contention.
3. Secondary Indexing: Dedicated background workers consume MySQL binlogs and populate separate index shards for search queries (e.g. searching trips by city or riderId).
4. Zero-Downtime Schema Changes: Adding new fields requires zero DDL table alters, allowing Uber to ship features rapidly.`
  },
  {
    id: 'uber-9',
    company: 'uber',
    role: 'software-developer',
    type: 'behavioral',
    difficulty: 'medium',
    category: 'Uber Cultural Values - Build with Heart',
    subject: 'hr',
    question: 'Describe a high-stakes incident where an active production service was failing and you had to troubleshoot under extreme pressure.',
    keyConcepts: ['Incident Command', 'Triage & Blast Radius Containment', 'Canary Rollback', 'Blameless Post-Mortem', 'Customer Communication'],
    tips: 'Emphasize calm structured thinking: first stop the bleeding (containment/rollback), second investigate root cause, third implement permanent safeguards.',
    idealAnswer: `Model Response (STAR):
- Situation: During morning rush hour, our driver dispatch service began throwing 500 errors for 20% of users in our largest metropolitan region.
- Task: Restore dispatch operations within 10 minutes to minimize passenger strandings and driver downtime.
- Action: Acting as Incident Commander, I verified our canary deployment logs and identified that a recent configuration change introduced a connection pool saturation bug. I immediately executed an automated traffic diversion to our secondary region and rolled back the canary release.
- Result: System recovery completed in 6 minutes. Later that afternoon, I led a blameless postmortem and implemented automated canary health verification in our CI/CD pipeline.`
  },
  {
    id: 'uber-10',
    company: 'uber',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Matrix / BFS',
    subject: 'dsa',
    question: '01 Matrix (Nearest Distance to 0): Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell (distance between two adjacent cells is 1).',
    keyConcepts: ['Multi-Source BFS', 'Queue-based BFS', 'Matrix manipulation', 'O(M * N) Time Complexity'],
    tips: 'Instead of searching from every 1 to find a 0 (O(M^2 * N^2)), start a Multi-Source BFS simultaneously from all 0 cells outwards (O(M * N)).',
    idealAnswer: `Multi-Source BFS Approach:
1. Initialize queue with all coordinates (r, c) where \`mat[r][c] === 0\`.
2. For all other cells (where value is 1), mark their distance as \`Infinity\`.
3. Process BFS queue:
   - Pop cell \`[r, c]\`.
   - For 4 directional neighbors \`[nr, nc]\`:
     - If \`mat[nr][nc] > mat[r][c] + 1\`:
       - \`mat[nr][nc] = mat[r][c] + 1\`.
       - Push \`[nr, nc]\` into queue.
4. Return updated matrix \`mat\`.

Complexity: Time O(M * N), Space O(M * N).`,
    starterCode: {
      javascript: `function updateMatrix(mat) {
  const m = mat.length, n = mat[0].length;
  const queue = [];
  
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (mat[r][c] === 0) {
        queue.push([r, c]);
      } else {
        mat[r][c] = Infinity;
      }
    }
  }
  
  const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  while (queue.length > 0) {
    const [r, c] = queue.shift();
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && mat[nr][nc] > mat[r][c] + 1) {
        mat[nr][nc] = mat[r][c] + 1;
        queue.push([nr, nc]);
      }
    }
  }
  return mat;
}`
    }
  }
];
