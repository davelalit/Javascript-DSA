// Adapter Pattern C#
// This pattern acts as a bridge between two incompatible interfaces. It allows classes to work together that couldn't otherwise because of incompatible interfaces.
// The Adapter pattern is a structural design pattern that allows you to convert the interface of a class
// into another interface that clients expect. This pattern is useful when you want to use an existing class but its interface does not match the one you need, and it promotes flexibility by allowing you to work with classes that would otherwise be incompatible.

// Pros:
// 1. Compatibility: The Adapter pattern allows you to work with classes that would otherwise be incompatible, which promotes flexibility and maintainability.
// 2. Reusability: The Adapter pattern promotes reusability by allowing you to  use existing classes without modifying their source code, which promotes maintainability and scalability.
// 3. Separation of concerns: The Adapter pattern promotes separation of concerns by allowing you to separate the core functionality of a class from the adaptation logic, which promotes maintainability and scalability.
// Cons:
// 1. Complexity: The Adapter pattern can introduce additional complexity to the codebase, especially
//    if there are many types of adapters and a large number of classes to adapt.
// 2. Performance overhead: The Adapter pattern can add performance overhead to the code, as
//    it requires additional classes and interfaces to be defined, and the adapter may need to perform additional operations before or after delegating to the adaptee, which can make the code more difficult to understand and maintain.

interface IWeightMachine { // Adaptee interface
    double getWeightInPounds();
}

public class WeightMachineImpl : IWeightMachine
{
    public double getWeightInPounds()
    {
        return 30; // returns weight in pounds
    }
}

interface IWeightMachineAdapter // Adapter interface
{
    double getWeightInKg();
}

public class WeightMachineAdapterImpl : IWeightMachineAdapter
{
    private IWeightMachine weightMachine;

    public WeightMachineAdapter(IWeightMachine weightMachine)
    {
        this.weightMachine = weightMachine;
    }

    public double getWeightInKg()
    {
        return weightMachine.getWeightInPounds() * 0.453592; // converts pounds to kg
    }
}

// Client code
public class Client
{
    public static void Main(string[] args)
    {
        IWeightMachine weightMachine = new WeightMachineImpl();
        IWeightMachineAdapter adapter = new WeightMachineAdapter(weightMachine);
        Console.WriteLine("Weight in kg: " + adapter.getWeightInKg());

        // Output:
        // Weight in kg: 13.6078
    }
}