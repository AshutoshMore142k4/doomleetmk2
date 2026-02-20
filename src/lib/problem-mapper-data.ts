export interface ProblemMapping {
  lcNumber: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  templateCategory: string;     // slug matching templatesData
  templateName: string;          // exact template title
  hint: string;                  // one-liner on WHY this template
}

export const problemMappings: ProblemMapping[] = [
  // ── Binary Search ──
  { lcNumber: 704, title: "Binary Search", difficulty: "Easy", templateCategory: "binary-search", templateName: "Standard Binary Search", hint: "Sorted array + exact target → classic binary search" },
  { lcNumber: 35, title: "Search Insert Position", difficulty: "Easy", templateCategory: "binary-search", templateName: "Standard Binary Search", hint: "Find insertion point = lower bound binary search" },
  { lcNumber: 74, title: "Search a 2D Matrix", difficulty: "Medium", templateCategory: "binary-search", templateName: "Standard Binary Search", hint: "Flatten matrix conceptually, binary search on index" },
  { lcNumber: 33, title: "Search in Rotated Sorted Array", difficulty: "Medium", templateCategory: "binary-search", templateName: "Standard Binary Search", hint: "Binary search with rotation check at each step" },
  { lcNumber: 153, title: "Find Minimum in Rotated Sorted Array", difficulty: "Medium", templateCategory: "binary-search", templateName: "Standard Binary Search", hint: "Binary search on rotated sorted array" },
  { lcNumber: 875, title: "Koko Eating Bananas", difficulty: "Medium", templateCategory: "binary-search", templateName: "Binary Search on Answer", hint: "Binary search on speed; feasibility check per mid" },
  { lcNumber: 1011, title: "Capacity To Ship Packages Within D Days", difficulty: "Medium", templateCategory: "binary-search", templateName: "Binary Search on Answer", hint: "Search on capacity; check if feasible within D days" },
  { lcNumber: 410, title: "Split Array Largest Sum", difficulty: "Hard", templateCategory: "binary-search", templateName: "Binary Search on Answer", hint: "Binary search on answer; greedy split feasibility" },
  { lcNumber: 4, title: "Median of Two Sorted Arrays", difficulty: "Hard", templateCategory: "binary-search", templateName: "Standard Binary Search", hint: "Binary search on partition of shorter array" },

  // ── Two Pointers ──
  { lcNumber: 167, title: "Two Sum II - Input Array Is Sorted", difficulty: "Medium", templateCategory: "two-pointers", templateName: "Two Pointers (Sorted Array)", hint: "Sorted → two pointers from both ends" },
  { lcNumber: 15, title: "3Sum", difficulty: "Medium", templateCategory: "two-pointers", templateName: "Two Pointers (Sorted Array)", hint: "Sort + fix one, two-pointer for remaining two" },
  { lcNumber: 11, title: "Container With Most Water", difficulty: "Medium", templateCategory: "two-pointers", templateName: "Two Pointers (Sorted Array)", hint: "Two pointers from edges, shrink shorter side" },
  { lcNumber: 42, title: "Trapping Rain Water", difficulty: "Hard", templateCategory: "two-pointers", templateName: "Two Pointers (Sorted Array)", hint: "Two pointers track left/right max heights" },
  { lcNumber: 26, title: "Remove Duplicates from Sorted Array", difficulty: "Easy", templateCategory: "two-pointers", templateName: "Fast & Slow Pointers", hint: "Slow = write position, fast scans ahead" },
  { lcNumber: 283, title: "Move Zeroes", difficulty: "Easy", templateCategory: "two-pointers", templateName: "Fast & Slow Pointers", hint: "Slow writes non-zeros, fast scans all" },
  { lcNumber: 141, title: "Linked List Cycle", difficulty: "Easy", templateCategory: "two-pointers", templateName: "Fast & Slow Pointers", hint: "Floyd's cycle detection: slow + fast pointers" },
  { lcNumber: 142, title: "Linked List Cycle II", difficulty: "Medium", templateCategory: "two-pointers", templateName: "Fast & Slow Pointers", hint: "Floyd's: find meeting point then reset to head" },

  // ── Sliding Window ──
  { lcNumber: 209, title: "Minimum Size Subarray Sum", difficulty: "Medium", templateCategory: "sliding-window", templateName: "Variable-Size Sliding Window", hint: "Shrink window when sum ≥ target" },
  { lcNumber: 3, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", templateCategory: "sliding-window", templateName: "Variable-Size Sliding Window", hint: "Expand right, shrink left on duplicate" },
  { lcNumber: 76, title: "Minimum Window Substring", difficulty: "Hard", templateCategory: "sliding-window", templateName: "Variable-Size Sliding Window", hint: "Track char counts; shrink when all chars covered" },
  { lcNumber: 424, title: "Longest Repeating Character Replacement", difficulty: "Medium", templateCategory: "sliding-window", templateName: "Variable-Size Sliding Window", hint: "Window valid if len - maxFreq ≤ k" },
  { lcNumber: 567, title: "Permutation in String", difficulty: "Medium", templateCategory: "sliding-window", templateName: "Fixed-Size Sliding Window", hint: "Fixed window of pattern length; compare freq maps" },
  { lcNumber: 239, title: "Sliding Window Maximum", difficulty: "Hard", templateCategory: "sliding-window", templateName: "Fixed-Size Sliding Window", hint: "Monotonic deque for max in sliding window" },

  // ── Prefix Sum ──
  { lcNumber: 303, title: "Range Sum Query - Immutable", difficulty: "Easy", templateCategory: "prefix-sum", templateName: "1D Prefix Sum", hint: "Precompute prefix sums for O(1) range queries" },
  { lcNumber: 560, title: "Subarray Sum Equals K", difficulty: "Medium", templateCategory: "prefix-sum", templateName: "1D Prefix Sum", hint: "Prefix sum + hashmap for count of target sums" },
  { lcNumber: 304, title: "Range Sum Query 2D - Immutable", difficulty: "Medium", templateCategory: "prefix-sum", templateName: "2D Prefix Sum", hint: "2D prefix sums with inclusion-exclusion" },
  { lcNumber: 523, title: "Continuous Subarray Sum", difficulty: "Medium", templateCategory: "prefix-sum", templateName: "1D Prefix Sum", hint: "Prefix sum mod k; hashmap stores first occurrence" },

  // ── Tree Traversals ──
  { lcNumber: 94, title: "Binary Tree Inorder Traversal", difficulty: "Easy", templateCategory: "tree-traversals", templateName: "Iterative Inorder Traversal", hint: "Stack-based inorder: push all lefts, process, go right" },
  { lcNumber: 102, title: "Binary Tree Level Order Traversal", difficulty: "Medium", templateCategory: "tree-traversals", templateName: "Level-Order Traversal (BFS)", hint: "BFS with queue; process level by level" },
  { lcNumber: 104, title: "Maximum Depth of Binary Tree", difficulty: "Easy", templateCategory: "tree-traversals", templateName: "Level-Order Traversal (BFS)", hint: "BFS level count or DFS max(left, right) + 1" },
  { lcNumber: 226, title: "Invert Binary Tree", difficulty: "Easy", templateCategory: "tree-traversals", templateName: "Level-Order Traversal (BFS)", hint: "BFS or DFS, swap left and right at each node" },

  // ── Graph Traversals ──
  { lcNumber: 200, title: "Number of Islands", difficulty: "Medium", templateCategory: "graph-traversals", templateName: "Matrix DFS / BFS", hint: "DFS/BFS flood fill from each unvisited '1'" },
  { lcNumber: 695, title: "Max Area of Island", difficulty: "Medium", templateCategory: "graph-traversals", templateName: "Matrix DFS / BFS", hint: "DFS counting cells per island" },
  { lcNumber: 733, title: "Flood Fill", difficulty: "Easy", templateCategory: "graph-traversals", templateName: "Matrix DFS / BFS", hint: "DFS from start, change color of same-colored neighbors" },
  { lcNumber: 994, title: "Rotting Oranges", difficulty: "Medium", templateCategory: "graph-traversals", templateName: "Matrix DFS / BFS", hint: "Multi-source BFS from all rotten oranges" },
  { lcNumber: 207, title: "Course Schedule", difficulty: "Medium", templateCategory: "graph-traversals", templateName: "Graph BFS / DFS", hint: "Topological sort; cycle detection in directed graph" },
  { lcNumber: 210, title: "Course Schedule II", difficulty: "Medium", templateCategory: "graph-traversals", templateName: "Graph BFS / DFS", hint: "Kahn's BFS topological sort" },
  { lcNumber: 133, title: "Clone Graph", difficulty: "Medium", templateCategory: "graph-traversals", templateName: "Graph BFS / DFS", hint: "BFS/DFS with hashmap: old node → cloned node" },

  // ── Backtracking ──
  { lcNumber: 46, title: "Permutations", difficulty: "Medium", templateCategory: "backtracking", templateName: "Backtracking Template", hint: "Backtrack with used[] array, try each unused element" },
  { lcNumber: 78, title: "Subsets", difficulty: "Medium", templateCategory: "backtracking", templateName: "Backtracking Template", hint: "Include/exclude: add current state at every node" },
  { lcNumber: 39, title: "Combination Sum", difficulty: "Medium", templateCategory: "backtracking", templateName: "Backtracking Template", hint: "Backtrack with start index, allow reuse of elements" },
  { lcNumber: 40, title: "Combination Sum II", difficulty: "Medium", templateCategory: "backtracking", templateName: "Backtracking Template", hint: "Sort + skip duplicates at same level" },
  { lcNumber: 79, title: "Word Search", difficulty: "Medium", templateCategory: "backtracking", templateName: "Backtracking Template", hint: "DFS backtracking on grid, mark visited" },
  { lcNumber: 51, title: "N-Queens", difficulty: "Hard", templateCategory: "backtracking", templateName: "Backtracking Template", hint: "Place queens row by row, validate cols + diagonals" },
  { lcNumber: 131, title: "Palindrome Partitioning", difficulty: "Medium", templateCategory: "backtracking", templateName: "Backtracking Template", hint: "Try each palindrome prefix, recurse on rest" },
  { lcNumber: 17, title: "Letter Combinations of a Phone Number", difficulty: "Medium", templateCategory: "backtracking", templateName: "Backtracking Template", hint: "Map digits to letters, backtrack all combos" },

  // ── DP Patterns ──
  { lcNumber: 70, title: "Climbing Stairs", difficulty: "Easy", templateCategory: "dp-patterns", templateName: "0/1 Knapsack", hint: "dp[i] = dp[i-1] + dp[i-2] → Fibonacci-like DP" },
  { lcNumber: 198, title: "House Robber", difficulty: "Medium", templateCategory: "dp-patterns", templateName: "0/1 Knapsack", hint: "dp[i] = max(dp[i-1], dp[i-2] + nums[i])" },
  { lcNumber: 322, title: "Coin Change", difficulty: "Medium", templateCategory: "dp-patterns", templateName: "Coin Change (Unbounded Knapsack)", hint: "Unbounded knapsack: try each coin, dp[i] = min(dp[i-coin]+1)" },
  { lcNumber: 518, title: "Coin Change II", difficulty: "Medium", templateCategory: "dp-patterns", templateName: "Coin Change (Unbounded Knapsack)", hint: "Count combinations: dp[i] += dp[i-coin]" },
  { lcNumber: 300, title: "Longest Increasing Subsequence", difficulty: "Medium", templateCategory: "dp-patterns", templateName: "LIS (Longest Increasing Subsequence)", hint: "dp[i] = max LIS ending at i; or patience sorting O(n log n)" },
  { lcNumber: 1143, title: "Longest Common Subsequence", difficulty: "Medium", templateCategory: "dp-patterns", templateName: "LCS (Longest Common Subsequence)", hint: "2D DP: match → dp[i-1][j-1]+1, else max(left, up)" },
  { lcNumber: 72, title: "Edit Distance", difficulty: "Medium", templateCategory: "dp-patterns", templateName: "LCS (Longest Common Subsequence)", hint: "2D DP similar to LCS; insert/delete/replace ops" },
  { lcNumber: 121, title: "Best Time to Buy and Sell Stock", difficulty: "Easy", templateCategory: "dp-patterns", templateName: "Stock Buy/Sell with K Transactions", hint: "Track min price, max profit = price - minSoFar" },
  { lcNumber: 122, title: "Best Time to Buy and Sell Stock II", difficulty: "Medium", templateCategory: "dp-patterns", templateName: "Stock Buy/Sell with K Transactions", hint: "Unlimited txns: add every profitable day-to-day gain" },
  { lcNumber: 312, title: "Burst Balloons", difficulty: "Hard", templateCategory: "dp-patterns", templateName: "Matrix Chain Multiplication (Interval DP)", hint: "Interval DP: try each as last balloon to burst" },
  { lcNumber: 1312, title: "Min Insertions to Make String Palindrome", difficulty: "Hard", templateCategory: "dp-patterns", templateName: "LCS (Longest Common Subsequence)", hint: "n - LPS(s) where LPS = LCS(s, reverse(s))" },
  { lcNumber: 416, title: "Partition Equal Subset Sum", difficulty: "Medium", templateCategory: "dp-patterns", templateName: "0/1 Knapsack", hint: "Target = sum/2, 0/1 knapsack on elements" },
  { lcNumber: 494, title: "Target Sum", difficulty: "Medium", templateCategory: "dp-patterns", templateName: "0/1 Knapsack", hint: "Count subsets with target = (sum + target) / 2" },
  { lcNumber: 62, title: "Unique Paths", difficulty: "Medium", templateCategory: "dp-patterns", templateName: "0/1 Knapsack", hint: "dp[i][j] = dp[i-1][j] + dp[i][j-1]; grid DP" },
  { lcNumber: 64, title: "Minimum Path Sum", difficulty: "Medium", templateCategory: "dp-patterns", templateName: "0/1 Knapsack", hint: "dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])" },
  { lcNumber: 139, title: "Word Break", difficulty: "Medium", templateCategory: "dp-patterns", templateName: "0/1 Knapsack", hint: "dp[i] = true if s[0..i] can be segmented using dict" },
  { lcNumber: 152, title: "Maximum Product Subarray", difficulty: "Medium", templateCategory: "dp-patterns", templateName: "Kadane's Algorithm", hint: "Track both max and min products (negatives flip)" },

  // ── Monotonic Stack ──
  { lcNumber: 84, title: "Largest Rectangle in Histogram", difficulty: "Hard", templateCategory: "monotonic-stack", templateName: "Next Greater Element", hint: "Monotonic stack finds width boundaries for each bar" },
  { lcNumber: 496, title: "Next Greater Element I", difficulty: "Easy", templateCategory: "monotonic-stack", templateName: "Next Greater Element", hint: "Classic next greater element using monotonic stack" },
  { lcNumber: 739, title: "Daily Temperatures", difficulty: "Medium", templateCategory: "monotonic-stack", templateName: "Next Greater Element", hint: "Next warmer day = next greater element variant" },
  { lcNumber: 85, title: "Maximal Rectangle", difficulty: "Hard", templateCategory: "monotonic-stack", templateName: "Next Greater Element", hint: "Row-by-row histogram + largest rectangle in histogram" },

  // ── Greedy ──
  { lcNumber: 55, title: "Jump Game", difficulty: "Medium", templateCategory: "greedy", templateName: "Jump Game (Can Reach End)", hint: "Track farthest reachable index greedily" },
  { lcNumber: 45, title: "Jump Game II", difficulty: "Medium", templateCategory: "greedy", templateName: "Jump Game (Can Reach End)", hint: "BFS-like level approach for min jumps" },
  { lcNumber: 435, title: "Non-overlapping Intervals", difficulty: "Medium", templateCategory: "greedy", templateName: "Interval Scheduling (Max Non-Overlapping)", hint: "Sort by end; count max non-overlapping → answer = n - count" },
  { lcNumber: 452, title: "Minimum Number of Arrows to Burst Balloons", difficulty: "Medium", templateCategory: "greedy", templateName: "Interval Scheduling (Max Non-Overlapping)", hint: "Sort by end; greedy merge overlapping balloons" },
  { lcNumber: 56, title: "Merge Intervals", difficulty: "Medium", templateCategory: "greedy", templateName: "Interval Scheduling (Max Non-Overlapping)", hint: "Sort by start; merge overlapping intervals" },
  { lcNumber: 134, title: "Gas Station", difficulty: "Medium", templateCategory: "greedy", templateName: "Jump Game (Can Reach End)", hint: "If total gas ≥ total cost, start where running sum resets" },

  // ── Heap / Priority Queue ──
  { lcNumber: 215, title: "Kth Largest Element in an Array", difficulty: "Medium", templateCategory: "heap-priority-queue", templateName: "Kth Largest Element", hint: "Min-heap of size k; top = kth largest" },
  { lcNumber: 347, title: "Top K Frequent Elements", difficulty: "Medium", templateCategory: "heap-priority-queue", templateName: "Kth Largest Element", hint: "Count freq, then top-k with min-heap or bucket sort" },
  { lcNumber: 23, title: "Merge k Sorted Lists", difficulty: "Hard", templateCategory: "heap-priority-queue", templateName: "Merge K Sorted Lists", hint: "Min-heap holds one node from each list" },
  { lcNumber: 295, title: "Find Median from Data Stream", difficulty: "Hard", templateCategory: "heap-priority-queue", templateName: "Median from Data Stream", hint: "Two heaps: max-heap (low) + min-heap (high)" },
  { lcNumber: 355, title: "Design Twitter", difficulty: "Medium", templateCategory: "heap-priority-queue", templateName: "Merge K Sorted Lists", hint: "Merge k sorted tweet lists per followed user" },
  { lcNumber: 973, title: "K Closest Points to Origin", difficulty: "Medium", templateCategory: "heap-priority-queue", templateName: "Kth Largest Element", hint: "Max-heap of size k by distance" },

  // ── Shortest Path ──
  { lcNumber: 743, title: "Network Delay Time", difficulty: "Medium", templateCategory: "shortest-path", templateName: "Dijkstra's Algorithm", hint: "Dijkstra from source; answer = max dist" },
  { lcNumber: 787, title: "Cheapest Flights Within K Stops", difficulty: "Medium", templateCategory: "shortest-path", templateName: "Bellman-Ford Algorithm", hint: "Bellman-Ford with at most K+1 relaxation rounds" },
  { lcNumber: 1334, title: "Find the City With the Smallest Number of Neighbors at a Threshold Distance", difficulty: "Medium", templateCategory: "shortest-path", templateName: "Floyd-Warshall (All-Pairs Shortest Path)", hint: "All-pairs shortest path, count reachable cities" },
  { lcNumber: 778, title: "Swim in Rising Water", difficulty: "Hard", templateCategory: "shortest-path", templateName: "Dijkstra's Algorithm", hint: "Modified Dijkstra on grid; minimize max elevation" },

  // ── Linked List ──
  { lcNumber: 206, title: "Reverse Linked List", difficulty: "Easy", templateCategory: "linked-list", templateName: "Reverse a Linked List (Iterative)", hint: "Three pointers: prev, curr, next" },
  { lcNumber: 21, title: "Merge Two Sorted Lists", difficulty: "Easy", templateCategory: "linked-list", templateName: "Merge Two Sorted Lists", hint: "Dummy head, compare and append" },
  { lcNumber: 143, title: "Reorder List", difficulty: "Medium", templateCategory: "linked-list", templateName: "Reverse a Linked List (Iterative)", hint: "Find mid, reverse second half, interleave" },
  { lcNumber: 19, title: "Remove Nth Node From End of List", difficulty: "Medium", templateCategory: "linked-list", templateName: "Detect Cycle (Floyd's Algorithm)", hint: "Two pointers: advance fast n steps, then move both" },
  { lcNumber: 234, title: "Palindrome Linked List", difficulty: "Easy", templateCategory: "linked-list", templateName: "Reverse a Linked List (Iterative)", hint: "Find mid, reverse second half, compare" },
  { lcNumber: 25, title: "Reverse Nodes in k-Group", difficulty: "Hard", templateCategory: "linked-list", templateName: "Reverse a Linked List (Iterative)", hint: "Reverse k nodes at a time using reverse-list as subroutine" },

  // ── Bit Manipulation ──
  { lcNumber: 136, title: "Single Number", difficulty: "Easy", templateCategory: "bit-manipulation", templateName: "Single Number (XOR)", hint: "XOR all elements: duplicates cancel, unique remains" },
  { lcNumber: 191, title: "Number of 1 Bits", difficulty: "Easy", templateCategory: "bit-manipulation", templateName: "Count Set Bits (Brian Kernighan)", hint: "n &= (n-1) clears lowest set bit each iteration" },
  { lcNumber: 231, title: "Power of Two", difficulty: "Easy", templateCategory: "bit-manipulation", templateName: "Power of Two Check", hint: "n > 0 && (n & (n-1)) == 0" },
  { lcNumber: 78, title: "Subsets", difficulty: "Medium", templateCategory: "bit-manipulation", templateName: "Subsets Using Bitmask", hint: "Each bitmask 0..2^n represents a subset" },
  { lcNumber: 268, title: "Missing Number", difficulty: "Easy", templateCategory: "bit-manipulation", templateName: "Single Number (XOR)", hint: "XOR indices and values; missing number remains" },
  { lcNumber: 338, title: "Counting Bits", difficulty: "Easy", templateCategory: "bit-manipulation", templateName: "Count Set Bits (Brian Kernighan)", hint: "dp[i] = dp[i & (i-1)] + 1 for all i" },

  // ── String Algorithms ──
  { lcNumber: 28, title: "Find the Index of the First Occurrence in a String", difficulty: "Easy", templateCategory: "string-algorithms", templateName: "KMP Pattern Matching", hint: "KMP or built-in; KMP is O(n+m)" },
  { lcNumber: 214, title: "Shortest Palindrome", difficulty: "Hard", templateCategory: "string-algorithms", templateName: "KMP Pattern Matching", hint: "KMP failure function on s + '#' + reverse(s)" },
  { lcNumber: 459, title: "Repeated Substring Pattern", difficulty: "Easy", templateCategory: "string-algorithms", templateName: "KMP Pattern Matching", hint: "KMP: check if n % (n - lps[n-1]) == 0" },
  { lcNumber: 1392, title: "Longest Happy Prefix", difficulty: "Hard", templateCategory: "string-algorithms", templateName: "KMP Pattern Matching", hint: "LPS array of KMP gives longest happy prefix" },

  // ── Advanced Data Structures ──
  { lcNumber: 200, title: "Number of Islands (Union-Find)", difficulty: "Medium", templateCategory: "advanced-data-structures", templateName: "Union-Find (DSU)", hint: "Union adjacent 1s; count remaining components" },
  { lcNumber: 128, title: "Longest Consecutive Sequence", difficulty: "Medium", templateCategory: "advanced-data-structures", templateName: "Union-Find (DSU)", hint: "Union consecutive numbers; find largest component" },
  { lcNumber: 208, title: "Implement Trie (Prefix Tree)", difficulty: "Medium", templateCategory: "advanced-data-structures", templateName: "Trie (Prefix Tree)", hint: "Insert/search word character by character" },
  { lcNumber: 212, title: "Word Search II", difficulty: "Hard", templateCategory: "advanced-data-structures", templateName: "Trie (Prefix Tree)", hint: "Trie + DFS backtracking on board" },
  { lcNumber: 211, title: "Design Add and Search Words Data Structure", difficulty: "Medium", templateCategory: "advanced-data-structures", templateName: "Trie (Prefix Tree)", hint: "Trie with '.' wildcard DFS" },

  // ── Segment Tree ──
  { lcNumber: 307, title: "Range Sum Query - Mutable", difficulty: "Medium", templateCategory: "segment-tree", templateName: "Segment Tree (Range Sum + Point Update)", hint: "Point update + range sum → segment tree" },
  { lcNumber: 315, title: "Count of Smaller Numbers After Self", difficulty: "Hard", templateCategory: "segment-tree", templateName: "Segment Tree (Range Sum + Point Update)", hint: "Process right-to-left, segment tree on value range" },
];
