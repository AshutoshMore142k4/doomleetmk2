// Striver's SDE Sheet - Complete 191 Problems organized by Topic/Day
export interface StriverProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  description: string;
  approach: string;
  solutionCode: string;
  hints: string[];
  timeComplexity: string;
  spaceComplexity: string;
  leetcodeNumber?: number;
}

export interface StriverTopic {
  name: string;
  day: number;
  problems: StriverProblem[];
}

export const striverTopics: StriverTopic[] = [
  // ===================== DAY 1: Arrays =====================
  {
    name: "Arrays",
    day: 1,
    problems: [
      {
        id: "s1",
        title: "Sort an array of 0s, 1s, and 2s",
        difficulty: "Medium",
        topic: "Arrays",
        description: "Given an array consisting of only 0s, 1s, and 2s. Sort the array in-place without using any sorting algorithm.",
        approach: "Use the Dutch National Flag algorithm by Dijkstra. Maintain three pointers: low, mid, and high. Elements from 0 to low-1 are 0, low to mid-1 are 1, and high+1 to end are 2. Traverse with mid pointer and swap accordingly.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

void sortColors(vector<int>& nums) {
    int low = 0, mid = 0, high = nums.size() - 1;
    while (mid <= high) {
        if (nums[mid] == 0) {
            swap(nums[low], nums[mid]);
            low++;
            mid++;
        } else if (nums[mid] == 1) {
            mid++;
        } else {
            swap(nums[mid], nums[high]);
            high--;
        }
    }
}`,
        hints: ["Think of Dutch National Flag problem", "Use three pointers: low, mid, high"],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        leetcodeNumber: 75
      },
      {
        id: "s2",
        title: "Repeat and Missing Number",
        difficulty: "Medium",
        topic: "Arrays",
        description: "Given an unsorted array of size n. Array elements are in the range from 1 to n. One number is missing and one number occurs twice. Find both numbers.",
        approach: "Use mathematical approach: Calculate sum and sum of squares. Let x be repeating and y be missing. x-y = S - Sn, x^2 - y^2 = S2 - S2n. Solve both equations to find x and y.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> findMissingRepeating(vector<int>& arr) {
    long long n = arr.size();
    long long S = 0, S2 = 0;
    long long Sn = n * (n + 1) / 2;
    long long S2n = n * (n + 1) * (2 * n + 1) / 6;
    
    for (int i = 0; i < n; i++) {
        S += arr[i];
        S2 += (long long)arr[i] * arr[i];
    }
    
    long long val1 = S - Sn;   // x - y
    long long val2 = S2 - S2n; // x^2 - y^2
    if (val1 == 0) return {-1, -1}; // no repeating/missing
    val2 = val2 / val1;        // x + y
    
    long long x = (val1 + val2) / 2; // repeating
    long long y = x - val1;          // missing
    
    return {(int)x, (int)y};
}`,
        hints: ["Use sum and sum of squares formulas", "Set up two equations with two unknowns"],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)"
      },
      {
        id: "s3",
        title: "Merge Overlapping Intervals",
        difficulty: "Medium",
        topic: "Arrays",
        description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals.",
        approach: "Sort intervals by start time. Iterate through and for each interval, if it overlaps with the last merged interval (start <= last end), merge them by updating the end. Otherwise, add it as a new interval.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> merge(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end());
    vector<vector<int>> merged;
    
    for (auto& interval : intervals) {
        if (merged.empty() || merged.back()[1] < interval[0]) {
            merged.push_back(interval);
        } else {
            merged.back()[1] = max(merged.back()[1], interval[1]);
        }
    }
    return merged;
}`,
        hints: ["Sort by start time first", "Compare current interval's start with previous interval's end"],
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        leetcodeNumber: 56
      },
      {
        id: "s4",
        title: "Set Matrix Zeroes",
        difficulty: "Medium",
        topic: "Arrays",
        description: "Given an m x n integer matrix, if an element is 0, set its entire row and column to 0. Do it in-place.",
        approach: "Use first row and first column as markers. First check if first row/col need to be zeroed. Then mark rows and cols using first row/col. Then zero out cells based on markers. Finally handle first row/col.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

void setZeroes(vector<vector<int>>& matrix) {
    int m = matrix.size(), n = matrix[0].size();
    bool firstRow = false, firstCol = false;
    
    for (int i = 0; i < m; i++)
        if (matrix[i][0] == 0) firstCol = true;
    for (int j = 0; j < n; j++)
        if (matrix[0][j] == 0) firstRow = true;
    
    for (int i = 1; i < m; i++)
        for (int j = 1; j < n; j++)
            if (matrix[i][j] == 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
    
    for (int i = 1; i < m; i++)
        for (int j = 1; j < n; j++)
            if (matrix[i][0] == 0 || matrix[0][j] == 0)
                matrix[i][j] = 0;
    
    if (firstCol)
        for (int i = 0; i < m; i++) matrix[i][0] = 0;
    if (firstRow)
        for (int j = 0; j < n; j++) matrix[0][j] = 0;
}`,
        hints: ["Use the matrix itself to store which rows/cols need zeroing", "Handle first row and column separately"],
        timeComplexity: "O(m*n)",
        spaceComplexity: "O(1)",
        leetcodeNumber: 73
      },
      {
        id: "s5",
        title: "Pascal's Triangle",
        difficulty: "Easy",
        topic: "Arrays",
        description: "Given an integer numRows, return the first numRows of Pascal's triangle.",
        approach: "Build row by row. Each element is the sum of the two elements above it. The first and last element of each row is 1.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> generate(int numRows) {
    vector<vector<int>> triangle;
    for (int i = 0; i < numRows; i++) {
        vector<int> row(i + 1, 1);
        for (int j = 1; j < i; j++) {
            row[j] = triangle[i-1][j-1] + triangle[i-1][j];
        }
        triangle.push_back(row);
    }
    return triangle;
}`,
        hints: ["Each element = sum of two elements above", "First and last elements are always 1"],
        timeComplexity: "O(n²)",
        spaceComplexity: "O(n²)",
        leetcodeNumber: 118
      },
      {
        id: "s6",
        title: "Next Permutation",
        difficulty: "Medium",
        topic: "Arrays",
        description: "Implement next permutation, which rearranges numbers into the lexicographically next greater permutation. If not possible, rearrange to lowest possible order.",
        approach: "1. Find the largest index i such that nums[i] < nums[i+1] from right. 2. Find the largest index j such that nums[i] < nums[j]. 3. Swap nums[i] and nums[j]. 4. Reverse the suffix starting at nums[i+1].",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

void nextPermutation(vector<int>& nums) {
    int n = nums.size(), i = n - 2;
    
    while (i >= 0 && nums[i] >= nums[i + 1]) i--;
    
    if (i >= 0) {
        int j = n - 1;
        while (nums[j] <= nums[i]) j--;
        swap(nums[i], nums[j]);
    }
    
    reverse(nums.begin() + i + 1, nums.end());
}`,
        hints: ["Find the first decreasing element from the right", "Find the next greater element and swap, then reverse the suffix"],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        leetcodeNumber: 31
      }
    ]
  },
  // ===================== DAY 2: Arrays Part-II =====================
  {
    name: "Arrays Part-II",
    day: 2,
    problems: [
      {
        id: "s7",
        title: "Stock Buy and Sell",
        difficulty: "Easy",
        topic: "Arrays Part-II",
        description: "You are given an array prices where prices[i] is the price of a given stock on the ith day. Find the maximum profit you can achieve by buying on one day and selling on another later day.",
        approach: "Track the minimum price seen so far. For each day, calculate profit if we sell today and update max profit.",
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
        hints: ["Track minimum price so far", "Calculate profit at each step"],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        leetcodeNumber: 121
      },
      {
        id: "s8",
        title: "Rotate Matrix / Image",
        difficulty: "Medium",
        topic: "Arrays Part-II",
        description: "You are given an n x n 2D matrix. Rotate the image by 90 degrees clockwise in-place.",
        approach: "First transpose the matrix (swap matrix[i][j] with matrix[j][i]), then reverse each row.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

void rotate(vector<vector<int>>& matrix) {
    int n = matrix.size();
    // Transpose
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++)
            swap(matrix[i][j], matrix[j][i]);
    // Reverse each row
    for (int i = 0; i < n; i++)
        reverse(matrix[i].begin(), matrix[i].end());
}`,
        hints: ["Transpose + Reverse = 90° rotation", "Think about what happens to indices"],
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        leetcodeNumber: 48
      },
      {
        id: "s9",
        title: "Merge Sorted Arrays",
        difficulty: "Easy",
        topic: "Arrays Part-II",
        description: "Given two sorted arrays, merge them into a single sorted array without using extra space.",
        approach: "Start from the end of both arrays. Compare elements and place the larger one at the end of the first array. Use three pointers: one for each array and one for the position in the result.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
    int i = m - 1, j = n - 1, k = m + n - 1;
    while (i >= 0 && j >= 0) {
        if (nums1[i] > nums2[j]) {
            nums1[k--] = nums1[i--];
        } else {
            nums1[k--] = nums2[j--];
        }
    }
    while (j >= 0) {
        nums1[k--] = nums2[j--];
    }
}`,
        hints: ["Start filling from the end", "No extra space needed if you fill from back"],
        timeComplexity: "O(m+n)",
        spaceComplexity: "O(1)",
        leetcodeNumber: 88
      },
      {
        id: "s10",
        title: "Find the Duplicate Number",
        difficulty: "Medium",
        topic: "Arrays Part-II",
        description: "Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive. There is only one repeated number, find it without modifying the array.",
        approach: "Use Floyd's Tortoise and Hare (Cycle Detection). Treat array values as pointers forming a linked list. Find the cycle intersection, then find the cycle entrance which is the duplicate.",
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
        hints: ["Think of it as a linked list cycle problem", "Floyd's cycle detection works here"],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        leetcodeNumber: 287
      },
      {
        id: "s11",
        title: "Count Inversions",
        difficulty: "Hard",
        topic: "Arrays Part-II",
        description: "Given an array of N integers, count the number of inversions. An inversion is a pair (i, j) such that i < j and arr[i] > arr[j].",
        approach: "Use modified merge sort. During the merge step, when an element from the right half is placed before elements from the left half, all remaining elements in the left half form inversions with it.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

long long mergeCount(vector<int>& arr, int l, int mid, int r) {
    vector<int> temp;
    int left = l, right = mid + 1;
    long long cnt = 0;
    
    while (left <= mid && right <= r) {
        if (arr[left] <= arr[right]) {
            temp.push_back(arr[left++]);
        } else {
            cnt += (mid - left + 1);
            temp.push_back(arr[right++]);
        }
    }
    while (left <= mid) temp.push_back(arr[left++]);
    while (right <= r) temp.push_back(arr[right++]);
    
    for (int i = l; i <= r; i++) arr[i] = temp[i - l];
    return cnt;
}

long long mergeSortCount(vector<int>& arr, int l, int r) {
    long long cnt = 0;
    if (l < r) {
        int mid = (l + r) / 2;
        cnt += mergeSortCount(arr, l, mid);
        cnt += mergeSortCount(arr, mid + 1, r);
        cnt += mergeCount(arr, l, mid, r);
    }
    return cnt;
}`,
        hints: ["Modified merge sort", "Count inversions during the merge step"],
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)"
      },
      {
        id: "s12",
        title: "Count Reverse Pairs",
        difficulty: "Hard",
        topic: "Arrays Part-II",
        description: "Given an integer array nums, return the number of reverse pairs. A reverse pair is a pair (i, j) where i < j and nums[i] > 2 * nums[j].",
        approach: "Similar to count inversions but with a modified condition. Use merge sort and count pairs where nums[i] > 2*nums[j] before merging.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

int countPairs(vector<int>& nums, int low, int mid, int high) {
    int right = mid + 1, cnt = 0;
    for (int i = low; i <= mid; i++) {
        while (right <= high && (long long)nums[i] > 2LL * nums[right])
            right++;
        cnt += (right - (mid + 1));
    }
    return cnt;
}

int mergeSort(vector<int>& nums, int low, int high) {
    int cnt = 0;
    if (low >= high) return cnt;
    int mid = (low + high) / 2;
    cnt += mergeSort(nums, low, mid);
    cnt += mergeSort(nums, mid + 1, high);
    cnt += countPairs(nums, low, mid, high);
    
    // Standard merge
    vector<int> temp;
    int left = low, right = mid + 1;
    while (left <= mid && right <= high) {
        if (nums[left] <= nums[right]) temp.push_back(nums[left++]);
        else temp.push_back(nums[right++]);
    }
    while (left <= mid) temp.push_back(nums[left++]);
    while (right <= high) temp.push_back(nums[right++]);
    for (int i = low; i <= high; i++) nums[i] = temp[i - low];
    
    return cnt;
}

int reversePairs(vector<int>& nums) {
    if (nums.empty()) return 0;
    return mergeSort(nums, 0, nums.size() - 1);
}`,
        hints: ["Modified merge sort with separate counting step", "Count before merging"],
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        leetcodeNumber: 493
      }
    ]
  },
  // ===================== DAY 3: Arrays Part-III =====================
  {
    name: "Arrays Part-III",
    day: 3,
    problems: [
      {
        id: "s13",
        title: "Search in a 2D Matrix",
        difficulty: "Medium",
        topic: "Arrays Part-III",
        description: "Write an efficient algorithm that searches for a value target in an m x n integer matrix. Integers in each row are sorted. The first integer of each row is greater than the last integer of the previous row.",
        approach: "Treat the 2D matrix as a 1D sorted array. Use binary search where the index maps to row = mid/n and col = mid%n.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

bool searchMatrix(vector<vector<int>>& matrix, int target) {
    int m = matrix.size(), n = matrix[0].size();
    int low = 0, high = m * n - 1;
    
    while (low <= high) {
        int mid = (low + high) / 2;
        int val = matrix[mid / n][mid % n];
        if (val == target) return true;
        else if (val < target) low = mid + 1;
        else high = mid - 1;
    }
    return false;
}`,
        hints: ["Treat the matrix as a flat sorted array", "Use binary search with index mapping"],
        timeComplexity: "O(log(m*n))",
        spaceComplexity: "O(1)",
        leetcodeNumber: 74
      },
      {
        id: "s14",
        title: "Pow(x, n)",
        difficulty: "Medium",
        topic: "Arrays Part-III",
        description: "Implement pow(x, n), which calculates x raised to the power n.",
        approach: "Use binary exponentiation. If n is even, x^n = (x^(n/2))^2. If n is odd, x^n = x * x^(n-1). Handle negative exponents by taking reciprocal.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

double myPow(double x, int n) {
    double ans = 1.0;
    long long nn = n;
    if (nn < 0) nn = -nn;
    
    while (nn > 0) {
        if (nn % 2 == 1) {
            ans *= x;
            nn--;
        } else {
            x *= x;
            nn /= 2;
        }
    }
    return n < 0 ? 1.0 / ans : ans;
}`,
        hints: ["Use binary exponentiation for O(log n)", "Handle negative exponent separately"],
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        leetcodeNumber: 50
      },
      {
        id: "s15",
        title: "Majority Element (>n/2)",
        difficulty: "Easy",
        topic: "Arrays Part-III",
        description: "Given an array nums of size n, return the majority element. The majority element is the element that appears more than ⌊n / 2⌋ times.",
        approach: "Use Moore's Voting Algorithm. Maintain a candidate and count. Traverse the array: if count is 0, set current element as candidate. If current equals candidate, increment count, else decrement.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

int majorityElement(vector<int>& nums) {
    int count = 0, candidate = 0;
    for (int num : nums) {
        if (count == 0) candidate = num;
        count += (num == candidate) ? 1 : -1;
    }
    return candidate;
}`,
        hints: ["Moore's Voting Algorithm", "The majority element will survive the cancellation process"],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        leetcodeNumber: 169
      },
      {
        id: "s16",
        title: "Majority Element II (>n/3)",
        difficulty: "Medium",
        topic: "Arrays Part-III",
        description: "Given an integer array of size n, find all elements that appear more than ⌊n/3⌋ times.",
        approach: "Extended Boyer-Moore Voting. At most 2 elements can appear > n/3 times. Maintain two candidates with counts. Then verify candidates in a second pass.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> majorityElement(vector<int>& nums) {
    int cnt1 = 0, cnt2 = 0;
    int el1 = INT_MIN, el2 = INT_MIN;
    
    for (int num : nums) {
        if (cnt1 == 0 && num != el2) { el1 = num; cnt1 = 1; }
        else if (cnt2 == 0 && num != el1) { el2 = num; cnt2 = 1; }
        else if (num == el1) cnt1++;
        else if (num == el2) cnt2++;
        else { cnt1--; cnt2--; }
    }
    
    // Verify
    cnt1 = cnt2 = 0;
    for (int num : nums) {
        if (num == el1) cnt1++;
        else if (num == el2) cnt2++;
    }
    
    vector<int> result;
    int n = nums.size();
    if (cnt1 > n / 3) result.push_back(el1);
    if (cnt2 > n / 3) result.push_back(el2);
    return result;
}`,
        hints: ["At most 2 elements can appear > n/3 times", "Extend Boyer-Moore for two candidates"],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        leetcodeNumber: 229
      },
      {
        id: "s17",
        title: "Grid Unique Paths",
        difficulty: "Medium",
        topic: "Arrays Part-III",
        description: "A robot is located at the top-left corner of a m x n grid. It can only move either down or right. How many unique paths are there to the bottom-right corner?",
        approach: "This is a combinatorics problem. Total steps = (m-1) + (n-1). We need to choose (m-1) down moves from total. Answer = C(m+n-2, m-1).",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

int uniquePaths(int m, int n) {
    int N = m + n - 2;
    int r = min(m - 1, n - 1);
    long long result = 1;
    for (int i = 1; i <= r; i++) {
        result = result * (N - r + i) / i;
    }
    return (int)result;
}`,
        hints: ["It's a combinatorics problem", "C(m+n-2, m-1) gives the answer"],
        timeComplexity: "O(min(m,n))",
        spaceComplexity: "O(1)",
        leetcodeNumber: 62
      },
      {
        id: "s18",
        title: "Kadane's Algorithm (Maximum Subarray Sum)",
        difficulty: "Medium",
        topic: "Arrays Part-III",
        description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
        approach: "Maintain current sum and max sum. If current sum becomes negative, reset it to 0. At each step, update max sum.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

int maxSubArray(vector<int>& nums) {
    int maxSum = INT_MIN, curSum = 0;
    for (int num : nums) {
        curSum += num;
        maxSum = max(maxSum, curSum);
        if (curSum < 0) curSum = 0;
    }
    return maxSum;
}`,
        hints: ["Keep running sum, reset when negative", "Track the maximum sum seen so far"],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        leetcodeNumber: 53
      }
    ]
  },
  // ===================== DAY 4: Arrays Part-IV =====================
  {
    name: "Arrays Part-IV",
    day: 4,
    problems: [
      {
        id: "s19",
        title: "2Sum Problem",
        difficulty: "Easy",
        topic: "Arrays Part-IV",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        approach: "Use a hashmap to store each number's index. For each number, check if (target - number) exists in the map.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> mp;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (mp.find(complement) != mp.end()) {
            return {mp[complement], i};
        }
        mp[nums[i]] = i;
    }
    return {};
}`,
        hints: ["Use a hashmap for O(1) lookup", "Check if complement exists"],
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        leetcodeNumber: 1
      },
      {
        id: "s20",
        title: "4Sum Problem",
        difficulty: "Medium",
        topic: "Arrays Part-IV",
        description: "Given an array nums of n integers, return an array of all unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that they sum to target.",
        approach: "Sort the array. Fix two elements using two loops, then use two-pointer technique for the remaining two. Skip duplicates at each level.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> fourSum(vector<int>& nums, int target) {
    vector<vector<int>> result;
    sort(nums.begin(), nums.end());
    int n = nums.size();
    
    for (int i = 0; i < n; i++) {
        if (i > 0 && nums[i] == nums[i-1]) continue;
        for (int j = i + 1; j < n; j++) {
            if (j > i + 1 && nums[j] == nums[j-1]) continue;
            int left = j + 1, right = n - 1;
            while (left < right) {
                long long sum = (long long)nums[i] + nums[j] + nums[left] + nums[right];
                if (sum == target) {
                    result.push_back({nums[i], nums[j], nums[left], nums[right]});
                    while (left < right && nums[left] == nums[left+1]) left++;
                    while (left < right && nums[right] == nums[right-1]) right--;
                    left++; right--;
                } else if (sum < target) left++;
                else right--;
            }
        }
    }
    return result;
}`,
        hints: ["Sort + two loops + two pointers", "Skip duplicates at every level"],
        timeComplexity: "O(n³)",
        spaceComplexity: "O(1)",
        leetcodeNumber: 18
      },
      {
        id: "s21",
        title: "Longest Consecutive Sequence",
        difficulty: "Medium",
        topic: "Arrays Part-IV",
        description: "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.",
        approach: "Use a HashSet. For each number, if num-1 doesn't exist in set (it's a sequence start), count consecutive numbers from it.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

int longestConsecutive(vector<int>& nums) {
    unordered_set<int> st(nums.begin(), nums.end());
    int longest = 0;
    
    for (int num : st) {
        if (st.find(num - 1) == st.end()) {
            int curNum = num, streak = 1;
            while (st.find(curNum + 1) != st.end()) {
                curNum++;
                streak++;
            }
            longest = max(longest, streak);
        }
    }
    return longest;
}`,
        hints: ["Only start counting from sequence beginnings", "A start has no num-1 in the set"],
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        leetcodeNumber: 128
      },
      {
        id: "s22",
        title: "Longest Subarray with 0 Sum",
        difficulty: "Medium",
        topic: "Arrays Part-IV",
        description: "Given an array containing both positive and negative integers, find the length of the longest subarray with sum equal to 0.",
        approach: "Use prefix sum with hashmap. If the same prefix sum appears again, the subarray between those indices has sum 0. Store the first occurrence of each prefix sum.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

int maxLen(vector<int>& arr) {
    unordered_map<int, int> mp;
    int maxLen = 0, sum = 0;
    
    for (int i = 0; i < arr.size(); i++) {
        sum += arr[i];
        if (sum == 0) maxLen = i + 1;
        else if (mp.find(sum) != mp.end())
            maxLen = max(maxLen, i - mp[sum]);
        else
            mp[sum] = i;
    }
    return maxLen;
}`,
        hints: ["Prefix sum technique", "Same prefix sum at two indices means sum between them is 0"],
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)"
      },
      {
        id: "s23",
        title: "Count Subarrays with XOR K",
        difficulty: "Medium",
        topic: "Arrays Part-IV",
        description: "Given an array of integers and a number K, count the number of subarrays having XOR of their elements as K.",
        approach: "Use prefix XOR with hashmap. If prefix_xor ^ K exists in the map, those many subarrays ending at current index have XOR = K.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

int subarraysWithXorK(vector<int>& arr, int k) {
    unordered_map<int, int> mp;
    int xorr = 0, cnt = 0;
    mp[0] = 1;
    
    for (int i = 0; i < arr.size(); i++) {
        xorr ^= arr[i];
        int x = xorr ^ k;
        cnt += mp[x];
        mp[xorr]++;
    }
    return cnt;
}`,
        hints: ["Similar to prefix sum technique but with XOR", "xor ^ k gives the prefix we need to find"],
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)"
      },
      {
        id: "s24",
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        topic: "Arrays Part-IV",
        description: "Given a string s, find the length of the longest substring without repeating characters.",
        approach: "Use sliding window with a hashset or hashmap. Expand the window by moving the right pointer. If a duplicate is found, shrink from the left until no duplicates.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

int lengthOfLongestSubstring(string s) {
    unordered_map<char, int> mp;
    int left = 0, maxLen = 0;
    
    for (int right = 0; right < s.size(); right++) {
        if (mp.find(s[right]) != mp.end()) {
            left = max(left, mp[s[right]] + 1);
        }
        mp[s[right]] = right;
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
        hints: ["Sliding window technique", "Store last seen index of each character"],
        timeComplexity: "O(n)",
        spaceComplexity: "O(min(n, 26))",
        leetcodeNumber: 3
      }
    ]
  },
  // ===================== DAY 5: Linked List =====================
  {
    name: "Linked List",
    day: 5,
    problems: [
      {
        id: "s25",
        title: "Reverse a Linked List",
        difficulty: "Easy",
        topic: "Linked List",
        description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
        approach: "Use three pointers: prev, curr, and next. Iterate through the list, reversing each pointer direction.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

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
        hints: ["Use three pointers: prev, curr, next", "Reverse the link direction at each step"],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        leetcodeNumber: 206
      },
      {
        id: "s26",
        title: "Find Middle of Linked List",
        difficulty: "Easy",
        topic: "Linked List",
        description: "Given the head of a singly linked list, return the middle node. If there are two middle nodes, return the second middle node.",
        approach: "Use slow and fast pointers. Slow moves one step, fast moves two steps. When fast reaches end, slow is at middle.",
        solutionCode: `ListNode* middleNode(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}`,
        hints: ["Tortoise and Hare approach", "Fast pointer moves twice as fast"],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        leetcodeNumber: 876
      },
      {
        id: "s27",
        title: "Merge Two Sorted Lists",
        difficulty: "Easy",
        topic: "Linked List",
        description: "Merge two sorted linked lists and return it as a sorted list.",
        approach: "Use a dummy node. Compare heads of both lists, attach the smaller one. Advance that list's pointer. Attach remaining nodes.",
        solutionCode: `ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
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
        hints: ["Use a dummy head node", "Compare and attach smaller node each time"],
        timeComplexity: "O(m+n)",
        spaceComplexity: "O(1)",
        leetcodeNumber: 21
      },
      {
        id: "s28",
        title: "Remove Nth Node From End",
        difficulty: "Medium",
        topic: "Linked List",
        description: "Given the head of a linked list, remove the nth node from the end of the list and return its head.",
        approach: "Use two pointers. Move fast pointer n steps ahead. Then move both slow and fast together until fast reaches end. Slow is now just before the node to remove.",
        solutionCode: `ListNode* removeNthFromEnd(ListNode* head, int n) {
    ListNode dummy(0);
    dummy.next = head;
    ListNode* fast = &dummy;
    ListNode* slow = &dummy;
    
    for (int i = 0; i <= n; i++) fast = fast->next;
    while (fast) {
        slow = slow->next;
        fast = fast->next;
    }
    
    ListNode* toDelete = slow->next;
    slow->next = slow->next->next;
    delete toDelete;
    return dummy.next;
}`,
        hints: ["Use two pointers with n gap between them", "Use dummy node to handle edge cases"],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        leetcodeNumber: 19
      },
      {
        id: "s29",
        title: "Add Two Numbers as Linked Lists",
        difficulty: "Medium",
        topic: "Linked List",
        description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order. Add the two numbers and return the sum as a linked list.",
        approach: "Iterate through both lists simultaneously, adding corresponding digits along with carry. Create new nodes for each digit of the result.",
        solutionCode: `ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
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
        hints: ["Handle carry at each step", "Don't forget the final carry"],
        timeComplexity: "O(max(m,n))",
        spaceComplexity: "O(max(m,n))",
        leetcodeNumber: 2
      },
      {
        id: "s30",
        title: "Delete Node in a Linked List",
        difficulty: "Medium",
        topic: "Linked List",
        description: "Write a function to delete a node in a singly-linked list. You will not be given access to the head of the list; instead, you will be given access to the node to be deleted directly.",
        approach: "Copy the value of the next node to the current node, then delete the next node. This effectively removes the current node.",
        solutionCode: `void deleteNode(ListNode* node) {
    node->val = node->next->val;
    ListNode* toDelete = node->next;
    node->next = node->next->next;
    delete toDelete;
}`,
        hints: ["You can't access previous node", "Copy next node's data and delete next node"],
        timeComplexity: "O(1)",
        spaceComplexity: "O(1)",
        leetcodeNumber: 237
      }
    ]
  },
  // ===================== DAY 6: Linked List Part-II =====================
  {
    name: "Linked List Part-II",
    day: 6,
    problems: [
      {
        id: "s31",
        title: "Detect Cycle in Linked List",
        difficulty: "Easy",
        topic: "Linked List Part-II",
        description: "Given head, the head of a linked list, determine if the linked list has a cycle in it.",
        approach: "Use Floyd's cycle detection with slow and fast pointers. If they meet, there's a cycle.",
        solutionCode: `bool hasCycle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}`,
        hints: ["Floyd's Tortoise and Hare", "If fast catches slow, there's a cycle"],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        leetcodeNumber: 141
      },
      {
        id: "s32",
        title: "Find Starting Point of Cycle",
        difficulty: "Medium",
        topic: "Linked List Part-II",
        description: "Given a linked list, return the node where the cycle begins. If there is no cycle, return null.",
        approach: "After detecting cycle with slow/fast, reset fast to head. Move both one step at a time. They meet at cycle start.",
        solutionCode: `ListNode* detectCycle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {
            fast = head;
            while (slow != fast) {
                slow = slow->next;
                fast = fast->next;
            }
            return slow;
        }
    }
    return nullptr;
}`,
        hints: ["First detect cycle, then find entry point", "Reset one pointer to head and move both at same speed"],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        leetcodeNumber: 142
      },
      {
        id: "s33",
        title: "Reverse Nodes in k-Group",
        difficulty: "Hard",
        topic: "Linked List Part-II",
        description: "Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.",
        approach: "Count k nodes. If enough nodes exist, reverse k nodes iteratively. Connect the reversed group. Recurse for remaining list.",
        solutionCode: `ListNode* reverseKGroup(ListNode* head, int k) {
    // Check if k nodes exist
    ListNode* temp = head;
    for (int i = 0; i < k; i++) {
        if (!temp) return head;
        temp = temp->next;
    }
    
    // Reverse k nodes
    ListNode* prev = nullptr;
    ListNode* curr = head;
    for (int i = 0; i < k; i++) {
        ListNode* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    
    head->next = reverseKGroup(curr, k);
    return prev;
}`,
        hints: ["Check if k nodes exist before reversing", "After reversing, connect the tail to the result of recursive call"],
        timeComplexity: "O(n)",
        spaceComplexity: "O(n/k)",
        leetcodeNumber: 25
      },
      {
        id: "s34",
        title: "Check if Linked List is Palindrome",
        difficulty: "Easy",
        topic: "Linked List Part-II",
        description: "Given the head of a singly linked list, return true if it is a palindrome.",
        approach: "Find middle using slow/fast. Reverse the second half. Compare first half with reversed second half.",
        solutionCode: `bool isPalindrome(ListNode* head) {
    if (!head || !head->next) return true;
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast->next && fast->next->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    
    // Reverse second half
    ListNode* prev = nullptr;
    ListNode* curr = slow->next;
    while (curr) {
        ListNode* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    
    // Compare
    ListNode* first = head;
    ListNode* second = prev;
    while (second) {
        if (first->val != second->val) return false;
        first = first->next;
        second = second->next;
    }
    return true;
}`,
        hints: ["Find middle, reverse second half, compare", "Use slow/fast pointers to find middle"],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        leetcodeNumber: 234
      },
      {
        id: "s35",
        title: "Flattening a Linked List",
        difficulty: "Medium",
        topic: "Linked List Part-II",
        description: "Given a linked list where every node has a next and bottom pointer. Flatten the list so all nodes appear in a single sorted level using bottom pointers.",
        approach: "Merge from the last two lists towards the first, using merge sort approach on the bottom pointers.",
        solutionCode: `struct Node {
    int data;
    Node* next;
    Node* bottom;
    Node(int x) : data(x), next(nullptr), bottom(nullptr) {}
};

Node* mergeLists(Node* a, Node* b) {
    if (!a) return b;
    if (!b) return a;
    Node* result;
    if (a->data < b->data) {
        result = a;
        result->bottom = mergeLists(a->bottom, b);
    } else {
        result = b;
        result->bottom = mergeLists(a, b->bottom);
    }
    result->next = nullptr;
    return result;
}

Node* flatten(Node* root) {
    if (!root || !root->next) return root;
    root->next = flatten(root->next);
    root = mergeLists(root, root->next);
    return root;
}`,
        hints: ["Merge lists from right to left", "Use merge sort logic on bottom pointers"],
        timeComplexity: "O(n*m)",
        spaceComplexity: "O(n)"
      },
      {
        id: "s36",
        title: "Intersection of Two Linked Lists",
        difficulty: "Easy",
        topic: "Linked List Part-II",
        description: "Given the heads of two singly linked-lists, return the node at which the two lists intersect.",
        approach: "Use two pointers starting at heads. When one reaches end, redirect to the other list's head. They'll meet at intersection or both become null.",
        solutionCode: `ListNode* getIntersectionNode(ListNode* headA, ListNode* headB) {
    ListNode* a = headA;
    ListNode* b = headB;
    while (a != b) {
        a = a ? a->next : headB;
        b = b ? b->next : headA;
    }
    return a;
}`,
        hints: ["Two pointers traverse equal distances", "Switch to other list's head when reaching end"],
        timeComplexity: "O(m+n)",
        spaceComplexity: "O(1)",
        leetcodeNumber: 160
      }
    ]
  },
  // ===================== DAY 7: Linked List and Arrays =====================
  {
    name: "Linked List and Arrays",
    day: 7,
    problems: [
      {
        id: "s37",
        title: "Rotate Linked List",
        difficulty: "Medium",
        topic: "Linked List and Arrays",
        description: "Given the head of a linked list, rotate the list to the right by k places.",
        approach: "Find length and make it circular. Calculate effective rotations = k % len. Move to the (len - k)th node and break the circle.",
        solutionCode: `ListNode* rotateRight(ListNode* head, int k) {
    if (!head || !head->next || k == 0) return head;
    
    int len = 1;
    ListNode* tail = head;
    while (tail->next) { tail = tail->next; len++; }
    
    k = k % len;
    if (k == 0) return head;
    
    tail->next = head; // Make circular
    
    ListNode* curr = head;
    for (int i = 0; i < len - k - 1; i++) curr = curr->next;
    
    head = curr->next;
    curr->next = nullptr;
    return head;
}`,
        hints: ["Make it circular, then break at the right point", "Effective rotation = k % length"],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        leetcodeNumber: 61
      },
      {
        id: "s38",
        title: "Clone a Linked List with Random Pointer",
        difficulty: "Medium",
        topic: "Linked List and Arrays",
        description: "Construct a deep copy of a linked list where each node has next and random pointers.",
        approach: "Three-pass approach: 1) Insert cloned nodes between original nodes. 2) Set random pointers for cloned nodes. 3) Separate the two lists.",
        solutionCode: `struct Node {
    int val;
    Node* next;
    Node* random;
    Node(int x) : val(x), next(nullptr), random(nullptr) {}
};

Node* copyRandomList(Node* head) {
    if (!head) return nullptr;
    
    // Step 1: Insert copies
    Node* curr = head;
    while (curr) {
        Node* copy = new Node(curr->val);
        copy->next = curr->next;
        curr->next = copy;
        curr = copy->next;
    }
    
    // Step 2: Set random pointers
    curr = head;
    while (curr) {
        if (curr->random)
            curr->next->random = curr->random->next;
        curr = curr->next->next;
    }
    
    // Step 3: Separate lists
    Node* dummy = new Node(0);
    Node* tail = dummy;
    curr = head;
    while (curr) {
        tail->next = curr->next;
        tail = tail->next;
        curr->next = curr->next->next;
        curr = curr->next;
    }
    return dummy->next;
}`,
        hints: ["Interleave cloned nodes with original", "Three-pass solution without extra space"],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        leetcodeNumber: 138
      },
      {
        id: "s39",
        title: "3Sum",
        difficulty: "Medium",
        topic: "Linked List and Arrays",
        description: "Given an integer array nums, return all unique triplets [nums[i], nums[j], nums[k]] such that i != j != k and nums[i] + nums[j] + nums[k] == 0.",
        approach: "Sort the array. Fix one element and use two-pointer technique for the remaining two. Skip duplicates.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> threeSum(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> result;
    
    for (int i = 0; i < (int)nums.size() - 2; i++) {
        if (i > 0 && nums[i] == nums[i-1]) continue;
        int left = i + 1, right = nums.size() - 1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (sum == 0) {
                result.push_back({nums[i], nums[left], nums[right]});
                while (left < right && nums[left] == nums[left+1]) left++;
                while (left < right && nums[right] == nums[right-1]) right--;
                left++; right--;
            } else if (sum < 0) left++;
            else right--;
        }
    }
    return result;
}`,
        hints: ["Sort + fix one + two pointers", "Skip duplicates at all levels"],
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        leetcodeNumber: 15
      },
      {
        id: "s40",
        title: "Trapping Rain Water",
        difficulty: "Hard",
        topic: "Linked List and Arrays",
        description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
        approach: "Use two pointers from both ends. Track leftMax and rightMax. Water at any position = min(leftMax, rightMax) - height[i].",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

int trap(vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int leftMax = 0, rightMax = 0, water = 0;
    
    while (left < right) {
        if (height[left] <= height[right]) {
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
        hints: ["Two pointer approach from both ends", "Water at position = min(leftMax, rightMax) - height"],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        leetcodeNumber: 42
      },
      {
        id: "s41",
        title: "Max Consecutive Ones",
        difficulty: "Easy",
        topic: "Linked List and Arrays",
        description: "Given a binary array nums, return the maximum number of consecutive 1's in the array.",
        approach: "Simple traversal with a counter. Reset counter when 0 is encountered, update max.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

int findMaxConsecutiveOnes(vector<int>& nums) {
    int maxOnes = 0, count = 0;
    for (int num : nums) {
        if (num == 1) count++;
        else count = 0;
        maxOnes = max(maxOnes, count);
    }
    return maxOnes;
}`,
        hints: ["Simple counter with reset", "Track max count seen"],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        leetcodeNumber: 485
      },
      {
        id: "s42",
        title: "Remove Duplicates from Sorted Array",
        difficulty: "Easy",
        topic: "Linked List and Arrays",
        description: "Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once.",
        approach: "Use two pointers. One for the current position to write, another to scan through the array.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

int removeDuplicates(vector<int>& nums) {
    if (nums.empty()) return 0;
    int i = 0;
    for (int j = 1; j < nums.size(); j++) {
        if (nums[j] != nums[i]) {
            i++;
            nums[i] = nums[j];
        }
    }
    return i + 1;
}`,
        hints: ["Two pointer technique", "Slow pointer tracks write position"],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        leetcodeNumber: 26
      }
    ]
  },
  // ===================== DAY 8: Greedy Algorithm =====================
  {
    name: "Greedy Algorithm",
    day: 8,
    problems: [
      {
        id: "s43",
        title: "N Meetings in One Room",
        difficulty: "Easy",
        topic: "Greedy Algorithm",
        description: "There is one meeting room. There are N meetings with start and end timings given. Find the maximum number of meetings that can be accommodated.",
        approach: "Sort meetings by end time. Greedily pick the meeting that finishes earliest and doesn't conflict with the last selected meeting.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

int maxMeetings(vector<int>& start, vector<int>& end) {
    int n = start.size();
    vector<pair<int,int>> meetings;
    for (int i = 0; i < n; i++)
        meetings.push_back({end[i], start[i]});
    
    sort(meetings.begin(), meetings.end());
    
    int count = 1, lastEnd = meetings[0].first;
    for (int i = 1; i < n; i++) {
        if (meetings[i].second > lastEnd) {
            count++;
            lastEnd = meetings[i].first;
        }
    }
    return count;
}`,
        hints: ["Sort by end time", "Greedy: pick earliest finishing meeting"],
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)"
      },
      {
        id: "s44",
        title: "Minimum Platforms",
        difficulty: "Medium",
        topic: "Greedy Algorithm",
        description: "Given arrival and departure times of all trains at a railway station, find the minimum number of platforms required.",
        approach: "Sort arrival and departure arrays separately. Use two pointers to simulate trains arriving and departing. Track max platforms needed at any time.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

int findPlatform(vector<int>& arr, vector<int>& dep) {
    sort(arr.begin(), arr.end());
    sort(dep.begin(), dep.end());
    
    int plat = 1, result = 1;
    int i = 1, j = 0;
    int n = arr.size();
    
    while (i < n && j < n) {
        if (arr[i] <= dep[j]) {
            plat++;
            i++;
        } else {
            plat--;
            j++;
        }
        result = max(result, plat);
    }
    return result;
}`,
        hints: ["Sort arrivals and departures separately", "Two pointer simulation"],
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(1)"
      },
      {
        id: "s45",
        title: "Job Sequencing Problem",
        difficulty: "Medium",
        topic: "Greedy Algorithm",
        description: "Given a set of N jobs where each job has a deadline and profit. If a job is completed before its deadline, its profit is earned. Find the maximum profit and the number of jobs done.",
        approach: "Sort jobs by profit in descending order. For each job, find the latest available slot before its deadline using a boolean array.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

struct Job {
    int id, deadline, profit;
};

pair<int,int> jobSequencing(vector<Job>& jobs) {
    sort(jobs.begin(), jobs.end(), [](Job& a, Job& b) {
        return a.profit > b.profit;
    });
    
    int maxDeadline = 0;
    for (auto& j : jobs) maxDeadline = max(maxDeadline, j.deadline);
    
    vector<bool> slot(maxDeadline + 1, false);
    int count = 0, profit = 0;
    
    for (auto& job : jobs) {
        for (int j = job.deadline; j > 0; j--) {
            if (!slot[j]) {
                slot[j] = true;
                count++;
                profit += job.profit;
                break;
            }
        }
    }
    return {count, profit};
}`,
        hints: ["Sort by profit descending", "Assign each job to latest available slot before deadline"],
        timeComplexity: "O(n² )",
        spaceComplexity: "O(n)"
      },
      {
        id: "s46",
        title: "Fractional Knapsack",
        difficulty: "Medium",
        topic: "Greedy Algorithm",
        description: "Given weights and values of N items, put them in a knapsack of capacity W. You can break items for maximizing total value.",
        approach: "Sort items by value/weight ratio in descending order. Pick items greedily. If an item doesn't fit fully, take the fraction that fits.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

struct Item {
    int value, weight;
};

double fractionalKnapsack(int W, vector<Item>& items) {
    sort(items.begin(), items.end(), [](Item& a, Item& b) {
        return (double)a.value / a.weight > (double)b.value / b.weight;
    });
    
    double totalValue = 0;
    for (auto& item : items) {
        if (item.weight <= W) {
            totalValue += item.value;
            W -= item.weight;
        } else {
            totalValue += (double)item.value * W / item.weight;
            break;
        }
    }
    return totalValue;
}`,
        hints: ["Sort by value/weight ratio", "Take fractions of the last item if needed"],
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(1)"
      },
      {
        id: "s47",
        title: "Assign Cookies",
        difficulty: "Easy",
        topic: "Greedy Algorithm",
        description: "Each child has a greed factor, and each cookie has a size. Output the maximum number of content children.",
        approach: "Sort both arrays. Use two pointers - if current cookie satisfies current child, move both; otherwise just move cookie pointer.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

int findContentChildren(vector<int>& g, vector<int>& s) {
    sort(g.begin(), g.end());
    sort(s.begin(), s.end());
    int i = 0, j = 0;
    while (i < g.size() && j < s.size()) {
        if (s[j] >= g[i]) i++;
        j++;
    }
    return i;
}`,
        hints: ["Sort both arrays", "Greedy matching with two pointers"],
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(1)",
        leetcodeNumber: 455
      },
      {
        id: "s48",
        title: "Minimum Coins",
        difficulty: "Medium",
        topic: "Greedy Algorithm",
        description: "Given a value V, find minimum number of coins (Indian denomination) to make the change.",
        approach: "Use greedy approach with denominations sorted in descending order. Pick the largest denomination that fits.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

int minCoins(int V) {
    vector<int> coins = {1, 2, 5, 10, 20, 50, 100, 500, 1000};
    int count = 0;
    for (int i = coins.size() - 1; i >= 0; i--) {
        while (V >= coins[i]) {
            V -= coins[i];
            count++;
        }
    }
    return count;
}`,
        hints: ["Greedy works for standard denominations", "Pick largest coin that fits"],
        timeComplexity: "O(V)",
        spaceComplexity: "O(1)"
      }
    ]
  },
  // ===================== DAY 9: Recursion =====================
  {
    name: "Recursion",
    day: 9,
    problems: [
      {
        id: "s49",
        title: "Subset Sums",
        difficulty: "Easy",
        topic: "Recursion",
        description: "Given a list of N integers, return sums of all subsets in ascending order.",
        approach: "For each element, either include it or exclude it. Generate all possible sums recursively.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

void solve(vector<int>& arr, int i, int sum, vector<int>& ans) {
    if (i == arr.size()) {
        ans.push_back(sum);
        return;
    }
    solve(arr, i + 1, sum + arr[i], ans); // Include
    solve(arr, i + 1, sum, ans);           // Exclude
}

vector<int> subsetSums(vector<int>& arr) {
    vector<int> ans;
    solve(arr, 0, 0, ans);
    sort(ans.begin(), ans.end());
    return ans;
}`,
        hints: ["Include/exclude pattern for each element", "2^n subsets total"],
        timeComplexity: "O(2^n)",
        spaceComplexity: "O(2^n)"
      },
      {
        id: "s50",
        title: "Subsets II (Unique Subsets)",
        difficulty: "Medium",
        topic: "Recursion",
        description: "Given an integer array nums that may contain duplicates, return all possible subsets. The solution set must not contain duplicate subsets.",
        approach: "Sort the array. Use backtracking. At each level, skip duplicates by checking if current element equals previous element at the same recursion level.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

void solve(vector<int>& nums, int idx, vector<int>& curr, vector<vector<int>>& result) {
    result.push_back(curr);
    for (int i = idx; i < nums.size(); i++) {
        if (i > idx && nums[i] == nums[i-1]) continue;
        curr.push_back(nums[i]);
        solve(nums, i + 1, curr, result);
        curr.pop_back();
    }
}

vector<vector<int>> subsetsWithDup(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> result;
    vector<int> curr;
    solve(nums, 0, curr, result);
    return result;
}`,
        hints: ["Sort to handle duplicates", "Skip same elements at same recursion level"],
        timeComplexity: "O(2^n)",
        spaceComplexity: "O(2^n)",
        leetcodeNumber: 90
      },
      {
        id: "s51",
        title: "Combination Sum",
        difficulty: "Medium",
        topic: "Recursion",
        description: "Given an array of distinct integers and a target, return all unique combinations where the chosen numbers sum to target. The same number may be chosen unlimited times.",
        approach: "Use backtracking. For each element, either pick it (stay at same index since reuse allowed) or move to next element.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

void solve(vector<int>& candidates, int target, int idx, 
           vector<int>& curr, vector<vector<int>>& result) {
    if (target == 0) {
        result.push_back(curr);
        return;
    }
    for (int i = idx; i < candidates.size(); i++) {
        if (candidates[i] > target) break;
        curr.push_back(candidates[i]);
        solve(candidates, target - candidates[i], i, curr, result);
        curr.pop_back();
    }
}

vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
    sort(candidates.begin(), candidates.end());
    vector<vector<int>> result;
    vector<int> curr;
    solve(candidates, target, 0, curr, result);
    return result;
}`,
        hints: ["Reuse same element by not incrementing index", "Pruning: skip if candidate > remaining target"],
        timeComplexity: "O(2^t) where t = target",
        spaceComplexity: "O(target)",
        leetcodeNumber: 39
      },
      {
        id: "s52",
        title: "Combination Sum II",
        difficulty: "Medium",
        topic: "Recursion",
        description: "Given a collection of candidate numbers and a target, find all unique combinations where candidates sum to target. Each number may be used only once.",
        approach: "Sort the array. Use backtracking with duplicate skipping at each recursion level.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

void solve(vector<int>& candidates, int target, int idx,
           vector<int>& curr, vector<vector<int>>& result) {
    if (target == 0) {
        result.push_back(curr);
        return;
    }
    for (int i = idx; i < candidates.size(); i++) {
        if (i > idx && candidates[i] == candidates[i-1]) continue;
        if (candidates[i] > target) break;
        curr.push_back(candidates[i]);
        solve(candidates, target - candidates[i], i + 1, curr, result);
        curr.pop_back();
    }
}

vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
    sort(candidates.begin(), candidates.end());
    vector<vector<int>> result;
    vector<int> curr;
    solve(candidates, target, 0, curr, result);
    return result;
}`,
        hints: ["Sort and skip duplicates at same level", "Move to i+1 since each element used once"],
        timeComplexity: "O(2^n)",
        spaceComplexity: "O(n)",
        leetcodeNumber: 40
      },
      {
        id: "s53",
        title: "Palindrome Partitioning",
        difficulty: "Medium",
        topic: "Recursion",
        description: "Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitionings.",
        approach: "Use backtracking. At each position, try all possible substrings. If a substring is a palindrome, add it to current partition and recurse on the rest.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

bool isPalin(string& s, int l, int r) {
    while (l < r) {
        if (s[l] != s[r]) return false;
        l++; r--;
    }
    return true;
}

void solve(string& s, int idx, vector<string>& curr, vector<vector<string>>& result) {
    if (idx == s.size()) {
        result.push_back(curr);
        return;
    }
    for (int i = idx; i < s.size(); i++) {
        if (isPalin(s, idx, i)) {
            curr.push_back(s.substr(idx, i - idx + 1));
            solve(s, i + 1, curr, result);
            curr.pop_back();
        }
    }
}

vector<vector<string>> partition(string s) {
    vector<vector<string>> result;
    vector<string> curr;
    solve(s, 0, curr, result);
    return result;
}`,
        hints: ["Try all substring lengths at each position", "Only recurse if current substring is palindrome"],
        timeComplexity: "O(n * 2^n)",
        spaceComplexity: "O(n)",
        leetcodeNumber: 131
      },
      {
        id: "s54",
        title: "Permutation Sequence (Kth Permutation)",
        difficulty: "Hard",
        topic: "Recursion",
        description: "Given n and k, return the kth permutation sequence of numbers 1 to n.",
        approach: "Use factorial number system. For each position, determine which number goes there by dividing k by (n-1)! to find the index in remaining numbers.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

string getPermutation(int n, int k) {
    vector<int> numbers;
    int fact = 1;
    for (int i = 1; i < n; i++) {
        fact *= i;
        numbers.push_back(i);
    }
    numbers.push_back(n);
    k--; // 0-indexed
    
    string result = "";
    while (true) {
        result += to_string(numbers[k / fact]);
        numbers.erase(numbers.begin() + k / fact);
        if (numbers.empty()) break;
        k %= fact;
        fact /= numbers.size();
    }
    return result;
}`,
        hints: ["Use factorial number system", "k/fact gives the index of next digit"],
        timeComplexity: "O(n²)",
        spaceComplexity: "O(n)",
        leetcodeNumber: 60
      }
    ]
  },
  // ===================== DAY 10: Recursion and Backtracking =====================
  {
    name: "Recursion and Backtracking",
    day: 10,
    problems: [
      {
        id: "s55",
        title: "Permutations",
        difficulty: "Medium",
        topic: "Recursion and Backtracking",
        description: "Given an array nums of distinct integers, return all possible permutations.",
        approach: "Use backtracking by swapping each element to the current position and recursing on the rest.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

void solve(vector<int>& nums, int idx, vector<vector<int>>& result) {
    if (idx == nums.size()) {
        result.push_back(nums);
        return;
    }
    for (int i = idx; i < nums.size(); i++) {
        swap(nums[idx], nums[i]);
        solve(nums, idx + 1, result);
        swap(nums[idx], nums[i]);
    }
}

vector<vector<int>> permute(vector<int>& nums) {
    vector<vector<int>> result;
    solve(nums, 0, result);
    return result;
}`,
        hints: ["Swap current with each remaining element", "Backtrack by swapping back"],
        timeComplexity: "O(n! * n)",
        spaceComplexity: "O(n)",
        leetcodeNumber: 46
      },
      {
        id: "s56",
        title: "N-Queens",
        difficulty: "Hard",
        topic: "Recursion and Backtracking",
        description: "Place N queens on an NxN chessboard such that no two queens attack each other. Return all distinct solutions.",
        approach: "Place queens column by column. For each column, try each row. Use arrays to track which rows and diagonals are under attack.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

void solve(int col, int n, vector<string>& board, 
           vector<vector<string>>& result,
           vector<int>& leftRow, vector<int>& upperDiag, vector<int>& lowerDiag) {
    if (col == n) {
        result.push_back(board);
        return;
    }
    for (int row = 0; row < n; row++) {
        if (!leftRow[row] && !lowerDiag[row + col] && !upperDiag[n - 1 + col - row]) {
            board[row][col] = 'Q';
            leftRow[row] = lowerDiag[row + col] = upperDiag[n - 1 + col - row] = 1;
            solve(col + 1, n, board, result, leftRow, upperDiag, lowerDiag);
            board[row][col] = '.';
            leftRow[row] = lowerDiag[row + col] = upperDiag[n - 1 + col - row] = 0;
        }
    }
}

vector<vector<string>> solveNQueens(int n) {
    vector<vector<string>> result;
    vector<string> board(n, string(n, '.'));
    vector<int> leftRow(n, 0), upperDiag(2*n-1, 0), lowerDiag(2*n-1, 0);
    solve(0, n, board, result, leftRow, upperDiag, lowerDiag);
    return result;
}`,
        hints: ["Place column by column", "Track rows and both diagonals"],
        timeComplexity: "O(n!)",
        spaceComplexity: "O(n²)",
        leetcodeNumber: 51
      },
      {
        id: "s57",
        title: "Sudoku Solver",
        difficulty: "Hard",
        topic: "Recursion and Backtracking",
        description: "Write a program to solve a Sudoku puzzle by filling the empty cells.",
        approach: "Try digits 1-9 for each empty cell. Validate row, column, and 3x3 box. Backtrack if no valid digit found.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

bool isValid(vector<vector<char>>& board, int row, int col, char c) {
    for (int i = 0; i < 9; i++) {
        if (board[row][i] == c) return false;
        if (board[i][col] == c) return false;
        if (board[3*(row/3) + i/3][3*(col/3) + i%3] == c) return false;
    }
    return true;
}

bool solve(vector<vector<char>>& board) {
    for (int i = 0; i < 9; i++) {
        for (int j = 0; j < 9; j++) {
            if (board[i][j] == '.') {
                for (char c = '1'; c <= '9'; c++) {
                    if (isValid(board, i, j, c)) {
                        board[i][j] = c;
                        if (solve(board)) return true;
                        board[i][j] = '.';
                    }
                }
                return false;
            }
        }
    }
    return true;
}`,
        hints: ["Try each digit and validate", "Backtrack if no valid digit works"],
        timeComplexity: "O(9^(n*n))",
        spaceComplexity: "O(n*n)",
        leetcodeNumber: 37
      },
      {
        id: "s58",
        title: "Word Break (Print All)",
        difficulty: "Hard",
        topic: "Recursion and Backtracking",
        description: "Given a string s and a dictionary, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences.",
        approach: "Use backtracking. At each position, try all prefixes that exist in dictionary. If found, recurse on remaining string.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

void solve(string& s, int idx, unordered_set<string>& dict,
           string curr, vector<string>& result) {
    if (idx == s.size()) {
        result.push_back(curr);
        return;
    }
    for (int i = idx; i < s.size(); i++) {
        string word = s.substr(idx, i - idx + 1);
        if (dict.count(word)) {
            string next = curr.empty() ? word : curr + " " + word;
            solve(s, i + 1, dict, next, result);
        }
    }
}

vector<string> wordBreak(string s, vector<string>& wordDict) {
    unordered_set<string> dict(wordDict.begin(), wordDict.end());
    vector<string> result;
    solve(s, 0, dict, "", result);
    return result;
}`,
        hints: ["Try all valid prefixes at each position", "Build sentence as you recurse"],
        timeComplexity: "O(2^n)",
        spaceComplexity: "O(n²)",
        leetcodeNumber: 140
      },
      {
        id: "s59",
        title: "Rat in a Maze",
        difficulty: "Medium",
        topic: "Recursion and Backtracking",
        description: "Find all paths from (0,0) to (n-1,n-1) in a maze. Rat can move in 4 directions: D, L, R, U.",
        approach: "Use backtracking. From each cell, try all 4 directions. Mark visited cells to avoid revisiting.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

void solve(vector<vector<int>>& maze, int i, int j, int n,
           string path, vector<string>& result, vector<vector<bool>>& visited) {
    if (i == n-1 && j == n-1) {
        result.push_back(path);
        return;
    }
    
    // D, L, R, U
    int di[] = {1, 0, 0, -1};
    int dj[] = {0, -1, 1, 0};
    char dir[] = {'D', 'L', 'R', 'U'};
    
    for (int k = 0; k < 4; k++) {
        int ni = i + di[k], nj = j + dj[k];
        if (ni >= 0 && ni < n && nj >= 0 && nj < n 
            && maze[ni][nj] == 1 && !visited[ni][nj]) {
            visited[ni][nj] = true;
            solve(maze, ni, nj, n, path + dir[k], result, visited);
            visited[ni][nj] = false;
        }
    }
}

vector<string> findPath(vector<vector<int>>& maze) {
    int n = maze.size();
    vector<string> result;
    if (maze[0][0] == 0) return result;
    vector<vector<bool>> visited(n, vector<bool>(n, false));
    visited[0][0] = true;
    solve(maze, 0, 0, n, "", result, visited);
    return result;
}`,
        hints: ["Try all 4 directions from each cell", "Mark visited and backtrack"],
        timeComplexity: "O(4^(n*n))",
        spaceComplexity: "O(n*n)"
      },
      {
        id: "s60",
        title: "M-Coloring Problem",
        difficulty: "Medium",
        topic: "Recursion and Backtracking",
        description: "Given an undirected graph and number M, determine if the graph can be colored with at most M colors such that no two adjacent vertices share the same color.",
        approach: "Use backtracking. For each vertex, try all M colors. Check if the color is safe (no adjacent vertex has same color). Recurse for next vertex.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;

bool isSafe(int node, vector<vector<int>>& adj, vector<int>& color, int c) {
    for (int neighbor : adj[node]) {
        if (color[neighbor] == c) return false;
    }
    return true;
}

bool solve(int node, int n, int m, vector<vector<int>>& adj, vector<int>& color) {
    if (node == n) return true;
    
    for (int c = 1; c <= m; c++) {
        if (isSafe(node, adj, color, c)) {
            color[node] = c;
            if (solve(node + 1, n, m, adj, color)) return true;
            color[node] = 0;
        }
    }
    return false;
}

bool graphColoring(int n, vector<vector<int>>& adj, int m) {
    vector<int> color(n, 0);
    return solve(0, n, m, adj, color);
}`,
        hints: ["Try each color for each vertex", "Check adjacency before assigning color"],
        timeComplexity: "O(m^n)",
        spaceComplexity: "O(n)"
      }
    ]
  },
  // ===================== DAY 11: Binary Search =====================
  {
    name: "Binary Search",
    day: 11,
    problems: [
      {
        id: "s61", title: "Nth Root of M", difficulty: "Easy", topic: "Binary Search",
        description: "Find the Nth root of M. If it doesn't exist, return -1.",
        approach: "Use binary search on the answer. For each mid, compute mid^n and compare with M.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
int nthRoot(int n, int m) {
    int low = 1, high = m;
    while (low <= high) {
        int mid = (low + high) / 2;
        long long val = 1;
        bool overflow = false;
        for (int i = 0; i < n; i++) {
            val *= mid;
            if (val > m) { overflow = true; break; }
        }
        if (!overflow && val == m) return mid;
        else if (!overflow && val < m) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
        hints: ["Binary search on answer space", "mid^n == m means found"],
        timeComplexity: "O(n * log m)", spaceComplexity: "O(1)"
      },
      {
        id: "s62", title: "Matrix Median", difficulty: "Medium", topic: "Binary Search",
        description: "Given a row-wise sorted matrix of odd dimensions, find the median.",
        approach: "Binary search on the value. For each mid value, count elements <= mid in all rows using upper_bound. Median has exactly (r*c)/2 elements less than it.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
int findMedian(vector<vector<int>>& matrix) {
    int r = matrix.size(), c = matrix[0].size();
    int low = INT_MAX, high = INT_MIN;
    for (int i = 0; i < r; i++) {
        low = min(low, matrix[i][0]);
        high = max(high, matrix[i][c-1]);
    }
    int desired = (r * c + 1) / 2;
    while (low < high) {
        int mid = (low + high) / 2;
        int count = 0;
        for (int i = 0; i < r; i++)
            count += upper_bound(matrix[i].begin(), matrix[i].end(), mid) - matrix[i].begin();
        if (count < desired) low = mid + 1;
        else high = mid;
    }
    return low;
}`,
        hints: ["Binary search on the value range", "Count elements ≤ mid in each row"],
        timeComplexity: "O(r * log c * log(max-min))", spaceComplexity: "O(1)"
      },
      {
        id: "s63", title: "Single Element in Sorted Array", difficulty: "Medium", topic: "Binary Search",
        description: "In a sorted array where every element appears exactly twice except for one, find that single element.",
        approach: "Use binary search. Before the single element, pairs start at even indices. After it, pairs start at odd indices. Use this to decide which half to search.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
int singleNonDuplicate(vector<int>& nums) {
    int low = 0, high = nums.size() - 2;
    while (low <= high) {
        int mid = (low + high) / 2;
        if (nums[mid] == nums[mid ^ 1])
            low = mid + 1;
        else
            high = mid - 1;
    }
    return nums[low];
}`,
        hints: ["mid ^ 1 gives the pair index", "Pairs shift after the single element"],
        timeComplexity: "O(log n)", spaceComplexity: "O(1)", leetcodeNumber: 540
      },
      {
        id: "s64", title: "Search in Rotated Sorted Array", difficulty: "Medium", topic: "Binary Search",
        description: "Given a rotated sorted array, search for a target value.",
        approach: "Use modified binary search. Determine which half is sorted and check if target lies in that half.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
int search(vector<int>& nums, int target) {
    int low = 0, high = nums.size() - 1;
    while (low <= high) {
        int mid = (low + high) / 2;
        if (nums[mid] == target) return mid;
        if (nums[low] <= nums[mid]) {
            if (target >= nums[low] && target < nums[mid]) high = mid - 1;
            else low = mid + 1;
        } else {
            if (target > nums[mid] && target <= nums[high]) low = mid + 1;
            else high = mid - 1;
        }
    }
    return -1;
}`,
        hints: ["One half is always sorted", "Check if target lies in sorted half"],
        timeComplexity: "O(log n)", spaceComplexity: "O(1)", leetcodeNumber: 33
      },
      {
        id: "s65", title: "Median of Two Sorted Arrays", difficulty: "Hard", topic: "Binary Search",
        description: "Given two sorted arrays, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).",
        approach: "Binary search on the smaller array. Partition both arrays such that left elements ≤ right elements. The partition point gives the median.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
    if (nums1.size() > nums2.size()) return findMedianSortedArrays(nums2, nums1);
    int n1 = nums1.size(), n2 = nums2.size();
    int low = 0, high = n1;
    while (low <= high) {
        int cut1 = (low + high) / 2;
        int cut2 = (n1 + n2 + 1) / 2 - cut1;
        int l1 = cut1 == 0 ? INT_MIN : nums1[cut1 - 1];
        int l2 = cut2 == 0 ? INT_MIN : nums2[cut2 - 1];
        int r1 = cut1 == n1 ? INT_MAX : nums1[cut1];
        int r2 = cut2 == n2 ? INT_MAX : nums2[cut2];
        if (l1 <= r2 && l2 <= r1) {
            if ((n1 + n2) % 2 == 0)
                return (max(l1, l2) + min(r1, r2)) / 2.0;
            return max(l1, l2);
        } else if (l1 > r2) high = cut1 - 1;
        else low = cut1 + 1;
    }
    return 0.0;
}`,
        hints: ["Binary search on smaller array", "Partition both arrays correctly"],
        timeComplexity: "O(log(min(m,n)))", spaceComplexity: "O(1)", leetcodeNumber: 4
      },
      {
        id: "s66", title: "Kth Element of Two Sorted Arrays", difficulty: "Medium", topic: "Binary Search",
        description: "Given two sorted arrays, find the kth element of the combined sorted array.",
        approach: "Similar to median of two sorted arrays. Binary search on the smaller array with partition at k.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
int kthElement(vector<int>& a, vector<int>& b, int k) {
    int n1 = a.size(), n2 = b.size();
    if (n1 > n2) return kthElement(b, a, k);
    int low = max(0, k - n2), high = min(k, n1);
    while (low <= high) {
        int cut1 = (low + high) / 2;
        int cut2 = k - cut1;
        int l1 = cut1 == 0 ? INT_MIN : a[cut1 - 1];
        int l2 = cut2 == 0 ? INT_MIN : b[cut2 - 1];
        int r1 = cut1 == n1 ? INT_MAX : a[cut1];
        int r2 = cut2 == n2 ? INT_MAX : b[cut2];
        if (l1 <= r2 && l2 <= r1) return max(l1, l2);
        else if (l1 > r2) high = cut1 - 1;
        else low = cut1 + 1;
    }
    return -1;
}`,
        hints: ["Binary search on partition of smaller array", "Partition must have exactly k elements in left"],
        timeComplexity: "O(log(min(m,n)))", spaceComplexity: "O(1)"
      },
      {
        id: "s67", title: "Allocate Minimum Pages", difficulty: "Hard", topic: "Binary Search",
        description: "Given number of pages in N books and M students, allocate books such that maximum pages allocated to a student is minimized.",
        approach: "Binary search on the answer (max pages). For each mid, check if it's possible to allocate with that maximum using a greedy count of students.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
bool isPossible(vector<int>& books, int students, int maxPages) {
    int cnt = 1, pages = 0;
    for (int b : books) {
        if (pages + b > maxPages) {
            cnt++;
            pages = b;
            if (cnt > students) return false;
        } else pages += b;
    }
    return true;
}
int allocateBooks(vector<int>& books, int m) {
    if (m > books.size()) return -1;
    int low = *max_element(books.begin(), books.end());
    int high = accumulate(books.begin(), books.end(), 0);
    int ans = high;
    while (low <= high) {
        int mid = (low + high) / 2;
        if (isPossible(books, m, mid)) {
            ans = mid;
            high = mid - 1;
        } else low = mid + 1;
    }
    return ans;
}`,
        hints: ["Binary search on the answer (max pages per student)", "Greedy check: count students needed"],
        timeComplexity: "O(n log sum)", spaceComplexity: "O(1)"
      },
      {
        id: "s68", title: "Aggressive Cows", difficulty: "Hard", topic: "Binary Search",
        description: "Place C cows in N stalls such that the minimum distance between any two cows is maximized.",
        approach: "Binary search on the answer (minimum distance). For each distance, greedily place cows and check if all can be placed.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
bool canPlace(vector<int>& stalls, int cows, int minDist) {
    int cnt = 1, last = stalls[0];
    for (int i = 1; i < stalls.size(); i++) {
        if (stalls[i] - last >= minDist) {
            cnt++;
            last = stalls[i];
            if (cnt >= cows) return true;
        }
    }
    return false;
}
int aggressiveCows(vector<int>& stalls, int cows) {
    sort(stalls.begin(), stalls.end());
    int low = 1, high = stalls.back() - stalls[0];
    int ans = 0;
    while (low <= high) {
        int mid = (low + high) / 2;
        if (canPlace(stalls, cows, mid)) {
            ans = mid;
            low = mid + 1;
        } else high = mid - 1;
    }
    return ans;
}`,
        hints: ["Binary search on minimum distance", "Greedy placement to verify"],
        timeComplexity: "O(n log(max-min))", spaceComplexity: "O(1)"
      }
    ]
  },
  // ===================== DAY 12: Heaps =====================
  {
    name: "Heaps",
    day: 12,
    problems: [
      {
        id: "s69", title: "Max Heap / Min Heap Implementation", difficulty: "Easy", topic: "Heaps",
        description: "Implement a max heap with insert, delete, and extractMax operations.",
        approach: "Use array representation. Insert at end and bubble up. Extract max from root, replace with last element and heapify down.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
class MaxHeap {
    vector<int> heap;
    void heapifyUp(int i) {
        while (i > 0 && heap[i] > heap[(i-1)/2]) {
            swap(heap[i], heap[(i-1)/2]);
            i = (i-1)/2;
        }
    }
    void heapifyDown(int i) {
        int n = heap.size();
        while (2*i+1 < n) {
            int largest = i, l = 2*i+1, r = 2*i+2;
            if (l < n && heap[l] > heap[largest]) largest = l;
            if (r < n && heap[r] > heap[largest]) largest = r;
            if (largest == i) break;
            swap(heap[i], heap[largest]);
            i = largest;
        }
    }
public:
    void insert(int val) { heap.push_back(val); heapifyUp(heap.size()-1); }
    int extractMax() {
        if (heap.empty()) throw runtime_error("Heap is empty");
        int mx = heap[0];
        heap[0] = heap.back(); heap.pop_back();
        if (!heap.empty()) heapifyDown(0);
        return mx;
    }
};`,
        hints: ["Parent = (i-1)/2, children = 2i+1, 2i+2", "Bubble up on insert, heapify down on extract"],
        timeComplexity: "O(log n)", spaceComplexity: "O(n)"
      },
      {
        id: "s70", title: "Kth Largest Element", difficulty: "Medium", topic: "Heaps",
        description: "Given an integer array, find the kth largest element.",
        approach: "Use a min-heap of size k. The top of the heap is the kth largest element.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    for (int num : nums) {
        minHeap.push(num);
        if (minHeap.size() > k) minHeap.pop();
    }
    return minHeap.top();
}`,
        hints: ["Min-heap of size k", "Top of heap = kth largest"],
        timeComplexity: "O(n log k)", spaceComplexity: "O(k)", leetcodeNumber: 215
      },
      {
        id: "s71", title: "Maximum Sum Combination", difficulty: "Medium", topic: "Heaps",
        description: "Given two sorted arrays A and B of size N, find the C maximum sum combinations from A[i] + B[j].",
        approach: "Sort both arrays. Use max heap with initial pair (last of A, last of B). Pop max, push two children. Use set to avoid duplicates.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
vector<int> maxSumCombinations(vector<int>& A, vector<int>& B, int C) {
    sort(A.rbegin(), A.rend());
    sort(B.rbegin(), B.rend());
    int n = A.size();
    priority_queue<pair<int, pair<int,int>>> pq;
    set<pair<int,int>> visited;
    pq.push({A[0]+B[0], {0,0}});
    visited.insert({0,0});
    vector<int> result;
    while (C--) {
        auto [sum, idx] = pq.top(); pq.pop();
        auto [i, j] = idx;
        result.push_back(sum);
        if (i+1 < n && !visited.count({i+1,j})) {
            pq.push({A[i+1]+B[j], {i+1,j}});
            visited.insert({i+1,j});
        }
        if (j+1 < n && !visited.count({i,j+1})) {
            pq.push({A[i]+B[j+1], {i,j+1}});
            visited.insert({i,j+1});
        }
    }
    return result;
}`,
        hints: ["Max heap with index pairs", "Expand neighbors, avoid duplicates"],
        timeComplexity: "O(C log C)", spaceComplexity: "O(C)"
      },
      {
        id: "s72", title: "Find Median from Data Stream", difficulty: "Hard", topic: "Heaps",
        description: "Design a data structure that supports adding numbers and finding the median efficiently.",
        approach: "Use two heaps: max-heap for the lower half, min-heap for the upper half. Balance their sizes. Median is from the top(s).",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
class MedianFinder {
    priority_queue<int> maxHeap; // lower half
    priority_queue<int, vector<int>, greater<int>> minHeap; // upper half
public:
    void addNum(int num) {
        maxHeap.push(num);
        minHeap.push(maxHeap.top());
        maxHeap.pop();
        if (minHeap.size() > maxHeap.size()) {
            maxHeap.push(minHeap.top());
            minHeap.pop();
        }
    }
    double findMedian() {
        if (maxHeap.size() > minHeap.size()) return maxHeap.top();
        return (maxHeap.top() + minHeap.top()) / 2.0;
    }
};`,
        hints: ["Two heaps: max for lower, min for upper", "Keep balanced: maxHeap.size() >= minHeap.size()"],
        timeComplexity: "O(log n) per add", spaceComplexity: "O(n)", leetcodeNumber: 295
      },
      {
        id: "s73", title: "Merge K Sorted Lists", difficulty: "Hard", topic: "Heaps",
        description: "Merge k sorted linked lists and return it as one sorted list.",
        approach: "Use a min-heap to always pick the smallest element among the heads of all lists.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
struct ListNode { int val; ListNode* next; };
ListNode* mergeKLists(vector<ListNode*>& lists) {
    auto cmp = [](ListNode* a, ListNode* b) { return a->val > b->val; };
    priority_queue<ListNode*, vector<ListNode*>, decltype(cmp)> pq(cmp);
    for (auto list : lists)
        if (list) pq.push(list);
    ListNode dummy(0);
    ListNode* tail = &dummy;
    while (!pq.empty()) {
        auto node = pq.top(); pq.pop();
        tail->next = node;
        tail = tail->next;
        if (node->next) pq.push(node->next);
    }
    return dummy.next;
}`,
        hints: ["Min-heap of list heads", "Always pick smallest, push its next"],
        timeComplexity: "O(N log k)", spaceComplexity: "O(k)", leetcodeNumber: 23
      },
      {
        id: "s74", title: "Top K Frequent Elements", difficulty: "Medium", topic: "Heaps",
        description: "Given an integer array, return the k most frequent elements.",
        approach: "Count frequencies with hashmap. Use min-heap of size k on frequencies.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
vector<int> topKFrequent(vector<int>& nums, int k) {
    unordered_map<int, int> freq;
    for (int n : nums) freq[n]++;
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;
    for (auto& [num, cnt] : freq) {
        pq.push({cnt, num});
        if (pq.size() > k) pq.pop();
    }
    vector<int> result;
    while (!pq.empty()) { result.push_back(pq.top().second); pq.pop(); }
    return result;
}`,
        hints: ["Count frequencies first", "Min-heap of size k on frequency"],
        timeComplexity: "O(n log k)", spaceComplexity: "O(n)", leetcodeNumber: 347
      }
    ]
  },
  // ===================== DAY 13: Stack and Queue =====================
  {
    name: "Stack and Queue",
    day: 13,
    problems: [
      {
        id: "s75", title: "Implement Stack using Queue", difficulty: "Easy", topic: "Stack and Queue",
        description: "Implement a stack using only two queues.",
        approach: "Push: add to queue, then rotate all previous elements to back. Pop: just dequeue.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
class MyStack {
    queue<int> q;
public:
    void push(int x) {
        q.push(x);
        for (int i = 0; i < q.size() - 1; i++) {
            q.push(q.front()); q.pop();
        }
    }
    int pop() { int val = q.front(); q.pop(); return val; }
    int top() { return q.front(); }
    bool empty() { return q.empty(); }
};`,
        hints: ["Rotate queue after each push", "Single queue approach"],
        timeComplexity: "O(n) push, O(1) pop", spaceComplexity: "O(n)", leetcodeNumber: 225
      },
      {
        id: "s76", title: "Implement Queue using Stack", difficulty: "Easy", topic: "Stack and Queue",
        description: "Implement a queue using only two stacks.",
        approach: "Use two stacks. Push to input stack. For pop, if output stack is empty, transfer all from input to output.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
class MyQueue {
    stack<int> input, output;
    void transfer() { while (!input.empty()) { output.push(input.top()); input.pop(); } }
public:
    void push(int x) { input.push(x); }
    int pop() { if (output.empty()) transfer(); int val = output.top(); output.pop(); return val; }
    int peek() { if (output.empty()) transfer(); return output.top(); }
    bool empty() { return input.empty() && output.empty(); }
};`,
        hints: ["Two stacks: input and output", "Lazy transfer on pop/peek"],
        timeComplexity: "O(1) amortized", spaceComplexity: "O(n)", leetcodeNumber: 232
      },
      {
        id: "s77", title: "Valid Parentheses", difficulty: "Easy", topic: "Stack and Queue",
        description: "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
        approach: "Use a stack. Push opening brackets. For closing brackets, check if stack top matches.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') st.push(c);
        else {
            if (st.empty()) return false;
            char top = st.top(); st.pop();
            if ((c == ')' && top != '(') || (c == '}' && top != '{') || (c == ']' && top != '['))
                return false;
        }
    }
    return st.empty();
}`,
        hints: ["Stack for matching brackets", "Check empty stack for closing bracket"],
        timeComplexity: "O(n)", spaceComplexity: "O(n)", leetcodeNumber: 20
      },
      {
        id: "s78", title: "Next Greater Element", difficulty: "Easy", topic: "Stack and Queue",
        description: "Given an array, find the next greater element for every element. If none exists, output -1.",
        approach: "Use a stack. Traverse from right to left. Pop elements smaller than current. Stack top is the next greater element.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
vector<int> nextGreaterElements(vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n, -1);
    stack<int> st;
    for (int i = 2*n - 1; i >= 0; i--) {
        while (!st.empty() && st.top() <= nums[i % n]) st.pop();
        if (i < n && !st.empty()) result[i] = st.top();
        st.push(nums[i % n]);
    }
    return result;
}`,
        hints: ["Monotonic stack from right to left", "For circular, traverse 2n elements"],
        timeComplexity: "O(n)", spaceComplexity: "O(n)", leetcodeNumber: 503
      },
      {
        id: "s79", title: "Sort a Stack", difficulty: "Medium", topic: "Stack and Queue",
        description: "Sort a stack using recursion. No other data structure allowed.",
        approach: "Recursively pop all elements. Insert each element back in sorted position using another recursive function.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
void sortedInsert(stack<int>& st, int val) {
    if (st.empty() || st.top() <= val) { st.push(val); return; }
    int top = st.top(); st.pop();
    sortedInsert(st, val);
    st.push(top);
}
void sortStack(stack<int>& st) {
    if (st.empty()) return;
    int top = st.top(); st.pop();
    sortStack(st);
    sortedInsert(st, top);
}`,
        hints: ["Recursion as implicit stack", "Insert in sorted position recursively"],
        timeComplexity: "O(n²)", spaceComplexity: "O(n)"
      },
      {
        id: "s80", title: "LRU Cache", difficulty: "Hard", topic: "Stack and Queue",
        description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.",
        approach: "Use a doubly linked list + hashmap. Most recently used at front, least at back. O(1) get and put.",
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
        hints: ["Doubly linked list + hashmap", "Move accessed node to front"],
        timeComplexity: "O(1)", spaceComplexity: "O(capacity)", leetcodeNumber: 146
      },
      {
        id: "s81", title: "LFU Cache", difficulty: "Hard", topic: "Stack and Queue",
        description: "Design and implement a data structure for a Least Frequently Used (LFU) cache.",
        approach: "Use three hashmaps: key->value+freq, freq->list of keys, key->iterator. Track min frequency.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
class LFUCache {
    int cap, minFreq;
    unordered_map<int, pair<int,int>> keyVal; // key -> {value, freq}
    unordered_map<int, list<int>> freqList;   // freq -> keys
    unordered_map<int, list<int>::iterator> keyIter;
public:
    LFUCache(int capacity) : cap(capacity), minFreq(0) {}
    int get(int key) {
        if (!keyVal.count(key)) return -1;
        auto& [val, freq] = keyVal[key];
        freqList[freq].erase(keyIter[key]);
        if (freqList[freq].empty()) {
            freqList.erase(freq);
            if (minFreq == freq) minFreq++;
        }
        freq++;
        freqList[freq].push_front(key);
        keyIter[key] = freqList[freq].begin();
        return val;
    }
    void put(int key, int value) {
        if (cap <= 0) return;
        if (keyVal.count(key)) { keyVal[key].first = value; get(key); return; }
        if (keyVal.size() == cap) {
            int evict = freqList[minFreq].back();
            freqList[minFreq].pop_back();
            if (freqList[minFreq].empty()) freqList.erase(minFreq);
            keyVal.erase(evict); keyIter.erase(evict);
        }
        keyVal[key] = {value, 1}; minFreq = 1;
        freqList[1].push_front(key);
        keyIter[key] = freqList[1].begin();
    }
};`,
        hints: ["Three maps: key->(val,freq), freq->keys, key->iterator", "Track minimum frequency for eviction"],
        timeComplexity: "O(1)", spaceComplexity: "O(capacity)", leetcodeNumber: 460
      }
    ]
  },
  // ===================== DAY 14: Stack and Queue Part-II =====================
  {
    name: "Stack and Queue Part-II",
    day: 14,
    problems: [
      {
        id: "s82", title: "Sliding Window Maximum", difficulty: "Hard", topic: "Stack and Queue Part-II",
        description: "Given an array and a sliding window of size k, find the maximum in each window.",
        approach: "Use a deque to maintain indices of useful elements. Front of deque is always the maximum. Remove elements outside window and smaller elements.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq;
    vector<int> result;
    for (int i = 0; i < nums.size(); i++) {
        while (!dq.empty() && dq.front() <= i - k) dq.pop_front();
        while (!dq.empty() && nums[dq.back()] <= nums[i]) dq.pop_back();
        dq.push_back(i);
        if (i >= k - 1) result.push_back(nums[dq.front()]);
    }
    return result;
}`,
        hints: ["Monotonic deque", "Remove out-of-window and smaller elements"],
        timeComplexity: "O(n)", spaceComplexity: "O(k)", leetcodeNumber: 239
      },
      {
        id: "s83", title: "Min Stack", difficulty: "Medium", topic: "Stack and Queue Part-II",
        description: "Design a stack that supports push, pop, top, and retrieving the minimum element in O(1).",
        approach: "Use two stacks or store pairs of (value, currentMin).",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
class MinStack {
    stack<pair<int,int>> st; // {val, min}
public:
    void push(int val) {
        int mn = st.empty() ? val : min(val, st.top().second);
        st.push({val, mn});
    }
    void pop() { st.pop(); }
    int top() { return st.top().first; }
    int getMin() { return st.top().second; }
};`,
        hints: ["Store current minimum with each element", "Each push records the min at that point"],
        timeComplexity: "O(1) all ops", spaceComplexity: "O(n)", leetcodeNumber: 155
      },
      {
        id: "s84", title: "Rotten Oranges", difficulty: "Medium", topic: "Stack and Queue Part-II",
        description: "In a grid, fresh oranges rot adjacent oranges each minute. Find minimum time until all oranges rot.",
        approach: "Multi-source BFS. Start with all rotten oranges. Process level by level (each level = 1 minute).",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
int orangesRotting(vector<vector<int>>& grid) {
    int m = grid.size(), n = grid[0].size();
    queue<pair<int,int>> q;
    int fresh = 0;
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == 2) q.push({i,j});
            else if (grid[i][j] == 1) fresh++;
        }
    if (fresh == 0) return 0;
    int time = 0;
    int dx[] = {0,0,1,-1}, dy[] = {1,-1,0,0};
    while (!q.empty()) {
        int sz = q.size();
        bool rotted = false;
        while (sz--) {
            auto [x,y] = q.front(); q.pop();
            for (int d = 0; d < 4; d++) {
                int nx = x+dx[d], ny = y+dy[d];
                if (nx>=0 && nx<m && ny>=0 && ny<n && grid[nx][ny]==1) {
                    grid[nx][ny] = 2;
                    q.push({nx,ny});
                    fresh--;
                    rotted = true;
                }
            }
        }
        if (rotted) time++;
    }
    return fresh == 0 ? time : -1;
}`,
        hints: ["Multi-source BFS", "Count fresh oranges and track time"],
        timeComplexity: "O(m*n)", spaceComplexity: "O(m*n)", leetcodeNumber: 994
      },
      {
        id: "s85", title: "Online Stock Span", difficulty: "Medium", topic: "Stack and Queue Part-II",
        description: "Design a class that collects daily stock prices and returns the span (consecutive days with price ≤ today's price).",
        approach: "Use a monotonic stack of pairs (price, span). Pop all smaller prices, accumulating their spans.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
class StockSpanner {
    stack<pair<int,int>> st;
public:
    int next(int price) {
        int span = 1;
        while (!st.empty() && st.top().first <= price) {
            span += st.top().second;
            st.pop();
        }
        st.push({price, span});
        return span;
    }
};`,
        hints: ["Monotonic stack with accumulated spans", "Pop smaller, add their spans"],
        timeComplexity: "O(1) amortized", spaceComplexity: "O(n)", leetcodeNumber: 901
      },
      {
        id: "s86", title: "Largest Rectangle in Histogram", difficulty: "Hard", topic: "Stack and Queue Part-II",
        description: "Given an array of integers heights representing the histogram's bar heights, find the area of the largest rectangle.",
        approach: "Use a stack. For each bar, pop all taller bars and calculate area with the popped bar as the shortest bar.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
int largestRectangleArea(vector<int>& heights) {
    stack<int> st;
    int maxArea = 0, n = heights.size();
    for (int i = 0; i <= n; i++) {
        while (!st.empty() && (i == n || heights[st.top()] >= heights[i])) {
            int h = heights[st.top()]; st.pop();
            int w = st.empty() ? i : i - st.top() - 1;
            maxArea = max(maxArea, h * w);
        }
        st.push(i);
    }
    return maxArea;
}`,
        hints: ["Stack stores indices of increasing heights", "Calculate area when popping"],
        timeComplexity: "O(n)", spaceComplexity: "O(n)", leetcodeNumber: 84
      },
      {
        id: "s87", title: "Celebrity Problem", difficulty: "Medium", topic: "Stack and Queue Part-II",
        description: "In a party of N people, find the celebrity. Celebrity is known by everyone but knows nobody.",
        approach: "Use stack or two pointers. Eliminate non-celebrities by comparing pairs. Verify the remaining candidate.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
// Assume knows(a, b) API given
bool knows(int a, int b); // forward declaration
int celebrity(int n) {
    int candidate = 0;
    for (int i = 1; i < n; i++) {
        if (knows(candidate, i)) candidate = i;
    }
    for (int i = 0; i < n; i++) {
        if (i != candidate) {
            if (knows(candidate, i) || !knows(i, candidate)) return -1;
        }
    }
    return candidate;
}`,
        hints: ["Eliminate non-celebrities in first pass", "Verify candidate in second pass"],
        timeComplexity: "O(n)", spaceComplexity: "O(1)"
      },
      {
        id: "s88", title: "Implement Min Stack with O(1) Extra Space", difficulty: "Medium", topic: "Stack and Queue Part-II",
        description: "Implement Min Stack using O(1) extra space instead of storing min with each element.",
        approach: "Store modified values. When pushing smaller than min, push 2*val - min and update min. On pop, if popped < min, restore previous min.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
class MinStack {
    stack<long long> st;
    long long mn;
public:
    void push(int val) {
        if (st.empty()) { st.push(val); mn = val; }
        else if (val >= mn) st.push(val);
        else { st.push(2LL*val - mn); mn = val; }
    }
    void pop() {
        if (st.top() < mn) mn = 2*mn - st.top();
        st.pop();
    }
    int top() { return st.top() < mn ? mn : st.top(); }
    int getMin() { return mn; }
};`,
        hints: ["Store encoded values for O(1) space", "2*val - min trick to restore previous min"],
        timeComplexity: "O(1)", spaceComplexity: "O(1) extra"
      },
      {
        id: "s89", title: "Next Smaller Element", difficulty: "Easy", topic: "Stack and Queue Part-II",
        description: "Given an array, find the nearest smaller element on the left for every element.",
        approach: "Use a monotonic stack. Traverse left to right. Pop elements >= current. Stack top is the answer.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
vector<int> nextSmallerLeft(vector<int>& arr) {
    int n = arr.size();
    vector<int> result(n, -1);
    stack<int> st;
    for (int i = 0; i < n; i++) {
        while (!st.empty() && st.top() >= arr[i]) st.pop();
        if (!st.empty()) result[i] = st.top();
        st.push(arr[i]);
    }
    return result;
}`,
        hints: ["Monotonic increasing stack", "Pop elements >= current"],
        timeComplexity: "O(n)", spaceComplexity: "O(n)"
      },
      {
        id: "s90", title: "Maximal Rectangle", difficulty: "Hard", topic: "Stack and Queue Part-II",
        description: "Given a binary matrix, find the largest rectangle containing only 1s.",
        approach: "Build histogram for each row. Apply largest rectangle in histogram for each row.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
int largestRectangleArea(vector<int>& heights) {
    stack<int> st; int maxArea = 0, n = heights.size();
    for (int i = 0; i <= n; i++) {
        while (!st.empty() && (i == n || heights[st.top()] >= heights[i])) {
            int h = heights[st.top()]; st.pop();
            int w = st.empty() ? i : i - st.top() - 1;
            maxArea = max(maxArea, h * w);
        }
        st.push(i);
    }
    return maxArea;
}
int maximalRectangle(vector<vector<char>>& matrix) {
    if (matrix.empty()) return 0;
    int m = matrix.size(), n = matrix[0].size();
    vector<int> heights(n, 0);
    int maxArea = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++)
            heights[j] = matrix[i][j] == '1' ? heights[j] + 1 : 0;
        maxArea = max(maxArea, largestRectangleArea(heights));
    }
    return maxArea;
}`,
        hints: ["Build histogram row by row", "Apply largest rectangle in histogram"],
        timeComplexity: "O(m*n)", spaceComplexity: "O(n)", leetcodeNumber: 85
      },
      {
        id: "s91", title: "Trapping Rain Water (Stack)", difficulty: "Hard", topic: "Stack and Queue Part-II",
        description: "Solve trapping rain water using stack-based approach.",
        approach: "Use a stack to track bars. When current bar is taller than stack top, calculate trapped water between current bar and the bar below the top.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
int trapStack(vector<int>& height) {
    stack<int> st;
    int water = 0;
    for (int i = 0; i < height.size(); i++) {
        while (!st.empty() && height[i] > height[st.top()]) {
            int top = st.top(); st.pop();
            if (st.empty()) break;
            int dist = i - st.top() - 1;
            int bounded = min(height[i], height[st.top()]) - height[top];
            water += dist * bounded;
        }
        st.push(i);
    }
    return water;
}`,
        hints: ["Stack-based approach for trapping water", "Calculate water layer by layer"],
        timeComplexity: "O(n)", spaceComplexity: "O(n)", leetcodeNumber: 42
      }
    ]
  },
  // ===================== DAY 15: String =====================
  {
    name: "String",
    day: 15,
    problems: [
      {
        id: "s92", title: "Reverse Words in a String", difficulty: "Medium", topic: "String",
        description: "Given a string, reverse the order of words.",
        approach: "Reverse entire string, then reverse each word individually. Handle extra spaces.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
string reverseWords(string s) {
    stringstream ss(s);
    string word, result;
    while (ss >> word) result = word + (result.empty() ? "" : " ") + result;
    return result;
}`,
        hints: ["Split by spaces and reverse", "Handle leading/trailing spaces"],
        timeComplexity: "O(n)", spaceComplexity: "O(n)", leetcodeNumber: 151
      },
      {
        id: "s93", title: "Longest Palindromic Substring", difficulty: "Medium", topic: "String",
        description: "Given a string s, return the longest palindromic substring.",
        approach: "Expand around center. For each character (and each pair), expand outward while characters match.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
string longestPalindrome(string s) {
    int start = 0, maxLen = 1, n = s.size();
    auto expand = [&](int l, int r) {
        while (l >= 0 && r < n && s[l] == s[r]) { l--; r++; }
        if (r - l - 1 > maxLen) { start = l + 1; maxLen = r - l - 1; }
    };
    for (int i = 0; i < n; i++) {
        expand(i, i);
        expand(i, i + 1);
    }
    return s.substr(start, maxLen);
}`,
        hints: ["Expand around each center", "Try both odd and even length palindromes"],
        timeComplexity: "O(n²)", spaceComplexity: "O(1)", leetcodeNumber: 5
      },
      {
        id: "s94", title: "Roman to Integer", difficulty: "Easy", topic: "String",
        description: "Convert a Roman numeral string to an integer.",
        approach: "Traverse right to left. If current value < next value, subtract it; otherwise add it.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
int romanToInt(string s) {
    unordered_map<char,int> mp = {{'I',1},{'V',5},{'X',10},{'L',50},{'C',100},{'D',500},{'M',1000}};
    int result = 0;
    for (int i = 0; i < s.size(); i++) {
        if (i + 1 < s.size() && mp[s[i]] < mp[s[i+1]])
            result -= mp[s[i]];
        else
            result += mp[s[i]];
    }
    return result;
}`,
        hints: ["If smaller before larger, subtract", "Map each character to value"],
        timeComplexity: "O(n)", spaceComplexity: "O(1)", leetcodeNumber: 13
      },
      {
        id: "s95", title: "String to Integer (atoi)", difficulty: "Medium", topic: "String",
        description: "Implement the myAtoi function which converts a string to a 32-bit signed integer.",
        approach: "Skip whitespace, handle sign, convert digits. Check for overflow at each step.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
int myAtoi(string s) {
    int i = 0, sign = 1;
    long result = 0;
    while (i < s.size() && s[i] == ' ') i++;
    if (i < s.size() && (s[i] == '+' || s[i] == '-')) sign = s[i++] == '-' ? -1 : 1;
    while (i < s.size() && isdigit(s[i])) {
        result = result * 10 + (s[i++] - '0');
        if (result * sign > INT_MAX) return INT_MAX;
        if (result * sign < INT_MIN) return INT_MIN;
    }
    return result * sign;
}`,
        hints: ["Handle whitespace, sign, digits, overflow", "Check bounds at each step"],
        timeComplexity: "O(n)", spaceComplexity: "O(1)", leetcodeNumber: 8
      },
      {
        id: "s96", title: "Count and Say", difficulty: "Medium", topic: "String",
        description: "The count-and-say sequence is a sequence where each term is generated by reading off the previous term.",
        approach: "Build each term iteratively. Count consecutive identical characters and append count + character.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
string countAndSay(int n) {
    string s = "1";
    for (int i = 2; i <= n; i++) {
        string next = "";
        int count = 1;
        for (int j = 1; j < s.size(); j++) {
            if (s[j] == s[j-1]) count++;
            else { next += to_string(count) + s[j-1]; count = 1; }
        }
        next += to_string(count) + s.back();
        s = next;
    }
    return s;
}`,
        hints: ["Build iteratively from previous term", "Count consecutive same chars"],
        timeComplexity: "O(n * L)", spaceComplexity: "O(L)", leetcodeNumber: 38
      },
      {
        id: "s97", title: "Implement strStr() / KMP", difficulty: "Medium", topic: "String",
        description: "Return the index of the first occurrence of needle in haystack, or -1 if not found.",
        approach: "Use KMP algorithm. Build LPS (Longest Prefix Suffix) array for pattern. Use it to skip unnecessary comparisons.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
int strStr(string haystack, string needle) {
    int n = haystack.size(), m = needle.size();
    if (m == 0) return 0;
    vector<int> lps(m, 0);
    int len = 0, i = 1;
    while (i < m) {
        if (needle[i] == needle[len]) { lps[i++] = ++len; }
        else { if (len) len = lps[len-1]; else lps[i++] = 0; }
    }
    i = 0; int j = 0;
    while (i < n) {
        if (haystack[i] == needle[j]) { i++; j++; }
        if (j == m) return i - j;
        else if (i < n && haystack[i] != needle[j]) {
            if (j) j = lps[j-1]; else i++;
        }
    }
    return -1;
}`,
        hints: ["Build LPS array for pattern", "Use LPS to skip comparisons"],
        timeComplexity: "O(n + m)", spaceComplexity: "O(m)", leetcodeNumber: 28
      }
    ]
  },
  // ===================== DAY 16: String Part-II =====================
  {
    name: "String Part-II",
    day: 16,
    problems: [
      {
        id: "s98", title: "Z-Algorithm", difficulty: "Medium", topic: "String Part-II",
        description: "Given a string, compute the Z-array where Z[i] is the length of the longest substring starting from i which is also a prefix.",
        approach: "Maintain a window [l, r] of the rightmost Z-box. Use it to initialize Z[i] before extending.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
vector<int> zFunction(string s) {
    int n = s.size();
    vector<int> z(n, 0);
    int l = 0, r = 0;
    for (int i = 1; i < n; i++) {
        if (i < r) z[i] = min(r - i, z[i - l]);
        while (i + z[i] < n && s[z[i]] == s[i + z[i]]) z[i]++;
        if (i + z[i] > r) { l = i; r = i + z[i]; }
    }
    return z;
}`,
        hints: ["Maintain Z-box window [l, r]", "Use previous Z values to speed up"],
        timeComplexity: "O(n)", spaceComplexity: "O(n)"
      },
      {
        id: "s99", title: "Minimum Characters for Palindrome", difficulty: "Hard", topic: "String Part-II",
        description: "Given a string, find the minimum characters to be added at the front to make it a palindrome.",
        approach: "Find the longest palindromic prefix. Characters not part of this prefix need to be added. Use KMP LPS on s + '#' + reverse(s).",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
int minCharsForPalindrome(string s) {
    string rev = s;
    reverse(rev.begin(), rev.end());
    string concat = s + "#" + rev;
    int n = concat.size();
    vector<int> lps(n, 0);
    int len = 0, i = 1;
    while (i < n) {
        if (concat[i] == concat[len]) lps[i++] = ++len;
        else { if (len) len = lps[len-1]; else lps[i++] = 0; }
    }
    return s.size() - lps[n-1];
}`,
        hints: ["Find longest palindromic prefix", "Use KMP on s + # + reverse(s)"],
        timeComplexity: "O(n)", spaceComplexity: "O(n)"
      },
      {
        id: "s100", title: "Check for Anagrams", difficulty: "Easy", topic: "String Part-II",
        description: "Given two strings, check if they are anagrams of each other.",
        approach: "Count character frequencies. Both strings should have same frequency for all characters.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
bool isAnagram(string s, string t) {
    if (s.size() != t.size()) return false;
    vector<int> count(26, 0);
    for (int i = 0; i < s.size(); i++) {
        count[s[i]-'a']++;
        count[t[i]-'a']--;
    }
    for (int c : count) if (c != 0) return false;
    return true;
}`,
        hints: ["Count frequencies", "All counts should be zero"],
        timeComplexity: "O(n)", spaceComplexity: "O(1)", leetcodeNumber: 242
      },
      {
        id: "s101", title: "Compare Version Numbers", difficulty: "Medium", topic: "String Part-II",
        description: "Compare two version numbers version1 and version2.",
        approach: "Split by '.', compare each revision number. Treat missing revisions as 0.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
int compareVersion(string v1, string v2) {
    int i = 0, j = 0;
    while (i < v1.size() || j < v2.size()) {
        int n1 = 0, n2 = 0;
        while (i < v1.size() && v1[i] != '.') n1 = n1*10 + (v1[i++]-'0');
        while (j < v2.size() && v2[j] != '.') n2 = n2*10 + (v2[j++]-'0');
        if (n1 > n2) return 1;
        if (n1 < n2) return -1;
        i++; j++;
    }
    return 0;
}`,
        hints: ["Parse each revision number", "Missing revisions = 0"],
        timeComplexity: "O(n)", spaceComplexity: "O(1)", leetcodeNumber: 165
      },
      {
        id: "s102", title: "Rabin-Karp Algorithm", difficulty: "Medium", topic: "String Part-II",
        description: "Implement pattern searching using Rabin-Karp rolling hash algorithm.",
        approach: "Compute hash of pattern and rolling hash of text window. Compare hashes, verify on match.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
vector<int> rabinKarp(string text, string pattern) {
    int n = text.size(), m = pattern.size();
    long long d = 256, q = 1e9+7;
    long long h = 1, p = 0, t = 0;
    vector<int> result;
    for (int i = 0; i < m - 1; i++) h = (h * d) % q;
    for (int i = 0; i < m; i++) {
        p = (d * p + pattern[i]) % q;
        t = (d * t + text[i]) % q;
    }
    for (int i = 0; i <= n - m; i++) {
        if (p == t && text.substr(i, m) == pattern) result.push_back(i);
        if (i < n - m) {
            t = (d * (t - text[i] * h) + text[i + m]) % q;
            if (t < 0) t += q;
        }
    }
    return result;
}`,
        hints: ["Rolling hash for O(1) window update", "Verify on hash match to avoid collisions"],
        timeComplexity: "O(n + m) avg", spaceComplexity: "O(1)"
      },
      {
        id: "s103", title: "Repeated String Match", difficulty: "Medium", topic: "String Part-II",
        description: "Given two strings a and b, return the minimum number of times a should be repeated such that b is a substring of the repeated a.",
        approach: "Repeat a until its length >= b's length + a's length. Check if b is a substring at each step.",
        solutionCode: `#include <bits/stdc++.h>
using namespace std;
int repeatedStringMatch(string a, string b) {
    string repeated = a;
    int count = 1;
    while (repeated.size() < b.size()) { repeated += a; count++; }
    if (repeated.find(b) != string::npos) return count;
    repeated += a; count++;
    if (repeated.find(b) != string::npos) return count;
    return -1;
}`,
        hints: ["Repeat until length >= len(b)", "Check one more repetition after that"],
        timeComplexity: "O(n * m)", spaceComplexity: "O(n + m)", leetcodeNumber: 686
      }
    ]
  },
  // ===================== DAY 17-26: Binary Tree, BST, Graph, DP, Trie =====================
  // Continuing with condensed format for remaining days
  {
    name: "Binary Tree",
    day: 17,
    problems: [
      { id: "s104", title: "Inorder Traversal", difficulty: "Easy", topic: "Binary Tree", description: "Return the inorder traversal of a binary tree.", approach: "Recursive: left, root, right. Or use stack iteratively.", solutionCode: `#include <bits/stdc++.h>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int x):val(x),left(nullptr),right(nullptr){} };\nvector<int> inorderTraversal(TreeNode* root) {\n    vector<int> res;\n    stack<TreeNode*> st;\n    TreeNode* curr = root;\n    while (curr || !st.empty()) {\n        while (curr) { st.push(curr); curr = curr->left; }\n        curr = st.top(); st.pop();\n        res.push_back(curr->val);\n        curr = curr->right;\n    }\n    return res;\n}`, hints: ["Left, Root, Right", "Stack for iterative"], timeComplexity: "O(n)", spaceComplexity: "O(n)", leetcodeNumber: 94 },
      { id: "s105", title: "Preorder Traversal", difficulty: "Easy", topic: "Binary Tree", description: "Return preorder traversal of binary tree.", approach: "Root, left, right using stack.", solutionCode: `vector<int> preorderTraversal(TreeNode* root) {\n    if (!root) return {};\n    vector<int> res;\n    stack<TreeNode*> st;\n    st.push(root);\n    while (!st.empty()) {\n        auto node = st.top(); st.pop();\n        res.push_back(node->val);\n        if (node->right) st.push(node->right);\n        if (node->left) st.push(node->left);\n    }\n    return res;\n}`, hints: ["Push right then left to stack"], timeComplexity: "O(n)", spaceComplexity: "O(n)", leetcodeNumber: 144 },
      { id: "s106", title: "Postorder Traversal", difficulty: "Easy", topic: "Binary Tree", description: "Return postorder traversal.", approach: "Left, right, root. Use two stacks or reverse of modified preorder.", solutionCode: `vector<int> postorderTraversal(TreeNode* root) {\n    if (!root) return {};\n    vector<int> res;\n    stack<TreeNode*> st;\n    st.push(root);\n    while (!st.empty()) {\n        auto node = st.top(); st.pop();\n        res.push_back(node->val);\n        if (node->left) st.push(node->left);\n        if (node->right) st.push(node->right);\n    }\n    reverse(res.begin(), res.end());\n    return res;\n}`, hints: ["Reverse of root-right-left"], timeComplexity: "O(n)", spaceComplexity: "O(n)", leetcodeNumber: 145 },
      { id: "s107", title: "Morris Inorder Traversal", difficulty: "Medium", topic: "Binary Tree", description: "Inorder traversal without recursion or stack (O(1) space).", approach: "Use threaded binary tree. If no left child, visit and go right. If left child exists, find inorder predecessor, create thread or remove it.", solutionCode: `vector<int> morrisInorder(TreeNode* root) {\n    vector<int> res;\n    TreeNode* curr = root;\n    while (curr) {\n        if (!curr->left) {\n            res.push_back(curr->val);\n            curr = curr->right;\n        } else {\n            TreeNode* pred = curr->left;\n            while (pred->right && pred->right != curr) pred = pred->right;\n            if (!pred->right) { pred->right = curr; curr = curr->left; }\n            else { pred->right = nullptr; res.push_back(curr->val); curr = curr->right; }\n        }\n    }\n    return res;\n}`, hints: ["Thread predecessor's right to current", "O(1) space traversal"], timeComplexity: "O(n)", spaceComplexity: "O(1)" },
      { id: "s108", title: "Left/Right View of Binary Tree", difficulty: "Medium", topic: "Binary Tree", description: "Print the left view and right view of a binary tree.", approach: "BFS level order. Left view: first node of each level. Right view: last node of each level.", solutionCode: `vector<int> rightSideView(TreeNode* root) {\n    if (!root) return {};\n    vector<int> res;\n    queue<TreeNode*> q;\n    q.push(root);\n    while (!q.empty()) {\n        int sz = q.size();\n        for (int i = 0; i < sz; i++) {\n            auto node = q.front(); q.pop();\n            if (i == sz - 1) res.push_back(node->val);\n            if (node->left) q.push(node->left);\n            if (node->right) q.push(node->right);\n        }\n    }\n    return res;\n}`, hints: ["Level order traversal", "First/last node per level"], timeComplexity: "O(n)", spaceComplexity: "O(n)", leetcodeNumber: 199 },
      { id: "s109", title: "Bottom View of Binary Tree", difficulty: "Medium", topic: "Binary Tree", description: "Print bottom view of binary tree (nodes visible from bottom).", approach: "Use vertical order traversal with BFS. For each horizontal distance, keep the last node encountered.", solutionCode: `#include <bits/stdc++.h>\nusing namespace std;\nvector<int> bottomView(TreeNode* root) {\n    if (!root) return {};\n    map<int, int> mp;\n    queue<pair<TreeNode*, int>> q;\n    q.push({root, 0});\n    while (!q.empty()) {\n        auto [node, hd] = q.front(); q.pop();\n        mp[hd] = node->val;\n        if (node->left) q.push({node->left, hd - 1});\n        if (node->right) q.push({node->right, hd + 1});\n    }\n    vector<int> res;\n    for (auto& [k, v] : mp) res.push_back(v);\n    return res;\n}`, hints: ["BFS with horizontal distance", "Map stores last node at each HD"], timeComplexity: "O(n)", spaceComplexity: "O(n)" },
      { id: "s110", title: "Top View of Binary Tree", difficulty: "Medium", topic: "Binary Tree", description: "Print top view of binary tree.", approach: "BFS with horizontal distance. For each HD, keep the first node encountered.", solutionCode: `vector<int> topView(TreeNode* root) {\n    if (!root) return {};\n    map<int, int> mp;\n    queue<pair<TreeNode*, int>> q;\n    q.push({root, 0});\n    while (!q.empty()) {\n        auto [node, hd] = q.front(); q.pop();\n        if (!mp.count(hd)) mp[hd] = node->val;\n        if (node->left) q.push({node->left, hd - 1});\n        if (node->right) q.push({node->right, hd + 1});\n    }\n    vector<int> res;\n    for (auto& [k, v] : mp) res.push_back(v);\n    return res;\n}`, hints: ["First node at each horizontal distance", "BFS ensures level order"], timeComplexity: "O(n)", spaceComplexity: "O(n)" },
      { id: "s111", title: "Vertical Order Traversal", difficulty: "Hard", topic: "Binary Tree", description: "Return the vertical order traversal of a binary tree.", approach: "BFS with (horizontal distance, level). Group by HD, sort by level then value.", solutionCode: `vector<vector<int>> verticalTraversal(TreeNode* root) {\n    map<int, map<int, multiset<int>>> mp;\n    queue<tuple<TreeNode*, int, int>> q;\n    q.push({root, 0, 0});\n    while (!q.empty()) {\n        auto [node, x, y] = q.front(); q.pop();\n        mp[x][y].insert(node->val);\n        if (node->left) q.push({node->left, x-1, y+1});\n        if (node->right) q.push({node->right, x+1, y+1});\n    }\n    vector<vector<int>> res;\n    for (auto& [x, levels] : mp) {\n        vector<int> col;\n        for (auto& [y, vals] : levels) col.insert(col.end(), vals.begin(), vals.end());\n        res.push_back(col);\n    }\n    return res;\n}`, hints: ["Group by HD, sort by level", "Use multiset for same-position nodes"], timeComplexity: "O(n log n)", spaceComplexity: "O(n)", leetcodeNumber: 987 },
      { id: "s112", title: "Root to Node Path", difficulty: "Medium", topic: "Binary Tree", description: "Find the path from root to a given node.", approach: "DFS. If current node is target, return true. If found in left or right subtree, add current node to path.", solutionCode: `bool getPath(TreeNode* root, int target, vector<int>& path) {\n    if (!root) return false;\n    path.push_back(root->val);\n    if (root->val == target) return true;\n    if (getPath(root->left, target, path) || getPath(root->right, target, path))\n        return true;\n    path.pop_back();\n    return false;\n}`, hints: ["Backtracking DFS", "Add node, recurse, remove if not found"], timeComplexity: "O(n)", spaceComplexity: "O(h)" },
      { id: "s113", title: "Max Width of Binary Tree", difficulty: "Medium", topic: "Binary Tree", description: "Find the maximum width of a binary tree (max nodes between leftmost and rightmost at any level).", approach: "BFS with indices. For each node at index i, children are at 2i+1 and 2i+2. Width = rightmost - leftmost + 1.", solutionCode: `int widthOfBinaryTree(TreeNode* root) {\n    if (!root) return 0;\n    int maxWidth = 0;\n    queue<pair<TreeNode*, unsigned long long>> q;\n    q.push({root, 0});\n    while (!q.empty()) {\n        int sz = q.size();\n        unsigned long long minIdx = q.front().second;\n        unsigned long long first, last;\n        for (int i = 0; i < sz; i++) {\n            auto [node, idx] = q.front(); q.pop();\n            idx -= minIdx;\n            if (i == 0) first = idx;\n            if (i == sz - 1) last = idx;\n            if (node->left) q.push({node->left, 2*idx+1});\n            if (node->right) q.push({node->right, 2*idx+2});\n        }\n        maxWidth = max(maxWidth, (int)(last - first + 1));\n    }\n    return maxWidth;\n}`, hints: ["Index-based BFS", "Normalize indices to prevent overflow"], timeComplexity: "O(n)", spaceComplexity: "O(n)", leetcodeNumber: 662 },
      { id: "s114", title: "Level Order Traversal", difficulty: "Medium", topic: "Binary Tree", description: "Return the level order traversal of a binary tree.", approach: "Standard BFS with queue. Process one level at a time.", solutionCode: `vector<vector<int>> levelOrder(TreeNode* root) {\n    if (!root) return {};\n    vector<vector<int>> res;\n    queue<TreeNode*> q;\n    q.push(root);\n    while (!q.empty()) {\n        int sz = q.size();\n        vector<int> level;\n        while (sz--) {\n            auto node = q.front(); q.pop();\n            level.push_back(node->val);\n            if (node->left) q.push(node->left);\n            if (node->right) q.push(node->right);\n        }\n        res.push_back(level);\n    }\n    return res;\n}`, hints: ["BFS with queue", "Process level by level"], timeComplexity: "O(n)", spaceComplexity: "O(n)", leetcodeNumber: 102 },
      { id: "s115", title: "Height of Binary Tree", difficulty: "Easy", topic: "Binary Tree", description: "Find the maximum depth/height of a binary tree.", approach: "Recursive: height = 1 + max(left height, right height). Base case: null = 0.", solutionCode: `int maxDepth(TreeNode* root) {\n    if (!root) return 0;\n    return 1 + max(maxDepth(root->left), maxDepth(root->right));\n}`, hints: ["Recursive definition", "Base: null node has height 0"], timeComplexity: "O(n)", spaceComplexity: "O(h)", leetcodeNumber: 104 }
    ]
  },
  { name: "Binary Tree Part-II", day: 18, problems: [
    { id: "s116", title: "Diameter of Binary Tree", difficulty: "Easy", topic: "Binary Tree Part-II", description: "Find the diameter (longest path between any two nodes).", approach: "At each node, diameter passing through it = left height + right height. Track max.", solutionCode: `int diameterOfBinaryTree(TreeNode* root) {\n    int diameter = 0;\n    function<int(TreeNode*)> height = [&](TreeNode* node) -> int {\n        if (!node) return 0;\n        int l = height(node->left), r = height(node->right);\n        diameter = max(diameter, l + r);\n        return 1 + max(l, r);\n    };\n    height(root);\n    return diameter;\n}`, hints: ["Diameter through node = left height + right height"], timeComplexity: "O(n)", spaceComplexity: "O(h)", leetcodeNumber: 543 },
    { id: "s117", title: "Check if Balanced Binary Tree", difficulty: "Easy", topic: "Binary Tree Part-II", description: "Check if a binary tree is height-balanced.", approach: "Return -1 if unbalanced, otherwise return height. A node is balanced if |leftH - rightH| <= 1.", solutionCode: `bool isBalanced(TreeNode* root) {\n    function<int(TreeNode*)> check = [&](TreeNode* node) -> int {\n        if (!node) return 0;\n        int l = check(node->left); if (l == -1) return -1;\n        int r = check(node->right); if (r == -1) return -1;\n        if (abs(l - r) > 1) return -1;\n        return 1 + max(l, r);\n    };\n    return check(root) != -1;\n}`, hints: ["Return -1 for unbalanced subtree", "Check balance while computing height"], timeComplexity: "O(n)", spaceComplexity: "O(h)", leetcodeNumber: 110 },
    { id: "s118", title: "LCA of Binary Tree", difficulty: "Medium", topic: "Binary Tree Part-II", description: "Find the lowest common ancestor of two nodes in a binary tree.", approach: "If current node is p or q, return it. Recurse left and right. If both return non-null, current is LCA.", solutionCode: `TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n    if (!root || root == p || root == q) return root;\n    auto left = lowestCommonAncestor(root->left, p, q);\n    auto right = lowestCommonAncestor(root->right, p, q);\n    if (left && right) return root;\n    return left ? left : right;\n}`, hints: ["If both sides return non-null, root is LCA", "If one side null, other side has both"], timeComplexity: "O(n)", spaceComplexity: "O(h)", leetcodeNumber: 236 },
    { id: "s119", title: "Same Tree", difficulty: "Easy", topic: "Binary Tree Part-II", description: "Check if two binary trees are identical.", approach: "Recursively check if current nodes match and both subtrees match.", solutionCode: `bool isSameTree(TreeNode* p, TreeNode* q) {\n    if (!p && !q) return true;\n    if (!p || !q) return false;\n    return p->val == q->val && isSameTree(p->left, q->left) && isSameTree(p->right, q->right);\n}`, hints: ["Both null = same, one null = different", "Compare values and recurse"], timeComplexity: "O(n)", spaceComplexity: "O(h)", leetcodeNumber: 100 },
    { id: "s120", title: "Zigzag Level Order Traversal", difficulty: "Medium", topic: "Binary Tree Part-II", description: "Return zigzag level order traversal of binary tree.", approach: "BFS with a flag to alternate direction. Reverse every other level.", solutionCode: `vector<vector<int>> zigzagLevelOrder(TreeNode* root) {\n    if (!root) return {};\n    vector<vector<int>> res;\n    queue<TreeNode*> q;\n    q.push(root);\n    bool leftToRight = true;\n    while (!q.empty()) {\n        int sz = q.size();\n        vector<int> level(sz);\n        for (int i = 0; i < sz; i++) {\n            auto node = q.front(); q.pop();\n            int idx = leftToRight ? i : sz - 1 - i;\n            level[idx] = node->val;\n            if (node->left) q.push(node->left);\n            if (node->right) q.push(node->right);\n        }\n        res.push_back(level);\n        leftToRight = !leftToRight;\n    }\n    return res;\n}`, hints: ["BFS + alternating direction", "Place at correct index based on direction"], timeComplexity: "O(n)", spaceComplexity: "O(n)", leetcodeNumber: 103 },
    { id: "s121", title: "Boundary Traversal", difficulty: "Medium", topic: "Binary Tree Part-II", description: "Print the boundary of a binary tree in anti-clockwise direction.", approach: "Print left boundary (top-down), leaf nodes (left-right), right boundary (bottom-up).", solutionCode: `void leftBound(TreeNode* node, vector<int>& res) {\n    if (!node || (!node->left && !node->right)) return;\n    res.push_back(node->val);\n    if (node->left) leftBound(node->left, res);\n    else leftBound(node->right, res);\n}\nvoid leaves(TreeNode* node, vector<int>& res) {\n    if (!node) return;\n    if (!node->left && !node->right) { res.push_back(node->val); return; }\n    leaves(node->left, res);\n    leaves(node->right, res);\n}\nvoid rightBound(TreeNode* node, vector<int>& res) {\n    if (!node || (!node->left && !node->right)) return;\n    if (node->right) rightBound(node->right, res);\n    else rightBound(node->left, res);\n    res.push_back(node->val);\n}\nvector<int> boundary(TreeNode* root) {\n    if (!root) return {};\n    vector<int> res = {root->val};\n    leftBound(root->left, res);\n    leaves(root->left, res);\n    leaves(root->right, res);\n    rightBound(root->right, res);\n    return res;\n}`, hints: ["Three parts: left boundary, leaves, right boundary"], timeComplexity: "O(n)", spaceComplexity: "O(n)" },
    { id: "s122", title: "Maximum Path Sum", difficulty: "Hard", topic: "Binary Tree Part-II", description: "Find the maximum path sum in a binary tree. Path can start and end at any node.", approach: "At each node, max path through it = node.val + max(0, left) + max(0, right). Return node.val + max(0, max(left, right)) upward.", solutionCode: `int maxPathSum(TreeNode* root) {\n    int maxSum = INT_MIN;\n    function<int(TreeNode*)> solve = [&](TreeNode* node) -> int {\n        if (!node) return 0;\n        int l = max(0, solve(node->left));\n        int r = max(0, solve(node->right));\n        maxSum = max(maxSum, node->val + l + r);\n        return node->val + max(l, r);\n    };\n    solve(root);\n    return maxSum;\n}`, hints: ["Consider negative paths as 0", "Return single path upward, track max split path"], timeComplexity: "O(n)", spaceComplexity: "O(h)", leetcodeNumber: 124 },
    { id: "s123", title: "Construct Binary Tree from Inorder and Preorder", difficulty: "Medium", topic: "Binary Tree Part-II", description: "Build binary tree from inorder and preorder traversals.", approach: "First element of preorder is root. Find it in inorder to split left and right subtrees. Recurse.", solutionCode: `TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {\n    unordered_map<int,int> mp;\n    for (int i = 0; i < inorder.size(); i++) mp[inorder[i]] = i;\n    int idx = 0;\n    function<TreeNode*(int, int)> build = [&](int l, int r) -> TreeNode* {\n        if (l > r) return nullptr;\n        int val = preorder[idx++];\n        auto node = new TreeNode(val);\n        node->left = build(l, mp[val] - 1);\n        node->right = build(mp[val] + 1, r);\n        return node;\n    };\n    return build(0, inorder.size() - 1);\n}`, hints: ["Preorder first = root", "Find root in inorder to split"], timeComplexity: "O(n)", spaceComplexity: "O(n)", leetcodeNumber: 105 }
  ]},
  { name: "Binary Tree Part-III", day: 19, problems: [
    { id: "s124", title: "Mirror / Symmetric Tree", difficulty: "Easy", topic: "Binary Tree Part-III", description: "Check if a binary tree is a mirror of itself (symmetric).", approach: "Compare left subtree with right subtree recursively. Left's left matches right's right and vice versa.", solutionCode: `bool isSymmetric(TreeNode* root) {\n    if (!root) return true;\n    function<bool(TreeNode*, TreeNode*)> check = [&](TreeNode* l, TreeNode* r) -> bool {\n        if (!l && !r) return true;\n        if (!l || !r) return false;\n        return l->val == r->val && check(l->left, r->right) && check(l->right, r->left);\n    };\n    return check(root->left, root->right);\n}`, hints: ["Compare left-left with right-right", "Mirror comparison"], timeComplexity: "O(n)", spaceComplexity: "O(h)", leetcodeNumber: 101 },
    { id: "s125", title: "Flatten Binary Tree to Linked List", difficulty: "Medium", topic: "Binary Tree Part-III", description: "Flatten a binary tree to a linked list in-place following preorder.", approach: "Morris-like: for each node, find rightmost of left subtree, connect it to right child, then move left to right.", solutionCode: `void flatten(TreeNode* root) {\n    TreeNode* curr = root;\n    while (curr) {\n        if (curr->left) {\n            TreeNode* pred = curr->left;\n            while (pred->right) pred = pred->right;\n            pred->right = curr->right;\n            curr->right = curr->left;\n            curr->left = nullptr;\n        }\n        curr = curr->right;\n    }\n}`, hints: ["Connect left subtree's rightmost to right child", "Move left to right"], timeComplexity: "O(n)", spaceComplexity: "O(1)", leetcodeNumber: 114 },
    { id: "s126", title: "Check Children Sum Property", difficulty: "Medium", topic: "Binary Tree Part-III", description: "Check if for every node, its value equals the sum of its children's values.", approach: "Recursive check. For each node, verify val == left.val + right.val (with nulls as 0).", solutionCode: `bool isChildrenSum(TreeNode* root) {\n    if (!root || (!root->left && !root->right)) return true;\n    int sum = 0;\n    if (root->left) sum += root->left->val;\n    if (root->right) sum += root->right->val;\n    return root->val == sum && isChildrenSum(root->left) && isChildrenSum(root->right);\n}`, hints: ["Node value = sum of children", "Leaf nodes satisfy trivially"], timeComplexity: "O(n)", spaceComplexity: "O(h)" },
    { id: "s127", title: "Nodes at Distance K", difficulty: "Medium", topic: "Binary Tree Part-III", description: "Find all nodes at distance K from a target node.", approach: "BFS from target. First build parent pointers using BFS. Then BFS from target using parent pointers.", solutionCode: `vector<int> distanceK(TreeNode* root, TreeNode* target, int k) {\n    unordered_map<TreeNode*, TreeNode*> parent;\n    queue<TreeNode*> q;\n    q.push(root);\n    while (!q.empty()) {\n        auto node = q.front(); q.pop();\n        if (node->left) { parent[node->left] = node; q.push(node->left); }\n        if (node->right) { parent[node->right] = node; q.push(node->right); }\n    }\n    unordered_set<TreeNode*> visited;\n    q.push(target);\n    visited.insert(target);\n    int dist = 0;\n    while (!q.empty()) {\n        if (dist == k) { vector<int> res; while (!q.empty()) { res.push_back(q.front()->val); q.pop(); } return res; }\n        int sz = q.size();\n        while (sz--) {\n            auto node = q.front(); q.pop();\n            if (node->left && !visited.count(node->left)) { visited.insert(node->left); q.push(node->left); }\n            if (node->right && !visited.count(node->right)) { visited.insert(node->right); q.push(node->right); }\n            if (parent.count(node) && !visited.count(parent[node])) { visited.insert(parent[node]); q.push(parent[node]); }\n        }\n        dist++;\n    }\n    return {};\n}`, hints: ["Build parent map first", "BFS from target in all 3 directions"], timeComplexity: "O(n)", spaceComplexity: "O(n)", leetcodeNumber: 863 },
    { id: "s128", title: "Count Nodes in Complete Binary Tree", difficulty: "Medium", topic: "Binary Tree Part-III", description: "Count nodes in a complete binary tree in better than O(n).", approach: "Compare left and right heights. If equal, it's a perfect tree with 2^h - 1 nodes. Otherwise recurse.", solutionCode: `int countNodes(TreeNode* root) {\n    if (!root) return 0;\n    int lh = 0, rh = 0;\n    TreeNode *l = root, *r = root;\n    while (l) { lh++; l = l->left; }\n    while (r) { rh++; r = r->right; }\n    if (lh == rh) return (1 << lh) - 1;\n    return 1 + countNodes(root->left) + countNodes(root->right);\n}`, hints: ["Compare left and right edge heights", "Perfect subtree = 2^h - 1"], timeComplexity: "O(log²n)", spaceComplexity: "O(log n)", leetcodeNumber: 222 },
    { id: "s129", title: "Serialize and Deserialize Binary Tree", difficulty: "Hard", topic: "Binary Tree Part-III", description: "Design an algorithm to serialize and deserialize a binary tree.", approach: "Preorder traversal with null markers. Serialize: preorder with 'N' for nulls. Deserialize: use queue/index.", solutionCode: `class Codec {\npublic:\n    string serialize(TreeNode* root) {\n        if (!root) return "N";\n        return to_string(root->val) + "," + serialize(root->left) + "," + serialize(root->right);\n    }\n    TreeNode* deserialize(string data) {\n        queue<string> q;\n        stringstream ss(data);\n        string token;\n        while (getline(ss, token, ',')) q.push(token);\n        return build(q);\n    }\nprivate:\n    TreeNode* build(queue<string>& q) {\n        string val = q.front(); q.pop();\n        if (val == "N") return nullptr;\n        auto node = new TreeNode(stoi(val));\n        node->left = build(q);\n        node->right = build(q);\n        return node;\n    }\n};`, hints: ["Preorder with null markers", "Queue-based deserialization"], timeComplexity: "O(n)", spaceComplexity: "O(n)", leetcodeNumber: 297 },
    { id: "s130", title: "Burn a Binary Tree from a Node", difficulty: "Hard", topic: "Binary Tree Part-III", description: "Find the minimum time to burn the entire binary tree starting from a given node.", approach: "Build parent map, then BFS from target. Time = number of BFS levels - 1.", solutionCode: `int timeToBurn(TreeNode* root, int target) {\n    unordered_map<TreeNode*, TreeNode*> parent;\n    TreeNode* targetNode = nullptr;\n    queue<TreeNode*> q;\n    q.push(root);\n    while (!q.empty()) {\n        auto node = q.front(); q.pop();\n        if (node->val == target) targetNode = node;\n        if (node->left) { parent[node->left] = node; q.push(node->left); }\n        if (node->right) { parent[node->right] = node; q.push(node->right); }\n    }\n    unordered_set<TreeNode*> visited;\n    q.push(targetNode); visited.insert(targetNode);\n    int time = 0;\n    while (!q.empty()) {\n        int sz = q.size(); bool burned = false;\n        while (sz--) {\n            auto node = q.front(); q.pop();\n            if (node->left && !visited.count(node->left)) { visited.insert(node->left); q.push(node->left); burned = true; }\n            if (node->right && !visited.count(node->right)) { visited.insert(node->right); q.push(node->right); burned = true; }\n            if (parent.count(node) && !visited.count(parent[node])) { visited.insert(parent[node]); q.push(parent[node]); burned = true; }\n        }\n        if (burned) time++;\n    }\n    return time;\n}`, hints: ["Same as distance K but count levels", "Parent map + BFS"], timeComplexity: "O(n)", spaceComplexity: "O(n)" }
  ]},
  { name: "Binary Search Tree", day: 20, problems: [
    { id: "s131", title: "Search in BST", difficulty: "Easy", topic: "Binary Search Tree", description: "Search for a value in BST.", approach: "Compare with root: if smaller go left, if larger go right.", solutionCode: `TreeNode* searchBST(TreeNode* root, int val) {\n    while (root && root->val != val)\n        root = val < root->val ? root->left : root->right;\n    return root;\n}`, hints: ["BST property: left < root < right"], timeComplexity: "O(h)", spaceComplexity: "O(1)", leetcodeNumber: 700 },
    { id: "s132", title: "Construct BST from Preorder", difficulty: "Medium", topic: "Binary Search Tree", description: "Given preorder traversal, construct the BST.", approach: "Use upper bound approach. First element is root. Recursively build with bounds.", solutionCode: `TreeNode* bstFromPreorder(vector<int>& preorder) {\n    int idx = 0;\n    function<TreeNode*(int)> build = [&](int bound) -> TreeNode* {\n        if (idx >= preorder.size() || preorder[idx] > bound) return nullptr;\n        auto node = new TreeNode(preorder[idx++]);\n        node->left = build(node->val);\n        node->right = build(bound);\n        return node;\n    };\n    return build(INT_MAX);\n}`, hints: ["Use upper bound to decide left/right", "O(n) with bound approach"], timeComplexity: "O(n)", spaceComplexity: "O(n)", leetcodeNumber: 1008 },
    { id: "s133", title: "Validate BST", difficulty: "Medium", topic: "Binary Search Tree", description: "Determine if a binary tree is a valid BST.", approach: "Inorder traversal should be strictly increasing. Or use min/max bounds recursively.", solutionCode: `bool isValidBST(TreeNode* root) {\n    function<bool(TreeNode*, long, long)> check = [&](TreeNode* node, long mn, long mx) -> bool {\n        if (!node) return true;\n        if (node->val <= mn || node->val >= mx) return false;\n        return check(node->left, mn, node->val) && check(node->right, node->val, mx);\n    };\n    return check(root, LONG_MIN, LONG_MAX);\n}`, hints: ["Pass min/max bounds down", "Use long to handle INT_MIN/MAX"], timeComplexity: "O(n)", spaceComplexity: "O(h)", leetcodeNumber: 98 },
    { id: "s134", title: "LCA of BST", difficulty: "Medium", topic: "Binary Search Tree", description: "Find the lowest common ancestor of two nodes in a BST.", approach: "Use BST property. If both values < root, go left. If both > root, go right. Otherwise root is LCA.", solutionCode: `TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n    while (root) {\n        if (p->val < root->val && q->val < root->val) root = root->left;\n        else if (p->val > root->val && q->val > root->val) root = root->right;\n        else return root;\n    }\n    return nullptr;\n}`, hints: ["BST property simplifies LCA", "Split point is the LCA"], timeComplexity: "O(h)", spaceComplexity: "O(1)", leetcodeNumber: 235 },
    { id: "s135", title: "Predecessor and Successor in BST", difficulty: "Medium", topic: "Binary Search Tree", description: "Find inorder predecessor and successor of a given key in BST.", approach: "For predecessor: go left then all the way right. For successor: go right then all the way left. Track while searching.", solutionCode: `pair<TreeNode*, TreeNode*> predSucc(TreeNode* root, int key) {\n    TreeNode *pred = nullptr, *succ = nullptr;\n    TreeNode* curr = root;\n    while (curr) {\n        if (curr->val < key) { pred = curr; curr = curr->right; }\n        else curr = curr->left;\n    }\n    curr = root;\n    while (curr) {\n        if (curr->val > key) { succ = curr; curr = curr->left; }\n        else curr = curr->right;\n    }\n    return {pred, succ};\n}`, hints: ["Track while traversing", "Predecessor: last node where we went right"], timeComplexity: "O(h)", spaceComplexity: "O(1)" },
    { id: "s136", title: "BST Iterator", difficulty: "Medium", topic: "Binary Search Tree", description: "Implement an iterator over a BST with next() and hasNext() in O(1) average time.", approach: "Use stack for controlled inorder traversal. Push all left children. On next(), pop, process, push right subtree's lefts.", solutionCode: `class BSTIterator {\n    stack<TreeNode*> st;\n    void pushLeft(TreeNode* node) { while (node) { st.push(node); node = node->left; } }\npublic:\n    BSTIterator(TreeNode* root) { pushLeft(root); }\n    int next() { auto node = st.top(); st.pop(); pushLeft(node->right); return node->val; }\n    bool hasNext() { return !st.empty(); }\n};`, hints: ["Stack-based controlled inorder", "Push all lefts, then process right on next()"], timeComplexity: "O(1) amortized", spaceComplexity: "O(h)", leetcodeNumber: 173 },
    { id: "s137", title: "Two Sum in BST", difficulty: "Easy", topic: "Binary Search Tree", description: "Given a BST and a target, find if there exist two elements whose sum equals target.", approach: "Use BST iterator (forward and backward). Two-pointer technique on sorted sequence.", solutionCode: `bool findTarget(TreeNode* root, int k) {\n    vector<int> nums;\n    function<void(TreeNode*)> inorder = [&](TreeNode* node) {\n        if (!node) return;\n        inorder(node->left);\n        nums.push_back(node->val);\n        inorder(node->right);\n    };\n    inorder(root);\n    int l = 0, r = nums.size() - 1;\n    while (l < r) {\n        int sum = nums[l] + nums[r];\n        if (sum == k) return true;\n        if (sum < k) l++; else r--;\n    }\n    return false;\n}`, hints: ["Inorder gives sorted array", "Two pointer on sorted array"], timeComplexity: "O(n)", spaceComplexity: "O(n)", leetcodeNumber: 653 }
  ]},
  { name: "Binary Search Tree Part-II", day: 21, problems: [
    { id: "s138", title: "Recover BST (Two Swapped Nodes)", difficulty: "Medium", topic: "Binary Search Tree Part-II", description: "Two nodes of a BST are swapped by mistake. Recover the tree.", approach: "Inorder traversal finds violations. First and last violations give the two swapped nodes. Swap their values.", solutionCode: `void recoverTree(TreeNode* root) {\n    TreeNode *first = nullptr, *second = nullptr, *prev = nullptr;\n    function<void(TreeNode*)> inorder = [&](TreeNode* node) {\n        if (!node) return;\n        inorder(node->left);\n        if (prev && prev->val > node->val) {\n            if (!first) first = prev;\n            second = node;\n        }\n        prev = node;\n        inorder(node->right);\n    };\n    inorder(root);\n    swap(first->val, second->val);\n}`, hints: ["Inorder should be sorted", "Find two violations"], timeComplexity: "O(n)", spaceComplexity: "O(h)", leetcodeNumber: 99 },
    { id: "s139", title: "Kth Smallest in BST", difficulty: "Medium", topic: "Binary Search Tree Part-II", description: "Find the kth smallest element in a BST.", approach: "Inorder traversal gives sorted order. Return the kth element.", solutionCode: `int kthSmallest(TreeNode* root, int k) {\n    int count = 0, result = 0;\n    function<void(TreeNode*)> inorder = [&](TreeNode* node) {\n        if (!node || count >= k) return;\n        inorder(node->left);\n        if (++count == k) { result = node->val; return; }\n        inorder(node->right);\n    };\n    inorder(root);\n    return result;\n}`, hints: ["Inorder = sorted order in BST", "Stop at kth element"], timeComplexity: "O(h + k)", spaceComplexity: "O(h)", leetcodeNumber: 230 },
    { id: "s140", title: "Kth Largest in BST", difficulty: "Medium", topic: "Binary Search Tree Part-II", description: "Find the kth largest element in a BST.", approach: "Reverse inorder (right, root, left) gives descending order.", solutionCode: `int kthLargest(TreeNode* root, int k) {\n    int count = 0, result = 0;\n    function<void(TreeNode*)> revInorder = [&](TreeNode* node) {\n        if (!node || count >= k) return;\n        revInorder(node->right);\n        if (++count == k) { result = node->val; return; }\n        revInorder(node->left);\n    };\n    revInorder(root);\n    return result;\n}`, hints: ["Reverse inorder = descending", "Stop at kth element"], timeComplexity: "O(h + k)", spaceComplexity: "O(h)" },
    { id: "s141", title: "Floor and Ceil in BST", difficulty: "Medium", topic: "Binary Search Tree Part-II", description: "Find floor (largest <= key) and ceil (smallest >= key) in BST.", approach: "Traverse BST. For floor: if node <= key, update floor and go right. For ceil: if node >= key, update ceil and go left.", solutionCode: `int floorBST(TreeNode* root, int key) {\n    int floor = -1;\n    while (root) {\n        if (root->val == key) return key;\n        if (root->val < key) { floor = root->val; root = root->right; }\n        else root = root->left;\n    }\n    return floor;\n}\nint ceilBST(TreeNode* root, int key) {\n    int ceil = -1;\n    while (root) {\n        if (root->val == key) return key;\n        if (root->val > key) { ceil = root->val; root = root->left; }\n        else root = root->right;\n    }\n    return ceil;\n}`, hints: ["Track candidate while traversing", "BST property guides direction"], timeComplexity: "O(h)", spaceComplexity: "O(1)" },
    { id: "s142", title: "Largest BST in Binary Tree", difficulty: "Hard", topic: "Binary Search Tree Part-II", description: "Find the size of the largest BST subtree in a binary tree.", approach: "Post-order traversal. Each node returns (isBST, size, min, max). Combine children's info.", solutionCode: `int largestBST(TreeNode* root) {\n    int maxSize = 0;\n    // Returns {size, min, max}, size=-1 if not BST\n    function<tuple<int,int,int>(TreeNode*)> solve = [&](TreeNode* node) -> tuple<int,int,int> {\n        if (!node) return {0, LONG_MAX, LONG_MIN};\n        auto [ls, lmin, lmax] = solve(node->left);\n        auto [rs, rmin, rmax] = solve(node->right);\n        if (ls >= 0 && rs >= 0 && lmax < node->val && node->val < rmin) {\n            int sz = ls + rs + 1;\n            maxSize = max(maxSize, sz);\n            return {sz, min(lmin, node->val), max(rmax, node->val)};\n        }\n        return {-1, 0, 0};\n    };\n    solve(root);\n    return maxSize;\n}`, hints: ["Post-order: validate from bottom up", "Return size, min, max for each subtree"], timeComplexity: "O(n)", spaceComplexity: "O(h)" },
    { id: "s143", title: "Insert into BST", difficulty: "Medium", topic: "Binary Search Tree Part-II", description: "Insert a value into a BST and return the root.", approach: "Find the correct leaf position using BST property. Insert as a new leaf.", solutionCode: `TreeNode* insertIntoBST(TreeNode* root, int val) {\n    if (!root) return new TreeNode(val);\n    if (val < root->val) root->left = insertIntoBST(root->left, val);\n    else root->right = insertIntoBST(root->right, val);\n    return root;\n}`, hints: ["Recurse to find correct position", "Insert as leaf"], timeComplexity: "O(h)", spaceComplexity: "O(h)", leetcodeNumber: 701 },
    { id: "s144", title: "Delete Node in BST", difficulty: "Medium", topic: "Binary Search Tree Part-II", description: "Delete a key from BST and return the modified root.", approach: "Find node. If leaf, remove. If one child, replace. If two children, replace with inorder successor and delete successor.", solutionCode: `TreeNode* deleteNode(TreeNode* root, int key) {\n    if (!root) return nullptr;\n    if (key < root->val) root->left = deleteNode(root->left, key);\n    else if (key > root->val) root->right = deleteNode(root->right, key);\n    else {\n        if (!root->left) return root->right;\n        if (!root->right) return root->left;\n        TreeNode* succ = root->right;\n        while (succ->left) succ = succ->left;\n        root->val = succ->val;\n        root->right = deleteNode(root->right, succ->val);\n    }\n    return root;\n}`, hints: ["Three cases: leaf, one child, two children", "Replace with inorder successor for two children"], timeComplexity: "O(h)", spaceComplexity: "O(h)", leetcodeNumber: 450 },
    { id: "s145", title: "Convert Sorted Array to BST", difficulty: "Easy", topic: "Binary Search Tree Part-II", description: "Convert a sorted array to a height-balanced BST.", approach: "Pick middle element as root. Recursively build left and right subtrees from subarrays.", solutionCode: `TreeNode* sortedArrayToBST(vector<int>& nums) {\n    function<TreeNode*(int, int)> build = [&](int l, int r) -> TreeNode* {\n        if (l > r) return nullptr;\n        int mid = (l + r) / 2;\n        auto node = new TreeNode(nums[mid]);\n        node->left = build(l, mid - 1);\n        node->right = build(mid + 1, r);\n        return node;\n    };\n    return build(0, nums.size() - 1);\n}`, hints: ["Mid element = root for balanced tree", "Divide and conquer"], timeComplexity: "O(n)", spaceComplexity: "O(log n)", leetcodeNumber: 108 }
  ]},
  { name: "Binary Trees [Miscellaneous]", day: 22, problems: [
    { id: "s146", title: "Binary Tree to DLL", difficulty: "Hard", topic: "Binary Trees [Miscellaneous]", description: "Convert a binary tree to a doubly linked list in-place.", approach: "Inorder traversal. Maintain previous pointer. Connect prev->right = curr, curr->left = prev.", solutionCode: `TreeNode* binaryTreeToDLL(TreeNode* root) {\n    TreeNode* head = nullptr;\n    TreeNode* prev = nullptr;\n    function<void(TreeNode*)> inorder = [&](TreeNode* node) {\n        if (!node) return;\n        inorder(node->left);\n        if (!prev) head = node;\n        else { prev->right = node; node->left = prev; }\n        prev = node;\n        inorder(node->right);\n    };\n    inorder(root);\n    return head;\n}`, hints: ["Inorder gives sorted DLL", "Maintain previous pointer"], timeComplexity: "O(n)", spaceComplexity: "O(h)" },
    { id: "s147", title: "Find Median in BST (Morris)", difficulty: "Hard", topic: "Binary Trees [Miscellaneous]", description: "Find median of BST in O(1) extra space.", approach: "First Morris traversal to count nodes. Second Morris traversal to find median (middle elements).", solutionCode: `float findMedian(TreeNode* root) {\n    int count = 0;\n    TreeNode* curr = root;\n    // Count nodes using Morris\n    while (curr) {\n        if (!curr->left) { count++; curr = curr->right; }\n        else {\n            TreeNode* pred = curr->left;\n            while (pred->right && pred->right != curr) pred = pred->right;\n            if (!pred->right) { pred->right = curr; curr = curr->left; }\n            else { pred->right = nullptr; count++; curr = curr->right; }\n        }\n    }\n    // Find median\n    int idx = 0; int prev = 0, cur = 0;\n    curr = root;\n    while (curr) {\n        if (!curr->left) {\n            idx++; prev = cur; cur = curr->val;\n            if (idx == (count+1)/2 && count%2==1) return cur;\n            if (idx == count/2+1 && count%2==0) return (prev+cur)/2.0;\n            curr = curr->right;\n        } else {\n            TreeNode* pred = curr->left;\n            while (pred->right && pred->right != curr) pred = pred->right;\n            if (!pred->right) { pred->right = curr; curr = curr->left; }\n            else {\n                pred->right = nullptr;\n                idx++; prev = cur; cur = curr->val;\n                if (idx == (count+1)/2 && count%2==1) return cur;\n                if (idx == count/2+1 && count%2==0) return (prev+cur)/2.0;\n                curr = curr->right;\n            }\n        }\n    }\n    return 0;\n}`, hints: ["Two Morris passes: count then find", "O(1) space"], timeComplexity: "O(n)", spaceComplexity: "O(1)" },
    { id: "s148", title: "Merge Two BSTs", difficulty: "Medium", topic: "Binary Trees [Miscellaneous]", description: "Merge two BSTs into a single balanced BST.", approach: "Get inorder of both BSTs. Merge two sorted arrays. Build balanced BST from merged array.", solutionCode: `TreeNode* mergeBSTs(TreeNode* root1, TreeNode* root2) {\n    vector<int> a, b;\n    function<void(TreeNode*, vector<int>&)> inorder = [&](TreeNode* node, vector<int>& v) {\n        if (!node) return;\n        inorder(node->left, v); v.push_back(node->val); inorder(node->right, v);\n    };\n    inorder(root1, a); inorder(root2, b);\n    vector<int> merged;\n    int i = 0, j = 0;\n    while (i < a.size() && j < b.size())\n        merged.push_back(a[i] < b[j] ? a[i++] : b[j++]);\n    while (i < a.size()) merged.push_back(a[i++]);\n    while (j < b.size()) merged.push_back(b[j++]);\n    function<TreeNode*(int, int)> build = [&](int l, int r) -> TreeNode* {\n        if (l > r) return nullptr;\n        int mid = (l+r)/2;\n        auto node = new TreeNode(merged[mid]);\n        node->left = build(l, mid-1);\n        node->right = build(mid+1, r);\n        return node;\n    };\n    return build(0, merged.size()-1);\n}`, hints: ["Inorder both, merge arrays, build BST"], timeComplexity: "O(m+n)", spaceComplexity: "O(m+n)" },
    { id: "s149", title: "Count Inversions using BST", difficulty: "Hard", topic: "Binary Trees [Miscellaneous]", description: "Count inversions in an array using BST.", approach: "Insert elements from right. Each node tracks count of right subtree. When inserting, count nodes greater than current.", solutionCode: `// Using merge sort is more practical\nlong long countInversions(vector<int>& arr) {\n    function<long long(vector<int>&, int, int)> mergeSort = [&](vector<int>& a, int l, int r) -> long long {\n        if (l >= r) return 0;\n        int mid = (l+r)/2;\n        long long cnt = mergeSort(a, l, mid) + mergeSort(a, mid+1, r);\n        vector<int> temp;\n        int i = l, j = mid+1;\n        while (i <= mid && j <= r) {\n            if (a[i] <= a[j]) temp.push_back(a[i++]);\n            else { cnt += mid-i+1; temp.push_back(a[j++]); }\n        }\n        while (i <= mid) temp.push_back(a[i++]);\n        while (j <= r) temp.push_back(a[j++]);\n        for (int k = l; k <= r; k++) a[k] = temp[k-l];\n        return cnt;\n    };\n    return mergeSort(arr, 0, arr.size()-1);\n}`, hints: ["Merge sort counts inversions efficiently", "During merge, elements from right half crossing left = inversions"], timeComplexity: "O(n log n)", spaceComplexity: "O(n)" },
    { id: "s150", title: "Kth Largest in Stream", difficulty: "Easy", topic: "Binary Trees [Miscellaneous]", description: "Design a class to find the kth largest element in a stream.", approach: "Use min-heap of size k. Top is kth largest.", solutionCode: `class KthLargest {\n    priority_queue<int, vector<int>, greater<int>> pq;\n    int k;\npublic:\n    KthLargest(int k, vector<int>& nums) : k(k) {\n        for (int n : nums) add(n);\n    }\n    int add(int val) {\n        pq.push(val);\n        if (pq.size() > k) pq.pop();\n        return pq.top();\n    }\n};`, hints: ["Min-heap of size k", "Top = kth largest"], timeComplexity: "O(log k) per add", spaceComplexity: "O(k)", leetcodeNumber: 703 },
    { id: "s151", title: "Populating Next Right Pointers", difficulty: "Medium", topic: "Binary Trees [Miscellaneous]", description: "Connect each node's next pointer to its next right node at the same level.", approach: "BFS level by level. For each level, connect current to next in queue.", solutionCode: `struct Node { int val; Node *left, *right, *next; };\nNode* connect(Node* root) {\n    if (!root) return nullptr;\n    queue<Node*> q;\n    q.push(root);\n    while (!q.empty()) {\n        int sz = q.size();\n        for (int i = 0; i < sz; i++) {\n            auto node = q.front(); q.pop();\n            node->next = (i < sz-1) ? q.front() : nullptr;\n            if (node->left) q.push(node->left);\n            if (node->right) q.push(node->right);\n        }\n    }\n    return root;\n}`, hints: ["BFS level order", "Connect to next node in queue"], timeComplexity: "O(n)", spaceComplexity: "O(n)", leetcodeNumber: 116 }
  ]},
  { name: "Graph", day: 23, problems: [
    { id: "s152", title: "Clone Graph", difficulty: "Medium", topic: "Graph", description: "Return a deep copy of a graph.", approach: "BFS/DFS with hashmap mapping original nodes to clones.", solutionCode: `struct Node { int val; vector<Node*> neighbors; };\nNode* cloneGraph(Node* node) {\n    if (!node) return nullptr;\n    unordered_map<Node*, Node*> mp;\n    queue<Node*> q;\n    mp[node] = new Node({node->val, {}});\n    q.push(node);\n    while (!q.empty()) {\n        auto curr = q.front(); q.pop();\n        for (auto neighbor : curr->neighbors) {\n            if (!mp.count(neighbor)) {\n                mp[neighbor] = new Node({neighbor->val, {}});\n                q.push(neighbor);\n            }\n            mp[curr]->neighbors.push_back(mp[neighbor]);\n        }\n    }\n    return mp[node];\n}`, hints: ["Map original to clone", "BFS to traverse all nodes"], timeComplexity: "O(V+E)", spaceComplexity: "O(V)", leetcodeNumber: 133 },
    { id: "s153", title: "DFS Traversal", difficulty: "Easy", topic: "Graph", description: "Perform DFS traversal of a graph.", approach: "Use recursion or stack. Visit node, mark visited, recurse on unvisited neighbors.", solutionCode: `void dfs(int node, vector<vector<int>>& adj, vector<bool>& visited, vector<int>& result) {\n    visited[node] = true;\n    result.push_back(node);\n    for (int neighbor : adj[node])\n        if (!visited[neighbor]) dfs(neighbor, adj, visited, result);\n}`, hints: ["Mark visited before recursing", "Process in adjacency list order"], timeComplexity: "O(V+E)", spaceComplexity: "O(V)" },
    { id: "s154", title: "BFS Traversal", difficulty: "Easy", topic: "Graph", description: "Perform BFS traversal of a graph.", approach: "Use queue. Start from source, visit neighbors level by level.", solutionCode: `vector<int> bfs(int start, vector<vector<int>>& adj, int n) {\n    vector<bool> visited(n, false);\n    vector<int> result;\n    queue<int> q;\n    q.push(start); visited[start] = true;\n    while (!q.empty()) {\n        int node = q.front(); q.pop();\n        result.push_back(node);\n        for (int neighbor : adj[node])\n            if (!visited[neighbor]) { visited[neighbor] = true; q.push(neighbor); }\n    }\n    return result;\n}`, hints: ["Queue for level-order", "Mark visited when pushing"], timeComplexity: "O(V+E)", spaceComplexity: "O(V)" },
    { id: "s155", title: "Detect Cycle in Undirected Graph", difficulty: "Medium", topic: "Graph", description: "Detect if a cycle exists in an undirected graph.", approach: "BFS/DFS. If we visit an already-visited node (not parent), there's a cycle.", solutionCode: `bool hasCycle(int n, vector<vector<int>>& adj) {\n    vector<bool> visited(n, false);\n    function<bool(int, int)> dfs = [&](int node, int parent) -> bool {\n        visited[node] = true;\n        for (int neighbor : adj[node]) {\n            if (!visited[neighbor]) { if (dfs(neighbor, node)) return true; }\n            else if (neighbor != parent) return true;\n        }\n        return false;\n    };\n    for (int i = 0; i < n; i++)\n        if (!visited[i] && dfs(i, -1)) return true;\n    return false;\n}`, hints: ["Visited neighbor != parent means cycle", "Check all components"], timeComplexity: "O(V+E)", spaceComplexity: "O(V)" },
    { id: "s156", title: "Detect Cycle in Directed Graph", difficulty: "Medium", topic: "Graph", description: "Detect cycle in a directed graph using DFS.", approach: "Use visited + pathVisited arrays. If a node on the current path is revisited, there's a cycle.", solutionCode: `bool hasCycleDirected(int n, vector<vector<int>>& adj) {\n    vector<int> visited(n, 0); // 0=unvisited, 1=in-path, 2=done\n    function<bool(int)> dfs = [&](int node) -> bool {\n        visited[node] = 1;\n        for (int neighbor : adj[node]) {\n            if (visited[neighbor] == 1) return true;\n            if (visited[neighbor] == 0 && dfs(neighbor)) return true;\n        }\n        visited[node] = 2;\n        return false;\n    };\n    for (int i = 0; i < n; i++)\n        if (visited[i] == 0 && dfs(i)) return true;\n    return false;\n}`, hints: ["Three states: unvisited, in-path, done", "In-path neighbor = cycle"], timeComplexity: "O(V+E)", spaceComplexity: "O(V)" },
    { id: "s157", title: "Topological Sort", difficulty: "Medium", topic: "Graph", description: "Find a topological ordering of a directed acyclic graph.", approach: "Kahn's BFS: Start with nodes of 0 in-degree. Process them, reduce in-degree of neighbors. Or use DFS with stack.", solutionCode: `vector<int> topoSort(int n, vector<vector<int>>& adj) {\n    vector<int> indegree(n, 0);\n    for (int i = 0; i < n; i++)\n        for (int j : adj[i]) indegree[j]++;\n    queue<int> q;\n    for (int i = 0; i < n; i++) if (indegree[i] == 0) q.push(i);\n    vector<int> result;\n    while (!q.empty()) {\n        int node = q.front(); q.pop();\n        result.push_back(node);\n        for (int neighbor : adj[node])\n            if (--indegree[neighbor] == 0) q.push(neighbor);\n    }\n    return result;\n}`, hints: ["BFS with in-degree counting", "Start with 0 in-degree nodes"], timeComplexity: "O(V+E)", spaceComplexity: "O(V)" },
    { id: "s158", title: "Number of Islands", difficulty: "Medium", topic: "Graph", description: "Count the number of islands in a 2D grid.", approach: "DFS/BFS. For each unvisited '1', start a traversal marking all connected '1's as visited. Count traversals.", solutionCode: `int numIslands(vector<vector<char>>& grid) {\n    int m = grid.size(), n = grid[0].size(), count = 0;\n    function<void(int,int)> dfs = [&](int i, int j) {\n        if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] != '1') return;\n        grid[i][j] = '0';\n        dfs(i+1,j); dfs(i-1,j); dfs(i,j+1); dfs(i,j-1);\n    };\n    for (int i = 0; i < m; i++)\n        for (int j = 0; j < n; j++)\n            if (grid[i][j] == '1') { count++; dfs(i, j); }\n    return count;\n}`, hints: ["DFS/BFS from each unvisited land cell", "Mark visited to avoid recount"], timeComplexity: "O(m*n)", spaceComplexity: "O(m*n)", leetcodeNumber: 200 },
    { id: "s159", title: "Bipartite Check", difficulty: "Medium", topic: "Graph", description: "Check if a graph is bipartite (2-colorable).", approach: "BFS/DFS coloring. Assign alternating colors. If neighbor has same color, not bipartite.", solutionCode: `bool isBipartite(vector<vector<int>>& graph) {\n    int n = graph.size();\n    vector<int> color(n, -1);\n    for (int i = 0; i < n; i++) {\n        if (color[i] != -1) continue;\n        queue<int> q; q.push(i); color[i] = 0;\n        while (!q.empty()) {\n            int node = q.front(); q.pop();\n            for (int neighbor : graph[node]) {\n                if (color[neighbor] == -1) { color[neighbor] = 1 - color[node]; q.push(neighbor); }\n                else if (color[neighbor] == color[node]) return false;\n            }\n        }\n    }\n    return true;\n}`, hints: ["Two-color the graph", "Same color neighbor = not bipartite"], timeComplexity: "O(V+E)", spaceComplexity: "O(V)", leetcodeNumber: 785 },
    { id: "s160", title: "Dijkstra's Algorithm", difficulty: "Medium", topic: "Graph", description: "Find shortest path from source to all vertices in a weighted graph.", approach: "Use min-heap priority queue. Start from source with distance 0. Relax edges greedily.", solutionCode: `vector<int> dijkstra(int n, vector<vector<pair<int,int>>>& adj, int src) {\n    vector<int> dist(n, INT_MAX);\n    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;\n    dist[src] = 0; pq.push({0, src});\n    while (!pq.empty()) {\n        auto [d, u] = pq.top(); pq.pop();\n        if (d > dist[u]) continue;\n        for (auto [v, w] : adj[u]) {\n            if (dist[u] + w < dist[v]) {\n                dist[v] = dist[u] + w;\n                pq.push({dist[v], v});\n            }\n        }\n    }\n    return dist;\n}`, hints: ["Min-heap with (distance, node)", "Skip if already found shorter path"], timeComplexity: "O((V+E) log V)", spaceComplexity: "O(V)" },
    { id: "s161", title: "Bellman-Ford Algorithm", difficulty: "Medium", topic: "Graph", description: "Find shortest paths from source, handling negative edges. Detect negative cycles.", approach: "Relax all edges V-1 times. If any edge can still be relaxed, negative cycle exists.", solutionCode: `vector<int> bellmanFord(int n, vector<tuple<int,int,int>>& edges, int src) {\n    vector<int> dist(n, INT_MAX);\n    dist[src] = 0;\n    for (int i = 0; i < n - 1; i++)\n        for (auto& [u, v, w] : edges)\n            if (dist[u] != INT_MAX && dist[u] + w < dist[v])\n                dist[v] = dist[u] + w;\n    // Check negative cycle\n    for (auto& [u, v, w] : edges)\n        if (dist[u] != INT_MAX && dist[u] + w < dist[v])\n            return {}; // Negative cycle\n    return dist;\n}`, hints: ["Relax all edges V-1 times", "One more relaxation = negative cycle"], timeComplexity: "O(V*E)", spaceComplexity: "O(V)" },
    { id: "s162", title: "Floyd Warshall Algorithm", difficulty: "Medium", topic: "Graph", description: "Find shortest paths between all pairs of vertices.", approach: "Three nested loops. For each intermediate vertex k, try to improve dist[i][j] through k.", solutionCode: `void floydWarshall(vector<vector<int>>& dist, int n) {\n    for (int k = 0; k < n; k++)\n        for (int i = 0; i < n; i++)\n            for (int j = 0; j < n; j++)\n                if (dist[i][k] != INT_MAX && dist[k][j] != INT_MAX)\n                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);\n}`, hints: ["Try each vertex as intermediate", "Three nested loops: k, i, j"], timeComplexity: "O(V³)", spaceComplexity: "O(V²)" },
    { id: "s163", title: "MST - Prim's Algorithm", difficulty: "Medium", topic: "Graph", description: "Find Minimum Spanning Tree using Prim's algorithm.", approach: "Start from any node. Use min-heap to always pick the minimum weight edge connecting MST to non-MST vertex.", solutionCode: `int primsMST(int n, vector<vector<pair<int,int>>>& adj) {\n    vector<bool> inMST(n, false);\n    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;\n    pq.push({0, 0}); int cost = 0;\n    while (!pq.empty()) {\n        auto [w, u] = pq.top(); pq.pop();\n        if (inMST[u]) continue;\n        inMST[u] = true; cost += w;\n        for (auto [v, wt] : adj[u])\n            if (!inMST[v]) pq.push({wt, v});\n    }\n    return cost;\n}`, hints: ["Greedy: pick minimum weight edge", "Min-heap for efficient selection"], timeComplexity: "O(E log V)", spaceComplexity: "O(V)" }
  ]},
  { name: "Graph Part-II", day: 24, problems: [
    { id: "s164", title: "MST - Kruskal's Algorithm", difficulty: "Medium", topic: "Graph Part-II", description: "Find MST using Kruskal's algorithm with Union-Find.", approach: "Sort edges by weight. Add edge if it doesn't create cycle (check with Union-Find).", solutionCode: `class DSU {\n    vector<int> parent, rank_;\npublic:\n    DSU(int n) : parent(n), rank_(n, 0) { iota(parent.begin(), parent.end(), 0); }\n    int find(int x) { return parent[x] == x ? x : parent[x] = find(parent[x]); }\n    bool unite(int x, int y) {\n        x = find(x); y = find(y);\n        if (x == y) return false;\n        if (rank_[x] < rank_[y]) swap(x, y);\n        parent[y] = x;\n        if (rank_[x] == rank_[y]) rank_[x]++;\n        return true;\n    }\n};\nint kruskalMST(int n, vector<tuple<int,int,int>>& edges) {\n    sort(edges.begin(), edges.end());\n    DSU dsu(n); int cost = 0;\n    for (auto& [w, u, v] : edges)\n        if (dsu.unite(u, v)) cost += w;\n    return cost;\n}`, hints: ["Sort edges by weight", "Union-Find to check connectivity"], timeComplexity: "O(E log E)", spaceComplexity: "O(V)" },
    { id: "s165", title: "Strongly Connected Components (Kosaraju)", difficulty: "Hard", topic: "Graph Part-II", description: "Find all strongly connected components in a directed graph.", approach: "1) DFS and push to stack by finish time. 2) Transpose graph. 3) DFS on transpose in stack order.", solutionCode: `vector<vector<int>> kosaraju(int n, vector<vector<int>>& adj) {\n    vector<bool> visited(n, false);\n    stack<int> st;\n    function<void(int)> dfs1 = [&](int node) {\n        visited[node] = true;\n        for (int next : adj[node]) if (!visited[next]) dfs1(next);\n        st.push(node);\n    };\n    for (int i = 0; i < n; i++) if (!visited[i]) dfs1(i);\n    vector<vector<int>> radj(n);\n    for (int u = 0; u < n; u++) for (int v : adj[u]) radj[v].push_back(u);\n    fill(visited.begin(), visited.end(), false);\n    vector<vector<int>> sccs;\n    function<void(int, vector<int>&)> dfs2 = [&](int node, vector<int>& comp) {\n        visited[node] = true; comp.push_back(node);\n        for (int next : radj[node]) if (!visited[next]) dfs2(next, comp);\n    };\n    while (!st.empty()) {\n        int node = st.top(); st.pop();\n        if (!visited[node]) {\n            vector<int> comp;\n            dfs2(node, comp);\n            sccs.push_back(comp);\n        }\n    }\n    return sccs;\n}`, hints: ["Two DFS passes", "Second DFS on transposed graph in finish-time order"], timeComplexity: "O(V+E)", spaceComplexity: "O(V)" },
    { id: "s166", title: "Bridges in Graph", difficulty: "Hard", topic: "Graph Part-II", description: "Find all bridges (edges whose removal disconnects the graph).", approach: "Tarjan's algorithm. Use discovery time and low values. Edge (u,v) is bridge if low[v] > disc[u].", solutionCode: `vector<pair<int,int>> findBridges(int n, vector<vector<int>>& adj) {\n    vector<int> disc(n, -1), low(n);\n    vector<pair<int,int>> bridges;\n    int timer = 0;\n    function<void(int, int)> dfs = [&](int u, int parent) {\n        disc[u] = low[u] = timer++;\n        for (int v : adj[u]) {\n            if (disc[v] == -1) {\n                dfs(v, u);\n                low[u] = min(low[u], low[v]);\n                if (low[v] > disc[u]) bridges.push_back({u, v});\n            } else if (v != parent) low[u] = min(low[u], disc[v]);\n        }\n    };\n    for (int i = 0; i < n; i++) if (disc[i] == -1) dfs(i, -1);\n    return bridges;\n}`, hints: ["Tarjan's: disc and low arrays", "Bridge if low[v] > disc[u]"], timeComplexity: "O(V+E)", spaceComplexity: "O(V)" },
    { id: "s167", title: "Articulation Points", difficulty: "Hard", topic: "Graph Part-II", description: "Find all articulation points (vertices whose removal disconnects the graph).", approach: "Tarjan's algorithm. Root is AP if it has 2+ children. Non-root u is AP if it has child v with low[v] >= disc[u].", solutionCode: `vector<int> findArticulationPoints(int n, vector<vector<int>>& adj) {\n    vector<int> disc(n, -1), low(n);\n    vector<bool> ap(n, false);\n    int timer = 0;\n    function<void(int, int)> dfs = [&](int u, int parent) {\n        disc[u] = low[u] = timer++;\n        int children = 0;\n        for (int v : adj[u]) {\n            if (disc[v] == -1) {\n                children++;\n                dfs(v, u);\n                low[u] = min(low[u], low[v]);\n                if (parent == -1 && children > 1) ap[u] = true;\n                if (parent != -1 && low[v] >= disc[u]) ap[u] = true;\n            } else if (v != parent) low[u] = min(low[u], disc[v]);\n        }\n    };\n    for (int i = 0; i < n; i++) if (disc[i] == -1) dfs(i, -1);\n    vector<int> result;\n    for (int i = 0; i < n; i++) if (ap[i]) result.push_back(i);\n    return result;\n}`, hints: ["Root: 2+ children = AP", "Non-root: low[child] >= disc[node] = AP"], timeComplexity: "O(V+E)", spaceComplexity: "O(V)" },
    { id: "s168", title: "Course Schedule (Cycle in DAG)", difficulty: "Medium", topic: "Graph Part-II", description: "Determine if you can finish all courses given prerequisites.", approach: "Topological sort using BFS (Kahn's). If all courses processed, no cycle. Otherwise impossible.", solutionCode: `bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n    vector<vector<int>> adj(numCourses);\n    vector<int> indegree(numCourses, 0);\n    for (auto& p : prerequisites) { adj[p[1]].push_back(p[0]); indegree[p[0]]++; }\n    queue<int> q;\n    for (int i = 0; i < numCourses; i++) if (indegree[i] == 0) q.push(i);\n    int count = 0;\n    while (!q.empty()) {\n        int node = q.front(); q.pop(); count++;\n        for (int next : adj[node]) if (--indegree[next] == 0) q.push(next);\n    }\n    return count == numCourses;\n}`, hints: ["Topo sort: if all processed, no cycle", "Kahn's algorithm"], timeComplexity: "O(V+E)", spaceComplexity: "O(V)", leetcodeNumber: 207 },
    { id: "s169", title: "Word Ladder", difficulty: "Hard", topic: "Graph Part-II", description: "Find shortest transformation sequence from beginWord to endWord, changing one letter at a time.", approach: "BFS. Each word is a node. Edges connect words differing by one letter. Find shortest path.", solutionCode: `int ladderLength(string beginWord, string endWord, vector<string>& wordList) {\n    unordered_set<string> dict(wordList.begin(), wordList.end());\n    if (!dict.count(endWord)) return 0;\n    queue<pair<string, int>> q;\n    q.push({beginWord, 1});\n    dict.erase(beginWord);\n    while (!q.empty()) {\n        auto [word, steps] = q.front(); q.pop();\n        if (word == endWord) return steps;\n        for (int i = 0; i < word.size(); i++) {\n            string temp = word;\n            for (char c = 'a'; c <= 'z'; c++) {\n                temp[i] = c;\n                if (dict.count(temp)) {\n                    dict.erase(temp);\n                    q.push({temp, steps + 1});\n                }\n            }\n        }\n    }\n    return 0;\n}`, hints: ["BFS for shortest path", "Try all single-letter changes"], timeComplexity: "O(M² * N)", spaceComplexity: "O(M * N)", leetcodeNumber: 127 }
  ]},
  { name: "Dynamic Programming", day: 25, problems: [
    { id: "s170", title: "Maximum Product Subarray", difficulty: "Medium", topic: "Dynamic Programming", description: "Find the contiguous subarray with the largest product.", approach: "Track both max and min product ending at each position (min can become max when multiplied by negative).", solutionCode: `int maxProduct(vector<int>& nums) {\n    int maxProd = nums[0], minProd = nums[0], result = nums[0];\n    for (int i = 1; i < nums.size(); i++) {\n        if (nums[i] < 0) swap(maxProd, minProd);\n        maxProd = max(nums[i], maxProd * nums[i]);\n        minProd = min(nums[i], minProd * nums[i]);\n        result = max(result, maxProd);\n    }\n    return result;\n}`, hints: ["Track both max and min products", "Negative * negative = positive"], timeComplexity: "O(n)", spaceComplexity: "O(1)", leetcodeNumber: 152 },
    { id: "s171", title: "Longest Increasing Subsequence", difficulty: "Medium", topic: "Dynamic Programming", description: "Find the length of the longest strictly increasing subsequence.", approach: "Use patience sorting / binary search. Maintain array of smallest tail elements for each LIS length.", solutionCode: `int lengthOfLIS(vector<int>& nums) {\n    vector<int> tails;\n    for (int num : nums) {\n        auto it = lower_bound(tails.begin(), tails.end(), num);\n        if (it == tails.end()) tails.push_back(num);\n        else *it = num;\n    }\n    return tails.size();\n}`, hints: ["Binary search on tails array", "Replace or extend"], timeComplexity: "O(n log n)", spaceComplexity: "O(n)", leetcodeNumber: 300 },
    { id: "s172", title: "Longest Common Subsequence", difficulty: "Medium", topic: "Dynamic Programming", description: "Find the length of the longest common subsequence of two strings.", approach: "2D DP. dp[i][j] = LCS of s1[0..i-1] and s2[0..j-1]. If chars match, dp[i][j] = 1 + dp[i-1][j-1], else max of dp[i-1][j] and dp[i][j-1].", solutionCode: `int longestCommonSubsequence(string text1, string text2) {\n    int m = text1.size(), n = text2.size();\n    vector<vector<int>> dp(m+1, vector<int>(n+1, 0));\n    for (int i = 1; i <= m; i++)\n        for (int j = 1; j <= n; j++)\n            dp[i][j] = text1[i-1] == text2[j-1] ? 1 + dp[i-1][j-1] : max(dp[i-1][j], dp[i][j-1]);\n    return dp[m][n];\n}`, hints: ["Match = 1 + diagonal", "No match = max(up, left)"], timeComplexity: "O(m*n)", spaceComplexity: "O(m*n)", leetcodeNumber: 1143 },
    { id: "s173", title: "0/1 Knapsack", difficulty: "Medium", topic: "Dynamic Programming", description: "Given weights and values of items, find maximum value that fits in a knapsack of capacity W.", approach: "2D DP. dp[i][w] = max value using first i items with capacity w. For each item, either include or exclude.", solutionCode: `int knapsack(int W, vector<int>& wt, vector<int>& val) {\n    int n = wt.size();\n    vector<vector<int>> dp(n+1, vector<int>(W+1, 0));\n    for (int i = 1; i <= n; i++)\n        for (int w = 0; w <= W; w++) {\n            dp[i][w] = dp[i-1][w];\n            if (wt[i-1] <= w)\n                dp[i][w] = max(dp[i][w], val[i-1] + dp[i-1][w - wt[i-1]]);\n        }\n    return dp[n][W];\n}`, hints: ["Include or exclude each item", "dp[i][w] = max(exclude, include)"], timeComplexity: "O(n*W)", spaceComplexity: "O(n*W)" },
    { id: "s174", title: "Edit Distance", difficulty: "Medium", topic: "Dynamic Programming", description: "Find minimum operations (insert, delete, replace) to convert word1 to word2.", approach: "2D DP. dp[i][j] = min ops for word1[0..i-1] to word2[0..j-1]. If chars match, dp[i-1][j-1]. Else 1 + min of insert, delete, replace.", solutionCode: `int minDistance(string word1, string word2) {\n    int m = word1.size(), n = word2.size();\n    vector<vector<int>> dp(m+1, vector<int>(n+1));\n    for (int i = 0; i <= m; i++) dp[i][0] = i;\n    for (int j = 0; j <= n; j++) dp[0][j] = j;\n    for (int i = 1; i <= m; i++)\n        for (int j = 1; j <= n; j++)\n            dp[i][j] = word1[i-1] == word2[j-1] ? dp[i-1][j-1] : 1 + min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]});\n    return dp[m][n];\n}`, hints: ["Three operations: insert, delete, replace", "Match = no cost, else 1 + min of three"], timeComplexity: "O(m*n)", spaceComplexity: "O(m*n)", leetcodeNumber: 72 },
    { id: "s175", title: "Maximum Sum Increasing Subsequence", difficulty: "Medium", topic: "Dynamic Programming", description: "Find the maximum sum of an increasing subsequence.", approach: "Similar to LIS but track sum instead of length. dp[i] = max sum ending at i.", solutionCode: `int maxSumIS(vector<int>& arr) {\n    int n = arr.size();\n    vector<int> dp(arr.begin(), arr.end());\n    for (int i = 1; i < n; i++)\n        for (int j = 0; j < i; j++)\n            if (arr[j] < arr[i])\n                dp[i] = max(dp[i], dp[j] + arr[i]);\n    return *max_element(dp.begin(), dp.end());\n}`, hints: ["Similar to LIS", "Track sum instead of count"], timeComplexity: "O(n²)", spaceComplexity: "O(n)" },
    { id: "s176", title: "Matrix Chain Multiplication", difficulty: "Hard", topic: "Dynamic Programming", description: "Find minimum number of multiplications needed to multiply a chain of matrices.", approach: "Interval DP. dp[i][j] = min cost to multiply matrices i to j. Try all split points k.", solutionCode: `int matrixChainMultiplication(vector<int>& dims) {\n    int n = dims.size() - 1;\n    vector<vector<int>> dp(n, vector<int>(n, 0));\n    for (int len = 2; len <= n; len++)\n        for (int i = 0; i <= n - len; i++) {\n            int j = i + len - 1;\n            dp[i][j] = INT_MAX;\n            for (int k = i; k < j; k++)\n                dp[i][j] = min(dp[i][j], dp[i][k] + dp[k+1][j] + dims[i]*dims[k+1]*dims[j+1]);\n        }\n    return dp[0][n-1];\n}`, hints: ["Interval DP: try all split points", "Cost = left + right + multiplication"], timeComplexity: "O(n³)", spaceComplexity: "O(n²)" }
  ]},
  { name: "Dynamic Programming Part-II", day: 26, problems: [
    { id: "s177", title: "Minimum Path Sum", difficulty: "Medium", topic: "Dynamic Programming Part-II", description: "Find the minimum path sum from top-left to bottom-right in a grid, moving only right or down.", approach: "DP: dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1]).", solutionCode: `int minPathSum(vector<vector<int>>& grid) {\n    int m = grid.size(), n = grid[0].size();\n    for (int i = 0; i < m; i++)\n        for (int j = 0; j < n; j++) {\n            if (i == 0 && j == 0) continue;\n            else if (i == 0) grid[i][j] += grid[i][j-1];\n            else if (j == 0) grid[i][j] += grid[i-1][j];\n            else grid[i][j] += min(grid[i-1][j], grid[i][j-1]);\n        }\n    return grid[m-1][n-1];\n}`, hints: ["Add min of top or left", "In-place DP possible"], timeComplexity: "O(m*n)", spaceComplexity: "O(1)", leetcodeNumber: 64 },
    { id: "s178", title: "Coin Change", difficulty: "Medium", topic: "Dynamic Programming Part-II", description: "Find fewest coins needed to make up a given amount.", approach: "DP: dp[i] = min coins for amount i. For each coin, dp[i] = min(dp[i], 1 + dp[i - coin]).", solutionCode: `int coinChange(vector<int>& coins, int amount) {\n    vector<int> dp(amount + 1, amount + 1);\n    dp[0] = 0;\n    for (int i = 1; i <= amount; i++)\n        for (int c : coins)\n            if (c <= i) dp[i] = min(dp[i], 1 + dp[i - c]);\n    return dp[amount] > amount ? -1 : dp[amount];\n}`, hints: ["Bottom-up DP on amount", "Try each coin denomination"], timeComplexity: "O(amount * n)", spaceComplexity: "O(amount)", leetcodeNumber: 322 },
    { id: "s179", title: "Subset Sum", difficulty: "Medium", topic: "Dynamic Programming Part-II", description: "Determine if a subset of given set sums to a target.", approach: "DP: dp[j] = true if sum j is achievable. Process each element, update from right to left.", solutionCode: `bool subsetSum(vector<int>& nums, int target) {\n    vector<bool> dp(target + 1, false);\n    dp[0] = true;\n    for (int num : nums)\n        for (int j = target; j >= num; j--)\n            dp[j] = dp[j] || dp[j - num];\n    return dp[target];\n}`, hints: ["1D DP, iterate right to left", "dp[0] = true (empty subset)"], timeComplexity: "O(n * target)", spaceComplexity: "O(target)" },
    { id: "s180", title: "Rod Cutting", difficulty: "Medium", topic: "Dynamic Programming Part-II", description: "Given a rod of length n and prices for each length, find maximum revenue from cutting.", approach: "Unbounded knapsack variant. dp[i] = max revenue for rod of length i.", solutionCode: `int rodCutting(vector<int>& prices, int n) {\n    vector<int> dp(n + 1, 0);\n    for (int i = 1; i <= n; i++)\n        for (int j = 1; j <= i; j++)\n            dp[i] = max(dp[i], prices[j-1] + dp[i - j]);\n    return dp[n];\n}`, hints: ["Try all cut lengths at each position", "Unbounded knapsack pattern"], timeComplexity: "O(n²)", spaceComplexity: "O(n)" },
    { id: "s181", title: "Egg Drop Problem", difficulty: "Hard", topic: "Dynamic Programming Part-II", description: "Given k eggs and n floors, find minimum trials needed to find the critical floor.", approach: "DP with binary search optimization. dp[k][n] = min trials with k eggs and n floors.", solutionCode: `int eggDrop(int k, int n) {\n    vector<vector<int>> dp(k+1, vector<int>(n+1, 0));\n    int m = 0;\n    while (dp[k][m] < n) {\n        m++;\n        for (int i = 1; i <= k; i++)\n            dp[i][m] = 1 + dp[i-1][m-1] + dp[i][m-1];\n    }\n    return m;\n}`, hints: ["Think: how many floors can we check with m trials", "dp[eggs][trials] = max floors checkable"], timeComplexity: "O(k * n)", spaceComplexity: "O(k * n)" },
    { id: "s182", title: "Word Break", difficulty: "Medium", topic: "Dynamic Programming Part-II", description: "Given a string and a dictionary, determine if the string can be segmented into dictionary words.", approach: "DP: dp[i] = true if s[0..i-1] can be segmented. Check all prefixes ending at i.", solutionCode: `bool wordBreak(string s, vector<string>& wordDict) {\n    unordered_set<string> dict(wordDict.begin(), wordDict.end());\n    int n = s.size();\n    vector<bool> dp(n + 1, false);\n    dp[0] = true;\n    for (int i = 1; i <= n; i++)\n        for (int j = 0; j < i; j++)\n            if (dp[j] && dict.count(s.substr(j, i - j))) { dp[i] = true; break; }\n    return dp[n];\n}`, hints: ["dp[i] = can s[0..i-1] be segmented", "Check all split points"], timeComplexity: "O(n²)", spaceComplexity: "O(n)", leetcodeNumber: 139 },
    { id: "s183", title: "Palindrome Partitioning (Min Cuts)", difficulty: "Hard", topic: "Dynamic Programming Part-II", description: "Find minimum cuts needed for palindrome partitioning of a string.", approach: "DP: dp[i] = min cuts for s[0..i]. For each palindrome ending at i, dp[i] = min(dp[j-1] + 1).", solutionCode: `int minCut(string s) {\n    int n = s.size();\n    vector<vector<bool>> isPalin(n, vector<bool>(n, false));\n    for (int i = n-1; i >= 0; i--)\n        for (int j = i; j < n; j++)\n            isPalin[i][j] = (s[i] == s[j]) && (j - i < 2 || isPalin[i+1][j-1]);\n    vector<int> dp(n, 0);\n    for (int i = 0; i < n; i++) {\n        if (isPalin[0][i]) { dp[i] = 0; continue; }\n        dp[i] = i;\n        for (int j = 1; j <= i; j++)\n            if (isPalin[j][i]) dp[i] = min(dp[i], dp[j-1] + 1);\n    }\n    return dp[n-1];\n}`, hints: ["Precompute palindrome table", "dp[i] = min cuts for s[0..i]"], timeComplexity: "O(n²)", spaceComplexity: "O(n²)", leetcodeNumber: 132 },
    { id: "s184", title: "Partition Equal Subset Sum", difficulty: "Medium", topic: "Dynamic Programming Part-II", description: "Determine if array can be partitioned into two subsets with equal sum.", approach: "Subset sum problem with target = totalSum/2.", solutionCode: `bool canPartition(vector<int>& nums) {\n    int sum = accumulate(nums.begin(), nums.end(), 0);\n    if (sum % 2) return false;\n    int target = sum / 2;\n    vector<bool> dp(target + 1, false);\n    dp[0] = true;\n    for (int num : nums)\n        for (int j = target; j >= num; j--)\n            dp[j] = dp[j] || dp[j - num];\n    return dp[target];\n}`, hints: ["Reduce to subset sum with target = sum/2", "If sum is odd, impossible"], timeComplexity: "O(n * sum)", spaceComplexity: "O(sum)", leetcodeNumber: 416 }
  ]},
  { name: "Trie", day: 27, problems: [
    { id: "s185", title: "Implement Trie", difficulty: "Medium", topic: "Trie", description: "Implement a trie with insert, search, and startsWith methods.", approach: "Use array of 26 children pointers per node. Mark end of word.", solutionCode: `class Trie {\n    struct TrieNode {\n        TrieNode* children[26] = {};\n        bool isEnd = false;\n    };\n    TrieNode* root;\npublic:\n    Trie() : root(new TrieNode()) {}\n    void insert(string word) {\n        auto node = root;\n        for (char c : word) {\n            if (!node->children[c-'a']) node->children[c-'a'] = new TrieNode();\n            node = node->children[c-'a'];\n        }\n        node->isEnd = true;\n    }\n    bool search(string word) {\n        auto node = root;\n        for (char c : word) {\n            if (!node->children[c-'a']) return false;\n            node = node->children[c-'a'];\n        }\n        return node->isEnd;\n    }\n    bool startsWith(string prefix) {\n        auto node = root;\n        for (char c : prefix) {\n            if (!node->children[c-'a']) return false;\n            node = node->children[c-'a'];\n        }\n        return true;\n    }\n};`, hints: ["26 children per node", "Mark isEnd for complete words"], timeComplexity: "O(L) per operation", spaceComplexity: "O(N*L)", leetcodeNumber: 208 },
    { id: "s186", title: "Trie II (Count Prefix & Words)", difficulty: "Medium", topic: "Trie", description: "Implement Trie with countWordsEqualTo and countWordsStartingWith.", approach: "Add countEnd and countPrefix to each node.", solutionCode: `class Trie2 {\n    struct Node {\n        Node* children[26] = {};\n        int cntEnd = 0, cntPrefix = 0;\n    };\n    Node* root;\npublic:\n    Trie2() : root(new Node()) {}\n    void insert(string word) {\n        auto node = root;\n        for (char c : word) {\n            if (!node->children[c-'a']) node->children[c-'a'] = new Node();\n            node = node->children[c-'a'];\n            node->cntPrefix++;\n        }\n        node->cntEnd++;\n    }\n    int countWordsEqualTo(string word) {\n        auto node = root;\n        for (char c : word) {\n            if (!node->children[c-'a']) return 0;\n            node = node->children[c-'a'];\n        }\n        return node->cntEnd;\n    }\n    int countWordsStartingWith(string prefix) {\n        auto node = root;\n        for (char c : prefix) {\n            if (!node->children[c-'a']) return 0;\n            node = node->children[c-'a'];\n        }\n        return node->cntPrefix;\n    }\n    void erase(string word) {\n        auto node = root;\n        for (char c : word) {\n            node = node->children[c-'a'];\n            node->cntPrefix--;\n        }\n        node->cntEnd--;\n    }\n};`, hints: ["Track both word count and prefix count", "Decrement on erase"], timeComplexity: "O(L)", spaceComplexity: "O(N*L)" },
    { id: "s187", title: "Longest Word With All Prefixes", difficulty: "Hard", topic: "Trie", description: "Find the longest word in dictionary where every prefix is also a word.", approach: "Insert all words into trie. DFS through trie, only following paths where each node is end of word.", solutionCode: `string longestWord(vector<string>& words) {\n    struct Node { Node* ch[26]={}; bool isEnd=false; };\n    Node* root = new Node();\n    for (auto& w : words) {\n        auto node = root;\n        for (char c : w) {\n            if (!node->ch[c-'a']) node->ch[c-'a'] = new Node();\n            node = node->ch[c-'a'];\n        }\n        node->isEnd = true;\n    }\n    string result = "", curr = "";\n    function<void(Node*)> dfs = [&](Node* node) {\n        if (curr.size() > result.size()) result = curr;\n        for (int i = 0; i < 26; i++) {\n            if (node->ch[i] && node->ch[i]->isEnd) {\n                curr += ('a'+i);\n                dfs(node->ch[i]);\n                curr.pop_back();\n            }\n        }\n    };\n    dfs(root);\n    return result;\n}`, hints: ["DFS only through isEnd nodes", "Every prefix must be a valid word"], timeComplexity: "O(N*L)", spaceComplexity: "O(N*L)" },
    { id: "s188", title: "Count Distinct Substrings", difficulty: "Hard", topic: "Trie", description: "Count the number of distinct substrings of a given string.", approach: "Insert all suffixes into a trie. Number of nodes in trie = number of distinct substrings + 1.", solutionCode: `int countDistinctSubstrings(string s) {\n    struct Node { Node* ch[26]={}; };\n    Node* root = new Node();\n    int count = 0;\n    for (int i = 0; i < s.size(); i++) {\n        auto node = root;\n        for (int j = i; j < s.size(); j++) {\n            if (!node->ch[s[j]-'a']) {\n                node->ch[s[j]-'a'] = new Node();\n                count++;\n            }\n            node = node->ch[s[j]-'a'];\n        }\n    }\n    return count + 1; // +1 for empty string\n}`, hints: ["Insert all suffixes", "Each new node = new distinct substring"], timeComplexity: "O(n²)", spaceComplexity: "O(n²)" },
    { id: "s189", title: "Power Set", difficulty: "Medium", topic: "Trie", description: "Generate all subsets (power set) of a given set.", approach: "Use bit manipulation. For each number from 0 to 2^n-1, include elements where bit is set.", solutionCode: `vector<vector<int>> subsets(vector<int>& nums) {\n    int n = nums.size();\n    vector<vector<int>> result;\n    for (int mask = 0; mask < (1 << n); mask++) {\n        vector<int> subset;\n        for (int i = 0; i < n; i++)\n            if (mask & (1 << i)) subset.push_back(nums[i]);\n        result.push_back(subset);\n    }\n    return result;\n}`, hints: ["2^n subsets total", "Each bit represents include/exclude"], timeComplexity: "O(n * 2^n)", spaceComplexity: "O(n * 2^n)", leetcodeNumber: 78 },
    { id: "s190", title: "Maximum XOR of Two Numbers", difficulty: "Medium", topic: "Trie", description: "Find the maximum XOR of any two numbers in an array.", approach: "Insert all numbers' binary representations into a trie. For each number, traverse trie choosing opposite bits.", solutionCode: `int findMaximumXOR(vector<int>& nums) {\n    struct Node { Node* ch[2]={}; };\n    Node* root = new Node();\n    auto insert = [&](int num) {\n        auto node = root;\n        for (int i = 31; i >= 0; i--) {\n            int bit = (num >> i) & 1;\n            if (!node->ch[bit]) node->ch[bit] = new Node();\n            node = node->ch[bit];\n        }\n    };\n    auto query = [&](int num) {\n        auto node = root;\n        int maxXor = 0;\n        for (int i = 31; i >= 0; i--) {\n            int bit = (num >> i) & 1;\n            if (node->ch[1-bit]) { maxXor |= (1 << i); node = node->ch[1-bit]; }\n            else node = node->ch[bit];\n        }\n        return maxXor;\n    };\n    int result = 0;\n    for (int num : nums) insert(num);\n    for (int num : nums) result = max(result, query(num));\n    return result;\n}`, hints: ["Binary trie for XOR", "Choose opposite bit when possible"], timeComplexity: "O(32n)", spaceComplexity: "O(32n)", leetcodeNumber: 421 },
    { id: "s191", title: "Maximum XOR Queries", difficulty: "Hard", topic: "Trie", description: "Given an array and queries [xi, mi], find maximum XOR of xi with any element ≤ mi.", approach: "Sort array and queries by mi. Insert elements ≤ mi into trie before processing each query.", solutionCode: `vector<int> maximizeXor(vector<int>& nums, vector<vector<int>>& queries) {\n    sort(nums.begin(), nums.end());\n    int q = queries.size();\n    vector<int> idx(q);\n    iota(idx.begin(), idx.end(), 0);\n    sort(idx.begin(), idx.end(), [&](int a, int b) { return queries[a][1] < queries[b][1]; });\n    struct Node { Node* ch[2]={}; };\n    Node* root = new Node();\n    auto insert = [&](int num) {\n        auto node = root;\n        for (int i = 31; i >= 0; i--) {\n            int bit = (num >> i) & 1;\n            if (!node->ch[bit]) node->ch[bit] = new Node();\n            node = node->ch[bit];\n        }\n    };\n    auto query = [&](int num) -> int {\n        auto node = root;\n        int maxXor = 0;\n        for (int i = 31; i >= 0; i--) {\n            int bit = (num >> i) & 1;\n            if (node->ch[1-bit]) { maxXor |= (1 << i); node = node->ch[1-bit]; }\n            else if (node->ch[bit]) node = node->ch[bit];\n            else return -1;\n        }\n        return maxXor;\n    };\n    vector<int> result(q);\n    int j = 0;\n    for (int i : idx) {\n        while (j < nums.size() && nums[j] <= queries[i][1]) insert(nums[j++]);\n        result[i] = j == 0 ? -1 : query(queries[i][0]);\n    }\n    return result;\n}`, hints: ["Offline: sort queries by limit", "Insert elements ≤ limit before querying"], timeComplexity: "O((n+q) * 32)", spaceComplexity: "O(n * 32)" }
  ]}
];

// Flat list of all problems
export const allStriverProblems: StriverProblem[] = striverTopics.flatMap(t => t.problems);

// Merge topics by pattern (e.g. "Arrays", "Arrays Part-II" → "Arrays")
function getBaseTopic(name: string): string {
  const mapping: Record<string, string> = {
    'Arrays': 'Arrays',
    'Arrays Part-II': 'Arrays',
    'Arrays Part-III': 'Arrays',
    'Arrays Part-IV': 'Arrays',
    'Linked List': 'Linked List',
    'Linked List Part-II': 'Linked List',
    'Linked List and Arrays': 'Linked List',
    'Greedy Algorithm': 'Greedy',
    'Recursion': 'Recursion & Backtracking',
    'Recursion and Backtracking': 'Recursion & Backtracking',
    'Binary Search': 'Binary Search',
    'Heaps': 'Heaps',
    'Stack and Queue': 'Stack & Queue',
    'Stack and Queue Part-II': 'Stack & Queue',
    'String': 'Strings',
    'String Part-II': 'Strings',
    'Binary Tree': 'Binary Tree',
    'Binary Tree Part-II': 'Binary Tree',
    'Binary Tree Part-III': 'Binary Tree',
    'Binary Search Tree': 'Binary Search Tree',
    'Binary Search Tree Part-II': 'Binary Search Tree',
    'Binary Trees [Miscellaneous]': 'Binary Tree',
    'Graph': 'Graphs',
    'Graph Part-II': 'Graphs',
    'Dynamic Programming': 'Dynamic Programming',
    'Dynamic Programming Part-II': 'Dynamic Programming',
    'Trie': 'Trie',
  };
  return mapping[name] || name;
}

export interface MergedTopic {
  name: string;
  problems: StriverProblem[];
}

export const mergedStriverTopics: MergedTopic[] = (() => {
  const map = new Map<string, StriverProblem[]>();
  const order: string[] = [];
  for (const topic of striverTopics) {
    const base = getBaseTopic(topic.name);
    if (!map.has(base)) {
      map.set(base, []);
      order.push(base);
    }
    map.get(base)!.push(...topic.problems);
  }
  return order.map(name => ({ name, problems: map.get(name)! }));
})();
