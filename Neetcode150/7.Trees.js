//  Invert Binary Tree
// Recursively swap left and right children. Time: O(n).

var invertTree = function(root) {
    if (!root) return null;
    [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
    return root;
};
console.log(invertTree({val: 4, left: {val: 2, left: {val: 1}, right: {val: 3}}, right: {val: 7, left: {val: 6}, right: {val: 9}}})); // {val: 4, left: {val: 7, left: {val: 9}, right: {val: 6}}, right: {val: 2, left: {val: 3}, right: {val: 1}}}


// Maximum Depth of Binary Tree
// DFS recursion: depth = 1 + max(left, right). Time: O(n).
var maxDepth = function(root) {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};
console.log(maxDepth({val: 3, left: {val: 9}, right: {val: 20, left: {val: 15}, right: {val: 7}}})); // 3

// Diameter of Binary Tree
// Track longest path through each node (left depth + right depth). Time: O(n).

var diameterOfBinaryTree = function(root) {
    let diameter = 0;
    const depth = (node) => {
        if (!node) return 0;
        let left = depth(node.left);
        let right = depth(node.right);
        diameter = Math.max(diameter, left + right);
        return 1 + Math.max(left, right);
    };
    depth(root);
    return diameter;
};
console.log(diameterOfBinaryTree({val: 1, left: {val: 2, left: {val: 4}, right: {val: 5}}, right: {val: 3}})); // 3

// Balanced Binary Tree
// Check subtree heights recursively. If imbalance > 1, return false. Time: O(n).
var isBalanced = function(root) {
    const check = (node) => {
        if (!node) return 0;
        let left = check(node.left);
        if (left === -1) return -1;
        let right = check(node.right);
        if (right === -1) return -1;
        if (Math.abs(left - right) > 1) return -1;
        return 1 + Math.max(left, right);
    };
    return check(root) !== -1;
};
console.log(isBalanced({val: 3, left: {val: 9}, right: {val: 20, left: {val: 15}, right: {val: 7}}})); // true
console.log(isBalanced({val: 1, left: {val: 2, left: {val: 3}, right: {val: 4}}, right: {val: 5}})); // false

// Same Tree
// Recursively compare nodes and children. Time: O(n).
var isSameTree = function(p, q) {
    if (!p && !q) return true;
    if (!p || !q || p.val !== q.val) return false;
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};
console.log(isSameTree({val: 1, left: {val: 2}, right: {val: 3}}, {val: 1, left: {val: 2}, right: {val: 3}})); // true
console.log(isSameTree({val: 1, left: {val: 2}}, {val: 1, right: {val: 2}})); // false

// Subtree of Another Tree
// Check if subRoot matches root or any subtree. Time: O(n * m).
var isSubtree = function(root, subRoot) {
    if (!root) return false;
    if (isSameTree(root, subRoot)) return true;
    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
};
console.log(isSubtree({val: 3, left: {val: 4, left: {val: 1}, right: {val: 2}}, right: {val: 5}}, {val: 4, left: {val: 1}, right: {val: 2}})); // true

// Lowest Common Ancestor of a BST
// BST property: if both values smaller, go left; if larger, go right; else root is LCA. Time: O(h).

var lowestCommonAncestor = function(root, p, q) {
    while (root) {
        if (p.val < root.val && q.val < root.val) root = root.left;
        else if (p.val > root.val && q.val > root.val) root = root.right;
        else return root;
    }
};
console.log(lowestCommonAncestor({val: 6, left: {val: 2, left: {val: 0}, right: {val: 4, left: {val: 3}, right: {val: 5}}}, right: {val: 8, left: {val: 7}, right: {val: 9}}}, {val: 2}, {val: 8})); // {val: 6}
console.log(lowestCommonAncestor({val: 6, left: {val: 2, left: {val: 0}, right: {val: 4, left: {val: 3}, right: {val: 5}}}, right: {val: 8, left: {val: 7}, right: {val: 9}}}, {val: 2}, {val: 4})); // {val: 2}

// Binary Tree Level Order Traversal
// BFS using a queue. Collect nodes level by level. Time: O(n).
var levelOrder = function(root) {
    if (!root) return [];
    const res = [], queue = [root];
    while (queue.length) {
        let size = queue.length, level = [];
        for (let i = 0; i < size; i++) {
            let node = queue.shift();
            level.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        res.push(level);
    }
    return res;
};
console.log(levelOrder({val: 3, left: {val: 9}, right: {val: 20, left: {val: 15}, right: {val: 7}}})); // [[3], [9, 20], [15, 7]]

// Binary Tree Right Side View
// BFS: record the last node at each level. Time: O(n).
var rightSideView = function(root) {
    if (!root) return [];
    const res = [], queue = [root];
    while (queue.length) {
        let size = queue.length;
        for (let i = 0; i < size; i++) {
            let node = queue.shift();
            if (i === size - 1) res.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    return res;
};
console.log(rightSideView({val: 1, left: {val: 2, right: {val: 5}}, right: {val: 3}})); // [1, 3, 5]

// Count Good Nodes in Binary Tree
// DFS: a node is "good" if its value ≥ max seen so far. Time: O(n).
var goodNodes = function(root) {
    let count = 0;
    const dfs = (node, maxVal) => {
        if (!node) return;
        if (node.val >= maxVal) {
            count++;
            maxVal = node.val;
        }
        dfs(node.left, maxVal);
        dfs(node.right, maxVal);
    };
    dfs(root, root.val);
    return count;
};
console.log(goodNodes({val: 3, left: {val: 1, left: {val: 3}}, right: {val: 4, right: {val: 5}}})); // 4

// Validate Binary Search Tree
// Check each node lies within valid range. Time: O(n).
var isValidBST = function(root) {
    const validate = (node, min, max) => {
        if (!node) return true;
        if (node.val <= min || node.val >= max) return false;
        return validate(node.left, min, node.val) && validate(node.right, node.val, max);
    };
    return validate(root, -Infinity, Infinity);
};
console.log(isValidBST({val: 2, left: {val: 1}, right: {val: 3}})); // true
console.log(isValidBST({val: 5, left: {val: 1}, right: {val: 4, left: {val: 3}, right: {val: 6}}})); // false

// Kth Smallest Element in a BST
// In-order traversal yields sorted order. Return kth element. Time: O(h + k).
var kthSmallest = function(root, k) {
    const stack = [];
    while (true) {
        while (root) {
            stack.push(root);
            root = root.left;
        }
        root = stack.pop();
        if (--k === 0) return root.val;
        root = root.right;
    }
};
console.log(kthSmallest({val: 3, left: {val: 1}, right: {val: 4}}, 1)); // 1

// Construct Binary Tree from Preorder and Inorder Traversal
// Use preorder to pick root, inorder to split left/right subtrees. Time: O(n).
var buildTree = function(preorder, inorder) {
    const map = new Map();
    inorder.forEach((val, i) => map.set(val, i));
    let preIndex = 0;
    const helper = (left, right) => {
        if (left > right) return null;
        let rootVal = preorder[preIndex++];
        let root = new TreeNode(rootVal);
        root.left = helper(left, map.get(rootVal) - 1);
        root.right = helper(map.get(rootVal) + 1, right);
        return root;
    };
    return helper(0, inorder.length - 1);
};
console.log(buildTree([3,9,20,15,7], [9,3,15,20,7])); // {val: 3, left: {val: 9}, right: {val: 20, left: {val: 15}, right: {val: 7}}}

// Binary Tree Maximum Path Sum
// DFS: compute max gain from left/right. Update global max path sum. Time: O(n).
var maxPathSum = function(root) {
    let maxSum = -Infinity;
    const dfs = (node) => {
        if (!node) return 0;
        let left = Math.max(dfs(node.left), 0);
        let right = Math.max(dfs(node.right), 0);
        maxSum = Math.max(maxSum, node.val + left + right);
        return node.val + Math.max(left, right);
    };
    dfs(root);
    return maxSum;
};
console.log(maxPathSum({val: -10, left: {val: 9}, right: {val: 20, left: {val: 15}, right: {val: 7}}})); // 42


// Serialize and Deserialize Binary Tree
// Preorder traversal with null markers for serialization. Rebuild tree recursively during deserialization. Time: O(n).
class Codec {
    serialize(root) {
        const res = [];
        const dfs = (node) => {
            if (!node) {
                res.push('null');
                return;
            }
            res.push(node.val.toString());
            dfs(node.left);
            dfs(node.right);
        };
        dfs(root);
        return res.join(',');
    }
    deserialize(data) {
        const vals = data.split(',');
        let i = 0;
        const dfs = () => {
            if (vals[i] === 'null') {
                i++;
                return null;
            }
            let node = new TreeNode(Number(vals[i++]));
            node.left = dfs();
            node.right = dfs();
            return node;
        };
        return dfs();
    }
}
const codec = new Codec();
const tree = {val: 1, left: {val: 2}, right: {val: 3, left: {val: 4}, right: {val: 5}}};
const serialized = codec.serialize(tree);
console.log(serialized); // "1,2,null,null,3,4,null,null,5,null,null"
const deserialized = codec.deserialize(serialized);
console.log(deserialized); // {val: 1, left: {val: 2}, right: {val: 3, left: {val: 4}, right: {val: 5}}}