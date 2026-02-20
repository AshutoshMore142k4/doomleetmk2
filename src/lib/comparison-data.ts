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
];
