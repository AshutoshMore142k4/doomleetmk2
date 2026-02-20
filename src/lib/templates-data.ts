export interface Template {
  title: string;
  code: string;
  timeComplexity: string;
  spaceComplexity: string;
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
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
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
        timeComplexity: "O(log(range) × feasible_check)",
        spaceComplexity: "O(1)",
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
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
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
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
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
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
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
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
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
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
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
        timeComplexity: "O(n)",
        spaceComplexity: "O(k) where k = charset size",
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
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
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
        timeComplexity: "O(n) build, O(1) per query",
        spaceComplexity: "O(n)",
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
        timeComplexity: "O(n)",
        spaceComplexity: "O(h) — h = tree height",
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
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
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
        timeComplexity: "O(n)",
        spaceComplexity: "O(w) — w = max width",
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
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V)",
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
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V)",
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
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V)",
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
        timeComplexity: "O(m × n)",
        spaceComplexity: "O(m × n)",
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
        timeComplexity: "O(n! × n)",
        spaceComplexity: "O(n)",
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
        timeComplexity: "O(2^n × n)",
        spaceComplexity: "O(n)",
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
        timeComplexity: "O(C(n,k) × k)",
        spaceComplexity: "O(k)",
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
    name: "DP Patterns",
    slug: "dp-patterns",
    templates: [
      {
        title: "Fibonacci-style (Climbing Stairs)",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        code: `int climbStairs(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int c = a + b;
        a = b;
        b = c;
    }
    return b;
}`,
        whenToUse: [
          "Current state depends on previous 1-2 states",
          "Climbing stairs, house robber, decode ways",
          "\"How many ways\" or \"minimum cost\" with linear structure",
        ],
        tips: [
          "O(1) space with two rolling variables instead of full array",
          "Always define what dp[i] means FIRST before coding",
          "Check base cases carefully — off-by-one errors are common",
        ],
      },
      {
        title: "Kadane's Algorithm (Max Subarray)",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        code: `int maxSubArray(vector<int>& nums) {
    int best = nums[0], cur = nums[0];
    for (int i = 1; i < (int)nums.size(); i++) {
        cur = max(nums[i], cur + nums[i]);
        best = max(best, cur);
    }
    return best;
}`,
        whenToUse: [
          "Maximum sum contiguous subarray",
          "\"Best time to buy and sell stock\" (single transaction)",
          "Any problem reducible to max subarray sum",
        ],
        tips: [
          "cur = max(x, cur + x) → either start fresh or extend",
          "Works in O(n) time, O(1) space",
          "For circular subarray: also check totalSum - minSubarraySum",
        ],
      },
      {
        title: "Unique Paths",
        timeComplexity: "O(m × n)",
        spaceComplexity: "O(m × n)",
        code: `int uniquePaths(int m, int n) {
    vector<vector<int>> dp(m, vector<int>(n, 1));
    for (int i = 1; i < m; i++)
        for (int j = 1; j < n; j++)
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
    return dp[m-1][n-1];
}`,
        whenToUse: [
          "Count paths in grid moving only right/down",
          "Grid with obstacles — set blocked cells to 0",
          "\"Number of ways to reach bottom-right\"",
        ],
        tips: [
          "First row and column are all 1s (only one way to reach them)",
          "Can optimize to 1D array processing row by row",
          "For obstacles: if grid[i][j] is blocked, dp[i][j] = 0",
        ],
      },
      {
        title: "Min Path Sum",
        timeComplexity: "O(m × n)",
        spaceComplexity: "O(m × n)",
        code: `int minPathSum(vector<vector<int>>& grid) {
    int m = grid.size(), n = grid[0].size();
    vector<vector<int>> dp(m, vector<int>(n, 0));
    dp[0][0] = grid[0][0];
    for (int i = 1; i < m; i++) dp[i][0] = dp[i-1][0] + grid[i][0];
    for (int j = 1; j < n; j++) dp[0][j] = dp[0][j-1] + grid[0][j];
    for (int i = 1; i < m; i++)
        for (int j = 1; j < n; j++)
            dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1]);
    return dp[m-1][n-1];
}`,
        whenToUse: [
          "Minimize cost path through grid",
          "\"Minimum path sum from top-left to bottom-right\"",
          "Grid with weighted cells",
        ],
        tips: [
          "Initialize edges carefully — they can only come from one direction",
          "dp[i][j] = grid[i][j] + min(from above, from left)",
          "Can do in-place on the grid itself to save space",
        ],
      },
      {
        title: "0/1 Knapsack (2D)",
        timeComplexity: "O(n × W)",
        spaceComplexity: "O(n × W)",
        code: `int knapsack01(vector<int>& w, vector<int>& v, int cap) {
    int n = w.size();
    vector<vector<int>> dp(n+1, vector<int>(cap+1, 0));
    for (int i = 1; i <= n; i++) {
        for (int c = 0; c <= cap; c++) {
            dp[i][c] = dp[i-1][c];
            if (w[i-1] <= c)
                dp[i][c] = max(dp[i][c], dp[i-1][c-w[i-1]] + v[i-1]);
        }
    }
    return dp[n][cap];
}`,
        whenToUse: [
          "\"Pick or skip\" decision for each item",
          "Subset sum, partition equal subset sum, target sum",
          "Bounded resources + maximize/minimize value",
        ],
        tips: [
          "Two choices per item: include or exclude",
          "Can optimize to 1D by iterating capacity in REVERSE",
          "dp[i][c] = max(skip item i, take item i)",
        ],
      },
      {
        title: "Subset Sum (Boolean, Space-Optimized)",
        timeComplexity: "O(n × target)",
        spaceComplexity: "O(target)",
        code: `bool canPartitionSum(vector<int>& nums, int target) {
    vector<char> dp(target + 1, 0);
    dp[0] = 1;
    for (int x : nums) {
        for (int s = target; s >= x; s--) {
            dp[s] = dp[s] || dp[s - x];
        }
    }
    return dp[target];
}`,
        whenToUse: [
          "\"Can we form sum T using a subset?\"",
          "Partition equal subset sum (target = totalSum / 2)",
          "Count subsets with given sum (change bool to int)",
        ],
        tips: [
          "Iterate capacity in REVERSE to avoid using same item twice",
          "O(n × target) time, O(target) space",
          "For count variant: dp[s] += dp[s - x]",
        ],
      },
      {
        title: "Unbounded Knapsack (Coin Change)",
        timeComplexity: "O(n × amount)",
        spaceComplexity: "O(amount)",
        code: `int coinChange(vector<int>& coins, int amount) {
    const int INF = amount + 1; // safe sentinel: valid answer is always <= amount
    vector<int> dp(amount + 1, INF);
    dp[0] = 0;
    for (int c : coins) {
        for (int a = c; a <= amount; a++) {
            dp[a] = min(dp[a], dp[a - c] + 1);
        }
    }
    return dp[amount] >= INF ? -1 : dp[amount];
}`,
        whenToUse: [
          "Unlimited supply of each item (coins, rod cutting)",
          "\"Minimum coins to make amount\"",
          "\"Number of ways to make change\" (count variant)",
        ],
        tips: [
          "Iterate capacity FORWARD (allows reusing same item)",
          "For counting ways: dp[a] += dp[a - c] with dp[0] = 1",
          "Key difference from 0/1: forward vs reverse inner loop",
        ],
      },
      {
        title: "LIS — O(n log n)",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        code: `int lengthOfLIS(vector<int>& nums) {
    vector<int> tail;
    for (int x : nums) {
        auto it = lower_bound(tail.begin(), tail.end(), x);
        if (it == tail.end()) tail.push_back(x);
        else *it = x;
    }
    return (int)tail.size();
}`,
        whenToUse: [
          "Longest increasing subsequence",
          "Russian doll envelopes, longest chain",
          "Any problem reducible to LIS",
        ],
        tips: [
          "tail[] is NOT the actual LIS — it's the smallest possible tail for each length",
          "lower_bound for strictly increasing, upper_bound for non-decreasing",
          "O(n²) DP version: dp[i] = max(dp[j] + 1) for all j < i where nums[j] < nums[i]",
        ],
      },
      {
        title: "LCS — O(n²)",
        timeComplexity: "O(n × m)",
        spaceComplexity: "O(n × m)",
        code: `int longestCommonSubsequence(string a, string b) {
    int n = a.size(), m = b.size();
    vector<vector<int>> dp(n+1, vector<int>(m+1, 0));
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
            dp[i][j] = (a[i-1] == b[j-1])
                ? dp[i-1][j-1] + 1
                : max(dp[i-1][j], dp[i][j-1]);
    return dp[n][m];
}`,
        whenToUse: [
          "Longest common subsequence of two strings",
          "Edit distance (similar structure)",
          "Diff algorithms, DNA sequence matching",
        ],
        tips: [
          "If chars match: diagonal + 1. Else: max(left, above)",
          "To reconstruct LCS: backtrack from dp[n][m]",
          "Can optimize to O(min(n,m)) space with rolling array",
        ],
      },
      {
        title: "Longest Palindromic Subsequence",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(n²)",
        code: `int longestPalindromeSubseq(string s) {
    int n = s.size();
    vector<vector<int>> dp(n, vector<int>(n, 0));
    for (int i = n - 1; i >= 0; i--) {
        dp[i][i] = 1;
        for (int j = i + 1; j < n; j++) {
            if (s[i] == s[j]) dp[i][j] = dp[i+1][j-1] + 2;
            else dp[i][j] = max(dp[i+1][j], dp[i][j-1]);
        }
    }
    return dp[0][n-1];
}`,
        whenToUse: [
          "Longest palindromic subsequence",
          "Min deletions to make string palindrome = n - LPS",
          "LPS(s) = LCS(s, reverse(s))",
        ],
        tips: [
          "Fill diagonally or bottom-up (i from n-1 to 0)",
          "dp[i][j] = length of LPS in s[i..j]",
          "Base case: every single char is a palindrome of length 1",
        ],
      },
      {
        title: "Min Cuts for Palindrome Partitioning",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(n²)",
        code: `int minCut(string s) {
    int n = s.size();
    vector<vector<char>> pal(n, vector<char>(n, 0));
    for (int i = n - 1; i >= 0; i--)
        for (int j = i; j < n; j++)
            if (s[i] == s[j] && (j - i <= 2 || pal[i+1][j-1]))
                pal[i][j] = 1;

    vector<int> dp(n, 1e9);
    for (int i = 0; i < n; i++) {
        if (pal[0][i]) dp[i] = 0;
        else {
            for (int j = 0; j < i; j++)
                if (pal[j+1][i])
                    dp[i] = min(dp[i], dp[j] + 1);
        }
    }
    return dp[n-1];
}`,
        whenToUse: [
          "Minimum cuts to partition into palindromes",
          "Palindrome partitioning (all partitions → backtracking)",
          "Problems combining palindrome check with optimization",
        ],
        tips: [
          "Pre-compute palindrome table pal[i][j] first",
          "dp[i] = min cuts for s[0..i]",
          "If s[0..i] is already palindrome, dp[i] = 0",
        ],
      },
      {
        title: "Interval DP — Matrix Chain Multiplication",
        timeComplexity: "O(n³)",
        spaceComplexity: "O(n²)",
        code: `// Matrix Chain: dims[] has n+1 elements for n matrices
// Matrix i has dimensions dims[i] x dims[i+1]
int matrixChainOrder(vector<int>& dims) {
    int n = dims.size() - 1;
    vector<vector<int>> dp(n, vector<int>(n, 0));

    for (int len = 2; len <= n; len++) {
        for (int l = 0; l + len - 1 < n; l++) {
            int r = l + len - 1;
            dp[l][r] = INT_MAX;
            for (int k = l; k < r; k++) {
                int cost = dp[l][k] + dp[k+1][r]
                         + dims[l] * dims[k+1] * dims[r+1];
                dp[l][r] = min(dp[l][r], cost);
            }
        }
    }
    return dp[0][n - 1];
}`,
        whenToUse: [
          "\"Merge stones\", matrix chain multiplication",
          "Problems on subarrays/substrings with split points",
          "Optimal BST, burst balloons",
        ],
        tips: [
          "Always iterate by increasing interval LENGTH",
          "O(n³) typical — try to optimize with Knuth's optimization if monotonic",
          "dp[l][r] = best answer for the subarray/substring l..r",
        ],
      },
      {
        title: "Burst Balloons",
        timeComplexity: "O(n³)",
        spaceComplexity: "O(n²)",
        code: `int maxCoins(vector<int>& nums) {
    int n = nums.size();
    vector<int> a(n + 2, 1);
    for (int i = 0; i < n; i++) a[i+1] = nums[i];
    int m = n + 2;
    vector<vector<int>> dp(m, vector<int>(m, 0));

    for (int len = 2; len < m; len++) {
        for (int l = 0; l + len < m; l++) {
            int r = l + len;
            for (int k = l + 1; k < r; k++) {
                dp[l][r] = max(dp[l][r],
                    dp[l][k] + dp[k][r] + a[l]*a[k]*a[r]);
            }
        }
    }
    return dp[0][m-1];
}`,
        whenToUse: [
          "Burst balloons — choose last balloon to burst in interval",
          "Problems where order of removal matters",
          "\"Maximize score by choosing split points\"",
        ],
        tips: [
          "Pad with 1s at boundaries for clean multiplication",
          "Think \"which element is LAST to process\" in the interval",
          "dp[l][r] = max coins from bursting all balloons between l and r",
        ],
      },
      {
        title: "Stock DP — With Cooldown",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        code: `int maxProfitCooldown(vector<int>& prices) {
    long long hold = LLONG_MIN/4, sold = 0, rest = 0;
    for (int p : prices) {
        long long prevSold = sold;
        sold = hold + p;
        hold = max(hold, rest - p);
        rest = max(rest, prevSold);
    }
    return (int)max(sold, rest);
}`,
        whenToUse: [
          "Buy/sell with cooldown period after selling",
          "State machine DP: hold, sold, rest states",
          "\"Best time to buy and sell stock with cooldown\"",
        ],
        tips: [
          "3 states: holding stock, just sold, resting (cooldown)",
          "Transitions: hold→sold (sell), rest→hold (buy), sold→rest (cooldown)",
          "O(n) time, O(1) space",
        ],
      },
      {
        title: "Stock DP — At Most K Transactions",
        timeComplexity: "O(n × k)",
        spaceComplexity: "O(k)",
        code: `int maxProfitK(int k, vector<int>& prices) {
    int n = prices.size();
    if (n == 0 || k == 0) return 0;
    if (k >= n/2) {
        int profit = 0;
        for (int i = 1; i < n; i++)
            profit += max(0, prices[i]-prices[i-1]);
        return profit;
    }
    vector<int> buy(k+1, INT_MIN/2), sell(k+1, 0);
    for (int p : prices)
        for (int t = 1; t <= k; t++) {
            buy[t] = max(buy[t], sell[t-1] - p);
            sell[t] = max(sell[t], buy[t] + p);
        }
    return sell[k];
}`,
        whenToUse: [
          "\"At most K buy-sell transactions\"",
          "Generalized stock problem with transaction limit",
          "When k ≥ n/2, equivalent to unlimited transactions",
        ],
        tips: [
          "Optimize: if k ≥ n/2, greedily take all positive diffs",
          "buy[t] = best profit after t-th buy, sell[t] = after t-th sell",
          "O(nk) time, O(k) space",
        ],
      },
      {
        title: "Tree DP — House Robber III",
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
        code: `pair<long long,long long> dfs(TreeNode* root) {
    if (!root) return {0, 0}; // {notTake, take}
    auto [ln, lt] = dfs(root->left);
    auto [rn, rt] = dfs(root->right);
    long long take = root->val + ln + rn;
    long long notTake = max(ln, lt) + max(rn, rt);
    return {notTake, take};
}

int rob(TreeNode* root) {
    auto [notTake, take] = dfs(root);
    return (int)max(notTake, take);
}`,
        whenToUse: [
          "DP on tree — each node returns multiple states",
          "House robber on tree, max independent set",
          "Problems where taking a node affects its children",
        ],
        tips: [
          "Postorder traversal: process children first, then combine at parent",
          "Return a pair/tuple of states from each DFS call",
          "take = node.val + notTake(left) + notTake(right)",
        ],
      },
      {
        title: "Longest Path in DAG",
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V + E)",
        code: `int longestPathDAG(int n, vector<vector<int>>& edges) {
    vector<vector<int>> g(n);
    vector<int> indeg(n, 0);
    for (auto &e : edges) {
        int u = e[0], v = e[1];
        g[u].push_back(v);
        indeg[v]++;
    }
    queue<int> q;
    vector<int> dp(n, 0);
    for (int i = 0; i < n; i++)
        if (indeg[i] == 0) q.push(i);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : g[u]) {
            dp[v] = max(dp[v], dp[u] + 1);
            if (--indeg[v] == 0) q.push(v);
        }
    }
    return *max_element(dp.begin(), dp.end());
}`,
        whenToUse: [
          "Longest/shortest path in a DAG",
          "Task scheduling with dependencies",
          "Any DP where states form a DAG (topological order)",
        ],
        tips: [
          "Process nodes in topological order using Kahn's BFS",
          "dp[v] = max(dp[u] + 1) for all predecessors u",
          "Works because DAG has no cycles → valid topological order",
        ],
      },
      {
        title: "Bitmask DP — TSP-style",
        timeComplexity: "O(2^n × n²)",
        spaceComplexity: "O(2^n × n)",
        code: `long long tsp(vector<vector<int>>& cost) {
    int n = cost.size();
    int FULL = 1 << n;
    const long long INF = 1e18;
    vector<vector<long long>> dp(FULL, vector<long long>(n, INF));

    dp[1][0] = 0; // start at node 0

    for (int mask = 1; mask < FULL; mask++) {
        for (int i = 0; i < n; i++) {
            if (!(mask & (1 << i)) || dp[mask][i] >= INF) continue;
            for (int j = 0; j < n; j++) {
                if (mask & (1 << j)) continue;
                int nmask = mask | (1 << j);
                dp[nmask][j] = min(dp[nmask][j], dp[mask][i] + cost[i][j]);
            }
        }
    }

    long long ans = INF;
    for (int i = 0; i < n; i++)
        ans = min(ans, dp[FULL - 1][i] + cost[i][0]);
    return ans;
}`,
        whenToUse: [
          "TSP — visit all nodes with minimum cost",
          "Assignment problems, matching (n ≤ 20)",
          "\"Visit all states\" where n is small enough for 2^n",
        ],
        tips: [
          "Only works for n ≤ 20 (2^20 ≈ 1M states)",
          "mask encodes which nodes are visited as a bitmask",
          "dp[mask][i] = best cost to reach node i having visited 'mask' nodes",
        ],
      },
      {
        title: "Digit DP — Count Numbers Without Digit 4",
        timeComplexity: "O(digits × 2 × 2 × 10)",
        spaceComplexity: "O(digits × 2 × 2)",
        code: `string s;
long long memo[20][2][2];
bool vis[20][2][2];

// Count numbers in [1, X] that do NOT contain digit 4
long long dfs(int pos, bool tight, bool started) {
    if (pos == (int)s.size())
        return started ? 1 : 0; // only count if we placed a non-zero number
    if (vis[pos][tight][started])
        return memo[pos][tight][started];
    vis[pos][tight][started] = true;

    long long ans = 0;
    int lim = tight ? (s[pos] - '0') : 9;
    for (int d = 0; d <= lim; d++) {
        if (d == 4) continue; // skip forbidden digit
        bool ntight = tight && (d == lim);
        bool nstarted = started || (d != 0);
        ans += dfs(pos + 1, ntight, nstarted);
    }
    return memo[pos][tight][started] = ans;
}

long long solve(long long X) {
    if (X <= 0) return 0;
    s = to_string(X);
    memset(vis, 0, sizeof(vis));
    return dfs(0, true, false);
}`,
        whenToUse: [
          "\"Count numbers in [L, R] with property P\"",
          "Count numbers without digit 4, with digit sum = K, etc.",
          "Any digit-level constraint on a number range",
        ],
        tips: [
          "solve(R) - solve(L-1) gives count in range [L, R]",
          "tight flag: are we still bounded by the upper limit?",
          "started flag: have we placed a non-zero digit yet? (handles leading zeros)",
        ],
      },
      {
        title: "Rolling Array (Space Optimization)",
        timeComplexity: "O(n × m)",
        spaceComplexity: "O(m) — reduced from O(n × m)",
        code: `// Instead of dp[n][m], use dp[2][m]
// Example: LCS with rolling array
int lcs(string a, string b) {
    int n = a.size(), m = b.size();
    vector<vector<int>> dp(2, vector<int>(m+1, 0));
    for (int i = 1; i <= n; i++) {
        int cur = i & 1, prev = 1 - cur;
        for (int j = 1; j <= m; j++) {
            if (a[i-1] == b[j-1])
                dp[cur][j] = dp[prev][j-1] + 1;
            else
                dp[cur][j] = max(dp[prev][j], dp[cur][j-1]);
        }
    }
    return dp[n & 1][m];
}`,
        whenToUse: [
          "When dp[i] only depends on dp[i-1] row",
          "LCS, edit distance, grid DP — reduce O(nm) space to O(m)",
          "Memory limit is tight",
        ],
        tips: [
          "Use i & 1 to alternate between rows 0 and 1",
          "Cannot reconstruct the solution path with rolling array",
          "For 1D DP: just use two variables (a, b) instead of array",
        ],
      },
      {
        title: "Sliding Window Maximum (Monotonic Deque)",
        timeComplexity: "O(n)",
        spaceComplexity: "O(k)",
        code: `vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq; // stores indices, front = index of current max
    vector<int> result;

    for (int i = 0; i < (int)nums.size(); i++) {
        // Remove out-of-window elements from front
        while (!dq.empty() && dq.front() <= i - k)
            dq.pop_front();

        // Remove smaller elements from back (they can never be max)
        while (!dq.empty() && nums[dq.back()] <= nums[i])
            dq.pop_back();

        dq.push_back(i);

        // Window is fully formed starting at index k-1
        if (i >= k - 1)
            result.push_back(nums[dq.front()]);
    }
    return result;
}`,
        whenToUse: [
          "DP transition looks at min/max over a sliding window of previous states",
          "Jump game with window, constrained subsequence sum",
          "Reduce O(nk) transitions to O(n) total",
        ],
        tips: [
          "Deque front = optimal candidate for current transition",
          "Pop from back to maintain monotonic order",
          "Pop from front to remove out-of-window elements",
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
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
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
        timeComplexity: "O(α(n)) ≈ O(1) per operation",
        spaceComplexity: "O(n)",
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
        timeComplexity: "O(L) per insert/search — L = word length",
        spaceComplexity: "O(total characters)",
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
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V + E)",
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
  {
    name: "Greedy",
    slug: "greedy",
    templates: [
      {
        title: "Interval Scheduling (Max Non-Overlapping)",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(1)",
        code: `int maxNonOverlapping(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end(),
         [](auto& a, auto& b) { return a[1] < b[1]; });
    int count = 0, end = INT_MIN;
    for (auto& iv : intervals) {
        if (iv[0] >= end) {
            count++;
            end = iv[1];
        }
    }
    return count;
}`,
        whenToUse: [
          "Select maximum non-overlapping intervals",
          "Meeting rooms / job scheduling variants",
          "Sort by end time, greedily pick earliest-finishing",
        ],
        tips: [
          "Always sort by END time, not start time",
          "Greedy choice: earliest finish leaves most room",
          "For min intervals to cover range, sort by start instead",
        ],
      },
      {
        title: "Jump Game (Can Reach End)",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        code: `bool canJump(vector<int>& nums) {
    int maxReach = 0;
    for (int i = 0; i < nums.size(); i++) {
        if (i > maxReach) return false;
        maxReach = max(maxReach, i + nums[i]);
    }
    return true;
}`,
        whenToUse: [
          "Reachability problems with variable jump lengths",
          "Any problem that asks 'can you reach the end?'",
          "Greedy tracking of farthest reachable position",
        ],
        tips: [
          "Track the farthest index you can reach",
          "If current index > maxReach, you're stuck",
          "For min jumps, use BFS / level-order approach",
        ],
      },
      {
        title: "Fractional Knapsack",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(1)",
        code: `double fractionalKnapsack(int W, vector<pair<int,int>>& items) {
    // items = {value, weight}
    sort(items.begin(), items.end(), [](auto& a, auto& b) {
        return (double)a.first / a.second > (double)b.first / b.second;
    });
    double totalValue = 0.0;
    for (auto& [val, wt] : items) {
        if (W >= wt) {
            totalValue += val;
            W -= wt;
        } else {
            totalValue += (double)val * W / wt;
            break;
        }
    }
    return totalValue;
}`,
        whenToUse: [
          "Knapsack where items can be fractionally taken",
          "Maximize value with limited capacity",
          "Sort by value/weight ratio",
        ],
        tips: [
          "Sort by value-to-weight ratio (descending)",
          "Take full items greedily until capacity runs out",
          "Take fraction of last item that fits",
        ],
      },
    ],
  },
  {
    name: "Heap / Priority Queue",
    slug: "heap-priority-queue",
    templates: [
      {
        title: "Kth Largest Element",
        timeComplexity: "O(n log k)",
        spaceComplexity: "O(k)",
        code: `int findKthLargest(vector<int>& nums, int k) {
    // Min-heap of size k — top is kth largest
    priority_queue<int, vector<int>, greater<int>> minHeap;
    for (int num : nums) {
        minHeap.push(num);
        if ((int)minHeap.size() > k) minHeap.pop();
    }
    return minHeap.top();
}`,
        whenToUse: [
          "Find kth largest / smallest element",
          "Top-K frequent / closest / largest problems",
          "Streaming data — maintain running kth element",
        ],
        tips: [
          "For kth LARGEST, use a MIN-heap of size k",
          "For kth SMALLEST, use a MAX-heap of size k",
          "Heap top always holds the answer",
        ],
      },
      {
        title: "Merge K Sorted Lists",
        timeComplexity: "O(N log k)",
        spaceComplexity: "O(k)",
        code: `struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* mergeKLists(vector<ListNode*>& lists) {
    auto cmp = [](ListNode* a, ListNode* b) {
        return a->val > b->val;
    };
    priority_queue<ListNode*, vector<ListNode*>, decltype(cmp)> pq(cmp);

    for (auto* list : lists)
        if (list) pq.push(list);

    ListNode dummy(0);
    ListNode* tail = &dummy;
    while (!pq.empty()) {
        auto* node = pq.top(); pq.pop();
        tail->next = node;
        tail = tail->next;
        if (node->next) pq.push(node->next);
    }
    return dummy.next;
}`,
        whenToUse: [
          "Merge multiple sorted sequences efficiently",
          "K-way merge pattern",
          "Streaming merge from K sources",
        ],
        tips: [
          "Push one element from each list into the heap",
          "Pop min, advance that list, push next element",
          "Dummy head simplifies linked list construction",
        ],
      },
      {
        title: "Median from Data Stream",
        timeComplexity: "O(log n) per insert, O(1) median",
        spaceComplexity: "O(n)",
        code: `class MedianFinder {
    priority_queue<int> lo;                             // max-heap (lower half)
    priority_queue<int, vector<int>, greater<int>> hi;  // min-heap (upper half)
public:
    void addNum(int num) {
        lo.push(num);
        hi.push(lo.top()); lo.pop();
        if (hi.size() > lo.size()) {
            lo.push(hi.top()); hi.pop();
        }
    }
    double findMedian() {
        return lo.size() > hi.size()
            ? lo.top()
            : (lo.top() + hi.top()) / 2.0;
    }
};`,
        whenToUse: [
          "Running median in a data stream",
          "Need fast insert + fast median query",
          "Two-heap pattern: split data into lower/upper halves",
        ],
        tips: [
          "Max-heap holds smaller half, min-heap holds larger half",
          "Always push through lo → hi to maintain order",
          "Rebalance so lo.size() >= hi.size()",
        ],
      },
    ],
  },
  {
    name: "Shortest Path Algorithms",
    slug: "shortest-path",
    templates: [
      {
        title: "Dijkstra's Algorithm",
        timeComplexity: "O((V + E) log V)",
        spaceComplexity: "O(V + E)",
        code: `vector<int> dijkstra(int n, vector<vector<pair<int,int>>>& adj, int src) {
    vector<int> dist(n, INT_MAX);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    dist[src] = 0;
    pq.push({0, src});

    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;  // stale entry
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`,
        whenToUse: [
          "Single-source shortest path with non-negative weights",
          "Weighted graph shortest path",
          "Network routing / minimum cost path problems",
        ],
        tips: [
          "Only works for NON-NEGATIVE edge weights",
          "Skip stale entries with if (d > dist[u]) continue",
          "For negative weights, use Bellman-Ford instead",
        ],
      },
      {
        title: "Bellman-Ford Algorithm",
        timeComplexity: "O(V × E)",
        spaceComplexity: "O(V)",
        code: `vector<int> bellmanFord(int n, vector<tuple<int,int,int>>& edges, int src) {
    vector<int> dist(n, INT_MAX);
    dist[src] = 0;

    for (int i = 0; i < n - 1; i++) {
        for (auto& [u, v, w] : edges) {
            if (dist[u] != INT_MAX && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }
    // Detect negative cycle
    for (auto& [u, v, w] : edges) {
        if (dist[u] != INT_MAX && dist[u] + w < dist[v]) {
            return {};  // negative cycle exists
        }
    }
    return dist;
}`,
        whenToUse: [
          "Shortest path with negative edge weights",
          "Detect negative weight cycles",
          "When Dijkstra fails due to negative edges",
        ],
        tips: [
          "Relax all edges V-1 times",
          "One more pass detects negative cycles",
          "Slower than Dijkstra but handles negative weights",
        ],
      },
      {
        title: "Floyd-Warshall (All-Pairs Shortest Path)",
        timeComplexity: "O(V³)",
        spaceComplexity: "O(V²)",
        code: `vector<vector<int>> floydWarshall(int n, vector<vector<int>>& dist) {
    // dist[i][j] = weight of edge (i,j), or INT_MAX if no edge
    // dist[i][i] = 0
    for (int k = 0; k < n; k++)
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                if (dist[i][k] != INT_MAX && dist[k][j] != INT_MAX)
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
    return dist;
}`,
        whenToUse: [
          "All-pairs shortest path in dense graphs",
          "Small graph (V ≤ 400–500)",
          "Transitive closure / reachability queries",
        ],
        tips: [
          "K loop must be outermost",
          "Guard against INT_MAX overflow before adding",
          "Can detect negative cycles: dist[i][i] < 0",
        ],
      },
    ],
  },
  {
    name: "Linked List Patterns",
    slug: "linked-list",
    templates: [
      {
        title: "Reverse a Linked List (Iterative)",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        code: `ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr) {
        ListNode* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
        whenToUse: [
          "Reverse entire or partial linked list",
          "Building block for many LL problems",
          "Palindrome check, reorder list, etc.",
        ],
        tips: [
          "Three pointers: prev, curr, next",
          "Save next before overwriting curr->next",
          "prev ends up as the new head",
        ],
      },
      {
        title: "Detect Cycle (Floyd's Algorithm)",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        code: `ListNode* detectCycle(ListNode* head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {
            slow = head;
            while (slow != fast) {
                slow = slow->next;
                fast = fast->next;
            }
            return slow;  // cycle start
        }
    }
    return nullptr;  // no cycle
}`,
        whenToUse: [
          "Detect if linked list has a cycle",
          "Find the start node of a cycle",
          "Floyd's tortoise and hare algorithm",
        ],
        tips: [
          "Phase 1: slow (1 step) and fast (2 steps) meet inside cycle",
          "Phase 2: reset slow to head, both move 1 step — they meet at cycle start",
          "Works because of math: distance from head to cycle start == distance from meeting point to cycle start",
        ],
      },
      {
        title: "Merge Two Sorted Lists",
        timeComplexity: "O(n + m)",
        spaceComplexity: "O(1)",
        code: `ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    ListNode dummy(0);
    ListNode* tail = &dummy;
    while (l1 && l2) {
        if (l1->val <= l2->val) {
            tail->next = l1;
            l1 = l1->next;
        } else {
            tail->next = l2;
            l2 = l2->next;
        }
        tail = tail->next;
    }
    tail->next = l1 ? l1 : l2;
    return dummy.next;
}`,
        whenToUse: [
          "Merge two sorted linked lists into one sorted list",
          "Building block for merge sort on linked lists",
          "Combine two ordered sequences",
        ],
        tips: [
          "Use a dummy head to simplify edge cases",
          "Append remaining nodes after loop",
          "In-place — no extra nodes created",
        ],
      },
    ],
  },
  {
    name: "Bit Manipulation",
    slug: "bit-manipulation",
    templates: [
      {
        title: "Single Number (XOR)",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        code: `int singleNumber(vector<int>& nums) {
    int result = 0;
    for (int num : nums) result ^= num;
    return result;
}`,
        whenToUse: [
          "Every element appears twice except one — find the unique one",
          "XOR all elements: duplicates cancel out",
          "Missing / unique element with XOR trick",
        ],
        tips: [
          "a ^ a = 0, a ^ 0 = a",
          "XOR is commutative and associative",
          "For 'appears 3 times except one', use bit counting per position",
        ],
      },
      {
        title: "Count Set Bits (Brian Kernighan)",
        timeComplexity: "O(number of set bits)",
        spaceComplexity: "O(1)",
        code: `int countSetBits(int n) {
    int count = 0;
    while (n) {
        n &= (n - 1);  // clear lowest set bit
        count++;
    }
    return count;
}`,
        whenToUse: [
          "Count number of 1-bits in an integer",
          "Hamming weight / popcount",
          "Problems involving subset size via bitmask",
        ],
        tips: [
          "n & (n-1) clears the lowest set bit",
          "Loop runs exactly (number of set bits) times",
          "Also useful: __builtin_popcount(n) in C++",
        ],
      },
      {
        title: "Power of Two Check",
        timeComplexity: "O(1)",
        spaceComplexity: "O(1)",
        code: `bool isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}`,
        whenToUse: [
          "Check if a number is a power of 2",
          "Bitmask problems — power-of-2 means exactly one bit set",
          "Fast validation without loops",
        ],
        tips: [
          "A power of 2 has exactly one set bit",
          "n & (n-1) == 0 means only one bit is set",
          "Must check n > 0 (0 is not a power of 2)",
        ],
      },
      {
        title: "Subsets Using Bitmask",
        timeComplexity: "O(2^n × n)",
        spaceComplexity: "O(2^n × n)",
        code: `vector<vector<int>> subsets(vector<int>& nums) {
    int n = nums.size();
    vector<vector<int>> result;
    for (int mask = 0; mask < (1 << n); mask++) {
        vector<int> subset;
        for (int i = 0; i < n; i++) {
            if (mask & (1 << i)) subset.push_back(nums[i]);
        }
        result.push_back(subset);
    }
    return result;
}`,
        whenToUse: [
          "Generate all subsets of a set",
          "Enumerate all 2^n combinations",
          "When n ≤ 20 and brute force is feasible",
        ],
        tips: [
          "Each bit in mask represents include/exclude",
          "mask & (1 << i) checks if element i is included",
          "Total subsets = 2^n",
        ],
      },
    ],
  },
  {
    name: "Segment Tree",
    slug: "segment-tree",
    templates: [
      {
        title: "Segment Tree (Range Sum + Point Update)",
        timeComplexity: "O(n) build, O(log n) query/update",
        spaceComplexity: "O(n)",
        code: `class SegTree {
    vector<int> tree;
    int n;
    void build(vector<int>& arr, int node, int start, int end) {
        if (start == end) { tree[node] = arr[start]; return; }
        int mid = (start + end) / 2;
        build(arr, 2*node, start, mid);
        build(arr, 2*node+1, mid+1, end);
        tree[node] = tree[2*node] + tree[2*node+1];
    }
    void update(int node, int start, int end, int idx, int val) {
        if (start == end) { tree[node] = val; return; }
        int mid = (start + end) / 2;
        if (idx <= mid) update(2*node, start, mid, idx, val);
        else update(2*node+1, mid+1, end, idx, val);
        tree[node] = tree[2*node] + tree[2*node+1];
    }
    int query(int node, int start, int end, int l, int r) {
        if (r < start || end < l) return 0;
        if (l <= start && end <= r) return tree[node];
        int mid = (start + end) / 2;
        return query(2*node, start, mid, l, r) +
               query(2*node+1, mid+1, end, l, r);
    }
public:
    SegTree(vector<int>& arr) : n(arr.size()), tree(4 * arr.size()) {
        build(arr, 1, 0, n - 1);
    }
    void update(int idx, int val) { update(1, 0, n-1, idx, val); }
    int query(int l, int r) { return query(1, 0, n-1, l, r); }
};`,
        whenToUse: [
          "Range sum / min / max queries with point updates",
          "Need O(log n) per query AND update",
          "Used in competitive programming for range-query problems",
        ],
        tips: [
          "Tree size = 4×n is safe upper bound",
          "Node i has children 2i and 2i+1",
          "Change + to min/max for range min/max tree",
        ],
      },
      {
        title: "Segment Tree with Lazy Propagation",
        timeComplexity: "O(n) build, O(log n) range update/query",
        spaceComplexity: "O(n)",
        code: `class LazySegTree {
    vector<long long> tree, lazy;
    int n;
    void pushDown(int node) {
        if (lazy[node]) {
            for (int child : {2*node, 2*node+1}) {
                tree[child] += lazy[node];
                lazy[child] += lazy[node];
            }
            lazy[node] = 0;
        }
    }
    void rangeUpdate(int node, int start, int end, int l, int r, long long val) {
        if (r < start || end < l) return;
        if (l <= start && end <= r) {
            tree[node] += val;
            lazy[node] += val;
            return;
        }
        pushDown(node);
        int mid = (start + end) / 2;
        rangeUpdate(2*node, start, mid, l, r, val);
        rangeUpdate(2*node+1, mid+1, end, l, r, val);
        tree[node] = max(tree[2*node], tree[2*node+1]);
    }
    long long query(int node, int start, int end, int l, int r) {
        if (r < start || end < l) return LLONG_MIN;
        if (l <= start && end <= r) return tree[node];
        pushDown(node);
        int mid = (start + end) / 2;
        return max(query(2*node, start, mid, l, r),
                   query(2*node+1, mid+1, end, l, r));
    }
public:
    LazySegTree(int sz) : n(sz), tree(4*sz, 0), lazy(4*sz, 0) {}
    void update(int l, int r, long long val) { rangeUpdate(1, 0, n-1, l, r, val); }
    long long query(int l, int r) { return query(1, 0, n-1, l, r); }
};`,
        whenToUse: [
          "Range updates + range queries (both O(log n))",
          "Add value to a range and query max/sum of a range",
          "Problems requiring bulk updates over intervals",
        ],
        tips: [
          "Lazy stores pending updates not yet pushed to children",
          "Always pushDown before recursing into children",
          "Adapt merge function (max / min / sum) to problem needs",
        ],
      },
    ],
  },
  {
    name: "String Algorithms",
    slug: "string-algorithms",
    templates: [
      {
        title: "KMP Pattern Matching",
        timeComplexity: "O(n + m)",
        spaceComplexity: "O(m)",
        code: `vector<int> kmpSearch(string& text, string& pattern) {
    int n = text.size(), m = pattern.size();
    // Build failure / LPS array
    vector<int> lps(m, 0);
    for (int i = 1, len = 0; i < m; ) {
        if (pattern[i] == pattern[len]) {
            lps[i++] = ++len;
        } else if (len) {
            len = lps[len - 1];
        } else {
            lps[i++] = 0;
        }
    }
    // Search
    vector<int> matches;
    for (int i = 0, j = 0; i < n; ) {
        if (text[i] == pattern[j]) { i++; j++; }
        if (j == m) {
            matches.push_back(i - j);
            j = lps[j - 1];
        } else if (i < n && text[i] != pattern[j]) {
            if (j) j = lps[j - 1];
            else i++;
        }
    }
    return matches;
}`,
        whenToUse: [
          "Exact pattern matching in O(n + m)",
          "Find all occurrences of pattern in text",
          "When brute force O(n×m) is too slow",
        ],
        tips: [
          "LPS[i] = length of longest proper prefix which is also suffix of pattern[0..i]",
          "On mismatch, jump back using LPS to avoid re-comparing",
          "Build LPS in O(m), search in O(n)",
        ],
      },
      {
        title: "Rabin-Karp (Rolling Hash)",
        timeComplexity: "O(n + m) average, O(n×m) worst",
        spaceComplexity: "O(1)",
        code: `vector<int> rabinKarp(string& text, string& pattern) {
    int n = text.size(), m = pattern.size();
    if (m > n) return {};
    const long long MOD = 1e9 + 7, BASE = 31;
    long long pHash = 0, tHash = 0, power = 1;

    for (int i = 0; i < m; i++) {
        pHash = (pHash * BASE + pattern[i]) % MOD;
        tHash = (tHash * BASE + text[i]) % MOD;
        if (i < m - 1) power = power * BASE % MOD;
    }

    vector<int> matches;
    for (int i = 0; i <= n - m; i++) {
        if (pHash == tHash) {
            if (text.substr(i, m) == pattern) matches.push_back(i);
        }
        if (i < n - m) {
            tHash = ((tHash - text[i] * power % MOD + MOD) * BASE + text[i + m]) % MOD;
        }
    }
    return matches;
}`,
        whenToUse: [
          "Pattern matching with rolling hash",
          "Multiple pattern search (compute hash for each pattern)",
          "Substring equality checks in O(1) after preprocessing",
        ],
        tips: [
          "Use double hashing (two different MODs) to reduce collisions",
          "Always verify matches with actual string comparison",
          "Rolling hash: remove leftmost char, add rightmost char",
        ],
      },
      {
        title: "Z-Algorithm (Z-Array)",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        code: `vector<int> zFunction(string& s) {
    int n = s.size();
    vector<int> z(n, 0);
    int l = 0, r = 0;
    for (int i = 1; i < n; i++) {
        if (i < r) z[i] = min(r - i, z[i - l]);
        while (i + z[i] < n && s[z[i]] == s[i + z[i]]) z[i]++;
        if (i + z[i] > r) { l = i; r = i + z[i]; }
    }
    return z;
}

// Pattern matching: concat pattern + "$" + text, find z[i] == m
vector<int> zSearch(string& text, string& pattern) {
    string concat = pattern + "$" + text;
    int m = pattern.size();
    vector<int> z = zFunction(concat);
    vector<int> matches;
    for (int i = m + 1; i < (int)concat.size(); i++)
        if (z[i] == m) matches.push_back(i - m - 1);
    return matches;
}`,
        whenToUse: [
          "Pattern matching alternative to KMP",
          "Z[i] = length of longest substring starting at i matching prefix",
          "String periodicity and repetition detection",
        ],
        tips: [
          "Z[0] is undefined (typically set to 0 or n)",
          "For pattern matching: concat pattern + '$' + text",
          "Z-values equal to pattern length indicate matches",
        ],
      },
    ],
  },
];
