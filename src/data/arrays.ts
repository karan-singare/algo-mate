import { Lesson } from './types';

export const arraysLessons: Lesson[] = [
  {
    id: 'arrays-intro',
    title: 'Introduction to Arrays',
    topic: 'arrays',
    difficulty: 'beginner',
    content: `# Introduction to Arrays

An array is a collection of elements stored at contiguous memory locations. It's one of the most fundamental data structures in computer science.

## Key Characteristics:
- **Fixed Size**: Arrays have a predetermined size
- **Homogeneous**: All elements must be of the same data type
- **Indexed Access**: Elements are accessed using indices (0-based)
- **Memory Efficient**: Elements are stored in contiguous memory

## Common Operations:
- Access: O(1) - Direct access by index
- Search: O(n) - Linear search through elements
- Insertion: O(n) - May require shifting elements
- Deletion: O(n) - May require shifting elements

Arrays are the building blocks for many other data structures and algorithms.`,
    examples: [
      'Creating an array of integers: [1, 2, 3, 4, 5]',
      'Accessing the first element: array[0]',
      'Finding the length of an array'
    ],
    codeSnippets: [
      {
        language: 'python',
        code: `# Python array example
numbers = [1, 2, 3, 4, 5]
print(numbers[0])  # Output: 1
print(len(numbers))  # Output: 5

# Adding elements
numbers.append(6)
print(numbers)  # Output: [1, 2, 3, 4, 5, 6]`
      },
      {
        language: 'cpp',
        code: `// C++ array example
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> numbers = {1, 2, 3, 4, 5};
    cout << numbers[0] << endl;  // Output: 1
    cout << numbers.size() << endl;  // Output: 5
    
    // Adding elements
    numbers.push_back(6);
    for(int num : numbers) {
        cout << num << " ";
    }
    return 0;
}`
      }
    ]
  },
  {
    id: 'arrays-traversal',
    title: 'Array Traversal',
    topic: 'arrays',
    difficulty: 'beginner',
    content: `# Array Traversal

Array traversal is the process of visiting each element in an array exactly once. It's a fundamental operation that forms the basis for many algorithms.

## Types of Traversal:
1. **Forward Traversal**: Visit elements from index 0 to n-1
2. **Backward Traversal**: Visit elements from index n-1 to 0
3. **Bidirectional**: Traverse from both ends towards the center

## Common Use Cases:
- Displaying all elements
- Searching for a specific value
- Calculating sum, average, or other statistics
- Applying transformations to each element

## Time Complexity:
- **Time**: O(n) where n is the number of elements
- **Space**: O(1) for iterative approaches

Understanding traversal patterns is crucial for solving array-based problems efficiently.`,
    examples: [
      'Print all elements in an array',
      'Find the maximum element',
      'Calculate the sum of all elements',
      'Search for a specific value'
    ],
    codeSnippets: [
      {
        language: 'python',
        code: `# Python array traversal examples
numbers = [10, 20, 30, 40, 50]

# Forward traversal
print("Forward traversal:")
for i in range(len(numbers)):
    print(f"Index {i}: {numbers[i]}")

# Enhanced for loop
print("\\nUsing enhanced for loop:")
for num in numbers:
    print(num)

# Finding maximum
max_val = numbers[0]
for num in numbers:
    if num > max_val:
        max_val = num
print(f"\\nMaximum value: {max_val}")`
      }
    ]
  }
];
