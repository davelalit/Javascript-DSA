// Prototype Design Pattern in C#
// Clone Objects to provide a template example
// The Prototype pattern is a creational design pattern that allows you to create new objects by copying existing ones. 
// This can be useful when creating new instances of a class is expensive or complex. 
// The pattern involves defining a prototype interface with a clone method, and concrete classes that implement this interface.
using System;
using System.Collections.Generic;
// Prototype interface
public interface IPrototype
{
    IPrototype Clone();
}

// Concrete Prototype
public class ConcretePrototype : IPrototype
{
    public string Name { get; set; }
    public int Age { get; set; }

    public ConcretePrototype(string name, int age)
    {
        Name = name;
        Age = age;
    }

    // Implement the Clone method
    public IPrototype Clone()
    {
        return new ConcretePrototype(Name, Age);
    }
}

// Client code
public class Client 
{
    public static void Main(string[] args)
    {
        // Create an original object
        ConcretePrototype original = new ConcretePrototype("Alice", 30);
        
        // Clone the original object
        ConcretePrototype clone = (ConcretePrototype)original.Clone();
        
        // Display the original and cloned objects
        Console.WriteLine($"Original: Name={original.Name}, Age={original.Age}");
        Console.WriteLine($"Clone: Name={clone.Name}, Age={clone.Age}");
        
        // Modify the clone's properties
        clone.Name = "Bob";
        clone.Age = 25;
        
        // Display the modified clone and original to show they are different
        Console.WriteLine($"Modified Clone: Name={clone.Name}, Age={clone.Age}");
        Console.WriteLine($"Original after modification: Name={original.Name}, Age={original.Age}");
    }
}