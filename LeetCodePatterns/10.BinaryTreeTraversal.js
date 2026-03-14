/** Binary Tree Traversal Patterns
 * This file contains various binary tree traversal patterns and their implementations.
 * Common problems solved using these patterns include:
 * 94. Binary Tree Inorder Traversal
 * 144. Binary Tree Preorder Traversal
 * 145. Binary Tree Postorder Traversal
 * 102. Binary Tree Level Order Traversal
 * 107. Binary Tree Level Order Traversal II
 * 111. Minimum Depth of Binary Tree
 * 104. Maximum Depth of Binary Tree  
 * 257. Binary Tree Paths
 * 230. Kth Smallest Element in a BST
 * 124. Binary Tree Maximum Path Sum
 */

/* 94. Binary Tree Inorder Traversal
    * Given a binary tree, return the inorder traversal of its nodes' values.
    * Example: Input: root = [1,null,2,3], Output: [1,3,2]
    */
function inorderTraversal(root) {
    const result = [];
    function traverse(node) {
        if (!node) return;
        traverse(node.left);
        result.push(node.val);
        traverse(node.right);
    }
    traverse(root);
    return result;
}
/* 144. Binary Tree Preorder Traversal
    * Given a binary tree, return the preorder traversal of its nodes' values.
    * Example: Input: root = [1,null,2,3], Output: [1,2,3]
    */
function preorderTraversal(root) {
    const result = [];
    function traverse(node) {
        if (!node) return;
        result.push(node.val);
        traverse(node.left);
        traverse(node.right);
    }
    traverse(root);
    return result;
}
/* 145. Binary Tree Postorder Traversal
    * Given a binary tree, return the postorder traversal of its nodes' values.
    * Example: Input: root = [1,null,2,3], Output: [3,2,1]
    */
function postorderTraversal(root) {
    const result = [];
    function traverse(node) {
        if (!node) return;
        traverse(node.left);
        traverse(node.right);
        result.push(node.val);
    }
    traverse(root);
    return result;
}
/* 102. Binary Tree Level Order Traversal
    * Given a binary tree, return the level order traversal of its nodes' values.
    * Example: Input: root = [3,9,20,null,null,15,7], Output: [[3],[9,20],[15,7]]
    */
function levelOrderTraversal(root) {
    if (!root) return [];
    const result = [];
    const queue = [root];
    
    while (queue.length) {
        const levelSize = queue.length;
        const currentLevel = [];
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.push(currentLevel);
    }
    
    return result;
}
/* 107. Binary Tree Level Order Traversal II
    * Given a binary tree, return the level order traversal of its nodes' values in reverse order.
    * Example: Input: root = [3,9,20,null,null,15,7], Output: [[15,7],[9,20],[3]]
    */
function levelOrderTraversalBottomUp(root) {
    if (!root) return [];
    const result = [];
    const queue = [root];
    
    while (queue.length) {
        const levelSize = queue.length;
        const currentLevel = [];
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.unshift(currentLevel); // Add current level at the beginning
    }
    
    return result;
}
/* 111. Minimum Depth of Binary Tree
    * Given a binary tree, find its minimum depth.
    * The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.
    * Example: Input: root = [3,9,20,null,null,15,7], Output: 2
    */
function minDepth(root) {
    if (!root) return 0;
    if (!root.left && !root.right) return 1; // Leaf node
    
    const leftDepth = root.left ? minDepth(root.left) : Infinity;
    const rightDepth = root.right ? minDepth(root.right) : Infinity;
    
    return Math.min(leftDepth, rightDepth) + 1;
}
/* 104. Maximum Depth of Binary Tree
    * Given a binary tree, find its maximum depth.
    * The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
    * Example: Input: root = [3,9,20,null,null,15,7], Output: 3
    */
function maxDepth(root) {
    if (!root) return 0;
    
    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);
    
    return Math.max(leftDepth, rightDepth) + 1;
}
/** 257. Binary Tree Paths
 * Given a binary tree, return all root-to-leaf paths.
 * Example: Input: root = [1,2,3,null,5], Output: ["1->2->5","1->3"]
 */
function binaryTreePaths(root) {
    const paths = [];
    
    function findPaths(node, currentPath) {
        if (!node) return;
        
        currentPath += node.val;
        
        // If it's a leaf node, add the path to the result
        if (!node.left && !node.right) {
            paths.push(currentPath);
        } else {
            currentPath += '->'; // Add separator for non-leaf nodes
            findPaths(node.left, currentPath);
            findPaths(node.right, currentPath);
        }
    }
    
    findPaths(root, '');
    return paths;
}
/** 230. Kth Smallest Element in a BST
 * Given a binary search tree, find the kth smallest element in it.
 * Example: Input: root = [3,1,4,null,2], k = 1, Output: 1
 */
function kthSmallest(root, k) {
    const stack = [];
    let current = root;
    let count = 0;
    
    while (stack.length || current) {
        while (current) {
            stack.push(current);
            current = current.left; // Go to the leftmost node
        }
        
        current = stack.pop();
        count++;
        
        if (count === k) return current.val; // Found the kth smallest element
        
        current = current.right; // Move to the right subtree
    }
    
    return null; // If k is out of bounds
}
/** 124. Binary Tree Maximum Path Sum
 * Given a non-empty binary tree, find the maximum path sum.
 * The path may start and end at any node in the tree.
 * Example: Input: root = [1,2,3], Output: 6
 */ 
function maxPathSum(root) {
    let maxSum = -Infinity; // Initialize to the lowest possible value
    
    function helper(node) {
        if (!node) return 0; // Base case: if node is null, return 0
        
        // Recursively find the maximum path sum for left and right subtrees
        const leftMax = Math.max(helper(node.left), 0); // Ignore negative sums
        const rightMax = Math.max(helper(node.right), 0);
        
        // Calculate the maximum path sum including the current node
        const currentMax = node.val + leftMax + rightMax;
        
        // Update the global maximum path sum
        maxSum = Math.max(maxSum, currentMax);
        
        // Return the maximum path sum that can be extended to the parent node
        return node.val + Math.max(leftMax, rightMax);
    }
    
    helper(root);
    return maxSum;
}
/** 98. Validate Binary Search Tree
 * Given a binary tree, determine if it is a valid binary search tree (BST).
 * A valid BST is defined as follows:
 * - The left subtree of a node contains only nodes with keys less than the node's key.
 * - The right subtree of a node contains only nodes with keys greater than the node's key
 * - Both the left and right subtrees must also be binary search trees.
 * Example: Input: root = [2,1,3], Output: true
 * */
function isValidBST(root) {
    function validate(node, low = -Infinity, high = Infinity) {
        if (!node) return true; // An empty tree is a valid BST
        
        // Check the current node's value against the bounds
        if (node.val <= low || node.val >= high) return false;
        
        // Recursively validate the left and right subtrees with updated bounds
        return validate(node.left, low, node.val) && validate(node.right, node.val, high);
    }
    
    return validate(root);
}
/** 105. Construct Binary Tree from Preorder and Inorder Traversal
 * Given preorder and inorder traversal of a tree, construct the binary tree.
 * Example: Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7], Output: [3,9,20,null,null,15,7]
 */
function buildTree(preorder, inorder) {
    if (!preorder.length || !inorder.length) return null;
    
    const rootValue = preorder[0];
    const root = { val: rootValue, left: null, right: null };
    
    const rootIndexInInorder = inorder.indexOf(rootValue);
    
    // Elements to the left of the root in inorder are part of the left subtree
    const leftInorder = inorder.slice(0, rootIndexInInorder);
    // Elements to the right of the root in inorder are part of the right subtree
    const rightInorder = inorder.slice(rootIndexInInorder + 1);
    
    // Corresponding elements in preorder for left and right subtrees
    const leftPreorder = preorder.slice(1, 1 + leftInorder.length);
    const rightPreorder = preorder.slice(1 + leftInorder.length);
    
    // Recursively build the left and right subtrees
    root.left = buildTree(leftPreorder, leftInorder);
    root.right = buildTree(rightPreorder, rightInorder);
    
    return root;
}
/** 106. Construct Binary Tree from Inorder and Postorder Traversal
 * Given inorder and postorder traversal of a tree, construct the binary tree.
 * Example: Input: inorder = [9,3,15,20,7], postorder = [9,15,7,20,3], Output: [3,9,20,null,null,15,7]
 * */
function buildTreeFromInorderPostorder(inorder, postorder) {
    if (!inorder.length || !postorder.length) return null;
    
    const rootValue = postorder[postorder.length - 1];
    const root = { val: rootValue, left: null, right: null };
    
    const rootIndexInInorder = inorder.indexOf(rootValue);
    
    // Elements to the left of the root in inorder are part of the left subtree
    const leftInorder = inorder.slice(0, rootIndexInInorder);
    // Elements to the right of the root in inorder are part of the right subtree
    const rightInorder = inorder.slice(rootIndexInInorder + 1);
    
    // Corresponding elements in postorder for left and right subtrees
    const leftPostorder = postorder.slice(0, leftInorder.length);
    const rightPostorder = postorder.slice(leftInorder.length, postorder.length - 1);
    
    // Recursively build the left and right subtrees
    root.left = buildTreeFromInorderPostorder(leftInorder, leftPostorder);
    root.right = buildTreeFromInorderPostorder(rightInorder, rightPostorder);
    
    return root;
}
/** 98. Validate Binary Search Tree
 * Given a binary tree, determine if it is a valid binary search tree (BST).
 * A valid BST is defined as follows:
 * - The left subtree of a node contains only nodes with keys less than the node's key.
 * - The right subtree of a node contains only nodes with keys greater than the node's key
 * - Both the left and right subtrees must also be binary search trees.
 * Example: Input: root = [2,1,3], Output: true
 */
function isValidBST(root) {
    function validate(node, low = -Infinity, high = Infinity) {
        if (!node) return true; // An empty tree is a valid BST
        
        // Check the current node's value against the bounds
        if (node.val <= low || node.val >= high) return false;
        
        // Recursively validate the left and right subtrees with updated bounds
        return validate(node.left, low, node.val) && validate(node.right, node.val, high);
    }
    
    return validate(root);
}
