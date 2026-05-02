// Implement Trie (Prefix Tree)
// Each node represents a character. insert builds paths, search checks full word existence, startsWith checks prefix existence

class TrieNode {
    constructor() {
        this.children = {};
        this.isEnd = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) node.children[char] = new TrieNode();
            node = node.children[char];
        }
        node.isEnd = true;
    }

    search(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) return false;
            node = node.children[char];
        }
        return node.isEnd;
    }

    startsWith(prefix) {
        let node = this.root;
        for (let char of prefix) {
            if (!node.children[char]) return false;
            node = node.children[char];
        }
        return true;
    }
}

const trie = new Trie();
trie.insert("apple");
console.log(trie.search("apple")); // true
console.log(trie.search("app")); // false
console.log(trie.startsWith("app")); // true
trie.insert("app");
console.log(trie.search("app")); // true


// Design Add and Search Words Data Structure
// Similar to Trie, but supports wildcard ".". Use DFS to explore all possible children when encountering ".".
// Trie + DFS for wildcard
class WordDictionary {
    constructor() {
        this.root = new TrieNode();
    }

    addWord(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) node.children[char] = new TrieNode();
            node = node.children[char];
        }
        node.isEnd = true;
    }

    search(word) {
        function dfs(node, i) {
            if (i === word.length) return node.isEnd;
            let char = word[i];
            if (char === ".") {
                for (let child in node.children) {
                    if (dfs(node.children[child], i + 1)) return true;
                }
                return false;
            } else {
                if (!node.children[char]) return false;
                return dfs(node.children[char], i + 1);
            }
        }
        return dfs(this.root, 0);
    }
}
const wordDict = new WordDictionary();
wordDict.addWord("bad");
wordDict.addWord("dad");
wordDict.addWord("mad");
console.log(wordDict.search("pad")); // false
console.log(wordDict.search("bad")); // true
console.log(wordDict.search(".ad")); // true
console.log(wordDict.search("b..")); // true    

// Word Search II
// Build a Trie of words. Then DFS on the board, following Trie paths. Mark visited cells with "#". Collect words when reaching isEnd.
// Trie + DFS backtracking on grid
function findWords(board, words) {
    let root = new TrieNode();
    for (let word of words) {
        let node = root;
        for (let char of word) {
            if (!node.children[char]) node.children[char] = new TrieNode();
            node = node.children[char];
        }
        node.isEnd = true;
        node.word = word; // store word at end node
    }

    let result = [];
    let rows = board.length, cols = board[0].length;

    function dfs(r, c, node) {
        if (r < 0 || c < 0 || r >= rows || c >= cols) return;
        let char = board[r][c];
        if (char === "#" || !node.children[char]) return;

        node = node.children[char];
        if (node.isEnd) {
            result.push(node.word);
            node.isEnd = false; // avoid duplicates
        }

        board[r][c] = "#"; // mark visited
        dfs(r + 1, c, node);
        dfs(r - 1, c, node);
        dfs(r, c + 1, node);
        dfs(r, c - 1, node);
        board[r][c] = char; // restore
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            dfs(r, c, root);
        }
    }

    return result;
}
console.log(findWords([["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], ["oath","pea","eat","rain"])); // ["oath", "eat"]
