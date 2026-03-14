// Builder Design Pattern in C#
// Real world example: A builder that constructs different types of vehicles (e.g., cars, bikes) with various configurations (e.g., engine type, color) based on input parameters.
// The Builder pattern is a creational design pattern that allows you to construct complex objects step by
// step, separating the construction process from the representation. This pattern is useful when you want to create different representations of a complex object, and it promotes loose coupling by eliminating the need to bind application-specific classes into the code.

// Pros:
// 1. Separation of construction and representation: The Builder pattern separates the construction process from the
//    representation of the object, allowing for greater flexibility and maintainability.
// 2. Flexibility: It allows for easy addition of new types of products and builders without modifying existing code, which promotes scalability.
// 3. Loose coupling: The client code is decoupled from the specific classes that it needs to instantiate, which promotes maintainability and scalability.
// Cons:
// 1. Complexity: The Builder pattern can introduce additional complexity to the codebase, especially if there are many types of products and builders.
// 2. Overhead: The Builder pattern can add overhead to the code, as it requires additional classes and interfaces to be defined, which can make the code more difficult to understand and maintain.

using System;

public class Student
{
    int rollNumber;
    int age;
    String name;
    String fatherName;
    String motherName;
    List<String> subjects;

    public Student(StudentBuilder builder)
    {
        this.rollNumber = builder.rollNumber;
        this.age = builder.age;
        this.name = builder.name;
        this.fatherName = builder.fatherName;
        this.motherName = builder.motherName;
        this.subjects = builder.subjects;
    }

    public override string ToString()
    {
        return $"Student [Roll Number: {rollNumber}, Age: {age}, Name: {name}, Father Name: {fatherName}, Mother Name: {motherName}, Subjects: {string.Join(", ", subjects)}]";
    }
}

public abstract class StudentBuilder
{
    int rollNumber;
    int age;
    String name;
    String fatherName;
    String motherName;
    List<String> subjects;

    public StudentBuilder setRollNumber(int rollNumber)
    {
        this.rollNumber = rollNumber;
        return this;
    }
    public StudentBuilder setAge(int age)
    {
        this.age = age;
        return this;
    }
    public StudentBuilder setName(String name)
    {
        this.name = name;
        return this;
    }
    public StudentBuilder setFatherName(String fatherName)
    {
        this.fatherName = fatherName;
        return this;
    }
    public StudentBuilder setMotherName(String motherName)
    {
        this.motherName = motherName;
        return this;
    }
    public abstract setSubjects();

    public abstract Student build()
    {
        return new Student(this);
    }
}

public class MBAStudentBuilder : StudentBuilder
{
    public override setSubjects()
    {
        this.subjects = new List<String> { "Business Strategy", "Leadership", "Finance" };
        return this;
    }
}

public class EngineeringStudentBuilder : StudentBuilder
{
    public override setSubjects()
    {
        this.subjects = new List<String> { "Data Structures", "Algorithms", "Operating Systems" };
        return this;
    }
}

public class Director
{
    StudentBuilder studentBuilder;


    public Student createStudent()
    {

        if (studentBuilder is MBAStudentBuilder)
        {
            return createMBAStudent();
        }
        else if (studentBuilder is EngineeringStudentBuilder)
        {
            return createEngineeringStudent();
        }
        else
        {
            throw new Exception("Invalid Student Builder");
        }
    }

    private Student createEngineeringStudent()
    {
        return studentBuilder.setRollNumber(2)
                             .setAge(21)
                             .setName("Alice Smith")
                             .setFatherName("Bob Smith")
                             .setMotherName("Carol Smith")
                             .setSubjects()
                             .build();
    }

    private Student createMBAStudent()
    {
        return studentBuilder.setRollNumber(1)
                             .setAge(22)
                             .setName("John Doe")
                             .setFatherName("Richard Roe")
                             .setMotherName("Jane Doe")
                             .setSubjects()
                             .build();
    }
}

// Client code
public class Client
{
    public static void Main(string[] args)
    {
        Director director = new Director();

        Student mbaStudent = director.construct(new MBAStudentBuilder());
        Console.WriteLine(mbaStudent);

        Student engineeringStudent = director.construct(new EngineeringStudentBuilder());
        Console.WriteLine(engineeringStudent);
    }
}