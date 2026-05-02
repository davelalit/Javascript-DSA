using System;
using System.Collections.Generic;

public class TrieNode
{
    public Dictionary<char, TrieNode> Children { get; } = new Dictionary<char, TrieNode>();
    public bool IsEnd { get; set; }
    public string Word { get; set; } // For Word Search II
}

public class Trie
{
    private readonly TrieNode root;

    public Trie()
    {
        root = new TrieNode();
    }

    public void Insert(string word)
    {
        var node = root;
        foreach (var ch in word)
        {
            if (!node.Children.ContainsKey(ch))
                node.Children[ch] = new TrieNode();
            node = node.Children[ch];
        }
        node.IsEnd = true;
    }

    public bool Search(string word)
    {
        var node = root;
        foreach (var ch in word)
        {
            if (!node.Children.ContainsKey(ch))
                return false;
            node = node.Children[ch];
        }
        return node.IsEnd;
    }

    public bool StartsWith(string prefix)
    {
        var node = root;
        foreach (var ch in prefix)
        {
            if (!node.Children.ContainsKey(ch))
                return false;
            node = node.Children[ch];
        }
        return true;
    }
}

public class WordDictionary
{
    private readonly TrieNode root;

    public WordDictionary()
    {
        root = new TrieNode();
    }

    public void AddWord(string word)
    {
        var node = root;
        foreach (var ch in word)
        {
            if (!node.Children.ContainsKey(ch))
                node.Children[ch] = new TrieNode();
            node = node.Children[ch];
        }
        node.IsEnd = true;
    }

    public bool Search(string word)
    {
        return Dfs(root, word, 0);
    }

    private bool Dfs(TrieNode node, string word, int index)
    {
        if (index == word.Length)
            return node.IsEnd;

        char ch = word[index];
        if (ch == '.')
        {
            foreach (var child in node.Children.Values)
            {
                if (Dfs(child, word, index + 1))
                    return true;
            }
            return false;
        }
        else
        {
            if (!node.Children.ContainsKey(ch))
                return false;
            return Dfs(node.Children[ch], word, index + 1);
        }
    }
}

public static class WordSearchII
{
    public static IList<string> FindWords(char[][] board, string[] words)
    {
        var root = new TrieNode();
        foreach (var word in words)
        {
            var node = root;
            foreach (var ch in word)
            {
                if (!node.Children.ContainsKey(ch))
                    node.Children[ch] = new TrieNode();
                node = node.Children[ch];
            }
            node.IsEnd = true;
            node.Word = word;
        }

        var result = new List<string>();
        int rows = board.Length;
        int cols = board[0].Length;

        void Dfs(int r, int c, TrieNode node)
        {
            if (r < 0 || c < 0 || r >= rows || c >= cols)
                return;

            char ch = board[r][c];
            if (ch == '#' || !node.Children.ContainsKey(ch))
                return;

            node = node.Children[ch];
            if (node.IsEnd)
            {
                result.Add(node.Word);
                node.IsEnd = false; // avoid duplicates
            }

            board[r][c] = '#'; // mark visited
            Dfs(r + 1, c, node);
            Dfs(r - 1, c, node);
            Dfs(r, c + 1, node);
            Dfs(r, c - 1, node);
            board[r][c] = ch; // restore
        }

        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                Dfs(r, c, root);
            }
        }

        return result;
    }
}

public static class Program
{
    static void Main()
    {
        var trie = new Trie();
        trie.Insert("apple");
        Console.WriteLine(trie.Search("apple")); // true
        Console.WriteLine(trie.Search("app")); // false
        Console.WriteLine(trie.StartsWith("app")); // true
        trie.Insert("app");
        Console.WriteLine(trie.Search("app")); // true

        Console.WriteLine("------------------------------------------------------------");

        var wordDict = new WordDictionary();
        wordDict.AddWord("bad");
        wordDict.AddWord("dad");
        wordDict.AddWord("mad");
        Console.WriteLine(wordDict.Search("pad")); // false
        Console.WriteLine(wordDict.Search("bad")); // true
        Console.WriteLine(wordDict.Search(".ad")); // true
        Console.WriteLine(wordDict.Search("b..")); // true    

        Console.WriteLine("------------------------------------------------------------");

        var board = new Char[][] {
            new Char[] {'o','a','a','n'},
            new Char[] {'e','t','a','e'},
            new Char[] {'i','h','k','r'},
            new Char[] {'i','f','l','v'}
        };
        var words = new String[] { "oath", "pea", "eat", "rain" };
        var foundWords = WordSearchII.FindWords(board, words);
        foreach (var w in foundWords)
            Console.WriteLine(w);
    }
}

// Example usage:
// var trie = new Trie();
// trie.Insert("apple");
// Console.WriteLine(trie.Search("apple")); // true
// Console.WriteLine(trie.Search("app")); // false
// Console.WriteLine(trie.StartsWith("app")); // true
// trie.Insert("app");
// Console.WriteLine(trie.Search("app")); // true

// var wordDict = new WordDictionary();
// wordDict.AddWord("bad");
// wordDict.AddWord("dad");
// wordDict.AddWord("mad");
// Console.WriteLine(wordDict.Search("pad")); // false
// Console.WriteLine(wordDict.Search("bad")); // true
// Console.WriteLine(wordDict.Search(".ad")); // true
// Console.WriteLine(wordDict.Search("b..")); // true

// char[][] board = new char[][] {
//     new char[] {'o','a','a','n'},
//     new char[] {'e','t','a','e'},
//     new char[] {'i','h','k','r'},
//     new char[] {'i','f','l','v'}
// };
// string[] words = new string[] {"oath","pea","eat","rain"};
// var foundWords = WordSearchII.FindWords(board, words);
// foreach (var w in foundWords)
//     Console.WriteLine(w);