export type Problem = {
  id: string;
  title: string;
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  statement: string;
  description: string;
  category: string;
  timeLimit: number;
};

export const problems: Problem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    topic: 'arrays',
    difficulty: 'beginner',
    category: 'Arrays',
    timeLimit: 15,
    description: 'Find two numbers in an array that add up to a target value.',
    statement: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:
Input: nums = [3,3], target = 6
Output: [0,1]

Constraints:
- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
- Only one valid answer exists.`
  },
  {
    id: 'reverse-linked-list',
    title: 'Reverse Linked List',
    topic: 'linked-list',
    difficulty: 'beginner',
    category: 'Linked Lists',
    timeLimit: 20,
    description: 'Reverse a singly linked list using iterative or recursive approach.',
    statement: `Given the head of a singly linked list, reverse the list, and return the reversed list.

Example 1:
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]

Example 2:
Input: head = [1,2]
Output: [2,1]

Example 3:
Input: head = []
Output: []

Constraints:
- The number of nodes in the list is the range [0, 5000].
- -5000 <= Node.val <= 5000

Follow up: A linked list can be reversed either iteratively or recursively. Could you implement both?`
  }
];