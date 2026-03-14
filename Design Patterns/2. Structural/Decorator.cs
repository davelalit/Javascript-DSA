// Decorator Design Pattern in C#
// Real world example: Pizza toppings. You can have a basic pizza and then add various toppings (e.g., cheese, pepperoni) to it without changing the original pizza class.
// The Decorator pattern is a structural design pattern that allows you to dynamically add behavior to an object without affecting the behavior of other objects from the same class. This pattern is useful when you want to add responsibilities to individual objects, and it promotes flexibility by allowing you to combine behaviors at runtime.

// Pros:
// 1. Flexibility: The Decorator pattern allows for dynamic addition of behavior to objects without modifying their structure, which promotes flexibility and maintainability.
// 2. Single Responsibility Principle: The Decorator pattern adheres to the Single Responsibility Principle by allowing you to separate concerns and add functionality to objects without changing their core behavior.
// 3. Open/Closed Principle: The Decorator pattern follows the Open/Closed Principle by allowing you to extend the behavior of objects without modifying their existing code, which promotes scalability and maintainability.
// Cons:
// 1. Complexity: The Decorator pattern can introduce additional complexity to the codebase, especially if there are many types of decorators and a large number of objects to decorate.
// 2. Debugging: Debugging can be more challenging with the Decorator pattern, as the flow of execution can become complex with multiple layers of decorators.

// Refer - https://www.youtube.com/watch?v=WxGtmIBZszk&list=PL6W8uoQQ2c61X_9e6Net0WdYZidm7zooW&index=37

using System;
// Component abstract class
public abstract class BasePizza
{
    public abstract double GetCost();
}

// Concrete Component
public class FarmHousePizza : BasePizza
{
    public override double GetCost()
    {
        return 5.0; // Base cost of farm house pizza
    }
}

public class MargheritaPizza : BasePizza
{
    public override double GetCost()
    {
        return 4.0; // Base cost of margherita pizza
    }
}

public abstract class ToppingDecorator : BasePizza
{
    protected BasePizza pizza;

    public ToppingDecorator(BasePizza pizza)
    {
        this.pizza = pizza;
    }
}

// Concrete Decorators
public class ExtraCheeseTopping : ToppingDecorator
{
    public ExtraCheeseTopping(BasePizza pizza) : base(pizza) { }

    public override double GetCost()
    {
        return pizza.GetCost() + 1.0; // Cost of extra cheese
    }
}

public class MushroomTopping : ToppingDecorator
{
    public MushroomTopping(BasePizza pizza) : base(pizza) { }

    public override double GetCost()
    {
        return pizza.GetCost() + 1.5; // Cost of mushroom
    }
}

// Client code
public class Client
{
    public static void Main(string[] args)
    {
        BasePizza pizza = new FarmHousePizza();
        Console.WriteLine($"Cost of FarmHouse Pizza: {pizza.GetCost()}");

        pizza = new ExtraCheeseTopping(pizza);
        Console.WriteLine($"Cost of FarmHouse Pizza with Extra Cheese: {pizza.GetCost()}");

        pizza = new MushroomTopping(pizza);
        Console.WriteLine($"Cost of FarmHouse Pizza with Extra Cheese and Mushroom: {pizza.GetCost()}");
    }
}