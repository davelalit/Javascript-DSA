// If three consecutive characters are the same ("aaa" or "bbb"), you must replace characters so that no 3 consecutive characters are identical.
using System;
using System.Text;

public class ConsecutiveCharFixer
{
    public static string FixString(string input)
    {
        if (string.IsNullOrEmpty(input)) return input;

        var sb = new StringBuilder(input);
        for (int i = 2; i < sb.Length; i++)
        {
            // Check if three consecutive characters are the same
            if (sb[i] == sb[i - 1] && sb[i] == sb[i - 2])
            {
                // Replace the current character with a safe alternative
                sb[i] = GetReplacement(sb[i], i, sb);
            }
        }
        return sb.ToString();
    }

    private static char GetReplacement(char current, int index, StringBuilder sb)
    {
        // Candidate replacement characters
        char[] candidates = { 'a', 'b', 'c', 'x', 'y', 'z' };

        foreach (var candidate in candidates)
        {
            // Ensure replacement is not same as previous or next character
            if (candidate != current &&
                (index > 0 && candidate != sb[index - 1]) &&
                (index < sb.Length - 1 && candidate != sb[index + 1]))
            {
                return candidate;
            }
        }

        // Fallback: just flip case if alphabetic
        return char.IsLetter(current) ? 
               (char.IsUpper(current) ? char.ToLower(current) : char.ToUpper(current)) 
               : '*';
    }

    public static void Main()
    {
        string[] testCases = { "hellooo", "aaabbbccc", "password111", "xxxyyyzzz" };

        foreach (var test in testCases)
        {
            Console.WriteLine($"{test} → {FixString(test)}");
        }
    }
}
