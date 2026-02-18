// NeetCode 150 Problems Data - Complete Set (C++ Solutions)
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
    approach: "Use an unordered_set to track seen numbers. For each number, check if it exists in the set. If yes, return true. Otherwise, insert it.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

bool containsDuplicate(vector<int>& nums) {
    unordered_set<int> seen;
    for (int num : nums) {
        if (seen.count(num)) return true;
        seen.insert(num);
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
    approach: "Count character frequencies using an array of size 26. Increment for s, decrement for t. Check all counts are zero.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

bool isAnagram(string s, string t) {
    if (s.size() != t.size()) return false;
    int count[26] = {};
    for (int i = 0; i < s.size(); i++) {
        count[s[i] - 'a']++;
        count[t[i] - 'a']--;
    }
    for (int c : count)
        if (c != 0) return false;
    return true;
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> mp;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (mp.count(complement))
            return {mp[complement], i};
        mp[nums[i]] = i;
    }
    return {};
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<vector<string>> groupAnagrams(vector<string>& strs) {
    unordered_map<string, vector<string>> mp;
    for (auto& s : strs) {
        string key = s;
        sort(key.begin(), key.end());
        mp[key].push_back(s);
    }
    vector<vector<string>> result;
    for (auto& [k, v] : mp)
        result.push_back(v);
    return result;
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> topKFrequent(vector<int>& nums, int k) {
    unordered_map<int, int> freq;
    for (int n : nums) freq[n]++;
    
    int n = nums.size();
    vector<vector<int>> buckets(n + 1);
    for (auto& [num, cnt] : freq)
        buckets[cnt].push_back(num);
    
    vector<int> result;
    for (int i = n; i >= 0 && result.size() < k; i--)
        for (int num : buckets[i])
            if (result.size() < k) result.push_back(num);
    return result;
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> productExceptSelf(vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n, 1);
    int prefix = 1;
    for (int i = 0; i < n; i++) {
        result[i] = prefix;
        prefix *= nums[i];
    }
    int suffix = 1;
    for (int i = n - 1; i >= 0; i--) {
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

bool isValidSudoku(vector<vector<char>>& board) {
    unordered_set<string> seen;
    for (int i = 0; i < 9; i++) {
        for (int j = 0; j < 9; j++) {
            if (board[i][j] == '.') continue;
            string val(1, board[i][j]);
            string row = val + "r" + to_string(i);
            string col = val + "c" + to_string(j);
            string box = val + "b" + to_string(i/3) + to_string(j/3);
            if (seen.count(row) || seen.count(col) || seen.count(box))
                return false;
            seen.insert(row);
            seen.insert(col);
            seen.insert(box);
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
    approach: "Encode each string with its length followed by a delimiter '#'. Decode by reading length, then extracting that many characters.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

string encode(vector<string>& strs) {
    string result;
    for (auto& s : strs)
        result += to_string(s.size()) + "#" + s;
    return result;
}

vector<string> decode(string s) {
    vector<string> result;
    int i = 0;
    while (i < s.size()) {
        int j = s.find('#', i);
        int len = stoi(s.substr(i, j - i));
        result.push_back(s.substr(j + 1, len));
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
    approach: "Use an unordered_set for O(1) lookup. For each number that is the start of a sequence (n-1 not in set), count consecutive numbers.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int longestConsecutive(vector<int>& nums) {
    unordered_set<int> st(nums.begin(), nums.end());
    int longest = 0;
    for (int num : st) {
        if (!st.count(num - 1)) {
            int len = 1, curr = num;
            while (st.count(curr + 1)) {
                curr++;
                len++;
            }
            longest = max(longest, len);
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

bool isPalindrome(string s) {
    int l = 0, r = s.size() - 1;
    while (l < r) {
        while (l < r && !isalnum(s[l])) l++;
        while (l < r && !isalnum(s[r])) r--;
        if (tolower(s[l]) != tolower(s[r])) return false;
        l++; r--;
    }
    return true;
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> twoSum(vector<int>& numbers, int target) {
    int l = 0, r = numbers.size() - 1;
    while (l < r) {
        int sum = numbers[l] + numbers[r];
        if (sum == target) return {l + 1, r + 1};
        if (sum < target) l++;
        else r--;
    }
    return {};
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> threeSum(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> result;
    for (int i = 0; i < (int)nums.size() - 2; i++) {
        if (i > 0 && nums[i] == nums[i-1]) continue;
        int l = i + 1, r = nums.size() - 1;
        while (l < r) {
            int sum = nums[i] + nums[l] + nums[r];
            if (sum == 0) {
                result.push_back({nums[i], nums[l], nums[r]});
                while (l < r && nums[l] == nums[l+1]) l++;
                while (l < r && nums[r] == nums[r-1]) r--;
                l++; r--;
            } else if (sum < 0) l++;
            else r--;
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int maxArea(vector<int>& height) {
    int l = 0, r = height.size() - 1, maxWater = 0;
    while (l < r) {
        int h = min(height[l], height[r]);
        maxWater = max(maxWater, (r - l) * h);
        if (height[l] < height[r]) l++;
        else r--;
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int trap(vector<int>& height) {
    int l = 0, r = height.size() - 1;
    int leftMax = 0, rightMax = 0, water = 0;
    while (l < r) {
        if (height[l] < height[r]) {
            leftMax = max(leftMax, height[l]);
            water += leftMax - height[l];
            l++;
        } else {
            rightMax = max(rightMax, height[r]);
            water += rightMax - height[r];
            r--;
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int maxProfit(vector<int>& prices) {
    int minPrice = INT_MAX, maxProfit = 0;
    for (int price : prices) {
        minPrice = min(minPrice, price);
        maxProfit = max(maxProfit, price - minPrice);
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int lengthOfLongestSubstring(string s) {
    unordered_set<char> seen;
    int l = 0, maxLen = 0;
    for (int r = 0; r < s.size(); r++) {
        while (seen.count(s[r])) {
            seen.erase(s[l]);
            l++;
        }
        seen.insert(s[r]);
        maxLen = max(maxLen, r - l + 1);
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int characterReplacement(string s, int k) {
    int count[26] = {};
    int l = 0, maxCount = 0, maxLen = 0;
    for (int r = 0; r < s.size(); r++) {
        count[s[r] - 'A']++;
        maxCount = max(maxCount, count[s[r] - 'A']);
        while (r - l + 1 - maxCount > k) {
            count[s[l] - 'A']--;
            l++;
        }
        maxLen = max(maxLen, r - l + 1);
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

bool checkInclusion(string s1, string s2) {
    if (s1.size() > s2.size()) return false;
    int cnt1[26] = {}, cnt2[26] = {};
    for (int i = 0; i < s1.size(); i++) {
        cnt1[s1[i] - 'a']++;
        cnt2[s2[i] - 'a']++;
    }
    int matches = 0;
    for (int i = 0; i < 26; i++)
        if (cnt1[i] == cnt2[i]) matches++;
    for (int i = s1.size(); i < s2.size(); i++) {
        if (matches == 26) return true;
        int left = s2[i - s1.size()] - 'a';
        int right = s2[i] - 'a';
        cnt2[right]++;
        if (cnt2[right] == cnt1[right]) matches++;
        else if (cnt2[right] == cnt1[right] + 1) matches--;
        cnt2[left]--;
        if (cnt2[left] == cnt1[left]) matches++;
        else if (cnt2[left] == cnt1[left] - 1) matches--;
    }
    return matches == 26;
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

string minWindow(string s, string t) {
    unordered_map<char, int> need, window;
    for (char c : t) need[c]++;
    int have = 0, required = need.size();
    int l = 0, minLen = INT_MAX, minStart = 0;
    for (int r = 0; r < s.size(); r++) {
        window[s[r]]++;
        if (need.count(s[r]) && window[s[r]] == need[s[r]])
            have++;
        while (have == required) {
            if (r - l + 1 < minLen) {
                minLen = r - l + 1;
                minStart = l;
            }
            window[s[l]]--;
            if (need.count(s[l]) && window[s[l]] < need[s[l]])
                have--;
            l++;
        }
    }
    return minLen == INT_MAX ? "" : s.substr(minStart, minLen);
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq;
    vector<int> result;
    for (int i = 0; i < nums.size(); i++) {
        while (!dq.empty() && dq.front() < i - k + 1) dq.pop_front();
        while (!dq.empty() && nums[dq.back()] < nums[i]) dq.pop_back();
        dq.push_back(i);
        if (i >= k - 1) result.push_back(nums[dq.front()]);
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

bool isValid(string s) {
    stack<char> st;
    unordered_map<char, char> pairs = {{')', '('}, {']', '['}, {'}', '{'}};
    for (char c : s) {
        if (pairs.count(c)) {
            if (st.empty() || st.top() != pairs[c]) return false;
            st.pop();
        } else {
            st.push(c);
        }
    }
    return st.empty();
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

class MinStack {
    stack<int> st, minSt;
public:
    void push(int val) {
        st.push(val);
        int mn = minSt.empty() ? val : min(val, minSt.top());
        minSt.push(mn);
    }
    void pop() { st.pop(); minSt.pop(); }
    int top() { return st.top(); }
    int getMin() { return minSt.top(); }
};`,
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int evalRPN(vector<string>& tokens) {
    stack<int> st;
    for (auto& t : tokens) {
        if (t == "+" || t == "-" || t == "*" || t == "/") {
            int b = st.top(); st.pop();
            int a = st.top(); st.pop();
            if (t == "+") st.push(a + b);
            else if (t == "-") st.push(a - b);
            else if (t == "*") st.push(a * b);
            else st.push(a / b);
        } else {
            st.push(stoi(t));
        }
    }
    return st.top();
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<string> generateParenthesis(int n) {
    vector<string> result;
    function<void(string&, int, int)> backtrack = [&](string& curr, int open, int close) {
        if (curr.size() == 2 * n) { result.push_back(curr); return; }
        if (open < n) { curr += '('; backtrack(curr, open + 1, close); curr.pop_back(); }
        if (close < open) { curr += ')'; backtrack(curr, open, close + 1); curr.pop_back(); }
    };
    string s;
    backtrack(s, 0, 0);
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> dailyTemperatures(vector<int>& temperatures) {
    int n = temperatures.size();
    vector<int> result(n, 0);
    stack<int> st;
    for (int i = 0; i < n; i++) {
        while (!st.empty() && temperatures[i] > temperatures[st.top()]) {
            int j = st.top(); st.pop();
            result[j] = i - j;
        }
        st.push(i);
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int carFleet(int target, vector<int>& position, vector<int>& speed) {
    int n = position.size();
    vector<pair<int,double>> cars(n);
    for (int i = 0; i < n; i++)
        cars[i] = {position[i], (double)(target - position[i]) / speed[i]};
    sort(cars.begin(), cars.end(), greater<>());
    
    int fleets = 0;
    double curTime = 0;
    for (auto& [pos, time] : cars) {
        if (time > curTime) {
            fleets++;
            curTime = time;
        }
    }
    return fleets;
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int largestRectangleArea(vector<int>& heights) {
    stack<int> st;
    int maxArea = 0, n = heights.size();
    for (int i = 0; i <= n; i++) {
        int h = (i == n) ? 0 : heights[i];
        while (!st.empty() && h < heights[st.top()]) {
            int height = heights[st.top()]; st.pop();
            int width = st.empty() ? i : i - st.top() - 1;
            maxArea = max(maxArea, height * width);
        }
        st.push(i);
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int search(vector<int>& nums, int target) {
    int l = 0, r = nums.size() - 1;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) l = mid + 1;
        else r = mid - 1;
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

bool searchMatrix(vector<vector<int>>& matrix, int target) {
    int m = matrix.size(), n = matrix[0].size();
    int l = 0, r = m * n - 1;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        int val = matrix[mid / n][mid % n];
        if (val == target) return true;
        if (val < target) l = mid + 1;
        else r = mid - 1;
    }
    return false;
}`,
    hints: ["Treat as 1D sorted array", "Convert index to row/col"],
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
    description: "Find minimum eating speed to finish all bananas within h hours.",
    testCases: [
      { input: "piles = [3,6,7,11], h = 8", output: "4" },
      { input: "piles = [30,11,23,4,20], h = 5", output: "30" }
    ],
    approach: "Binary search on speed. For each speed, calculate total hours needed.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int minEatingSpeed(vector<int>& piles, int h) {
    int l = 1, r = *max_element(piles.begin(), piles.end());
    while (l < r) {
        int mid = l + (r - l) / 2;
        long long hours = 0;
        for (int p : piles) hours += (p + mid - 1) / mid;
        if (hours <= h) r = mid;
        else l = mid + 1;
    }
    return l;
}`,
    hints: ["Binary search on answer", "Check if speed is feasible"],
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int findMin(vector<int>& nums) {
    int l = 0, r = nums.size() - 1;
    while (l < r) {
        int mid = l + (r - l) / 2;
        if (nums[mid] > nums[r]) l = mid + 1;
        else r = mid;
    }
    return nums[l];
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int search(vector<int>& nums, int target) {
    int l = 0, r = nums.size() - 1;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (nums[mid] == target) return mid;
        if (nums[l] <= nums[mid]) {
            if (nums[l] <= target && target < nums[mid]) r = mid - 1;
            else l = mid + 1;
        } else {
            if (nums[mid] < target && target <= nums[r]) l = mid + 1;
            else r = mid - 1;
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

class TimeMap {
    unordered_map<string, vector<pair<int, string>>> mp;
public:
    void set(string key, string value, int timestamp) {
        mp[key].push_back({timestamp, value});
    }
    string get(string key, int timestamp) {
        if (!mp.count(key)) return "";
        auto& v = mp[key];
        int l = 0, r = v.size() - 1;
        string result = "";
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (v[mid].first <= timestamp) {
                result = v[mid].second;
                l = mid + 1;
            } else r = mid - 1;
        }
        return result;
    }
};`,
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
    if (nums1.size() > nums2.size()) swap(nums1, nums2);
    int m = nums1.size(), n = nums2.size();
    int l = 0, r = m;
    while (l <= r) {
        int i = (l + r) / 2;
        int j = (m + n + 1) / 2 - i;
        int maxLeft1 = (i == 0) ? INT_MIN : nums1[i-1];
        int minRight1 = (i == m) ? INT_MAX : nums1[i];
        int maxLeft2 = (j == 0) ? INT_MIN : nums2[j-1];
        int minRight2 = (j == n) ? INT_MAX : nums2[j];
        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
            if ((m + n) % 2 == 0)
                return (max(maxLeft1, maxLeft2) + min(minRight1, minRight2)) / 2.0;
            return max(maxLeft1, maxLeft2);
        } else if (maxLeft1 > minRight2) r = i - 1;
        else l = i + 1;
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

ListNode* reverseList(ListNode* head) {
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    ListNode dummy(0);
    ListNode* curr = &dummy;
    while (l1 && l2) {
        if (l1->val <= l2->val) { curr->next = l1; l1 = l1->next; }
        else { curr->next = l2; l2 = l2->next; }
        curr = curr->next;
    }
    curr->next = l1 ? l1 : l2;
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

void reorderList(ListNode* head) {
    if (!head || !head->next) return;
    // Find middle
    ListNode *slow = head, *fast = head;
    while (fast->next && fast->next->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    // Reverse second half
    ListNode *prev = nullptr, *curr = slow->next;
    slow->next = nullptr;
    while (curr) {
        ListNode* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    // Merge
    ListNode *first = head, *second = prev;
    while (second) {
        ListNode *n1 = first->next, *n2 = second->next;
        first->next = second;
        second->next = n1;
        first = n1;
        second = n2;
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

ListNode* removeNthFromEnd(ListNode* head, int n) {
    ListNode dummy(0, head);
    ListNode *first = &dummy, *second = &dummy;
    for (int i = 0; i <= n; i++) first = first->next;
    while (first) {
        first = first->next;
        second = second->next;
    }
    ListNode* toDelete = second->next;
    second->next = second->next->next;
    delete toDelete;
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

Node* copyRandomList(Node* head) {
    if (!head) return nullptr;
    unordered_map<Node*, Node*> mp;
    Node* curr = head;
    while (curr) {
        mp[curr] = new Node(curr->val);
        curr = curr->next;
    }
    curr = head;
    while (curr) {
        mp[curr]->next = mp[curr->next];
        mp[curr]->random = mp[curr->random];
        curr = curr->next;
    }
    return mp[head];
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
    ListNode dummy(0);
    ListNode* curr = &dummy;
    int carry = 0;
    while (l1 || l2 || carry) {
        int sum = carry;
        if (l1) { sum += l1->val; l1 = l1->next; }
        if (l2) { sum += l2->val; l2 = l2->next; }
        carry = sum / 10;
        curr->next = new ListNode(sum % 10);
        curr = curr->next;
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

bool hasCycle(ListNode* head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int findDuplicate(vector<int>& nums) {
    int slow = nums[0], fast = nums[0];
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow != fast);
    
    fast = nums[0];
    while (slow != fast) {
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

class LRUCache {
    int cap;
    list<pair<int,int>> dll;
    unordered_map<int, list<pair<int,int>>::iterator> mp;
public:
    LRUCache(int capacity) : cap(capacity) {}
    
    int get(int key) {
        if (!mp.count(key)) return -1;
        dll.splice(dll.begin(), dll, mp[key]);
        return mp[key]->second;
    }
    
    void put(int key, int value) {
        if (mp.count(key)) {
            mp[key]->second = value;
            dll.splice(dll.begin(), dll, mp[key]);
        } else {
            if (dll.size() == cap) {
                mp.erase(dll.back().first);
                dll.pop_back();
            }
            dll.push_front({key, value});
            mp[key] = dll.begin();
        }
    }
};`,
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
    approach: "Use min heap to always pick the smallest node across all lists.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

ListNode* mergeKLists(vector<ListNode*>& lists) {
    auto cmp = [](ListNode* a, ListNode* b) { return a->val > b->val; };
    priority_queue<ListNode*, vector<ListNode*>, decltype(cmp)> pq(cmp);
    
    for (auto* l : lists)
        if (l) pq.push(l);
    
    ListNode dummy(0);
    ListNode* curr = &dummy;
    while (!pq.empty()) {
        curr->next = pq.top(); pq.pop();
        curr = curr->next;
        if (curr->next) pq.push(curr->next);
    }
    return dummy.next;
}`,
    hints: ["Min heap for smallest element", "Or divide and conquer"],
    timeComplexity: "O(n log k)",
    spaceComplexity: "O(k)",
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

ListNode* reverseKGroup(ListNode* head, int k) {
    ListNode* curr = head;
    int count = 0;
    while (curr && count < k) { curr = curr->next; count++; }
    if (count < k) return head;
    
    ListNode* prev = nullptr;
    curr = head;
    for (int i = 0; i < k; i++) {
        ListNode* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    head->next = reverseKGroup(curr, k);
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
    id: "46", title: "Invert Binary Tree", slug: "invert-binary-tree", difficulty: "Easy", category: "Trees",
    description: "Invert a binary tree (mirror it).",
    testCases: [{ input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" }],
    approach: "Recursively swap left and right children for each node.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

TreeNode* invertTree(TreeNode* root) {
    if (!root) return nullptr;
    swap(root->left, root->right);
    invertTree(root->left);
    invertTree(root->right);
    return root;
}`,
    hints: ["Swap children at each node", "Recursion"], timeComplexity: "O(n)", spaceComplexity: "O(h)", leetcodeNumber: 226, orderIndex: 46
  },
  {
    id: "47", title: "Maximum Depth of Binary Tree", slug: "maximum-depth-of-binary-tree", difficulty: "Easy", category: "Trees",
    description: "Find the maximum depth of a binary tree.",
    testCases: [{ input: "root = [3,9,20,null,null,15,7]", output: "3" }],
    approach: "Recursively find max depth of subtrees. Return 1 + max.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int maxDepth(TreeNode* root) {
    if (!root) return 0;
    return 1 + max(maxDepth(root->left), maxDepth(root->right));
}`,
    hints: ["Depth = 1 + deeper subtree", "Base case: null = 0"], timeComplexity: "O(n)", spaceComplexity: "O(h)", leetcodeNumber: 104, orderIndex: 47
  },
  {
    id: "48", title: "Diameter of Binary Tree", slug: "diameter-of-binary-tree", difficulty: "Easy", category: "Trees",
    description: "Find the diameter (longest path between any two nodes) of a binary tree.",
    testCases: [{ input: "root = [1,2,3,4,5]", output: "3" }],
    approach: "At each node, diameter through it = left height + right height. Track maximum.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int diameterOfBinaryTree(TreeNode* root) {
    int diameter = 0;
    function<int(TreeNode*)> height = [&](TreeNode* node) -> int {
        if (!node) return 0;
        int l = height(node->left), r = height(node->right);
        diameter = max(diameter, l + r);
        return 1 + max(l, r);
    };
    height(root);
    return diameter;
}`,
    hints: ["Diameter = left height + right height", "Track max while computing heights"], timeComplexity: "O(n)", spaceComplexity: "O(h)", leetcodeNumber: 543, orderIndex: 48
  },
  {
    id: "49", title: "Balanced Binary Tree", slug: "balanced-binary-tree", difficulty: "Easy", category: "Trees",
    description: "Check if a binary tree is height-balanced.",
    testCases: [{ input: "root = [3,9,20,null,null,15,7]", output: "true" }, { input: "root = [1,2,2,3,3,null,null,4,4]", output: "false" }],
    approach: "Recursively check heights. Return -1 if unbalanced.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

bool isBalanced(TreeNode* root) {
    function<int(TreeNode*)> height = [&](TreeNode* node) -> int {
        if (!node) return 0;
        int l = height(node->left), r = height(node->right);
        if (l == -1 || r == -1 || abs(l - r) > 1) return -1;
        return 1 + max(l, r);
    };
    return height(root) != -1;
}`,
    hints: ["Return -1 if unbalanced", "Check height difference <= 1"], timeComplexity: "O(n)", spaceComplexity: "O(h)", leetcodeNumber: 110, orderIndex: 49
  },
  {
    id: "50", title: "Same Tree", slug: "same-tree", difficulty: "Easy", category: "Trees",
    description: "Check if two binary trees are identical.",
    testCases: [{ input: "p = [1,2,3], q = [1,2,3]", output: "true" }, { input: "p = [1,2], q = [1,null,2]", output: "false" }],
    approach: "Recursively compare values and structure.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

bool isSameTree(TreeNode* p, TreeNode* q) {
    if (!p && !q) return true;
    if (!p || !q || p->val != q->val) return false;
    return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);
}`,
    hints: ["Compare values recursively", "Handle null cases"], timeComplexity: "O(n)", spaceComplexity: "O(h)", leetcodeNumber: 100, orderIndex: 50
  },
  {
    id: "51", title: "Subtree of Another Tree", slug: "subtree-of-another-tree", difficulty: "Easy", category: "Trees",
    description: "Check if subRoot is a subtree of root.",
    testCases: [{ input: "root = [3,4,5,1,2], subRoot = [4,1,2]", output: "true" }],
    approach: "For each node in root, check if it's identical to subRoot.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

bool isSame(TreeNode* p, TreeNode* q) {
    if (!p && !q) return true;
    if (!p || !q || p->val != q->val) return false;
    return isSame(p->left, q->left) && isSame(p->right, q->right);
}

bool isSubtree(TreeNode* root, TreeNode* subRoot) {
    if (!root) return false;
    if (isSame(root, subRoot)) return true;
    return isSubtree(root->left, subRoot) || isSubtree(root->right, subRoot);
}`,
    hints: ["Check each node as potential root", "Use isSameTree helper"], timeComplexity: "O(m * n)", spaceComplexity: "O(h)", leetcodeNumber: 572, orderIndex: 51
  },
  {
    id: "52", title: "Lowest Common Ancestor of a Binary Search Tree", slug: "lowest-common-ancestor-of-bst", difficulty: "Medium", category: "Trees",
    description: "Find LCA of two nodes in a BST.",
    testCases: [{ input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8", output: "6" }],
    approach: "Use BST property. If both < node, go left. If both > node, go right. Else, current is LCA.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    while (root) {
        if (p->val < root->val && q->val < root->val) root = root->left;
        else if (p->val > root->val && q->val > root->val) root = root->right;
        else return root;
    }
    return nullptr;
}`,
    hints: ["Use BST property", "Split point is LCA"], timeComplexity: "O(h)", spaceComplexity: "O(1)", leetcodeNumber: 235, orderIndex: 52
  },
  {
    id: "53", title: "Binary Tree Level Order Traversal", slug: "binary-tree-level-order-traversal", difficulty: "Medium", category: "Trees",
    description: "Return level order traversal of a binary tree.",
    testCases: [{ input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" }],
    approach: "BFS with queue. Process level by level.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> levelOrder(TreeNode* root) {
    if (!root) return {};
    vector<vector<int>> result;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;
        for (int i = 0; i < sz; i++) {
            auto* node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        result.push_back(level);
    }
    return result;
}`,
    hints: ["BFS with queue", "Track level size"], timeComplexity: "O(n)", spaceComplexity: "O(n)", leetcodeNumber: 102, orderIndex: 53
  },
  {
    id: "54", title: "Binary Tree Right Side View", slug: "binary-tree-right-side-view", difficulty: "Medium", category: "Trees",
    description: "Return values visible from right side of tree.",
    testCases: [{ input: "root = [1,2,3,null,5,null,4]", output: "[1,3,4]" }],
    approach: "BFS, take last node of each level.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> rightSideView(TreeNode* root) {
    if (!root) return {};
    vector<int> result;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        for (int i = 0; i < sz; i++) {
            auto* node = q.front(); q.pop();
            if (i == sz - 1) result.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
    }
    return result;
}`,
    hints: ["Last node of each level", "BFS level order"], timeComplexity: "O(n)", spaceComplexity: "O(n)", leetcodeNumber: 199, orderIndex: 54
  },
  {
    id: "55", title: "Count Good Nodes in Binary Tree", slug: "count-good-nodes-in-binary-tree", difficulty: "Medium", category: "Trees",
    description: "Count nodes where node value >= all ancestors.",
    testCases: [{ input: "root = [3,1,4,3,null,1,5]", output: "4" }],
    approach: "DFS tracking max value seen. Node is good if val >= max.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int goodNodes(TreeNode* root) {
    function<int(TreeNode*, int)> dfs = [&](TreeNode* node, int maxVal) -> int {
        if (!node) return 0;
        int good = (node->val >= maxVal) ? 1 : 0;
        int newMax = max(maxVal, node->val);
        return good + dfs(node->left, newMax) + dfs(node->right, newMax);
    };
    return dfs(root, root->val);
}`,
    hints: ["Track max on path", "Node is good if val >= max"], timeComplexity: "O(n)", spaceComplexity: "O(h)", leetcodeNumber: 1448, orderIndex: 55
  },
  {
    id: "56", title: "Validate Binary Search Tree", slug: "validate-binary-search-tree", difficulty: "Medium", category: "Trees",
    description: "Validate if a tree is a valid BST.",
    testCases: [{ input: "root = [2,1,3]", output: "true" }, { input: "root = [5,1,4,null,null,3,6]", output: "false" }],
    approach: "DFS with min/max bounds. Each node must be within valid range.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

bool isValidBST(TreeNode* root) {
    function<bool(TreeNode*, long, long)> validate = [&](TreeNode* node, long lo, long hi) -> bool {
        if (!node) return true;
        if (node->val <= lo || node->val >= hi) return false;
        return validate(node->left, lo, node->val) && validate(node->right, node->val, hi);
    };
    return validate(root, LONG_MIN, LONG_MAX);
}`,
    hints: ["Track valid range", "Left < node < right for all subtrees"], timeComplexity: "O(n)", spaceComplexity: "O(h)", leetcodeNumber: 98, orderIndex: 56
  },
  {
    id: "57", title: "Kth Smallest Element in a BST", slug: "kth-smallest-element-in-bst", difficulty: "Medium", category: "Trees",
    description: "Find kth smallest element in BST.",
    testCases: [{ input: "root = [3,1,4,null,2], k = 1", output: "1" }],
    approach: "Iterative inorder traversal. Return kth element.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int kthSmallest(TreeNode* root, int k) {
    stack<TreeNode*> st;
    TreeNode* curr = root;
    while (curr || !st.empty()) {
        while (curr) { st.push(curr); curr = curr->left; }
        curr = st.top(); st.pop();
        if (--k == 0) return curr->val;
        curr = curr->right;
    }
    return -1;
}`,
    hints: ["Inorder = sorted", "Stop at kth"], timeComplexity: "O(h + k)", spaceComplexity: "O(h)", leetcodeNumber: 230, orderIndex: 57
  },
  {
    id: "58", title: "Construct Binary Tree from Preorder and Inorder Traversal", slug: "construct-binary-tree-from-preorder-and-inorder", difficulty: "Medium", category: "Trees",
    description: "Build tree from preorder and inorder traversals.",
    testCases: [{ input: "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]", output: "[3,9,20,null,null,15,7]" }],
    approach: "First preorder element is root. Find it in inorder to split left/right subtrees.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
    unordered_map<int,int> mp;
    for (int i = 0; i < inorder.size(); i++) mp[inorder[i]] = i;
    int idx = 0;
    function<TreeNode*(int, int)> build = [&](int l, int r) -> TreeNode* {
        if (l > r) return nullptr;
        int val = preorder[idx++];
        TreeNode* node = new TreeNode(val);
        node->left = build(l, mp[val] - 1);
        node->right = build(mp[val] + 1, r);
        return node;
    };
    return build(0, inorder.size() - 1);
}`,
    hints: ["Preorder first = root", "Inorder splits left/right"], timeComplexity: "O(n)", spaceComplexity: "O(n)", leetcodeNumber: 105, orderIndex: 58
  },
  {
    id: "59", title: "Binary Tree Maximum Path Sum", slug: "binary-tree-maximum-path-sum", difficulty: "Hard", category: "Trees",
    description: "Find maximum path sum in binary tree. Path can start and end at any node.",
    testCases: [{ input: "root = [1,2,3]", output: "6" }, { input: "root = [-10,9,20,null,null,15,7]", output: "42" }],
    approach: "At each node, compute max path through it. Track global max. Return max single path.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int maxPathSum(TreeNode* root) {
    int maxSum = INT_MIN;
    function<int(TreeNode*)> dfs = [&](TreeNode* node) -> int {
        if (!node) return 0;
        int l = max(0, dfs(node->left));
        int r = max(0, dfs(node->right));
        maxSum = max(maxSum, node->val + l + r);
        return node->val + max(l, r);
    };
    dfs(root);
    return maxSum;
}`,
    hints: ["Path through node = left + node + right", "Return best single path"], timeComplexity: "O(n)", spaceComplexity: "O(h)", leetcodeNumber: 124, orderIndex: 59
  },
  {
    id: "60", title: "Serialize and Deserialize Binary Tree", slug: "serialize-and-deserialize-binary-tree", difficulty: "Hard", category: "Trees",
    description: "Design algorithm to serialize and deserialize a binary tree.",
    testCases: [{ input: "root = [1,2,3,null,null,4,5]", output: "[1,2,3,null,null,4,5]" }],
    approach: "Preorder traversal with markers for null nodes.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

class Codec {
public:
    string serialize(TreeNode* root) {
        if (!root) return "N";
        return to_string(root->val) + "," + serialize(root->left) + "," + serialize(root->right);
    }
    
    TreeNode* deserialize(string data) {
        queue<string> tokens;
        stringstream ss(data);
        string token;
        while (getline(ss, token, ',')) tokens.push(token);
        return build(tokens);
    }
    
    TreeNode* build(queue<string>& tokens) {
        string val = tokens.front(); tokens.pop();
        if (val == "N") return nullptr;
        TreeNode* node = new TreeNode(stoi(val));
        node->left = build(tokens);
        node->right = build(tokens);
        return node;
    }
};`,
    hints: ["Preorder with null markers", "Reconstruct recursively"], timeComplexity: "O(n)", spaceComplexity: "O(n)", leetcodeNumber: 297, orderIndex: 60
  },

  // ==================== TRIES (3 problems) ====================
  {
    id: "61", title: "Implement Trie (Prefix Tree)", slug: "implement-trie", difficulty: "Medium", category: "Tries",
    description: "Implement a trie with insert, search, and startsWith.",
    testCases: [{ input: 'insert("apple"), search("apple"), startsWith("app")', output: "true, true" }],
    approach: "Use node structure with children array and end-of-word flag.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

class Trie {
    struct Node {
        Node* children[26] = {};
        bool isEnd = false;
    };
    Node* root;
public:
    Trie() : root(new Node()) {}
    
    void insert(string word) {
        Node* node = root;
        for (char c : word) {
            if (!node->children[c-'a']) node->children[c-'a'] = new Node();
            node = node->children[c-'a'];
        }
        node->isEnd = true;
    }
    
    bool search(string word) {
        Node* node = find(word);
        return node && node->isEnd;
    }
    
    bool startsWith(string prefix) {
        return find(prefix) != nullptr;
    }
    
    Node* find(string& s) {
        Node* node = root;
        for (char c : s) {
            if (!node->children[c-'a']) return nullptr;
            node = node->children[c-'a'];
        }
        return node;
    }
};`,
    hints: ["Node = children array + isEnd flag", "Traverse character by character"], timeComplexity: "O(n)", spaceComplexity: "O(n)", leetcodeNumber: 208, orderIndex: 61
  },
  {
    id: "62", title: "Design Add and Search Words Data Structure", slug: "design-add-and-search-words", difficulty: "Medium", category: "Tries",
    description: "Design data structure supporting addWord and search (with . wildcard).",
    testCases: [{ input: 'addWord("bad"), search("b.d")', output: "true" }],
    approach: "Trie with DFS for wildcard matching.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

class WordDictionary {
    struct Node {
        Node* children[26] = {};
        bool isEnd = false;
    };
    Node* root = new Node();
public:
    void addWord(string word) {
        Node* node = root;
        for (char c : word) {
            if (!node->children[c-'a']) node->children[c-'a'] = new Node();
            node = node->children[c-'a'];
        }
        node->isEnd = true;
    }
    
    bool search(string word) { return dfs(word, 0, root); }
    
    bool dfs(string& word, int i, Node* node) {
        if (i == word.size()) return node->isEnd;
        if (word[i] == '.') {
            for (auto* child : node->children)
                if (child && dfs(word, i+1, child)) return true;
            return false;
        }
        if (!node->children[word[i]-'a']) return false;
        return dfs(word, i+1, node->children[word[i]-'a']);
    }
};`,
    hints: ["Use trie", "DFS for wildcard ."], timeComplexity: "O(n) add, O(26^n) search", spaceComplexity: "O(n)", leetcodeNumber: 211, orderIndex: 62
  },
  {
    id: "63", title: "Word Search II", slug: "word-search-ii", difficulty: "Hard", category: "Tries",
    description: "Find all words from dictionary that exist in a board.",
    testCases: [{ input: 'board = [["o","a","a","n"],["e","t","a","e"]], words = ["oath","pea","eat","rain"]', output: '["eat","oath"]' }],
    approach: "Build trie from words. DFS from each cell, matching against trie.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

struct TrieNode {
    TrieNode* children[26] = {};
    string word;
};

vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
    TrieNode* root = new TrieNode();
    for (auto& w : words) {
        TrieNode* node = root;
        for (char c : w) {
            if (!node->children[c-'a']) node->children[c-'a'] = new TrieNode();
            node = node->children[c-'a'];
        }
        node->word = w;
    }
    int m = board.size(), n = board[0].size();
    vector<string> result;
    function<void(int,int,TrieNode*)> dfs = [&](int i, int j, TrieNode* node) {
        if (i<0||i>=m||j<0||j>=n||board[i][j]=='#') return;
        char c = board[i][j];
        if (!node->children[c-'a']) return;
        node = node->children[c-'a'];
        if (!node->word.empty()) { result.push_back(node->word); node->word.clear(); }
        board[i][j] = '#';
        dfs(i+1,j,node); dfs(i-1,j,node); dfs(i,j+1,node); dfs(i,j-1,node);
        board[i][j] = c;
    };
    for (int i=0;i<m;i++) for (int j=0;j<n;j++) dfs(i,j,root);
    return result;
}`,
    hints: ["Trie for efficient prefix matching", "DFS from each cell"], timeComplexity: "O(m*n*4^L)", spaceComplexity: "O(words)", leetcodeNumber: 212, orderIndex: 63
  },

  // ==================== HEAP / PRIORITY QUEUE (7 problems) ====================
  {
    id: "64", title: "Kth Largest Element in a Stream", slug: "kth-largest-element-in-stream", difficulty: "Easy", category: "Heap / Priority Queue",
    description: "Design a class to find the kth largest element in a stream.",
    testCases: [{ input: "KthLargest(3, [4,5,8,2]), add(3), add(5)", output: "4, 5" }],
    approach: "Use min heap of size k. Kth largest is always at top.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

class KthLargest {
    priority_queue<int, vector<int>, greater<int>> pq;
    int k;
public:
    KthLargest(int k, vector<int>& nums) : k(k) {
        for (int n : nums) add(n);
    }
    int add(int val) {
        pq.push(val);
        if (pq.size() > k) pq.pop();
        return pq.top();
    }
};`,
    hints: ["Min heap of size k", "Top is kth largest"], timeComplexity: "O(n log k)", spaceComplexity: "O(k)", leetcodeNumber: 703, orderIndex: 64
  },
  {
    id: "65", title: "Last Stone Weight", slug: "last-stone-weight", difficulty: "Easy", category: "Heap / Priority Queue",
    description: "Smash heaviest stones until at most one remains.",
    testCases: [{ input: "stones = [2,7,4,1,8,1]", output: "1" }],
    approach: "Use max heap. Pop two largest, push difference if any.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int lastStoneWeight(vector<int>& stones) {
    priority_queue<int> pq(stones.begin(), stones.end());
    while (pq.size() > 1) {
        int y = pq.top(); pq.pop();
        int x = pq.top(); pq.pop();
        if (y != x) pq.push(y - x);
    }
    return pq.empty() ? 0 : pq.top();
}`,
    hints: ["Max heap", "Smash two largest"], timeComplexity: "O(n log n)", spaceComplexity: "O(n)", leetcodeNumber: 1046, orderIndex: 65
  },
  {
    id: "66", title: "K Closest Points to Origin", slug: "k-closest-points-to-origin", difficulty: "Medium", category: "Heap / Priority Queue",
    description: "Find k closest points to origin.",
    testCases: [{ input: "points = [[1,3],[-2,2]], k = 1", output: "[[-2,2]]" }],
    approach: "Use max heap of size k based on distance.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
    auto cmp = [](vector<int>& a, vector<int>& b) {
        return a[0]*a[0]+a[1]*a[1] < b[0]*b[0]+b[1]*b[1];
    };
    priority_queue<vector<int>, vector<vector<int>>, decltype(cmp)> pq(cmp);
    for (auto& p : points) {
        pq.push(p);
        if (pq.size() > k) pq.pop();
    }
    vector<vector<int>> result;
    while (!pq.empty()) { result.push_back(pq.top()); pq.pop(); }
    return result;
}`,
    hints: ["Compare distances", "Max heap of size k"], timeComplexity: "O(n log k)", spaceComplexity: "O(k)", leetcodeNumber: 973, orderIndex: 66
  },
  {
    id: "67", title: "Kth Largest Element in an Array", slug: "kth-largest-element-in-array", difficulty: "Medium", category: "Heap / Priority Queue",
    description: "Find the kth largest element.",
    testCases: [{ input: "nums = [3,2,1,5,6,4], k = 2", output: "5" }],
    approach: "Use min heap of size k or quickselect.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> pq;
    for (int n : nums) {
        pq.push(n);
        if (pq.size() > k) pq.pop();
    }
    return pq.top();
}`,
    hints: ["Min heap of size k", "Or quickselect O(n) avg"], timeComplexity: "O(n log k)", spaceComplexity: "O(k)", leetcodeNumber: 215, orderIndex: 67
  },
  {
    id: "68", title: "Task Scheduler", slug: "task-scheduler", difficulty: "Medium", category: "Heap / Priority Queue",
    description: "Find minimum intervals to complete all tasks with cooldown n.",
    testCases: [{ input: 'tasks = ["A","A","A","B","B","B"], n = 2', output: "8" }],
    approach: "Use greedy: most frequent task determines structure. Fill gaps with other tasks.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int leastInterval(vector<char>& tasks, int n) {
    int freq[26] = {};
    for (char t : tasks) freq[t - 'A']++;
    int maxFreq = *max_element(freq, freq + 26);
    int maxCount = count(freq, freq + 26, maxFreq);
    int intervals = (maxFreq - 1) * (n + 1) + maxCount;
    return max(intervals, (int)tasks.size());
}`,
    hints: ["Most frequent task determines structure", "Fill gaps with other tasks"], timeComplexity: "O(n)", spaceComplexity: "O(1)", leetcodeNumber: 621, orderIndex: 68
  },
  {
    id: "69", title: "Design Twitter", slug: "design-twitter", difficulty: "Medium", category: "Heap / Priority Queue",
    description: "Design a simplified Twitter with follow, post, and getNewsFeed.",
    testCases: [{ input: "postTweet(1, 5), getNewsFeed(1)", output: "[5]" }],
    approach: "Use maps for tweets and follows. Merge k sorted lists for feed.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

class Twitter {
    unordered_map<int, vector<pair<int,int>>> tweets;
    unordered_map<int, unordered_set<int>> follows;
    int time = 0;
public:
    void postTweet(int userId, int tweetId) {
        tweets[userId].push_back({time++, tweetId});
    }
    vector<int> getNewsFeed(int userId) {
        auto cmp = [](pair<int,int>& a, pair<int,int>& b) { return a.first < b.first; };
        priority_queue<pair<int,int>, vector<pair<int,int>>, decltype(cmp)> pq(cmp);
        follows[userId].insert(userId);
        for (int id : follows[userId])
            for (auto& t : tweets[id]) pq.push(t);
        vector<int> feed;
        while (!pq.empty() && feed.size() < 10) {
            feed.push_back(pq.top().second); pq.pop();
        }
        return feed;
    }
    void follow(int followerId, int followeeId) { follows[followerId].insert(followeeId); }
    void unfollow(int followerId, int followeeId) { follows[followerId].erase(followeeId); }
};`,
    hints: ["Track tweets with timestamps", "Merge feeds from followed users"], timeComplexity: "O(n log n)", spaceComplexity: "O(n)", leetcodeNumber: 355, orderIndex: 69
  },
  {
    id: "70", title: "Find Median from Data Stream", slug: "find-median-from-data-stream", difficulty: "Hard", category: "Heap / Priority Queue",
    description: "Find median of a data stream efficiently.",
    testCases: [{ input: "addNum(1), addNum(2), findMedian(), addNum(3), findMedian()", output: "1.5, 2.0" }],
    approach: "Use two heaps: max heap for lower half, min heap for upper half.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

class MedianFinder {
    priority_queue<int> lo;                              // max heap
    priority_queue<int, vector<int>, greater<int>> hi;   // min heap
public:
    void addNum(int num) {
        lo.push(num);
        hi.push(lo.top()); lo.pop();
        if (hi.size() > lo.size()) { lo.push(hi.top()); hi.pop(); }
    }
    double findMedian() {
        return lo.size() > hi.size() ? lo.top() : (lo.top() + hi.top()) / 2.0;
    }
};`,
    hints: ["Two heaps", "Balance sizes"], timeComplexity: "O(log n)", spaceComplexity: "O(n)", leetcodeNumber: 295, orderIndex: 70
  },

  // ==================== BACKTRACKING (9 problems) ====================
  {
    id: "71", title: "Subsets", slug: "subsets", difficulty: "Medium", category: "Backtracking",
    description: "Generate all possible subsets of an array.",
    testCases: [{ input: "nums = [1,2,3]", output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]" }],
    approach: "Backtracking. At each element, choose to include or exclude.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> subsets(vector<int>& nums) {
    vector<vector<int>> result;
    vector<int> curr;
    function<void(int)> backtrack = [&](int start) {
        result.push_back(curr);
        for (int i = start; i < nums.size(); i++) {
            curr.push_back(nums[i]);
            backtrack(i + 1);
            curr.pop_back();
        }
    };
    backtrack(0);
    return result;
}`,
    hints: ["Include or exclude each element", "Start from next index"], timeComplexity: "O(n * 2^n)", spaceComplexity: "O(n)", leetcodeNumber: 78, orderIndex: 71
  },
  {
    id: "72", title: "Combination Sum", slug: "combination-sum", difficulty: "Medium", category: "Backtracking",
    description: "Find all combinations that sum to target. Numbers can be used unlimited times.",
    testCases: [{ input: "candidates = [2,3,6,7], target = 7", output: "[[2,2,3],[7]]" }],
    approach: "Backtracking. Include element (stay at index) or move to next.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
    vector<vector<int>> result;
    vector<int> curr;
    function<void(int, int)> backtrack = [&](int start, int sum) {
        if (sum == target) { result.push_back(curr); return; }
        if (sum > target) return;
        for (int i = start; i < candidates.size(); i++) {
            curr.push_back(candidates[i]);
            backtrack(i, sum + candidates[i]);
            curr.pop_back();
        }
    };
    backtrack(0, 0);
    return result;
}`,
    hints: ["Can reuse same element", "Track running sum"], timeComplexity: "O(n^(t/min))", spaceComplexity: "O(t/min)", leetcodeNumber: 39, orderIndex: 72
  },
  {
    id: "73", title: "Permutations", slug: "permutations", difficulty: "Medium", category: "Backtracking",
    description: "Generate all permutations of an array.",
    testCases: [{ input: "nums = [1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" }],
    approach: "Backtracking with used array to track which elements are included.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> permute(vector<int>& nums) {
    vector<vector<int>> result;
    vector<int> curr;
    vector<bool> used(nums.size(), false);
    function<void()> backtrack = [&]() {
        if (curr.size() == nums.size()) { result.push_back(curr); return; }
        for (int i = 0; i < nums.size(); i++) {
            if (used[i]) continue;
            used[i] = true;
            curr.push_back(nums[i]);
            backtrack();
            curr.pop_back();
            used[i] = false;
        }
    };
    backtrack();
    return result;
}`,
    hints: ["Track used elements", "Try all unused at each position"], timeComplexity: "O(n! * n)", spaceComplexity: "O(n)", leetcodeNumber: 46, orderIndex: 73
  },
  {
    id: "74", title: "Subsets II", slug: "subsets-ii", difficulty: "Medium", category: "Backtracking",
    description: "Generate all unique subsets with duplicates in input.",
    testCases: [{ input: "nums = [1,2,2]", output: "[[],[1],[1,2],[1,2,2],[2],[2,2]]" }],
    approach: "Sort first. Skip duplicates at same level.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> subsetsWithDup(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> result;
    vector<int> curr;
    function<void(int)> backtrack = [&](int start) {
        result.push_back(curr);
        for (int i = start; i < nums.size(); i++) {
            if (i > start && nums[i] == nums[i-1]) continue;
            curr.push_back(nums[i]);
            backtrack(i + 1);
            curr.pop_back();
        }
    };
    backtrack(0);
    return result;
}`,
    hints: ["Sort to group duplicates", "Skip duplicates at same level"], timeComplexity: "O(n * 2^n)", spaceComplexity: "O(n)", leetcodeNumber: 90, orderIndex: 74
  },
  {
    id: "75", title: "Combination Sum II", slug: "combination-sum-ii", difficulty: "Medium", category: "Backtracking",
    description: "Find unique combinations that sum to target. Each number used once.",
    testCases: [{ input: "candidates = [10,1,2,7,6,1,5], target = 8", output: "[[1,1,6],[1,2,5],[1,7],[2,6]]" }],
    approach: "Sort and skip duplicates. Move to next index after using.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
    sort(candidates.begin(), candidates.end());
    vector<vector<int>> result;
    vector<int> curr;
    function<void(int, int)> backtrack = [&](int start, int sum) {
        if (sum == target) { result.push_back(curr); return; }
        if (sum > target) return;
        for (int i = start; i < candidates.size(); i++) {
            if (i > start && candidates[i] == candidates[i-1]) continue;
            curr.push_back(candidates[i]);
            backtrack(i + 1, sum + candidates[i]);
            curr.pop_back();
        }
    };
    backtrack(0, 0);
    return result;
}`,
    hints: ["Each element once", "Skip duplicates"], timeComplexity: "O(2^n)", spaceComplexity: "O(n)", leetcodeNumber: 40, orderIndex: 75
  },
  {
    id: "76", title: "Word Search", slug: "word-search", difficulty: "Medium", category: "Backtracking",
    description: "Check if word exists in grid by moving adjacent cells.",
    testCases: [{ input: 'board = [["A","B","C","E"],["S","F","C","S"]], word = "ABCCED"', output: "true" }],
    approach: "DFS from each cell. Mark visited, backtrack.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

bool exist(vector<vector<char>>& board, string word) {
    int m = board.size(), n = board[0].size();
    function<bool(int,int,int)> dfs = [&](int i, int j, int k) -> bool {
        if (k == word.size()) return true;
        if (i<0||i>=m||j<0||j>=n||board[i][j]!=word[k]) return false;
        char tmp = board[i][j];
        board[i][j] = '#';
        bool found = dfs(i+1,j,k+1)||dfs(i-1,j,k+1)||dfs(i,j+1,k+1)||dfs(i,j-1,k+1);
        board[i][j] = tmp;
        return found;
    };
    for (int i=0;i<m;i++) for (int j=0;j<n;j++) if (dfs(i,j,0)) return true;
    return false;
}`,
    hints: ["DFS from each cell", "Mark visited, backtrack"], timeComplexity: "O(m*n*4^L)", spaceComplexity: "O(L)", leetcodeNumber: 79, orderIndex: 76
  },
  {
    id: "77", title: "Palindrome Partitioning", slug: "palindrome-partitioning", difficulty: "Medium", category: "Backtracking",
    description: "Partition string so each part is a palindrome.",
    testCases: [{ input: 's = "aab"', output: '[["a","a","b"],["aa","b"]]' }],
    approach: "Backtracking. At each position, try all palindrome prefixes.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<vector<string>> partition(string s) {
    vector<vector<string>> result;
    vector<string> curr;
    function<bool(int,int)> isPalin = [&](int l, int r) {
        while (l < r) if (s[l++] != s[r--]) return false;
        return true;
    };
    function<void(int)> backtrack = [&](int start) {
        if (start == s.size()) { result.push_back(curr); return; }
        for (int end = start; end < s.size(); end++) {
            if (isPalin(start, end)) {
                curr.push_back(s.substr(start, end - start + 1));
                backtrack(end + 1);
                curr.pop_back();
            }
        }
    };
    backtrack(0);
    return result;
}`,
    hints: ["Try all palindrome prefixes", "Backtrack on valid partitions"], timeComplexity: "O(n * 2^n)", spaceComplexity: "O(n)", leetcodeNumber: 131, orderIndex: 77
  },
  {
    id: "78", title: "Letter Combinations of a Phone Number", slug: "letter-combinations-of-phone-number", difficulty: "Medium", category: "Backtracking",
    description: "Return all letter combinations from phone digit mapping.",
    testCases: [{ input: 'digits = "23"', output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]' }],
    approach: "Backtracking over each digit's possible letters.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<string> letterCombinations(string digits) {
    if (digits.empty()) return {};
    vector<string> mp = {"","","abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"};
    vector<string> result;
    string curr;
    function<void(int)> backtrack = [&](int i) {
        if (i == digits.size()) { result.push_back(curr); return; }
        for (char c : mp[digits[i] - '0']) {
            curr += c;
            backtrack(i + 1);
            curr.pop_back();
        }
    };
    backtrack(0);
    return result;
}`,
    hints: ["Map digit to letters", "Backtrack through digits"], timeComplexity: "O(4^n)", spaceComplexity: "O(n)", leetcodeNumber: 17, orderIndex: 78
  },
  {
    id: "79", title: "N-Queens", slug: "n-queens", difficulty: "Hard", category: "Backtracking",
    description: "Place n queens on n×n board so no two attack each other.",
    testCases: [{ input: "n = 4", output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]' }],
    approach: "Backtracking row by row. Track columns and diagonals.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<vector<string>> solveNQueens(int n) {
    vector<vector<string>> result;
    vector<string> board(n, string(n, '.'));
    unordered_set<int> cols, diag1, diag2;
    function<void(int)> backtrack = [&](int row) {
        if (row == n) { result.push_back(board); return; }
        for (int col = 0; col < n; col++) {
            if (cols.count(col) || diag1.count(row-col) || diag2.count(row+col)) continue;
            cols.insert(col); diag1.insert(row-col); diag2.insert(row+col);
            board[row][col] = 'Q';
            backtrack(row + 1);
            board[row][col] = '.';
            cols.erase(col); diag1.erase(row-col); diag2.erase(row+col);
        }
    };
    backtrack(0);
    return result;
}`,
    hints: ["Track columns and diagonals", "Place row by row"], timeComplexity: "O(n!)", spaceComplexity: "O(n²)", leetcodeNumber: 51, orderIndex: 79
  },

  // ==================== GRAPHS (13 problems) ====================
  {
    id: "80", title: "Number of Islands", slug: "number-of-islands", difficulty: "Medium", category: "Graphs",
    description: "Count number of islands (connected 1s) in a grid.",
    testCases: [{ input: 'grid = [["1","1","0","0"],["1","1","0","0"],["0","0","1","0"]]', output: "2" }],
    approach: "DFS from each unvisited '1'. Mark visited. Count components.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int numIslands(vector<vector<char>>& grid) {
    int m = grid.size(), n = grid[0].size(), count = 0;
    function<void(int,int)> dfs = [&](int i, int j) {
        if (i<0||i>=m||j<0||j>=n||grid[i][j]!='1') return;
        grid[i][j] = '0';
        dfs(i+1,j); dfs(i-1,j); dfs(i,j+1); dfs(i,j-1);
    };
    for (int i=0;i<m;i++) for (int j=0;j<n;j++)
        if (grid[i][j]=='1') { count++; dfs(i,j); }
    return count;
}`,
    hints: ["DFS to mark connected land", "Count starting points"], timeComplexity: "O(m*n)", spaceComplexity: "O(m*n)", leetcodeNumber: 200, orderIndex: 80
  },
  {
    id: "81", title: "Clone Graph", slug: "clone-graph", difficulty: "Medium", category: "Graphs",
    description: "Deep clone a graph.",
    testCases: [{ input: "adjList = [[2,4],[1,3],[2,4],[1,3]]", output: "[[2,4],[1,3],[2,4],[1,3]]" }],
    approach: "DFS with hash map to track cloned nodes.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

Node* cloneGraph(Node* node) {
    if (!node) return nullptr;
    unordered_map<Node*, Node*> mp;
    function<Node*(Node*)> dfs = [&](Node* n) -> Node* {
        if (mp.count(n)) return mp[n];
        Node* clone = new Node(n->val);
        mp[n] = clone;
        for (auto* nb : n->neighbors)
            clone->neighbors.push_back(dfs(nb));
        return clone;
    };
    return dfs(node);
}`,
    hints: ["Map original to clone", "DFS to copy"], timeComplexity: "O(V + E)", spaceComplexity: "O(V)", leetcodeNumber: 133, orderIndex: 81
  },
  {
    id: "82", title: "Max Area of Island", slug: "max-area-of-island", difficulty: "Medium", category: "Graphs",
    description: "Find maximum area island in grid.",
    testCases: [{ input: "grid = [[0,0,1,0],[0,1,1,0]]", output: "3" }],
    approach: "DFS from each '1'. Count cells in each island. Track max.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int maxAreaOfIsland(vector<vector<int>>& grid) {
    int m = grid.size(), n = grid[0].size(), maxArea = 0;
    function<int(int,int)> dfs = [&](int i, int j) -> int {
        if (i<0||i>=m||j<0||j>=n||grid[i][j]!=1) return 0;
        grid[i][j] = 0;
        return 1+dfs(i+1,j)+dfs(i-1,j)+dfs(i,j+1)+dfs(i,j-1);
    };
    for (int i=0;i<m;i++) for (int j=0;j<n;j++)
        maxArea = max(maxArea, dfs(i,j));
    return maxArea;
}`,
    hints: ["DFS to count area", "Track maximum"], timeComplexity: "O(m*n)", spaceComplexity: "O(m*n)", leetcodeNumber: 695, orderIndex: 82
  },
  {
    id: "83", title: "Pacific Atlantic Water Flow", slug: "pacific-atlantic-water-flow", difficulty: "Medium", category: "Graphs",
    description: "Find cells where water can flow to both oceans.",
    testCases: [{ input: "heights = [[1,2,2,3,5],[3,2,3,4,4]]", output: "[[0,4],[1,3],[1,4]]" }],
    approach: "DFS from both oceans. Find intersection of reachable cells.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {
    int m = heights.size(), n = heights[0].size();
    vector<vector<bool>> pac(m, vector<bool>(n)), atl(m, vector<bool>(n));
    function<void(int,int,vector<vector<bool>>&,int)> dfs = [&](int i, int j, vector<vector<bool>>& reach, int prev) {
        if (i<0||i>=m||j<0||j>=n||reach[i][j]||heights[i][j]<prev) return;
        reach[i][j] = true;
        dfs(i+1,j,reach,heights[i][j]); dfs(i-1,j,reach,heights[i][j]);
        dfs(i,j+1,reach,heights[i][j]); dfs(i,j-1,reach,heights[i][j]);
    };
    for (int i=0;i<m;i++) { dfs(i,0,pac,0); dfs(i,n-1,atl,0); }
    for (int j=0;j<n;j++) { dfs(0,j,pac,0); dfs(m-1,j,atl,0); }
    vector<vector<int>> result;
    for (int i=0;i<m;i++) for (int j=0;j<n;j++)
        if (pac[i][j]&&atl[i][j]) result.push_back({i,j});
    return result;
}`,
    hints: ["DFS from both oceans", "Find intersection"], timeComplexity: "O(m*n)", spaceComplexity: "O(m*n)", leetcodeNumber: 417, orderIndex: 83
  },
  {
    id: "84", title: "Surrounded Regions", slug: "surrounded-regions", difficulty: "Medium", category: "Graphs",
    description: "Capture regions surrounded by X.",
    testCases: [{ input: 'board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]', output: '[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]' }],
    approach: "DFS from border Os to mark safe. Flip remaining Os.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

void solve(vector<vector<char>>& board) {
    int m = board.size(), n = board[0].size();
    function<void(int,int)> dfs = [&](int i, int j) {
        if (i<0||i>=m||j<0||j>=n||board[i][j]!='O') return;
        board[i][j] = 'S';
        dfs(i+1,j); dfs(i-1,j); dfs(i,j+1); dfs(i,j-1);
    };
    for (int i=0;i<m;i++) { dfs(i,0); dfs(i,n-1); }
    for (int j=0;j<n;j++) { dfs(0,j); dfs(m-1,j); }
    for (int i=0;i<m;i++) for (int j=0;j<n;j++) {
        if (board[i][j]=='O') board[i][j]='X';
        else if (board[i][j]=='S') board[i][j]='O';
    }
}`,
    hints: ["Mark border-connected Os", "Flip remaining"], timeComplexity: "O(m*n)", spaceComplexity: "O(m*n)", leetcodeNumber: 130, orderIndex: 84
  },
  {
    id: "85", title: "Rotting Oranges", slug: "rotting-oranges", difficulty: "Medium", category: "Graphs",
    description: "Find minutes until all oranges are rotten.",
    testCases: [{ input: "grid = [[2,1,1],[1,1,0],[0,1,1]]", output: "4" }],
    approach: "Multi-source BFS from all rotten oranges. Count levels.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int orangesRotting(vector<vector<int>>& grid) {
    int m = grid.size(), n = grid[0].size(), fresh = 0;
    queue<pair<int,int>> q;
    for (int i=0;i<m;i++) for (int j=0;j<n;j++) {
        if (grid[i][j]==2) q.push({i,j});
        else if (grid[i][j]==1) fresh++;
    }
    if (!fresh) return 0;
    int mins = -1;
    int dirs[] = {0,1,0,-1,0};
    while (!q.empty()) {
        mins++;
        int sz = q.size();
        while (sz--) {
            auto [r,c] = q.front(); q.pop();
            for (int d=0;d<4;d++) {
                int nr=r+dirs[d], nc=c+dirs[d+1];
                if (nr>=0&&nr<m&&nc>=0&&nc<n&&grid[nr][nc]==1) {
                    grid[nr][nc]=2; fresh--; q.push({nr,nc});
                }
            }
        }
    }
    return fresh==0 ? mins : -1;
}`,
    hints: ["Multi-source BFS", "Track fresh count"], timeComplexity: "O(m*n)", spaceComplexity: "O(m*n)", leetcodeNumber: 994, orderIndex: 85
  },
  {
    id: "86", title: "Walls and Gates", slug: "walls-and-gates", difficulty: "Medium", category: "Graphs",
    description: "Fill empty rooms with distance to nearest gate.",
    testCases: [{ input: "rooms = [[INF,-1,0,INF],[INF,INF,INF,-1]]", output: "[[3,-1,0,1],[2,2,1,-1]]" }],
    approach: "Multi-source BFS from all gates.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

void wallsAndGates(vector<vector<int>>& rooms) {
    int m = rooms.size(), n = rooms[0].size();
    queue<pair<int,int>> q;
    for (int i=0;i<m;i++) for (int j=0;j<n;j++)
        if (rooms[i][j]==0) q.push({i,j});
    int dirs[] = {0,1,0,-1,0};
    while (!q.empty()) {
        auto [r,c] = q.front(); q.pop();
        for (int d=0;d<4;d++) {
            int nr=r+dirs[d], nc=c+dirs[d+1];
            if (nr>=0&&nr<m&&nc>=0&&nc<n&&rooms[nr][nc]==INT_MAX) {
                rooms[nr][nc] = rooms[r][c]+1;
                q.push({nr,nc});
            }
        }
    }
}`,
    hints: ["Multi-source BFS from gates", "Propagate distances"], timeComplexity: "O(m*n)", spaceComplexity: "O(m*n)", leetcodeNumber: 286, orderIndex: 86
  },
  {
    id: "87", title: "Course Schedule", slug: "course-schedule", difficulty: "Medium", category: "Graphs",
    description: "Check if all courses can be finished (no cycle in prerequisites).",
    testCases: [{ input: "numCourses = 2, prerequisites = [[1,0]]", output: "true" }, { input: "numCourses = 2, prerequisites = [[1,0],[0,1]]", output: "false" }],
    approach: "Topological sort. DFS to detect cycle.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
    vector<vector<int>> graph(numCourses);
    vector<int> inDegree(numCourses, 0);
    for (auto& p : prerequisites) {
        graph[p[1]].push_back(p[0]);
        inDegree[p[0]]++;
    }
    queue<int> q;
    for (int i=0;i<numCourses;i++) if (inDegree[i]==0) q.push(i);
    int count = 0;
    while (!q.empty()) {
        int c = q.front(); q.pop(); count++;
        for (int next : graph[c])
            if (--inDegree[next]==0) q.push(next);
    }
    return count == numCourses;
}`,
    hints: ["Detect cycle in directed graph", "BFS topological sort"], timeComplexity: "O(V + E)", spaceComplexity: "O(V + E)", leetcodeNumber: 207, orderIndex: 87
  },
  {
    id: "88", title: "Course Schedule II", slug: "course-schedule-ii", difficulty: "Medium", category: "Graphs",
    description: "Return course order to finish all courses.",
    testCases: [{ input: "numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]", output: "[0,1,2,3] or [0,2,1,3]" }],
    approach: "Topological sort using BFS (Kahn's algorithm).",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
    vector<vector<int>> graph(numCourses);
    vector<int> inDegree(numCourses, 0);
    for (auto& p : prerequisites) {
        graph[p[1]].push_back(p[0]);
        inDegree[p[0]]++;
    }
    queue<int> q;
    for (int i=0;i<numCourses;i++) if (inDegree[i]==0) q.push(i);
    vector<int> order;
    while (!q.empty()) {
        int c = q.front(); q.pop();
        order.push_back(c);
        for (int next : graph[c])
            if (--inDegree[next]==0) q.push(next);
    }
    return order.size()==numCourses ? order : vector<int>();
}`,
    hints: ["Topological sort", "Build order after visiting all children"], timeComplexity: "O(V + E)", spaceComplexity: "O(V + E)", leetcodeNumber: 210, orderIndex: 88
  },
  {
    id: "89", title: "Redundant Connection", slug: "redundant-connection", difficulty: "Medium", category: "Graphs",
    description: "Find the edge that creates a cycle in a tree with one extra edge.",
    testCases: [{ input: "edges = [[1,2],[1,3],[2,3]]", output: "[2,3]" }],
    approach: "Union-Find. The edge that connects already-connected nodes is redundant.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> findRedundantConnection(vector<vector<int>>& edges) {
    int n = edges.size();
    vector<int> parent(n + 1);
    iota(parent.begin(), parent.end(), 0);
    function<int(int)> find = [&](int x) -> int {
        return parent[x] == x ? x : parent[x] = find(parent[x]);
    };
    for (auto& e : edges) {
        int pa = find(e[0]), pb = find(e[1]);
        if (pa == pb) return e;
        parent[pa] = pb;
    }
    return {};
}`,
    hints: ["Union-Find", "Edge connecting same component"], timeComplexity: "O(n α(n))", spaceComplexity: "O(n)", leetcodeNumber: 684, orderIndex: 89
  },
  {
    id: "90", title: "Number of Connected Components in an Undirected Graph", slug: "number-of-connected-components", difficulty: "Medium", category: "Graphs",
    description: "Count connected components in undirected graph.",
    testCases: [{ input: "n = 5, edges = [[0,1],[1,2],[3,4]]", output: "2" }],
    approach: "Union-Find. Count number of unique roots.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int countComponents(int n, vector<vector<int>>& edges) {
    vector<int> parent(n);
    iota(parent.begin(), parent.end(), 0);
    function<int(int)> find = [&](int x) -> int {
        return parent[x] == x ? x : parent[x] = find(parent[x]);
    };
    int count = n;
    for (auto& e : edges) {
        int pa = find(e[0]), pb = find(e[1]);
        if (pa != pb) { parent[pa] = pb; count--; }
    }
    return count;
}`,
    hints: ["Union-Find", "Decrement count on each union"], timeComplexity: "O(n + e)", spaceComplexity: "O(n)", leetcodeNumber: 323, orderIndex: 90
  },
  {
    id: "91", title: "Graph Valid Tree", slug: "graph-valid-tree", difficulty: "Medium", category: "Graphs",
    description: "Check if edges form a valid tree.",
    testCases: [{ input: "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]", output: "true" }],
    approach: "Tree = connected + no cycles. Check edges = n-1 and all connected.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

bool validTree(int n, vector<vector<int>>& edges) {
    if (edges.size() != n - 1) return false;
    vector<int> parent(n);
    iota(parent.begin(), parent.end(), 0);
    function<int(int)> find = [&](int x) -> int {
        return parent[x] == x ? x : parent[x] = find(parent[x]);
    };
    for (auto& e : edges) {
        int pa = find(e[0]), pb = find(e[1]);
        if (pa == pb) return false;
        parent[pa] = pb;
    }
    return true;
}`,
    hints: ["Tree has n-1 edges", "No cycles"], timeComplexity: "O(n)", spaceComplexity: "O(n)", leetcodeNumber: 261, orderIndex: 91
  },
  {
    id: "92", title: "Word Ladder", slug: "word-ladder", difficulty: "Hard", category: "Graphs",
    description: "Find shortest transformation sequence from beginWord to endWord.",
    testCases: [{ input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', output: "5" }],
    approach: "BFS. Try all one-char changes. Count levels.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
    unordered_set<string> wordSet(wordList.begin(), wordList.end());
    if (!wordSet.count(endWord)) return 0;
    queue<pair<string,int>> q;
    q.push({beginWord, 1});
    unordered_set<string> visited;
    visited.insert(beginWord);
    while (!q.empty()) {
        auto [word, level] = q.front(); q.pop();
        if (word == endWord) return level;
        for (int i = 0; i < word.size(); i++) {
            string next = word;
            for (char c = 'a'; c <= 'z'; c++) {
                next[i] = c;
                if (wordSet.count(next) && !visited.count(next)) {
                    visited.insert(next);
                    q.push({next, level + 1});
                }
            }
        }
    }
    return 0;
}`,
    hints: ["BFS for shortest path", "Try all one-char changes"], timeComplexity: "O(n * m * 26)", spaceComplexity: "O(n * m)", leetcodeNumber: 127, orderIndex: 92
  },

  // ==================== ADVANCED GRAPHS (6 problems) ====================
  {
    id: "93", title: "Reconstruct Itinerary", slug: "reconstruct-itinerary", difficulty: "Hard", category: "Advanced Graphs",
    description: "Reconstruct itinerary from tickets in lexical order.",
    testCases: [{ input: 'tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]', output: '["JFK","MUC","LHR","SFO","SJC"]' }],
    approach: "Hierholzer's algorithm. DFS with sorted adjacency lists.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<string> findItinerary(vector<vector<string>>& tickets) {
    unordered_map<string, priority_queue<string, vector<string>, greater<>>> graph;
    for (auto& t : tickets) graph[t[0]].push(t[1]);
    vector<string> result;
    function<void(string)> dfs = [&](string airport) {
        while (!graph[airport].empty()) {
            string next = graph[airport].top(); graph[airport].pop();
            dfs(next);
        }
        result.push_back(airport);
    };
    dfs("JFK");
    reverse(result.begin(), result.end());
    return result;
}`,
    hints: ["Eulerian path", "Process in reverse"], timeComplexity: "O(E log E)", spaceComplexity: "O(E)", leetcodeNumber: 332, orderIndex: 93
  },
  {
    id: "94", title: "Min Cost to Connect All Points", slug: "min-cost-to-connect-all-points", difficulty: "Medium", category: "Advanced Graphs",
    description: "Find minimum cost to connect all points with Manhattan distance.",
    testCases: [{ input: "points = [[0,0],[2,2],[3,10],[5,2],[7,0]]", output: "20" }],
    approach: "Prim's algorithm for MST.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int minCostConnectPoints(vector<vector<int>>& points) {
    int n = points.size(), total = 0;
    vector<int> minDist(n, INT_MAX);
    vector<bool> visited(n, false);
    minDist[0] = 0;
    for (int i = 0; i < n; i++) {
        int u = -1;
        for (int j = 0; j < n; j++)
            if (!visited[j] && (u == -1 || minDist[j] < minDist[u])) u = j;
        visited[u] = true;
        total += minDist[u];
        for (int v = 0; v < n; v++)
            if (!visited[v]) {
                int dist = abs(points[u][0]-points[v][0]) + abs(points[u][1]-points[v][1]);
                minDist[v] = min(minDist[v], dist);
            }
    }
    return total;
}`,
    hints: ["Minimum spanning tree", "Prim's algorithm"], timeComplexity: "O(n²)", spaceComplexity: "O(n)", leetcodeNumber: 1584, orderIndex: 94
  },
  {
    id: "95", title: "Network Delay Time", slug: "network-delay-time", difficulty: "Medium", category: "Advanced Graphs",
    description: "Find time for signal to reach all nodes.",
    testCases: [{ input: "times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2", output: "2" }],
    approach: "Dijkstra's algorithm from source k.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int networkDelayTime(vector<vector<int>>& times, int n, int k) {
    vector<vector<pair<int,int>>> graph(n + 1);
    for (auto& t : times) graph[t[0]].push_back({t[1], t[2]});
    vector<int> dist(n + 1, INT_MAX);
    dist[k] = 0;
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    pq.push({0, k});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : graph[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    int maxDist = *max_element(dist.begin() + 1, dist.end());
    return maxDist == INT_MAX ? -1 : maxDist;
}`,
    hints: ["Dijkstra's algorithm", "Return max distance"], timeComplexity: "O(E log V)", spaceComplexity: "O(V + E)", leetcodeNumber: 743, orderIndex: 95
  },
  {
    id: "96", title: "Swim in Rising Water", slug: "swim-in-rising-water", difficulty: "Hard", category: "Advanced Graphs",
    description: "Find minimum time to swim from top-left to bottom-right.",
    testCases: [{ input: "grid = [[0,2],[1,3]]", output: "3" }],
    approach: "Modified Dijkstra. Track max elevation on path.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int swimInWater(vector<vector<int>>& grid) {
    int n = grid.size();
    vector<vector<int>> dist(n, vector<int>(n, INT_MAX));
    priority_queue<tuple<int,int,int>, vector<tuple<int,int,int>>, greater<>> pq;
    dist[0][0] = grid[0][0];
    pq.push({grid[0][0], 0, 0});
    int dirs[] = {0,1,0,-1,0};
    while (!pq.empty()) {
        auto [t, r, c] = pq.top(); pq.pop();
        if (r==n-1 && c==n-1) return t;
        for (int d=0;d<4;d++) {
            int nr=r+dirs[d], nc=c+dirs[d+1];
            if (nr>=0&&nr<n&&nc>=0&&nc<n) {
                int nt = max(t, grid[nr][nc]);
                if (nt < dist[nr][nc]) {
                    dist[nr][nc] = nt;
                    pq.push({nt, nr, nc});
                }
            }
        }
    }
    return -1;
}`,
    hints: ["Modified Dijkstra", "Max elevation on path"], timeComplexity: "O(n² log n)", spaceComplexity: "O(n²)", leetcodeNumber: 778, orderIndex: 96
  },
  {
    id: "97", title: "Alien Dictionary", slug: "alien-dictionary", difficulty: "Hard", category: "Advanced Graphs",
    description: "Derive alien alphabet order from sorted words.",
    testCases: [{ input: 'words = ["wrt","wrf","er","ett","rftt"]', output: '"wertf"' }],
    approach: "Build graph from word pairs. Topological sort.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

string alienOrder(vector<string>& words) {
    unordered_map<char, unordered_set<char>> graph;
    unordered_map<char, int> inDegree;
    for (auto& w : words) for (char c : w) { graph[c]; inDegree[c] = 0; }
    for (int i = 0; i < words.size()-1; i++) {
        string& w1 = words[i]; string& w2 = words[i+1];
        if (w1.size() > w2.size() && w1.substr(0, w2.size()) == w2) return "";
        for (int j = 0; j < min(w1.size(), w2.size()); j++) {
            if (w1[j] != w2[j]) {
                if (!graph[w1[j]].count(w2[j])) {
                    graph[w1[j]].insert(w2[j]);
                    inDegree[w2[j]]++;
                }
                break;
            }
        }
    }
    queue<char> q;
    for (auto& [c, deg] : inDegree) if (deg == 0) q.push(c);
    string result;
    while (!q.empty()) {
        char c = q.front(); q.pop();
        result += c;
        for (char next : graph[c])
            if (--inDegree[next] == 0) q.push(next);
    }
    return result.size() == inDegree.size() ? result : "";
}`,
    hints: ["Compare adjacent words", "Topological sort"], timeComplexity: "O(C)", spaceComplexity: "O(1)", leetcodeNumber: 269, orderIndex: 97
  },
  {
    id: "98", title: "Cheapest Flights Within K Stops", slug: "cheapest-flights-within-k-stops", difficulty: "Medium", category: "Advanced Graphs",
    description: "Find cheapest flight with at most k stops.",
    testCases: [{ input: "n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1", output: "200" }],
    approach: "Bellman-Ford with k+1 iterations.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
    vector<int> prices(n, INT_MAX);
    prices[src] = 0;
    for (int i = 0; i <= k; i++) {
        vector<int> temp = prices;
        for (auto& f : flights) {
            if (prices[f[0]] != INT_MAX)
                temp[f[1]] = min(temp[f[1]], prices[f[0]] + f[2]);
        }
        prices = temp;
    }
    return prices[dst] == INT_MAX ? -1 : prices[dst];
}`,
    hints: ["Bellman-Ford with limited iterations", "k+1 edges"], timeComplexity: "O(k * E)", spaceComplexity: "O(n)", leetcodeNumber: 787, orderIndex: 98
  },

  // ==================== 1-D DYNAMIC PROGRAMMING (12 problems) ====================
  {
    id: "99", title: "Climbing Stairs", slug: "climbing-stairs", difficulty: "Easy", category: "1-D Dynamic Programming",
    description: "Count ways to climb n stairs taking 1 or 2 steps.",
    testCases: [{ input: "n = 2", output: "2" }, { input: "n = 3", output: "3" }],
    approach: "Fibonacci pattern. dp[i] = dp[i-1] + dp[i-2].",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int climbStairs(int n) {
    if (n <= 2) return n;
    int prev2 = 1, prev1 = 2;
    for (int i = 3; i <= n; i++) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`,
    hints: ["Fibonacci pattern", "Only need last two values"], timeComplexity: "O(n)", spaceComplexity: "O(1)", leetcodeNumber: 70, orderIndex: 99
  },
  {
    id: "100", title: "Min Cost Climbing Stairs", slug: "min-cost-climbing-stairs", difficulty: "Easy", category: "1-D Dynamic Programming",
    description: "Find minimum cost to reach top of stairs.",
    testCases: [{ input: "cost = [10,15,20]", output: "15" }],
    approach: "dp[i] = cost[i] + min(dp[i-1], dp[i-2]).",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int minCostClimbingStairs(vector<int>& cost) {
    int prev2 = cost[0], prev1 = cost[1];
    for (int i = 2; i < cost.size(); i++) {
        int curr = cost[i] + min(prev1, prev2);
        prev2 = prev1;
        prev1 = curr;
    }
    return min(prev1, prev2);
}`,
    hints: ["Can start from 0 or 1", "Min of last two steps"], timeComplexity: "O(n)", spaceComplexity: "O(1)", leetcodeNumber: 746, orderIndex: 100
  },
  {
    id: "101", title: "House Robber", slug: "house-robber", difficulty: "Medium", category: "1-D Dynamic Programming",
    description: "Max robbery without adjacent houses.",
    testCases: [{ input: "nums = [1,2,3,1]", output: "4" }],
    approach: "dp[i] = max(dp[i-2] + nums[i], dp[i-1]).",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int rob(vector<int>& nums) {
    int prev2 = 0, prev1 = 0;
    for (int num : nums) {
        int curr = max(prev2 + num, prev1);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`,
    hints: ["Rob or skip each house", "Track max with/without current"], timeComplexity: "O(n)", spaceComplexity: "O(1)", leetcodeNumber: 198, orderIndex: 101
  },
  {
    id: "102", title: "House Robber II", slug: "house-robber-ii", difficulty: "Medium", category: "1-D Dynamic Programming",
    description: "House robber with circular houses.",
    testCases: [{ input: "nums = [2,3,2]", output: "3" }],
    approach: "Run House Robber twice: exclude first or exclude last.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int rob(vector<int>& nums) {
    if (nums.size() == 1) return nums[0];
    auto robRange = [&](int l, int r) {
        int prev2 = 0, prev1 = 0;
        for (int i = l; i <= r; i++) {
            int curr = max(prev2 + nums[i], prev1);
            prev2 = prev1; prev1 = curr;
        }
        return prev1;
    };
    return max(robRange(0, nums.size()-2), robRange(1, nums.size()-1));
}`,
    hints: ["Can't rob both first and last", "Two separate problems"], timeComplexity: "O(n)", spaceComplexity: "O(1)", leetcodeNumber: 213, orderIndex: 102
  },
  {
    id: "103", title: "Longest Palindromic Substring", slug: "longest-palindromic-substring", difficulty: "Medium", category: "1-D Dynamic Programming",
    description: "Find longest palindrome substring.",
    testCases: [{ input: 's = "babad"', output: '"bab" or "aba"' }],
    approach: "Expand around center for each position.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

string longestPalindrome(string s) {
    int start = 0, maxLen = 0;
    auto expand = [&](int l, int r) {
        while (l >= 0 && r < s.size() && s[l] == s[r]) {
            if (r - l + 1 > maxLen) { start = l; maxLen = r - l + 1; }
            l--; r++;
        }
    };
    for (int i = 0; i < s.size(); i++) {
        expand(i, i);
        expand(i, i + 1);
    }
    return s.substr(start, maxLen);
}`,
    hints: ["Expand from center", "Try odd and even lengths"], timeComplexity: "O(n²)", spaceComplexity: "O(1)", leetcodeNumber: 5, orderIndex: 103
  },
  {
    id: "104", title: "Palindromic Substrings", slug: "palindromic-substrings", difficulty: "Medium", category: "1-D Dynamic Programming",
    description: "Count all palindromic substrings.",
    testCases: [{ input: 's = "abc"', output: "3" }, { input: 's = "aaa"', output: "6" }],
    approach: "Expand around center, count all palindromes found.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int countSubstrings(string s) {
    int count = 0;
    auto expand = [&](int l, int r) {
        while (l >= 0 && r < s.size() && s[l] == s[r]) { count++; l--; r++; }
    };
    for (int i = 0; i < s.size(); i++) {
        expand(i, i);
        expand(i, i + 1);
    }
    return count;
}`,
    hints: ["Expand from center", "Count all palindromes"], timeComplexity: "O(n²)", spaceComplexity: "O(1)", leetcodeNumber: 647, orderIndex: 104
  },
  {
    id: "105", title: "Decode Ways", slug: "decode-ways", difficulty: "Medium", category: "1-D Dynamic Programming",
    description: "Count ways to decode a number string.",
    testCases: [{ input: 's = "12"', output: "2" }, { input: 's = "226"', output: "3" }],
    approach: "dp[i] = dp[i-1] (if valid single) + dp[i-2] (if valid double).",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int numDecodings(string s) {
    if (s[0] == '0') return 0;
    int prev2 = 1, prev1 = 1;
    for (int i = 1; i < s.size(); i++) {
        int curr = 0;
        if (s[i] != '0') curr = prev1;
        int two = stoi(s.substr(i-1, 2));
        if (two >= 10 && two <= 26) curr += prev2;
        prev2 = prev1; prev1 = curr;
    }
    return prev1;
}`,
    hints: ["Single digit: 1-9", "Double digit: 10-26"], timeComplexity: "O(n)", spaceComplexity: "O(1)", leetcodeNumber: 91, orderIndex: 105
  },
  {
    id: "106", title: "Coin Change", slug: "coin-change", difficulty: "Medium", category: "1-D Dynamic Programming",
    description: "Find minimum coins to make amount.",
    testCases: [{ input: "coins = [1,2,5], amount = 11", output: "3" }],
    approach: "dp[i] = min(dp[i - coin] + 1) for all coins.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++)
        for (int coin : coins)
            if (coin <= i) dp[i] = min(dp[i], dp[i - coin] + 1);
    return dp[amount] > amount ? -1 : dp[amount];
}`,
    hints: ["Build up from 0", "Try all coins"], timeComplexity: "O(amount * n)", spaceComplexity: "O(amount)", leetcodeNumber: 322, orderIndex: 106
  },
  {
    id: "107", title: "Maximum Product Subarray", slug: "maximum-product-subarray", difficulty: "Medium", category: "1-D Dynamic Programming",
    description: "Find contiguous subarray with largest product.",
    testCases: [{ input: "nums = [2,3,-2,4]", output: "6" }],
    approach: "Track both max and min products (negatives can flip).",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int maxProduct(vector<int>& nums) {
    int maxProd = nums[0], minProd = nums[0], result = nums[0];
    for (int i = 1; i < nums.size(); i++) {
        int temp = maxProd;
        maxProd = max({nums[i], maxProd * nums[i], minProd * nums[i]});
        minProd = min({nums[i], temp * nums[i], minProd * nums[i]});
        result = max(result, maxProd);
    }
    return result;
}`,
    hints: ["Negative * negative = positive", "Track min and max"], timeComplexity: "O(n)", spaceComplexity: "O(1)", leetcodeNumber: 152, orderIndex: 107
  },
  {
    id: "108", title: "Word Break", slug: "word-break", difficulty: "Medium", category: "1-D Dynamic Programming",
    description: "Check if string can be segmented into dictionary words.",
    testCases: [{ input: 's = "leetcode", wordDict = ["leet","code"]', output: "true" }],
    approach: "dp[i] = true if s[0:i] can be segmented.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

bool wordBreak(string s, vector<string>& wordDict) {
    unordered_set<string> words(wordDict.begin(), wordDict.end());
    int n = s.size();
    vector<bool> dp(n + 1, false);
    dp[0] = true;
    for (int i = 1; i <= n; i++)
        for (int j = 0; j < i; j++)
            if (dp[j] && words.count(s.substr(j, i - j))) { dp[i] = true; break; }
    return dp[n];
}`,
    hints: ["Try all break points", "Check if prefix valid and suffix is word"], timeComplexity: "O(n² * m)", spaceComplexity: "O(n)", leetcodeNumber: 139, orderIndex: 108
  },
  {
    id: "109", title: "Longest Increasing Subsequence", slug: "longest-increasing-subsequence", difficulty: "Medium", category: "1-D Dynamic Programming",
    description: "Find length of longest strictly increasing subsequence.",
    testCases: [{ input: "nums = [10,9,2,5,3,7,101,18]", output: "4" }],
    approach: "Binary search with patience sorting for O(n log n).",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int lengthOfLIS(vector<int>& nums) {
    vector<int> tails;
    for (int num : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), num);
        if (it == tails.end()) tails.push_back(num);
        else *it = num;
    }
    return tails.size();
}`,
    hints: ["Binary search O(n log n)", "Maintain smallest tails"], timeComplexity: "O(n log n)", spaceComplexity: "O(n)", leetcodeNumber: 300, orderIndex: 109
  },
  {
    id: "110", title: "Partition Equal Subset Sum", slug: "partition-equal-subset-sum", difficulty: "Medium", category: "1-D Dynamic Programming",
    description: "Check if array can be partitioned into two equal sum subsets.",
    testCases: [{ input: "nums = [1,5,11,5]", output: "true" }],
    approach: "Subset sum problem. Target = total / 2. Use bitset for O(n*sum).",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

bool canPartition(vector<int>& nums) {
    int total = accumulate(nums.begin(), nums.end(), 0);
    if (total % 2 != 0) return false;
    int target = total / 2;
    vector<bool> dp(target + 1, false);
    dp[0] = true;
    for (int num : nums)
        for (int j = target; j >= num; j--)
            dp[j] = dp[j] || dp[j - num];
    return dp[target];
}`,
    hints: ["Sum must be even", "Find subset with sum = total/2"], timeComplexity: "O(n * sum)", spaceComplexity: "O(sum)", leetcodeNumber: 416, orderIndex: 110
  },

  // ==================== 2-D DYNAMIC PROGRAMMING (11 problems) ====================
  {
    id: "111", title: "Unique Paths", slug: "unique-paths", difficulty: "Medium", category: "2-D Dynamic Programming",
    description: "Count unique paths from top-left to bottom-right.",
    testCases: [{ input: "m = 3, n = 7", output: "28" }],
    approach: "dp[i][j] = dp[i-1][j] + dp[i][j-1].",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int uniquePaths(int m, int n) {
    vector<int> dp(n, 1);
    for (int i = 1; i < m; i++)
        for (int j = 1; j < n; j++)
            dp[j] += dp[j-1];
    return dp[n-1];
}`,
    hints: ["Can only move right or down", "Sum of two ways"], timeComplexity: "O(m*n)", spaceComplexity: "O(n)", leetcodeNumber: 62, orderIndex: 111
  },
  {
    id: "112", title: "Longest Common Subsequence", slug: "longest-common-subsequence", difficulty: "Medium", category: "2-D Dynamic Programming",
    description: "Find length of longest common subsequence.",
    testCases: [{ input: 'text1 = "abcde", text2 = "ace"', output: "3" }],
    approach: "dp[i][j] = dp[i-1][j-1] + 1 if match, else max(dp[i-1][j], dp[i][j-1]).",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int longestCommonSubsequence(string text1, string text2) {
    int m = text1.size(), n = text2.size();
    vector<vector<int>> dp(m+1, vector<int>(n+1, 0));
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++)
            dp[i][j] = text1[i-1] == text2[j-1] ? dp[i-1][j-1]+1 : max(dp[i-1][j], dp[i][j-1]);
    return dp[m][n];
}`,
    hints: ["Match: extend LCS", "No match: take max"], timeComplexity: "O(m*n)", spaceComplexity: "O(m*n)", leetcodeNumber: 1143, orderIndex: 112
  },
  {
    id: "113", title: "Best Time to Buy and Sell Stock with Cooldown", slug: "best-time-to-buy-and-sell-stock-with-cooldown", difficulty: "Medium", category: "2-D Dynamic Programming",
    description: "Max profit with 1-day cooldown after selling.",
    testCases: [{ input: "prices = [1,2,3,0,2]", output: "3" }],
    approach: "State machine: hold, sold, rest.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int maxProfit(vector<int>& prices) {
    int hold = INT_MIN, sold = 0, rest = 0;
    for (int p : prices) {
        int prevHold = hold;
        hold = max(hold, rest - p);
        rest = max(rest, sold);
        sold = prevHold + p;
    }
    return max(sold, rest);
}`,
    hints: ["Three states: hold, sold, rest", "Transition rules"], timeComplexity: "O(n)", spaceComplexity: "O(1)", leetcodeNumber: 309, orderIndex: 113
  },
  {
    id: "114", title: "Coin Change II", slug: "coin-change-ii", difficulty: "Medium", category: "2-D Dynamic Programming",
    description: "Count ways to make amount with given coins.",
    testCases: [{ input: "amount = 5, coins = [1,2,5]", output: "4" }],
    approach: "dp[i] += dp[i - coin] for each coin.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int change(int amount, vector<int>& coins) {
    vector<int> dp(amount + 1, 0);
    dp[0] = 1;
    for (int coin : coins)
        for (int i = coin; i <= amount; i++)
            dp[i] += dp[i - coin];
    return dp[amount];
}`,
    hints: ["Count combinations not permutations", "Iterate coins first"], timeComplexity: "O(amount * n)", spaceComplexity: "O(amount)", leetcodeNumber: 518, orderIndex: 114
  },
  {
    id: "115", title: "Target Sum", slug: "target-sum", difficulty: "Medium", category: "2-D Dynamic Programming",
    description: "Count ways to assign +/- to reach target sum.",
    testCases: [{ input: "nums = [1,1,1,1,1], target = 3", output: "5" }],
    approach: "Convert to subset sum: find subset with sum = (total + target) / 2.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int findTargetSumWays(vector<int>& nums, int target) {
    int total = accumulate(nums.begin(), nums.end(), 0);
    if ((total + target) % 2 != 0 || abs(target) > total) return 0;
    int sum = (total + target) / 2;
    vector<int> dp(sum + 1, 0);
    dp[0] = 1;
    for (int num : nums)
        for (int i = sum; i >= num; i--)
            dp[i] += dp[i - num];
    return dp[sum];
}`,
    hints: ["P - N = target, P + N = total", "P = (total + target) / 2"], timeComplexity: "O(n * sum)", spaceComplexity: "O(sum)", leetcodeNumber: 494, orderIndex: 115
  },
  {
    id: "116", title: "Interleaving String", slug: "interleaving-string", difficulty: "Medium", category: "2-D Dynamic Programming",
    description: "Check if s3 is interleaving of s1 and s2.",
    testCases: [{ input: 's1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"', output: "true" }],
    approach: "dp[i][j] = true if s1[0:i] and s2[0:j] can form s3[0:i+j].",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

bool isInterleave(string s1, string s2, string s3) {
    int m = s1.size(), n = s2.size();
    if (m + n != s3.size()) return false;
    vector<bool> dp(n + 1, false);
    for (int i = 0; i <= m; i++)
        for (int j = 0; j <= n; j++) {
            if (i == 0 && j == 0) dp[j] = true;
            else if (i == 0) dp[j] = dp[j-1] && s2[j-1] == s3[j-1];
            else if (j == 0) dp[j] = dp[j] && s1[i-1] == s3[i-1];
            else dp[j] = (dp[j] && s1[i-1]==s3[i+j-1]) || (dp[j-1] && s2[j-1]==s3[i+j-1]);
        }
    return dp[n];
}`,
    hints: ["Match char from s1 or s2", "2D DP or 1D optimized"], timeComplexity: "O(m*n)", spaceComplexity: "O(n)", leetcodeNumber: 97, orderIndex: 116
  },
  {
    id: "117", title: "Edit Distance", slug: "edit-distance", difficulty: "Medium", category: "2-D Dynamic Programming",
    description: "Find minimum operations to convert word1 to word2.",
    testCases: [{ input: 'word1 = "horse", word2 = "ros"', output: "3" }],
    approach: "dp[i][j] = min(insert, delete, replace) operations.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int minDistance(string word1, string word2) {
    int m = word1.size(), n = word2.size();
    vector<vector<int>> dp(m+1, vector<int>(n+1));
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++)
            dp[i][j] = word1[i-1]==word2[j-1] ? dp[i-1][j-1] : 1+min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]});
    return dp[m][n];
}`,
    hints: ["Insert, delete, or replace", "Classic DP"], timeComplexity: "O(m*n)", spaceComplexity: "O(m*n)", leetcodeNumber: 72, orderIndex: 117
  },
  {
    id: "118", title: "Distinct Subsequences", slug: "distinct-subsequences", difficulty: "Hard", category: "2-D Dynamic Programming",
    description: "Count distinct subsequences of s that equal t.",
    testCases: [{ input: 's = "rabbbit", t = "rabbit"', output: "3" }],
    approach: "dp[i][j] = dp[i-1][j] + (match ? dp[i-1][j-1] : 0).",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int numDistinct(string s, string t) {
    int m = s.size(), n = t.size();
    vector<unsigned long long> dp(n + 1, 0);
    dp[0] = 1;
    for (int i = 1; i <= m; i++)
        for (int j = n; j >= 1; j--)
            if (s[i-1] == t[j-1]) dp[j] += dp[j-1];
    return dp[n];
}`,
    hints: ["Skip or match", "Count all ways"], timeComplexity: "O(m*n)", spaceComplexity: "O(n)", leetcodeNumber: 115, orderIndex: 118
  },
  {
    id: "119", title: "Burst Balloons", slug: "burst-balloons", difficulty: "Hard", category: "2-D Dynamic Programming",
    description: "Find maximum coins from bursting all balloons.",
    testCases: [{ input: "nums = [3,1,5,8]", output: "167" }],
    approach: "Interval DP. dp[i][j] = max coins for bursting i to j. Last burst in range.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int maxCoins(vector<int>& nums) {
    int n = nums.size();
    vector<int> arr = {1};
    for (int x : nums) arr.push_back(x);
    arr.push_back(1);
    vector<vector<int>> dp(n+2, vector<int>(n+2, 0));
    for (int len = 1; len <= n; len++)
        for (int left = 1; left <= n-len+1; left++) {
            int right = left+len-1;
            for (int k = left; k <= right; k++)
                dp[left][right] = max(dp[left][right], dp[left][k-1]+arr[left-1]*arr[k]*arr[right+1]+dp[k+1][right]);
        }
    return dp[1][n];
}`,
    hints: ["Think of last burst, not first", "Interval DP"], timeComplexity: "O(n³)", spaceComplexity: "O(n²)", leetcodeNumber: 312, orderIndex: 119
  },
  {
    id: "120", title: "Regular Expression Matching", slug: "regular-expression-matching", difficulty: "Hard", category: "2-D Dynamic Programming",
    description: "Implement regex with . and *.",
    testCases: [{ input: 's = "aa", p = "a*"', output: "true" }],
    approach: "dp[i][j] = true if s[0:i] matches p[0:j].",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

bool isMatch(string s, string p) {
    int m = s.size(), n = p.size();
    vector<vector<bool>> dp(m+1, vector<bool>(n+1, false));
    dp[0][0] = true;
    for (int j = 2; j <= n; j++)
        if (p[j-1] == '*') dp[0][j] = dp[0][j-2];
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++) {
            if (p[j-1] == '*')
                dp[i][j] = dp[i][j-2] || ((p[j-2]=='.'||p[j-2]==s[i-1]) && dp[i-1][j]);
            else
                dp[i][j] = (p[j-1]=='.'||p[j-1]==s[i-1]) && dp[i-1][j-1];
        }
    return dp[m][n];
}`,
    hints: [". matches any", "* can match 0 or more"], timeComplexity: "O(m*n)", spaceComplexity: "O(m*n)", leetcodeNumber: 10, orderIndex: 120
  },
  {
    id: "121", title: "Maximum Subarray", slug: "maximum-subarray", difficulty: "Medium", category: "Greedy", description: "Find contiguous subarray with largest sum.", testCases: [{ input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6" }], approach: "Kadane's algorithm. Track current sum, reset if negative.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int maxSubArray(vector<int>& nums) {
    int maxSum = nums[0], currSum = nums[0];
    for (int i = 1; i < nums.size(); i++) {
        currSum = max(nums[i], currSum + nums[i]);
        maxSum = max(maxSum, currSum);
    }
    return maxSum;
}`,
    hints: ["Kadane's algorithm", "Reset if sum goes negative"], timeComplexity: "O(n)", spaceComplexity: "O(1)", leetcodeNumber: 53, orderIndex: 121
  },

  // ==================== GREEDY (remaining 7 problems) ====================
  {
    id: "122", title: "Jump Game", slug: "jump-game", difficulty: "Medium", category: "Greedy", description: "Check if you can reach the last index.", testCases: [{ input: "nums = [2,3,1,1,4]", output: "true" }, { input: "nums = [3,2,1,0,4]", output: "false" }], approach: "Track farthest reachable position.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

bool canJump(vector<int>& nums) {
    int maxReach = 0;
    for (int i = 0; i < nums.size(); i++) {
        if (i > maxReach) return false;
        maxReach = max(maxReach, i + nums[i]);
    }
    return true;
}`,
    hints: ["Track max reachable", "Fail if current pos > max"], timeComplexity: "O(n)", spaceComplexity: "O(1)", leetcodeNumber: 55, orderIndex: 122
  },
  {
    id: "123", title: "Jump Game II", slug: "jump-game-ii", difficulty: "Medium", category: "Greedy", description: "Find minimum jumps to reach end.", testCases: [{ input: "nums = [2,3,1,1,4]", output: "2" }], approach: "BFS-like approach. Track current level end and farthest reach.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int jump(vector<int>& nums) {
    int jumps = 0, end = 0, farthest = 0;
    for (int i = 0; i < (int)nums.size() - 1; i++) {
        farthest = max(farthest, i + nums[i]);
        if (i == end) { jumps++; end = farthest; }
    }
    return jumps;
}`,
    hints: ["Track current jump range", "Jump when reaching end of range"], timeComplexity: "O(n)", spaceComplexity: "O(1)", leetcodeNumber: 45, orderIndex: 123
  },
  {
    id: "124", title: "Gas Station", slug: "gas-station", difficulty: "Medium", category: "Greedy", description: "Find starting gas station for circular trip.", testCases: [{ input: "gas = [1,2,3,4,5], cost = [3,4,5,1,2]", output: "3" }], approach: "If total gas >= total cost, solution exists. Start from where tank doesn't go negative.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
    int totalTank = 0, currTank = 0, start = 0;
    for (int i = 0; i < gas.size(); i++) {
        totalTank += gas[i] - cost[i];
        currTank += gas[i] - cost[i];
        if (currTank < 0) { start = i + 1; currTank = 0; }
    }
    return totalTank >= 0 ? start : -1;
}`,
    hints: ["If total >= 0, solution exists", "Reset start when tank empty"], timeComplexity: "O(n)", spaceComplexity: "O(1)", leetcodeNumber: 134, orderIndex: 124
  },
  {
    id: "125", title: "Hand of Straights", slug: "hand-of-straights", difficulty: "Medium", category: "Greedy", description: "Check if hand can be rearranged into groups of consecutive cards.", testCases: [{ input: "hand = [1,2,3,6,2,3,4,7,8], groupSize = 3", output: "true" }], approach: "Sort and greedily form groups starting from smallest.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

bool isNStraightHand(vector<int>& hand, int groupSize) {
    if (hand.size() % groupSize != 0) return false;
    map<int, int> count;
    for (int c : hand) count[c]++;
    for (auto& [card, cnt] : count) {
        if (cnt > 0) {
            for (int i = groupSize - 1; i >= 0; i--) {
                count[card + i] -= cnt;
                if (count[card + i] < 0) return false;
            }
        }
    }
    return true;
}`,
    hints: ["Sort and use greedy", "Start from smallest available"], timeComplexity: "O(n log n)", spaceComplexity: "O(n)", leetcodeNumber: 846, orderIndex: 125
  },
  {
    id: "126", title: "Merge Triplets to Form Target Triplet", slug: "merge-triplets-to-form-target", difficulty: "Medium", category: "Greedy", description: "Check if target triplet can be formed by merging triplets.", testCases: [{ input: "triplets = [[2,5,3],[1,8,4],[1,7,5]], target = [2,7,5]", output: "true" }], approach: "Only use triplets where no value exceeds target.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

bool mergeTriplets(vector<vector<int>>& triplets, vector<int>& target) {
    unordered_set<int> good;
    for (auto& t : triplets) {
        if (t[0] <= target[0] && t[1] <= target[1] && t[2] <= target[2]) {
            if (t[0] == target[0]) good.insert(0);
            if (t[1] == target[1]) good.insert(1);
            if (t[2] == target[2]) good.insert(2);
        }
    }
    return good.size() == 3;
}`,
    hints: ["Filter valid triplets", "Check if all targets reachable"], timeComplexity: "O(n)", spaceComplexity: "O(1)", leetcodeNumber: 1899, orderIndex: 126
  },
  {
    id: "127", title: "Partition Labels", slug: "partition-labels", difficulty: "Medium", category: "Greedy", description: "Partition string so each letter appears in at most one part.", testCases: [{ input: 's = "ababcbacadefegdehijhklij"', output: "[9,7,8]" }], approach: "Track last occurrence of each char. Extend partition.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> partitionLabels(string s) {
    int last[26] = {};
    for (int i = 0; i < s.size(); i++) last[s[i]-'a'] = i;
    vector<int> result;
    int start = 0, end = 0;
    for (int i = 0; i < s.size(); i++) {
        end = max(end, last[s[i]-'a']);
        if (i == end) { result.push_back(end - start + 1); start = i + 1; }
    }
    return result;
}`,
    hints: ["Track last occurrence", "Extend partition to cover all chars"], timeComplexity: "O(n)", spaceComplexity: "O(1)", leetcodeNumber: 763, orderIndex: 127
  },
  {
    id: "128", title: "Valid Parenthesis String", slug: "valid-parenthesis-string", difficulty: "Medium", category: "Greedy", description: "Check if string with (, ), and * is valid.", testCases: [{ input: 's = "(*))"', output: "true" }], approach: "Track range of possible open counts.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

bool checkValidString(string s) {
    int lo = 0, hi = 0;
    for (char c : s) {
        if (c == '(') { lo++; hi++; }
        else if (c == ')') { lo--; hi--; }
        else { lo--; hi++; }
        if (hi < 0) return false;
        lo = max(lo, 0);
    }
    return lo == 0;
}`,
    hints: ["Track min/max open count", "* can be any of three"], timeComplexity: "O(n)", spaceComplexity: "O(1)", leetcodeNumber: 678, orderIndex: 128
  },

  // ==================== INTERVALS (6 problems) ====================
  {
    id: "129", title: "Insert Interval", slug: "insert-interval", difficulty: "Medium", category: "Intervals", description: "Insert new interval into sorted intervals, merging if needed.", testCases: [{ input: "intervals = [[1,3],[6,9]], newInterval = [2,5]", output: "[[1,5],[6,9]]" }], approach: "Add non-overlapping before, merge overlapping, add remaining.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
    vector<vector<int>> result;
    int i = 0, n = intervals.size();
    while (i < n && intervals[i][1] < newInterval[0]) result.push_back(intervals[i++]);
    while (i < n && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = min(newInterval[0], intervals[i][0]);
        newInterval[1] = max(newInterval[1], intervals[i][1]);
        i++;
    }
    result.push_back(newInterval);
    while (i < n) result.push_back(intervals[i++]);
    return result;
}`,
    hints: ["Three phases: before, merge, after", "Merge overlapping"], timeComplexity: "O(n)", spaceComplexity: "O(n)", leetcodeNumber: 57, orderIndex: 129
  },
  {
    id: "130", title: "Merge Intervals", slug: "merge-intervals", difficulty: "Medium", category: "Intervals", description: "Merge overlapping intervals.", testCases: [{ input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" }], approach: "Sort by start. Merge if overlap.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> merge(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end());
    vector<vector<int>> result = {intervals[0]};
    for (int i = 1; i < intervals.size(); i++) {
        if (intervals[i][0] <= result.back()[1])
            result.back()[1] = max(result.back()[1], intervals[i][1]);
        else result.push_back(intervals[i]);
    }
    return result;
}`,
    hints: ["Sort by start", "Merge if overlapping"], timeComplexity: "O(n log n)", spaceComplexity: "O(n)", leetcodeNumber: 56, orderIndex: 130
  },
  {
    id: "131", title: "Non-overlapping Intervals", slug: "non-overlapping-intervals", difficulty: "Medium", category: "Intervals", description: "Find minimum intervals to remove.", testCases: [{ input: "intervals = [[1,2],[2,3],[3,4],[1,3]]", output: "1" }], approach: "Sort by end. Keep non-overlapping.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int eraseOverlapIntervals(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end(), [](auto& a, auto& b) { return a[1] < b[1]; });
    int count = 0, end = INT_MIN;
    for (auto& iv : intervals) {
        if (iv[0] >= end) end = iv[1];
        else count++;
    }
    return count;
}`,
    hints: ["Sort by end time", "Greedy: keep earliest ending"], timeComplexity: "O(n log n)", spaceComplexity: "O(1)", leetcodeNumber: 435, orderIndex: 131
  },
  {
    id: "132", title: "Meeting Rooms", slug: "meeting-rooms", difficulty: "Easy", category: "Intervals", description: "Check if one person can attend all meetings.", testCases: [{ input: "intervals = [[0,30],[5,10],[15,20]]", output: "false" }], approach: "Sort by start. Check if any overlap.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

bool canAttendMeetings(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end());
    for (int i = 1; i < intervals.size(); i++)
        if (intervals[i][0] < intervals[i-1][1]) return false;
    return true;
}`,
    hints: ["Sort by start", "Check consecutive overlap"], timeComplexity: "O(n log n)", spaceComplexity: "O(1)", leetcodeNumber: 252, orderIndex: 132
  },
  {
    id: "133", title: "Meeting Rooms II", slug: "meeting-rooms-ii", difficulty: "Medium", category: "Intervals", description: "Find minimum meeting rooms required.", testCases: [{ input: "intervals = [[0,30],[5,10],[15,20]]", output: "2" }], approach: "Sort starts and ends. Track concurrent meetings.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int minMeetingRooms(vector<vector<int>>& intervals) {
    vector<int> starts, ends;
    for (auto& iv : intervals) { starts.push_back(iv[0]); ends.push_back(iv[1]); }
    sort(starts.begin(), starts.end());
    sort(ends.begin(), ends.end());
    int rooms = 0, endPtr = 0;
    for (int s : starts) {
        if (s < ends[endPtr]) rooms++;
        else endPtr++;
    }
    return rooms;
}`,
    hints: ["Track starts and ends separately", "Count concurrent meetings"], timeComplexity: "O(n log n)", spaceComplexity: "O(n)", leetcodeNumber: 253, orderIndex: 133
  },
  {
    id: "134", title: "Minimum Interval to Include Each Query", slug: "minimum-interval-to-include-each-query", difficulty: "Hard", category: "Intervals", description: "Find smallest interval containing each query.", testCases: [{ input: "intervals = [[1,4],[2,4],[3,6],[4,4]], queries = [2,3,4,5]", output: "[3,3,1,4]" }], approach: "Sort intervals and queries. Use min heap by interval size.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> minInterval(vector<vector<int>>& intervals, vector<int>& queries) {
    sort(intervals.begin(), intervals.end());
    vector<pair<int,int>> sortedQ;
    for (int i = 0; i < queries.size(); i++) sortedQ.push_back({queries[i], i});
    sort(sortedQ.begin(), sortedQ.end());
    vector<int> result(queries.size(), -1);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    int j = 0;
    for (auto& [q, idx] : sortedQ) {
        while (j < intervals.size() && intervals[j][0] <= q) {
            pq.push({intervals[j][1]-intervals[j][0]+1, intervals[j][1]});
            j++;
        }
        while (!pq.empty() && pq.top().second < q) pq.pop();
        if (!pq.empty()) result[idx] = pq.top().first;
    }
    return result;
}`,
    hints: ["Sort both by left endpoint", "Use min heap by size"], timeComplexity: "O((n+q) log n)", spaceComplexity: "O(n+q)", leetcodeNumber: 1851, orderIndex: 134
  },

  // ==================== MATH & GEOMETRY (8 problems) ====================
  {
    id: "135", title: "Rotate Image", slug: "rotate-image", difficulty: "Medium", category: "Math & Geometry", description: "Rotate matrix 90 degrees clockwise in-place.", testCases: [{ input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[[7,4,1],[8,5,2],[9,6,3]]" }], approach: "Transpose then reverse each row.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

void rotate(vector<vector<int>>& matrix) {
    int n = matrix.size();
    for (int i = 0; i < n; i++)
        for (int j = i+1; j < n; j++)
            swap(matrix[i][j], matrix[j][i]);
    for (auto& row : matrix)
        reverse(row.begin(), row.end());
}`,
    hints: ["Transpose + reverse", "In-place swaps"], timeComplexity: "O(n²)", spaceComplexity: "O(1)", leetcodeNumber: 48, orderIndex: 135
  },
  {
    id: "136", title: "Spiral Matrix", slug: "spiral-matrix", difficulty: "Medium", category: "Math & Geometry", description: "Return elements in spiral order.", testCases: [{ input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[1,2,3,6,9,8,7,4,5]" }], approach: "Track boundaries. Traverse right, down, left, up.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> spiralOrder(vector<vector<int>>& matrix) {
    vector<int> result;
    int top = 0, bottom = matrix.size()-1, left = 0, right = matrix[0].size()-1;
    while (top <= bottom && left <= right) {
        for (int i = left; i <= right; i++) result.push_back(matrix[top][i]); top++;
        for (int i = top; i <= bottom; i++) result.push_back(matrix[i][right]); right--;
        if (top <= bottom) { for (int i = right; i >= left; i--) result.push_back(matrix[bottom][i]); bottom--; }
        if (left <= right) { for (int i = bottom; i >= top; i--) result.push_back(matrix[i][left]); left++; }
    }
    return result;
}`,
    hints: ["Track four boundaries", "Shrink after each direction"], timeComplexity: "O(m*n)", spaceComplexity: "O(1)", leetcodeNumber: 54, orderIndex: 136
  },
  {
    id: "137", title: "Set Matrix Zeroes", slug: "set-matrix-zeroes", difficulty: "Medium", category: "Math & Geometry", description: "Set entire row and column to 0 if element is 0.", testCases: [{ input: "matrix = [[1,1,1],[1,0,1],[1,1,1]]", output: "[[1,0,1],[0,0,0],[1,0,1]]" }], approach: "Use first row/column as markers.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

void setZeroes(vector<vector<int>>& matrix) {
    int m = matrix.size(), n = matrix[0].size();
    bool firstRow = false, firstCol = false;
    for (int j = 0; j < n; j++) if (matrix[0][j] == 0) firstRow = true;
    for (int i = 0; i < m; i++) if (matrix[i][0] == 0) firstCol = true;
    for (int i = 1; i < m; i++) for (int j = 1; j < n; j++)
        if (matrix[i][j] == 0) { matrix[i][0] = 0; matrix[0][j] = 0; }
    for (int i = 1; i < m; i++) for (int j = 1; j < n; j++)
        if (matrix[i][0] == 0 || matrix[0][j] == 0) matrix[i][j] = 0;
    if (firstRow) for (int j = 0; j < n; j++) matrix[0][j] = 0;
    if (firstCol) for (int i = 0; i < m; i++) matrix[i][0] = 0;
}`,
    hints: ["Use first row/col as markers", "Handle first row/col separately"], timeComplexity: "O(m*n)", spaceComplexity: "O(1)", leetcodeNumber: 73, orderIndex: 137
  },
  {
    id: "138", title: "Happy Number", slug: "happy-number", difficulty: "Easy", category: "Math & Geometry", description: "Check if number is happy.", testCases: [{ input: "n = 19", output: "true" }, { input: "n = 2", output: "false" }], approach: "Floyd's cycle detection.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

bool isHappy(int n) {
    auto sumSq = [](int num) {
        int sum = 0;
        while (num > 0) { int d = num % 10; sum += d*d; num /= 10; }
        return sum;
    };
    int slow = n, fast = n;
    do { slow = sumSq(slow); fast = sumSq(sumSq(fast)); } while (slow != fast);
    return slow == 1;
}`,
    hints: ["Detect cycle", "Fast and slow pointers"], timeComplexity: "O(log n)", spaceComplexity: "O(1)", leetcodeNumber: 202, orderIndex: 138
  },
  {
    id: "139", title: "Plus One", slug: "plus-one", difficulty: "Easy", category: "Math & Geometry", description: "Add one to number represented as array of digits.", testCases: [{ input: "digits = [1,2,3]", output: "[1,2,4]" }, { input: "digits = [9,9,9]", output: "[1,0,0,0]" }], approach: "Add from right. Handle carry.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> plusOne(vector<int>& digits) {
    for (int i = digits.size()-1; i >= 0; i--) {
        if (digits[i] < 9) { digits[i]++; return digits; }
        digits[i] = 0;
    }
    digits.insert(digits.begin(), 1);
    return digits;
}`,
    hints: ["Start from right", "Handle all 9s case"], timeComplexity: "O(n)", spaceComplexity: "O(1)", leetcodeNumber: 66, orderIndex: 139
  },
  {
    id: "140", title: "Pow(x, n)", slug: "pow-x-n", difficulty: "Medium", category: "Math & Geometry", description: "Implement power function.", testCases: [{ input: "x = 2.0, n = 10", output: "1024.0" }, { input: "x = 2.0, n = -2", output: "0.25" }], approach: "Binary exponentiation.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

double myPow(double x, int n) {
    double result = 1.0;
    long long nn = abs((long long)n);
    while (nn > 0) {
        if (nn & 1) result *= x;
        x *= x;
        nn >>= 1;
    }
    return n < 0 ? 1.0 / result : result;
}`,
    hints: ["Binary exponentiation", "Handle negative n"], timeComplexity: "O(log n)", spaceComplexity: "O(1)", leetcodeNumber: 50, orderIndex: 140
  },
  {
    id: "141", title: "Multiply Strings", slug: "multiply-strings", difficulty: "Medium", category: "Math & Geometry", description: "Multiply two numbers represented as strings.", testCases: [{ input: 'num1 = "123", num2 = "456"', output: '"56088"' }], approach: "Grade school multiplication.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

string multiply(string num1, string num2) {
    if (num1 == "0" || num2 == "0") return "0";
    int m = num1.size(), n = num2.size();
    vector<int> result(m + n, 0);
    for (int i = m-1; i >= 0; i--)
        for (int j = n-1; j >= 0; j--) {
            int mul = (num1[i]-'0') * (num2[j]-'0');
            int p1 = i+j, p2 = i+j+1;
            int sum = mul + result[p2];
            result[p2] = sum % 10;
            result[p1] += sum / 10;
        }
    string str;
    for (int d : result) if (!(str.empty() && d == 0)) str += to_string(d);
    return str.empty() ? "0" : str;
}`,
    hints: ["Position i*j goes to i+j+1", "Handle carry"], timeComplexity: "O(m*n)", spaceComplexity: "O(m+n)", leetcodeNumber: 43, orderIndex: 141
  },
  {
    id: "142", title: "Detect Squares", slug: "detect-squares", difficulty: "Medium", category: "Math & Geometry", description: "Design data structure to detect axis-aligned squares.", testCases: [{ input: "add([3,10]), add([11,2]), add([3,2]), count([11,10])", output: "1" }], approach: "Store point counts. For query, try all diagonal points.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

class DetectSquares {
    map<pair<int,int>, int> points;
public:
    void add(vector<int> point) { points[{point[0], point[1]}]++; }
    int count(vector<int> point) {
        int px = point[0], py = point[1], result = 0;
        for (auto& [p, cnt] : points) {
            int x = p.first, y = p.second;
            if (abs(px-x) != abs(py-y) || x == px) continue;
            result += cnt * points[{x, py}] * points[{px, y}];
        }
        return result;
    }
};`,
    hints: ["Fix diagonal, find other two corners", "Count point frequencies"], timeComplexity: "O(n) count", spaceComplexity: "O(n)", leetcodeNumber: 2013, orderIndex: 142
  },

  // ==================== BIT MANIPULATION (7 problems) ====================
  {
    id: "143", title: "Single Number", slug: "single-number", difficulty: "Easy", category: "Bit Manipulation", description: "Find element that appears once (others appear twice).", testCases: [{ input: "nums = [2,2,1]", output: "1" }, { input: "nums = [4,1,2,1,2]", output: "4" }], approach: "XOR all elements. Duplicates cancel out.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int singleNumber(vector<int>& nums) {
    int result = 0;
    for (int n : nums) result ^= n;
    return result;
}`,
    hints: ["a XOR a = 0", "a XOR 0 = a"], timeComplexity: "O(n)", spaceComplexity: "O(1)", leetcodeNumber: 136, orderIndex: 143
  },
  {
    id: "144", title: "Number of 1 Bits", slug: "number-of-1-bits", difficulty: "Easy", category: "Bit Manipulation", description: "Count number of 1 bits in integer.", testCases: [{ input: "n = 11", output: "3" }], approach: "n & (n-1) removes rightmost 1 bit.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int hammingWeight(uint32_t n) {
    int count = 0;
    while (n) { n &= (n-1); count++; }
    return count;
}`,
    hints: ["n & (n-1) removes last 1", "Count iterations"], timeComplexity: "O(k)", spaceComplexity: "O(1)", leetcodeNumber: 191, orderIndex: 144
  },
  {
    id: "145", title: "Counting Bits", slug: "counting-bits", difficulty: "Easy", category: "Bit Manipulation", description: "Count 1 bits for each number 0 to n.", testCases: [{ input: "n = 5", output: "[0,1,1,2,1,2]" }], approach: "dp[i] = dp[i >> 1] + (i & 1).",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> countBits(int n) {
    vector<int> result(n + 1, 0);
    for (int i = 1; i <= n; i++)
        result[i] = result[i >> 1] + (i & 1);
    return result;
}`,
    hints: ["Use previous results", "i/2 + last bit"], timeComplexity: "O(n)", spaceComplexity: "O(n)", leetcodeNumber: 338, orderIndex: 145
  },
  {
    id: "146", title: "Reverse Bits", slug: "reverse-bits", difficulty: "Easy", category: "Bit Manipulation", description: "Reverse bits of a 32-bit unsigned integer.", testCases: [{ input: "n = 43261596", output: "964176192" }], approach: "Extract bits from right, build result from left.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

uint32_t reverseBits(uint32_t n) {
    uint32_t result = 0;
    for (int i = 0; i < 32; i++) {
        result = (result << 1) | (n & 1);
        n >>= 1;
    }
    return result;
}`,
    hints: ["Shift result left, add rightmost bit of n", "32 iterations"], timeComplexity: "O(1)", spaceComplexity: "O(1)", leetcodeNumber: 190, orderIndex: 146
  },
  {
    id: "147", title: "Missing Number", slug: "missing-number", difficulty: "Easy", category: "Bit Manipulation", description: "Find missing number in [0, n].", testCases: [{ input: "nums = [3,0,1]", output: "2" }], approach: "XOR all indices and values. Missing number remains.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int missingNumber(vector<int>& nums) {
    int result = nums.size();
    for (int i = 0; i < nums.size(); i++)
        result ^= i ^ nums[i];
    return result;
}`,
    hints: ["XOR cancels pairs", "Include n in initial"], timeComplexity: "O(n)", spaceComplexity: "O(1)", leetcodeNumber: 268, orderIndex: 147
  },
  {
    id: "148", title: "Sum of Two Integers", slug: "sum-of-two-integers", difficulty: "Medium", category: "Bit Manipulation", description: "Add two integers without + or -.", testCases: [{ input: "a = 1, b = 2", output: "3" }], approach: "XOR for sum without carry, AND + shift for carry.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int getSum(int a, int b) {
    while (b != 0) {
        unsigned carry = (unsigned)(a & b) << 1;
        a = a ^ b;
        b = carry;
    }
    return a;
}`,
    hints: ["XOR = sum without carry", "AND << 1 = carry"], timeComplexity: "O(1)", spaceComplexity: "O(1)", leetcodeNumber: 371, orderIndex: 148
  },
  {
    id: "149", title: "Reverse Integer", slug: "reverse-integer", difficulty: "Medium", category: "Bit Manipulation", description: "Reverse digits of an integer. Return 0 on overflow.", testCases: [{ input: "x = 123", output: "321" }, { input: "x = -123", output: "-321" }], approach: "Extract digits from right, build reversed number. Check overflow.",
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int reverse(int x) {
    int result = 0;
    while (x != 0) {
        int digit = x % 10;
        x /= 10;
        if (result > INT_MAX/10 || (result == INT_MAX/10 && digit > 7)) return 0;
        if (result < INT_MIN/10 || (result == INT_MIN/10 && digit < -8)) return 0;
        result = result * 10 + digit;
    }
    return result;
}`,
    hints: ["Check overflow before adding", "Handle negative"], timeComplexity: "O(log x)", spaceComplexity: "O(1)", leetcodeNumber: 7, orderIndex: 149
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
    solutionCode: `#include <bits/stdc++.h>
using namespace std;

int numTrees(int n) {
    vector<int> dp(n + 1, 0);
    dp[0] = 1; dp[1] = 1;
    for (int i = 2; i <= n; i++)
        for (int j = 1; j <= i; j++)
            dp[i] += dp[j-1] * dp[i-j];
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
