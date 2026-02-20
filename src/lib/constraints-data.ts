// Generate LeetCode-style constraints based on problem metadata
import { Problem } from './problems-data';

const constraintsByLeetcode: Record<number, string[]> = {
  217: ['1 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
  242: ['1 <= s.length, t.length <= 5 * 10^4', 's and t consist of lowercase English letters'],
  1: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9', 'Only one valid answer exists'],
  49: ['1 <= strs.length <= 10^4', '0 <= strs[i].length <= 100', 'strs[i] consists of lowercase English letters'],
  347: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4', 'k is in the range [1, number of unique elements]'],
  238: ['2 <= nums.length <= 10^5', '-30 <= nums[i] <= 30', 'The product of any prefix or suffix fits in a 32-bit integer'],
  36: ['board.length == 9', 'board[i].length == 9', 'board[i][j] is a digit 1-9 or \'.\''],
  128: ['0 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
  271: ['1 <= strs.length <= 200', '0 <= strs[i].length <= 200', 'strs[i] consists of UTF-8 characters'],
  125: ['1 <= s.length <= 2 * 10^5', 's consists only of printable ASCII characters'],
  167: ['2 <= numbers.length <= 3 * 10^4', '-1000 <= numbers[i] <= 1000', 'numbers is sorted in non-decreasing order'],
  15: ['3 <= nums.length <= 3000', '-10^5 <= nums[i] <= 10^5'],
  11: ['n == height.length', '2 <= n <= 10^5', '0 <= height[i] <= 10^4'],
  42: ['n == height.length', '1 <= n <= 2 * 10^4', '0 <= height[i] <= 10^5'],
  3: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces'],
  424: ['1 <= s.length <= 10^5', 's consists of only uppercase English letters', '0 <= k <= s.length'],
  567: ['1 <= s1.length, s2.length <= 10^4', 's1 and s2 consist of lowercase English letters'],
  76: ['m == s.length, n == t.length', '1 <= m, n <= 10^5', 's and t consist of uppercase and lowercase English letters'],
  239: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4', '1 <= k <= nums.length'],
  20: ['1 <= s.length <= 10^4', 's consists of parentheses only \'()[]{}\''],
  155: ['-2^31 <= val <= 2^31 - 1', 'Methods pop, top and getMin are always called on non-empty stacks', 'At most 3 * 10^4 calls will be made'],
  150: ['1 <= tokens.length <= 10^4', 'Each token is an operator or an integer in the range [-200, 200]'],
  22: ['1 <= n <= 8'],
  739: ['1 <= temperatures.length <= 10^5', '30 <= temperatures[i] <= 100'],
  853: ['n == position.length == speed.length', '1 <= n <= 10^5', '0 < target <= 10^6'],
  84: ['1 <= heights.length <= 10^5', '0 <= heights[i] <= 10^4'],
  704: ['1 <= nums.length <= 10^4', '-10^4 < nums[i], target < 10^4', 'All integers in nums are unique', 'nums is sorted in ascending order'],
  33: ['1 <= nums.length <= 5000', '-10^4 <= nums[i] <= 10^4', 'All values of nums are unique'],
  875: ['1 <= piles.length <= 10^4', 'piles.length <= h <= 10^9', '1 <= piles[i] <= 10^9'],
  153: ['n == nums.length', '1 <= n <= 5000', '-5000 <= nums[i] <= 5000', 'All integers are unique'],
  981: ['1 <= key.length, value.length <= 100', '1 <= timestamp <= 10^7', 'All timestamps are strictly increasing'],
  4: ['nums1.length == m, nums2.length == n', '0 <= m <= 1000, 0 <= n <= 1000', '1 <= m + n <= 2000'],
  206: ['The number of nodes is in the range [0, 5000]', '-5000 <= Node.val <= 5000'],
  21: ['The number of nodes in both lists is in the range [0, 50]', '-100 <= Node.val <= 100', 'Both lists are sorted in non-decreasing order'],
  143: ['The number of nodes is in the range [1, 5 * 10^4]', '1 <= Node.val <= 1000'],
  19: ['The number of nodes is in the range [1, 30]', '0 <= Node.val <= 100', '1 <= n <= size of list'],
  138: ['0 <= n <= 1000', '-10^4 <= Node.val <= 10^4', 'random pointer is null or points to a node in the linked list'],
  2: ['The number of nodes is in the range [1, 100]', '0 <= Node.val <= 9', 'The number represents a non-negative integer without leading zeros'],
  141: ['The number of nodes is in the range [0, 10^4]', '-10^5 <= Node.val <= 10^5'],
  287: ['1 <= n <= 10^5', 'nums.length == n + 1', '1 <= nums[i] <= n'],
  23: ['k == lists.length', '0 <= k <= 10^4', '0 <= lists[i].length <= 500', '-10^4 <= lists[i][j] <= 10^4'],
  25: ['The number of nodes is in the range [1, 5000]', '0 <= Node.val <= 1000', '1 <= k <= n'],
  226: ['The number of nodes is in the range [0, 100]', '-100 <= Node.val <= 100'],
  104: ['The number of nodes is in the range [0, 10^4]', '-100 <= Node.val <= 100'],
  543: ['The number of nodes is in the range [1, 10^4]', '-100 <= Node.val <= 100'],
  110: ['The number of nodes is in the range [0, 5000]', '-10^4 <= Node.val <= 10^4'],
  100: ['The number of nodes in both trees is in the range [0, 100]', '-10^4 <= Node.val <= 10^4'],
  572: ['The number of nodes in root is in the range [1, 2000]', 'The number of nodes in subRoot is in the range [1, 1000]'],
  235: ['The number of nodes is in the range [2, 10^5]', '0 <= Node.val <= 10^5', 'All values are unique'],
  102: ['The number of nodes is in the range [0, 2000]', '-1000 <= Node.val <= 1000'],
  199: ['The number of nodes is in the range [0, 100]', '-100 <= Node.val <= 100'],
  1448: ['The number of nodes is in the range [1, 10^4]', '0 <= Node.val <= 10^4'],
  98: ['The number of nodes is in the range [1, 10^4]', '-2^31 <= Node.val <= 2^31 - 1'],
  230: ['The number of nodes is in the range [1, 10^4]', '0 <= Node.val <= 10^4', '1 <= k <= n'],
  105: ['1 <= preorder.length <= 3000', 'preorder.length == inorder.length', '-3000 <= values <= 3000', 'All values are unique'],
  124: ['The number of nodes is in the range [1, 3 * 10^4]', '-1000 <= Node.val <= 1000'],
  297: ['The number of nodes is in the range [0, 10^4]', '-1000 <= Node.val <= 1000'],
  208: ['1 <= word.length, prefix.length <= 2000', 'word and prefix consist only of lowercase English letters'],
  211: ['1 <= word.length <= 25', 'word in addWord consists of lowercase English letters', 'word in search may contain \'.\' or lowercase English letters'],
  472: ['1 <= words.length <= 10^4', '1 <= words[i].length <= 30', 'words[i] consists of only lowercase English letters'],
  295: ['-10^5 <= num <= 10^5', 'At most 5 * 10^4 calls will be made to addNum and findMedian'],
  215: ['1 <= k <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
  621: ['1 <= tasks.length <= 10^4', 'tasks[i] is an uppercase English letter', '0 <= n <= 100'],
  355: ['1 <= userId, followerId, followeeId <= 500', '0 <= tweetId <= 10^4', 'At most 3 * 10^4 calls will be made'],
  78: ['1 <= nums.length <= 10', '-10 <= nums[i] <= 10', 'All elements are unique'],
  39: ['1 <= candidates.length <= 30', '2 <= candidates[i] <= 40', 'All elements are distinct', '1 <= target <= 40'],
  46: ['1 <= nums.length <= 6', '-10 <= nums[i] <= 10', 'All integers are unique'],
  90: ['1 <= nums.length <= 10', '-10 <= nums[i] <= 10'],
  40: ['1 <= candidates.length <= 100', '1 <= candidates[i] <= 50', '1 <= target <= 30'],
  79: ['m == board.length', 'n == board[i].length', '1 <= m, n <= 6', '1 <= word.length <= 15'],
  131: ['1 <= s.length <= 16', 's contains only lowercase English letters'],
  17: ['0 <= digits.length <= 4', 'digits[i] is a digit in the range [\'2\', \'9\']'],
  51: ['1 <= n <= 9'],
  200: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 300', 'grid[i][j] is \'0\' or \'1\''],
  133: ['The number of nodes is in the range [0, 100]', '1 <= Node.val <= 100', 'Each node value is unique'],
  695: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 50', 'grid[i][j] is either 0 or 1'],
  417: ['m == heights.length', 'n == heights[r].length', '1 <= m, n <= 200', '0 <= heights[r][c] <= 10^5'],
  130: ['m == board.length', 'n == board[i].length', '1 <= m, n <= 200', 'board[i][j] is \'X\' or \'O\''],
  994: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 10', 'grid[i][j] is 0, 1, or 2'],
  207: ['1 <= numCourses <= 2000', '0 <= prerequisites.length <= 5000', 'prerequisites[i].length == 2'],
  210: ['1 <= numCourses <= 2000', '0 <= prerequisites.length <= 5000'],
  684: ['n == edges.length', '3 <= n <= 1000', 'edges[i].length == 2', '1 <= edges[i][0], edges[i][1] <= n'],
  323: ['1 <= n <= 2000', '0 <= edges.length <= 5000'],
  127: ['1 <= beginWord.length <= 10', 'endWord.length == beginWord.length', '1 <= wordList.length <= 5000'],
  332: ['1 <= tickets.length <= 300', 'tickets[i].length == 2', 'from_i.length == to_i.length == 3'],
  743: ['1 <= k <= n <= 100', '1 <= times.length <= 6000'],
  787: ['1 <= n <= 100', '0 <= flights.length <= n * (n - 1) / 2', '0 <= k <= 100'],
  269: ['1 <= words.length <= 100', '1 <= words[i].length <= 100'],
  1584: ['1 <= points.length <= 1000', '-10^6 <= x_i, y_i <= 10^6', 'All pairs (x_i, y_i) are distinct'],
  778: ['n == grid.length == grid[i].length', '1 <= n <= 50', '0 <= grid[i][j] < n^2'],
  70: ['1 <= n <= 45'],
  746: ['2 <= cost.length <= 1000', '0 <= cost[i] <= 999'],
  198: ['1 <= nums.length <= 100', '0 <= nums[i] <= 400'],
  213: ['1 <= nums.length <= 100', '0 <= nums[i] <= 1000'],
  5: ['1 <= s.length <= 1000', 's consist of only digits and English letters'],
  647: ['1 <= s.length <= 1000', 's consists of lowercase English letters'],
  91: ['1 <= s.length <= 100', 's contains only digits and may contain leading zeros'],
  322: ['1 <= coins.length <= 12', '1 <= coins[i] <= 2^31 - 1', '0 <= amount <= 10^4'],
  152: ['1 <= nums.length <= 2 * 10^4', '-10 <= nums[i] <= 10', 'The product fits in a 32-bit integer'],
  139: ['1 <= s.length <= 300', '1 <= wordDict.length <= 1000', '1 <= wordDict[i].length <= 20'],
  300: ['1 <= nums.length <= 2500', '-10^4 <= nums[i] <= 10^4'],
  416: ['1 <= nums.length <= 200', '1 <= nums[i] <= 100'],
  62: ['1 <= m, n <= 100'],
  1143: ['1 <= text1.length, text2.length <= 1000', 'text1 and text2 consist of only lowercase English characters'],
  309: ['1 <= prices.length <= 5000', '0 <= prices[i] <= 1000'],
  518: ['1 <= coins.length <= 300', '1 <= coins[i] <= 5000', '0 <= amount <= 5000'],
  494: ['1 <= nums.length <= 20', '0 <= nums[i] <= 1000', '0 <= sum(nums[i]) <= 1000'],
  97: ['0 <= s1.length, s2.length <= 100', '0 <= s3.length <= 200', 's1, s2, s3 consist of lowercase English letters'],
  329: ['m == matrix.length', 'n == matrix[i].length', '1 <= m, n <= 200', '0 <= matrix[i][j] <= 2^31 - 1'],
  115: ['0 <= s.length, t.length <= 1000', 's and t consist of English letters'],
  72: ['0 <= word1.length, word2.length <= 500', 'word1 and word2 consist of lowercase English letters'],
  312: ['n == nums.length', '1 <= n <= 300', '0 <= nums[i] <= 100'],
  10: ['1 <= s.length <= 20', '1 <= p.length <= 20', 's contains only lowercase English letters', 'p contains only lowercase English letters, \'.\' and \'*\''],
  53: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
  55: ['1 <= nums.length <= 10^4', '0 <= nums[i] <= 10^5'],
  45: ['1 <= nums.length <= 10^4', '0 <= nums[i] <= 1000', 'It is guaranteed you can reach nums[n - 1]'],
  134: ['n == gas.length == cost.length', '1 <= n <= 10^5', '0 <= gas[i], cost[i] <= 10^4'],
  846: ['1 <= hand.length <= 10^4', '0 <= hand[i] <= 10^9', '1 <= groupSize <= hand.length'],
  1899: ['1 <= triplets.length <= 10^5', 'triplets[i].length == 3', '1 <= a_i, b_i, c_i, x, y, z <= 1000'],
  763: ['1 <= s.length <= 500', 's consists of lowercase English letters'],
  678: ['1 <= s.length <= 100', 's[i] is \'(\', \')\' or \'*\''],
  56: ['1 <= intervals.length <= 10^4', 'intervals[i].length == 2', '0 <= start_i <= end_i <= 10^4'],
  57: ['0 <= intervals.length <= 10^4', 'intervals[i].length == 2', '0 <= start_i <= end_i <= 10^5'],
  435: ['1 <= intervals.length <= 10^5', 'intervals[i].length == 2'],
  1851: ['1 <= intervals.length <= 10^5', '1 <= queries.length <= 10^5'],
  252: ['0 <= intervals.length <= 10^4', 'intervals[i].length == 2'],
  253: ['1 <= intervals.length <= 10^4'],
  48: ['n == matrix.length == matrix[i].length', '1 <= n <= 20', '-1000 <= matrix[i][j] <= 1000'],
  54: ['m == matrix.length', 'n == matrix[i].length', '1 <= m, n <= 10', '-100 <= matrix[i][j] <= 100'],
  73: ['m == matrix.length', 'n == matrix[0].length', '1 <= m, n <= 200'],
  202: ['1 <= n <= 2^31 - 1'],
  66: ['1 <= digits.length <= 100', '0 <= digits[i] <= 9', 'digits does not contain any leading 0s'],
  50: ['-100.0 < x < 100.0', '-2^31 <= n <= 2^31 - 1', 'n is an integer', 'Either x is not zero or n > 0'],
  43: ['1 <= num1.length, num2.length <= 200', 'num1 and num2 consist of digits only', 'Neither num1 nor num2 contains leading zeros'],
  2013: ['1 <= x_i, y_i <= 10^9', 'At most 10^5 calls will be made in total'],
  136: ['1 <= nums.length <= 3 * 10^4', '-3 * 10^4 <= nums[i] <= 3 * 10^4', 'Each element appears twice except for one'],
  191: ['The input must be a binary string of length 32'],
  338: ['0 <= n <= 10^5'],
  190: ['The input must be a 32-bit unsigned integer'],
  268: ['n == nums.length', '1 <= n <= 10^4', '0 <= nums[i] <= n', 'All numbers are unique'],
  7: ['-2^31 <= x <= 2^31 - 1'],
  371: ['-1000 <= a, b <= 1000'],
};

export function getConstraints(problem: Problem): string[] {
  if (constraintsByLeetcode[problem.leetcodeNumber]) {
    return constraintsByLeetcode[problem.leetcodeNumber];
  }
  
  // Fallback generic constraints
  const desc = problem.description.toLowerCase();
  const constraints: string[] = [];
  
  if (desc.includes('array') || desc.includes('nums')) {
    constraints.push('1 <= nums.length <= 10^5');
    constraints.push('-10^9 <= nums[i] <= 10^9');
  } else if (desc.includes('string')) {
    constraints.push('1 <= s.length <= 10^5');
    constraints.push('s consists of printable ASCII characters');
  } else if (desc.includes('linked list') || desc.includes('node')) {
    constraints.push('The number of nodes is in the range [0, 10^4]');
    constraints.push('-10^5 <= Node.val <= 10^5');
  } else if (desc.includes('tree')) {
    constraints.push('The number of nodes is in the range [0, 10^4]');
    constraints.push('-100 <= Node.val <= 100');
  } else if (desc.includes('matrix') || desc.includes('grid')) {
    constraints.push('m == grid.length, n == grid[i].length');
    constraints.push('1 <= m, n <= 200');
  } else {
    constraints.push('Input values are within standard 32-bit integer range');
  }
  
  return constraints;
}
