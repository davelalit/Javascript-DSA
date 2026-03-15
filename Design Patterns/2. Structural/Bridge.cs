// Bridge Pattern C#
// This Pattern helps to decouple an abstraction from its implementation so that the two can vary independently.
// The Bridge pattern is a structural design pattern that allows you to separate an abstraction from its implementation, 
// so that the two can vary independently. This pattern is useful when you want to avoid a permanent binding between an abstraction and its implementation, 
// and it promotes flexibility by allowing you to change the implementation without affecting the client code that uses the abstraction.

// Pros:
// 1. Decoupling: The Bridge pattern allows you to decouple an abstraction from its implementation, which promotes flexibility and maintainability.
// 2. Independent variation: The Bridge pattern allows the abstraction and implementation to vary independently, which promotes scalability and adaptability to changing requirements.
// 3. Improved code organization: The Bridge pattern promotes better code organization by separating the abstraction and implementation into separate class hierarchies, which promotes maintainability and scalability.
// Cons:    
// 1. Complexity: The Bridge pattern can introduce additional complexity to the codebase, especially if there are many types of abstractions and implementations and a large number of classes to manage.
// 2. Performance overhead: The Bridge pattern can add performance overhead to the code, as it requires additional classes and interfaces to be defined, and the abstraction may need to perform additional operations to delegate to the implementation, which can make the code more difficult to understand and maintain.

abstract class LivingThings
{
    protected BreatheImplementor breatheImplementor;
    public LivingThings(BreatheImplementor breatheImplementor)
    {
        this.breatheImplementor = breatheImplementor;
    }
    abstract void breatheProcess();
}

interface IBreatheImplementor
{
    void breatheProcess();
}

public class Dog : LivingThings
{
    public Dog(IBreatheImplementor breatheImplementor)
    {
        super(breatheImplementor);
    }

    public override void breatheProcess()
    {
        breatheImplementor.breatheProcess();
    }
}

public class Fish : LivingThings
{
    public Fish(IBreatheImplementor breatheImplementor)
    {
        super(breatheImplementor);
    }

    public override void breatheProcess()
    {
        breatheImplementor.breatheProcess();
    }
}

public class LandBreatheImplementor : IBreatheImplementor
{
    public void breatheProcess()
    {
        Console.WriteLine("Breathing through air");
    }
}

public class WaterBreatheImplementor : IBreatheImplementor
{
    public void breatheProcess()
    {
        Console.WriteLine("Breathing through water");
    }
}

// Client code
public class Client
{
    public static void Main(string[] args)
    {
        IBreatheImplementor landBreathe = new LandBreatheImplementor();
        IBreatheImplementor waterBreathe = new WaterBreatheImplementor();

        LivingThings dog = new Dog(landBreathe);
        LivingThings fish = new Fish(waterBreathe);

        dog.breatheProcess(); // Output: Breathing through air
        fish.breatheProcess(); // Output: Breathing through water
    }
}