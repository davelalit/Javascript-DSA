/*
📝 Explanation of Features
• 	String → Immutable ( objects cannot be changed).
• 	Mutable vs Immutable →  and  are mutable.
• 	Static variable → Shared across all objects ().
• 	Static block → Executes once when class loads.
• 	Static method → Can be called without an object ().
• 	Encapsulation → Private fields with getters/setters.
• 	 keyword → Refers to current object, used in constructors and methods.
• 	Constructor → Default and parameterized constructors shown.
• 	Default vs Parameterized Constructor →  vs .
• 	Anonymous Object →  used without storing reference.

 */
// Package declaration (organizes classes)
package demo;

public class FeatureDemo2 {

    // Static variable
    static int objectCount;

    // Static block (runs once when class loads)
    static {
        objectCount = 0;
        System.out.println("Static block executed. Object count initialized.");
    }

    // Instance variables (encapsulation with private)
    private String name;
    private int age;

    // Default constructor
    public FeatureDemo() {
        this("Unknown", 0); // calls parameterized constructor using 'this'
    }

    // Parameterized constructor
    public FeatureDemo(String name, int age) {
        this.name = name;
        this.age = age;
        objectCount++;
    }

    // Getters and Setters (Encapsulation)
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    // Static method
    public static int getObjectCount() {
        return objectCount;
    }

    // Demonstrating String concepts
    public static void stringDemo() {
        // Immutable String
        String s1 = "Hello";
        s1.concat(" World"); // does not change original
        System.out.println("Immutable String: " + s1);

        // Mutable StringBuffer
        StringBuffer sb = new StringBuffer("Hello");
        sb.append(" World"); // modifies original
        System.out.println("StringBuffer (mutable): " + sb);

        // Mutable StringBuilder
        StringBuilder sb2 = new StringBuilder("Hello");
        sb2.append(" Java");
        System.out.println("StringBuilder (mutable): " + sb2);
    }

    public static void main(String[] args) {
        // Anonymous object (created and used immediately)
        new FeatureDemo("Anonymous", 99).display();

        // Using constructors
        FeatureDemo obj1 = new FeatureDemo();
        FeatureDemo obj2 = new FeatureDemo("Alice", 25);

        obj1.display();
        obj2.display();

        // Encapsulation via getters/setters
        obj1.setName("Bob");
        obj1.setAge(30);
        System.out.println("Updated obj1: " + obj1.getName() + ", " + obj1.getAge());

        // Static method and variable
        System.out.println("Total objects created: " + FeatureDemo.getObjectCount());

        // String demo
        stringDemo();
    }

    // Instance method using 'this'
    public void display() {
        System.out.println("Name: " + this.name + ", Age: " + this.age);
    }
}