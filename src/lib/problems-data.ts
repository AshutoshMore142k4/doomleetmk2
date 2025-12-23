// NeetCode 150 Problems Data - Complete Set
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
  // ==================== ARRAYS & HASHING (9 problems) ====================
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
    approach: "Use a HashSet to track seen numbers. For each number, check if it exists in the set. If yes, return true. Otherwise, add it to the set.",
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
    description: "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
    testCases: [
      { input: 's = "anagram", t = "nagaram"', output: "true" },
      { input: 's = "rat", t = "car"', output: "false" }
    ],
    approach: "Count character frequencies using a hash map. Compare the frequency maps for both strings.",
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
    spaceComplexity: "O(1)",
    leetcodeNumber: 242,
    orderIndex: 2
  },
  {
    id: "3",
    title: "Two Sum",
    slug: "two-sum",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    testCases: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "nums[0] + nums[1] = 9" },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" }
    ],
    approach: "Use a hash map to store each number and its index. For each number, check if (target - num) exists in the map.",
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
    hints: ["For each number, what number would you need to find?", "Use a hash map for O(1) lookup"],
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
      { input: 'strs = [""]', output: '[[""]]' }
    ],
    approach: "Use sorted characters as a key in a hash map. Words that are anagrams will have the same sorted character sequence.",
    solutionCode: `function groupAnagrams(strs: string[]): string[][] {
    const map = new Map<string, string[]>();
    for (const str of strs) {
        const key = str.split('').sort().join('');
        if (!map.has(key)) map.set(key, []);
        map.get(key)!.push(str);
    }
    return Array.from(map.values());
}`,
    hints: ["What's common between all anagrams?", "Sorted characters form a unique key"],
    timeComplexity: "O(n * k log k)",
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
    description: "Given an integer array nums and an integer k, return the k most frequent elements.",
    testCases: [
      { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]" },
      { input: "nums = [1], k = 1", output: "[1]" }
    ],
    approach: "Use bucket sort. Count frequencies, then create buckets where index represents frequency. Iterate from highest frequency.",
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
    hints: ["Count frequencies first", "Bucket sort by frequency"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 347,
    orderIndex: 5
  },
  {
    id: "6",
    title: "Product of Array Except Self",
    slug: "product-of-array-except-self",
    difficulty: "Medium",
    category: "Arrays & Hashing",
    description: "Given an integer array nums, return an array where answer[i] is the product of all elements except nums[i]. No division allowed.",
    testCases: [
      { input: "nums = [1,2,3,4]", output: "[24,12,8,6]" },
      { input: "nums = [-1,1,0,-3,3]", output: "[0,0,9,0,0]" }
    ],
    approach: "Use prefix and suffix products. First pass: calculate prefix products. Second pass: multiply with suffix products.",
    solutionCode: `function productExceptSelf(nums: number[]): number[] {
    const n = nums.length;
    const result = new Array(n).fill(1);
    let prefix = 1;
    for (let i = 0; i < n; i++) {
        result[i] = prefix;
        prefix *= nums[i];
    }
    let suffix = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= suffix;
        suffix *= nums[i];
    }
    return result;
}`,
    hints: ["product = prefix * suffix", "Compute in two passes"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 238,
    orderIndex: 6
  },
  {
    id: "7",
    title: "Valid Sudoku",
    slug: "valid-sudoku",
    difficulty: "Medium",
    category: "Arrays & Hashing",
    description: "Determine if a 9x9 Sudoku board is valid. Only filled cells need to be validated.",
    testCases: [
      { input: "board = [[...]]", output: "true" },
      { input: "board = [[...]]", output: "false" }
    ],
    approach: "Use hash sets to track seen numbers for each row, column, and 3x3 box. Check for duplicates.",
    solutionCode: `function isValidSudoku(board: string[][]): boolean {
    const rows = Array(9).fill(null).map(() => new Set<string>());
    const cols = Array(9).fill(null).map(() => new Set<string>());
    const boxes = Array(9).fill(null).map(() => new Set<string>());
    
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const val = board[r][c];
            if (val === '.') continue;
            const boxIdx = Math.floor(r / 3) * 3 + Math.floor(c / 3);
            if (rows[r].has(val) || cols[c].has(val) || boxes[boxIdx].has(val)) {
                return false;
            }
            rows[r].add(val);
            cols[c].add(val);
            boxes[boxIdx].add(val);
        }
    }
    return true;
}`,
    hints: ["Track each row, column, and 3x3 box separately", "Use sets to detect duplicates"],
    timeComplexity: "O(81) = O(1)",
    spaceComplexity: "O(81) = O(1)",
    leetcodeNumber: 36,
    orderIndex: 7
  },
  {
    id: "8",
    title: "Encode and Decode Strings",
    slug: "encode-and-decode-strings",
    difficulty: "Medium",
    category: "Arrays & Hashing",
    description: "Design an algorithm to encode a list of strings to a string and decode it back.",
    testCases: [
      { input: 'strs = ["hello","world"]', output: '["hello","world"]' },
      { input: 'strs = [""]', output: '[""]' }
    ],
    approach: "Encode each string with its length followed by a delimiter. Decode by reading length, then extracting that many characters.",
    solutionCode: `function encode(strs: string[]): string {
    return strs.map(s => s.length + '#' + s).join('');
}

function decode(s: string): string[] {
    const result: string[] = [];
    let i = 0;
    while (i < s.length) {
        let j = i;
        while (s[j] !== '#') j++;
        const len = parseInt(s.slice(i, j));
        result.push(s.slice(j + 1, j + 1 + len));
        i = j + 1 + len;
    }
    return result;
}`,
    hints: ["How do you know where one string ends and another begins?", "Include length information"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 271,
    orderIndex: 8
  },
  {
    id: "9",
    title: "Longest Consecutive Sequence",
    slug: "longest-consecutive-sequence",
    difficulty: "Medium",
    category: "Arrays & Hashing",
    description: "Given an unsorted array of integers, return the length of the longest consecutive elements sequence in O(n) time.",
    testCases: [
      { input: "nums = [100,4,200,1,3,2]", output: "4", explanation: "[1,2,3,4]" },
      { input: "nums = [0,3,7,2,5,8,4,6,0,1]", output: "9" }
    ],
    approach: "Use a set for O(1) lookup. For each number that is the start of a sequence (n-1 not in set), count consecutive numbers.",
    solutionCode: `function longestConsecutive(nums: number[]): number {
    const set = new Set(nums);
    let longest = 0;
    
    for (const num of set) {
        if (!set.has(num - 1)) {
            let length = 1;
            let curr = num;
            while (set.has(curr + 1)) {
                curr++;
                length++;
            }
            longest = Math.max(longest, length);
        }
    }
    return longest;
}`,
    hints: ["Only start counting from sequence start", "Use a set for O(1) lookup"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 128,
    orderIndex: 9
  },

  // ==================== TWO POINTERS (5 problems) ====================
  {
    id: "10",
    title: "Valid Palindrome",
    slug: "valid-palindrome",
    difficulty: "Easy",
    category: "Two Pointers",
    description: "Check if a string is a palindrome, considering only alphanumeric characters and ignoring case.",
    testCases: [
      { input: 's = "A man, a plan, a canal: Panama"', output: "true" },
      { input: 's = "race a car"', output: "false" }
    ],
    approach: "Use two pointers from both ends. Skip non-alphanumeric characters. Compare characters case-insensitively.",
    solutionCode: `function isPalindrome(s: string): boolean {
    let left = 0, right = s.length - 1;
    while (left < right) {
        while (left < right && !isAlphanumeric(s[left])) left++;
        while (left < right && !isAlphanumeric(s[right])) right--;
        if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
        left++;
        right--;
    }
    return true;
}
function isAlphanumeric(c: string): boolean {
    return /[a-zA-Z0-9]/.test(c);
}`,
    hints: ["Skip non-alphanumeric characters", "Compare from both ends"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 125,
    orderIndex: 10
  },
  {
    id: "11",
    title: "Two Sum II - Input Array Is Sorted",
    slug: "two-sum-ii",
    difficulty: "Medium",
    category: "Two Pointers",
    description: "Given a 1-indexed sorted array, find two numbers that add up to target. Return their indices.",
    testCases: [
      { input: "numbers = [2,7,11,15], target = 9", output: "[1,2]" },
      { input: "numbers = [2,3,4], target = 6", output: "[1,3]" }
    ],
    approach: "Use two pointers at both ends. If sum too small, move left pointer right. If sum too large, move right pointer left.",
    solutionCode: `function twoSum(numbers: number[], target: number): number[] {
    let left = 0, right = numbers.length - 1;
    while (left < right) {
        const sum = numbers[left] + numbers[right];
        if (sum === target) return [left + 1, right + 1];
        if (sum < target) left++;
        else right--;
    }
    return [];
}`,
    hints: ["Array is sorted", "Use two pointers"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 167,
    orderIndex: 11
  },
  {
    id: "12",
    title: "3Sum",
    slug: "3sum",
    difficulty: "Medium",
    category: "Two Pointers",
    description: "Find all unique triplets that sum to zero.",
    testCases: [
      { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
      { input: "nums = [0,0,0]", output: "[[0,0,0]]" }
    ],
    approach: "Sort the array. For each element, use two pointers to find pairs that sum to its negative. Skip duplicates.",
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
                left++; right--;
            } else if (sum < 0) left++;
            else right--;
        }
    }
    return result;
}`,
    hints: ["Sort first", "Reduce to two sum", "Handle duplicates"],
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 15,
    orderIndex: 12
  },
  {
    id: "13",
    title: "Container With Most Water",
    slug: "container-with-most-water",
    difficulty: "Medium",
    category: "Two Pointers",
    description: "Find two lines that form a container holding the most water.",
    testCases: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" },
      { input: "height = [1,1]", output: "1" }
    ],
    approach: "Use two pointers at both ends. Calculate area. Move the pointer with smaller height inward.",
    solutionCode: `function maxArea(height: number[]): number {
    let left = 0, right = height.length - 1;
    let maxWater = 0;
    while (left < right) {
        const h = Math.min(height[left], height[right]);
        maxWater = Math.max(maxWater, (right - left) * h);
        if (height[left] < height[right]) left++;
        else right--;
    }
    return maxWater;
}`,
    hints: ["Start with widest container", "Move the shorter line"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 11,
    orderIndex: 13
  },
  {
    id: "14",
    title: "Trapping Rain Water",
    slug: "trapping-rain-water",
    difficulty: "Hard",
    category: "Two Pointers",
    description: "Given elevation map, compute how much water can be trapped after rain.",
    testCases: [
      { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" },
      { input: "height = [4,2,0,3,2,5]", output: "9" }
    ],
    approach: "Use two pointers. Track leftMax and rightMax. Water at each position = min(leftMax, rightMax) - height[i].",
    solutionCode: `function trap(height: number[]): number {
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0;
    let water = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) leftMax = height[left];
            else water += leftMax - height[left];
            left++;
        } else {
            if (height[right] >= rightMax) rightMax = height[right];
            else water += rightMax - height[right];
            right--;
        }
    }
    return water;
}`,
    hints: ["Water at i depends on min of max heights on both sides", "Use two pointers with max tracking"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 42,
    orderIndex: 14
  },

  // ==================== SLIDING WINDOW (6 problems) ====================
  {
    id: "15",
    title: "Best Time to Buy and Sell Stock",
    slug: "best-time-to-buy-and-sell-stock",
    difficulty: "Easy",
    category: "Sliding Window",
    description: "Find the maximum profit from buying and selling stock once.",
    testCases: [
      { input: "prices = [7,1,5,3,6,4]", output: "5" },
      { input: "prices = [7,6,4,3,1]", output: "0" }
    ],
    approach: "Track minimum price seen so far. At each day, calculate potential profit if sold today.",
    solutionCode: `function maxProfit(prices: number[]): number {
    let minPrice = Infinity;
    let maxProfit = 0;
    for (const price of prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
    }
    return maxProfit;
}`,
    hints: ["Track minimum price seen", "Calculate profit at each step"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 121,
    orderIndex: 15
  },
  {
    id: "16",
    title: "Longest Substring Without Repeating Characters",
    slug: "longest-substring-without-repeating-characters",
    difficulty: "Medium",
    category: "Sliding Window",
    description: "Find the length of the longest substring without repeating characters.",
    testCases: [
      { input: 's = "abcabcbb"', output: "3" },
      { input: 's = "bbbbb"', output: "1" }
    ],
    approach: "Use sliding window with a set. When duplicate found, shrink window from left.",
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
    hints: ["Use a set to track characters", "Shrink window when duplicate found"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(min(n, m))",
    leetcodeNumber: 3,
    orderIndex: 16
  },
  {
    id: "17",
    title: "Longest Repeating Character Replacement",
    slug: "longest-repeating-character-replacement",
    difficulty: "Medium",
    category: "Sliding Window",
    description: "Find longest substring with same letter after at most k character replacements.",
    testCases: [
      { input: 's = "ABAB", k = 2', output: "4" },
      { input: 's = "AABABBA", k = 1', output: "4" }
    ],
    approach: "Sliding window. Valid window: (size - maxFrequency) <= k. Shrink when invalid.",
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
    hints: ["Changes needed = windowSize - maxFrequency", "Shrink when changes > k"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(26)",
    leetcodeNumber: 424,
    orderIndex: 17
  },
  {
    id: "18",
    title: "Permutation in String",
    slug: "permutation-in-string",
    difficulty: "Medium",
    category: "Sliding Window",
    description: "Check if s2 contains a permutation of s1.",
    testCases: [
      { input: 's1 = "ab", s2 = "eidbaooo"', output: "true" },
      { input: 's1 = "ab", s2 = "eidboaoo"', output: "false" }
    ],
    approach: "Use fixed-size sliding window of s1's length. Compare character counts.",
    solutionCode: `function checkInclusion(s1: string, s2: string): boolean {
    if (s1.length > s2.length) return false;
    const count1 = new Array(26).fill(0);
    const count2 = new Array(26).fill(0);
    for (let i = 0; i < s1.length; i++) {
        count1[s1.charCodeAt(i) - 97]++;
        count2[s2.charCodeAt(i) - 97]++;
    }
    let matches = 0;
    for (let i = 0; i < 26; i++) {
        if (count1[i] === count2[i]) matches++;
    }
    for (let i = s1.length; i < s2.length; i++) {
        if (matches === 26) return true;
        const left = s2.charCodeAt(i - s1.length) - 97;
        const right = s2.charCodeAt(i) - 97;
        count2[right]++;
        if (count2[right] === count1[right]) matches++;
        else if (count2[right] === count1[right] + 1) matches--;
        count2[left]--;
        if (count2[left] === count1[left]) matches++;
        else if (count2[left] === count1[left] - 1) matches--;
    }
    return matches === 26;
}`,
    hints: ["Fixed window size", "Compare character frequencies"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 567,
    orderIndex: 18
  },
  {
    id: "19",
    title: "Minimum Window Substring",
    slug: "minimum-window-substring",
    difficulty: "Hard",
    category: "Sliding Window",
    description: "Find the minimum window in s which contains all characters of t.",
    testCases: [
      { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"' },
      { input: 's = "a", t = "a"', output: '"a"' }
    ],
    approach: "Expand window until all chars found, then shrink from left while maintaining valid window.",
    solutionCode: `function minWindow(s: string, t: string): string {
    const need = new Map<string, number>();
    for (const c of t) need.set(c, (need.get(c) || 0) + 1);
    let have = 0, required = need.size;
    let left = 0, minLen = Infinity, minStart = 0;
    const window = new Map<string, number>();
    for (let right = 0; right < s.length; right++) {
        const c = s[right];
        window.set(c, (window.get(c) || 0) + 1);
        if (need.has(c) && window.get(c) === need.get(c)) have++;
        while (have === required) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minStart = left;
            }
            const l = s[left];
            window.set(l, window.get(l)! - 1);
            if (need.has(l) && window.get(l)! < need.get(l)!) have--;
            left++;
        }
    }
    return minLen === Infinity ? "" : s.slice(minStart, minStart + minLen);
}`,
    hints: ["Expand to find valid window", "Shrink to minimize"],
    timeComplexity: "O(n + m)",
    spaceComplexity: "O(n + m)",
    leetcodeNumber: 76,
    orderIndex: 19
  },
  {
    id: "20",
    title: "Sliding Window Maximum",
    slug: "sliding-window-maximum",
    difficulty: "Hard",
    category: "Sliding Window",
    description: "Return the max sliding window for each window position.",
    testCases: [
      { input: "nums = [1,3,-1,-3,5,3,6,7], k = 3", output: "[3,3,5,5,6,7]" },
      { input: "nums = [1], k = 1", output: "[1]" }
    ],
    approach: "Use monotonic decreasing deque. Front always has max of current window.",
    solutionCode: `function maxSlidingWindow(nums: number[], k: number): number[] {
    const deque: number[] = [];
    const result: number[] = [];
    for (let i = 0; i < nums.length; i++) {
        while (deque.length && deque[0] < i - k + 1) deque.shift();
        while (deque.length && nums[deque[deque.length - 1]] < nums[i]) deque.pop();
        deque.push(i);
        if (i >= k - 1) result.push(nums[deque[0]]);
    }
    return result;
}`,
    hints: ["Use monotonic deque", "Remove elements outside window"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(k)",
    leetcodeNumber: 239,
    orderIndex: 20
  },

  // ==================== STACK (7 problems) ====================
  {
    id: "21",
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    difficulty: "Easy",
    category: "Stack",
    description: "Check if the input string has valid bracket pairs.",
    testCases: [
      { input: 's = "()"', output: "true" },
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" }
    ],
    approach: "Use a stack. Push opening brackets. For closing, pop and verify match.",
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
    hints: ["Opening brackets go on stack", "Closing must match top"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 20,
    orderIndex: 21
  },
  {
    id: "22",
    title: "Min Stack",
    slug: "min-stack",
    difficulty: "Medium",
    category: "Stack",
    description: "Design a stack that supports push, pop, top, and retrieving minimum in O(1).",
    testCases: [
      { input: "push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()", output: "-3, 0, -2" }
    ],
    approach: "Use two stacks: one for values, one for minimums. Track min at each level.",
    solutionCode: `class MinStack {
    private stack: number[] = [];
    private minStack: number[] = [];
    
    push(val: number): void {
        this.stack.push(val);
        const min = this.minStack.length === 0 ? val : Math.min(val, this.minStack[this.minStack.length - 1]);
        this.minStack.push(min);
    }
    
    pop(): void {
        this.stack.pop();
        this.minStack.pop();
    }
    
    top(): number {
        return this.stack[this.stack.length - 1];
    }
    
    getMin(): number {
        return this.minStack[this.minStack.length - 1];
    }
}`,
    hints: ["Track minimum at each stack level", "Use auxiliary stack"],
    timeComplexity: "O(1)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 155,
    orderIndex: 22
  },
  {
    id: "23",
    title: "Evaluate Reverse Polish Notation",
    slug: "evaluate-reverse-polish-notation",
    difficulty: "Medium",
    category: "Stack",
    description: "Evaluate expression in Reverse Polish Notation.",
    testCases: [
      { input: 'tokens = ["2","1","+","3","*"]', output: "9" },
      { input: 'tokens = ["4","13","5","/","+"]', output: "6" }
    ],
    approach: "Use stack. Push numbers. For operators, pop two operands, compute, push result.",
    solutionCode: `function evalRPN(tokens: string[]): number {
    const stack: number[] = [];
    const ops: Record<string, (a: number, b: number) => number> = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => Math.trunc(a / b),
    };
    for (const token of tokens) {
        if (token in ops) {
            const b = stack.pop()!;
            const a = stack.pop()!;
            stack.push(ops[token](a, b));
        } else {
            stack.push(parseInt(token));
        }
    }
    return stack[0];
}`,
    hints: ["Stack for operands", "Pop two, compute, push result"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 150,
    orderIndex: 23
  },
  {
    id: "24",
    title: "Generate Parentheses",
    slug: "generate-parentheses",
    difficulty: "Medium",
    category: "Stack",
    description: "Generate all combinations of well-formed parentheses for n pairs.",
    testCases: [
      { input: "n = 3", output: '["((()))","(()())","(())()","()(())","()()()"]' },
      { input: "n = 1", output: '["()"]' }
    ],
    approach: "Backtracking. Add '(' if open < n. Add ')' if close < open.",
    solutionCode: `function generateParenthesis(n: number): string[] {
    const result: string[] = [];
    function backtrack(curr: string, open: number, close: number) {
        if (curr.length === 2 * n) {
            result.push(curr);
            return;
        }
        if (open < n) backtrack(curr + '(', open + 1, close);
        if (close < open) backtrack(curr + ')', open, close + 1);
    }
    backtrack('', 0, 0);
    return result;
}`,
    hints: ["Track open and close counts", "Only add ')' if close < open"],
    timeComplexity: "O(4^n / √n)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 22,
    orderIndex: 24
  },
  {
    id: "25",
    title: "Daily Temperatures",
    slug: "daily-temperatures",
    difficulty: "Medium",
    category: "Stack",
    description: "For each day, find how many days until a warmer temperature.",
    testCases: [
      { input: "temperatures = [73,74,75,71,69,72,76,73]", output: "[1,1,4,2,1,1,0,0]" },
      { input: "temperatures = [30,40,50,60]", output: "[1,1,1,0]" }
    ],
    approach: "Monotonic decreasing stack. When warmer day found, pop and calculate difference.",
    solutionCode: `function dailyTemperatures(temperatures: number[]): number[] {
    const n = temperatures.length;
    const result = new Array(n).fill(0);
    const stack: number[] = [];
    for (let i = 0; i < n; i++) {
        while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const j = stack.pop()!;
            result[j] = i - j;
        }
        stack.push(i);
    }
    return result;
}`,
    hints: ["Use monotonic stack", "Store indices, not values"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 739,
    orderIndex: 25
  },
  {
    id: "26",
    title: "Car Fleet",
    slug: "car-fleet",
    difficulty: "Medium",
    category: "Stack",
    description: "Count number of car fleets that arrive at destination.",
    testCases: [
      { input: "target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]", output: "3" },
      { input: "target = 10, position = [3], speed = [3]", output: "1" }
    ],
    approach: "Sort by position descending. Calculate arrival time. Stack to track fleets.",
    solutionCode: `function carFleet(target: number, position: number[], speed: number[]): number {
    const cars = position.map((p, i) => [p, speed[i]]).sort((a, b) => b[0] - a[0]);
    const stack: number[] = [];
    for (const [pos, spd] of cars) {
        const time = (target - pos) / spd;
        if (stack.length === 0 || time > stack[stack.length - 1]) {
            stack.push(time);
        }
    }
    return stack.length;
}`,
    hints: ["Sort by position", "Compare arrival times"],
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 853,
    orderIndex: 26
  },
  {
    id: "27",
    title: "Largest Rectangle in Histogram",
    slug: "largest-rectangle-in-histogram",
    difficulty: "Hard",
    category: "Stack",
    description: "Find the largest rectangle area in a histogram.",
    testCases: [
      { input: "heights = [2,1,5,6,2,3]", output: "10" },
      { input: "heights = [2,4]", output: "4" }
    ],
    approach: "Monotonic increasing stack. For each bar, find the first smaller bar on left and right.",
    solutionCode: `function largestRectangleArea(heights: number[]): number {
    const stack: number[] = [];
    let maxArea = 0;
    const n = heights.length;
    for (let i = 0; i <= n; i++) {
        const h = i === n ? 0 : heights[i];
        while (stack.length && h < heights[stack[stack.length - 1]]) {
            const height = heights[stack.pop()!];
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        stack.push(i);
    }
    return maxArea;
}`,
    hints: ["Monotonic increasing stack", "Calculate width when popping"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 84,
    orderIndex: 27
  },

  // ==================== BINARY SEARCH (7 problems) ====================
  {
    id: "28",
    title: "Binary Search",
    slug: "binary-search",
    difficulty: "Easy",
    category: "Binary Search",
    description: "Search for target in sorted array. Return index or -1.",
    testCases: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" },
      { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1" }
    ],
    approach: "Use two pointers. Calculate mid, compare with target. Narrow search space by half.",
    solutionCode: `function search(nums: number[], target: number): number {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) return mid;
        if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
    hints: ["Array is sorted", "Eliminate half each time"],
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 704,
    orderIndex: 28
  },
  {
    id: "29",
    title: "Search a 2D Matrix",
    slug: "search-a-2d-matrix",
    difficulty: "Medium",
    category: "Binary Search",
    description: "Search for target in a row-wise and column-wise sorted matrix.",
    testCases: [
      { input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3", output: "true" },
      { input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13", output: "false" }
    ],
    approach: "Treat matrix as a sorted array. Binary search with index conversion: row = mid / cols, col = mid % cols.",
    solutionCode: `function searchMatrix(matrix: number[][], target: number): boolean {
    const m = matrix.length, n = matrix[0].length;
    let left = 0, right = m * n - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const val = matrix[Math.floor(mid / n)][mid % n];
        if (val === target) return true;
        if (val < target) left = mid + 1;
        else right = mid - 1;
    }
    return false;
}`,
    hints: ["Flatten to 1D conceptually", "Convert index to row/col"],
    timeComplexity: "O(log(m*n))",
    spaceComplexity: "O(1)",
    leetcodeNumber: 74,
    orderIndex: 29
  },
  {
    id: "30",
    title: "Koko Eating Bananas",
    slug: "koko-eating-bananas",
    difficulty: "Medium",
    category: "Binary Search",
    description: "Find minimum eating speed to finish all bananas in h hours.",
    testCases: [
      { input: "piles = [3,6,7,11], h = 8", output: "4" },
      { input: "piles = [30,11,23,4,20], h = 5", output: "30" }
    ],
    approach: "Binary search on speed. For each speed, calculate total hours needed.",
    solutionCode: `function minEatingSpeed(piles: number[], h: number): number {
    let left = 1, right = Math.max(...piles);
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        const hours = piles.reduce((sum, p) => sum + Math.ceil(p / mid), 0);
        if (hours <= h) right = mid;
        else left = mid + 1;
    }
    return left;
}`,
    hints: ["Binary search on answer", "Check if speed k works"],
    timeComplexity: "O(n log m)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 875,
    orderIndex: 30
  },
  {
    id: "31",
    title: "Find Minimum in Rotated Sorted Array",
    slug: "find-minimum-in-rotated-sorted-array",
    difficulty: "Medium",
    category: "Binary Search",
    description: "Find minimum element in rotated sorted array.",
    testCases: [
      { input: "nums = [3,4,5,1,2]", output: "1" },
      { input: "nums = [4,5,6,7,0,1,2]", output: "0" }
    ],
    approach: "Binary search. Compare mid with right. If mid > right, min is on right side.",
    solutionCode: `function findMin(nums: number[]): number {
    let left = 0, right = nums.length - 1;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] > nums[right]) left = mid + 1;
        else right = mid;
    }
    return nums[left];
}`,
    hints: ["Compare with rightmost element", "Minimum is at rotation point"],
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 153,
    orderIndex: 31
  },
  {
    id: "32",
    title: "Search in Rotated Sorted Array",
    slug: "search-in-rotated-sorted-array",
    difficulty: "Medium",
    category: "Binary Search",
    description: "Search for target in rotated sorted array.",
    testCases: [
      { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" },
      { input: "nums = [4,5,6,7,0,1,2], target = 3", output: "-1" }
    ],
    approach: "Binary search. Determine which half is sorted. Check if target is in sorted half.",
    solutionCode: `function search(nums: number[], target: number): number {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) return mid;
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) right = mid - 1;
            else left = mid + 1;
        } else {
            if (nums[mid] < target && target <= nums[right]) left = mid + 1;
            else right = mid - 1;
        }
    }
    return -1;
}`,
    hints: ["Find which half is sorted", "Check if target in sorted half"],
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 33,
    orderIndex: 32
  },
  {
    id: "33",
    title: "Time Based Key-Value Store",
    slug: "time-based-key-value-store",
    difficulty: "Medium",
    category: "Binary Search",
    description: "Design a time-based key-value store that can retrieve values at timestamps.",
    testCases: [
      { input: "set(foo, bar, 1), get(foo, 1), get(foo, 3)", output: "bar, bar" }
    ],
    approach: "Store values with timestamps in array. Binary search for closest timestamp <= given.",
    solutionCode: `class TimeMap {
    private map = new Map<string, [string, number][]>();
    
    set(key: string, value: string, timestamp: number): void {
        if (!this.map.has(key)) this.map.set(key, []);
        this.map.get(key)!.push([value, timestamp]);
    }
    
    get(key: string, timestamp: number): string {
        const values = this.map.get(key);
        if (!values) return "";
        let left = 0, right = values.length - 1, result = "";
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (values[mid][1] <= timestamp) {
                result = values[mid][0];
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return result;
    }
}`,
    hints: ["Store (value, timestamp) pairs", "Binary search for timestamp"],
    timeComplexity: "O(log n) get",
    spaceComplexity: "O(n)",
    leetcodeNumber: 981,
    orderIndex: 33
  },
  {
    id: "34",
    title: "Median of Two Sorted Arrays",
    slug: "median-of-two-sorted-arrays",
    difficulty: "Hard",
    category: "Binary Search",
    description: "Find the median of two sorted arrays in O(log(m+n)) time.",
    testCases: [
      { input: "nums1 = [1,3], nums2 = [2]", output: "2.0" },
      { input: "nums1 = [1,2], nums2 = [3,4]", output: "2.5" }
    ],
    approach: "Binary search on smaller array. Partition both arrays so left parts have correct median candidates.",
    solutionCode: `function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    if (nums1.length > nums2.length) [nums1, nums2] = [nums2, nums1];
    const m = nums1.length, n = nums2.length;
    let left = 0, right = m;
    while (left <= right) {
        const i = Math.floor((left + right) / 2);
        const j = Math.floor((m + n + 1) / 2) - i;
        const maxLeft1 = i === 0 ? -Infinity : nums1[i - 1];
        const minRight1 = i === m ? Infinity : nums1[i];
        const maxLeft2 = j === 0 ? -Infinity : nums2[j - 1];
        const minRight2 = j === n ? Infinity : nums2[j];
        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
            if ((m + n) % 2 === 0) {
                return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;
            }
            return Math.max(maxLeft1, maxLeft2);
        } else if (maxLeft1 > minRight2) {
            right = i - 1;
        } else {
            left = i + 1;
        }
    }
    return 0;
}`,
    hints: ["Binary search on smaller array", "Partition to balance left/right"],
    timeComplexity: "O(log(min(m,n)))",
    spaceComplexity: "O(1)",
    leetcodeNumber: 4,
    orderIndex: 34
  },

  // ==================== LINKED LIST (11 problems) ====================
  {
    id: "35",
    title: "Reverse Linked List",
    slug: "reverse-linked-list",
    difficulty: "Easy",
    category: "Linked List",
    description: "Reverse a singly linked list.",
    testCases: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
      { input: "head = [1,2]", output: "[2,1]" }
    ],
    approach: "Use three pointers: prev, curr, next. For each node, reverse the pointer direction.",
    solutionCode: `function reverseList(head: ListNode | null): ListNode | null {
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
    hints: ["Track previous node", "Reverse pointer direction"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 206,
    orderIndex: 35
  },
  {
    id: "36",
    title: "Merge Two Sorted Lists",
    slug: "merge-two-sorted-lists",
    difficulty: "Easy",
    category: "Linked List",
    description: "Merge two sorted linked lists into one sorted list.",
    testCases: [
      { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "list1 = [], list2 = []", output: "[]" }
    ],
    approach: "Use dummy head. Compare nodes from both lists, append smaller one.",
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
    hints: ["Use dummy head", "Compare and take smaller"],
    timeComplexity: "O(n + m)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 21,
    orderIndex: 36
  },
  {
    id: "37",
    title: "Reorder List",
    slug: "reorder-list",
    difficulty: "Medium",
    category: "Linked List",
    description: "Reorder list L0→L1→...→Ln to L0→Ln→L1→Ln-1→...",
    testCases: [
      { input: "head = [1,2,3,4]", output: "[1,4,2,3]" },
      { input: "head = [1,2,3,4,5]", output: "[1,5,2,4,3]" }
    ],
    approach: "Find middle, reverse second half, merge alternately.",
    solutionCode: `function reorderList(head: ListNode | null): void {
    if (!head || !head.next) return;
    // Find middle
    let slow = head, fast = head;
    while (fast.next && fast.next.next) {
        slow = slow.next!;
        fast = fast.next.next;
    }
    // Reverse second half
    let prev: ListNode | null = null;
    let curr: ListNode | null = slow.next;
    slow.next = null;
    while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    // Merge
    let first = head, second = prev;
    while (second) {
        const next1 = first!.next, next2 = second.next;
        first!.next = second;
        second.next = next1;
        first = next1;
        second = next2;
    }
}`,
    hints: ["Find middle", "Reverse second half", "Merge alternately"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 143,
    orderIndex: 37
  },
  {
    id: "38",
    title: "Remove Nth Node From End of List",
    slug: "remove-nth-node-from-end-of-list",
    difficulty: "Medium",
    category: "Linked List",
    description: "Remove the nth node from the end of the list.",
    testCases: [
      { input: "head = [1,2,3,4,5], n = 2", output: "[1,2,3,5]" },
      { input: "head = [1], n = 1", output: "[]" }
    ],
    approach: "Use two pointers. Move first n steps ahead, then move both until first reaches end.",
    solutionCode: `function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    const dummy = new ListNode(0, head);
    let first: ListNode | null = dummy;
    let second: ListNode | null = dummy;
    for (let i = 0; i <= n; i++) first = first!.next;
    while (first) {
        first = first.next;
        second = second!.next;
    }
    second!.next = second!.next!.next;
    return dummy.next;
}`,
    hints: ["Two pointers with n gap", "Use dummy node"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 19,
    orderIndex: 38
  },
  {
    id: "39",
    title: "Copy List with Random Pointer",
    slug: "copy-list-with-random-pointer",
    difficulty: "Medium",
    category: "Linked List",
    description: "Deep copy a linked list with random pointers.",
    testCases: [
      { input: "head = [[7,null],[13,0],[11,4],[10,2],[1,0]]", output: "[[7,null],[13,0],[11,4],[10,2],[1,0]]" }
    ],
    approach: "Use hash map to map original nodes to copies. Two passes: create nodes, then set pointers.",
    solutionCode: `function copyRandomList(head: Node | null): Node | null {
    if (!head) return null;
    const map = new Map<Node, Node>();
    let curr: Node | null = head;
    while (curr) {
        map.set(curr, new Node(curr.val));
        curr = curr.next;
    }
    curr = head;
    while (curr) {
        const copy = map.get(curr)!;
        copy.next = curr.next ? map.get(curr.next)! : null;
        copy.random = curr.random ? map.get(curr.random)! : null;
        curr = curr.next;
    }
    return map.get(head)!;
}`,
    hints: ["Map original to copy", "Two passes"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 138,
    orderIndex: 39
  },
  {
    id: "40",
    title: "Add Two Numbers",
    slug: "add-two-numbers",
    difficulty: "Medium",
    category: "Linked List",
    description: "Add two numbers represented as linked lists (digits in reverse order).",
    testCases: [
      { input: "l1 = [2,4,3], l2 = [5,6,4]", output: "[7,0,8]", explanation: "342 + 465 = 807" }
    ],
    approach: "Simulate addition with carry. Create new nodes for each digit.",
    solutionCode: `function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const dummy = new ListNode();
    let curr = dummy, carry = 0;
    while (l1 || l2 || carry) {
        const sum = (l1?.val || 0) + (l2?.val || 0) + carry;
        carry = Math.floor(sum / 10);
        curr.next = new ListNode(sum % 10);
        curr = curr.next;
        l1 = l1?.next || null;
        l2 = l2?.next || null;
    }
    return dummy.next;
}`,
    hints: ["Handle carry", "Continue until both lists and carry exhausted"],
    timeComplexity: "O(max(m,n))",
    spaceComplexity: "O(max(m,n))",
    leetcodeNumber: 2,
    orderIndex: 40
  },
  {
    id: "41",
    title: "Linked List Cycle",
    slug: "linked-list-cycle",
    difficulty: "Easy",
    category: "Linked List",
    description: "Detect if a linked list has a cycle.",
    testCases: [
      { input: "head = [3,2,0,-4], pos = 1", output: "true" },
      { input: "head = [1], pos = -1", output: "false" }
    ],
    approach: "Use slow and fast pointers. If they meet, there's a cycle.",
    solutionCode: `function hasCycle(head: ListNode | null): boolean {
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow!.next;
        fast = fast.next.next;
        if (slow === fast) return true;
    }
    return false;
}`,
    hints: ["Fast pointer moves 2x", "If cycle exists, they'll meet"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 141,
    orderIndex: 41
  },
  {
    id: "42",
    title: "Find the Duplicate Number",
    slug: "find-the-duplicate-number",
    difficulty: "Medium",
    category: "Linked List",
    description: "Find duplicate in array of n+1 integers in range [1,n] without modifying array.",
    testCases: [
      { input: "nums = [1,3,4,2,2]", output: "2" },
      { input: "nums = [3,1,3,4,2]", output: "3" }
    ],
    approach: "Floyd's cycle detection. Treat array as linked list where nums[i] points to nums[nums[i]].",
    solutionCode: `function findDuplicate(nums: number[]): number {
    let slow = nums[0], fast = nums[0];
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow !== fast);
    slow = nums[0];
    while (slow !== fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    return slow;
}`,
    hints: ["Treat as linked list", "Floyd's cycle detection"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 287,
    orderIndex: 42
  },
  {
    id: "43",
    title: "LRU Cache",
    slug: "lru-cache",
    difficulty: "Medium",
    category: "Linked List",
    description: "Design a Least Recently Used (LRU) cache.",
    testCases: [
      { input: "LRUCache(2), put(1,1), put(2,2), get(1), put(3,3), get(2)", output: "1, -1" }
    ],
    approach: "Use doubly linked list for O(1) removal and hash map for O(1) lookup.",
    solutionCode: `class LRUCache {
    private capacity: number;
    private cache = new Map<number, number>();
    
    constructor(capacity: number) {
        this.capacity = capacity;
    }
    
    get(key: number): number {
        if (!this.cache.has(key)) return -1;
        const val = this.cache.get(key)!;
        this.cache.delete(key);
        this.cache.set(key, val);
        return val;
    }
    
    put(key: number, value: number): void {
        this.cache.delete(key);
        this.cache.set(key, value);
        if (this.cache.size > this.capacity) {
            this.cache.delete(this.cache.keys().next().value);
        }
    }
}`,
    hints: ["Hash map + doubly linked list", "Move to front on access"],
    timeComplexity: "O(1)",
    spaceComplexity: "O(capacity)",
    leetcodeNumber: 146,
    orderIndex: 43
  },
  {
    id: "44",
    title: "Merge K Sorted Lists",
    slug: "merge-k-sorted-lists",
    difficulty: "Hard",
    category: "Linked List",
    description: "Merge k sorted linked lists into one sorted list.",
    testCases: [
      { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" }
    ],
    approach: "Use min heap or divide and conquer (merge pairs).",
    solutionCode: `function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    if (lists.length === 0) return null;
    while (lists.length > 1) {
        const merged: Array<ListNode | null> = [];
        for (let i = 0; i < lists.length; i += 2) {
            const l1 = lists[i];
            const l2 = i + 1 < lists.length ? lists[i + 1] : null;
            merged.push(mergeTwoLists(l1, l2));
        }
        lists = merged;
    }
    return lists[0];
}

function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const dummy = new ListNode();
    let curr = dummy;
    while (l1 && l2) {
        if (l1.val <= l2.val) { curr.next = l1; l1 = l1.next; }
        else { curr.next = l2; l2 = l2.next; }
        curr = curr.next;
    }
    curr.next = l1 || l2;
    return dummy.next;
}`,
    hints: ["Divide and conquer", "Or use min heap"],
    timeComplexity: "O(n log k)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 23,
    orderIndex: 44
  },
  {
    id: "45",
    title: "Reverse Nodes in k-Group",
    slug: "reverse-nodes-in-k-group",
    difficulty: "Hard",
    category: "Linked List",
    description: "Reverse nodes in groups of k.",
    testCases: [
      { input: "head = [1,2,3,4,5], k = 2", output: "[2,1,4,3,5]" },
      { input: "head = [1,2,3,4,5], k = 3", output: "[3,2,1,4,5]" }
    ],
    approach: "Count k nodes, reverse them, recursively process rest.",
    solutionCode: `function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
    let count = 0;
    let curr = head;
    while (curr && count < k) {
        curr = curr.next;
        count++;
    }
    if (count < k) return head;
    
    let prev: ListNode | null = null;
    curr = head;
    for (let i = 0; i < k; i++) {
        const next = curr!.next;
        curr!.next = prev;
        prev = curr;
        curr = next;
    }
    head!.next = reverseKGroup(curr, k);
    return prev;
}`,
    hints: ["Count k nodes first", "Reverse, then recurse"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n/k)",
    leetcodeNumber: 25,
    orderIndex: 45
  },

  // ==================== TREES (15 problems) ====================
  {
    id: "46",
    title: "Invert Binary Tree",
    slug: "invert-binary-tree",
    difficulty: "Easy",
    category: "Trees",
    description: "Invert a binary tree (mirror it).",
    testCases: [
      { input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" }
    ],
    approach: "Recursively swap left and right children for each node.",
    solutionCode: `function invertTree(root: TreeNode | null): TreeNode | null {
    if (!root) return null;
    const temp = root.left;
    root.left = invertTree(root.right);
    root.right = invertTree(temp);
    return root;
}`,
    hints: ["Swap children at each node", "Recursion"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    leetcodeNumber: 226,
    orderIndex: 46
  },
  {
    id: "47",
    title: "Maximum Depth of Binary Tree",
    slug: "maximum-depth-of-binary-tree",
    difficulty: "Easy",
    category: "Trees",
    description: "Find the maximum depth of a binary tree.",
    testCases: [
      { input: "root = [3,9,20,null,null,15,7]", output: "3" }
    ],
    approach: "Recursively find max depth of subtrees. Return 1 + max.",
    solutionCode: `function maxDepth(root: TreeNode | null): number {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
    hints: ["Depth = 1 + deeper subtree", "Base case: null = 0"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    leetcodeNumber: 104,
    orderIndex: 47
  },
  {
    id: "48",
    title: "Diameter of Binary Tree",
    slug: "diameter-of-binary-tree",
    difficulty: "Easy",
    category: "Trees",
    description: "Find the diameter (longest path between any two nodes) of a binary tree.",
    testCases: [
      { input: "root = [1,2,3,4,5]", output: "3" }
    ],
    approach: "At each node, diameter through it = left height + right height. Track maximum.",
    solutionCode: `function diameterOfBinaryTree(root: TreeNode | null): number {
    let diameter = 0;
    function height(node: TreeNode | null): number {
        if (!node) return 0;
        const left = height(node.left);
        const right = height(node.right);
        diameter = Math.max(diameter, left + right);
        return 1 + Math.max(left, right);
    }
    height(root);
    return diameter;
}`,
    hints: ["Diameter = left height + right height", "Track max while computing heights"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    leetcodeNumber: 543,
    orderIndex: 48
  },
  {
    id: "49",
    title: "Balanced Binary Tree",
    slug: "balanced-binary-tree",
    difficulty: "Easy",
    category: "Trees",
    description: "Check if a binary tree is height-balanced.",
    testCases: [
      { input: "root = [3,9,20,null,null,15,7]", output: "true" },
      { input: "root = [1,2,2,3,3,null,null,4,4]", output: "false" }
    ],
    approach: "Recursively check heights. Return -1 if unbalanced. Balanced if |left - right| <= 1.",
    solutionCode: `function isBalanced(root: TreeNode | null): boolean {
    function height(node: TreeNode | null): number {
        if (!node) return 0;
        const left = height(node.left);
        const right = height(node.right);
        if (left === -1 || right === -1 || Math.abs(left - right) > 1) return -1;
        return 1 + Math.max(left, right);
    }
    return height(root) !== -1;
}`,
    hints: ["Return -1 if unbalanced", "Check height difference <= 1"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    leetcodeNumber: 110,
    orderIndex: 49
  },
  {
    id: "50",
    title: "Same Tree",
    slug: "same-tree",
    difficulty: "Easy",
    category: "Trees",
    description: "Check if two binary trees are identical.",
    testCases: [
      { input: "p = [1,2,3], q = [1,2,3]", output: "true" },
      { input: "p = [1,2], q = [1,null,2]", output: "false" }
    ],
    approach: "Recursively compare values and structure.",
    solutionCode: `function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    if (!p && !q) return true;
    if (!p || !q || p.val !== q.val) return false;
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`,
    hints: ["Compare values recursively", "Handle null cases"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    leetcodeNumber: 100,
    orderIndex: 50
  },
  {
    id: "51",
    title: "Subtree of Another Tree",
    slug: "subtree-of-another-tree",
    difficulty: "Easy",
    category: "Trees",
    description: "Check if subRoot is a subtree of root.",
    testCases: [
      { input: "root = [3,4,5,1,2], subRoot = [4,1,2]", output: "true" }
    ],
    approach: "For each node in root, check if it's identical to subRoot.",
    solutionCode: `function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
    if (!root) return false;
    if (isSameTree(root, subRoot)) return true;
    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    if (!p && !q) return true;
    if (!p || !q || p.val !== q.val) return false;
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`,
    hints: ["Check each node as potential root", "Use isSameTree helper"],
    timeComplexity: "O(m * n)",
    spaceComplexity: "O(h)",
    leetcodeNumber: 572,
    orderIndex: 51
  },
  {
    id: "52",
    title: "Lowest Common Ancestor of a Binary Search Tree",
    slug: "lowest-common-ancestor-of-bst",
    difficulty: "Medium",
    category: "Trees",
    description: "Find LCA of two nodes in a BST.",
    testCases: [
      { input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8", output: "6" }
    ],
    approach: "Use BST property. If both < node, go left. If both > node, go right. Else, current is LCA.",
    solutionCode: `function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
    while (root) {
        if (p!.val < root.val && q!.val < root.val) root = root.left;
        else if (p!.val > root.val && q!.val > root.val) root = root.right;
        else return root;
    }
    return null;
}`,
    hints: ["Use BST property", "Split point is LCA"],
    timeComplexity: "O(h)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 235,
    orderIndex: 52
  },
  {
    id: "53",
    title: "Binary Tree Level Order Traversal",
    slug: "binary-tree-level-order-traversal",
    difficulty: "Medium",
    category: "Trees",
    description: "Return level order traversal of a binary tree.",
    testCases: [
      { input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" }
    ],
    approach: "BFS with queue. Process level by level.",
    solutionCode: `function levelOrder(root: TreeNode | null): number[][] {
    if (!root) return [];
    const result: number[][] = [];
    const queue: TreeNode[] = [root];
    while (queue.length) {
        const level: number[] = [];
        const size = queue.length;
        for (let i = 0; i < size; i++) {
            const node = queue.shift()!;
            level.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        result.push(level);
    }
    return result;
}`,
    hints: ["BFS with queue", "Track level size"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 102,
    orderIndex: 53
  },
  {
    id: "54",
    title: "Binary Tree Right Side View",
    slug: "binary-tree-right-side-view",
    difficulty: "Medium",
    category: "Trees",
    description: "Return values visible from right side of tree.",
    testCases: [
      { input: "root = [1,2,3,null,5,null,4]", output: "[1,3,4]" }
    ],
    approach: "BFS, take last node of each level. Or DFS right-to-left.",
    solutionCode: `function rightSideView(root: TreeNode | null): number[] {
    if (!root) return [];
    const result: number[] = [];
    const queue: TreeNode[] = [root];
    while (queue.length) {
        const size = queue.length;
        for (let i = 0; i < size; i++) {
            const node = queue.shift()!;
            if (i === size - 1) result.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    return result;
}`,
    hints: ["Last node of each level", "BFS level order"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 199,
    orderIndex: 54
  },
  {
    id: "55",
    title: "Count Good Nodes in Binary Tree",
    slug: "count-good-nodes-in-binary-tree",
    difficulty: "Medium",
    category: "Trees",
    description: "Count nodes where node value >= all ancestors.",
    testCases: [
      { input: "root = [3,1,4,3,null,1,5]", output: "4" }
    ],
    approach: "DFS tracking max value seen. Node is good if val >= max.",
    solutionCode: `function goodNodes(root: TreeNode | null): number {
    function dfs(node: TreeNode | null, maxVal: number): number {
        if (!node) return 0;
        const isGood = node.val >= maxVal ? 1 : 0;
        const newMax = Math.max(maxVal, node.val);
        return isGood + dfs(node.left, newMax) + dfs(node.right, newMax);
    }
    return dfs(root, root!.val);
}`,
    hints: ["Track max on path", "Node is good if val >= max"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    leetcodeNumber: 1448,
    orderIndex: 55
  },
  {
    id: "56",
    title: "Validate Binary Search Tree",
    slug: "validate-binary-search-tree",
    difficulty: "Medium",
    category: "Trees",
    description: "Validate if a tree is a valid BST.",
    testCases: [
      { input: "root = [2,1,3]", output: "true" },
      { input: "root = [5,1,4,null,null,3,6]", output: "false" }
    ],
    approach: "DFS with min/max bounds. Each node must be within valid range.",
    solutionCode: `function isValidBST(root: TreeNode | null): boolean {
    function validate(node: TreeNode | null, min: number, max: number): boolean {
        if (!node) return true;
        if (node.val <= min || node.val >= max) return false;
        return validate(node.left, min, node.val) && validate(node.right, node.val, max);
    }
    return validate(root, -Infinity, Infinity);
}`,
    hints: ["Track valid range", "Left < node < right for all subtrees"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    leetcodeNumber: 98,
    orderIndex: 56
  },
  {
    id: "57",
    title: "Kth Smallest Element in a BST",
    slug: "kth-smallest-element-in-bst",
    difficulty: "Medium",
    category: "Trees",
    description: "Find kth smallest element in BST.",
    testCases: [
      { input: "root = [3,1,4,null,2], k = 1", output: "1" }
    ],
    approach: "Inorder traversal gives sorted order. Return kth element.",
    solutionCode: `function kthSmallest(root: TreeNode | null, k: number): number {
    const stack: TreeNode[] = [];
    let curr = root;
    while (curr || stack.length) {
        while (curr) {
            stack.push(curr);
            curr = curr.left;
        }
        curr = stack.pop()!;
        k--;
        if (k === 0) return curr.val;
        curr = curr.right;
    }
    return -1;
}`,
    hints: ["Inorder = sorted", "Stop at kth"],
    timeComplexity: "O(h + k)",
    spaceComplexity: "O(h)",
    leetcodeNumber: 230,
    orderIndex: 57
  },
  {
    id: "58",
    title: "Construct Binary Tree from Preorder and Inorder Traversal",
    slug: "construct-binary-tree-from-preorder-and-inorder",
    difficulty: "Medium",
    category: "Trees",
    description: "Build tree from preorder and inorder traversals.",
    testCases: [
      { input: "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]", output: "[3,9,20,null,null,15,7]" }
    ],
    approach: "First preorder element is root. Find it in inorder to split left/right subtrees.",
    solutionCode: `function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    const map = new Map<number, number>();
    inorder.forEach((val, i) => map.set(val, i));
    let preIdx = 0;
    
    function build(left: number, right: number): TreeNode | null {
        if (left > right) return null;
        const val = preorder[preIdx++];
        const node = new TreeNode(val);
        const mid = map.get(val)!;
        node.left = build(left, mid - 1);
        node.right = build(mid + 1, right);
        return node;
    }
    return build(0, inorder.length - 1);
}`,
    hints: ["Preorder first = root", "Inorder splits left/right"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 105,
    orderIndex: 58
  },
  {
    id: "59",
    title: "Binary Tree Maximum Path Sum",
    slug: "binary-tree-maximum-path-sum",
    difficulty: "Hard",
    category: "Trees",
    description: "Find maximum path sum in binary tree. Path can start and end at any node.",
    testCases: [
      { input: "root = [1,2,3]", output: "6" },
      { input: "root = [-10,9,20,null,null,15,7]", output: "42" }
    ],
    approach: "At each node, compute max path through it. Track global max. Return max single path.",
    solutionCode: `function maxPathSum(root: TreeNode | null): number {
    let maxSum = -Infinity;
    function dfs(node: TreeNode | null): number {
        if (!node) return 0;
        const left = Math.max(0, dfs(node.left));
        const right = Math.max(0, dfs(node.right));
        maxSum = Math.max(maxSum, node.val + left + right);
        return node.val + Math.max(left, right);
    }
    dfs(root);
    return maxSum;
}`,
    hints: ["Path through node = left + node + right", "Return best single path"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    leetcodeNumber: 124,
    orderIndex: 59
  },
  {
    id: "60",
    title: "Serialize and Deserialize Binary Tree",
    slug: "serialize-and-deserialize-binary-tree",
    difficulty: "Hard",
    category: "Trees",
    description: "Design algorithm to serialize and deserialize a binary tree.",
    testCases: [
      { input: "root = [1,2,3,null,null,4,5]", output: "[1,2,3,null,null,4,5]" }
    ],
    approach: "Preorder traversal with markers for null nodes.",
    solutionCode: `function serialize(root: TreeNode | null): string {
    const result: string[] = [];
    function dfs(node: TreeNode | null) {
        if (!node) { result.push('N'); return; }
        result.push(String(node.val));
        dfs(node.left);
        dfs(node.right);
    }
    dfs(root);
    return result.join(',');
}

function deserialize(data: string): TreeNode | null {
    const vals = data.split(',');
    let i = 0;
    function dfs(): TreeNode | null {
        if (vals[i] === 'N') { i++; return null; }
        const node = new TreeNode(parseInt(vals[i++]));
        node.left = dfs();
        node.right = dfs();
        return node;
    }
    return dfs();
}`,
    hints: ["Preorder with null markers", "Reconstruct recursively"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 297,
    orderIndex: 60
  },

  // ==================== TRIES (3 problems) ====================
  {
    id: "61",
    title: "Implement Trie (Prefix Tree)",
    slug: "implement-trie",
    difficulty: "Medium",
    category: "Tries",
    description: "Implement a trie with insert, search, and startsWith.",
    testCases: [
      { input: 'insert("apple"), search("apple"), startsWith("app")', output: "true, true" }
    ],
    approach: "Use node structure with children map and end-of-word flag.",
    solutionCode: `class TrieNode {
    children = new Map<string, TrieNode>();
    isEnd = false;
}

class Trie {
    root = new TrieNode();
    
    insert(word: string): void {
        let node = this.root;
        for (const c of word) {
            if (!node.children.has(c)) node.children.set(c, new TrieNode());
            node = node.children.get(c)!;
        }
        node.isEnd = true;
    }
    
    search(word: string): boolean {
        const node = this.traverse(word);
        return node !== null && node.isEnd;
    }
    
    startsWith(prefix: string): boolean {
        return this.traverse(prefix) !== null;
    }
    
    private traverse(s: string): TrieNode | null {
        let node = this.root;
        for (const c of s) {
            if (!node.children.has(c)) return null;
            node = node.children.get(c)!;
        }
        return node;
    }
}`,
    hints: ["Node = children map + isEnd flag", "Traverse character by character"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 208,
    orderIndex: 61
  },
  {
    id: "62",
    title: "Design Add and Search Words Data Structure",
    slug: "design-add-and-search-words",
    difficulty: "Medium",
    category: "Tries",
    description: "Design data structure supporting addWord and search (with . wildcard).",
    testCases: [
      { input: 'addWord("bad"), search("b.d")', output: "true" }
    ],
    approach: "Trie with DFS for wildcard matching.",
    solutionCode: `class WordDictionary {
    root = new TrieNode();
    
    addWord(word: string): void {
        let node = this.root;
        for (const c of word) {
            if (!node.children.has(c)) node.children.set(c, new TrieNode());
            node = node.children.get(c)!;
        }
        node.isEnd = true;
    }
    
    search(word: string): boolean {
        return this.dfs(word, 0, this.root);
    }
    
    private dfs(word: string, i: number, node: TrieNode): boolean {
        if (i === word.length) return node.isEnd;
        if (word[i] === '.') {
            for (const child of node.children.values()) {
                if (this.dfs(word, i + 1, child)) return true;
            }
            return false;
        }
        if (!node.children.has(word[i])) return false;
        return this.dfs(word, i + 1, node.children.get(word[i])!);
    }
}`,
    hints: ["Use trie", "DFS for wildcard ."],
    timeComplexity: "O(n) add, O(26^n) search",
    spaceComplexity: "O(n)",
    leetcodeNumber: 211,
    orderIndex: 62
  },
  {
    id: "63",
    title: "Word Search II",
    slug: "word-search-ii",
    difficulty: "Hard",
    category: "Tries",
    description: "Find all words from dictionary that exist in a board.",
    testCases: [
      { input: 'board = [["o","a","a","n"],["e","t","a","e"]], words = ["oath","pea","eat","rain"]', output: '["eat","oath"]' }
    ],
    approach: "Build trie from words. DFS from each cell, matching against trie.",
    solutionCode: `function findWords(board: string[][], words: string[]): string[] {
    const root = new TrieNode();
    for (const word of words) {
        let node = root;
        for (const c of word) {
            if (!node.children.has(c)) node.children.set(c, new TrieNode());
            node = node.children.get(c)!;
        }
        node.word = word;
    }
    
    const result: string[] = [];
    const m = board.length, n = board[0].length;
    
    function dfs(i: number, j: number, node: TrieNode) {
        const c = board[i][j];
        if (c === '#' || !node.children.has(c)) return;
        const next = node.children.get(c)!;
        if (next.word) { result.push(next.word); next.word = undefined; }
        board[i][j] = '#';
        if (i > 0) dfs(i - 1, j, next);
        if (i < m - 1) dfs(i + 1, j, next);
        if (j > 0) dfs(i, j - 1, next);
        if (j < n - 1) dfs(i, j + 1, next);
        board[i][j] = c;
    }
    
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            dfs(i, j, root);
        }
    }
    return result;
}`,
    hints: ["Trie for efficient prefix matching", "DFS from each cell"],
    timeComplexity: "O(m*n*4^L)",
    spaceComplexity: "O(words)",
    leetcodeNumber: 212,
    orderIndex: 63
  },

  // ==================== HEAP / PRIORITY QUEUE (7 problems) ====================
  {
    id: "64",
    title: "Kth Largest Element in a Stream",
    slug: "kth-largest-element-in-stream",
    difficulty: "Easy",
    category: "Heap / Priority Queue",
    description: "Design a class to find the kth largest element in a stream.",
    testCases: [
      { input: "KthLargest(3, [4,5,8,2]), add(3), add(5)", output: "4, 5" }
    ],
    approach: "Use min heap of size k. Kth largest is always at top.",
    solutionCode: `class KthLargest {
    private k: number;
    private heap: number[] = [];
    
    constructor(k: number, nums: number[]) {
        this.k = k;
        for (const n of nums) this.add(n);
    }
    
    add(val: number): number {
        this.heap.push(val);
        this.heap.sort((a, b) => a - b);
        if (this.heap.length > this.k) this.heap.shift();
        return this.heap[0];
    }
}`,
    hints: ["Min heap of size k", "Top is kth largest"],
    timeComplexity: "O(n log k)",
    spaceComplexity: "O(k)",
    leetcodeNumber: 703,
    orderIndex: 64
  },
  {
    id: "65",
    title: "Last Stone Weight",
    slug: "last-stone-weight",
    difficulty: "Easy",
    category: "Heap / Priority Queue",
    description: "Smash heaviest stones until at most one remains.",
    testCases: [
      { input: "stones = [2,7,4,1,8,1]", output: "1" }
    ],
    approach: "Use max heap. Pop two largest, push difference if any.",
    solutionCode: `function lastStoneWeight(stones: number[]): number {
    while (stones.length > 1) {
        stones.sort((a, b) => b - a);
        const y = stones.shift()!;
        const x = stones.shift()!;
        if (y !== x) stones.push(y - x);
    }
    return stones.length ? stones[0] : 0;
}`,
    hints: ["Max heap", "Smash two largest"],
    timeComplexity: "O(n² log n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 1046,
    orderIndex: 65
  },
  {
    id: "66",
    title: "K Closest Points to Origin",
    slug: "k-closest-points-to-origin",
    difficulty: "Medium",
    category: "Heap / Priority Queue",
    description: "Find k closest points to origin.",
    testCases: [
      { input: "points = [[1,3],[-2,2]], k = 1", output: "[[-2,2]]" }
    ],
    approach: "Use max heap of size k based on distance.",
    solutionCode: `function kClosest(points: number[][], k: number): number[][] {
    return points
        .sort((a, b) => (a[0]*a[0] + a[1]*a[1]) - (b[0]*b[0] + b[1]*b[1]))
        .slice(0, k);
}`,
    hints: ["Compare distances", "Max heap of size k"],
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 973,
    orderIndex: 66
  },
  {
    id: "67",
    title: "Kth Largest Element in an Array",
    slug: "kth-largest-element-in-array",
    difficulty: "Medium",
    category: "Heap / Priority Queue",
    description: "Find the kth largest element.",
    testCases: [
      { input: "nums = [3,2,1,5,6,4], k = 2", output: "5" }
    ],
    approach: "Use min heap of size k or quickselect.",
    solutionCode: `function findKthLargest(nums: number[], k: number): number {
    const heap: number[] = [];
    for (const n of nums) {
        heap.push(n);
        heap.sort((a, b) => a - b);
        if (heap.length > k) heap.shift();
    }
    return heap[0];
}`,
    hints: ["Min heap of size k", "Or quickselect O(n) avg"],
    timeComplexity: "O(n log k)",
    spaceComplexity: "O(k)",
    leetcodeNumber: 215,
    orderIndex: 67
  },
  {
    id: "68",
    title: "Task Scheduler",
    slug: "task-scheduler",
    difficulty: "Medium",
    category: "Heap / Priority Queue",
    description: "Find minimum intervals to complete all tasks with cooldown n.",
    testCases: [
      { input: 'tasks = ["A","A","A","B","B","B"], n = 2', output: "8" }
    ],
    approach: "Use max heap for frequencies. Process most frequent first, track cooldowns.",
    solutionCode: `function leastInterval(tasks: string[], n: number): number {
    const freq = new Map<string, number>();
    for (const t of tasks) freq.set(t, (freq.get(t) || 0) + 1);
    const counts = [...freq.values()].sort((a, b) => b - a);
    const maxFreq = counts[0];
    const maxCount = counts.filter(c => c === maxFreq).length;
    const intervals = (maxFreq - 1) * (n + 1) + maxCount;
    return Math.max(intervals, tasks.length);
}`,
    hints: ["Most frequent task determines structure", "Fill gaps with other tasks"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 621,
    orderIndex: 68
  },
  {
    id: "69",
    title: "Design Twitter",
    slug: "design-twitter",
    difficulty: "Medium",
    category: "Heap / Priority Queue",
    description: "Design a simplified Twitter with follow, post, and getNewsFeed.",
    testCases: [
      { input: "postTweet(1, 5), getNewsFeed(1)", output: "[5]" }
    ],
    approach: "Use maps for tweets and follows. Merge k sorted lists for feed.",
    solutionCode: `class Twitter {
    private tweets = new Map<number, [number, number][]>();
    private follows = new Map<number, Set<number>>();
    private time = 0;
    
    postTweet(userId: number, tweetId: number): void {
        if (!this.tweets.has(userId)) this.tweets.set(userId, []);
        this.tweets.get(userId)!.push([this.time++, tweetId]);
    }
    
    getNewsFeed(userId: number): number[] {
        const following = this.follows.get(userId) || new Set();
        following.add(userId);
        const all: [number, number][] = [];
        for (const id of following) {
            all.push(...(this.tweets.get(id) || []));
        }
        return all.sort((a, b) => b[0] - a[0]).slice(0, 10).map(t => t[1]);
    }
    
    follow(followerId: number, followeeId: number): void {
        if (!this.follows.has(followerId)) this.follows.set(followerId, new Set());
        this.follows.get(followerId)!.add(followeeId);
    }
    
    unfollow(followerId: number, followeeId: number): void {
        this.follows.get(followerId)?.delete(followeeId);
    }
}`,
    hints: ["Track tweets with timestamps", "Merge feeds from followed users"],
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 355,
    orderIndex: 69
  },
  {
    id: "70",
    title: "Find Median from Data Stream",
    slug: "find-median-from-data-stream",
    difficulty: "Hard",
    category: "Heap / Priority Queue",
    description: "Find median of a data stream efficiently.",
    testCases: [
      { input: "addNum(1), addNum(2), findMedian(), addNum(3), findMedian()", output: "1.5, 2.0" }
    ],
    approach: "Use two heaps: max heap for lower half, min heap for upper half.",
    solutionCode: `class MedianFinder {
    private small: number[] = []; // max heap (negated)
    private large: number[] = []; // min heap
    
    addNum(num: number): void {
        this.small.push(-num);
        this.small.sort((a, b) => a - b);
        this.large.push(-this.small.shift()!);
        this.large.sort((a, b) => a - b);
        if (this.large.length > this.small.length) {
            this.small.push(-this.large.shift()!);
            this.small.sort((a, b) => a - b);
        }
    }
    
    findMedian(): number {
        if (this.small.length > this.large.length) return -this.small[0];
        return (-this.small[0] + this.large[0]) / 2;
    }
}`,
    hints: ["Two heaps", "Balance sizes"],
    timeComplexity: "O(log n)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 295,
    orderIndex: 70
  },

  // ==================== BACKTRACKING (9 problems) ====================
  {
    id: "71",
    title: "Subsets",
    slug: "subsets",
    difficulty: "Medium",
    category: "Backtracking",
    description: "Generate all possible subsets of an array.",
    testCases: [
      { input: "nums = [1,2,3]", output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]" }
    ],
    approach: "Backtracking. At each element, choose to include or exclude.",
    solutionCode: `function subsets(nums: number[]): number[][] {
    const result: number[][] = [];
    function backtrack(start: number, curr: number[]) {
        result.push([...curr]);
        for (let i = start; i < nums.length; i++) {
            curr.push(nums[i]);
            backtrack(i + 1, curr);
            curr.pop();
        }
    }
    backtrack(0, []);
    return result;
}`,
    hints: ["Include or exclude each element", "Start from next index"],
    timeComplexity: "O(n * 2^n)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 78,
    orderIndex: 71
  },
  {
    id: "72",
    title: "Combination Sum",
    slug: "combination-sum",
    difficulty: "Medium",
    category: "Backtracking",
    description: "Find all combinations that sum to target. Numbers can be used unlimited times.",
    testCases: [
      { input: "candidates = [2,3,6,7], target = 7", output: "[[2,2,3],[7]]" }
    ],
    approach: "Backtracking. Include element (stay at index) or move to next.",
    solutionCode: `function combinationSum(candidates: number[], target: number): number[][] {
    const result: number[][] = [];
    function backtrack(start: number, curr: number[], sum: number) {
        if (sum === target) { result.push([...curr]); return; }
        if (sum > target) return;
        for (let i = start; i < candidates.length; i++) {
            curr.push(candidates[i]);
            backtrack(i, curr, sum + candidates[i]);
            curr.pop();
        }
    }
    backtrack(0, [], 0);
    return result;
}`,
    hints: ["Can reuse same element", "Track running sum"],
    timeComplexity: "O(n^(t/min))",
    spaceComplexity: "O(t/min)",
    leetcodeNumber: 39,
    orderIndex: 72
  },
  {
    id: "73",
    title: "Permutations",
    slug: "permutations",
    difficulty: "Medium",
    category: "Backtracking",
    description: "Generate all permutations of an array.",
    testCases: [
      { input: "nums = [1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" }
    ],
    approach: "Backtracking with used array to track which elements are included.",
    solutionCode: `function permute(nums: number[]): number[][] {
    const result: number[][] = [];
    const used = new Array(nums.length).fill(false);
    function backtrack(curr: number[]) {
        if (curr.length === nums.length) { result.push([...curr]); return; }
        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            curr.push(nums[i]);
            backtrack(curr);
            curr.pop();
            used[i] = false;
        }
    }
    backtrack([]);
    return result;
}`,
    hints: ["Track used elements", "Try all unused at each position"],
    timeComplexity: "O(n! * n)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 46,
    orderIndex: 73
  },
  {
    id: "74",
    title: "Subsets II",
    slug: "subsets-ii",
    difficulty: "Medium",
    category: "Backtracking",
    description: "Generate all unique subsets with duplicates in input.",
    testCases: [
      { input: "nums = [1,2,2]", output: "[[],[1],[1,2],[1,2,2],[2],[2,2]]" }
    ],
    approach: "Sort first. Skip duplicates at same level.",
    solutionCode: `function subsetsWithDup(nums: number[]): number[][] {
    nums.sort((a, b) => a - b);
    const result: number[][] = [];
    function backtrack(start: number, curr: number[]) {
        result.push([...curr]);
        for (let i = start; i < nums.length; i++) {
            if (i > start && nums[i] === nums[i - 1]) continue;
            curr.push(nums[i]);
            backtrack(i + 1, curr);
            curr.pop();
        }
    }
    backtrack(0, []);
    return result;
}`,
    hints: ["Sort to group duplicates", "Skip duplicates at same level"],
    timeComplexity: "O(n * 2^n)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 90,
    orderIndex: 74
  },
  {
    id: "75",
    title: "Combination Sum II",
    slug: "combination-sum-ii",
    difficulty: "Medium",
    category: "Backtracking",
    description: "Find unique combinations that sum to target. Each number used once.",
    testCases: [
      { input: "candidates = [10,1,2,7,6,1,5], target = 8", output: "[[1,1,6],[1,2,5],[1,7],[2,6]]" }
    ],
    approach: "Sort and skip duplicates. Move to next index after using.",
    solutionCode: `function combinationSum2(candidates: number[], target: number): number[][] {
    candidates.sort((a, b) => a - b);
    const result: number[][] = [];
    function backtrack(start: number, curr: number[], sum: number) {
        if (sum === target) { result.push([...curr]); return; }
        if (sum > target) return;
        for (let i = start; i < candidates.length; i++) {
            if (i > start && candidates[i] === candidates[i - 1]) continue;
            curr.push(candidates[i]);
            backtrack(i + 1, curr, sum + candidates[i]);
            curr.pop();
        }
    }
    backtrack(0, [], 0);
    return result;
}`,
    hints: ["Each element once", "Skip duplicates"],
    timeComplexity: "O(2^n)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 40,
    orderIndex: 75
  },
  {
    id: "76",
    title: "Word Search",
    slug: "word-search",
    difficulty: "Medium",
    category: "Backtracking",
    description: "Check if word exists in grid by moving adjacent cells.",
    testCases: [
      { input: 'board = [["A","B","C","E"],["S","F","C","S"]], word = "ABCCED"', output: "true" }
    ],
    approach: "DFS from each cell. Mark visited, backtrack.",
    solutionCode: `function exist(board: string[][], word: string): boolean {
    const m = board.length, n = board[0].length;
    function dfs(i: number, j: number, k: number): boolean {
        if (k === word.length) return true;
        if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== word[k]) return false;
        const temp = board[i][j];
        board[i][j] = '#';
        const found = dfs(i+1,j,k+1) || dfs(i-1,j,k+1) || dfs(i,j+1,k+1) || dfs(i,j-1,k+1);
        board[i][j] = temp;
        return found;
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (dfs(i, j, 0)) return true;
        }
    }
    return false;
}`,
    hints: ["DFS from each cell", "Mark visited, backtrack"],
    timeComplexity: "O(m*n*4^L)",
    spaceComplexity: "O(L)",
    leetcodeNumber: 79,
    orderIndex: 76
  },
  {
    id: "77",
    title: "Palindrome Partitioning",
    slug: "palindrome-partitioning",
    difficulty: "Medium",
    category: "Backtracking",
    description: "Partition string so each part is a palindrome.",
    testCases: [
      { input: 's = "aab"', output: '[["a","a","b"],["aa","b"]]' }
    ],
    approach: "Backtracking. At each position, try all palindrome prefixes.",
    solutionCode: `function partition(s: string): string[][] {
    const result: string[][] = [];
    function isPalindrome(str: string, l: number, r: number): boolean {
        while (l < r) if (str[l++] !== str[r--]) return false;
        return true;
    }
    function backtrack(start: number, curr: string[]) {
        if (start === s.length) { result.push([...curr]); return; }
        for (let end = start; end < s.length; end++) {
            if (isPalindrome(s, start, end)) {
                curr.push(s.slice(start, end + 1));
                backtrack(end + 1, curr);
                curr.pop();
            }
        }
    }
    backtrack(0, []);
    return result;
}`,
    hints: ["Try all palindrome prefixes", "Backtrack on valid partitions"],
    timeComplexity: "O(n * 2^n)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 131,
    orderIndex: 77
  },
  {
    id: "78",
    title: "Letter Combinations of a Phone Number",
    slug: "letter-combinations-of-phone-number",
    difficulty: "Medium",
    category: "Backtracking",
    description: "Return all letter combinations from phone digit mapping.",
    testCases: [
      { input: 'digits = "23"', output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]' }
    ],
    approach: "Backtracking over each digit's possible letters.",
    solutionCode: `function letterCombinations(digits: string): string[] {
    if (!digits) return [];
    const map: Record<string, string> = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    };
    const result: string[] = [];
    function backtrack(i: number, curr: string) {
        if (i === digits.length) { result.push(curr); return; }
        for (const c of map[digits[i]]) {
            backtrack(i + 1, curr + c);
        }
    }
    backtrack(0, '');
    return result;
}`,
    hints: ["Map digit to letters", "Backtrack through digits"],
    timeComplexity: "O(4^n)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 17,
    orderIndex: 78
  },
  {
    id: "79",
    title: "N-Queens",
    slug: "n-queens",
    difficulty: "Hard",
    category: "Backtracking",
    description: "Place n queens on n×n board so no two attack each other.",
    testCases: [
      { input: "n = 4", output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]' }
    ],
    approach: "Backtracking row by row. Track columns and diagonals.",
    solutionCode: `function solveNQueens(n: number): string[][] {
    const result: string[][] = [];
    const cols = new Set<number>();
    const diag1 = new Set<number>();
    const diag2 = new Set<number>();
    const board: string[][] = Array(n).fill(null).map(() => Array(n).fill('.'));
    
    function backtrack(row: number) {
        if (row === n) {
            result.push(board.map(r => r.join('')));
            return;
        }
        for (let col = 0; col < n; col++) {
            if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) continue;
            cols.add(col); diag1.add(row - col); diag2.add(row + col);
            board[row][col] = 'Q';
            backtrack(row + 1);
            board[row][col] = '.';
            cols.delete(col); diag1.delete(row - col); diag2.delete(row + col);
        }
    }
    backtrack(0);
    return result;
}`,
    hints: ["Track columns and diagonals", "Place row by row"],
    timeComplexity: "O(n!)",
    spaceComplexity: "O(n²)",
    leetcodeNumber: 51,
    orderIndex: 79
  },

  // ==================== GRAPHS (13 problems) ====================
  {
    id: "80",
    title: "Number of Islands",
    slug: "number-of-islands",
    difficulty: "Medium",
    category: "Graphs",
    description: "Count number of islands (connected 1s) in a grid.",
    testCases: [
      { input: 'grid = [["1","1","0","0"],["1","1","0","0"],["0","0","1","0"]]', output: "2" }
    ],
    approach: "DFS/BFS from each unvisited '1'. Mark visited. Count components.",
    solutionCode: `function numIslands(grid: string[][]): number {
    const m = grid.length, n = grid[0].length;
    let count = 0;
    function dfs(i: number, j: number) {
        if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] !== '1') return;
        grid[i][j] = '0';
        dfs(i+1, j); dfs(i-1, j); dfs(i, j+1); dfs(i, j-1);
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                count++;
                dfs(i, j);
            }
        }
    }
    return count;
}`,
    hints: ["DFS to mark connected land", "Count starting points"],
    timeComplexity: "O(m*n)",
    spaceComplexity: "O(m*n)",
    leetcodeNumber: 200,
    orderIndex: 80
  },
  {
    id: "81",
    title: "Clone Graph",
    slug: "clone-graph",
    difficulty: "Medium",
    category: "Graphs",
    description: "Deep clone a graph.",
    testCases: [
      { input: "adjList = [[2,4],[1,3],[2,4],[1,3]]", output: "[[2,4],[1,3],[2,4],[1,3]]" }
    ],
    approach: "DFS/BFS with hash map to track cloned nodes.",
    solutionCode: `function cloneGraph(node: Node | null): Node | null {
    if (!node) return null;
    const map = new Map<Node, Node>();
    function dfs(n: Node): Node {
        if (map.has(n)) return map.get(n)!;
        const clone = new Node(n.val);
        map.set(n, clone);
        for (const neighbor of n.neighbors) {
            clone.neighbors.push(dfs(neighbor));
        }
        return clone;
    }
    return dfs(node);
}`,
    hints: ["Map original to clone", "DFS to copy"],
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    leetcodeNumber: 133,
    orderIndex: 81
  },
  {
    id: "82",
    title: "Max Area of Island",
    slug: "max-area-of-island",
    difficulty: "Medium",
    category: "Graphs",
    description: "Find maximum area island in grid.",
    testCases: [
      { input: "grid = [[0,0,1,0],[0,1,1,0]]", output: "3" }
    ],
    approach: "DFS from each '1'. Count cells in each island. Track max.",
    solutionCode: `function maxAreaOfIsland(grid: number[][]): number {
    const m = grid.length, n = grid[0].length;
    let maxArea = 0;
    function dfs(i: number, j: number): number {
        if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] !== 1) return 0;
        grid[i][j] = 0;
        return 1 + dfs(i+1,j) + dfs(i-1,j) + dfs(i,j+1) + dfs(i,j-1);
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            maxArea = Math.max(maxArea, dfs(i, j));
        }
    }
    return maxArea;
}`,
    hints: ["DFS to count area", "Track maximum"],
    timeComplexity: "O(m*n)",
    spaceComplexity: "O(m*n)",
    leetcodeNumber: 695,
    orderIndex: 82
  },
  {
    id: "83",
    title: "Pacific Atlantic Water Flow",
    slug: "pacific-atlantic-water-flow",
    difficulty: "Medium",
    category: "Graphs",
    description: "Find cells where water can flow to both oceans.",
    testCases: [
      { input: "heights = [[1,2,2,3,5],[3,2,3,4,4]]", output: "[[0,4],[1,3],[1,4]]" }
    ],
    approach: "BFS/DFS from both oceans. Find intersection of reachable cells.",
    solutionCode: `function pacificAtlantic(heights: number[][]): number[][] {
    const m = heights.length, n = heights[0].length;
    const pacific = Array(m).fill(null).map(() => Array(n).fill(false));
    const atlantic = Array(m).fill(null).map(() => Array(n).fill(false));
    
    function dfs(i: number, j: number, reach: boolean[][], prev: number) {
        if (i < 0 || i >= m || j < 0 || j >= n || reach[i][j] || heights[i][j] < prev) return;
        reach[i][j] = true;
        dfs(i+1, j, reach, heights[i][j]);
        dfs(i-1, j, reach, heights[i][j]);
        dfs(i, j+1, reach, heights[i][j]);
        dfs(i, j-1, reach, heights[i][j]);
    }
    
    for (let i = 0; i < m; i++) { dfs(i, 0, pacific, 0); dfs(i, n-1, atlantic, 0); }
    for (let j = 0; j < n; j++) { dfs(0, j, pacific, 0); dfs(m-1, j, atlantic, 0); }
    
    const result: number[][] = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (pacific[i][j] && atlantic[i][j]) result.push([i, j]);
        }
    }
    return result;
}`,
    hints: ["DFS from both oceans", "Find intersection"],
    timeComplexity: "O(m*n)",
    spaceComplexity: "O(m*n)",
    leetcodeNumber: 417,
    orderIndex: 83
  },
  {
    id: "84",
    title: "Surrounded Regions",
    slug: "surrounded-regions",
    difficulty: "Medium",
    category: "Graphs",
    description: "Capture regions surrounded by X.",
    testCases: [
      { input: 'board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]', output: '[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]' }
    ],
    approach: "DFS from border Os to mark safe. Flip remaining Os.",
    solutionCode: `function solve(board: string[][]): void {
    const m = board.length, n = board[0].length;
    function dfs(i: number, j: number) {
        if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== 'O') return;
        board[i][j] = 'S';
        dfs(i+1,j); dfs(i-1,j); dfs(i,j+1); dfs(i,j-1);
    }
    for (let i = 0; i < m; i++) { dfs(i, 0); dfs(i, n-1); }
    for (let j = 0; j < n; j++) { dfs(0, j); dfs(m-1, j); }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === 'O') board[i][j] = 'X';
            else if (board[i][j] === 'S') board[i][j] = 'O';
        }
    }
}`,
    hints: ["Mark border-connected Os", "Flip remaining"],
    timeComplexity: "O(m*n)",
    spaceComplexity: "O(m*n)",
    leetcodeNumber: 130,
    orderIndex: 84
  },
  {
    id: "85",
    title: "Rotting Oranges",
    slug: "rotting-oranges",
    difficulty: "Medium",
    category: "Graphs",
    description: "Find minutes until all oranges are rotten.",
    testCases: [
      { input: "grid = [[2,1,1],[1,1,0],[0,1,1]]", output: "4" }
    ],
    approach: "Multi-source BFS from all rotten oranges. Count levels.",
    solutionCode: `function orangesRotting(grid: number[][]): number {
    const m = grid.length, n = grid[0].length;
    const queue: [number, number][] = [];
    let fresh = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 2) queue.push([i, j]);
            else if (grid[i][j] === 1) fresh++;
        }
    }
    if (fresh === 0) return 0;
    let minutes = -1;
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    while (queue.length) {
        minutes++;
        const size = queue.length;
        for (let i = 0; i < size; i++) {
            const [r, c] = queue.shift()!;
            for (const [dr, dc] of dirs) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === 1) {
                    grid[nr][nc] = 2;
                    fresh--;
                    queue.push([nr, nc]);
                }
            }
        }
    }
    return fresh === 0 ? minutes : -1;
}`,
    hints: ["Multi-source BFS", "Track fresh count"],
    timeComplexity: "O(m*n)",
    spaceComplexity: "O(m*n)",
    leetcodeNumber: 994,
    orderIndex: 85
  },
  {
    id: "86",
    title: "Walls and Gates",
    slug: "walls-and-gates",
    difficulty: "Medium",
    category: "Graphs",
    description: "Fill empty rooms with distance to nearest gate.",
    testCases: [
      { input: "rooms = [[INF,-1,0,INF],[INF,INF,INF,-1]]", output: "[[3,-1,0,1],[2,2,1,-1]]" }
    ],
    approach: "Multi-source BFS from all gates.",
    solutionCode: `function wallsAndGates(rooms: number[][]): void {
    const m = rooms.length, n = rooms[0].length;
    const INF = 2147483647;
    const queue: [number, number][] = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (rooms[i][j] === 0) queue.push([i, j]);
        }
    }
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    while (queue.length) {
        const [r, c] = queue.shift()!;
        for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && rooms[nr][nc] === INF) {
                rooms[nr][nc] = rooms[r][c] + 1;
                queue.push([nr, nc]);
            }
        }
    }
}`,
    hints: ["Multi-source BFS from gates", "Propagate distances"],
    timeComplexity: "O(m*n)",
    spaceComplexity: "O(m*n)",
    leetcodeNumber: 286,
    orderIndex: 86
  },
  {
    id: "87",
    title: "Course Schedule",
    slug: "course-schedule",
    difficulty: "Medium",
    category: "Graphs",
    description: "Check if all courses can be finished (no cycle in prerequisites).",
    testCases: [
      { input: "numCourses = 2, prerequisites = [[1,0]]", output: "true" },
      { input: "numCourses = 2, prerequisites = [[1,0],[0,1]]", output: "false" }
    ],
    approach: "Topological sort. DFS to detect cycle.",
    solutionCode: `function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    const graph = new Map<number, number[]>();
    for (const [a, b] of prerequisites) {
        if (!graph.has(b)) graph.set(b, []);
        graph.get(b)!.push(a);
    }
    const visited = new Set<number>();
    const path = new Set<number>();
    
    function dfs(course: number): boolean {
        if (path.has(course)) return false;
        if (visited.has(course)) return true;
        path.add(course);
        for (const next of graph.get(course) || []) {
            if (!dfs(next)) return false;
        }
        path.delete(course);
        visited.add(course);
        return true;
    }
    
    for (let i = 0; i < numCourses; i++) {
        if (!dfs(i)) return false;
    }
    return true;
}`,
    hints: ["Detect cycle in directed graph", "DFS with path tracking"],
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V + E)",
    leetcodeNumber: 207,
    orderIndex: 87
  },
  {
    id: "88",
    title: "Course Schedule II",
    slug: "course-schedule-ii",
    difficulty: "Medium",
    category: "Graphs",
    description: "Return course order to finish all courses.",
    testCases: [
      { input: "numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]", output: "[0,1,2,3] or [0,2,1,3]" }
    ],
    approach: "Topological sort with DFS. Build order in reverse.",
    solutionCode: `function findOrder(numCourses: number, prerequisites: number[][]): number[] {
    const graph = new Map<number, number[]>();
    for (const [a, b] of prerequisites) {
        if (!graph.has(b)) graph.set(b, []);
        graph.get(b)!.push(a);
    }
    const visited = new Set<number>();
    const path = new Set<number>();
    const order: number[] = [];
    
    function dfs(course: number): boolean {
        if (path.has(course)) return false;
        if (visited.has(course)) return true;
        path.add(course);
        for (const next of graph.get(course) || []) {
            if (!dfs(next)) return false;
        }
        path.delete(course);
        visited.add(course);
        order.push(course);
        return true;
    }
    
    for (let i = 0; i < numCourses; i++) {
        if (!dfs(i)) return [];
    }
    return order.reverse();
}`,
    hints: ["Topological sort", "Build order after visiting all children"],
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V + E)",
    leetcodeNumber: 210,
    orderIndex: 88
  },
  {
    id: "89",
    title: "Redundant Connection",
    slug: "redundant-connection",
    difficulty: "Medium",
    category: "Graphs",
    description: "Find the edge that creates a cycle in a tree with one extra edge.",
    testCases: [
      { input: "edges = [[1,2],[1,3],[2,3]]", output: "[2,3]" }
    ],
    approach: "Union-Find. The edge that connects already-connected nodes is redundant.",
    solutionCode: `function findRedundantConnection(edges: number[][]): number[] {
    const n = edges.length;
    const parent = Array(n + 1).fill(0).map((_, i) => i);
    
    function find(x: number): number {
        if (parent[x] !== x) parent[x] = find(parent[x]);
        return parent[x];
    }
    
    for (const [a, b] of edges) {
        const pa = find(a), pb = find(b);
        if (pa === pb) return [a, b];
        parent[pa] = pb;
    }
    return [];
}`,
    hints: ["Union-Find", "Edge connecting same component"],
    timeComplexity: "O(n α(n))",
    spaceComplexity: "O(n)",
    leetcodeNumber: 684,
    orderIndex: 89
  },
  {
    id: "90",
    title: "Number of Connected Components in an Undirected Graph",
    slug: "number-of-connected-components",
    difficulty: "Medium",
    category: "Graphs",
    description: "Count connected components in undirected graph.",
    testCases: [
      { input: "n = 5, edges = [[0,1],[1,2],[3,4]]", output: "2" }
    ],
    approach: "Union-Find or DFS. Count number of unique roots.",
    solutionCode: `function countComponents(n: number, edges: number[][]): number {
    const parent = Array(n).fill(0).map((_, i) => i);
    
    function find(x: number): number {
        if (parent[x] !== x) parent[x] = find(parent[x]);
        return parent[x];
    }
    
    let count = n;
    for (const [a, b] of edges) {
        const pa = find(a), pb = find(b);
        if (pa !== pb) {
            parent[pa] = pb;
            count--;
        }
    }
    return count;
}`,
    hints: ["Union-Find", "Decrement count on each union"],
    timeComplexity: "O(n + e)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 323,
    orderIndex: 90
  },
  {
    id: "91",
    title: "Graph Valid Tree",
    slug: "graph-valid-tree",
    difficulty: "Medium",
    category: "Graphs",
    description: "Check if edges form a valid tree.",
    testCases: [
      { input: "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]", output: "true" }
    ],
    approach: "Tree = connected + no cycles. Check edges = n-1 and all connected.",
    solutionCode: `function validTree(n: number, edges: number[][]): boolean {
    if (edges.length !== n - 1) return false;
    const parent = Array(n).fill(0).map((_, i) => i);
    
    function find(x: number): number {
        if (parent[x] !== x) parent[x] = find(parent[x]);
        return parent[x];
    }
    
    for (const [a, b] of edges) {
        const pa = find(a), pb = find(b);
        if (pa === pb) return false;
        parent[pa] = pb;
    }
    return true;
}`,
    hints: ["Tree has n-1 edges", "No cycles"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 261,
    orderIndex: 91
  },
  {
    id: "92",
    title: "Word Ladder",
    slug: "word-ladder",
    difficulty: "Hard",
    category: "Graphs",
    description: "Find shortest transformation sequence from beginWord to endWord.",
    testCases: [
      { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', output: "5" }
    ],
    approach: "BFS. Build graph with pattern matching. Count levels.",
    solutionCode: `function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;
    
    const queue: [string, number][] = [[beginWord, 1]];
    const visited = new Set<string>([beginWord]);
    
    while (queue.length) {
        const [word, level] = queue.shift()!;
        if (word === endWord) return level;
        
        for (let i = 0; i < word.length; i++) {
            for (let c = 97; c <= 122; c++) {
                const next = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
                if (wordSet.has(next) && !visited.has(next)) {
                    visited.add(next);
                    queue.push([next, level + 1]);
                }
            }
        }
    }
    return 0;
}`,
    hints: ["BFS for shortest path", "Try all one-char changes"],
    timeComplexity: "O(n * m * 26)",
    spaceComplexity: "O(n * m)",
    leetcodeNumber: 127,
    orderIndex: 92
  },

  // ==================== ADVANCED GRAPHS (6 problems) ====================
  {
    id: "93",
    title: "Reconstruct Itinerary",
    slug: "reconstruct-itinerary",
    difficulty: "Hard",
    category: "Advanced Graphs",
    description: "Reconstruct itinerary from tickets in lexical order.",
    testCases: [
      { input: 'tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]', output: '["JFK","MUC","LHR","SFO","SJC"]' }
    ],
    approach: "Hierholzer's algorithm. DFS with sorted adjacency lists.",
    solutionCode: `function findItinerary(tickets: string[][]): string[] {
    const graph = new Map<string, string[]>();
    for (const [from, to] of tickets) {
        if (!graph.has(from)) graph.set(from, []);
        graph.get(from)!.push(to);
    }
    for (const [, dests] of graph) dests.sort().reverse();
    
    const result: string[] = [];
    function dfs(airport: string) {
        const dests = graph.get(airport) || [];
        while (dests.length) {
            dfs(dests.pop()!);
        }
        result.push(airport);
    }
    dfs('JFK');
    return result.reverse();
}`,
    hints: ["Eulerian path", "Process in reverse"],
    timeComplexity: "O(E log E)",
    spaceComplexity: "O(E)",
    leetcodeNumber: 332,
    orderIndex: 93
  },
  {
    id: "94",
    title: "Min Cost to Connect All Points",
    slug: "min-cost-to-connect-all-points",
    difficulty: "Medium",
    category: "Advanced Graphs",
    description: "Find minimum cost to connect all points with Manhattan distance.",
    testCases: [
      { input: "points = [[0,0],[2,2],[3,10],[5,2],[7,0]]", output: "20" }
    ],
    approach: "Prim's or Kruskal's algorithm for MST.",
    solutionCode: `function minCostConnectPoints(points: number[][]): number {
    const n = points.length;
    const dist = (i: number, j: number) => 
        Math.abs(points[i][0] - points[j][0]) + Math.abs(points[i][1] - points[j][1]);
    
    const visited = new Set<number>();
    const minDist = new Array(n).fill(Infinity);
    minDist[0] = 0;
    let totalCost = 0;
    
    for (let i = 0; i < n; i++) {
        let u = -1;
        for (let j = 0; j < n; j++) {
            if (!visited.has(j) && (u === -1 || minDist[j] < minDist[u])) u = j;
        }
        visited.add(u);
        totalCost += minDist[u];
        for (let v = 0; v < n; v++) {
            if (!visited.has(v)) {
                minDist[v] = Math.min(minDist[v], dist(u, v));
            }
        }
    }
    return totalCost;
}`,
    hints: ["Minimum spanning tree", "Prim's algorithm"],
    timeComplexity: "O(n²)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 1584,
    orderIndex: 94
  },
  {
    id: "95",
    title: "Network Delay Time",
    slug: "network-delay-time",
    difficulty: "Medium",
    category: "Advanced Graphs",
    description: "Find time for signal to reach all nodes.",
    testCases: [
      { input: "times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2", output: "2" }
    ],
    approach: "Dijkstra's algorithm from source k.",
    solutionCode: `function networkDelayTime(times: number[][], n: number, k: number): number {
    const graph = new Map<number, [number, number][]>();
    for (const [u, v, w] of times) {
        if (!graph.has(u)) graph.set(u, []);
        graph.get(u)!.push([v, w]);
    }
    
    const dist = new Array(n + 1).fill(Infinity);
    dist[k] = 0;
    const pq: [number, number][] = [[0, k]];
    
    while (pq.length) {
        pq.sort((a, b) => a[0] - b[0]);
        const [d, u] = pq.shift()!;
        if (d > dist[u]) continue;
        for (const [v, w] of graph.get(u) || []) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push([dist[v], v]);
            }
        }
    }
    
    const maxDist = Math.max(...dist.slice(1));
    return maxDist === Infinity ? -1 : maxDist;
}`,
    hints: ["Dijkstra's algorithm", "Return max distance"],
    timeComplexity: "O(E log V)",
    spaceComplexity: "O(V + E)",
    leetcodeNumber: 743,
    orderIndex: 95
  },
  {
    id: "96",
    title: "Swim in Rising Water",
    slug: "swim-in-rising-water",
    difficulty: "Hard",
    category: "Advanced Graphs",
    description: "Find minimum time to swim from top-left to bottom-right.",
    testCases: [
      { input: "grid = [[0,2],[1,3]]", output: "3" }
    ],
    approach: "Binary search on time + BFS, or Dijkstra.",
    solutionCode: `function swimInWater(grid: number[][]): number {
    const n = grid.length;
    const dist = Array(n).fill(null).map(() => Array(n).fill(Infinity));
    dist[0][0] = grid[0][0];
    const pq: [number, number, number][] = [[grid[0][0], 0, 0]];
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    
    while (pq.length) {
        pq.sort((a, b) => a[0] - b[0]);
        const [t, r, c] = pq.shift()!;
        if (r === n-1 && c === n-1) return t;
        for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
                const nt = Math.max(t, grid[nr][nc]);
                if (nt < dist[nr][nc]) {
                    dist[nr][nc] = nt;
                    pq.push([nt, nr, nc]);
                }
            }
        }
    }
    return -1;
}`,
    hints: ["Modified Dijkstra", "Max elevation on path"],
    timeComplexity: "O(n² log n)",
    spaceComplexity: "O(n²)",
    leetcodeNumber: 778,
    orderIndex: 96
  },
  {
    id: "97",
    title: "Alien Dictionary",
    slug: "alien-dictionary",
    difficulty: "Hard",
    category: "Advanced Graphs",
    description: "Derive alien alphabet order from sorted words.",
    testCases: [
      { input: 'words = ["wrt","wrf","er","ett","rftt"]', output: '"wertf"' }
    ],
    approach: "Build graph from word pairs. Topological sort.",
    solutionCode: `function alienOrder(words: string[]): string {
    const graph = new Map<string, Set<string>>();
    const inDegree = new Map<string, number>();
    
    for (const word of words) {
        for (const c of word) {
            if (!graph.has(c)) graph.set(c, new Set());
            if (!inDegree.has(c)) inDegree.set(c, 0);
        }
    }
    
    for (let i = 0; i < words.length - 1; i++) {
        const w1 = words[i], w2 = words[i + 1];
        if (w1.length > w2.length && w1.startsWith(w2)) return "";
        for (let j = 0; j < Math.min(w1.length, w2.length); j++) {
            if (w1[j] !== w2[j]) {
                if (!graph.get(w1[j])!.has(w2[j])) {
                    graph.get(w1[j])!.add(w2[j]);
                    inDegree.set(w2[j], inDegree.get(w2[j])! + 1);
                }
                break;
            }
        }
    }
    
    const queue = [...inDegree.keys()].filter(c => inDegree.get(c) === 0);
    const result: string[] = [];
    while (queue.length) {
        const c = queue.shift()!;
        result.push(c);
        for (const next of graph.get(c)!) {
            inDegree.set(next, inDegree.get(next)! - 1);
            if (inDegree.get(next) === 0) queue.push(next);
        }
    }
    return result.length === inDegree.size ? result.join('') : "";
}`,
    hints: ["Compare adjacent words", "Topological sort"],
    timeComplexity: "O(C)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 269,
    orderIndex: 97
  },
  {
    id: "98",
    title: "Cheapest Flights Within K Stops",
    slug: "cheapest-flights-within-k-stops",
    difficulty: "Medium",
    category: "Advanced Graphs",
    description: "Find cheapest flight with at most k stops.",
    testCases: [
      { input: "n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1", output: "200" }
    ],
    approach: "Bellman-Ford with k+1 iterations or BFS with level tracking.",
    solutionCode: `function findCheapestPrice(n: number, flights: number[][], src: number, dst: number, k: number): number {
    let prices = new Array(n).fill(Infinity);
    prices[src] = 0;
    
    for (let i = 0; i <= k; i++) {
        const temp = [...prices];
        for (const [from, to, price] of flights) {
            if (prices[from] !== Infinity) {
                temp[to] = Math.min(temp[to], prices[from] + price);
            }
        }
        prices = temp;
    }
    return prices[dst] === Infinity ? -1 : prices[dst];
}`,
    hints: ["Bellman-Ford with limited iterations", "k+1 edges"],
    timeComplexity: "O(k * E)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 787,
    orderIndex: 98
  },

  // ==================== 1-D DYNAMIC PROGRAMMING (12 problems) ====================
  {
    id: "99",
    title: "Climbing Stairs",
    slug: "climbing-stairs",
    difficulty: "Easy",
    category: "1-D Dynamic Programming",
    description: "Count ways to climb n stairs taking 1 or 2 steps.",
    testCases: [
      { input: "n = 2", output: "2" },
      { input: "n = 3", output: "3" }
    ],
    approach: "Fibonacci pattern. dp[i] = dp[i-1] + dp[i-2].",
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
    hints: ["Fibonacci pattern", "Only need last two values"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 70,
    orderIndex: 99
  },
  {
    id: "100",
    title: "Min Cost Climbing Stairs",
    slug: "min-cost-climbing-stairs",
    difficulty: "Easy",
    category: "1-D Dynamic Programming",
    description: "Find minimum cost to reach top of stairs.",
    testCases: [
      { input: "cost = [10,15,20]", output: "15" }
    ],
    approach: "dp[i] = cost[i] + min(dp[i-1], dp[i-2]).",
    solutionCode: `function minCostClimbingStairs(cost: number[]): number {
    let prev2 = cost[0], prev1 = cost[1];
    for (let i = 2; i < cost.length; i++) {
        const curr = cost[i] + Math.min(prev1, prev2);
        prev2 = prev1;
        prev1 = curr;
    }
    return Math.min(prev1, prev2);
}`,
    hints: ["Can start from 0 or 1", "Min of last two steps"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 746,
    orderIndex: 100
  },
  {
    id: "101",
    title: "House Robber",
    slug: "house-robber",
    difficulty: "Medium",
    category: "1-D Dynamic Programming",
    description: "Max robbery without adjacent houses.",
    testCases: [
      { input: "nums = [1,2,3,1]", output: "4" }
    ],
    approach: "dp[i] = max(dp[i-2] + nums[i], dp[i-1]).",
    solutionCode: `function rob(nums: number[]): number {
    let prev2 = 0, prev1 = 0;
    for (const num of nums) {
        const curr = Math.max(prev2 + num, prev1);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`,
    hints: ["Rob or skip each house", "Track max with/without current"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 198,
    orderIndex: 101
  },
  {
    id: "102",
    title: "House Robber II",
    slug: "house-robber-ii",
    difficulty: "Medium",
    category: "1-D Dynamic Programming",
    description: "House robber with circular houses.",
    testCases: [
      { input: "nums = [2,3,2]", output: "3" }
    ],
    approach: "Run House Robber twice: exclude first or exclude last.",
    solutionCode: `function rob(nums: number[]): number {
    if (nums.length === 1) return nums[0];
    
    function robRange(start: number, end: number): number {
        let prev2 = 0, prev1 = 0;
        for (let i = start; i <= end; i++) {
            const curr = Math.max(prev2 + nums[i], prev1);
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
    
    return Math.max(robRange(0, nums.length - 2), robRange(1, nums.length - 1));
}`,
    hints: ["Can't rob both first and last", "Two separate problems"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 213,
    orderIndex: 102
  },
  {
    id: "103",
    title: "Longest Palindromic Substring",
    slug: "longest-palindromic-substring",
    difficulty: "Medium",
    category: "1-D Dynamic Programming",
    description: "Find longest palindrome substring.",
    testCases: [
      { input: 's = "babad"', output: '"bab" or "aba"' }
    ],
    approach: "Expand around center for each position.",
    solutionCode: `function longestPalindrome(s: string): string {
    let start = 0, maxLen = 0;
    
    function expand(l: number, r: number) {
        while (l >= 0 && r < s.length && s[l] === s[r]) {
            if (r - l + 1 > maxLen) {
                start = l;
                maxLen = r - l + 1;
            }
            l--; r++;
        }
    }
    
    for (let i = 0; i < s.length; i++) {
        expand(i, i);
        expand(i, i + 1);
    }
    return s.slice(start, start + maxLen);
}`,
    hints: ["Expand from center", "Try odd and even lengths"],
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 5,
    orderIndex: 103
  },
  {
    id: "104",
    title: "Palindromic Substrings",
    slug: "palindromic-substrings",
    difficulty: "Medium",
    category: "1-D Dynamic Programming",
    description: "Count all palindromic substrings.",
    testCases: [
      { input: 's = "abc"', output: "3" },
      { input: 's = "aaa"', output: "6" }
    ],
    approach: "Expand around center, count all palindromes found.",
    solutionCode: `function countSubstrings(s: string): number {
    let count = 0;
    
    function expand(l: number, r: number) {
        while (l >= 0 && r < s.length && s[l] === s[r]) {
            count++;
            l--; r++;
        }
    }
    
    for (let i = 0; i < s.length; i++) {
        expand(i, i);
        expand(i, i + 1);
    }
    return count;
}`,
    hints: ["Expand from center", "Count all palindromes"],
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 647,
    orderIndex: 104
  },
  {
    id: "105",
    title: "Decode Ways",
    slug: "decode-ways",
    difficulty: "Medium",
    category: "1-D Dynamic Programming",
    description: "Count ways to decode a number string.",
    testCases: [
      { input: 's = "12"', output: "2" },
      { input: 's = "226"', output: "3" }
    ],
    approach: "dp[i] = dp[i-1] (if valid single) + dp[i-2] (if valid double).",
    solutionCode: `function numDecodings(s: string): number {
    if (s[0] === '0') return 0;
    let prev2 = 1, prev1 = 1;
    
    for (let i = 1; i < s.length; i++) {
        let curr = 0;
        if (s[i] !== '0') curr = prev1;
        const two = parseInt(s.slice(i-1, i+1));
        if (two >= 10 && two <= 26) curr += prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`,
    hints: ["Single digit: 1-9", "Double digit: 10-26"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 91,
    orderIndex: 105
  },
  {
    id: "106",
    title: "Coin Change",
    slug: "coin-change",
    difficulty: "Medium",
    category: "1-D Dynamic Programming",
    description: "Find minimum coins to make amount.",
    testCases: [
      { input: "coins = [1,2,5], amount = 11", output: "3" }
    ],
    approach: "dp[i] = min(dp[i - coin] + 1) for all coins.",
    solutionCode: `function coinChange(coins: number[], amount: number): number {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
}`,
    hints: ["Build up from 0", "Try all coins"],
    timeComplexity: "O(amount * n)",
    spaceComplexity: "O(amount)",
    leetcodeNumber: 322,
    orderIndex: 106
  },
  {
    id: "107",
    title: "Maximum Product Subarray",
    slug: "maximum-product-subarray",
    difficulty: "Medium",
    category: "1-D Dynamic Programming",
    description: "Find contiguous subarray with largest product.",
    testCases: [
      { input: "nums = [2,3,-2,4]", output: "6" }
    ],
    approach: "Track both max and min products (negatives can flip).",
    solutionCode: `function maxProduct(nums: number[]): number {
    let maxProd = nums[0], minProd = nums[0], result = nums[0];
    for (let i = 1; i < nums.length; i++) {
        const temp = maxProd;
        maxProd = Math.max(nums[i], maxProd * nums[i], minProd * nums[i]);
        minProd = Math.min(nums[i], temp * nums[i], minProd * nums[i]);
        result = Math.max(result, maxProd);
    }
    return result;
}`,
    hints: ["Negative * negative = positive", "Track min and max"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 152,
    orderIndex: 107
  },
  {
    id: "108",
    title: "Word Break",
    slug: "word-break",
    difficulty: "Medium",
    category: "1-D Dynamic Programming",
    description: "Check if string can be segmented into dictionary words.",
    testCases: [
      { input: 's = "leetcode", wordDict = ["leet","code"]', output: "true" }
    ],
    approach: "dp[i] = true if s[0:i] can be segmented.",
    solutionCode: `function wordBreak(s: string, wordDict: string[]): boolean {
    const words = new Set(wordDict);
    const dp = new Array(s.length + 1).fill(false);
    dp[0] = true;
    
    for (let i = 1; i <= s.length; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && words.has(s.slice(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[s.length];
}`,
    hints: ["Try all break points", "Check if prefix valid and suffix is word"],
    timeComplexity: "O(n² * m)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 139,
    orderIndex: 108
  },
  {
    id: "109",
    title: "Longest Increasing Subsequence",
    slug: "longest-increasing-subsequence",
    difficulty: "Medium",
    category: "1-D Dynamic Programming",
    description: "Find length of longest strictly increasing subsequence.",
    testCases: [
      { input: "nums = [10,9,2,5,3,7,101,18]", output: "4" }
    ],
    approach: "dp[i] = max(dp[j] + 1) for all j < i where nums[j] < nums[i].",
    solutionCode: `function lengthOfLIS(nums: number[]): number {
    const tails: number[] = [];
    for (const num of nums) {
        let left = 0, right = tails.length;
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] < num) left = mid + 1;
            else right = mid;
        }
        if (left === tails.length) tails.push(num);
        else tails[left] = num;
    }
    return tails.length;
}`,
    hints: ["Binary search O(n log n)", "Maintain smallest tails"],
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 300,
    orderIndex: 109
  },
  {
    id: "110",
    title: "Partition Equal Subset Sum",
    slug: "partition-equal-subset-sum",
    difficulty: "Medium",
    category: "1-D Dynamic Programming",
    description: "Check if array can be partitioned into two equal sum subsets.",
    testCases: [
      { input: "nums = [1,5,11,5]", output: "true" }
    ],
    approach: "Subset sum problem. Target = total / 2.",
    solutionCode: `function canPartition(nums: number[]): boolean {
    const total = nums.reduce((a, b) => a + b, 0);
    if (total % 2 !== 0) return false;
    const target = total / 2;
    const dp = new Set<number>([0]);
    
    for (const num of nums) {
        const newDp = new Set(dp);
        for (const sum of dp) {
            if (sum + num === target) return true;
            newDp.add(sum + num);
        }
        dp.clear();
        for (const s of newDp) dp.add(s);
    }
    return dp.has(target);
}`,
    hints: ["Sum must be even", "Find subset with sum = total/2"],
    timeComplexity: "O(n * sum)",
    spaceComplexity: "O(sum)",
    leetcodeNumber: 416,
    orderIndex: 110
  },

  // ==================== 2-D DYNAMIC PROGRAMMING (11 problems) ====================
  {
    id: "111",
    title: "Unique Paths",
    slug: "unique-paths",
    difficulty: "Medium",
    category: "2-D Dynamic Programming",
    description: "Count unique paths from top-left to bottom-right.",
    testCases: [
      { input: "m = 3, n = 7", output: "28" }
    ],
    approach: "dp[i][j] = dp[i-1][j] + dp[i][j-1].",
    solutionCode: `function uniquePaths(m: number, n: number): number {
    const dp = new Array(n).fill(1);
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[j] += dp[j - 1];
        }
    }
    return dp[n - 1];
}`,
    hints: ["Can only move right or down", "Sum of two ways"],
    timeComplexity: "O(m*n)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 62,
    orderIndex: 111
  },
  {
    id: "112",
    title: "Longest Common Subsequence",
    slug: "longest-common-subsequence",
    difficulty: "Medium",
    category: "2-D Dynamic Programming",
    description: "Find length of longest common subsequence.",
    testCases: [
      { input: 'text1 = "abcde", text2 = "ace"', output: "3" }
    ],
    approach: "dp[i][j] = dp[i-1][j-1] + 1 if match, else max(dp[i-1][j], dp[i][j-1]).",
    solutionCode: `function longestCommonSubsequence(text1: string, text2: string): number {
    const m = text1.length, n = text2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i-1] === text2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    return dp[m][n];
}`,
    hints: ["Match: extend LCS", "No match: take max"],
    timeComplexity: "O(m*n)",
    spaceComplexity: "O(m*n)",
    leetcodeNumber: 1143,
    orderIndex: 112
  },
  {
    id: "113",
    title: "Best Time to Buy and Sell Stock with Cooldown",
    slug: "best-time-to-buy-and-sell-stock-with-cooldown",
    difficulty: "Medium",
    category: "2-D Dynamic Programming",
    description: "Max profit with 1-day cooldown after selling.",
    testCases: [
      { input: "prices = [1,2,3,0,2]", output: "3" }
    ],
    approach: "State machine: hold, sold, rest. Transition between states.",
    solutionCode: `function maxProfit(prices: number[]): number {
    let hold = -Infinity, sold = 0, rest = 0;
    for (const price of prices) {
        const prevHold = hold;
        hold = Math.max(hold, rest - price);
        rest = Math.max(rest, sold);
        sold = prevHold + price;
    }
    return Math.max(sold, rest);
}`,
    hints: ["Three states: hold, sold, rest", "Transition rules"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 309,
    orderIndex: 113
  },
  {
    id: "114",
    title: "Coin Change II",
    slug: "coin-change-ii",
    difficulty: "Medium",
    category: "2-D Dynamic Programming",
    description: "Count ways to make amount with given coins.",
    testCases: [
      { input: "amount = 5, coins = [1,2,5]", output: "4" }
    ],
    approach: "dp[i] += dp[i - coin] for each coin.",
    solutionCode: `function change(amount: number, coins: number[]): number {
    const dp = new Array(amount + 1).fill(0);
    dp[0] = 1;
    for (const coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] += dp[i - coin];
        }
    }
    return dp[amount];
}`,
    hints: ["Count combinations not permutations", "Iterate coins first"],
    timeComplexity: "O(amount * n)",
    spaceComplexity: "O(amount)",
    leetcodeNumber: 518,
    orderIndex: 114
  },
  {
    id: "115",
    title: "Target Sum",
    slug: "target-sum",
    difficulty: "Medium",
    category: "2-D Dynamic Programming",
    description: "Count ways to assign +/- to reach target sum.",
    testCases: [
      { input: "nums = [1,1,1,1,1], target = 3", output: "5" }
    ],
    approach: "Convert to subset sum: find subset with sum = (total + target) / 2.",
    solutionCode: `function findTargetSumWays(nums: number[], target: number): number {
    const total = nums.reduce((a, b) => a + b, 0);
    if ((total + target) % 2 !== 0 || Math.abs(target) > total) return 0;
    const sum = (total + target) / 2;
    
    const dp = new Array(sum + 1).fill(0);
    dp[0] = 1;
    for (const num of nums) {
        for (let i = sum; i >= num; i--) {
            dp[i] += dp[i - num];
        }
    }
    return dp[sum];
}`,
    hints: ["P - N = target, P + N = total", "P = (total + target) / 2"],
    timeComplexity: "O(n * sum)",
    spaceComplexity: "O(sum)",
    leetcodeNumber: 494,
    orderIndex: 115
  },
  {
    id: "116",
    title: "Interleaving String",
    slug: "interleaving-string",
    difficulty: "Medium",
    category: "2-D Dynamic Programming",
    description: "Check if s3 is interleaving of s1 and s2.",
    testCases: [
      { input: 's1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"', output: "true" }
    ],
    approach: "dp[i][j] = true if s1[0:i] and s2[0:j] can form s3[0:i+j].",
    solutionCode: `function isInterleave(s1: string, s2: string, s3: string): boolean {
    const m = s1.length, n = s2.length;
    if (m + n !== s3.length) return false;
    
    const dp = Array(n + 1).fill(false);
    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            if (i === 0 && j === 0) dp[j] = true;
            else if (i === 0) dp[j] = dp[j-1] && s2[j-1] === s3[j-1];
            else if (j === 0) dp[j] = dp[j] && s1[i-1] === s3[i-1];
            else dp[j] = (dp[j] && s1[i-1] === s3[i+j-1]) || (dp[j-1] && s2[j-1] === s3[i+j-1]);
        }
    }
    return dp[n];
}`,
    hints: ["Match char from s1 or s2", "2D DP or 1D optimized"],
    timeComplexity: "O(m*n)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 97,
    orderIndex: 116
  },
  {
    id: "117",
    title: "Edit Distance",
    slug: "edit-distance",
    difficulty: "Medium",
    category: "2-D Dynamic Programming",
    description: "Find minimum operations to convert word1 to word2.",
    testCases: [
      { input: 'word1 = "horse", word2 = "ros"', output: "3" }
    ],
    approach: "dp[i][j] = min(insert, delete, replace) operations.",
    solutionCode: `function minDistance(word1: string, word2: string): number {
    const m = word1.length, n = word2.length;
    const dp = Array(m + 1).fill(null).map((_, i) => 
        Array(n + 1).fill(0).map((_, j) => i === 0 ? j : j === 0 ? i : 0)
    );
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i-1] === word2[j-1]) {
                dp[i][j] = dp[i-1][j-1];
            } else {
                dp[i][j] = 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
            }
        }
    }
    return dp[m][n];
}`,
    hints: ["Insert, delete, or replace", "Classic DP"],
    timeComplexity: "O(m*n)",
    spaceComplexity: "O(m*n)",
    leetcodeNumber: 72,
    orderIndex: 117
  },
  {
    id: "118",
    title: "Distinct Subsequences",
    slug: "distinct-subsequences",
    difficulty: "Hard",
    category: "2-D Dynamic Programming",
    description: "Count distinct subsequences of s that equal t.",
    testCases: [
      { input: 's = "rabbbit", t = "rabbit"', output: "3" }
    ],
    approach: "dp[i][j] = dp[i-1][j] + (match ? dp[i-1][j-1] : 0).",
    solutionCode: `function numDistinct(s: string, t: string): number {
    const m = s.length, n = t.length;
    const dp = Array(n + 1).fill(0);
    dp[0] = 1;
    
    for (let i = 1; i <= m; i++) {
        for (let j = n; j >= 1; j--) {
            if (s[i-1] === t[j-1]) {
                dp[j] += dp[j-1];
            }
        }
    }
    return dp[n];
}`,
    hints: ["Skip or match", "Count all ways"],
    timeComplexity: "O(m*n)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 115,
    orderIndex: 118
  },
  {
    id: "119",
    title: "Burst Balloons",
    slug: "burst-balloons",
    difficulty: "Hard",
    category: "2-D Dynamic Programming",
    description: "Find maximum coins from bursting all balloons.",
    testCases: [
      { input: "nums = [3,1,5,8]", output: "167" }
    ],
    approach: "Interval DP. dp[i][j] = max coins for bursting i to j. Last burst in range.",
    solutionCode: `function maxCoins(nums: number[]): number {
    const n = nums.length;
    const arr = [1, ...nums, 1];
    const dp = Array(n + 2).fill(null).map(() => Array(n + 2).fill(0));
    
    for (let len = 1; len <= n; len++) {
        for (let left = 1; left <= n - len + 1; left++) {
            const right = left + len - 1;
            for (let k = left; k <= right; k++) {
                dp[left][right] = Math.max(
                    dp[left][right],
                    dp[left][k-1] + arr[left-1] * arr[k] * arr[right+1] + dp[k+1][right]
                );
            }
        }
    }
    return dp[1][n];
}`,
    hints: ["Think of last burst, not first", "Interval DP"],
    timeComplexity: "O(n³)",
    spaceComplexity: "O(n²)",
    leetcodeNumber: 312,
    orderIndex: 119
  },
  {
    id: "120",
    title: "Regular Expression Matching",
    slug: "regular-expression-matching",
    difficulty: "Hard",
    category: "2-D Dynamic Programming",
    description: "Implement regex with . and *.",
    testCases: [
      { input: 's = "aa", p = "a*"', output: "true" }
    ],
    approach: "dp[i][j] = true if s[0:i] matches p[0:j].",
    solutionCode: `function isMatch(s: string, p: string): boolean {
    const m = s.length, n = p.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(false));
    dp[0][0] = true;
    
    for (let j = 2; j <= n; j++) {
        if (p[j-1] === '*') dp[0][j] = dp[0][j-2];
    }
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (p[j-1] === '*') {
                dp[i][j] = dp[i][j-2] || 
                    ((p[j-2] === '.' || p[j-2] === s[i-1]) && dp[i-1][j]);
            } else {
                dp[i][j] = (p[j-1] === '.' || p[j-1] === s[i-1]) && dp[i-1][j-1];
            }
        }
    }
    return dp[m][n];
}`,
    hints: [". matches any", "* can match 0 or more"],
    timeComplexity: "O(m*n)",
    spaceComplexity: "O(m*n)",
    leetcodeNumber: 10,
    orderIndex: 120
  },

  // ==================== GREEDY (8 problems) ====================
  {
    id: "121",
    title: "Maximum Subarray",
    slug: "maximum-subarray",
    difficulty: "Medium",
    category: "Greedy",
    description: "Find contiguous subarray with largest sum.",
    testCases: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6" }
    ],
    approach: "Kadane's algorithm. Track current sum, reset if negative.",
    solutionCode: `function maxSubArray(nums: number[]): number {
    let maxSum = nums[0], currSum = nums[0];
    for (let i = 1; i < nums.length; i++) {
        currSum = Math.max(nums[i], currSum + nums[i]);
        maxSum = Math.max(maxSum, currSum);
    }
    return maxSum;
}`,
    hints: ["Kadane's algorithm", "Reset if sum goes negative"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 53,
    orderIndex: 121
  },
  {
    id: "122",
    title: "Jump Game",
    slug: "jump-game",
    difficulty: "Medium",
    category: "Greedy",
    description: "Check if you can reach the last index.",
    testCases: [
      { input: "nums = [2,3,1,1,4]", output: "true" },
      { input: "nums = [3,2,1,0,4]", output: "false" }
    ],
    approach: "Track farthest reachable position. If current > farthest, fail.",
    solutionCode: `function canJump(nums: number[]): boolean {
    let maxReach = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i > maxReach) return false;
        maxReach = Math.max(maxReach, i + nums[i]);
    }
    return true;
}`,
    hints: ["Track max reachable", "Fail if current pos > max"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 55,
    orderIndex: 122
  },
  {
    id: "123",
    title: "Jump Game II",
    slug: "jump-game-ii",
    difficulty: "Medium",
    category: "Greedy",
    description: "Find minimum jumps to reach end.",
    testCases: [
      { input: "nums = [2,3,1,1,4]", output: "2" }
    ],
    approach: "BFS-like approach. Track current level end and farthest reach.",
    solutionCode: `function jump(nums: number[]): number {
    let jumps = 0, end = 0, farthest = 0;
    for (let i = 0; i < nums.length - 1; i++) {
        farthest = Math.max(farthest, i + nums[i]);
        if (i === end) {
            jumps++;
            end = farthest;
        }
    }
    return jumps;
}`,
    hints: ["Track current jump range", "Jump when reaching end of range"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 45,
    orderIndex: 123
  },
  {
    id: "124",
    title: "Gas Station",
    slug: "gas-station",
    difficulty: "Medium",
    category: "Greedy",
    description: "Find starting gas station for circular trip.",
    testCases: [
      { input: "gas = [1,2,3,4,5], cost = [3,4,5,1,2]", output: "3" }
    ],
    approach: "If total gas >= total cost, solution exists. Start from where tank doesn't go negative.",
    solutionCode: `function canCompleteCircuit(gas: number[], cost: number[]): number {
    let totalTank = 0, currTank = 0, start = 0;
    for (let i = 0; i < gas.length; i++) {
        totalTank += gas[i] - cost[i];
        currTank += gas[i] - cost[i];
        if (currTank < 0) {
            start = i + 1;
            currTank = 0;
        }
    }
    return totalTank >= 0 ? start : -1;
}`,
    hints: ["If total >= 0, solution exists", "Reset start when tank empty"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 134,
    orderIndex: 124
  },
  {
    id: "125",
    title: "Hand of Straights",
    slug: "hand-of-straights",
    difficulty: "Medium",
    category: "Greedy",
    description: "Check if hand can be rearranged into groups of consecutive cards.",
    testCases: [
      { input: "hand = [1,2,3,6,2,3,4,7,8], groupSize = 3", output: "true" }
    ],
    approach: "Sort and greedily form groups starting from smallest.",
    solutionCode: `function isNStraightHand(hand: number[], groupSize: number): boolean {
    if (hand.length % groupSize !== 0) return false;
    const count = new Map<number, number>();
    for (const card of hand) count.set(card, (count.get(card) || 0) + 1);
    
    const sorted = [...hand].sort((a, b) => a - b);
    for (const card of sorted) {
        if (count.get(card)! > 0) {
            for (let i = 0; i < groupSize; i++) {
                const curr = card + i;
                if ((count.get(curr) || 0) <= 0) return false;
                count.set(curr, count.get(curr)! - 1);
            }
        }
    }
    return true;
}`,
    hints: ["Sort and use greedy", "Start from smallest available"],
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 846,
    orderIndex: 125
  },
  {
    id: "126",
    title: "Merge Triplets to Form Target Triplet",
    slug: "merge-triplets-to-form-target",
    difficulty: "Medium",
    category: "Greedy",
    description: "Check if target triplet can be formed by merging triplets.",
    testCases: [
      { input: "triplets = [[2,5,3],[1,8,4],[1,7,5]], target = [2,7,5]", output: "true" }
    ],
    approach: "Only use triplets where no value exceeds target. Check if each target value reachable.",
    solutionCode: `function mergeTriplets(triplets: number[][], target: number[]): boolean {
    const good = new Set<number>();
    for (const [a, b, c] of triplets) {
        if (a <= target[0] && b <= target[1] && c <= target[2]) {
            if (a === target[0]) good.add(0);
            if (b === target[1]) good.add(1);
            if (c === target[2]) good.add(2);
        }
    }
    return good.size === 3;
}`,
    hints: ["Filter valid triplets", "Check if all targets reachable"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 1899,
    orderIndex: 126
  },
  {
    id: "127",
    title: "Partition Labels",
    slug: "partition-labels",
    difficulty: "Medium",
    category: "Greedy",
    description: "Partition string so each letter appears in at most one part.",
    testCases: [
      { input: 's = "ababcbacadefegdehijhklij"', output: "[9,7,8]" }
    ],
    approach: "Track last occurrence of each char. Extend partition to include all occurrences.",
    solutionCode: `function partitionLabels(s: string): number[] {
    const last = new Map<string, number>();
    for (let i = 0; i < s.length; i++) last.set(s[i], i);
    
    const result: number[] = [];
    let start = 0, end = 0;
    for (let i = 0; i < s.length; i++) {
        end = Math.max(end, last.get(s[i])!);
        if (i === end) {
            result.push(end - start + 1);
            start = i + 1;
        }
    }
    return result;
}`,
    hints: ["Track last occurrence", "Extend partition to cover all chars"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 763,
    orderIndex: 127
  },
  {
    id: "128",
    title: "Valid Parenthesis String",
    slug: "valid-parenthesis-string",
    difficulty: "Medium",
    category: "Greedy",
    description: "Check if string with (, ), and * is valid (* can be (, ), or empty).",
    testCases: [
      { input: 's = "(*))"', output: "true" }
    ],
    approach: "Track range of possible open counts. Valid if 0 is in range at end.",
    solutionCode: `function checkValidString(s: string): boolean {
    let low = 0, high = 0;
    for (const c of s) {
        if (c === '(') { low++; high++; }
        else if (c === ')') { low--; high--; }
        else { low--; high++; }
        if (high < 0) return false;
        low = Math.max(low, 0);
    }
    return low === 0;
}`,
    hints: ["Track min/max open count", "* can be any of three"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 678,
    orderIndex: 128
  },

  // ==================== INTERVALS (6 problems) ====================
  {
    id: "129",
    title: "Insert Interval",
    slug: "insert-interval",
    difficulty: "Medium",
    category: "Intervals",
    description: "Insert new interval into sorted intervals, merging if needed.",
    testCases: [
      { input: "intervals = [[1,3],[6,9]], newInterval = [2,5]", output: "[[1,5],[6,9]]" }
    ],
    approach: "Add non-overlapping before, merge overlapping, add remaining.",
    solutionCode: `function insert(intervals: number[][], newInterval: number[]): number[][] {
    const result: number[][] = [];
    let i = 0;
    
    while (i < intervals.length && intervals[i][1] < newInterval[0]) {
        result.push(intervals[i++]);
    }
    while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    result.push(newInterval);
    while (i < intervals.length) {
        result.push(intervals[i++]);
    }
    return result;
}`,
    hints: ["Three phases: before, merge, after", "Merge overlapping"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 57,
    orderIndex: 129
  },
  {
    id: "130",
    title: "Merge Intervals",
    slug: "merge-intervals",
    difficulty: "Medium",
    category: "Intervals",
    description: "Merge overlapping intervals.",
    testCases: [
      { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" }
    ],
    approach: "Sort by start. Merge if overlap with last result interval.",
    solutionCode: `function merge(intervals: number[][]): number[][] {
    intervals.sort((a, b) => a[0] - b[0]);
    const result: number[][] = [intervals[0]];
    
    for (let i = 1; i < intervals.length; i++) {
        const last = result[result.length - 1];
        if (intervals[i][0] <= last[1]) {
            last[1] = Math.max(last[1], intervals[i][1]);
        } else {
            result.push(intervals[i]);
        }
    }
    return result;
}`,
    hints: ["Sort by start", "Merge if overlapping"],
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 56,
    orderIndex: 130
  },
  {
    id: "131",
    title: "Non-overlapping Intervals",
    slug: "non-overlapping-intervals",
    difficulty: "Medium",
    category: "Intervals",
    description: "Find minimum intervals to remove for non-overlap.",
    testCases: [
      { input: "intervals = [[1,2],[2,3],[3,4],[1,3]]", output: "1" }
    ],
    approach: "Sort by end. Keep non-overlapping. Count removals.",
    solutionCode: `function eraseOverlapIntervals(intervals: number[][]): number {
    intervals.sort((a, b) => a[1] - b[1]);
    let count = 0, end = -Infinity;
    
    for (const [s, e] of intervals) {
        if (s >= end) {
            end = e;
        } else {
            count++;
        }
    }
    return count;
}`,
    hints: ["Sort by end time", "Greedy: keep earliest ending"],
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 435,
    orderIndex: 131
  },
  {
    id: "132",
    title: "Meeting Rooms",
    slug: "meeting-rooms",
    difficulty: "Easy",
    category: "Intervals",
    description: "Check if one person can attend all meetings.",
    testCases: [
      { input: "intervals = [[0,30],[5,10],[15,20]]", output: "false" }
    ],
    approach: "Sort by start. Check if any overlap.",
    solutionCode: `function canAttendMeetings(intervals: number[][]): boolean {
    intervals.sort((a, b) => a[0] - b[0]);
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < intervals[i-1][1]) return false;
    }
    return true;
}`,
    hints: ["Sort by start", "Check consecutive overlap"],
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 252,
    orderIndex: 132
  },
  {
    id: "133",
    title: "Meeting Rooms II",
    slug: "meeting-rooms-ii",
    difficulty: "Medium",
    category: "Intervals",
    description: "Find minimum meeting rooms required.",
    testCases: [
      { input: "intervals = [[0,30],[5,10],[15,20]]", output: "2" }
    ],
    approach: "Sort starts and ends. Track concurrent meetings.",
    solutionCode: `function minMeetingRooms(intervals: number[][]): number {
    const starts = intervals.map(i => i[0]).sort((a, b) => a - b);
    const ends = intervals.map(i => i[1]).sort((a, b) => a - b);
    
    let rooms = 0, endPtr = 0;
    for (const start of starts) {
        if (start < ends[endPtr]) {
            rooms++;
        } else {
            endPtr++;
        }
    }
    return rooms;
}`,
    hints: ["Track starts and ends separately", "Count concurrent meetings"],
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 253,
    orderIndex: 133
  },
  {
    id: "134",
    title: "Minimum Interval to Include Each Query",
    slug: "minimum-interval-to-include-each-query",
    difficulty: "Hard",
    category: "Intervals",
    description: "Find smallest interval containing each query.",
    testCases: [
      { input: "intervals = [[1,4],[2,4],[3,6],[4,4]], queries = [2,3,4,5]", output: "[3,3,1,4]" }
    ],
    approach: "Sort intervals and queries. Use min heap by interval size.",
    solutionCode: `function minInterval(intervals: number[][], queries: number[]): number[] {
    intervals.sort((a, b) => a[0] - b[0]);
    const sortedQueries = queries.map((q, i) => [q, i]).sort((a, b) => a[0] - b[0]);
    const result = new Array(queries.length).fill(-1);
    const heap: [number, number][] = [];
    let j = 0;
    
    for (const [q, idx] of sortedQueries) {
        while (j < intervals.length && intervals[j][0] <= q) {
            const [l, r] = intervals[j++];
            heap.push([r - l + 1, r]);
        }
        heap.sort((a, b) => a[0] - b[0]);
        while (heap.length && heap[0][1] < q) heap.shift();
        if (heap.length) result[idx] = heap[0][0];
    }
    return result;
}`,
    hints: ["Sort both by left endpoint", "Use min heap by size"],
    timeComplexity: "O((n+q) log n)",
    spaceComplexity: "O(n+q)",
    leetcodeNumber: 1851,
    orderIndex: 134
  },

  // ==================== MATH & GEOMETRY (8 problems) ====================
  {
    id: "135",
    title: "Rotate Image",
    slug: "rotate-image",
    difficulty: "Medium",
    category: "Math & Geometry",
    description: "Rotate matrix 90 degrees clockwise in-place.",
    testCases: [
      { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[[7,4,1],[8,5,2],[9,6,3]]" }
    ],
    approach: "Transpose then reverse each row.",
    solutionCode: `function rotate(matrix: number[][]): void {
    const n = matrix.length;
    // Transpose
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }
    // Reverse rows
    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
    }
}`,
    hints: ["Transpose + reverse", "In-place swaps"],
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 48,
    orderIndex: 135
  },
  {
    id: "136",
    title: "Spiral Matrix",
    slug: "spiral-matrix",
    difficulty: "Medium",
    category: "Math & Geometry",
    description: "Return elements in spiral order.",
    testCases: [
      { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[1,2,3,6,9,8,7,4,5]" }
    ],
    approach: "Track boundaries. Traverse right, down, left, up. Shrink boundaries.",
    solutionCode: `function spiralOrder(matrix: number[][]): number[] {
    const result: number[] = [];
    let top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;
    
    while (top <= bottom && left <= right) {
        for (let i = left; i <= right; i++) result.push(matrix[top][i]);
        top++;
        for (let i = top; i <= bottom; i++) result.push(matrix[i][right]);
        right--;
        if (top <= bottom) {
            for (let i = right; i >= left; i--) result.push(matrix[bottom][i]);
            bottom--;
        }
        if (left <= right) {
            for (let i = bottom; i >= top; i--) result.push(matrix[i][left]);
            left++;
        }
    }
    return result;
}`,
    hints: ["Track four boundaries", "Shrink after each direction"],
    timeComplexity: "O(m*n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 54,
    orderIndex: 136
  },
  {
    id: "137",
    title: "Set Matrix Zeroes",
    slug: "set-matrix-zeroes",
    difficulty: "Medium",
    category: "Math & Geometry",
    description: "Set entire row and column to 0 if element is 0.",
    testCases: [
      { input: "matrix = [[1,1,1],[1,0,1],[1,1,1]]", output: "[[1,0,1],[0,0,0],[1,0,1]]" }
    ],
    approach: "Use first row/column as markers. Handle them separately.",
    solutionCode: `function setZeroes(matrix: number[][]): void {
    const m = matrix.length, n = matrix[0].length;
    let firstRowZero = false, firstColZero = false;
    
    for (let j = 0; j < n; j++) if (matrix[0][j] === 0) firstRowZero = true;
    for (let i = 0; i < m; i++) if (matrix[i][0] === 0) firstColZero = true;
    
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][j] === 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }
    
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][0] === 0 || matrix[0][j] === 0) {
                matrix[i][j] = 0;
            }
        }
    }
    
    if (firstRowZero) for (let j = 0; j < n; j++) matrix[0][j] = 0;
    if (firstColZero) for (let i = 0; i < m; i++) matrix[i][0] = 0;
}`,
    hints: ["Use first row/col as markers", "Handle first row/col separately"],
    timeComplexity: "O(m*n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 73,
    orderIndex: 137
  },
  {
    id: "138",
    title: "Happy Number",
    slug: "happy-number",
    difficulty: "Easy",
    category: "Math & Geometry",
    description: "Check if number is happy (sum of squares of digits eventually reaches 1).",
    testCases: [
      { input: "n = 19", output: "true" },
      { input: "n = 2", output: "false" }
    ],
    approach: "Floyd's cycle detection. Fast and slow pointers.",
    solutionCode: `function isHappy(n: number): boolean {
    function sumSquares(num: number): number {
        let sum = 0;
        while (num > 0) {
            const d = num % 10;
            sum += d * d;
            num = Math.floor(num / 10);
        }
        return sum;
    }
    
    let slow = n, fast = n;
    do {
        slow = sumSquares(slow);
        fast = sumSquares(sumSquares(fast));
    } while (slow !== fast);
    
    return slow === 1;
}`,
    hints: ["Detect cycle", "Fast and slow pointers"],
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 202,
    orderIndex: 138
  },
  {
    id: "139",
    title: "Plus One",
    slug: "plus-one",
    difficulty: "Easy",
    category: "Math & Geometry",
    description: "Add one to number represented as array of digits.",
    testCases: [
      { input: "digits = [1,2,3]", output: "[1,2,4]" },
      { input: "digits = [9,9,9]", output: "[1,0,0,0]" }
    ],
    approach: "Add from right. Handle carry.",
    solutionCode: `function plusOne(digits: number[]): number[] {
    for (let i = digits.length - 1; i >= 0; i--) {
        if (digits[i] < 9) {
            digits[i]++;
            return digits;
        }
        digits[i] = 0;
    }
    return [1, ...digits];
}`,
    hints: ["Start from right", "Handle all 9s case"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 66,
    orderIndex: 139
  },
  {
    id: "140",
    title: "Pow(x, n)",
    slug: "pow-x-n",
    difficulty: "Medium",
    category: "Math & Geometry",
    description: "Implement power function.",
    testCases: [
      { input: "x = 2.0, n = 10", output: "1024.0" },
      { input: "x = 2.0, n = -2", output: "0.25" }
    ],
    approach: "Binary exponentiation. x^n = (x^(n/2))^2.",
    solutionCode: `function myPow(x: number, n: number): number {
    if (n === 0) return 1;
    if (n < 0) {
        x = 1 / x;
        n = -n;
    }
    let result = 1;
    while (n > 0) {
        if (n % 2 === 1) result *= x;
        x *= x;
        n = Math.floor(n / 2);
    }
    return result;
}`,
    hints: ["Binary exponentiation", "Handle negative n"],
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 50,
    orderIndex: 140
  },
  {
    id: "141",
    title: "Multiply Strings",
    slug: "multiply-strings",
    difficulty: "Medium",
    category: "Math & Geometry",
    description: "Multiply two numbers represented as strings.",
    testCases: [
      { input: 'num1 = "123", num2 = "456"', output: '"56088"' }
    ],
    approach: "Grade school multiplication. Result[i+j] += digit1 * digit2.",
    solutionCode: `function multiply(num1: string, num2: string): string {
    if (num1 === '0' || num2 === '0') return '0';
    const m = num1.length, n = num2.length;
    const result = new Array(m + n).fill(0);
    
    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            const mul = (num1.charCodeAt(i) - 48) * (num2.charCodeAt(j) - 48);
            const p1 = i + j, p2 = i + j + 1;
            const sum = mul + result[p2];
            result[p2] = sum % 10;
            result[p1] += Math.floor(sum / 10);
        }
    }
    
    let str = result.join('');
    while (str[0] === '0' && str.length > 1) str = str.slice(1);
    return str;
}`,
    hints: ["Position i*j goes to i+j+1", "Handle carry"],
    timeComplexity: "O(m*n)",
    spaceComplexity: "O(m+n)",
    leetcodeNumber: 43,
    orderIndex: 141
  },
  {
    id: "142",
    title: "Detect Squares",
    slug: "detect-squares",
    difficulty: "Medium",
    category: "Math & Geometry",
    description: "Design data structure to detect axis-aligned squares.",
    testCases: [
      { input: "add([3,10]), add([11,2]), add([3,2]), count([11,10])", output: "1" }
    ],
    approach: "Store point counts. For query, try all diagonal points.",
    solutionCode: `class DetectSquares {
    private points = new Map<string, number>();
    
    add(point: number[]): void {
        const key = point.join(',');
        this.points.set(key, (this.points.get(key) || 0) + 1);
    }
    
    count(point: number[]): number {
        const [px, py] = point;
        let result = 0;
        for (const [key, cnt] of this.points) {
            const [x, y] = key.split(',').map(Number);
            if (Math.abs(px - x) !== Math.abs(py - y) || x === px) continue;
            result += cnt * 
                (this.points.get([x, py].join(',')) || 0) * 
                (this.points.get([px, y].join(',')) || 0);
        }
        return result;
    }
}`,
    hints: ["Fix diagonal, find other two corners", "Count point frequencies"],
    timeComplexity: "O(n) count",
    spaceComplexity: "O(n)",
    leetcodeNumber: 2013,
    orderIndex: 142
  },

  // ==================== BIT MANIPULATION (7 problems) ====================
  {
    id: "143",
    title: "Single Number",
    slug: "single-number",
    difficulty: "Easy",
    category: "Bit Manipulation",
    description: "Find element that appears once (others appear twice).",
    testCases: [
      { input: "nums = [2,2,1]", output: "1" },
      { input: "nums = [4,1,2,1,2]", output: "4" }
    ],
    approach: "XOR all elements. Duplicates cancel out.",
    solutionCode: `function singleNumber(nums: number[]): number {
    return nums.reduce((a, b) => a ^ b, 0);
}`,
    hints: ["a XOR a = 0", "a XOR 0 = a"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 136,
    orderIndex: 143
  },
  {
    id: "144",
    title: "Number of 1 Bits",
    slug: "number-of-1-bits",
    difficulty: "Easy",
    category: "Bit Manipulation",
    description: "Count number of 1 bits in integer.",
    testCases: [
      { input: "n = 11", output: "3" }
    ],
    approach: "n & (n-1) removes rightmost 1 bit.",
    solutionCode: `function hammingWeight(n: number): number {
    let count = 0;
    while (n !== 0) {
        n &= (n - 1);
        count++;
    }
    return count;
}`,
    hints: ["n & (n-1) removes last 1", "Count iterations"],
    timeComplexity: "O(k)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 191,
    orderIndex: 144
  },
  {
    id: "145",
    title: "Counting Bits",
    slug: "counting-bits",
    difficulty: "Easy",
    category: "Bit Manipulation",
    description: "Count 1 bits for each number 0 to n.",
    testCases: [
      { input: "n = 5", output: "[0,1,1,2,1,2]" }
    ],
    approach: "dp[i] = dp[i >> 1] + (i & 1).",
    solutionCode: `function countBits(n: number): number[] {
    const result = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        result[i] = result[i >> 1] + (i & 1);
    }
    return result;
}`,
    hints: ["Use previous results", "i/2 + last bit"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 338,
    orderIndex: 145
  },
  {
    id: "146",
    title: "Reverse Bits",
    slug: "reverse-bits",
    difficulty: "Easy",
    category: "Bit Manipulation",
    description: "Reverse bits of a 32-bit unsigned integer.",
    testCases: [
      { input: "n = 43261596", output: "964176192" }
    ],
    approach: "Extract bits from right, build result from left.",
    solutionCode: `function reverseBits(n: number): number {
    let result = 0;
    for (let i = 0; i < 32; i++) {
        result = (result << 1) | (n & 1);
        n >>>= 1;
    }
    return result >>> 0;
}`,
    hints: ["Shift result left, add rightmost bit of n", "Use >>> for unsigned"],
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 190,
    orderIndex: 146
  },
  {
    id: "147",
    title: "Missing Number",
    slug: "missing-number",
    difficulty: "Easy",
    category: "Bit Manipulation",
    description: "Find missing number in [0, n].",
    testCases: [
      { input: "nums = [3,0,1]", output: "2" }
    ],
    approach: "XOR all indices and values. Missing number remains.",
    solutionCode: `function missingNumber(nums: number[]): number {
    let result = nums.length;
    for (let i = 0; i < nums.length; i++) {
        result ^= i ^ nums[i];
    }
    return result;
}`,
    hints: ["XOR cancels pairs", "Include n in initial"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 268,
    orderIndex: 147
  },
  {
    id: "148",
    title: "Sum of Two Integers",
    slug: "sum-of-two-integers",
    difficulty: "Medium",
    category: "Bit Manipulation",
    description: "Add two integers without + or -.",
    testCases: [
      { input: "a = 1, b = 2", output: "3" }
    ],
    approach: "XOR for sum without carry, AND + shift for carry. Repeat.",
    solutionCode: `function getSum(a: number, b: number): number {
    while (b !== 0) {
        const carry = (a & b) << 1;
        a = a ^ b;
        b = carry;
    }
    return a;
}`,
    hints: ["XOR = sum without carry", "AND << 1 = carry"],
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 371,
    orderIndex: 148
  },
  {
    id: "149",
    title: "Reverse Integer",
    slug: "reverse-integer",
    difficulty: "Medium",
    category: "Bit Manipulation",
    description: "Reverse digits of an integer. Return 0 on overflow.",
    testCases: [
      { input: "x = 123", output: "321" },
      { input: "x = -123", output: "-321" }
    ],
    approach: "Extract digits from right, build reversed number. Check overflow.",
    solutionCode: `function reverse(x: number): number {
    const MAX = 2147483647, MIN = -2147483648;
    let result = 0;
    while (x !== 0) {
        const digit = x % 10;
        x = Math.trunc(x / 10);
        if (result > MAX / 10 || (result === Math.floor(MAX / 10) && digit > 7)) return 0;
        if (result < MIN / 10 || (result === Math.ceil(MIN / 10) && digit < -8)) return 0;
        result = result * 10 + digit;
    }
    return result;
}`,
    hints: ["Check overflow before adding", "Handle negative"],
    timeComplexity: "O(log x)",
    spaceComplexity: "O(1)",
    leetcodeNumber: 7,
    orderIndex: 149
  },
  {
    id: "150",
    title: "Unique Binary Search Trees",
    slug: "unique-binary-search-trees",
    difficulty: "Medium",
    category: "1-D Dynamic Programming",
    description: "Count structurally unique BSTs that store values 1 to n.",
    testCases: [
      { input: "n = 3", output: "5" },
      { input: "n = 1", output: "1" }
    ],
    approach: "Catalan number. dp[n] = sum(dp[i-1] * dp[n-i]) for i = 1 to n.",
    solutionCode: `function numTrees(n: number): number {
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;
    dp[1] = 1;
    
    for (let i = 2; i <= n; i++) {
        for (let j = 1; j <= i; j++) {
            dp[i] += dp[j - 1] * dp[i - j];
        }
    }
    return dp[n];
}`,
    hints: ["Each number as root", "Left subtree * right subtree"],
    timeComplexity: "O(n²)",
    spaceComplexity: "O(n)",
    leetcodeNumber: 96,
    orderIndex: 150
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
