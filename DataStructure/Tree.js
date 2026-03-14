class Node {
    constructor(value, left=null, right=null){
        this.value = value; 
        this.left = left; 
        this.right = right;
    }
}

// Full Binary tree all node has 2 children or none
// Perfect Binary Tree: All the leaf nodes are at the same level, and this level has the maximum number of nodes.
// Complete Binary Tree: All levels are completely filled except possibly for the last level, which is filled from left to right.
// A perfect tree will be always be Full and Complete but a Full and Complete tree may not be perfect.
// Balanced Binary Tree: The difference between the heights of the left and right subtrees for every node is not more than 1.
// Binary Search Tree: A binary tree in which for each node, value of all the nodes in the left subtree is lesser and value of all the nodes in the right subtree is greater.
// Binary Heap: A binary tree with the following properties:
// 1. It’s a complete tree (All levels are completely filled except possibly for the last level, which is filled from left to right).
// 2. A binary heap is either a min-heap or a max-heap.
// 3. In a min-heap, if P is a parent node of C, then the key (the value) of P is less than or equal to the key of C.
// 4. In a max-heap, the key of P is greater than or equal to the key of C.
// Binary Heap is used to implement Priority Queue
// Binary Heap is used to implement Heap Sort
// Binary Heap is used to implement Graph Algorithms like Prim’s Algorithm and Dijkstra’s Algorithm
// Binary Heap is used to implement Priority Queue in Dijkstra’s Algorithm
// Binary Heap is used to implement Priority Queue in Prim’s Algorithm
// Binary Heap is used to implement Priority Queue in Huffman Codes
// Binary Heap is used to implement Priority Queue in Operating systems
// Binary Heap is used to implement Priority Queue in Discrete event simulation
// Binary Heap is used to implement Priority Queue in Bandwidth management
// Binary Heap is used to implement Priority Queue in CPU scheduling
// Binary Heap is used to implement Priority Queue in Best First Search Algorithms
// Binary Heap is used to implement Priority Queue in Merge K sorted arrays
// Binary Heap is used to implement Priority Queue in Top K elements
// Binary Heap is used to implement Priority Queue in Job scheduling
// Binary Heap is used to implement Priority Queue in Data compression
// Binary Heap is used to implement Priority Queue in Disk Scheduling
// Binary Heap is used to implement Priority Queue in Rod cutting

// BST - Binary Search Tree
// insert, lookup, remove - O(log n)

class BinarySearchTree {
    constructor(){
        this.root = null;
    }

    insert(value){
        const newNode = new Node(value);
        if(!this.root){
            this.root = newNode;
            return this;
        }
        let currentNode = this.root;
        while(true){
            if(value < currentNode.value){
                if(!currentNode.left){
                    currentNode.left = newNode;
                    return this;
                }
                currentNode = currentNode.left;
            } else {
                if(!currentNode.right){
                    currentNode.right = newNode;
                    return this;
                }
                currentNode = currentNode.right;
            }
        }
    }

    contains(value){
        if(!this.root){
            return false;
        }
        let currentNode = this.root;
        while(currentNode){
            if(value < currentNode.value){
                currentNode = currentNode.left;
            } else if(value > currentNode.value){
                currentNode = currentNode.right;
            } else {
                return true;
            }
        }
        return false;
    }
}


var bst = new BinarySearchTree();
console.log(bst.insert(10));
console.log(bst.insert(5));
console.log(bst.insert(15));
console.log(bst.insert(7));
console.log(bst.contains(7));
