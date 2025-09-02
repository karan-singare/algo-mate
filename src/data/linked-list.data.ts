import { Lesson } from './types';

export const linkedListLessons: Lesson[] = [
  {
    id: 'linkedlist-singly-intro',
    title: 'Singly Linked List - Intro',
    topic: 'linked-list',
    difficulty: 'beginner',
    content: `# Singly Linked List - Introduction

A singly linked list is a linear data structure where elements are stored in nodes, and each node contains data and a reference (pointer) to the next node in the sequence.

## Key Characteristics:
- **Dynamic Size**: Can grow and shrink during runtime
- **Non-contiguous Memory**: Nodes can be stored anywhere in memory
- **Sequential Access**: Must traverse from head to reach any element
- **Memory Overhead**: Each node requires extra space for the pointer

## Node Structure:
Each node contains:
- **Data**: The actual value stored
- **Next**: Pointer to the next node (null for the last node)

## Advantages:
- Dynamic size allocation
- Efficient insertion and deletion at the beginning
- No memory waste (only allocates what's needed)

## Disadvantages:
- No random access (must traverse sequentially)
- Extra memory overhead for pointers
- Cache performance can be poor due to non-contiguous storage

Linked lists are fundamental for understanding more complex data structures like stacks, queues, and trees.`,
    examples: [
      'Creating a linked list with nodes 1 -> 2 -> 3 -> null',
      'Inserting a new node at the beginning',
      'Deleting a node from the list',
      'Traversing the entire list'
    ],
    codeSnippets: [
      {
        language: 'python',
        code: `# Python singly linked list example
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class LinkedList:
    def __init__(self):
        self.head = None
    
    def insert_at_beginning(self, val):
        new_node = ListNode(val)
        new_node.next = self.head
        self.head = new_node
    
    def display(self):
        current = self.head
        while current:
            print(current.val, end=" -> ")
            current = current.next
        print("None")

# Usage
ll = LinkedList()
ll.insert_at_beginning(3)
ll.insert_at_beginning(2)
ll.insert_at_beginning(1)
ll.display()  # Output: 1 -> 2 -> 3 -> None`
      }
    ]
  }
];
