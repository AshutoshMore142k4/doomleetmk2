export interface CheatSheetEntry {
  title: string;
  content: string;
  code?: string;
}

export interface CheatSheetSection {
  name: string;
  slug: string;
  entries: CheatSheetEntry[];
}

export const cheatSheetSections: CheatSheetSection[] = [
  {
    name: 'Big-O Complexity',
    slug: 'big-o',
    entries: [
      {
        title: 'Common Time Complexities',
        content: 'O(1) → Constant: Hash map lookup, array index access.\nO(log n) → Logarithmic: Binary search, balanced BST ops.\nO(n) → Linear: Single pass, linear search.\nO(n log n) → Linearithmic: Merge sort, heap sort.\nO(n²) → Quadratic: Nested loops, brute-force pairs.\nO(2ⁿ) → Exponential: Subsets, recursive brute-force.\nO(n!) → Factorial: Permutations.',
      },
      {
        title: 'Space Complexity Rules',
        content: 'Recursive call stack → O(depth).\nCreating a new array/matrix → O(n) or O(n×m).\nHash map/set storage → O(n).\nIn-place means O(1) extra space (ignoring input).\nDFS on tree → O(h) where h = height. BFS → O(w) where w = max width.',
      },
      {
        title: 'Amortized Analysis',
        content: 'Dynamic array push_back: amortized O(1) despite occasional O(n) resize.\nUnion-Find with path compression + rank: amortized O(α(n)) ≈ O(1).\nSplay tree operations: amortized O(log n).',
      },
    ],
  },
  {
    name: 'Array & String Tricks',
    slug: 'array-string',
    entries: [
      {
        title: 'Two Pointers',
        content: 'Use two pointers moving inward for palindrome, sorted pair sum.\nSlow/fast pointers for cycle detection (Floyd\'s).\nSliding window for subarray/substring problems with constraint.',
        code: `// Two Sum (sorted array)
int lo = 0, hi = n - 1;
while (lo < hi) {
    int sum = a[lo] + a[hi];
    if (sum == target) return {lo, hi};
    else if (sum < target) lo++;
    else hi--;
}`,
      },
      {
        title: 'Sliding Window',
        content: 'Fixed window: maintain sum/count, slide by adding right and removing left.\nVariable window: expand right until invalid, shrink left until valid.\nTrack frequency with hash map or array[26] for lowercase letters.',
        code: `// Longest substring without repeating chars
int ans = 0, l = 0;
unordered_map<char,int> freq;
for (int r = 0; r < n; r++) {
    freq[s[r]]++;
    while (freq[s[r]] > 1) freq[s[l++]]--;
    ans = max(ans, r - l + 1);
}`,
      },
      {
        title: 'Prefix Sum',
        content: 'Build prefix[i] = sum of a[0..i-1]. Range sum [l,r] = prefix[r+1] - prefix[l].\nFor subarray sum = k, use hash map of prefix sums.\n2D prefix sum for matrix region queries.',
        code: `// Count subarrays with sum = k
unordered_map<int,int> mp;
mp[0] = 1;
int sum = 0, ans = 0;
for (int x : a) {
    sum += x;
    ans += mp[sum - k];
    mp[sum]++;
}`,
      },
      {
        title: 'Kadane\'s Algorithm',
        content: 'Maximum subarray sum in O(n). Track current max ending here. Reset to 0 if negative.\nVariant: track start/end indices. For min subarray, negate values.',
        code: `int maxSub = a[0], cur = a[0];
for (int i = 1; i < n; i++) {
    cur = max(a[i], cur + a[i]);
    maxSub = max(maxSub, cur);
}`,
      },
    ],
  },
  {
    name: 'Binary Search Patterns',
    slug: 'binary-search',
    entries: [
      {
        title: 'Standard Binary Search',
        content: 'lo = 0, hi = n-1. While lo <= hi, check mid.\nFor lower_bound: first element >= target.\nFor upper_bound: first element > target.',
        code: `// Lower bound (first >= target)
int lo = 0, hi = n;
while (lo < hi) {
    int mid = lo + (hi - lo) / 2;
    if (a[mid] < target) lo = mid + 1;
    else hi = mid;
}
return lo;`,
      },
      {
        title: 'Binary Search on Answer',
        content: 'When asked "minimum maximum" or "maximum minimum", binary search on the answer.\nDefine a predicate canAchieve(x). Search for smallest x where canAchieve(x) is true.\nCommon in: split array, koko eating bananas, capacity to ship.',
        code: `int lo = minPossible, hi = maxPossible;
while (lo < hi) {
    int mid = lo + (hi - lo) / 2;
    if (canAchieve(mid)) hi = mid;
    else lo = mid + 1;
}
return lo;`,
      },
    ],
  },
  {
    name: 'Linked List',
    slug: 'linked-list',
    entries: [
      {
        title: 'Fast & Slow Pointers',
        content: 'Detect cycle: slow moves 1, fast moves 2. If they meet → cycle.\nFind middle: when fast reaches end, slow is at middle.\nFind cycle start: after meeting, reset one pointer to head, move both by 1.',
        code: `// Find middle of linked list
ListNode* slow = head, *fast = head;
while (fast && fast->next) {
    slow = slow->next;
    fast = fast->next->next;
}
return slow; // middle node`,
      },
      {
        title: 'Reverse a Linked List',
        content: 'Iterative: maintain prev, curr, next. Reverse links one by one.\nRecursive: reverse rest, then point next node back.\nReverse in groups of k for "Reverse Nodes in k-Group".',
        code: `ListNode* prev = nullptr, *curr = head;
while (curr) {
    ListNode* nxt = curr->next;
    curr->next = prev;
    prev = curr;
    curr = nxt;
}
return prev;`,
      },
      {
        title: 'Dummy Node Technique',
        content: 'Create a dummy node before head to simplify edge cases (empty list, insertion at head).\nReturn dummy->next as the new head.\nUseful in merge lists, remove nth from end, partition list.',
      },
    ],
  },
  {
    name: 'Stack & Queue',
    slug: 'stack-queue',
    entries: [
      {
        title: 'Monotonic Stack',
        content: 'Maintains elements in increasing or decreasing order.\nNext Greater Element: iterate right-to-left, pop smaller, top is answer.\nLargest Rectangle in Histogram: maintain increasing stack of indices.',
        code: `// Next Greater Element
vector<int> ans(n, -1);
stack<int> st;
for (int i = n - 1; i >= 0; i--) {
    while (!st.empty() && st.top() <= a[i]) st.pop();
    if (!st.empty()) ans[i] = st.top();
    st.push(a[i]);
}`,
      },
      {
        title: 'Valid Parentheses Pattern',
        content: 'Push opening brackets. Pop when matching closing bracket found.\nIf stack empty when popping or non-empty at end → invalid.\nExtend to multiple bracket types: ()[]{}.',
      },
      {
        title: 'Min Stack',
        content: 'Maintain a parallel stack tracking minimum at each level.\nOr store pairs (value, currentMin) in a single stack.\nAll operations in O(1).',
        code: `stack<pair<int,int>> st; // {val, min}
void push(int x) {
    int mn = st.empty() ? x : min(x, st.top().second);
    st.push({x, mn});
}
int getMin() { return st.top().second; }`,
      },
    ],
  },
  {
    name: 'Tree Traversals',
    slug: 'trees',
    entries: [
      {
        title: 'DFS Traversals',
        content: 'Inorder (Left, Root, Right) → sorted order for BST.\nPreorder (Root, Left, Right) → serialize/copy tree.\nPostorder (Left, Right, Root) → delete tree, calculate height.',
        code: `void inorder(TreeNode* root) {
    if (!root) return;
    inorder(root->left);
    visit(root->val);
    inorder(root->right);
}`,
      },
      {
        title: 'BFS / Level Order',
        content: 'Use queue. Process level by level using size = queue.size().\nUseful for: zigzag, right side view, level averages, min depth.',
        code: `queue<TreeNode*> q;
q.push(root);
while (!q.empty()) {
    int sz = q.size();
    for (int i = 0; i < sz; i++) {
        auto node = q.front(); q.pop();
        if (node->left) q.push(node->left);
        if (node->right) q.push(node->right);
    }
}`,
      },
      {
        title: 'BST Properties',
        content: 'Inorder traversal gives sorted sequence.\nFor validation: pass (min, max) range down recursively.\nKth smallest: inorder traversal, count k nodes.\nLCA in BST: if both < node go left, both > go right, else current is LCA.',
      },
      {
        title: 'Tree DP Pattern',
        content: 'Return info from subtrees, combine at each node.\nDiameter: max(leftHeight + rightHeight) across all nodes.\nMax path sum: track "going through" vs "ending at" each node.',
        code: `// Diameter of binary tree
int dia = 0;
int height(TreeNode* root) {
    if (!root) return 0;
    int l = height(root->left);
    int r = height(root->right);
    dia = max(dia, l + r);
    return 1 + max(l, r);
}`,
      },
    ],
  },
  {
    name: 'Graph Algorithms',
    slug: 'graphs',
    entries: [
      {
        title: 'BFS Shortest Path (Unweighted)',
        content: 'Use queue + visited set. Distance from source = level in BFS tree.\nWorks for grid problems too: treat each cell as a node.\nMulti-source BFS: push all sources initially.',
        code: `vector<int> dist(n, -1);
queue<int> q;
dist[src] = 0;
q.push(src);
while (!q.empty()) {
    int u = q.front(); q.pop();
    for (int v : adj[u]) {
        if (dist[v] == -1) {
            dist[v] = dist[u] + 1;
            q.push(v);
        }
    }
}`,
      },
      {
        title: 'DFS & Connected Components',
        content: 'Mark visited, recurse on neighbors. Count components = number of DFS calls from main loop.\nDetect cycle in directed graph: use colors (white/gray/black).\nDetect cycle in undirected: track parent, if visited neighbor ≠ parent → cycle.',
      },
      {
        title: 'Topological Sort',
        content: 'Only for DAGs. Kahn\'s BFS: process in-degree 0 nodes first.\nDFS-based: add to stack on post-order.\nIf result size < n → cycle exists.',
        code: `// Kahn's algorithm
vector<int> indeg(n, 0);
for (int u = 0; u < n; u++)
    for (int v : adj[u]) indeg[v]++;
queue<int> q;
for (int i = 0; i < n; i++)
    if (indeg[i] == 0) q.push(i);
vector<int> order;
while (!q.empty()) {
    int u = q.front(); q.pop();
    order.push_back(u);
    for (int v : adj[u])
        if (--indeg[v] == 0) q.push(v);
}`,
      },
      {
        title: 'Union-Find (DSU)',
        content: 'find(x): path compression → almost O(1).\nunion(x,y): union by rank/size.\nUsed for: connected components, Kruskal\'s MST, cycle detection in undirected graphs.',
        code: `vector<int> par(n), rnk(n, 0);
iota(par.begin(), par.end(), 0);
int find(int x) {
    return par[x] == x ? x : par[x] = find(par[x]);
}
void unite(int a, int b) {
    a = find(a); b = find(b);
    if (a == b) return;
    if (rnk[a] < rnk[b]) swap(a, b);
    par[b] = a;
    if (rnk[a] == rnk[b]) rnk[a]++;
}`,
      },
      {
        title: 'Dijkstra\'s Algorithm',
        content: 'Shortest path in weighted graph (non-negative edges).\nUse min-heap with (dist, node). Relax neighbors.\nTime: O((V + E) log V) with priority queue.',
        code: `vector<int> dist(n, INT_MAX);
priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
dist[src] = 0;
pq.push({0, src});
while (!pq.empty()) {
    auto [d, u] = pq.top(); pq.pop();
    if (d > dist[u]) continue;
    for (auto [v, w] : adj[u]) {
        if (dist[u] + w < dist[v]) {
            dist[v] = dist[u] + w;
            pq.push({dist[v], v});
        }
    }
}`,
      },
    ],
  },
  {
    name: 'Dynamic Programming',
    slug: 'dp',
    entries: [
      {
        title: 'DP Framework',
        content: '1. Define state: what info do you need to make a decision?\n2. Write recurrence: how does current state relate to subproblems?\n3. Base case: what\'s the simplest scenario?\n4. Build order: bottom-up or top-down with memoization?\n5. Optimize space if only previous row/state needed.',
      },
      {
        title: '0/1 Knapsack',
        content: 'dp[i][w] = max value using items 0..i with capacity w.\nTransition: dp[i][w] = max(dp[i-1][w], dp[i-1][w-wt[i]] + val[i]).\nSpace optimize to 1D: iterate w from capacity down to wt[i].',
        code: `vector<int> dp(W + 1, 0);
for (int i = 0; i < n; i++)
    for (int w = W; w >= wt[i]; w--)
        dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);`,
      },
      {
        title: 'LCS / LIS',
        content: 'LCS: dp[i][j] = LCS of s[0..i-1] and t[0..j-1]. If match, 1 + dp[i-1][j-1].\nLIS in O(n log n): maintain sorted tails array, binary search for position.\nEdit Distance: similar to LCS with insert/delete/replace costs.',
        code: `// LIS in O(n log n)
vector<int> tails;
for (int x : a) {
    auto it = lower_bound(tails.begin(), tails.end(), x);
    if (it == tails.end()) tails.push_back(x);
    else *it = x;
}
return tails.size();`,
      },
      {
        title: 'Grid DP',
        content: 'Unique paths: dp[i][j] = dp[i-1][j] + dp[i][j-1].\nMin path sum: dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1]).\nCan often optimize to single row since only need previous row.',
      },
      {
        title: 'Interval DP',
        content: 'dp[i][j] = answer for subarray/substring [i..j].\nIterate by length, then by starting point.\nExamples: burst balloons, matrix chain multiplication, palindrome partitioning.',
        code: `for (int len = 2; len <= n; len++) {
    for (int i = 0; i <= n - len; i++) {
        int j = i + len - 1;
        for (int k = i; k < j; k++) {
            dp[i][j] = min(dp[i][j], dp[i][k] + dp[k+1][j] + cost);
        }
    }
}`,
      },
    ],
  },
  {
    name: 'Bit Manipulation',
    slug: 'bits',
    entries: [
      {
        title: 'Essential Bit Operations',
        content: 'Check bit: (n >> i) & 1\nSet bit: n | (1 << i)\nClear bit: n & ~(1 << i)\nToggle bit: n ^ (1 << i)\nCount set bits: __builtin_popcount(n)\nLowest set bit: n & (-n)\nClear lowest set bit: n & (n - 1)\nCheck power of 2: n > 0 && (n & (n-1)) == 0',
      },
      {
        title: 'XOR Tricks',
        content: 'a ^ a = 0, a ^ 0 = a → find single number in array.\nXOR of [0..n]: pattern repeats every 4 (n, 1, n+1, 0).\nSwap without temp: a ^= b; b ^= a; a ^= b;',
        code: `// Find single number (all others appear twice)
int single = 0;
for (int x : nums) single ^= x;
return single;`,
      },
      {
        title: 'Bitmask DP',
        content: 'Use integer as a set: bit i = 1 means element i is included.\nIterate subsets of mask: for (int sub = mask; sub > 0; sub = (sub - 1) & mask)\nTotal subsets of n elements = 2ⁿ. Feasible for n ≤ 20.',
      },
    ],
  },
  {
    name: 'Heap & Priority Queue',
    slug: 'heap',
    entries: [
      {
        title: 'Top-K Pattern',
        content: 'For K largest: use min-heap of size K. Push element, pop if size > K.\nFor K smallest: use max-heap of size K.\nAlternative: quickselect for O(n) average.',
        code: `// K largest elements
priority_queue<int, vector<int>, greater<int>> minHeap;
for (int x : nums) {
    minHeap.push(x);
    if (minHeap.size() > k) minHeap.pop();
}`,
      },
      {
        title: 'Merge K Sorted Lists/Arrays',
        content: 'Push first element from each list into min-heap.\nPop smallest, push next element from same list.\nTime: O(N log K) where N = total elements, K = number of lists.',
      },
      {
        title: 'Two Heaps (Median)',
        content: 'Max-heap for lower half, min-heap for upper half.\nBalance sizes: |maxHeap.size() - minHeap.size()| ≤ 1.\nMedian = top of larger heap, or average of both tops.',
        code: `priority_queue<int> lo; // max-heap
priority_queue<int, vector<int>, greater<int>> hi; // min-heap
void addNum(int num) {
    lo.push(num);
    hi.push(lo.top()); lo.pop();
    if (hi.size() > lo.size()) { lo.push(hi.top()); hi.pop(); }
}
double findMedian() {
    return lo.size() > hi.size() ? lo.top() : (lo.top() + hi.top()) / 2.0;
}`,
      },
    ],
  },
  {
    name: 'Backtracking',
    slug: 'backtracking',
    entries: [
      {
        title: 'Backtracking Template',
        content: 'Choose → Explore → Unchoose. Prune when constraints violated.\nSubsets: include or exclude each element.\nPermutations: try each unused element at current position.\nCombinations: like subsets but with size constraint.',
        code: `void backtrack(vector<int>& path, int start) {
    if (path.size() == k) { result.push_back(path); return; }
    for (int i = start; i <= n; i++) {
        path.push_back(i);
        backtrack(path, i + 1);
        path.pop_back();
    }
}`,
      },
      {
        title: 'Subset Generation',
        content: 'Iterative: for each element, copy all existing subsets and add element.\nBitmask: iterate 0 to 2ⁿ-1, bit i set → include element i.\nRecursive: include/exclude at each step.',
        code: `// All subsets using bitmask
for (int mask = 0; mask < (1 << n); mask++) {
    vector<int> subset;
    for (int i = 0; i < n; i++)
        if (mask & (1 << i)) subset.push_back(a[i]);
    result.push_back(subset);
}`,
      },
    ],
  },
  {
    name: 'Greedy Strategies',
    slug: 'greedy',
    entries: [
      {
        title: 'Interval Scheduling',
        content: 'Maximum non-overlapping intervals: sort by end time, greedily pick earliest ending.\nMinimum intervals to remove: total - max non-overlapping.\nMerge intervals: sort by start, merge if overlap.',
        code: `// Max non-overlapping intervals
sort(intervals.begin(), intervals.end(), [](auto& a, auto& b) {
    return a[1] < b[1];
});
int count = 1, end = intervals[0][1];
for (int i = 1; i < n; i++) {
    if (intervals[i][0] >= end) {
        count++;
        end = intervals[i][1];
    }
}`,
      },
      {
        title: 'Jump Game / Gas Station',
        content: 'Jump Game I: track farthest reachable index.\nJump Game II: BFS-style level expansion for min jumps.\nGas Station: if total gas ≥ total cost, unique start exists. Track running deficit.',
      },
      {
        title: 'When to Use Greedy',
        content: 'Problem has optimal substructure AND greedy choice property.\nLocal optimal choice leads to global optimal.\nSorting often reveals the greedy order.\nIf greedy doesn\'t work → try DP.',
      },
    ],
  },
  {
    name: 'Math & Number Theory',
    slug: 'math',
    entries: [
      {
        title: 'Modular Arithmetic',
        content: '(a + b) % m = ((a % m) + (b % m)) % m\n(a * b) % m = ((a % m) * (b % m)) % m\nModular inverse (when m is prime): a⁻¹ ≡ a^(m-2) mod m (Fermat\'s little theorem).\nUse long long to avoid overflow in multiplication.',
      },
      {
        title: 'GCD & LCM',
        content: 'GCD(a, b) = GCD(b, a % b), base: GCD(a, 0) = a.\nLCM(a, b) = a / GCD(a, b) * b (divide first to avoid overflow).\nExtended GCD: find x, y such that ax + by = GCD(a, b).',
        code: `int gcd(int a, int b) { return b == 0 ? a : gcd(b, a % b); }
int lcm(int a, int b) { return a / gcd(a, b) * b; }`,
      },
      {
        title: 'Sieve of Eratosthenes',
        content: 'Find all primes up to n in O(n log log n).\nMark multiples of each prime starting from p².\nFor prime factorization: store smallest prime factor (SPF).',
        code: `vector<bool> is_prime(n + 1, true);
is_prime[0] = is_prime[1] = false;
for (int i = 2; i * i <= n; i++)
    if (is_prime[i])
        for (int j = i * i; j <= n; j += i)
            is_prime[j] = false;`,
      },
      {
        title: 'Fast Exponentiation',
        content: 'Compute a^b mod m in O(log b).\nIf b is odd: a * power(a, b-1). If even: power(a*a, b/2).\nUsed in modular inverse, matrix exponentiation.',
        code: `long long power(long long a, long long b, long long m) {
    long long res = 1;
    a %= m;
    while (b > 0) {
        if (b & 1) res = res * a % m;
        a = a * a % m;
        b >>= 1;
    }
    return res;
}`,
      },
    ],
  },
  {
    name: 'Trie',
    slug: 'trie',
    entries: [
      {
        title: 'Trie Implementation',
        content: 'Node has children[26] and isEnd flag.\nInsert: traverse/create nodes for each character.\nSearch: traverse, check isEnd at last character.\nPrefix search: traverse, return true if path exists.',
        code: `struct TrieNode {
    TrieNode* children[26] = {};
    bool isEnd = false;
};
void insert(TrieNode* root, string& s) {
    for (char c : s) {
        if (!root->children[c - 'a'])
            root->children[c - 'a'] = new TrieNode();
        root = root->children[c - 'a'];
    }
    root->isEnd = true;
}`,
      },
      {
        title: 'When to Use Trie',
        content: 'Autocomplete / prefix matching.\nWord search in a grid (combine with DFS).\nCounting distinct substrings.\nXOR queries (binary trie).\nBetter than hash set when prefix queries matter.',
      },
    ],
  },
  {
    name: 'Interview Tips',
    slug: 'tips',
    entries: [
      {
        title: 'Problem-Solving Framework',
        content: '1. Clarify: ask about constraints, edge cases, input format.\n2. Examples: walk through 1-2 examples by hand.\n3. Brute force: state the naive solution and its complexity.\n4. Optimize: identify patterns, apply known techniques.\n5. Code: write clean, modular code.\n6. Test: trace through with examples, check edge cases.',
      },
      {
        title: 'Edge Cases Checklist',
        content: 'Empty input (n = 0).\nSingle element.\nAll same elements.\nAlready sorted / reverse sorted.\nNegative numbers.\nInteger overflow (use long long).\nNull/nullptr for trees and linked lists.\nDisconnected graph.',
      },
      {
        title: 'Common Mistakes',
        content: 'Off-by-one errors in binary search (lo < hi vs lo <= hi).\nForgetting to mark visited in BFS/DFS.\nModifying collection while iterating.\nInteger overflow in multiplication.\nNot handling the case when input is empty.\nUsing = instead of == in conditions.',
      },
      {
        title: 'STL Quick Reference',
        content: 'sort(a.begin(), a.end()) → O(n log n)\nreverse(a.begin(), a.end())\nlower_bound / upper_bound → O(log n) on sorted\nmax_element / min_element → O(n)\naccumulate(a.begin(), a.end(), 0LL)\nunordered_map / unordered_set → O(1) average\npriority_queue<int> (max-heap), priority_queue<int, vector<int>, greater<int>> (min-heap)',
      },
    ],
  },
];
