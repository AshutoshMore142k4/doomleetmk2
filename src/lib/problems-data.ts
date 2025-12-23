// NeetCode 150 Problems Data
export interface Problem {
  id: string;
  title: string;
  slug: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  description: string;
  testCases: { input: string; output: string; explanation?: string }[];
  approach: string;
  solutionCode: string;
  hints: string[];
  timeComplexity: string;
  spaceComplexity: string;
  leetcodeNumber: number;
  orderIndex: number;
}

export const problemsData: Problem[] = [
  // Arrays & Hashing
  {
    id: "1",
    title: "Contains Duplicate",
    slug: "contains-duplicate",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    description: "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
    testCases: [
      { input: "nums = [1,2,3,1]", output: "true", explanation: "1 appears twice" },
      { input: "nums = [1,2,3,4]", output: "false", explanation: "All elements are distinct" },
      { input: "nums = [1,1,1,3,3,4,3,2,4,2]", output: "true" }
    ],
    approach: "Use a HashSet to track seen numbers. For each number, check if it exists in the set. If yes, return true. Otherwise, add it to the set. This gives O(n) time complexity with O(n) space for the set.",
    solutionCode: `function containsDuplicate(nums: number[]): boolean {
    const seen = new Set<number>();
    for (const num of nums) {
        if (seen.has(num)) return true;
        seen.add(num);
    }
    return false;
}`,
    hints: ["Think about what data structure allows O(1) lookup", "HashSet is your friend"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 217,
    orderIndex: 1
  },
  {
    id: "2",
    title: "Valid Anagram",
    slug: "valid-anagram",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    description: "Given two strings s and t, return true if t is an anagram of s, and false otherwise. An anagram is a word formed by rearranging the letters of another word.",
    testCases: [
      { input: 's = "anagram", t = "nagaram"', output: "true" },
      { input: 's = "rat", t = "car"', output: "false" }
    ],
    approach: "Count character frequencies using a hash map. Compare the frequency maps for both strings. If they match, the strings are anagrams.",
    solutionCode: `function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) return false;
    
    const count: Record<string, number> = {};
    
    for (let i = 0; i < s.length; i++) {
        count[s[i]] = (count[s[i]] || 0) + 1;
        count[t[i]] = (count[t[i]] || 0) - 1;
    }
    
    return Object.values(count).every(v => v === 0);
}`,
    hints: ["What defines an anagram?", "Character counts must match"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1) - fixed alphabet size",
    leetcodeNumber: 242,
    orderIndex: 2
  },
  {
    id: "3",
    title: "Two Sum",
    slug: "two-sum",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution.",
    testCases: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "nums[0] + nums[1] = 2 + 7 = 9" },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
      { input: "nums = [3,3], target = 6", output: "[0,1]" }
    ],
    approach: "Use a hash map to store each number and its index. For each number, check if (target - num) exists in the map. If yes, return both indices.",
    solutionCode: `function twoSum(nums: number[], target: number): number[] {
    const map = new Map<number, number>();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement)!, i];
        }
        map.set(nums[i], i);
    }
    
    return [];
}`,
    hints: ["For each number, what number would you need to find?", "How can you efficiently look up if that number exists?"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 1,
    orderIndex: 3
  },
  {
    id: "4",
    title: "Group Anagrams",
    slug: "group-anagrams",
    difficulty: "Medium",
    category: "Arrays & Hashing",
    description: "Given an array of strings strs, group the anagrams together. You can return the answer in any order.",
    testCases: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
      { input: 'strs = [""]', output: '[[""]]' },
      { input: 'strs = ["a"]', output: '[["a"]]' }
    ],
    approach: "Use sorted characters as a key in a hash map. Words that are anagrams will have the same sorted character sequence. Group words by this key.",
    solutionCode: `function groupAnagrams(strs: string[]): string[][] {
    const map = new Map<string, string[]>();
    
    for (const str of strs) {
        const key = str.split('').sort().join('');
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key)!.push(str);
    }
    
    return Array.from(map.values());
}`,
    hints: ["What's common between all anagrams?", "How can you create a unique identifier for each anagram group?"],
    timeComplexity: "O(n * k log k) where k is max string length",
    spaceComplexity: "O(n * k)",
    leetcodeNumber: 49,
    orderIndex: 4
  },
  {
    id: "5",
    title: "Top K Frequent Elements",
    slug: "top-k-frequent-elements",
    difficulty: "Medium",
    category: "Arrays & Hashing",
    description: "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",
    testCases: [
      { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]" },
      { input: "nums = [1], k = 1", output: "[1]" }
    ],
    approach: "Use bucket sort. Count frequencies, then create buckets where index represents frequency. Iterate from highest frequency bucket to collect k elements.",
    solutionCode: `function topKFrequent(nums: number[], k: number): number[] {
    const freqMap = new Map<number, number>();
    for (const num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }
    
    const buckets: number[][] = Array(nums.length + 1).fill(null).map(() => []);
    for (const [num, freq] of freqMap) {
        buckets[freq].push(num);
    }
    
    const result: number[] = [];
    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
        result.push(...buckets[i]);
    }
    
    return result.slice(0, k);
}`,
    hints: ["Count frequencies first", "Can you sort by frequency in O(n)?"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 347,
    orderIndex: 5
  },
  // Two Pointers
  {
    id: "6",
    title: "Valid Palindrome",
    slug: "valid-palindrome",
    difficulty: "Easy",
    category: "Two Pointers",
    description: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",
    testCases: [
      { input: 's = "A man, a plan, a canal: Panama"', output: "true", explanation: '"amanaplanacanalpanama" is a palindrome' },
      { input: 's = "race a car"', output: "false" }
    ],
    approach: "Use two pointers, one at start and one at end. Skip non-alphanumeric characters. Compare characters at both pointers (case-insensitive). Move pointers toward center.",
    solutionCode: `function isPalindrome(s: string): boolean {
    let left = 0, right = s.length - 1;
    
    while (left < right) {
        while (left < right && !isAlphanumeric(s[left])) left++;
        while (left < right && !isAlphanumeric(s[right])) right--;
        
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

function isAlphanumeric(c: string): boolean {
    return /[a-zA-Z0-9]/.test(c);
}`,
    hints: ["What characters matter?", "Two pointers moving toward each other"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 125,
    orderIndex: 6
  },
  {
    id: "7",
    title: "3Sum",
    slug: "3sum",
    difficulty: "Medium",
    category: "Two Pointers",
    description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.",
    testCases: [
      { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
      { input: "nums = [0,1,1]", output: "[]" },
      { input: "nums = [0,0,0]", output: "[[0,0,0]]" }
    ],
    approach: "Sort the array. For each element, use two pointers to find pairs that sum to its negative. Skip duplicates to avoid duplicate triplets.",
    solutionCode: `function threeSum(nums: number[]): number[][] {
    nums.sort((a, b) => a - b);
    const result: number[][] = [];
    
    for (let i = 0; i < nums.length - 2; i++) {
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
}`,
    hints: ["Sort the array first", "Reduce to two sum problem", "Handle duplicates carefully"],
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1) excluding output",
    leetcodeNumber: 15,
    orderIndex: 7
  },
  // Sliding Window
  {
    id: "8",
    title: "Best Time to Buy and Sell Stock",
    slug: "best-time-to-buy-and-sell-stock",
    difficulty: "Easy",
    category: "Sliding Window",
    description: "You are given an array prices where prices[i] is the price of a given stock on the ith day. Maximize profit by choosing a single day to buy and a different day in the future to sell.",
    testCases: [
      { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6)" },
      { input: "prices = [7,6,4,3,1]", output: "0", explanation: "No profitable transaction possible" }
    ],
    approach: "Track the minimum price seen so far. At each day, calculate potential profit if sold today. Keep track of maximum profit.",
    solutionCode: `function maxProfit(prices: number[]): number {
    let minPrice = Infinity;
    let maxProfit = 0;
    
    for (const price of prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
    }
    
    return maxProfit;
}`,
    hints: ["You need to buy before you sell", "Track the minimum price seen so far"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 121,
    orderIndex: 8
  },
  {
    id: "9",
    title: "Longest Substring Without Repeating Characters",
    slug: "longest-substring-without-repeating-characters",
    difficulty: "Medium",
    category: "Sliding Window",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    testCases: [
      { input: 's = "abcabcbb"', output: "3", explanation: 'The answer is "abc", with length 3' },
      { input: 's = "bbbbb"', output: "1" },
      { input: 's = "pwwkew"', output: "3" }
    ],
    approach: "Use sliding window with a set to track characters in current window. When duplicate found, shrink window from left until duplicate is removed.",
    solutionCode: `function lengthOfLongestSubstring(s: string): number {
    const seen = new Set<string>();
    let left = 0, maxLen = 0;
    
    for (let right = 0; right < s.length; right++) {
        while (seen.has(s[right])) {
            seen.delete(s[left]);
            left++;
        }
        seen.add(s[right]);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
}`,
    hints: ["What defines a valid substring?", "When to shrink the window?"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(min(n, m)) where m is charset size",
    leetcodeNumber: 3,
    orderIndex: 9
  },
  // Stack
  {
    id: "10",
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    difficulty: "Easy",
    category: "Stack",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    testCases: [
      { input: 's = "()"', output: "true" },
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" }
    ],
    approach: "Use a stack. Push opening brackets. When closing bracket found, pop and check if it matches. Stack should be empty at end.",
    solutionCode: `function isValid(s: string): boolean {
    const stack: string[] = [];
    const pairs: Record<string, string> = { ')': '(', ']': '[', '}': '{' };
    
    for (const char of s) {
        if (char in pairs) {
            if (stack.pop() !== pairs[char]) return false;
        } else {
            stack.push(char);
        }
    }
    
    return stack.length === 0;
}`,
    hints: ["Opening brackets go on stack", "Closing brackets must match top of stack"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 20,
    orderIndex: 10
  },
  // Binary Search
  {
    id: "11",
    title: "Binary Search",
    slug: "binary-search",
    difficulty: "Easy",
    category: "Binary Search",
    description: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. Return -1 if not found.",
    testCases: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" },
      { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1" }
    ],
    approach: "Use two pointers for left and right bounds. Calculate mid, compare with target. Narrow search space by half each iteration.",
    solutionCode: `function search(nums: number[], target: number): number {
    let left = 0, right = nums.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) return mid;
        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}`,
    hints: ["Array is sorted", "Eliminate half the search space each time"],
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 704,
    orderIndex: 11
  },
  // Linked List
  {
    id: "12",
    title: "Reverse Linked List",
    slug: "reverse-linked-list",
    difficulty: "Easy",
    category: "Linked List",
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    testCases: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
      { input: "head = [1,2]", output: "[2,1]" },
      { input: "head = []", output: "[]" }
    ],
    approach: "Use three pointers: prev, curr, next. For each node, save next, point curr to prev, move prev and curr forward.",
    solutionCode: `class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val ?? 0;
        this.next = next ?? null;
    }
}

function reverseList(head: ListNode | null): ListNode | null {
    let prev: ListNode | null = null;
    let curr = head;
    
    while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    
    return prev;
}`,
    hints: ["Track previous node", "Change pointer directions one by one"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 206,
    orderIndex: 12
  },
  // Trees
  {
    id: "13",
    title: "Invert Binary Tree",
    slug: "invert-binary-tree",
    difficulty: "Easy",
    category: "Trees",
    description: "Given the root of a binary tree, invert the tree, and return its root.",
    testCases: [
      { input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" },
      { input: "root = [2,1,3]", output: "[2,3,1]" }
    ],
    approach: "Recursively swap left and right children for each node. Base case is when node is null.",
    solutionCode: `class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val ?? 0;
        this.left = left ?? null;
        this.right = right ?? null;
    }
}

function invertTree(root: TreeNode | null): TreeNode | null {
    if (!root) return null;
    
    const temp = root.left;
    root.left = invertTree(root.right);
    root.right = invertTree(temp);
    
    return root;
}`,
    hints: ["Swap children at each node", "Use recursion"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(h) where h is height",
    leetcodeNumber: 226,
    orderIndex: 13
  },
  {
    id: "14",
    title: "Maximum Depth of Binary Tree",
    slug: "maximum-depth-of-binary-tree",
    difficulty: "Easy",
    category: "Trees",
    description: "Given the root of a binary tree, return its maximum depth. Maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
    testCases: [
      { input: "root = [3,9,20,null,null,15,7]", output: "3" },
      { input: "root = [1,null,2]", output: "2" }
    ],
    approach: "Recursively find max depth of left and right subtrees. Return 1 + max of both. Base case: null node has depth 0.",
    solutionCode: `function maxDepth(root: TreeNode | null): number {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
    hints: ["Depth = 1 + depth of deeper subtree", "Base case: empty tree has depth 0"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(h) where h is height",
    leetcodeNumber: 104,
    orderIndex: 14
  },
  // Dynamic Programming
  {
    id: "15",
    title: "Climbing Stairs",
    slug: "climbing-stairs",
    difficulty: "Easy",
    category: "1-D Dynamic Programming",
    description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    testCases: [
      { input: "n = 2", output: "2", explanation: "1+1 or 2" },
      { input: "n = 3", output: "3", explanation: "1+1+1, 1+2, or 2+1" }
    ],
    approach: "This is the Fibonacci sequence. dp[i] = dp[i-1] + dp[i-2]. Can optimize to O(1) space by only tracking last two values.",
    solutionCode: `function climbStairs(n: number): number {
    if (n <= 2) return n;
    
    let prev2 = 1, prev1 = 2;
    
    for (let i = 3; i <= n; i++) {
        const curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    
    return prev1;
}`,
    hints: ["How many ways to reach step n from step n-1 or n-2?", "This is a classic Fibonacci pattern"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 70,
    orderIndex: 15
  },
  // More problems...
  {
    id: "16",
    title: "House Robber",
    slug: "house-robber",
    difficulty: "Medium",
    category: "1-D Dynamic Programming",
    description: "You are a professional robber planning to rob houses along a street. Adjacent houses have security systems connected, so you cannot rob two adjacent houses. Given an array representing the amount of money in each house, return the maximum amount you can rob.",
    testCases: [
      { input: "nums = [1,2,3,1]", output: "4", explanation: "Rob house 1 (1) and house 3 (3)" },
      { input: "nums = [2,7,9,3,1]", output: "12", explanation: "Rob houses 1, 3, and 5" }
    ],
    approach: "At each house, choose max of: (rob current + amount from 2 houses ago) or (skip current, take amount from previous house). dp[i] = max(dp[i-2] + nums[i], dp[i-1])",
    solutionCode: `function rob(nums: number[]): number {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    
    let prev2 = 0, prev1 = 0;
    
    for (const num of nums) {
        const curr = Math.max(prev2 + num, prev1);
        prev2 = prev1;
        prev1 = curr;
    }
    
    return prev1;
}`,
    hints: ["For each house: rob or skip?", "Track best amount if you rob vs skip"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 198,
    orderIndex: 16
  },
  {
    id: "17",
    title: "Product of Array Except Self",
    slug: "product-of-array-except-self",
    difficulty: "Medium",
    category: "Arrays & Hashing",
    description: "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. You must solve it without using division.",
    testCases: [
      { input: "nums = [1,2,3,4]", output: "[24,12,8,6]" },
      { input: "nums = [-1,1,0,-3,3]", output: "[0,0,9,0,0]" }
    ],
    approach: "Use prefix and suffix products. First pass: calculate prefix products. Second pass: multiply with suffix products. No division needed.",
    solutionCode: `function productExceptSelf(nums: number[]): number[] {
    const n = nums.length;
    const result = new Array(n).fill(1);
    
    // Prefix products
    let prefix = 1;
    for (let i = 0; i < n; i++) {
        result[i] = prefix;
        prefix *= nums[i];
    }
    
    // Suffix products
    let suffix = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= suffix;
        suffix *= nums[i];
    }
    
    return result;
}`,
    hints: ["product = prefix * suffix", "Can you compute prefix and suffix in separate passes?"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1) excluding output",
    leetcodeNumber: 238,
    orderIndex: 17
  },
  {
    id: "18",
    title: "Merge Two Sorted Lists",
    slug: "merge-two-sorted-lists",
    difficulty: "Easy",
    category: "Linked List",
    description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list.",
    testCases: [
      { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "list1 = [], list2 = []", output: "[]" },
      { input: "list1 = [], list2 = [0]", output: "[0]" }
    ],
    approach: "Use a dummy head node. Compare nodes from both lists, append smaller one to result. Continue until one list is exhausted, then append remaining.",
    solutionCode: `function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    const dummy = new ListNode();
    let curr = dummy;
    
    while (list1 && list2) {
        if (list1.val <= list2.val) {
            curr.next = list1;
            list1 = list1.next;
        } else {
            curr.next = list2;
            list2 = list2.next;
        }
        curr = curr.next;
    }
    
    curr.next = list1 || list2;
    return dummy.next;
}`,
    hints: ["Use a dummy head", "Compare current nodes, take smaller"],
    timeComplexity: "O(n + m)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 21,
    orderIndex: 18
  },
  {
    id: "19",
    title: "Container With Most Water",
    slug: "container-with-most-water",
    difficulty: "Medium",
    category: "Two Pointers",
    description: "Given an array height of n non-negative integers where each represents a point at coordinate (i, height[i]), find two lines that together with the x-axis form a container that contains the most water.",
    testCases: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" },
      { input: "height = [1,1]", output: "1" }
    ],
    approach: "Use two pointers at both ends. Calculate area. Move the pointer with smaller height inward (since moving the taller one can only decrease area). Track max area.",
    solutionCode: `function maxArea(height: number[]): number {
    let left = 0, right = height.length - 1;
    let maxWater = 0;
    
    while (left < right) {
        const width = right - left;
        const h = Math.min(height[left], height[right]);
        maxWater = Math.max(maxWater, width * h);
        
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxWater;
}`,
    hints: ["Start with widest container", "Which pointer should you move?"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 11,
    orderIndex: 19
  },
  {
    id: "20",
    title: "Longest Repeating Character Replacement",
    slug: "longest-repeating-character-replacement",
    difficulty: "Medium",
    category: "Sliding Window",
    description: "Given a string s and an integer k, you can change at most k characters to any other uppercase English letter. Return the length of the longest substring containing the same letter after performing at most k changes.",
    testCases: [
      { input: 's = "ABAB", k = 2', output: "4", explanation: "Replace both As or both Bs" },
      { input: 's = "AABABBA", k = 1', output: "4" }
    ],
    approach: "Use sliding window. Track frequency of each character in window. Valid window: (window size - max frequency) <= k. If invalid, shrink from left.",
    solutionCode: `function characterReplacement(s: string, k: number): number {
    const count: Record<string, number> = {};
    let left = 0, maxCount = 0, maxLen = 0;
    
    for (let right = 0; right < s.length; right++) {
        count[s[right]] = (count[s[right]] || 0) + 1;
        maxCount = Math.max(maxCount, count[s[right]]);
        
        while (right - left + 1 - maxCount > k) {
            count[s[left]]--;
            left++;
        }
        
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
}`,
    hints: ["How many characters need to be changed in current window?", "windowSize - maxFrequency = changes needed"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(26) = O(1)",
    leetcodeNumber: 424,
    orderIndex: 20
  }
];

export const categories = [
  "Arrays & Hashing",
  "Two Pointers",
  "Sliding Window",
  "Stack",
  "Binary Search",
  "Linked List",
  "Trees",
  "Tries",
  "Heap / Priority Queue",
  "Backtracking",
  "Graphs",
  "Advanced Graphs",
  "1-D Dynamic Programming",
  "2-D Dynamic Programming",
  "Greedy",
  "Intervals",
  "Math & Geometry",
  "Bit Manipulation"
];
