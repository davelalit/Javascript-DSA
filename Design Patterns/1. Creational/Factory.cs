// Factory Design Pattern in C#
// Real world example: A factory that creates different types of vehicles based on input parameters.
// The Factory pattern is a creational design pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created. 
// This pattern is useful when the exact type of object to be created is not known until runtime, and it promotes loose coupling by eliminating the need to bind application-specific classes into the code.
// Pros:
// 1. Encapsulation of object creation: The Factory pattern encapsulates the object creation process
// 2. Flexibility: It allows for easy addition of new types of products without modifying existing code.
// 3. Loose coupling: The client code is decoupled from the specific classes that
//    it needs to instantiate, which promotes maintainability and scalability.
// Cons:
// 1. Complexity: The Factory pattern can introduce additional complexity to the codebase, especially
//    if there are many types of products and factories.
// 2. Overhead: The Factory pattern can add overhead to the code, as it requires additional classes and interfaces to be defined, which can make the code more difficult to understand and maintain.
using System;

public interface IShape
{
    void computeArea();
}

public class Circle : IShape
{
    public void computeArea()
    {
        Console.WriteLine("Area of Circle");
    }
}

public class Square : IShape
{
    public void computeArea()
    {
        Console.WriteLine("Area of Square");
    }
}

public class ShapeFactory
{
    public IShape getShape(string shapeType)
    {
        if (shapeType == null)
        {
            return null;
        }
        if (shapeType.Equals("CIRCLE", StringComparison.OrdinalIgnoreCase))
        {
            return new Circle();
        }
        else if (shapeType.Equals("SQUARE", StringComparison.OrdinalIgnoreCase))
        {
            return new Square();
        }
        return null;
    }
}

// Client code
public class Client
{
    public static void Main(string[] args)
    {
        ShapeFactory shapeFactory = new ShapeFactory();

        IShape shape1 = shapeFactory.getShape("CIRCLE");
        shape1.computeArea();

        IShape shape2 = shapeFactory.getShape("SQUARE");
        shape2.computeArea();
    }
}