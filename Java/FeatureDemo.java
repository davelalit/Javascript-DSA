/*
📝 Explanation of Features
- this and super → this refers to current object, super calls parent constructor/method.
- Naming Convention → Classes start uppercase, variables/methods lowercase.
- Anonymous Object → new Person("Anonymous").display();
- Inheritance → Employee extends Person (single), Manager extends Employee (multilevel).
- Multiple Inheritance → Achieved via interfaces (Trainer).
- Method Overriding → display() overridden in child classes.
- Packages → package demo; organizes code.
- Access Modifiers → public, private, protected (shown implicitly).
- Polymorphism → Same reference type (Shape) points to different objects.
- Dynamic Method Dispatch → Calls overridden method at runtime.
- Final keyword → Prevents modification/inheritance (Constants).
- Object class methods → equals, toString, hashCode.
- Upcasting/Downcasting → Casting between parent and child references.
- Abstract keyword → Abstract class Vehicle.
- Inner class → Car.Engine.
- Anonymous Inner class → new Vehicle() { ... }.
- Abstract + Anonymous Inner class → Implement abstract method inline.

 */
// Package declaration (packages help organize classes)
// package demo;

// Naming convention: Class names start with uppercase, variables/methods lowercase
class Person {
    String name;

    // Constructor using 'this'
    Person(String name) {
        this.name = name; // 'this' refers to current object
    }

    void display() {
        System.out.println("Person name: " + this.name);
    }
}

// Inheritance: Single Inheritance
class Employee extends Person {
    int id;

    Employee(String name, int id) {
        super(name); // 'super' calls parent constructor
        this.id = id;
    }

    // Method overriding
    @Override
    void display() {
        System.out.println("Employee: " + name + ", ID: " + id);
    }
}

// Multilevel Inheritance
class Manager extends Employee {
    String department;

    Manager(String name, int id, String dept) {
        super(name, id);
        this.department = dept;
    }

    @Override
    void display() {
        System.out.println("Manager: " + name + ", Dept: " + department);
    }
}

// Multiple Inheritance via Interfaces
interface Trainer {
    void train();
}

class TechLead extends Manager implements Trainer {
    TechLead(String name, int id, String dept) {
        super(name, id, dept);
    }

    public void train() {
        System.out.println("TechLead trains the team.");
    }
}

// Polymorphism + Dynamic Method Dispatch
class Shape {
    void draw() { System.out.println("Drawing Shape"); }
}

class Circle extends Shape {
    void draw() { System.out.println("Drawing Circle"); }
}

class Square extends Shape {
    void draw() { System.out.println("Drawing Square"); }
}

// Final keyword
final class Constants {
    public static final double PI = 3.14159;
}

// Abstract class
abstract class Vehicle {
    abstract void run();
}

// Inner class
class Car extends Vehicle {
    @Override
    void run() { System.out.println("Car is running"); }

    class Engine {
        void start() { System.out.println("Engine started"); }
    }
}

public class FeatureDemo {
    public static void main(String[] args) {
        // Anonymous Object
        new Person("Anonymous").display();

        // Inheritance + super/this
        Employee e = new Employee("Alice", 101);
        e.display();

        Manager m = new Manager("Bob", 102, "HR");
        m.display();

        TechLead tl = new TechLead("Charlie", 103, "IT");
        tl.train();

        // Polymorphism + Dynamic Dispatch
        Shape s;
        s = new Circle();
        s.draw(); // Circle's draw
        s = new Square();
        s.draw(); // Square's draw

        // Final keyword usage
        System.out.println("PI constant: " + Constants.PI);

        // Object class methods
        Person p1 = new Person("David");
        Person p2 = new Person("David");
        System.out.println("Equals: " + p1.equals(p2)); // default compares references
        System.out.println("toString: " + p1.toString());
        System.out.println("HashCode: " + p1.hashCode());

        // Upcasting and Downcasting
        Shape shape = new Circle(); // Upcasting
        if (shape instanceof Circle) {
            Circle c = (Circle) shape; // Downcasting
            c.draw();
        }

        // Abstract + Inner class
        Car car = new Car();
        car.run();
        Car.Engine engine = car.new Engine();
        engine.start();

        // Anonymous Inner Class
        Vehicle bike = new Vehicle() {
            @Override
            void run() { System.out.println("Bike is running (Anonymous Inner Class)"); }
        };
        bike.run();
    }
}