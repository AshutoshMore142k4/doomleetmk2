export interface DecisionNode {
  question: string;
  yes?: DecisionNode | string;   // string = final answer (template name)
  no?: DecisionNode | string;
  options?: { label: string; next: DecisionNode | string }[];
}

export interface ComparisonGroup {
  title: string;
  slug: string;
  description: string;
  algorithms: {
    name: string;
    bestFor: string;
    time: string;
    space: string;
    limitation: string;
  }[];
  decisionTree: DecisionNode;
}

export const comparisonGroups: ComparisonGroup[] = [
  {
    title: "Shortest Path: Dijkstra vs Bellman-Ford vs Floyd-Warshall",
    slug: "shortest-path",
    description: "Choose the right shortest-path algorithm based on graph properties.",
    algorithms: [
      {
        name: "Dijkstra",
        bestFor: "Single-source, non-negative weights",
        time: "O((V+E) log V)",
        space: "O(V+E)",
        limitation: "No negative edge weights",
      },
      {
        name: "Bellman-Ford",
        bestFor: "Single-source, negative weights allowed",
        time: "O(V × E)",
        space: "O(V)",
        limitation: "Slower; detects negative cycles",
      },
      {
        name: "Floyd-Warshall",
        bestFor: "All-pairs shortest path, small graphs",
        time: "O(V³)",
        space: "O(V²)",
        limitation: "Only practical when V ≤ ~500",
      },
    ],
    decisionTree: {
      question: "Do you need all-pairs shortest path?",
      yes: {
        question: "Is V ≤ 500?",
        yes: "Floyd-Warshall",
        no: "Run Dijkstra from each vertex",
      },
      no: {
        question: "Are there negative edge weights?",
        yes: "Bellman-Ford",
        no: "Dijkstra",
      },
    },
  },
  {
    title: "Sorting Choice: When to Use What",
    slug: "sorting",
    description: "Pick the right sort based on constraints and data properties.",
    algorithms: [
      {
        name: "Merge Sort",
        bestFor: "Stable sort, linked lists, external sort",
        time: "O(n log n)",
        space: "O(n)",
        limitation: "Extra space required",
      },
      {
        name: "Quick Sort",
        bestFor: "Average-case fast, in-place",
        time: "O(n log n) avg, O(n²) worst",
        space: "O(log n)",
        limitation: "Worst case O(n²) without randomization",
      },
      {
        name: "Counting/Radix Sort",
        bestFor: "Integers in small range, O(n) sort",
        time: "O(n + k)",
        space: "O(n + k)",
        limitation: "Only for integers; range k must be reasonable",
      },
    ],
    decisionTree: {
      question: "Are values integers in a small range (k ≈ n)?",
      yes: "Counting / Radix Sort",
      no: {
        question: "Do you need a stable sort?",
        yes: "Merge Sort",
        no: {
          question: "Is extra O(n) space acceptable?",
          yes: "Merge Sort",
          no: "Quick Sort (randomized pivot)",
        },
      },
    },
  },
  {
    title: "Substring Search: KMP vs Rabin-Karp vs Z-Algorithm",
    slug: "string-matching",
    description: "Choose the right string matching algorithm.",
    algorithms: [
      {
        name: "KMP",
        bestFor: "Single pattern, guaranteed O(n+m)",
        time: "O(n + m)",
        space: "O(m)",
        limitation: "Complex to implement; single pattern only",
      },
      {
        name: "Rabin-Karp",
        bestFor: "Multiple patterns, hash-based",
        time: "O(n + m) avg",
        space: "O(1)",
        limitation: "Hash collisions → O(nm) worst case",
      },
      {
        name: "Z-Algorithm",
        bestFor: "Clean alternative to KMP, periodicity",
        time: "O(n + m)",
        space: "O(n + m)",
        limitation: "Requires concatenation string",
      },
    ],
    decisionTree: {
      question: "Are you searching for multiple patterns at once?",
      yes: "Rabin-Karp (one hash per pattern)",
      no: {
        question: "Do you need to find string periodicity / repeated patterns?",
        yes: "Z-Algorithm",
        no: {
          question: "Want guaranteed worst-case O(n+m)?",
          yes: "KMP",
          no: "Rabin-Karp (simpler to implement)",
        },
      },
    },
  },
  {
    title: "DFS vs BFS: Graph Traversal",
    slug: "traversal",
    description: "Choose between depth-first and breadth-first search.",
    algorithms: [
      {
        name: "DFS",
        bestFor: "Path finding, cycle detection, topological sort",
        time: "O(V + E)",
        space: "O(V) stack",
        limitation: "May not find shortest path in unweighted graphs",
      },
      {
        name: "BFS",
        bestFor: "Shortest path (unweighted), level-order, multi-source",
        time: "O(V + E)",
        space: "O(V) queue",
        limitation: "Uses more memory on deep graphs",
      },
    ],
    decisionTree: {
      question: "Do you need the shortest path in an unweighted graph?",
      yes: "BFS",
      no: {
        question: "Do you need to explore all paths or detect cycles?",
        yes: "DFS",
        no: {
          question: "Is it a level-order or multi-source problem?",
          yes: "BFS",
          no: "DFS (usually simpler)",
        },
      },
    },
  },
  {
    title: "Knapsack Variants: 0/1 vs Unbounded vs Fractional",
    slug: "knapsack",
    description: "Pick the right knapsack approach based on item reuse rules.",
    algorithms: [
      {
        name: "0/1 Knapsack",
        bestFor: "Each item used at most once",
        time: "O(n × W)",
        space: "O(W)",
        limitation: "Pseudo-polynomial; large W is slow",
      },
      {
        name: "Unbounded Knapsack",
        bestFor: "Items can be reused (Coin Change, Rod Cutting)",
        time: "O(n × W)",
        space: "O(W)",
        limitation: "Same DP structure, different loop order",
      },
      {
        name: "Fractional Knapsack",
        bestFor: "Items can be partially taken",
        time: "O(n log n)",
        space: "O(1)",
        limitation: "Greedy only; doesn't work for 0/1 variant",
      },
    ],
    decisionTree: {
      question: "Can items be taken fractionally (not whole)?",
      yes: "Fractional Knapsack (Greedy)",
      no: {
        question: "Can each item be reused unlimited times?",
        yes: "Unbounded Knapsack DP",
        no: "0/1 Knapsack DP",
      },
    },
  },
  {
    title: "MST: Kruskal vs Prim",
    slug: "mst",
    description: "Choose the right Minimum Spanning Tree algorithm based on graph density.",
    algorithms: [
      {
        name: "Kruskal's",
        bestFor: "Sparse graphs, edge-list input",
        time: "O(E log E)",
        space: "O(V + E)",
        limitation: "Requires sorting all edges; needs Union-Find",
      },
      {
        name: "Prim's",
        bestFor: "Dense graphs, adjacency matrix input",
        time: "O(E log V) with min-heap",
        space: "O(V + E)",
        limitation: "Harder to implement for disconnected graphs",
      },
    ],
    decisionTree: {
      question: "Is the graph dense (E ≈ V²)?",
      yes: "Prim's (adjacency matrix, O(V²))",
      no: {
        question: "Is the input given as an edge list?",
        yes: "Kruskal's",
        no: "Prim's (min-heap variant)",
      },
    },
  },
  {
    title: "Two Pointers vs Sliding Window",
    slug: "two-pointers-sliding-window",
    description: "Both use O(n) linear scans — pick based on what you're optimising.",
    algorithms: [
      {
        name: "Two Pointers",
        bestFor: "Pair/triplet search in sorted array, palindrome check",
        time: "O(n)",
        space: "O(1)",
        limitation: "Usually requires sorted input",
      },
      {
        name: "Sliding Window (Fixed)",
        bestFor: "Subarray of exact length k",
        time: "O(n)",
        space: "O(1)",
        limitation: "Only works when window size is fixed",
      },
      {
        name: "Sliding Window (Variable)",
        bestFor: "Longest/shortest subarray satisfying a condition",
        time: "O(n)",
        space: "O(k) for frequency map",
        limitation: "Condition must be monotonic (shrinking is well-defined)",
      },
    ],
    decisionTree: {
      question: "Are you searching for a pair/triplet summing to target?",
      yes: "Two Pointers (sort first if needed)",
      no: {
        question: "Is the subarray/substring length fixed (exactly k)?",
        yes: "Sliding Window — Fixed Size",
        no: {
          question: "Are you finding the longest/shortest subarray meeting a constraint?",
          yes: "Sliding Window — Variable Size",
          no: "Two Pointers (e.g. palindrome, merge sorted arrays)",
        },
      },
    },
  },
  {
    title: "DP: Top-Down (Memoization) vs Bottom-Up (Tabulation)",
    slug: "dp-approach",
    description: "Both have the same asymptotic complexity — pick based on problem structure.",
    algorithms: [
      {
        name: "Top-Down (Memoization)",
        bestFor: "Natural recursive structure, sparse state space",
        time: "O(states × transition)",
        space: "O(states) + call stack",
        limitation: "Stack overflow for very deep recursion; overhead per call",
      },
      {
        name: "Bottom-Up (Tabulation)",
        bestFor: "All states needed, space optimisation possible",
        time: "O(states × transition)",
        space: "O(states), often reducible to O(1) row",
        limitation: "Must determine correct iteration order upfront",
      },
    ],
    decisionTree: {
      question: "Is the recursion depth very large (>10⁴)?",
      yes: "Bottom-Up (avoids stack overflow)",
      no: {
        question: "Are only a fraction of states actually reachable?",
        yes: "Top-Down (only computes reachable states)",
        no: {
          question: "Do you need to reduce space below O(states)?",
          yes: "Bottom-Up (roll the DP table to O(1) row)",
          no: "Top-Down (easier to write, debug, and reason about)",
        },
      },
    },
  },
  {
    title: "Union-Find vs DFS for Graph Connectivity",
    slug: "connectivity",
    description: "Both detect connected components — choose based on whether edges arrive online.",
    algorithms: [
      {
        name: "Union-Find (DSU)",
        bestFor: "Dynamic connectivity, online edge insertions",
        time: "O(α(n)) per query (near O(1))",
        space: "O(V)",
        limitation: "Doesn't track actual paths; hard to undo (no edge deletion)",
      },
      {
        name: "DFS / BFS",
        bestFor: "Static graph, need component members or paths",
        time: "O(V + E)",
        space: "O(V)",
        limitation: "Must re-run after each edge addition",
      },
    ],
    decisionTree: {
      question: "Are edges added one at a time (online / streaming)?",
      yes: "Union-Find (DSU)",
      no: {
        question: "Do you need the actual path or list of nodes in each component?",
        yes: "DFS / BFS",
        no: {
          question: "Are you just counting components or checking if two nodes are connected?",
          yes: "Union-Find (simpler)",
          no: "DFS / BFS",
        },
      },
    },
  },
  {
    title: "Binary Search Variants",
    slug: "binary-search",
    description: "Classic, lower-bound, upper-bound, and answer-space binary search.",
    algorithms: [
      {
        name: "Classic Binary Search",
        bestFor: "Find exact target in sorted array",
        time: "O(log n)",
        space: "O(1)",
        limitation: "Only works on sorted or monotonic data",
      },
      {
        name: "Lower Bound (first ≥ target)",
        bestFor: "First position where condition becomes true",
        time: "O(log n)",
        space: "O(1)",
        limitation: "Off-by-one errors are very common",
      },
      {
        name: "Upper Bound (first > target)",
        bestFor: "Count occurrences, range queries",
        time: "O(log n)",
        space: "O(1)",
        limitation: "Off-by-one errors are very common",
      },
      {
        name: "Binary Search on Answer",
        bestFor: "Minimise maximum / maximise minimum problems",
        time: "O(log(range) × O(check))",
        space: "O(1)",
        limitation: "Requires a monotonic yes/no feasibility function",
      },
    ],
    decisionTree: {
      question: "Are you searching for an exact value in a sorted array?",
      yes: "Classic Binary Search",
      no: {
        question: "Is the problem 'minimise maximum' or 'maximise minimum'?",
        yes: "Binary Search on Answer",
        no: {
          question: "Do you need the first position ≥ target?",
          yes: "Lower Bound",
          no: "Upper Bound (first position > target)",
        },
      },
    },
  },
  {
    title: "Graph Representation: Adjacency List vs Matrix vs Edge List",
    slug: "graph-representation",
    description: "Choose how to store a graph based on density and operation needs.",
    algorithms: [
      {
        name: "Adjacency List",
        bestFor: "Sparse graphs (E << V²), BFS/DFS traversal",
        time: "Add edge O(1), check edge O(degree)",
        space: "O(V + E)",
        limitation: "Slow edge existence check compared to matrix",
      },
      {
        name: "Adjacency Matrix",
        bestFor: "Dense graphs, O(1) edge existence check",
        time: "Add edge O(1), check edge O(1)",
        space: "O(V²)",
        limitation: "Wastes memory for sparse graphs",
      },
      {
        name: "Edge List",
        bestFor: "Kruskal's MST, sorting/filtering edges",
        time: "Add edge O(1), check edge O(E)",
        space: "O(E)",
        limitation: "Slow neighbour lookup; no direct V→neighbours access",
      },
    ],
    decisionTree: {
      question: "Do you need O(1) edge existence check (u→v)?",
      yes: "Adjacency Matrix",
      no: {
        question: "Do you primarily process edges sorted/filtered (e.g. Kruskal's)?",
        yes: "Edge List",
        no: {
          question: "Is the graph sparse (E << V²)?",
          yes: "Adjacency List",
          no: "Adjacency Matrix",
        },
      },
    },
  },
];
