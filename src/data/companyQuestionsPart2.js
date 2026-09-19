/**
 * Part 2: Top Tier Product Companies (Adobe, Apple, Atlassian, Flipkart, Goldman Sachs, Oracle)
 * 6 Companies x 10 Questions = 60 Questions
 */

export const COMPANY_QUESTIONS_PART2 = [
  // ==========================================
  // 7. ADOBE (Top Product Tier-1)
  // ==========================================
  {
    id: 'adobe-1',
    company: 'adobe',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'System Design - Real-Time Collaboration',
    subject: 'system-design',
    question: 'How would you design Adobe Creative Cloud / Figma Real-Time Multi-User Canvas Sync using Conflict-Free Replicated Data Types (CRDTs) or Operational Transformation (OT)?',
    keyConcepts: ['CRDTs (State-based vs Operation-based)', 'Operational Transformation (OT)', 'Vector Graphics Chunking', 'WebSocket Delta Streaming', 'Spatial Indexing for Canvas Viewport'],
    tips: 'Contrast CRDTs (commutative operations with eventual consistency and no central arbiter) with OT (requires central server to transform concurrent operations).',
    idealAnswer: `Adobe Real-Time Canvas Architecture:
1. Concurrency Control (CRDTs): Each vector shape or layer has a globally unique ID (UUID + Lamport Timestamp). Operations (move, resize, color change) are modeled as commutative CRDT operations (LWW-Element-Set or RGA), meaning clients can apply operations in any order and converge to identical canvas state.
2. Network Protocol: WebSockets stream binary Protobuf deltas. Ephemeral sync servers route deltas to users viewing the same document ID.
3. Viewport Culling & Tiling: Canvas is divided into 2D spatial tiles (QuadTree / R-Tree). Clients only download high-resolution vector geometry for the bounding box currently visible on screen.
4. Persistence: Periodic vector snapshots saved to S3 every 60s with an append-only transaction log in DynamoDB.`
  },
  {
    id: 'adobe-2',
    company: 'adobe',
    role: 'cpp-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'C++ Internals & Smart Pointers',
    subject: 'oop',
    question: 'Explain std::unique_ptr, std::shared_ptr, std::weak_ptr in modern C++, their internal control blocks, and how weak_ptr breaks cyclic reference memory leaks.',
    keyConcepts: ['std::unique_ptr (Zero overhead move-only)', 'std::shared_ptr (Reference Counting Control Block)', 'std::weak_ptr (Non-owning observer)', 'Circular Dependency Memory Leaks', 'std::make_shared memory locality'],
    tips: 'Explain that shared_ptr maintains two atomic counters in its control block: strong ref count (owning pointers) and weak ref count (weak observers).',
    idealAnswer: `C++ Smart Pointer Internals:
1. std::unique_ptr: Owns a resource exclusively. Cannot be copied, only moved via std::move(). Zero runtime overhead compared to raw pointers.
2. std::shared_ptr: Shared ownership via reference counting. The heap-allocated control block stores: strong_ref_count, weak_ref_count, custom deleter, and allocator. Resource is freed when strong_ref_count drops to 0.
3. std::weak_ptr: Non-owning observer that points to a shared_ptr without incrementing strong_ref_count. Used to break cyclic graphs (e.g. Parent -> Child and Child -> Parent).
4. Cycle Resolution: If two objects hold shared_ptr to each other, strong_ref_count never reaches 0 (memory leak). Changing one back-pointer to weak_ptr resolves the leak.`
  },
  {
    id: 'adobe-3',
    company: 'adobe',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'hard',
    category: 'DSA - String & Manacher\'s Algorithm',
    subject: 'dsa',
    question: 'Longest Palindromic Substring: Given a string s, return the longest palindromic substring in s in O(N) time with Manacher\'s Algorithm or O(N^2) Expand Around Center.',
    keyConcepts: ['Manacher\'s Algorithm', 'Expand Around Center', 'Symmetry radius array P[]', 'O(N) Time Complexity'],
    tips: 'Expand around center has 2N-1 centers (single char centers and between-char centers). Manacher\'s algorithm inserts \'#\' separators and leverages symmetry.',
    idealAnswer: `Expand Around Center Approach (O(N^2) time, O(1) space):
1. If s.length < 2, return s.
2. Initialize start = 0, maxLen = 1.
3. Helper expand(left, right):
   - While left >= 0 && right < s.length && s[left] === s[right]: left--, right++.
   - If (right - left - 1) > maxLen: maxLen = right - left - 1, start = left + 1.
4. Iterate i from 0 to s.length - 1:
   - expand(i, i) (odd length palindromes).
   - expand(i, i + 1) (even length palindromes).
5. Return s.slice(start, start + maxLen).

Complexity: Time O(N^2) (or O(N) using Manacher's), Space O(1).`,
    starterCode: {
      javascript: `function longestPalindrome(s) {
  if (!s || s.length < 2) return s;
  let start = 0, maxLen = 1;
  
  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      l--;
      r++;
    }
    const len = r - l - 1;
    if (len > maxLen) {
      maxLen = len;
      start = l + 1;
    }
  }
  
  for (let i = 0; i < s.length; i++) {
    expand(i, i);
    expand(i, i + 1);
  }
  return s.slice(start, start + maxLen);
}`
    }
  },
  {
    id: 'adobe-4',
    company: 'adobe',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'Design Patterns - Undo/Redo Engine',
    subject: 'oop',
    question: 'Design an Undo / Redo system for Adobe Photoshop using the Command Pattern and Memento Pattern.',
    keyConcepts: ['Command Pattern (execute, undo)', 'Memento Pattern (state snapshots)', 'Undo Stack and Redo Stack', 'Memory management for raster history'],
    tips: 'Explain why storing full bitmap snapshots for 100 history steps exhausts RAM, and how Command actions store reversible delta operations instead.',
    idealAnswer: `Photoshop Undo/Redo Architecture:
1. Command Pattern: Abstract class \`CanvasCommand\` with methods: \`execute()\`, \`undo()\`, \`redo()\`.
2. Stack Management:
   - \`undoStack\`: Stores executed commands.
   - \`redoStack\`: Stores undone commands.
   - When user executes a new command: push to \`undoStack\` and clear \`redoStack\`.
   - When user triggers Undo: pop command from \`undoStack\`, call \`command.undo()\`, push to \`redoStack\`.
   - When user triggers Redo: pop from \`redoStack\`, call \`command.redo()\`, push to \`undoStack\`.
3. Memory Optimization: Commands store vector/geometric parameters (e.g. line from (x1, y1) to (x2, y2)) rather than full raster bitmaps.`
  },
  {
    id: 'adobe-5',
    company: 'adobe',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'hard',
    category: 'DSA - Range Queries & Trees',
    subject: 'dsa',
    question: 'Range Sum Query - Mutable: Given an integer array nums, handle multiple queries of two types: 1. Update the value of an element at index, 2. Calculate sum of elements between indices left and right in O(log N) time.',
    keyConcepts: ['Segment Tree', 'Fenwick Tree (Binary Indexed Tree)', 'Point Update O(log N)', 'Range Query O(log N)'],
    tips: 'Fenwick Tree (BIT) uses bitwise operations (i += i & (-i)) for compact O(N) array storage with lightning fast O(log N) updates.',
    idealAnswer: `Binary Indexed Tree (Fenwick Tree) Approach:
1. Maintain \`tree[]\` of size N + 1.
2. update(index, delta):
   - While index <= N: \`tree[index] += delta\`, \`index += index & (-index)\`.
3. query(index):
   - sum = 0.
   - While index > 0: \`sum += tree[index]\`, \`index -= index & (-index)\`.
   - Return sum.
4. Range sum [left, right] = query(right + 1) - query(left).

Complexity: Construction O(N log N) or O(N), Update O(log N), Range Query O(log N). Space O(N).`,
    starterCode: {
      javascript: `class NumArray {
  constructor(nums) {
    this.n = nums.length;
    this.nums = new Array(this.n).fill(0);
    this.tree = new Array(this.n + 1).fill(0);
    for (let i = 0; i < this.n; i++) {
      this.update(i, nums[i]);
    }
  }
  
  update(index, val) {
    const diff = val - this.nums[index];
    this.nums[index] = val;
    let i = index + 1;
    while (i <= this.n) {
      this.tree[i] += diff;
      i += i & (-i);
    }
  }
  
  _query(index) {
    let sum = 0;
    let i = index + 1;
    while (i > 0) {
      sum += this.tree[i];
      i -= i & (-i);
    }
    return sum;
  }
  
  sumRange(left, right) {
    return this._query(right) - this._query(left - 1);
  }
}`
    }
  },
  {
    id: 'adobe-6',
    company: 'adobe',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Graph / Disjoint Set Union',
    subject: 'dsa',
    question: 'Number of Connected Components in an Undirected Graph: Given n nodes labeled from 0 to n - 1 and a list of undirected edges, return the total number of connected components.',
    keyConcepts: ['Disjoint Set Union (Union-Find)', 'Path Compression', 'Union by Rank', 'O(N * alpha(N)) Complexity'],
    tips: 'Initialize parent array with each node pointing to itself (count = n). For each edge, union the sets; if they were in different sets, decrement count by 1.',
    idealAnswer: `Union-Find (DSU) Algorithm:
1. Initialize \`parent\` array where \`parent[i] = i\`, \`rank\` array filled with 0, and \`count = n\`.
2. Find function with Path Compression:
   - \`find(i) = parent[i] === i ? i : (parent[i] = find(parent[i]))\`.
3. Union function:
   - Find rootU = find(u), rootV = find(v).
   - If rootU !== rootV:
     - Attach smaller rank under larger rank.
     - Decrement \`count--\`.
4. Iterate all edges and apply union. Return \`count\`.

Complexity: Time O(E * α(V)) ≈ O(E), Space O(V).`,
    starterCode: {
      javascript: `function countComponents(n, edges) {
  const parent = Array.from({ length: n }, (_, i) => i);
  let count = n;
  
  function find(i) {
    if (parent[i] === i) return i;
    return parent[i] = find(parent[i]); // path compression
  }
  
  for (const [u, v] of edges) {
    const rootU = find(u);
    const rootV = find(v);
    if (rootU !== rootV) {
      parent[rootU] = rootV;
      count--;
    }
  }
  return count;
}`
    }
  },
  {
    id: 'adobe-7',
    company: 'adobe',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'Computer Graphics & Rasterization',
    subject: 'dsa',
    question: 'Explain Bresenham\'s Line Generation Algorithm, Anti-Aliasing, and why integer-only arithmetic is preferred in graphics engines.',
    keyConcepts: ['Bresenham\'s Line Algorithm', 'Decision Parameter D = 2*dy - dx', 'Integer Arithmetic vs Floating Point', 'Super-Sampling Anti-Aliasing (SSAA)'],
    tips: 'Bresenham eliminates slow floating-point multiplications by multiplying the slope line equation by 2*dx, using only addition and bit-shifts.',
    idealAnswer: `Bresenham Graphics Principles:
1. Problem: Draw a raster line between (x0, y0) and (x1, y1) on a pixel grid without gaps or floating point calculation.
2. Decision Parameter: Bresenham tracks an error term \`D = 2*dy - dx\`.
   - At each step x = x + 1:
   - If D > 0: increment y = y + 1, and update \`D = D + 2*(dy - dx)\`.
   - Else: y stays same, update \`D = D + 2*dy\`.
3. Performance Advantage: Uses only CPU hardware integer additions and bitwise shifts, avoiding costly floating point arithmetic (IEEE 754) on vector raster pipelines.
4. Anti-Aliasing: Smooths jagged pixel staircases ("jaggies") by calculating fractional pixel coverage and blending color alpha channels.`
  },
  {
    id: 'adobe-8',
    company: 'adobe',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - String & Stack',
    subject: 'dsa',
    question: 'Decode String: Given an encoded string s formatted as k[encoded_string], return its decoded string (e.g., "3[a2[c]]" -> "accaccacc").',
    keyConcepts: ['Stack-based parsing', 'Nested brackets', 'String multiplication', 'O(N) Time Complexity'],
    tips: 'Use two stacks (countStack and stringStack) or recursion. When \'[\' is seen, push current count and string. When \']\' is seen, pop and repeat string.',
    idealAnswer: `Stack Parsing Approach:
1. Maintain \`countStack = []\`, \`strStack = []\`, \`currStr = ""\`, \`currNum = 0\`.
2. Traverse string characters:
   - Digit: \`currNum = currNum * 10 + parseInt(char)\`.
   - \'[\': push \`currNum\` to countStack, \`currStr\` to strStack. Reset \`currNum = 0, currStr = ""\`.
   - \']\': pop \`k\` from countStack and \`prevStr\` from strStack. \`currStr = prevStr + currStr.repeat(k)\`.
   - Character: \`currStr += char\`.
3. Return currStr.

Complexity: Time O(Output Length), Space O(Output Length).`,
    starterCode: {
      javascript: `function decodeString(s) {
  const countStack = [];
  const strStack = [];
  let currStr = '';
  let currNum = 0;
  
  for (const char of s) {
    if (char >= '0' && char <= '9') {
      currNum = currNum * 10 + (char - '0');
    } else if (char === '[') {
      countStack.push(currNum);
      strStack.push(currStr);
      currNum = 0;
      currStr = '';
    } else if (char === ']') {
      const k = countStack.pop();
      const prev = strStack.pop();
      currStr = prev + currStr.repeat(k);
    } else {
      currStr += char;
    }
  }
  return currStr;
}`
    }
  },
  {
    id: 'adobe-9',
    company: 'adobe',
    role: 'software-developer',
    type: 'behavioral',
    difficulty: 'medium',
    category: 'Adobe Values - Exceptional Craft & Creativity',
    subject: 'hr',
    question: 'Tell me about a complex legacy refactor where you dramatically improved application performance without altering existing user workflows.',
    keyConcepts: ['Legacy Refactoring', 'Performance Profiling', 'Regression Testing', 'Zero User Disruption', 'Measurable Speedup'],
    tips: 'Focus on profiling tools (Flamegraphs, memory allocators), baseline benchmark metrics, and thorough regression testing.',
    idealAnswer: `Model Response (STAR):
- Situation: Our document rendering engine took 4.2 seconds to parse large SVG files with over 10,000 path nodes, freezing the UI thread.
- Task: Accelerate rendering to < 500ms without breaking SVG standard compatibility.
- Action: I profiled the renderer using Chrome DevTools and identified repeated DOM layout recalculations. I refactored the pipeline to parse paths off-thread in a Web Worker, batch drawing operations onto an OffscreenCanvas, and applied spatial QuadTree indexing to skip off-screen paths.
- Result: Document render latency plunged from 4.2s to 280ms (15x speedup) with 100% pass rate on our 400 SVG compliance integration tests.`
  },
  {
    id: 'adobe-10',
    company: 'adobe',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Matrix & Simulation',
    subject: 'dsa',
    question: 'Spiral Matrix: Given an m x n matrix, return all elements of the matrix in spiral order (clockwise starting from top-left).',
    keyConcepts: ['Matrix Traversal', '4 Boundary Pointers (top, bottom, left, right)', 'O(M * N) Time and O(1) Space'],
    tips: 'Maintain top, bottom, left, right boundaries. Shrink corresponding boundary after completing each row/column traversal.',
    idealAnswer: `4-Pointer Boundary Algorithm:
1. Initialize \`top = 0, bottom = m - 1, left = 0, right = n - 1\`, and \`result = []\`.
2. While \`top <= bottom && left <= right\`:
   - Traverse Left to Right along \`top\` row. \`top++\`.
   - Traverse Top to Bottom along \`right\` column. \`right--\`.
   - If \`top <= bottom\`: Traverse Right to Left along \`bottom\` row. \`bottom--\`.
   - If \`left <= right\`: Traverse Bottom to Top along \`left\` column. \`left++\`.
3. Return result.

Complexity: Time O(M * N), Space O(1) auxiliary space.`,
    starterCode: {
      javascript: `function spiralOrder(matrix) {
  if (!matrix || matrix.length === 0) return [];
  const res = [];
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;
  
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) res.push(matrix[top][c]);
    top++;
    for (let r = top; r <= bottom; r++) res.push(matrix[r][right]);
    right--;
    if (top <= bottom) {
      for (let c = right; c >= left; c--) res.push(matrix[bottom][c]);
      bottom--;
    }
    if (left <= right) {
      for (let r = bottom; r >= top; r--) res.push(matrix[r][left]);
      left++;
    }
  }
  return res;
}`
    }
  },

  // ==========================================
  // 8. APPLE (Top Product Tier-1)
  // ==========================================
  {
    id: 'apple-1',
    company: 'apple',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'Operating Systems & Low-Level Architecture',
    subject: 'os',
    question: 'Explain Mach Microkernel architecture in macOS / iOS, Virtual Memory Zones, and Automatic Reference Counting (ARC) vs Garbage Collection.',
    keyConcepts: ['Mach Microkernel + BSD POSIX Layer', 'Mach IPC Message Passing', 'Jetsam Memory Killer daemon', 'ARC compile-time retain/release injection', 'No GC Stop-The-World pauses'],
    tips: 'Explain why Apple chose ARC over Garbage Collection: deterministic memory cleanup without random GC battery drain or UI frame drops.',
    idealAnswer: `macOS / iOS Kernel & Memory:
1. XNU Hybrid Kernel: Combines Mach Microkernel (threads, IPC ports, low-level scheduling) with BSD Layer (POSIX APIs, networking, BSD process model).
2. ARC (Automatic Reference Counting): Unlike Java/V8 Garbage Collectors that pause execution (Stop-The-World), Swift/Obj-C ARC inserts \`retain\` and \`release\` calls at compile-time. Memory is deallocated the instant reference count hits 0.
3. Jetsam Daemon: Monitors physical RAM pressure. When system memory is constrained, Jetsam aggressively terminates background apps using a priority matrix to guarantee foreground UI fluidity.
4. Memory Zones: Uses Mach VM zones with fine-grained slab allocators for sub-millisecond memory allocations.`
  },
  {
    id: 'apple-2',
    company: 'apple',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Bit Manipulation',
    subject: 'dsa',
    question: 'Single Number II: Given an integer array nums where every element appears exactly three times except for one element which appears exactly once, find that single element in O(N) time and O(1) space.',
    keyConcepts: ['Bit Manipulation', 'Bitwise State Machine (ones, twos)', 'Modulo 3 bit counting', 'O(1) Space Complexity'],
    tips: 'Track bits appearing 1 time and 2 times using two integer bitmasks: ones and twos. When a bit appears 3 times, clear it from both.',
    idealAnswer: `Bitwise State Machine:
1. Maintain two variables: \`ones = 0\` (bits appearing 1 time % 3) and \`twos = 0\` (bits appearing 2 times % 3).
2. Loop through each number x:
   - \`ones = (ones ^ x) & ~twos\` (add x to ones if not in twos).
   - \`twos = (twos ^ x) & ~ones\` (add x to twos if not in ones).
3. Return \`ones\`.

Complexity: Time O(N) single pass. Space O(1) strictly constant space.`,
    starterCode: {
      javascript: `function singleNumber(nums) {
  let ones = 0, twos = 0;
  for (const x of nums) {
    ones = (ones ^ x) & ~twos;
    twos = (twos ^ x) & ~ones;
  }
  return ones;
}`
    }
  },
  {
    id: 'apple-3',
    company: 'apple',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'System Design - Push Notifications',
    subject: 'system-design',
    question: 'How would you design Apple Push Notification service (APNs) handling billions of persistent connections with minimal mobile battery drain?',
    keyConcepts: ['Long-Lived TLS Connections', 'TCP Keep-Alive & Adaptive Heartbeats', 'Device Tokens & TLS Cryptographic Verification', 'Priority Queues (Immediate vs Power-Efficient)', 'Push Gateway Sharding'],
    tips: 'Explain that the device maintains ONE single TCP connection to APNs for all installed apps on iOS, rather than each app opening its own socket.',
    idealAnswer: `APNs Architecture:
1. Unified Persistent Connection: iOS maintains a single multiplexed TLS connection over TCP to APNs gateway servers. All app notifications share this one socket, saving cellular battery.
2. Adaptive Heartbeat: Client sends heartbeat pings at dynamic intervals (e.g. 15-30 minutes on Wi-Fi, extended on cellular) to keep NAT router firewalls open.
3. Notification Routing: Third-party server submits JSON payload with Device Token -> APNs Gateway decrypts token, validates auth certificate -> routes payload to the specific gateway server holding that device's active socket.
4. Power Priority:
   - High Priority (Priority 10): Wakes device radio immediately.
   - Normal Priority (Priority 5): Batches notifications until the next device wakeup window.`
  },
  {
    id: 'apple-4',
    company: 'apple',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Design & Trie',
    subject: 'dsa',
    question: 'Design Add and Search Words Data Structure: Design a data structure that supports adding new words and finding if a string matches any previously added string with wildcard \'.\' matching any letter.',
    keyConcepts: ['Trie (Prefix Tree)', 'DFS Backtracking for Wildcard (.)', 'Recursive Search', 'TrieNode Structure'],
    tips: 'When searching a character, if char === \'.\', iterate through all 26 possible child nodes recursively using DFS.',
    idealAnswer: `Trie + DFS Backtracking:
1. TrieNode structure: \`children = {}\`, \`isEnd = false\`.
2. addWord(word): Insert character by character into Trie, mark \`isEnd = true\` at last character.
3. search(word): Helper \`searchInNode(word, index, node)\`:
   - If index === word.length: return \`node.isEnd\`.
   - If word[index] !== '.': If child exists, recurse on child; else return false.
   - If word[index] === '.': Iterate all keys in \`node.children\`; if any recursive call returns true, return true.
   - Return false.

Complexity: addWord is O(L), search is O(26^D) in worst case with all dots. Space O(Total characters).`,
    starterCode: {
      javascript: `class WordDictionary {
  constructor() {
    this.root = {};
  }
  addWord(word) {
    let node = this.root;
    for (const char of word) {
      if (!node[char]) node[char] = {};
      node = node[char];
    }
    node.isEnd = true;
  }
  search(word) {
    function dfs(idx, node) {
      if (idx === word.length) return !!node.isEnd;
      const c = word[idx];
      if (c !== '.') {
        if (!node[c]) return false;
        return dfs(idx + 1, node[c]);
      }
      for (const key in node) {
        if (key === 'isEnd') continue;
        if (dfs(idx + 1, node[key])) return true;
      }
      return false;
    }
    return dfs(0, this.root);
  }
}`
    }
  },
  {
    id: 'apple-5',
    company: 'apple',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'Concurrency - GCD & Threading',
    subject: 'os',
    question: 'Explain Grand Central Dispatch (GCD), Serial vs Concurrent Queues, Dispatch Groups, and how Main Thread deadlocks occur.',
    keyConcepts: ['Grand Central Dispatch (GCD)', 'Serial vs Concurrent Queue', 'DispatchGroup synchronization', 'Main Thread Deadlock (DispatchQueue.main.sync)', 'QoS (Quality of Service)'],
    tips: 'Never call DispatchQueue.main.sync from the main thread because the main thread blocks waiting for the block to execute, but the block cannot execute until the main thread finishes (deadlock).',
    idealAnswer: `GCD & iOS Concurrency:
1. Thread Management: GCD abstracts POSIX thread pools. Developers dispatch blocks to queues rather than manually managing threads.
2. Queues:
   - Serial Queue: Executes 1 task at a time in FIFO order. Guarantees serialization without explicit mutexes.
   - Concurrent Queue: Starts tasks in FIFO order but executes them concurrently across available CPU cores.
3. Quality of Service (QoS): UserInteractive (animations 60/120Hz), UserInitiated (immediate results), Utility (long-running calculations), Background (indexing/backups).
4. Deadlock Scenario: Calling \`DispatchQueue.main.sync\` while already on the main thread causes instantaneous deadlock because the queue waits for the thread to become idle while the thread is blocked waiting for the queue.`
  },
  {
    id: 'apple-6',
    company: 'apple',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Linked List / Deep Copy',
    subject: 'dsa',
    question: 'Copy List with Random Pointer: A linked list of length n is given such that each node contains an additional random pointer. Construct a deep copy of the list in O(N) time and O(1) auxiliary space.',
    keyConcepts: ['Linked List Node Interweaving', 'Random Pointer Clone', 'O(1) Space (no hash map)', 'Deep Copy'],
    tips: 'Interweave copied nodes next to original nodes: A -> A\' -> B -> B\'. Then set A\'.random = A.random.next. Finally decouple the two lists.',
    idealAnswer: `3-Step In-Place Cloning (O(1) Space):
1. Step 1 (Interweave): Iterate list. For each node \`curr\`, insert clone \`copy = new Node(curr.val)\` right after it: \`curr.next = copy\`.
2. Step 2 (Assign Randoms): Iterate list. For each original node \`curr\`: if \`curr.random\` exists, \`curr.next.random = curr.random.next\`.
3. Step 3 (Separate Lists): Restore original list pointers and extract cloned list.

Complexity: Time O(N) three passes. Space O(1) auxiliary space.`,
    starterCode: {
      javascript: `function copyRandomList(head) {
  if (!head) return null;
  
  // Step 1: Interweave cloned nodes
  let curr = head;
  while (curr) {
    const copy = { val: curr.val, next: curr.next, random: null };
    curr.next = copy;
    curr = copy.next;
  }
  
  // Step 2: Assign random pointers
  curr = head;
  while (curr) {
    if (curr.random) {
      curr.next.random = curr.random.next;
    }
    curr = curr.next.next;
  }
  
  // Step 3: Separate lists
  curr = head;
  const dummyHead = { next: null };
  let copyCurr = dummyHead;
  while (curr) {
    const copy = curr.next;
    curr.next = copy.next;
    copyCurr.next = copy;
    copyCurr = copy;
    curr = curr.next;
  }
  return dummyHead.next;
}`
    }
  },
  {
    id: 'apple-7',
    company: 'apple',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'System Design - CloudKit & Differential Sync',
    subject: 'system-design',
    question: 'How would you design Apple iCloud Photos Sync with End-to-End Encryption (E2EE) and Differential Delta Sync?',
    keyConcepts: ['Secure Enclave Key Derivation', 'Cryptographic Chunk Hashing (SHA-256)', 'Delta Deduplication', 'CRDTs for Album Metadata', 'CloudKit Record Zones'],
    tips: 'Only modified binary chunks are uploaded to cloud servers, and encryption keys never leave the client device\'s Secure Enclave.',
    idealAnswer: `iCloud Photos Architecture:
1. End-to-End Encryption (E2EE): Encryption keys are generated inside the device's hardware Secure Enclave. Raw photo blocks are encrypted client-side using AES-GCM before transmission; cloud servers store ciphertext without private keys.
2. Differential Chunking: High-resolution images/videos are split into variable-sized chunks (Content-Defined Chunking / Rabin Fingerprinting). When a photo is edited, only modified delta chunks are uploaded.
3. Metadata Sync (CloudKit): Album structures and tags use CRDTs (LWW-Register) to automatically merge concurrent edits made on iPhone and Mac without data loss.`
  },
  {
    id: 'apple-8',
    company: 'apple',
    role: 'cpp-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'Computer Architecture & Memory Alignment',
    subject: 'os',
    question: 'Explain Memory Alignment, Structure Padding, False Sharing, and Cache Line Bounce in modern ARM (Apple Silicon M-Series) architectures.',
    keyConcepts: ['64-byte Cache Lines', 'Data Structure Padding & Alignment', 'False Sharing in Multi-threading', '__attribute__((aligned(64)))', 'L1/L2/SLC Cache Hierarchy'],
    tips: 'False sharing happens when two independent variables modified by different CPU cores reside on the same 64-byte cache line, forcing continuous cache invalidation.',
    idealAnswer: `Memory Alignment & CPU Cache:
1. Memory Alignment: CPUs read memory in word chunks (4 or 8 bytes). Compilers insert padding bytes into structs so variables start at natural memory address multiples, preventing multi-cycle memory fetches.
2. False Sharing: Modern Apple Silicon cores have 64-byte L1 cache lines. If Thread 1 writes to variable A and Thread 2 writes to variable B, and both A and B share the same 64-byte line, the hardware cache coherence protocol (MESI) constantly invalidates the cache line across CPU cores.
3. Solution: Align concurrent variables to separate cache lines using \`alignas(64)\` or padding.`
  },
  {
    id: 'apple-9',
    company: 'apple',
    role: 'software-developer',
    type: 'behavioral',
    difficulty: 'medium',
    category: 'Apple Culture - Attention to Detail & Craft',
    subject: 'hr',
    question: 'Tell me about a time you prioritized obsessive attention to detail and user experience polish over quick delivery.',
    keyConcepts: ['Obsessive Craft', 'Pixel-Perfect UX', 'Accessibility & Performance', 'Micro-interactions', 'Apple DNA'],
    tips: 'Apple values craftsmanship, smooth 120Hz animations, accessibility, and zero visual glitches. Highlight how your attention to detail delighted users.',
    idealAnswer: `Model Response (STAR):
- Situation: During our photo viewer app release, our scroll view dropped frames from 60fps to 42fps when zooming into 4K panoramic images.
- Task: Ensure buttery-smooth 120Hz ProMotion fluid rendering without jitter.
- Action: I audited our render loop, decoupled image decoding from the main UI thread using an asynchronous image pipeline, implemented mipmapping, and tuned Spring physics animations to match native iOS tactile feedback curves.
- Result: Scrolling achieved a locked 120fps with zero frame drops, app store reviews specifically praised the smooth zoom responsiveness, and the component was made our team standard.`
  },
  {
    id: 'apple-10',
    company: 'apple',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - String & Two Pointers',
    subject: 'dsa',
    question: 'Valid Palindrome II: Given a string s, return true if the s can be palindrome after deleting at most one character from it.',
    keyConcepts: ['Two Pointers', 'Greedy deletion check', 'O(N) Time and O(1) Space', 'Palindrome validation'],
    tips: 'When characters mismatch at left and right, check if skipping either the left character or the right character results in a valid palindrome.',
    idealAnswer: `Two-Pointer Approach:
1. Initialize left = 0, right = s.length - 1.
2. Helper isPal(l, r): returns true if s[l...r] is a palindrome.
3. While left < right:
   - If s[left] === s[right]: left++, right--.
   - Else: return \`isPal(left + 1, right) || isPal(left, right - 1)\`.
4. Return true.

Complexity: Time O(N), Space O(1).`,
    starterCode: {
      javascript: `function validPalindrome(s) {
  function isPal(l, r) {
    while (l < r) {
      if (s[l] !== s[r]) return false;
      l++;
      r--;
    }
    return true;
  }
  
  let left = 0, right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) {
      return isPal(left + 1, right) || isPal(left, right - 1);
    }
    left++;
    right--;
  }
  return true;
}`
    }
  },

  // ==========================================
  // 9. ATLASSIAN (Top Product Tier-1)
  // ==========================================
  {
    id: 'atlassian-1',
    company: 'atlassian',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'System Design - Agile Kanban Board',
    subject: 'system-design',
    question: 'How would you design Jira\'s Real-Time Collaborative Kanban Board with workflow state machine transitions and live card movement?',
    keyConcepts: ['Finite State Machine (FSM) Transition Engine', 'WebSocket / SSE Delta Broadcasts', 'CQRS (Command Query Responsibility Segregation)', 'Optimistic UI Updates', 'Elasticsearch for JQL Querying'],
    tips: 'Explain how CQRS separates high-throughput workflow status updates from complex Jira Query Language (JQL) full-text searches.',
    idealAnswer: `Jira Kanban Board Architecture:
1. State Machine Engine: Jira issue statuses (To Do -> In Progress -> Done) are modeled as a Finite State Machine with validation guards (permissions, required fields).
2. Real-Time Card Sync:
   - When User A drags a card to 'Done', client optimistically moves card in UI and sends PUT request.
   - Server validates FSM transition -> writes to PostgreSQL -> emits \`ISSUE_MOVED\` event to Redis Pub/Sub.
   - WebSocket servers broadcast payload to all team members viewing that board ID in < 50ms.
3. CQRS Pattern: Write path commits to transactional PostgreSQL; asynchronous CDC (Debezium / Kafka) streams changes to Elasticsearch for instant JQL filtering.`
  },
  {
    id: 'atlassian-2',
    company: 'atlassian',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Design & Rate Limiter',
    subject: 'system-design',
    question: 'Design a Distributed Rate Limiter supporting Token Bucket and Sliding Window Log algorithms in Redis.',
    keyConcepts: ['Token Bucket Algorithm', 'Sliding Window Log with Redis ZSET', 'Atomic Redis Lua Script', 'HTTP 429 Too Many Requests & Retry-After'],
    tips: 'Use Redis Sorted Set (ZSET) where members and scores are request timestamps. Evict timestamps older than (now - window) using ZREMRANGEBYSCORE.',
    idealAnswer: `Sliding Window Log with Redis ZSET:
1. Data Structure: Key = \`rate_limit:{userId}\`, Value = Redis Sorted Set (ZSET) where score = timestamp (ms).
2. Algorithm execution (inside atomic Lua script):
   - Current time = \`now\`. Window size = \`W\` (e.g. 60,000ms), Limit = \`L\` (e.g. 100 requests).
   - Step 1: \`redis.call('ZREMRANGEBYSCORE', key, 0, now - W)\` (remove expired logs).
   - Step 2: \`currentCount = redis.call('ZCARD', key)\`.
   - Step 3: If \`currentCount < L\`:
     - \`redis.call('ZADD', key, now, now)\`.
     - \`redis.call('EXPIRE', key, W / 1000)\`.
     - Return ALLOW (true).
   - Step 4: Else return REJECT (false) and client sends HTTP 429.

Complexity: Time O(log N + M) where M is expired elements, Space O(L) per user.`
  },
  {
    id: 'atlassian-3',
    company: 'atlassian',
    role: 'java-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'Java Concurrency & Memory Model',
    subject: 'oop',
    question: 'Explain Java Memory Model (JMM), the volatile keyword, happens-before relationship, and ReentrantLock vs synchronized.',
    keyConcepts: ['Java Memory Model (JMM)', 'volatile (Visibility & Instruction Reordering barrier)', 'Happens-Before Rule', 'ReentrantLock (tryLock, fairness, condition variables)', 'AQS (AbstractQueuedSynchronizer)'],
    tips: 'Explain that volatile guarantees visibility across CPU core caches and prevents compiler reordering, but does NOT guarantee atomicity for compound operations like count++.',
    idealAnswer: `Java Concurrency Internals:
1. JMM & volatile: JMM governs how threads interact through memory. Each thread has local CPU cache. \`volatile\` forces reads/writes directly to main memory and inserts memory barriers (preventing compiler instruction reordering).
2. Happens-Before Guarantee: A write to a volatile variable happens-before every subsequent read of that volatile variable.
3. \`synchronized\` vs \`ReentrantLock\`:
   - \`synchronized\`: Implicit language-level monitor lock, auto-releases on exception, non-fair.
   - \`ReentrantLock\`: Explicit lock with advanced features: \`tryLock(timeout)\`, fair ordering policy, and multiple \`Condition\` objects (await/signal). Built on AQS framework.`
  },
  {
    id: 'atlassian-4',
    company: 'atlassian',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'hard',
    category: 'DSA - Monotonic Stack',
    subject: 'dsa',
    question: 'Largest Rectangle in Histogram: Given an array of integers heights representing the histogram\'s bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram in O(N) time.',
    keyConcepts: ['Monotonic Increasing Stack', 'Left/Right smaller boundaries', 'O(N) Time Complexity', 'Stack of Indices'],
    tips: 'Maintain a stack of indices with increasing heights. When a smaller height is found, pop and calculate area with height of popped bar and width between current index and new stack top.',
    idealAnswer: `Monotonic Stack Algorithm:
1. Initialize \`stack = []\` storing indices, and \`maxArea = 0\`.
2. Iterate \`i\` from 0 to heights.length (using 0 as virtual final element at index heights.length):
   - \`currH = i === heights.length ? 0 : heights[i]\`.
   - While stack is not empty and \`currH < heights[stack[stack.length - 1]]\`:
     - \`h = heights[stack.pop()]\`.
     - \`w = stack.length === 0 ? i : i - stack[stack.length - 1] - 1\`.
     - \`maxArea = Math.max(maxArea, h * w)\`.
   - Push \`i\` into stack.
3. Return maxArea.

Complexity: Time O(N) since each element pushed/popped once. Space O(N).`,
    starterCode: {
      javascript: `function largestRectangleArea(heights) {
  const stack = [];
  let maxArea = 0;
  
  for (let i = 0; i <= heights.length; i++) {
    const h = i === heights.length ? 0 : heights[i];
    while (stack.length > 0 && h < heights[stack[stack.length - 1]]) {
      const height = heights[stack.pop()];
      const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, height * width);
    }
    stack.push(i);
  }
  return maxArea;
}`
    }
  },
  {
    id: 'atlassian-5',
    company: 'atlassian',
    role: 'software-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'System Design - Collaborative Editor',
    subject: 'system-design',
    question: 'How would you design Confluence Real-Time Collaborative Document Editor with multi-cursor presence and version history?',
    keyConcepts: ['CRDTs (Yjs / Automerge) vs OT', 'WebSocket Gateway Clusters', 'Snapshotting & Delta Compaction in S3', 'Lucene / Elasticsearch Full-Text Search'],
    tips: 'Mention CRDT-based rich-text models (like Yjs Y.Doc) that allow decentralized peer-to-peer or client-server convergence without locking document sections.',
    idealAnswer: `Confluence Architecture:
1. Document Model: Document structure represented as a CRDT tree (Yjs / ProseMirror). Every keystroke produces an immutable delta operation containing unique client ID and clock.
2. Real-Time Sync: WebSocket connections pass deltas. The sync gateway acts as a dumb relay, broadcasting deltas to all co-authors on the document channel.
3. Cursor Presence: Broadcasts ephemeral JSON payloads: \`{ userId, color, cursorPosition: { line, ch } }\` via Redis Pub/Sub without writing to persistent database.
4. Versioning & Snapshots: Background worker compresses deltas into hourly document snapshots stored in S3 for revision history comparison.`
  },
  {
    id: 'atlassian-6',
    company: 'atlassian',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Graph / Cycle Detection',
    subject: 'dsa',
    question: 'Jira Issue Blocker Dependency Cycle Detection: Given n Jira tickets and an array of directed blocking relations [A, B] (meaning Ticket A blocks Ticket B), determine if the dependency graph contains an illegal circular dependency.',
    keyConcepts: ['DFS 3-Coloring Cycle Detection (0=White, 1=Gray, 2=Black)', 'Directed Cycle Detection', 'O(V + E) Complexity'],
    tips: 'Use 3 color states: 0 = unvisited, 1 = visiting (in current DFS recursion stack), 2 = completely visited. If a neighbor has color 1, a cycle exists.',
    idealAnswer: `DFS 3-Coloring Algorithm:
1. Build adjacency list for tickets: \`adj[u] = [v]\`.
2. Maintain \`visited\` array initialized to 0 for all nodes (0=Unvisited, 1=Visiting, 2=Visited).
3. Helper hasCycle(node):
   - Mark \`visited[node] = 1\` (entering recursion).
   - For each neighbor \`v\` of node:
     - If \`visited[v] === 1\`: return true (back-edge found -> cycle detected).
     - If \`visited[v] === 0\` && hasCycle(v): return true.
   - Mark \`visited[node] = 2\` (finished node).
   - Return false.
4. Loop through all nodes 0 to n - 1; if unvisited and hasCycle returns true, return true. Else return false.

Complexity: Time O(V + E), Space O(V + E).`,
    starterCode: {
      javascript: `function hasCircularDependency(n, blockers) {
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v] of blockers) adj[u].push(v);
  
  const visited = new Array(n).fill(0); // 0=unvisited, 1=visiting, 2=visited
  
  function dfs(curr) {
    visited[curr] = 1;
    for (const next of adj[curr]) {
      if (visited[next] === 1) return true; // cycle
      if (visited[next] === 0 && dfs(next)) return true;
    }
    visited[curr] = 2;
    return false;
  }
  
  for (let i = 0; i < n; i++) {
    if (visited[i] === 0 && dfs(i)) return true;
  }
  return false;
}`
    }
  },
  {
    id: 'atlassian-7',
    company: 'atlassian',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'Microservices & Idempotency',
    subject: 'system-design',
    question: 'How do you design reliable asynchronous inter-service communication with Idempotency Keys and the Transactional Outbox Pattern?',
    keyConcepts: ['Transactional Outbox Pattern', 'Debezium CDC (Change Data Capture)', 'Idempotency Key Header', 'At-Least-Once Delivery Guarantee', 'Distributed Transactions'],
    tips: 'The Outbox Pattern avoids dual-write inconsistencies by writing both the entity change and the event into the SAME relational database transaction.',
    idealAnswer: `Transactional Outbox & Idempotency:
1. Dual-Write Problem: Writing to a database and publishing to Kafka in the same API call can fail halfway, causing data inconsistency.
2. Outbox Pattern Solution:
   - Within the same DB transaction: insert/update the business entity AND insert an event row into an \`outbox_events\` table.
   - Debezium CDC / polling worker reads the outbox table binlog and publishes events to Kafka with guaranteed reliability.
3. Idempotency Key Handling:
   - Client sends \`Idempotency-Key: uuid\` in HTTP header.
   - Service stores the key in Redis/DB with result payload before execution. If duplicate request arrives within 24h, return cached response directly.`
  },
  {
    id: 'atlassian-8',
    company: 'atlassian',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Trie & Autocomplete',
    subject: 'dsa',
    question: 'Design Autocomplete Search for Jira User Mentions (@username): Implement a system that returns the top 3 matching usernames sorted by relevance for a given search prefix.',
    keyConcepts: ['Trie Data Structure', 'Top K caching at Trie nodes', 'Prefix Search', 'O(K) Query Latency'],
    tips: 'Store the top 3 matching user names directly inside each Trie node during word insertion so prefix queries run in O(prefix_length) without traversing subtrees.',
    idealAnswer: `Trie with Top-3 Node Caching:
1. TrieNode structure: \`children = {}\`, \`topUsers = []\` (stores top 3 usernames sharing this prefix).
2. insertUser(username):
   - Traverse Trie. At each visited node:
     - Add username to \`node.topUsers\`.
     - Keep \`node.topUsers\` sorted and trimmed to top 3.
3. searchPrefix(prefix):
   - Traverse Trie along prefix characters.
   - If prefix path does not exist, return [].
   - Return \`node.topUsers\`.

Complexity: Query is O(P) where P is prefix length, Space O(N * L).`,
    starterCode: {
      javascript: `class MentionSystem {
  constructor() {
    this.root = { children: {}, topUsers: [] };
  }
  
  addUser(username) {
    let node = this.root;
    for (const c of username) {
      if (!node.children[c]) node.children[c] = { children: {}, topUsers: [] };
      node = node.children[c];
      if (!node.topUsers.includes(username)) {
        node.topUsers.push(username);
        node.topUsers.sort();
        if (node.topUsers.length > 3) node.topUsers.pop();
      }
    }
  }
  
  getMentions(prefix) {
    let node = this.root;
    for (const c of prefix) {
      if (!node.children[c]) return [];
      node = node.children[c];
    }
    return node.topUsers;
  }
}`
    }
  },
  {
    id: 'atlassian-9',
    company: 'atlassian',
    role: 'software-developer',
    type: 'behavioral',
    difficulty: 'medium',
    category: 'Atlassian Values - Open Company & Teamwork',
    subject: 'hr',
    question: 'Tell me about a time you lived the value "Open company, no bullshit" by transparently surfacing a major project flaw or admitting a mistake early.',
    keyConcepts: ['Open Company, No Bullshit', 'Radical Transparency', 'Psychological Safety', 'Blameless Culture', 'Constructive Feedback'],
    tips: 'Show how early transparency prevented a much bigger failure downstream and how you collaborated constructively with your team on the fix.',
    idealAnswer: `Model Response (STAR):
- Situation: While building an automated billing export integration, I realized that my database query logic failed to account for multi-currency rounding discrepancies for European customers, which would result in inaccurate tax reporting at month-end.
- Task: Transparently escalate the problem before financial books closed.
- Action: I immediately messaged my engineering lead and finance product manager, outlined the root cause, took personal responsibility, and presented two remediation options with estimated timeline trade-offs.
- Result: The team appreciated the early heads-up. We paused the export job for 4 hours, implemented decimal-precision arithmetic with unit test coverage, and re-ran the pipeline with 100% financial accuracy.`
  },
  {
    id: 'atlassian-10',
    company: 'atlassian',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Array / Two Pointers',
    subject: 'dsa',
    question: 'Container With Most Water: Given n non-negative integers height where each represents a point at coordinate (i, height[i]), find two lines that together with the x-axis form a container that contains the most water.',
    keyConcepts: ['Two Pointers', 'Greedy Inward Movement', 'O(N) Time and O(1) Space', 'Area Optimization'],
    tips: 'Initialize pointers at both ends. The area is (right - left) * min(height[left], height[right]). Move the pointer with the smaller height inward.',
    idealAnswer: `Two-Pointer Approach:
1. Initialize \`left = 0, right = height.length - 1, maxArea = 0\`.
2. While left < right:
   - \`h = Math.min(height[left], height[right])\`.
   - \`maxArea = Math.max(maxArea, h * (right - left))\`.
   - If \`height[left] < height[right]\`: \`left++\`.
   - Else: \`right--\`.
3. Return maxArea.

Complexity: Time O(N) single pass, Space O(1) constant.`,
    starterCode: {
      javascript: `function maxArea(height) {
  let left = 0, right = height.length - 1;
  let maxA = 0;
  
  while (left < right) {
    const h = Math.min(height[left], height[right]);
    maxA = Math.max(maxA, h * (right - left));
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return maxA;
}`
    }
  },

  // ==========================================
  // 10. FLIPKART (Top Product Tier-1)
  // ==========================================
  {
    id: 'flipkart-1',
    company: 'flipkart',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'System Design - Big Billion Days Flash Sale',
    subject: 'system-design',
    question: 'How would you architect Flipkart Big Billion Days (BBD) Flash Sale System handling 1 Million orders/minute with zero inventory overselling?',
    keyConcepts: ['Redis Atomic Stock Decrement (Lua Script)', 'Kafka Checkout Queue Buffer', 'Rate Limiting & Virtual Waiting Rooms', 'DB Optimistic Locking', 'Idempotent Payment Webhooks'],
    tips: 'Describe the complete multi-tier flow: Edge rate limiting -> Redis atomic Lua hold -> Kafka asynchronous queue -> Worker DB persistence.',
    idealAnswer: `Flipkart BBD Flash Sale Architecture:
1. Edge & Waiting Room: Cloudflare/Akamai Edge filters bot traffic. Virtual Waiting Room meters user checkout traffic into manageable batches.
2. In-Memory Inventory Lock: Stock preloaded in Redis cluster. Lua script decrements stock atomically in < 1ms. If stock < 0, instantly rejected.
3. Asynchronous Order Pipeline: Successful reservations push order messages to Kafka partition topics -> order workers consume events and persist records to MySQL/Aerospike with optimistic locking.
4. Auto-Reversion: Reserved inventory is held for 10 minutes. If payment webhook is not confirmed within 10 minutes, background sweeper restores Redis stock.`
  },
  {
    id: 'flipkart-2',
    company: 'flipkart',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Dynamic Programming / Knapsack',
    subject: 'dsa',
    question: '0/1 Knapsack & Cart Discount Optimization: Given weights and values of n items and a cart weight/budget capacity W, determine the maximum value subset of items you can include in the cart.',
    keyConcepts: ['0/1 Knapsack DP', 'State transition', '1D Array Space Optimization', 'O(N * W) Complexity'],
    tips: 'When optimizing space to a 1D DP array, iterate the capacity loop BACKWARDS from W down to weight[i] to ensure each item is picked at most once.',
    idealAnswer: `1D Space-Optimized Knapsack:
1. Initialize \`dp\` array of size W + 1 filled with 0.
2. For each item \`i\` from 0 to n - 1:
   - For \`w\` from W down to \`weights[i]\`:
     - \`dp[w] = Math.max(dp[w], values[i] + dp[w - weights[i]])\`.
3. Return \`dp[W]\`.

Complexity: Time O(N * W), Space O(W).`,
    starterCode: {
      javascript: `function knapSack(W, weights, values, n) {
  const dp = new Array(W + 1).fill(0);
  
  for (let i = 0; i < n; i++) {
    for (let w = W; w >= weights[i]; w--) {
      dp[w] = Math.max(dp[w], values[i] + dp[w - weights[i]]);
    }
  }
  return dp[W];
}`
    }
  },
  {
    id: 'flipkart-3',
    company: 'flipkart',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'Caching Strategies & Redis',
    subject: 'system-design',
    question: 'Explain Cache Avalanche, Cache Breakdown, Cache Penetration, and how Bloom Filters and Mutex Locks prevent database stampedes.',
    keyConcepts: ['Cache Avalanche (Random TTL jitter)', 'Cache Breakdown (Single hot key mutex lock)', 'Cache Penetration (Bloom Filter / Null Object caching)', 'Cache-Aside Pattern'],
    tips: 'Cache Penetration is querying data that does NOT exist in DB. Cache Breakdown is when a super popular hot key expires and 100K requests hit DB simultaneously.',
    idealAnswer: `Caching Failure Modes & Mitigations:
1. Cache Avalanche: Thousands of cached keys expire at the exact same second, crashing the DB. Solution: Add random jitter (e.g. TTL = 3600s + Math.random() * 300s).
2. Cache Breakdown: A single viral product key expires, causing thousands of concurrent threads to query DB simultaneously. Solution: Acquire a distributed mutex lock in Redis so only 1 thread fetches DB while others wait.
3. Cache Penetration: Malicious traffic queries non-existent IDs (e.g. id = -9999), bypassing cache and hitting DB. Solution: Place a Bloom Filter in memory before cache, or cache null values with a short 60s TTL.`
  },
  {
    id: 'flipkart-4',
    company: 'flipkart',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Heap / QuickSelect',
    subject: 'dsa',
    question: 'Top K Frequent Elements / Trending Products: Given an integer array nums and an integer k, return the k most frequent elements in O(N log k) or O(N) time.',
    keyConcepts: ['Bucket Sort / Min-Heap', 'Hash Map Frequency Counter', 'O(N) Bucket Sort Approach'],
    tips: 'Use Bucket Sort where array index represents the frequency count (1 to N). Loop backwards from index N to 0 to gather top K elements in O(N) time.',
    idealAnswer: `Bucket Sort O(N) Algorithm:
1. Count frequencies using a hash map \`freqMap\`.
2. Create an array of buckets \`buckets\` of size nums.length + 1 where each bucket is a list.
3. For each [num, freq] in freqMap: push \`num\` into \`buckets[freq]\`.
4. Iterate buckets backwards from N down to 1:
   - Append items from current bucket to result array until result.length === k.
5. Return result.

Complexity: Time O(N), Space O(N).`,
    starterCode: {
      javascript: `function topKFrequent(nums, k) {
  const map = new Map();
  for (const n of nums) map.set(n, (map.get(n) || 0) + 1);
  
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, freq] of map) {
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
    id: 'flipkart-5',
    company: 'flipkart',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'Java & Spring Boot Architecture',
    subject: 'oop',
    question: 'Explain Spring Boot Dependency Injection, Bean Scopes, Circular Dependencies, and how @Transactional works under the hood.',
    keyConcepts: ['Spring IoC Container', 'Bean Scopes (Singleton, Prototype, Request, Session)', 'Spring AOP Dynamic Proxy for @Transactional', 'Circular Dependency 3-level cache in Spring'],
    tips: 'Explain that calling a @Transactional method from another method within the SAME class bypasses the Spring AOP proxy, meaning the transaction is ignored.',
    idealAnswer: `Spring Boot Internals:
1. Inversion of Control (IoC): Container instantiates, configures, and injects object dependencies via reflection/constructors, decoupling components.
2. Bean Scopes:
   - Singleton (Default): Exactly 1 instance per Spring ApplicationContext.
   - Prototype: A new instance created on every injection request.
   - Request/Session: Tied to HTTP request/session lifecycle.
3. @Transactional Proxy: Uses Spring AOP (CGLIB or JDK Dynamic Proxies). The proxy intercepts method execution, opens DB connection/transaction, calls actual method, and commits on success or rolls back on Unchecked (RuntimeException) exceptions.`
  },
  {
    id: 'flipkart-6',
    company: 'flipkart',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Matrix & Dynamic Programming',
    subject: 'dsa',
    question: 'Unique Paths II (Grid with Obstacles): A robot is located in an m x n grid with obstacles. The robot can only move down or right. Find the number of unique paths to reach the bottom-right corner.',
    keyConcepts: ['2D Dynamic Programming', 'Obstacle handling', 'Space optimization O(N)', 'Boundary initialization'],
    tips: 'If grid[i][j] === 1 (obstacle), dp[j] = 0. Otherwise, dp[j] += dp[j-1].',
    idealAnswer: `1D Space-Optimized Dynamic Programming:
1. If \`obstacleGrid[0][0] === 1\`, return 0.
2. Initialize \`dp\` array of length cols filled with 0, and \`dp[0] = 1\`.
3. Loop \`r\` from 0 to rows - 1:
   - Loop \`c\` from 0 to cols - 1:
     - If \`obstacleGrid[r][c] === 1\`: \`dp[c] = 0\`.
     - Else if \`c > 0\`: \`dp[c] += dp[c - 1]\`.
4. Return \`dp[cols - 1]\`.

Complexity: Time O(M * N), Space O(N).`,
    starterCode: {
      javascript: `function uniquePathsWithObstacles(obstacleGrid) {
  const m = obstacleGrid.length, n = obstacleGrid[0].length;
  const dp = new Array(n).fill(0);
  dp[0] = 1;
  
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (obstacleGrid[r][c] === 1) {
        dp[c] = 0;
      } else if (c > 0) {
        dp[c] += dp[c - 1];
      }
    }
  }
  return dp[n - 1];
}`
    }
  },
  {
    id: 'flipkart-7',
    company: 'flipkart',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'System Design - E-Commerce Faceted Search',
    subject: 'system-design',
    question: 'How would you design Flipkart\'s Product Search & Faceted Navigation (Brand, Price, Color, Rating) handling 50 Million products?',
    keyConcepts: ['Elasticsearch Cluster', 'Inverted Index for text search', 'BKD Trees for numeric price ranges', 'Faceted Aggregations', 'Document Denormalization'],
    tips: 'Explain how Elasticsearch uses Doc Values (columnar storage) for high-speed faceted aggregations alongside the Inverted Index for text matches.',
    idealAnswer: `Faceted Search Architecture:
1. Search Engine: Elasticsearch cluster with multi-node shard replicas.
2. Inverted Index & BKD Trees:
   - Product title/description indexed in Inverted Index for typo-tolerant fuzzy matching (NGram / BM25 scoring).
   - Numeric fields (Price, Discount %) indexed in BKD trees for fast range filters.
   - Categorical attributes (Brand, Color, Rating) indexed as keyword fields using columnar Doc Values.
3. Aggregation Query: Executes nested \`terms\` and \`stats\` aggregations to return matching product IDs alongside dynamic facet filter counts in < 30ms.`
  },
  {
    id: 'flipkart-8',
    company: 'flipkart',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Sliding Window & Two Pointers',
    subject: 'dsa',
    question: 'Longest Substring Without Repeating Characters: Given a string s, find the length of the longest substring without repeating characters in O(N) time.',
    keyConcepts: ['Sliding Window', 'Hash Map / Index Array', 'Two Pointers', 'O(N) Time and O(min(N, M)) Space'],
    tips: 'Use a map storing the last seen index of each character. When a duplicate is seen, jump the left pointer directly to map.get(char) + 1.',
    idealAnswer: `Sliding Window Index Jump:
1. Maintain \`map = new Map()\`, \`left = 0\`, \`maxLen = 0\`.
2. Loop \`right\` from 0 to s.length - 1:
   - \`char = s[right]\`.
   - If \`map.has(char) && map.get(char) >= left\`:
     - Jump \`left = map.get(char) + 1\`.
   - Update \`map.set(char, right)\`.
   - Update \`maxLen = Math.max(maxLen, right - left + 1)\`.
3. Return maxLen.

Complexity: Time O(N) single pass, Space O(min(N, AlphabetSize)).`,
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {
  const map = new Map();
  let left = 0, maxLen = 0;
  
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    if (map.has(c) && map.get(c) >= left) {
      left = map.get(c) + 1;
    }
    map.set(c, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`
    }
  },
  {
    id: 'flipkart-9',
    company: 'flipkart',
    role: 'software-developer',
    type: 'behavioral',
    difficulty: 'medium',
    category: 'Flipkart Values - Customer First & Bias for Action',
    subject: 'hr',
    question: 'Tell me about a time you identified a system bottleneck right before a major shopping festival and deployed an urgent performance optimization.',
    keyConcepts: ['Performance Optimization', 'High Traffic Readiness', 'SQL Indexing & Query Tuning', 'Canary Verification', 'Customer First'],
    tips: 'Describe the metrics you looked at (P99 latency, DB slow query logs) and the exact optimization implemented.',
    idealAnswer: `Model Response (STAR):
- Situation: 48 hours before our annual sale, load tests revealed that the cart summary API latency degraded to 2.1 seconds at 50,000 requests/sec.
- Task: Reduce latency below 100ms before marketing campaigns went live.
- Action: I analyzed the SQL EXPLAIN plan and discovered a full table scan caused by a missing composite index on \`(user_id, status, created_at)\`. I applied the hot index concurrently on our replica clusters and added a 30-second Redis cache layer for cart discount calculations.
- Result: API latency dropped to 45ms (46x faster), the database handled 1.2M peak requests with < 20% CPU utilization, and zero shopping cart timeouts occurred.`
  },
  {
    id: 'flipkart-10',
    company: 'flipkart',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Array / Greedy',
    subject: 'dsa',
    question: 'Jump Game: You are given an integer array nums. You are initially positioned at the array\'s first index. Each element represents your maximum jump length. Return true if you can reach the last index.',
    keyConcepts: ['Greedy Algorithm', 'Max reachable index tracker', 'O(N) Time and O(1) Space'],
    tips: 'Maintain maxReach = 0. For each index i, if i > maxReach return false; otherwise update maxReach = max(maxReach, i + nums[i]).',
    idealAnswer: `Greedy Max Reach Approach:
1. Initialize \`maxReach = 0\`.
2. Loop \`i\` from 0 to nums.length - 1:
   - If \`i > maxReach\`: return false (cannot reach current index).
   - \`maxReach = Math.max(maxReach, i + nums[i])\`.
   - If \`maxReach >= nums.length - 1\`: return true.
3. Return true.

Complexity: Time O(N), Space O(1).`,
    starterCode: {
      javascript: `function canJump(nums) {
  let maxReach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
    if (maxReach >= nums.length - 1) return true;
  }
  return true;
}`
    }
  },

  // ==========================================
  // 11. GOLDMAN SACHS (Top Product Tier-1)
  // ==========================================
  {
    id: 'gs-1',
    company: 'goldman-sachs',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Math & Hash Map',
    subject: 'dsa',
    question: 'Fraction to Recurring Decimal: Given two integers representing numerator and denominator of a fraction, return the fraction in string format. If the fractional part is repeating, enclose the repeating digits in parentheses.',
    keyConcepts: ['Hash Map for Remainder Indexing', 'Division simulation', 'Handling negative signs & 64-bit integer overflow'],
    tips: 'Use a hash map mapping remainder -> position in output string. When a remainder repeats, insert \'(\' at the stored position and \')\' at the end.',
    idealAnswer: `Algorithm:
1. If numerator === 0, return "0".
2. Handle sign: If one is negative, prepend "-". Use Math.abs(BigInt) to prevent 32-bit integer overflow.
3. Append integer part: \`Math.floor(n / d)\`.
4. Remainder = \`n % d\`. If remainder === 0, return result string.
5. Append ".". Maintain \`map = new Map()\` storing \`remainder -> result.length\`.
6. While remainder !== 0:
   - If \`map.has(remainder)\`: insert "(" at \`map.get(remainder)\` and append ")", return result.
   - \`map.set(remainder, result.length)\`.
   - \`remainder *= 10\`.
   - Append \`Math.floor(remainder / d)\`.
   - \`remainder %= d\`.
7. Return result.`,
    starterCode: {
      javascript: `function fractionToDecimal(numerator, denominator) {
  if (numerator === 0) return "0";
  let res = "";
  if ((numerator < 0) ^ (denominator < 0)) res += "-";
  
  let num = Math.abs(numerator);
  const den = Math.abs(denominator);
  
  res += Math.floor(num / den);
  let rem = num % den;
  if (rem === 0) return res;
  
  res += ".";
  const map = new Map();
  while (rem !== 0) {
    if (map.has(rem)) {
      const idx = map.get(rem);
      res = res.slice(0, idx) + "(" + res.slice(idx) + ")";
      break;
    }
    map.set(rem, res.length);
    rem *= 10;
    res += Math.floor(rem / den);
    rem %= den;
  }
  return res;
}`
    }
  },
  {
    id: 'gs-2',
    company: 'goldman-sachs',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'System Design - High-Frequency Trading',
    subject: 'system-design',
    question: 'How would you design a Low-Latency Stock Exchange Limit Order Book (LOB) matching engine capable of processing 1 Million orders/second in under 5 microseconds?',
    keyConcepts: ['Limit Order Book (Bids/Asks)', 'Red-Black Tree for Price Levels + Doubly Linked List for FIFO queues', 'LMAX Disruptor Lock-Free Ring Buffer', 'Kernel Bypass Networking (Solarflare OpenOnload)', 'Zero Garbage Collection'],
    tips: 'Explain why locks and thread context switches must be avoided in ultra-low latency trading, and how single-threaded ring buffers achieve microsecond speeds.',
    idealAnswer: `Low-Latency Order Book Engine:
1. Data Structure: Two sides: Bids (sorted descending) and Asks (sorted ascending).
   - Price levels indexed in a Red-Black Tree or contiguous array for O(1) price point access.
   - Each price level contains a Doubly Linked List of Orders enforcing Price-Time Priority (FIFO execution).
2. Lock-Free Architecture: Uses the LMAX Disruptor pattern (in-memory lock-free circular ring buffer using CPU memory barriers) on a pinned single CPU core, eliminating kernel lock contention.
3. Network Optimization: Uses Solarflare Kernel Bypass (EF_VI / OpenOnload) transferring raw Ethernet packets directly to user-space memory, avoiding OS kernel socket interrupt overhead.`
  },
  {
    id: 'gs-3',
    company: 'goldman-sachs',
    role: 'java-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'Core Java - Lock-Free Concurrency',
    subject: 'oop',
    question: 'Explain Java Lock-Free Concurrency, AtomicInteger, CAS (Compare-And-Swap), and how AtomicStampedReference solves the ABA Problem.',
    keyConcepts: ['CPU Hardware CMPXCHG instruction', 'Compare-And-Swap (CAS)', 'AtomicInteger / AtomicLong', 'ABA Problem', 'AtomicStampedReference with Version Stamps'],
    tips: 'The ABA problem occurs when Value A changes to B and back to A. A raw CAS thinks nothing changed, which fails for lock-free stacks. Stamped references add an integer version counter.',
    idealAnswer: `Lock-Free Concurrency Internals:
1. CAS (Compare-And-Swap): Hardware-level atomic CPU instruction (\`CMPXCHG\`) that updates a memory location from ExpectedValue to NewValue only if the memory currently matches ExpectedValue.
2. AtomicInteger: Uses Unsafe/VarHandle CAS loops without kernel mutex locks: \`while(!compareAndSet(expected, next))\`.
3. ABA Problem: Thread 1 reads value A. Thread 2 changes A -> B -> A. Thread 1 executes CAS and succeeds because value is still A, even though state transitioned.
4. Solution: \`AtomicStampedReference\` pairs the object reference with an integer version stamp \`[ref, stamp]\`. Updates require both reference AND stamp to match.`
  },
  {
    id: 'gs-4',
    company: 'goldman-sachs',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Dynamic Programming / Coin Change',
    subject: 'dsa',
    question: 'Coin Change (Minimum Coins): Given an integer array coins representing different coin denominations and an amount, return the fewest number of coins needed to make up that amount. Return -1 if impossible.',
    keyConcepts: ['Unbounded Knapsack DP', 'dp[i] = min(dp[i], 1 + dp[i - coin])', 'O(Amount * Coins) Complexity'],
    tips: 'Initialize dp array with Infinity. Base case dp[0] = 0. For each coin, update dp[i] from coin to amount.',
    idealAnswer: `1D DP Formulation:
1. Initialize \`dp\` array of size amount + 1 filled with \`Infinity\`, and \`dp[0] = 0\`.
2. Loop \`coin\` through coins:
   - Loop \`i\` from \`coin\` to \`amount\`:
     - \`dp[i] = Math.min(dp[i], 1 + dp[i - coin])\`.
3. Return \`dp[amount] === Infinity ? -1 : dp[amount]\`.

Complexity: Time O(Amount * Coins.length), Space O(Amount).`,
    starterCode: {
      javascript: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  
  for (const coin of coins) {
    for (let i = coin; i <= amount; i++) {
      dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`
    }
  },
  {
    id: 'gs-5',
    company: 'goldman-sachs',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'System Design - Financial Ledger',
    subject: 'system-design',
    question: 'How would you design an Immutable Double-Entry Bookkeeping Financial Ledger with strict ACID guarantees and auditability?',
    keyConcepts: ['Double-Entry Accounting (Sum of Debits + Credits = 0)', 'Immutable Append-Only Ledger', 'Event Sourcing Pattern', 'Serializable Isolation Level', 'Cryptographic Merkle Tree Audit Trail'],
    tips: 'In financial systems, you NEVER update or delete an account balance row directly; you only append debit/credit ledger entries and compute balances from journal logs.',
    idealAnswer: `Double-Entry Financial Ledger Architecture:
1. Fundamental Rule: Every transaction has at least one debit entry and one credit entry; \`Total Debits == Total Credits\`.
2. Immutability: The ledger database is strictly append-only. To correct a mistake, a new offsetting journal entry is appended (never \`UPDATE\` or \`DELETE\`).
3. Isolation & Concurrency: Transactions executed under \`SERIALIZABLE\` isolation in PostgreSQL to prevent phantom reads and balance race conditions.
4. Tamper-Proof Audit: Each block of ledger entries is cryptographically hashed with SHA-256 and chained (Merkle Tree / Blockchain ledger) for external financial regulatory compliance.`
  },
  {
    id: 'gs-6',
    company: 'goldman-sachs',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Hash Map / String',
    subject: 'dsa',
    question: 'Group Anagrams: Given an array of strings strs, group the anagrams together in any order in O(N * K) time.',
    keyConcepts: ['Character Frequency Tuple / Sorted Key', 'Hash Map of Lists', 'O(N * K) Time Complexity'],
    tips: 'Instead of sorting each string (O(K log K)), build a 26-element character count string delimiter (e.g., "#1#0#0...#2") as the hash map key in O(K) time.',
    idealAnswer: `Character Frequency Array Key:
1. Maintain \`map = new Map()\`.
2. For each string \`s\` in \`strs\`:
   - Build frequency array \`count\` of size 26.
   - For char in s: \`count[char.charCodeAt(0) - 97]++\`.
   - Key = \`count.join('#')\`.
   - If not in map, \`map.set(key, [])\`.
   - \`map.get(key).push(s)\`.
3. Return \`Array.from(map.values())\`.

Complexity: Time O(N * K) where N is number of strings and K is max string length. Space O(N * K).`,
    starterCode: {
      javascript: `function groupAnagrams(strs) {
  const map = new Map();
  for (const s of strs) {
    const count = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
      count[s.charCodeAt(i) - 97]++;
    }
    const key = count.join('#');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }
  return Array.from(map.values());
}`
    }
  },
  {
    id: 'gs-7',
    company: 'goldman-sachs',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'Database - Transaction Isolation Levels',
    subject: 'dbms',
    question: 'Explain SQL Transaction Isolation Levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable) and the anomalies they prevent.',
    keyConcepts: ['Dirty Read', 'Non-Repeatable Read', 'Phantom Read', 'Write Skew', 'Two-Phase Locking (2PL) vs Snapshot Isolation (MVCC)'],
    tips: 'Use clear definitions: Dirty read (reading uncommitted changes), Non-repeatable read (row values change between reads), Phantom read (new matching rows inserted).',
    idealAnswer: `Transaction Isolation Matrix:
1. Read Uncommitted: Allows Dirty Reads (reading uncommitted data from concurrent transactions).
2. Read Committed: Prevents Dirty Reads using short-lived read locks or MVCC snapshots. Non-repeatable reads still possible.
3. Repeatable Read: Guarantees reading the same row values throughout transaction. Prevents Dirty and Non-Repeatable Reads. (In standard SQL, Phantom Reads possible; InnoDB prevents phantoms with Next-Key Locks).
4. Serializable: Highest isolation. Completely eliminates all anomalies (Dirty Read, Non-Repeatable Read, Phantom Read, Write Skew) using Strict 2-Phase Locking (2PL) or Serializable Snapshot Isolation (SSI).`
  },
  {
    id: 'gs-8',
    company: 'goldman-sachs',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'hard',
    category: 'DSA - Binary Tree Serialization',
    subject: 'dsa',
    question: 'Serialize and Deserialize Binary Tree: Design an algorithm to serialize a binary tree into a string and deserialize that string back to the original tree structure.',
    keyConcepts: ['Pre-order DFS Traversal', 'Delimiter and Null Sentinel (#)', 'Queue-based Deserialization', 'O(N) Time and Space'],
    tips: 'Serialize using Pre-Order DFS (Root, Left, Right) separated by commas, representing null nodes with "#". Deserialization parses the tokens recursively with a queue.',
    idealAnswer: `Pre-Order DFS Serialization:
1. serialize(root):
   - If node is null: return "#,".
   - Return \`node.val + "," + serialize(node.left) + serialize(node.right)\`.
2. deserialize(data):
   - Split string by comma into a Queue of tokens.
   - Helper buildTree(queue):
     - Pop token.
     - If token === "#", return null.
     - Create node with \`parseInt(token)\`.
     - \`node.left = buildTree(queue)\`.
     - \`node.right = buildTree(queue)\`.
     - Return node.
   - Return buildTree(queue).

Complexity: Time O(N), Space O(N).`,
    starterCode: {
      javascript: `function serialize(root) {
  if (!root) return "#";
  return \`\${root.val},\${serialize(root.left)},\${serialize(root.right)}\`;
}

function deserialize(data) {
  const queue = data.split(',');
  function build() {
    const val = queue.shift();
    if (val === '#' || val === undefined) return null;
    const node = { val: parseInt(val), left: null, right: null };
    node.left = build();
    node.right = build();
    return node;
  }
  return build();
}`
    }
  },
  {
    id: 'gs-9',
    company: 'goldman-sachs',
    role: 'software-developer',
    type: 'behavioral',
    difficulty: 'medium',
    category: 'Goldman Sachs Culture - Integrity & Precision',
    subject: 'hr',
    question: 'How do you handle zero-tolerance for data inaccuracies and regulatory compliance in enterprise financial engineering?',
    keyConcepts: ['Zero-Tolerance Precision', 'Automated Reconciliation', 'Double-Entry Verification', 'Unit & Integration Testing', 'Audit Logging'],
    tips: 'Emphasize automated end-of-day reconciliation jobs, strict code review policies, and defensive programming.',
    idealAnswer: `Model Response (STAR):
- Situation: While building an automated margin calculation pipeline, rounding approximations in floating-point math risked a $0.02 discrepancy per trade over millions of daily transactions.
- Task: Ensure 100% mathematical precision adhering to strict SEC / FINRA compliance standards.
- Action: I migrated all calculations to arbitrary-precision arithmetic (BigDecimal) with explicit Banker's Rounding (ROUND_HALF_EVEN). I introduced an automated nightly reconciliation engine that asserts total debits exactly equal total credits across all accounts.
- Result: We achieved 100% zero-discrepancy reconciliation over 12 consecutive months and passed external regulatory audit with zero findings.`
  },
  {
    id: 'gs-10',
    company: 'goldman-sachs',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - String / Two Pointers',
    subject: 'dsa',
    question: 'String Compression (Run-Length Encoding): Given an array of characters chars, compress it in-place using the count of repeated characters (e.g. ["a","a","b","b","c","c","c"] -> ["a","2","b","2","c","3"]). Return the new length.',
    keyConcepts: ['Two Pointers', 'In-place array write', 'O(N) Time and O(1) Space'],
    tips: 'Use write pointer and read pointer. Count consecutive identical characters and write character followed by digits of count if count > 1.',
    idealAnswer: `Two-Pointer In-Place Compression:
1. Initialize \`write = 0, i = 0\`.
2. While i < chars.length:
   - \`char = chars[i]\`.
   - Count consecutive characters: \`j = i\`. While \`j < chars.length && chars[j] === char\`: \`j++\`.
   - \`count = j - i\`.
   - Write char: \`chars[write++] = char\`.
   - If count > 1: Write digits of count: For digit of String(count): \`chars[write++] = digit\`.
   - \`i = j\`.
3. Return write.

Complexity: Time O(N), Space O(1) in-place.`,
    starterCode: {
      javascript: `function compress(chars) {
  let write = 0, i = 0;
  while (i < chars.length) {
    const char = chars[i];
    let j = i;
    while (j < chars.length && chars[j] === char) j++;
    const count = j - i;
    
    chars[write++] = char;
    if (count > 1) {
      for (const d of String(count)) {
        chars[write++] = d;
      }
    }
    i = j;
  }
  return write;
}`
    }
  },

  // ==========================================
  // 12. ORACLE (Top Product Tier-1)
  // ==========================================
  {
    id: 'oracle-1',
    company: 'oracle',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'Database Internals - WAL & Undo Logs',
    subject: 'dbms',
    question: 'Explain Write-Ahead Logging (WAL / Redo Log), Undo Logs, Buffer Pool management, and checkpointing in enterprise databases.',
    keyConcepts: ['Write-Ahead Logging (WAL)', 'ACID Durability & Atomicity', 'Undo Log (Rollback & MVCC snapshot)', 'Buffer Pool Dirty Pages & LRU-2', 'ARIES Recovery Algorithm'],
    tips: 'Explain that dirty pages are written to non-volatile WAL logs sequentially before pages in the Buffer Pool are written to data files on disk.',
    idealAnswer: `Database Engine Storage Internals:
1. Write-Ahead Logging (WAL / Redo Log): Before any modified page (dirty page) in the in-memory Buffer Pool is written to data files on disk, the log record MUST be written sequentially to the WAL on disk (Durability).
2. Undo Log: Stores the inverse image of changes. Used for:
   - Rolling back active transactions on error/abort (Atomicity).
   - Serving non-blocking historical snapshots for concurrent readers under MVCC.
3. Buffer Pool & Checkpoints: Reads and writes happen in RAM Buffer Pool. Checkpoints flush dirty pages to disk in background batches, trimming WAL log size and bounding recovery time after crashes.`
  },
  {
    id: 'oracle-2',
    company: 'oracle',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'hard',
    category: 'DSA - Binary Search / Patience Sorting',
    subject: 'dsa',
    question: 'Longest Increasing Subsequence (LIS): Given an integer array nums, return the length of the longest strictly increasing subsequence in O(N log N) time.',
    keyConcepts: ['Patience Sorting', 'Binary Search (lower_bound)', 'tails[] array', 'O(N log N) Time Complexity'],
    tips: 'Maintain tails[] array where tails[i] stores the smallest tail value of all increasing subsequences of length i + 1. Use binary search to find position for each element.',
    idealAnswer: `Patience Sorting Binary Search Approach:
1. Initialize empty array \`tails = []\`.
2. For each number \`x\` in nums:
   - Binary Search for index \`idx\` in \`tails\` where \`tails[idx] >= x\`.
   - If \`idx === tails.length\`: push \`x\` to tails (extends longest subsequence).
   - Else: \`tails[idx] = x\` (updates smaller tail for same length).
3. Return \`tails.length\`.

Complexity: Time O(N log N), Space O(N).`,
    starterCode: {
      javascript: `function lengthOfLIS(nums) {
  const tails = [];
  for (const x of nums) {
    let low = 0, high = tails.length;
    while (low < high) {
      const mid = (low + high) >> 1;
      if (tails[mid] < x) low = mid + 1;
      else high = mid;
    }
    if (low === tails.length) tails.push(x);
    else tails[low] = x;
  }
  return tails.length;
}`
    }
  },
  {
    id: 'oracle-3',
    company: 'oracle',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'hard',
    category: 'Distributed Database Clustering (Oracle RAC)',
    subject: 'system-design',
    question: 'Explain Oracle Real Application Clusters (RAC) Shared-Disk Architecture, Cache Fusion, and Distributed Lock Management (DLM).',
    keyConcepts: ['Shared-Disk Architecture', 'Cache Fusion interconnect (InfiniBand)', 'Global Cache Service (GCS)', 'Distributed Lock Manager (DLM)', 'High Availability & Failover'],
    tips: 'Cache Fusion allows instance A to transfer dirty buffer cache blocks directly to instance B across high-speed interconnect without writing to disk first.',
    idealAnswer: `Oracle RAC Architecture:
1. Shared-Disk Topology: Multiple independent database compute instances mount the exact same shared SAN/NAS disk storage array.
2. Cache Fusion: If Node 1 modifies a data block and Node 2 requests that block, Node 1 sends the block directly from its RAM to Node 2 over a private ultra-high-speed InfiniBand network (sub-millisecond), avoiding disk I/O.
3. Global Cache Service (GCS) & DLM: Manages block ownership states (Shared, Exclusive, Null) across instances to prevent concurrent block overwrite conflicts.
4. Transparent Application Failover (TAF): If Node 1 crashes, active client sessions fail over to Node 2 seamlessly without connection interruption.`
  },
  {
    id: 'oracle-4',
    company: 'oracle',
    role: 'java-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'Java / JVM Garbage Collection',
    subject: 'oop',
    question: 'Explain JVM Generational Garbage Collection (Eden, Survivor S0/S1, Old Generation, Metaspace) and compare G1GC vs ZGC.',
    keyConcepts: ['Weak Generational Hypothesis', 'Eden & Survivor S0/S1 Copying Collector', 'Tenured/Old Generation Major GC', 'G1GC Region-based pausing', 'ZGC Colored Pointers (<1ms pause)'],
    tips: 'G1GC divides heap into equal regions and targets a user-specified pause goal (e.g. 200ms). ZGC uses colored pointers and load barriers for concurrent GC with <1ms pause times.',
    idealAnswer: `JVM Memory & Garbage Collection:
1. Heap Generations:
   - Young Gen: Eden + Survivor spaces (S0/S1). Short-lived objects allocated in Eden. Minor GC copies surviving objects to S0/S1, incrementing age counter.
   - Old Gen: Objects surviving threshold (default age 15) promoted to Old Gen.
   - Metaspace: Stores class metadata outside heap in native memory.
2. G1GC (Garbage-First): Divides heap into 2048 regions. Prioritizes collecting regions with the most garbage to meet a configurable target pause time (e.g. \`-XX:MaxGCPauseMillis=200\`).
3. ZGC (Z Garbage Collector): Ultra-low latency collector. Executes marking, relocation, and compaction concurrently with application threads using Colored Pointers and Load Barriers, guaranteeing sub-millisecond GC pauses.`
  },
  {
    id: 'oracle-5',
    company: 'oracle',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Stack & String Expression',
    subject: 'dsa',
    question: 'Basic Calculator II: Given a string s which represents an arithmetic expression containing non-negative integers, \'+\', \'-\', \'*\', and \'/\' operators and spaces, evaluate the expression respecting operator precedence in O(N) time.',
    keyConcepts: ['Stack-based calculation', 'Operator Precedence (* / before + -)', 'Integer Division truncation', 'O(N) Time and O(N) Space'],
    tips: 'Track the previous operator. When a new operator or end of string is encountered: push numbers for +/-, and pop-multiply or pop-divide for */.',
    idealAnswer: `Stack-Based Precedence Evaluation:
1. Maintain \`stack = []\`, \`currNum = 0\`, \`prevOp = '+'\`.
2. Loop \`i\` from 0 to s.length - 1:
   - If \`s[i]\` is digit: \`currNum = currNum * 10 + (s[i] - '0')\`.
   - If \`s[i]\` is operator or \`i === s.length - 1\`:
     - If \`prevOp === '+'\`: \`stack.push(currNum)\`.
     - If \`prevOp === '-'\`: \`stack.push(-currNum)\`.
     - If \`prevOp === '*'\`: \`stack.push(stack.pop() * currNum)\`.
     - If \`prevOp === '/'\`: \`stack.push(Math.trunc(stack.pop() / currNum))\`.
     - \`prevOp = s[i]\`, \`currNum = 0\`.
3. Return sum of all numbers in stack.

Complexity: Time O(N), Space O(N).`,
    starterCode: {
      javascript: `function calculate(s) {
  const stack = [];
  let currNum = 0;
  let prevOp = '+';
  
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c >= '0' && c <= '9') {
      currNum = currNum * 10 + (c - '0');
    }
    if ((c !== ' ' && (c < '0' || c > '9')) || i === s.length - 1) {
      if (prevOp === '+') stack.push(currNum);
      else if (prevOp === '-') stack.push(-currNum);
      else if (prevOp === '*') stack.push(stack.pop() * currNum);
      else if (prevOp === '/') stack.push(Math.trunc(stack.pop() / currNum));
      prevOp = c;
      currNum = 0;
    }
  }
  return stack.reduce((a, b) => a + b, 0);
}`
    }
  },
  {
    id: 'oracle-6',
    company: 'oracle',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'Database - B-Tree vs B+ Tree Internals',
    subject: 'dbms',
    question: 'Explain the mathematical and physical difference between B-Trees and B+ Trees, Node Splitting, and why relational databases exclusively use B+ Trees for index structures.',
    keyConcepts: ['B+ Tree (Data only in linked leaves)', 'B-Tree (Data in all nodes)', 'Fan-out Factor & Disk I/O Depth', 'Range Scans with Leaf Doubly Linked List', 'Node Fill Factor (50-100%)'],
    tips: 'Because B+ Tree internal nodes store ONLY keys and child pointers (no data records), each 4KB disk page holds many more keys, creating a massive fan-out factor that keeps tree height <= 3-4 levels for billions of rows.',
    idealAnswer: `B-Tree vs B+ Tree Internals:
1. Physical Structure:
   - B-Tree: Both internal nodes and leaf nodes store actual data records alongside index keys.
   - B+ Tree: Internal nodes store ONLY search keys and child page pointers. ALL actual data records reside in leaf nodes.
2. Advantages of B+ Trees for Databases:
   - Higher Fan-Out: Internal nodes are compact, so a single 8KB disk block holds hundreds of child pointers. A 3-level B+ Tree indexes over 100 Million records with at most 3 disk I/O seeks.
   - Sequential Range Scans: Leaf nodes are connected as a doubly linked list, enabling lightning-fast range traversals (\`BETWEEN 100 AND 500\`) without ascending back up the tree.
   - Deterministic Query Latency: Every lookup traverses the exact same depth from root to leaf.`
  },
  {
    id: 'oracle-7',
    company: 'oracle',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Graph / Union Find',
    subject: 'dsa',
    question: 'Redundant Connection: A tree is an undirected graph that is connected and has no cycles. Given a graph that started as a tree with n nodes and one additional edge added, find and return an edge that can be removed so that the resulting graph is a tree.',
    keyConcepts: ['Disjoint Set Union (DSU)', 'Cycle Detection', 'Path Compression', 'O(N * alpha(N)) Complexity'],
    tips: 'Iterate through edges. For each edge (u, v), find roots of u and v. If root(u) === root(v), this edge creates the cycle and is the redundant connection.',
    idealAnswer: `Union-Find Algorithm:
1. Initialize \`parent\` array where \`parent[i] = i\`.
2. Helper find(i): \`parent[i] === i ? i : (parent[i] = find(parent[i]))\`.
3. Loop through edges \`[u, v]\`:
   - \`rootU = find(u)\`, \`rootV = find(v)\`.
   - If \`rootU === rootV\`: return \`[u, v]\` (redundant edge found).
   - \`parent[rootU] = rootV\`.
4. Return [].

Complexity: Time O(N * α(N)) ≈ O(N), Space O(N).`,
    starterCode: {
      javascript: `function findRedundantConnection(edges) {
  const parent = Array.from({ length: edges.length + 1 }, (_, i) => i);
  
  function find(i) {
    if (parent[i] === i) return i;
    return parent[i] = find(parent[i]);
  }
  
  for (const [u, v] of edges) {
    const rootU = find(u);
    const rootV = find(v);
    if (rootU === rootV) return [u, v];
    parent[rootU] = rootV;
  }
  return [];
}`
    }
  },
  {
    id: 'oracle-8',
    company: 'oracle',
    role: 'backend-developer',
    type: 'technical',
    difficulty: 'medium',
    category: 'Operating Systems & System Calls',
    subject: 'os',
    question: 'Explain System Calls, Context Switching (User Mode Ring 3 vs Kernel Mode Ring 0), CPU Interrupts, and Direct Memory Access (DMA).',
    keyConcepts: ['CPU Protection Rings (Ring 0 Kernel, Ring 3 User)', 'Trap / Software Interrupt', 'Hardware Context Switch (Registers, PC, Page Tables)', 'DMA Controller (Zero-CPU I/O)'],
    tips: 'Direct Memory Access (DMA) allows hardware devices (disk/NIC) to transfer data directly to RAM without utilizing the CPU for every byte.',
    idealAnswer: `OS Kernel Execution:
1. Protection Rings: CPU runs user applications in Ring 3 (restricted unprivileged mode) to prevent direct hardware access. Kernel executes in Ring 0 (full hardware control).
2. System Call Flow: Application issues a software interrupt / trap (e.g. \`syscall\` instruction) -> CPU switches to Ring 0 -> saves register state on kernel stack -> executes kernel handler -> returns result to Ring 3.
3. Context Switch: CPU saves execution state (registers, Program Counter, stack pointers) of running process and loads state of next scheduled process, flushing TLB cache.
4. Direct Memory Access (DMA): Allows network cards and NVMe disk controllers to transfer data directly to RAM buffer pages without routing each byte through CPU registers.`
  },
  {
    id: 'oracle-9',
    company: 'oracle',
    role: 'software-developer',
    type: 'behavioral',
    difficulty: 'medium',
    category: 'Oracle Culture - Enterprise Stability',
    subject: 'hr',
    question: 'Tell me about an experience where you had to debug a complex distributed deadlock or concurrency bug in production.',
    keyConcepts: ['Thread Dumps (jstack)', 'Deadlock Lock Graphs', 'Lock Acquisition Ordering', 'Production RCA', 'Safe Hotfix'],
    tips: 'Show structured debugging: capturing thread dumps, identifying cyclical lock waits (Thread A holds Lock 1 waiting for Lock 2 while Thread B holds Lock 2 waiting for Lock 1), and reordering lock acquisition.',
    idealAnswer: `Model Response (STAR):
- Situation: During month-end batch processing, our enterprise inventory database experienced connection pool starvation with 40 backend threads hanging indefinitely.
- Task: Isolate and resolve the deadlock immediately to resume batch settlements.
- Action: I generated JVM thread dumps using \`jstack\` and inspected DB lock wait graphs in PostgreSQL. I identified an AB-BA deadlock: Payment service locked Account then Order, while Refund service locked Order then Account. I enforced a global deterministic lock acquisition ordering hierarchy based on resource entity IDs.
- Result: System recovered instantly after restarting hanging workers with the patch, and zero deadlocks occurred in subsequent billing cycles.`
  },
  {
    id: 'oracle-10',
    company: 'oracle',
    role: 'software-developer',
    type: 'coding',
    difficulty: 'medium',
    category: 'DSA - Linked List / Two Pointers',
    subject: 'dsa',
    question: 'Remove Nth Node From End of List: Given the head of a linked list, remove the nth node from the end of the list and return its head in a single pass (O(N) time and O(1) space).',
    keyConcepts: ['Two Pointers (Fast/Slow)', 'Dummy Head Node', 'Single-pass Linked List traversal', 'O(1) Space'],
    tips: 'Advance fast pointer n steps ahead. Then move both fast and slow pointers together until fast reaches the end; slow pointer is now right before the target node.',
    idealAnswer: `Two-Pointer Single Pass:
1. Create a \`dummy\` node pointing to \`head\`.
2. Initialize \`fast = dummy\` and \`slow = dummy\`.
3. Move \`fast\` forward \`n + 1\` steps.
4. Move both \`fast\` and \`slow\` forward one node at a time until \`fast === null\`.
5. Remove node: \`slow.next = slow.next.next\`.
6. Return \`dummy.next\`.

Complexity: Time O(N) single pass, Space O(1).`,
    starterCode: {
      javascript: `function removeNthFromEnd(head, n) {
  const dummy = { val: 0, next: head };
  let fast = dummy, slow = dummy;
  
  for (let i = 0; i <= n; i++) {
    fast = fast.next;
  }
  
  while (fast !== null) {
    fast = fast.next;
    slow = slow.next;
  }
  
  slow.next = slow.next.next;
  return dummy.next;
}`
    }
  }
];
