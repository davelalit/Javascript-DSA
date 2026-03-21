/*
 Key Concepts to Cover
- What is an Exception
- An event that disrupts normal program flow (e.g., invalid input, file not found).
- Exception Handling using try-catch
- Multiple catch blocks
- Exception Hierarchy
- throw keyword
- Custom Exception
- Ducking Exception using throws
- User Input using BufferedReader and Scanner
- try-with-resources

📝 Explanation
• 	 → Handles exceptions gracefully.
• 	Multiple  → Different exceptions handled separately.
• 	Hierarchy → Catching parent () can handle child exceptions.
• 	 keyword → Used to explicitly throw exceptions.
• 	Custom Exception →  shows how to define your own.
• 	 keyword → Used in method signature to "duck" responsibility.
• 	BufferedReader & Scanner → Two ways to take user input.
• 	 → Auto-closes resources like  or .
 */
import java.io.*;  
import java.util.*;

// Custom Exception
class InvalidAgeException extends Exception {
    public InvalidAgeException(String message) {
        super(message);
    }
}

public class ExceptionDemo {

    // Method demonstrating ducking exception using throws
    static void readFile(String fileName) throws IOException {
        // try-with-resources ensures file is closed automatically
        try (BufferedReader br = new BufferedReader(new FileReader(fileName))) {
            System.out.println("File content: " + br.readLine());
        }
    }

    public static void main(String[] args) {
        // Example 1: Basic try-catch
        try {
            int result = 10 / 0; // ArithmeticException
        } catch (ArithmeticException e) {
            System.out.println("Caught ArithmeticException: " + e.getMessage());
        }

        // Example 2: Multiple catch blocks
        try {
            String text = null;
            System.out.println(text.length()); // NullPointerException
        } catch (NullPointerException e) {
            System.out.println("Caught NullPointerException");
        } catch (Exception e) {
            System.out.println("Caught generic Exception");
        }

        // Example 3: Exception hierarchy
        try {
            int[] arr = new int[2];
            System.out.println(arr[5]); // ArrayIndexOutOfBoundsException
        } catch (RuntimeException e) { // Parent class of many exceptions
            System.out.println("Caught RuntimeException (Hierarchy demo)");
        }

        // Example 4: throw keyword + custom exception
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter your age: ");
        int age = sc.nextInt();
        try {
            if (age < 18) {
                throw new InvalidAgeException("Age must be 18 or above!");
            } else {
                System.out.println("Valid age entered: " + age);
            }
        } catch (InvalidAgeException e) {
            System.out.println("Custom Exception caught: " + e.getMessage());
        }

        // Example 5: Ducking exception using throws
        try {
            readFile("sample.txt"); // may throw IOException
        } catch (IOException e) {
            System.out.println("IOException handled in main: " + e.getMessage());
        }

        // Example 6: User input using BufferedReader
        try (BufferedReader br = new BufferedReader(new InputStreamReader(System.in))) {
            System.out.print("Enter your name: ");
            String name = br.readLine();
            System.out.println("Hello, " + name);
        } catch (IOException e) {
            System.out.println("Error reading input: " + e.getMessage());
        }

        sc.close();
    }
}