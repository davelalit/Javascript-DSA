/*
📝 Explanation
- Interface → Defines a contract (Animal, Pet).
- More on Interfaces → Multiple inheritance via interfaces (Dog implements Animal, Pet).
- Need of Interface → Enables polymorphism across unrelated classes (Dog, Cat).
- Enum if/switch → Control flow with Day.
- Enum Class → Status has fields and methods.
- Annotation → @MyAnnotation applied to a method.
- Functional Interface → Calculator has one abstract method.
- Lambda Expression → (a, b) -> a + b and (a, b) -> { return a * b; }.
- Types of Interfaces → Normal, Functional, Marker.

 */
import java.util.*;

// 1. Basic Interface
interface Animal {
    void sound(); // abstract method
}

// 2. More on Interfaces: multiple inheritance via interfaces
interface Pet {
    void play();
}

// 3. Need of Interface: contract between unrelated classes
class Dog implements Animal, Pet {
    public void sound() {
        System.out.println("Dog barks!");
    }
    public void play() {
        System.out.println("Dog loves to play fetch!");
    }
}

class Cat implements Animal {
    public void sound() {
        System.out.println("Cat meows!");
    }
}

// 4. Enum with if and switch
enum Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}

// 5. Enum Class with fields and methods
enum Status {
    SUCCESS(200), ERROR(500), NOT_FOUND(404);

    private int code;
    Status(int code) { this.code = code; }
    public int getCode() { return code; }
}

// 6. Annotation Example
@interface MyAnnotation {
    String value();
}

class AnnotatedClass {
    @MyAnnotation(value = "Custom Annotation Example")
    public void display() {
        System.out.println("Method with custom annotation executed.");
    }
}

// 7. Functional Interface
@FunctionalInterface
interface Calculator {
    int operate(int a, int b);
}

public class InterfaceEnumAnnotationDemo {
    public static void main(String[] args) {
        // Interface usage
        Animal dog = new Dog();
        dog.sound();
        ((Dog) dog).play();

        Animal cat = new Cat();
        cat.sound();

        // Enum with if
        Day today = Day.SATURDAY;
        if (today == Day.SATURDAY || today == Day.SUNDAY) {
            System.out.println("It's weekend!");
        }

        // Enum with switch
        switch (today) {
            case MONDAY:
                System.out.println("Start of the week!");
                break;
            case FRIDAY:
                System.out.println("TGIF!");
                break;
            default:
                System.out.println("Midweek or weekend day.");
        }

        // Enum class with fields
        Status s = Status.SUCCESS;
        System.out.println("Status: " + s + " Code: " + s.getCode());

        // Annotation usage
        AnnotatedClass obj = new AnnotatedClass();
        obj.display();

        // Functional Interface + Lambda Expression
        Calculator add = (a, b) -> a + b;
        Calculator multiply = (a, b) -> { return a * b; }; // with return

        System.out.println("Addition: " + add.operate(5, 3));
        System.out.println("Multiplication: " + multiply.operate(5, 3));

        // Types of Interfaces
        // 1. Normal Interface (Animal, Pet)
        // 2. Functional Interface (Calculator)
        // 3. Marker Interface (e.g., Serializable in Java)
        System.out.println("Types of Interfaces demonstrated!");
    }
}