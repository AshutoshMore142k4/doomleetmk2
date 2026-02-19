export interface Template {
  title: string;
  code: string;
  whenToUse: string[];
  tips: string[];
}

export interface TemplateCategory {
  name: string;
  slug: string;
  templates: Template[];
}

export const templatesData: TemplateCategory[] = [
  {
    name: "Binary Search",
    slug: "binary-search",
    templates: [
      {
        title: "Standard Binary Search",
        code: `int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
        whenToUse: [
          "Sorted array + find target → O(log n)",
          "Search space is monotonic (sorted or has a clear partition)",
          "Problem says \"find element in sorted array\"",
        ],
        tips: [
          "Always use mid = left + (right - left) / 2 to avoid integer overflow",
          "left <= right when searching for exact match",
          "left < right when converging to a boundary",
        ],
      },
      {
        title: "Binary Search on Answer",
        code: `bool feasible(int mid) {
    // Your condition logic here
    return true;
}

int binarySearchAnswer(int left, int right) {
    int result = -1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (feasible(mid)) {
            result = mid;
            right = mid - 1; // Search for smaller answer
        } else {
            left = mid + 1;
        }
    }
    return result;
}`,
        whenToUse: [
          "\"Find minimum/maximum value that satisfies condition\"",
          "Answer space is monotonic — if X works, X+1 also works (or vice versa)",
          "Problems like: minimum capacity, maximum distance, allocate pages",
        ],
        tips: [
          "This is the MOST IMPORTANT binary search variant for interviews",
          "Key insight: you're not searching an array, you're searching the answer space",
          "Define feasible() carefully — this is where the real logic lives",
        ],
      },
      {
        title: "Lower Bound / Upper Bound",
        code: `// First element >= target
int lowerBound(vector<int>& arr, int target) {
    return lower_bound(arr.begin(), arr.end(), target) - arr.begin();
}

// First element > target
int upperBound(vector<int>& arr, int target) {
    return upper_bound(arr.begin(), arr.end(), target) - arr.begin();
}`,
        whenToUse: [
          "Find insertion point in sorted array",
          "Count occurrences: upperBound - lowerBound",
          "Find first/last occurrence of a value",
        ],
        tips: [
          "lower_bound returns iterator to first element ≥ target",
          "upper_bound returns iterator to first element > target",
          "Both return end() if no such element exists",
        ],
      },
    ],
  },
  {
    name: "Two Pointers",
    slug: "two-pointers",
    templates: [
      {
        title: "Opposite Direction (Sum Problems)",
        code: `vector<int> twoSumSorted(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    
    while (left < right) {
        int sum = nums[left] + nums[right];
        
        if (sum == target) return {left, right};
        else if (sum < target) left++;
        else right--;
    }
    return {-1, -1};
}`,
        whenToUse: [
          "Sorted array + find pair with target sum",
          "Problems involving palindromes",
          "Container with most water / trapping rain water",
        ],
        tips: [
          "Array MUST be sorted for sum problems",
          "Move left pointer to increase sum, right to decrease",
          "Can extend to 3Sum by fixing one element and doing 2Sum on rest",
        ],
      },
      {
        title: "Same Direction (Fast-Slow)",
        code: `int removeDuplicates(vector<int>& nums) {
    if (nums.empty()) return 0;
    
    int slow = 0;
    for (int fast = 1; fast < nums.size(); fast++) {
        if (nums[fast] != nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
    }
    return slow + 1;
}`,
        whenToUse: [
          "Remove duplicates in-place from sorted array",
          "Partition array based on condition",
          "Move zeroes, remove elements in-place",
        ],
        tips: [
          "Slow pointer marks the boundary of processed elements",
          "Fast pointer scans ahead to find next valid element",
          "Great for O(1) space in-place modifications",
        ],
      },
      {
        title: "Cycle Detection (Linked List)",
        code: `bool hasCycle(ListNode* head) {
    if (!head || !head->next) return false;
    
    ListNode *slow = head, *fast = head;
    
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        
        if (slow == fast) return true;
    }
    return false;
}`,
        whenToUse: [
          "Detect cycle in linked list (Floyd's algorithm)",
          "Find middle of linked list (slow reaches mid when fast reaches end)",
          "Find start of cycle: reset one pointer to head, move both by 1",
        ],
        tips: [
          "Fast moves 2x speed, slow moves 1x",
          "They MUST meet inside the cycle if one exists",
          "To find cycle start: after meeting, reset one to head, both move by 1",
        ],
      },
    ],
  },
  {
    name: "Sliding Window",
    slug: "sliding-window",
    templates: [
      {
        title: "Fixed Size Window",
        code: `int maxSumFixedWindow(vector<int>& nums, int k) {
    int windowSum = 0, maxSum = 0;
    
    // First window
    for (int i = 0; i < k; i++) {
        windowSum += nums[i];
    }
    maxSum = windowSum;
    
    // Slide the window
    for (int right = k; right < nums.size(); right++) {
        windowSum += nums[right] - nums[right - k];
        maxSum = max(maxSum, windowSum);
    }
    return maxSum;
}`,
        whenToUse: [
          "\"Subarray of size k\" or \"window of size k\"",
          "Maximum/minimum sum of k consecutive elements",
          "Any fixed-length contiguous subarray problem",
        ],
        tips: [
          "Add new element, remove oldest element — O(1) per slide",
          "Initialize first window separately, then slide",
          "Window size is always exactly k",
        ],
      },
      {
        title: "Variable Size — Longest Valid Window",
        code: `int lengthOfLongestSubstring(string s) {
    unordered_set<char> window;
    int left = 0, maxLen = 0;
    
    for (int right = 0; right < s.length(); right++) {
        while (window.count(s[right])) {
            window.erase(s[left]);
            left++;
        }
        
        window.insert(s[right]);
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
        whenToUse: [
          "\"Longest substring/subarray with condition\"",
          "Longest substring without repeating characters",
          "Longest subarray with at most K distinct elements",
        ],
        tips: [
          "Expand right pointer always, shrink left when invalid",
          "Update answer AFTER ensuring window is valid",
          "Use hashmap/set to track window state",
        ],
      },
      {
        title: "Variable Size — Shortest Valid Window",
        code: `int minSubArrayLen(int target, vector<int>& nums) {
    int left = 0, sum = 0, minLen = INT_MAX;
    
    for (int right = 0; right < nums.size(); right++) {
        sum += nums[right];
        
        while (sum >= target) {
            minLen = min(minLen, right - left + 1);
            sum -= nums[left];
            left++;
        }
    }
    return minLen == INT_MAX ? 0 : minLen;
}`,
        whenToUse: [
          "\"Minimum/shortest subarray with condition\"",
          "Minimum window substring",
          "Shortest subarray with sum ≥ target",
        ],
        tips: [
          "Expand right to make window valid, shrink left while still valid",
          "Update answer INSIDE the shrinking loop",
          "Opposite logic to longest window pattern",
        ],
      },
    ],
  },
  {
    name: "Prefix Sum",
    slug: "prefix-sum",
    templates: [
      {
        title: "Range Sum Queries",
        code: `class PrefixSum {
    vector<int> prefix;
public:
    PrefixSum(vector<int>& nums) {
        int n = nums.size();
        prefix.resize(n + 1, 0);
        
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
    }
    
    int rangeSum(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
};`,
        whenToUse: [
          "Multiple range sum queries on static array",
          "\"Sum of subarray from i to j\" — O(1) per query after O(n) build",
          "Subarray sum equals K (combine with hashmap)",
        ],
        tips: [
          "prefix[i] = sum of elements from index 0 to i-1",
          "Sum(l, r) = prefix[r+1] - prefix[l]",
          "For subarray sum = K: use hashmap to store prefix sum frequencies",
        ],
      },
    ],
  },
  {
    name: "Tree Traversals",
    slug: "tree-traversals",
    templates: [
      {
        title: "DFS — Recursive (Pre/In/Post)",
        code: `// PreOrder: Root -> Left -> Right
void preorder(TreeNode* root, vector<int>& result) {
    if (!root) return;
    result.push_back(root->val);
    preorder(root->left, result);
    preorder(root->right, result);
}

// InOrder: Left -> Root -> Right
void inorder(TreeNode* root, vector<int>& result) {
    if (!root) return;
    inorder(root->left, result);
    result.push_back(root->val);
    inorder(root->right, result);
}

// PostOrder: Left -> Right -> Root
void postorder(TreeNode* root, vector<int>& result) {
    if (!root) return;
    postorder(root->left, result);
    postorder(root->right, result);
    result.push_back(root->val);
}`,
        whenToUse: [
          "InOrder on BST → sorted output",
          "PreOrder → serialize/copy tree structure",
          "PostOrder → delete tree, calculate heights, bottom-up problems",
        ],
        tips: [
          "Always check if (!root) return as base case",
          "InOrder + PreOrder can reconstruct a unique binary tree",
          "Most tree problems are DFS — think recursively",
        ],
      },
      {
        title: "DFS — Iterative with Stack",
        code: `vector<int> preorderIterative(TreeNode* root) {
    vector<int> result;
    if (!root) return result;
    
    stack<TreeNode*> st;
    st.push(root);
    
    while (!st.empty()) {
        TreeNode* node = st.top();
        st.pop();
        result.push_back(node->val);
        
        if (node->right) st.push(node->right);
        if (node->left) st.push(node->left);
    }
    return result;
}`,
        whenToUse: [
          "When recursion depth might cause stack overflow",
          "Interview asks for iterative solution explicitly",
          "Need more control over traversal order",
        ],
        tips: [
          "Push RIGHT child first (stack is LIFO, so left is processed first)",
          "Iterative InOrder is trickier — use a curr pointer + stack",
          "Iterative PostOrder: use two stacks or reverse modified preorder",
        ],
      },
      {
        title: "BFS — Level Order Traversal",
        code: `vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> result;
    if (!root) return result;
    
    queue<TreeNode*> q;
    q.push(root);
    
    while (!q.empty()) {
        int levelSize = q.size();
        vector<int> currentLevel;
        
        for (int i = 0; i < levelSize; i++) {
            TreeNode* node = q.front();
            q.pop();
            currentLevel.push_back(node->val);
            
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        result.push_back(currentLevel);
    }
    return result;
}`,
        whenToUse: [
          "Level-by-level processing (zigzag, right side view)",
          "Find minimum depth of tree",
          "Connect nodes at same level",
        ],
        tips: [
          "Key trick: capture q.size() BEFORE the inner loop",
          "This gives you exact nodes at current level",
          "For zigzag: reverse alternate levels",
        ],
      },
    ],
  },
  {
    name: "Graph Traversals",
    slug: "graph-traversals",
    templates: [
      {
        title: "DFS on Graph",
        code: `void dfs(int node, vector<vector<int>>& graph, vector<bool>& visited) {
    visited[node] = true;
    
    for (int neighbor : graph[node]) {
        if (!visited[neighbor]) {
            dfs(neighbor, graph, visited);
        }
    }
}`,
        whenToUse: [
          "Count connected components",
          "Detect cycles in directed/undirected graphs",
          "Path finding, flood fill, island counting",
        ],
        tips: [
          "Always mark visited BEFORE recursing to avoid infinite loops",
          "For cycle detection in directed graph: use 3 states (white/gray/black)",
          "Time complexity: O(V + E)",
        ],
      },
      {
        title: "BFS on Graph",
        code: `void bfs(int start, vector<vector<int>>& graph) {
    queue<int> q;
    unordered_set<int> visited;
    
    q.push(start);
    visited.insert(start);
    
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        
        for (int neighbor : graph[node]) {
            if (!visited.count(neighbor)) {
                q.push(neighbor);
                visited.insert(neighbor);
            }
        }
    }
}`,
        whenToUse: [
          "Shortest path in UNWEIGHTED graph",
          "Level-by-level exploration",
          "Multi-source BFS (rotting oranges, walls and gates)",
        ],
        tips: [
          "BFS guarantees shortest path in unweighted graphs",
          "For multi-source: push ALL sources into queue initially",
          "Mark visited when PUSHING, not when POPPING (avoids duplicates)",
        ],
      },
      {
        title: "BFS — Shortest Path",
        code: `int shortestPath(vector<vector<int>>& graph, int start, int target) {
    queue<int> q;
    unordered_set<int> visited;
    
    q.push(start);
    visited.insert(start);
    int steps = 0;
    
    while (!q.empty()) {
        int size = q.size();
        
        for (int i = 0; i < size; i++) {
            int node = q.front();
            q.pop();
            
            if (node == target) return steps;
            
            for (int neighbor : graph[node]) {
                if (!visited.count(neighbor)) {
                    q.push(neighbor);
                    visited.insert(neighbor);
                }
            }
        }
        steps++;
    }
    return -1;
}`,
        whenToUse: [
          "\"Minimum steps/moves to reach target\"",
          "Word ladder, open the lock, jump game",
          "Any unweighted graph shortest path problem",
        ],
        tips: [
          "Track steps by processing level-by-level (capture queue size)",
          "For weighted graphs, use Dijkstra instead",
          "Return -1 if target unreachable",
        ],
      },
      {
        title: "Matrix DFS (4-Directional)",
        code: `void dfsMatrix(vector<vector<int>>& grid, int r, int c, 
               vector<vector<bool>>& visited) {
    int rows = grid.size(), cols = grid[0].size();
    
    if (r < 0 || r >= rows || c < 0 || c >= cols || visited[r][c]) {
        return;
    }
    
    visited[r][c] = true;
    
    int dr[] = {-1, 0, 1, 0};
    int dc[] = {0, 1, 0, -1};
    
    for (int i = 0; i < 4; i++) {
        dfsMatrix(grid, r + dr[i], c + dc[i], visited);
    }
}`,
        whenToUse: [
          "Number of islands, flood fill",
          "Any grid/matrix traversal problem",
          "Connected regions in 2D grid",
        ],
        tips: [
          "Use direction arrays: dr = {-1,0,1,0}, dc = {0,1,0,-1}",
          "Check bounds + visited in base case",
          "For 8-directional: add diagonal directions",
        ],
      },
    ],
  },
  {
    name: "Backtracking",
    slug: "backtracking",
    templates: [
      {
        title: "Generate All Permutations",
        code: `void backtrack(vector<int>& nums, vector<int>& path, vector<bool>& used, 
               vector<vector<int>>& result) {
    if (path.size() == nums.size()) {
        result.push_back(path);
        return;
    }
    
    for (int i = 0; i < nums.size(); i++) {
        if (used[i]) continue;
        
        path.push_back(nums[i]);
        used[i] = true;
        
        backtrack(nums, path, used, result);
        
        path.pop_back();
        used[i] = false;
    }
}`,
        whenToUse: [
          "Generate all arrangements of elements",
          "Problems asking for \"all possible orderings\"",
          "Letter case permutation, string permutations",
        ],
        tips: [
          "Use a 'used' boolean array to avoid reusing elements",
          "For permutations with duplicates: sort first + skip if nums[i] == nums[i-1] && !used[i-1]",
          "Time complexity: O(n! × n)",
        ],
      },
      {
        title: "Generate All Subsets",
        code: `void subsetsBacktrack(vector<int>& nums, int start, vector<int>& path, 
                      vector<vector<int>>& result) {
    result.push_back(path);
    
    for (int i = start; i < nums.size(); i++) {
        path.push_back(nums[i]);
        subsetsBacktrack(nums, i + 1, path, result);
        path.pop_back();
    }
}`,
        whenToUse: [
          "Power set — generate all 2^n subsets",
          "\"All possible combinations\" without size constraint",
          "Subset sum, partition problems",
        ],
        tips: [
          "Every node in recursion tree is a valid subset — add at start",
          "Use 'start' parameter to avoid duplicates (not 'used' array)",
          "For subsets with duplicates: sort + skip same adjacent elements",
        ],
      },
      {
        title: "Generate All Combinations",
        code: `void combine(int n, int k, int start, vector<int>& path, 
             vector<vector<int>>& result) {
    if (path.size() == k) {
        result.push_back(path);
        return;
    }
    
    for (int i = start; i <= n; i++) {
        path.push_back(i);
        combine(n, k, i + 1, path, result);
        path.pop_back();
    }
}`,
        whenToUse: [
          "C(n, k) — choose k elements from n",
          "Combination sum (with target)",
          "Phone number letter combinations",
        ],
        tips: [
          "Similar to subsets but stop at size k",
          "For combination sum with reuse: recurse with 'i' instead of 'i+1'",
          "Pruning: if remaining elements < needed, skip early",
        ],
      },
    ],
  },
  {
    name: "Dynamic Programming",
    slug: "dynamic-programming",
    templates: [
      {
        title: "1D DP (Fibonacci Pattern)",
        code: `int climbStairs(int n) {
    if (n <= 2) return n;
    
    vector<int> dp(n + 1);
    dp[1] = 1;
    dp[2] = 2;
    
    for (int i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}`,
        whenToUse: [
          "Current state depends on previous 1-2 states",
          "Climbing stairs, house robber, decode ways",
          "\"How many ways\" or \"minimum cost\" with linear structure",
        ],
        tips: [
          "Can optimize to O(1) space using two variables",
          "Always define what dp[i] means FIRST before coding",
          "Check base cases carefully — off-by-one errors are common",
        ],
      },
      {
        title: "2D DP (Grid Paths)",
        code: `int uniquePaths(int m, int n) {
    vector<vector<int>> dp(m, vector<int>(n, 1));
    
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
        }
    }
    return dp[m-1][n-1];
}`,
        whenToUse: [
          "Grid/matrix path problems",
          "Edit distance, LCS, LIS in 2D",
          "\"Minimum path sum\" or \"number of paths\"",
        ],
        tips: [
          "Initialize first row and column as base cases",
          "Can often optimize to 1D array (row by row)",
          "Draw the DP table by hand for small inputs to verify",
        ],
      },
      {
        title: "0/1 Knapsack",
        code: `int knapsack(vector<int>& weights, vector<int>& values, int capacity) {
    int n = weights.size();
    vector<vector<int>> dp(n + 1, vector<int>(capacity + 1, 0));
    
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= capacity; w++) {
            if (weights[i-1] <= w) {
                dp[i][w] = max(dp[i-1][w], 
                              dp[i-1][w - weights[i-1]] + values[i-1]);
            } else {
                dp[i][w] = dp[i-1][w];
            }
        }
    }
    return dp[n][capacity];
}`,
        whenToUse: [
          "\"Pick or skip\" decision for each item",
          "Subset sum, partition equal subset sum, target sum",
          "Bounded resources + maximize/minimize value",
        ],
        tips: [
          "Two choices per item: include or exclude",
          "Can optimize to 1D by iterating capacity in REVERSE",
          "For unbounded knapsack: iterate capacity forward instead",
        ],
      },
    ],
  },
  {
    name: "Monotonic Stack",
    slug: "monotonic-stack",
    templates: [
      {
        title: "Next Greater Element",
        code: `vector<int> nextGreaterElement(vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n, -1);
    stack<int> st;
    
    for (int i = 0; i < n; i++) {
        while (!st.empty() && nums[st.top()] < nums[i]) {
            result[st.top()] = nums[i];
            st.pop();
        }
        st.push(i);
    }
    return result;
}`,
        whenToUse: [
          "Next greater/smaller element for each position",
          "Largest rectangle in histogram",
          "Stock span, daily temperatures",
        ],
        tips: [
          "Stack stores INDICES, not values",
          "Monotonic decreasing stack → next greater element",
          "Monotonic increasing stack → next smaller element",
        ],
      },
    ],
  },
  {
    name: "Advanced Data Structures",
    slug: "advanced-ds",
    templates: [
      {
        title: "Union-Find (DSU)",
        code: `class UnionFind {
    vector<int> parent, rank;
public:
    UnionFind(int n) {
        parent.resize(n);
        rank.resize(n, 0);
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
    }
    
    int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }
    
    bool unite(int x, int y) {
        int rootX = find(x), rootY = find(y);
        if (rootX == rootY) return false;
        
        if (rank[rootX] < rank[rootY]) {
            parent[rootX] = rootY;
        } else if (rank[rootX] > rank[rootY]) {
            parent[rootY] = rootX;
        } else {
            parent[rootY] = rootX;
            rank[rootX]++;
        }
        return true;
    }
};`,
        whenToUse: [
          "\"Are two nodes connected?\" queries",
          "Count connected components dynamically",
          "Kruskal's MST, accounts merge, redundant connection",
        ],
        tips: [
          "Path compression in find() → nearly O(1) amortized",
          "Union by rank keeps tree balanced",
          "unite() returns false if already connected — useful for cycle detection",
        ],
      },
      {
        title: "Trie (Prefix Tree)",
        code: `class TrieNode {
public:
    unordered_map<char, TrieNode*> children;
    bool isEndOfWord;
    
    TrieNode() : isEndOfWord(false) {}
};

class Trie {
    TrieNode* root;
public:
    Trie() { root = new TrieNode(); }
    
    void insert(string word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children.count(c)) {
                node->children[c] = new TrieNode();
            }
            node = node->children[c];
        }
        node->isEndOfWord = true;
    }
    
    bool search(string word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children.count(c)) return false;
            node = node->children[c];
        }
        return node->isEndOfWord;
    }
};`,
        whenToUse: [
          "Prefix matching, autocomplete",
          "Word search in board/grid",
          "Longest common prefix, word dictionary",
        ],
        tips: [
          "Use unordered_map for sparse children, array[26] for dense lowercase",
          "Add startsWith by returning true without checking isEndOfWord",
          "Combine with DFS for word search problems",
        ],
      },
      {
        title: "Topological Sort (Kahn's BFS)",
        code: `vector<int> topologicalSort(int n, vector<vector<int>>& edges) {
    vector<int> indegree(n, 0);
    vector<vector<int>> graph(n);
    
    for (auto& edge : edges) {
        graph[edge[0]].push_back(edge[1]);
        indegree[edge[1]]++;
    }
    
    queue<int> q;
    for (int i = 0; i < n; i++) {
        if (indegree[i] == 0) q.push(i);
    }
    
    vector<int> result;
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        result.push_back(node);
        
        for (int neighbor : graph[node]) {
            indegree[neighbor]--;
            if (indegree[neighbor] == 0) {
                q.push(neighbor);
            }
        }
    }
    
    return result.size() == n ? result : vector<int>{};
}`,
        whenToUse: [
          "Task scheduling with prerequisites",
          "Course schedule, build order",
          "Detect cycle in directed graph (result.size() != n → cycle exists)",
        ],
        tips: [
          "Start with all nodes having indegree 0",
          "If result size < n, there's a cycle",
          "BFS (Kahn's) is easier to implement than DFS topological sort",
        ],
      },
    ],
  },
];
