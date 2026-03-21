/*
📝 Explanation of Features
• 	Variables in Java → Instance vs static variables.
• 	Data types → , , , , .
• 	Literals → Numeric, character, boolean, string.
• 	Type conversion → Widening (automatic), narrowing (explicit cast).
• 	Operators → Assignment (), relational (), logical ().
• 	Control flow → , , ternary, .
• 	Loops → , , , enhanced .
• 	Arrays → Creation, iteration, enhanced for loop.
• 	Class and Object →  class with constructor and method.
• 	Theory →
• 	JDK (Java Development Kit) → Tools + compiler + JRE.
• 	JRE (Java Runtime Environment) → Libraries + JVM.
• 	JVM (Java Virtual Machine) → Executes bytecode.
*/
// package demo;

public class BasicsDemo {

    // Variables in Java
    int instanceVar = 10;          // instance variable
    static int staticVar = 20;     // static variable

    public static void main(String[] args) {
        // Data types and Literals
        int num = 100;             // integer literal
        double pi = 3.14;          // double literal
        char grade = 'A';          // char literal
        boolean flag = true;       // boolean literal
        String text = "Hello";     // string literal

        // Type conversion (widening and narrowing)
        double widened = num;      // int → double (widening)
        int narrowed = (int) pi;   // double → int (narrowing)

        // Assignment Operators
        int a = 5;
        a += 3; // same as a = a + 3
        System.out.println("Assignment result: " + a);

        // Relational Operators
        System.out.println("Relational: " + (a > 5));

        // Logical Operators
        System.out.println("Logical: " + (a > 5 && flag));

        // If Else
        if (a > 5) {
            System.out.println("a is greater than 5");
        } else {
            System.out.println("a is not greater than 5");
        }

        // If Else If
        int score = 85;
        if (score >= 90) {
            System.out.println("Grade A");
        } else if (score >= 75) {
            System.out.println("Grade B");
        } else {
            System.out.println("Grade C");
        }

        // Ternary Operator
        String result = (score >= 50) ? "Pass" : "Fail";
        System.out.println("Ternary result: " + result);

        // Switch Statement
        int day = 3;
        switch (day) {
            case 1: System.out.println("Monday"); break;
            case 2: System.out.println("Tuesday"); break;
            case 3: System.out.println("Wednesday"); break;
            default: System.out.println("Other day");
        }

        // Need for Loop: repetitive tasks
        // For Loop
        System.out.println("For Loop:");
        for (int i = 0; i < 5; i++) {
            System.out.println(i);
        }

        // While Loop
        System.out.println("While Loop:");
        int i = 0;
        while (i < 3) {
            System.out.println(i);
            i++;
        }

        // Do While Loop
        System.out.println("Do While Loop:");
        int j = 0;
        do {
            System.out.println(j);
            j++;
        } while (j < 2);

        // Which Loop to Use:
        // - For loop: known iterations
        // - While loop: condition-based
        // - Do-while: run at least once

        // Arrays
        int[] arr = new int[3]; // Creation of Array
        arr[0] = 10; arr[1] = 20; arr[2] = 30;

        System.out.println("Array elements:");
        for (int val : arr) { // Enhanced for loop
            System.out.println(val);
        }

        // Class and Object Practical
        Student s1 = new Student("Alice", 21);
        s1.display();

        Student s2 = new Student("Bob", 22);
        s2.display();
    }
}

// Class and Object Theory + Practical
class Student {
    String name;
    int age;

    // Constructor
    Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    void display() {
        System.out.println("Student: " + name + ", Age: " + age);
    }
}