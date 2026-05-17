using System;
using System.Collections.Generic;
using System.Linq;

public class Solutions
{
    // Maximum Subarray
    public static int MaxSubArray(int[] nums)
    {
        int maxSum = nums[0], currSum = nums[0];
        for (int i = 1; i < nums.Length; i++)
        {
            currSum = Math.Max(nums[i], currSum + nums[i]);
            maxSum = Math.Max(maxSum, currSum);
        }
        return maxSum;
    }

    // Jump Game
    public static bool CanJump(int[] nums)
    {
        int maxReach = 0;
        for (int i = 0; i < nums.Length; i++)
        {
            if (i > maxReach) return false;
            maxReach = Math.Max(maxReach, i + nums[i]);
        }
        return true;
    }

    // Jump Game II
    public static int Jump(int[] nums)
    {
        int jumps = 0, currEnd = 0, currFarthest = 0;
        for (int i = 0; i < nums.Length - 1; i++)
        {
            currFarthest = Math.Max(currFarthest, i + nums[i]);
            if (i == currEnd)
            {
                jumps++;
                currEnd = currFarthest;
            }
        }
        return jumps;
    }

    // Gas Station
    public static int CanCompleteCircuit(int[] gas, int[] cost)
    {
        int total = 0, tank = 0, start = 0;
        for (int i = 0; i < gas.Length; i++)
        {
            total += gas[i] - cost[i];
            tank += gas[i] - cost[i];
            if (tank < 0)
            {
                start = i + 1;
                tank = 0;
            }
        }
        return total >= 0 ? start : -1;
    }

    // Hand of Straights
    public static bool IsNStraightHand(int[] hand, int groupSize)
    {
        if (hand.Length % groupSize != 0) return false;
        Array.Sort(hand);
        var count = new Dictionary<int, int>();
        foreach (var card in hand)
        {
            if (!count.ContainsKey(card)) count[card] = 0;
            count[card]++;
        }

        foreach (var card in hand)
        {
            if (count[card] > 0)
            {
                for (int i = 0; i < groupSize; i++)
                {
                    int curr = card + i;
                    if (!count.ContainsKey(curr) || count[curr] == 0) return false;
                    count[curr]--;
                }
            }
        }
        return true;
    }

    // Merge Triplets to Form Target Triplet
    public static bool MergeTriplets(int[][] triplets, int[] target)
    {
        bool[] good = new bool[3];
        foreach (var triplet in triplets)
        {
            int a = triplet[0], b = triplet[1], c = triplet[2];
            if (a <= target[0] && b <= target[1] && c <= target[2])
            {
                if (a == target[0]) good[0] = true;
                if (b == target[1]) good[1] = true;
                if (c == target[2]) good[2] = true;
            }
        }
        return good.All(x => x);
    }

    // Partition Labels
    public static IList<int> PartitionLabels(string s)
    {
        var last = new Dictionary<char, int>();
        for (int i = 0; i < s.Length; i++)
        {
            last[s[i]] = i;
        }

        var res = new List<int>();
        int start = 0, end = 0;
        for (int i = 0; i < s.Length; i++)
        {
            end = Math.Max(end, last[s[i]]);
            if (i == end)
            {
                res.Add(end - start + 1);
                start = i + 1;
            }
        }
        return res;
    }

    /// <summary>
    /// Determines whether the given string containing '(', ')', and '*'
    /// can be interpreted as a valid parentheses sequence.
    /// </summary>
    /// <param name="input">The string to validate.</param>
    /// <returns>True if the string can be balanced; otherwise, false.</returns>
    public static bool CheckValidString(string input)
    {
        int minOpen = 0; // Minimum possible number of '(' that are not closed yet
        int maxOpen = 0; // Maximum possible number of '(' that are not closed yet

        foreach (char ch in input)
        {
            switch (ch)
            {
                case '(':
                    minOpen++;
                    maxOpen++;
                    break;
                case ')':
                    minOpen--;
                    maxOpen--;
                    break;
                case '*':
                    // '*' can be '(', ')' or empty
                    minOpen--;   // treat as ')'
                    maxOpen++;   // treat as '('
                    break;
                default:
                    // Ignore any other characters (optional handling)
                    break;
            }

            // If maxOpen drops below zero, there are too many ')'
            if (maxOpen < 0)
                return false;

            // minOpen cannot be negative; clamp to zero
            if (minOpen < 0)
                minOpen = 0;
        }

        // Valid if we can close all '(' (i.e., minOpen == 0)
        return minOpen == 0;
    }

    // Example usage with Console.WriteLine
    public static void Main()
    {
        Console.WriteLine(MaxSubArray(new int[] { -2, 1, -3, 4, -1, 2, 1, -5, 4 })); // 6

        Console.WriteLine(CanJump(new int[] { 2, 3, 1, 1, 4 })); // True
        Console.WriteLine(CanJump(new int[] { 3, 2, 1, 0, 4 })); // False

        Console.WriteLine(Jump(new int[] { 2, 3, 1, 1, 4 })); // 2
        Console.WriteLine(Jump(new int[] { 2, 3, 0, 1, 4 })); // 2

        Console.WriteLine(CanCompleteCircuit(new int[] { 1, 2, 3, 4, 5 }, new int[] { 3, 4, 5, 1, 2 })); // 3
        Console.WriteLine(CanCompleteCircuit(new int[] { 2, 3, 4 }, new int[] { 3, 4, 3 })); // -1

        Console.WriteLine(IsNStraightHand(new int[] { 1, 2, 3, 6, 2, 3, 4, 7, 8 }, 3)); // True
        Console.WriteLine(IsNStraightHand(new int[] { 1, 2, 3, 4 }, 3)); // False

        Console.WriteLine(MergeTriplets(new int[][] { new int[] { 2, 5, 3 }, new int[] { 1, 8, 4 }, new int[] { 1, 7, 5 } }, new int[] { 2, 7, 5 })); // True
        Console.WriteLine(MergeTriplets(new int[][] { new int[] { 1, 3, 4 }, new int[] { 2, 5, 8 } }, new int[] { 2, 5, 8 })); // False

        var partitions = PartitionLabels("ababcbacadefegdehijhklij");
        Console.WriteLine(string.Join(",", partitions)); // 9,7,8

        Console.WriteLine(CheckValidString("()"));      // True
        Console.WriteLine(CheckValidString("(*)"));    // True
        Console.WriteLine(CheckValidString("(*))"));   // True
    }
}