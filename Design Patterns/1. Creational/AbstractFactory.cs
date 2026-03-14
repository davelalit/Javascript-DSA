
// Abstract Factory Design Pattern in C#
// Real world example: A factory that creates different types of vehicles (e.g., cars,
// bikes) and their corresponding parts (e.g., engines, tires) based on input parameters.
// The Abstract Factory pattern is a creational design pattern that provides an interface for creating families of
// related or dependent objects without specifying their concrete classes.
// This pattern is useful when you want to create a set of related objects that must be used
// together, and it promotes loose coupling by eliminating the need to bind application-specific classes into the code.

// Pros:
// 1. Encapsulation of object creation: The Abstract Factory pattern encapsulates the object creation process, allowing for greater flexibility and maintainability.
// 2. Flexibility: It allows for easy addition of new types of products and factories without modifying existing code, which promotes scalability.
// 3. Loose coupling: The client code is decoupled from the specific classes that it needs to instantiate, which promotes maintainability and scalability.
// Cons:
// 1. Complexity: The Abstract Factory pattern can introduce additional complexity to the codebase, especially if there are many types of products and factories.
// 2. Overhead: The Abstract Factory pattern can add overhead to the code, as it requires additional classes and interfaces to be defined, which can make the code more difficult to understand and maintain.

// Refer - https://www.youtube.com/watch?v=OuNOyFg942M&list=PL6W8uoQQ2c61X_9e6Net0WdYZidm7zooW&index=32
using System; 

public interface AbstractFactory
{
    Car getInstance(int price);
}

public class EconomicCarFactory : AbstractFactory
{
    public Car getInstance(int price)
    {
        if(price < 20000)
        {
            return new EconomicCar1();
        }
        else
        {
            return new EconomicCar2();
        }
    }
}
public class LuxuryCarFactory : AbstractFactory
{
    public Car getInstance(int price)
    {
        if(price < 50000)
        {
            return new LuxuryCar1();
        }
        else
        {
            return new LuxuryCar2();
        }
    }
}

public class AbstractFactoryProducer
{

    public AbstractFactory getFactoryInstance(string choice)
    {
        if(choice.Equals("ECONOMIC", StringComparison.OrdinalIgnoreCase))
        {
            return new EconomicCarFactory();
        }
        else if(choice.Equals("LUXURY", StringComparison.OrdinalIgnoreCase))
        {
            return new LuxuryCarFactory();
        }
        return null;
    }    
}

public interface Car
{
    public int getTopSpeed();
}

public class EconomicCar1 : Car
{
    public int getTopSpeed()
    {
        return 100;
    }
}

public class EconomicCar2 : Car
{
    public int getTopSpeed()
    {
        return 150;
    }
}

public class LuxuryCar1 : Car
{
    public int getTopSpeed()
    {
        return 200;
    }
}

public class LuxuryCar2 : Car
{
    public int getTopSpeed()
    {
        return 250;
    }
}

// Client code
public class Client
{
    public static void Main(string[] args)
    {
        AbstractFactoryProducer factoryProducer = new AbstractFactoryProducer();
        
        AbstractFactory economicFactory = factoryProducer.getFactoryInstance("ECONOMIC");
        Car economicCar = economicFactory.getInstance(15000);
        Console.WriteLine($"Economic Car Top Speed: {economicCar.getTopSpeed()} km/h");
        
        AbstractFactory luxuryFactory = factoryProducer.getFactoryInstance("LUXURY");
        Car luxuryCar = luxuryFactory.getInstance(60000);
        Console.WriteLine($"Luxury Car Top Speed: {luxuryCar.getTopSpeed()} km/h");
    }
}


