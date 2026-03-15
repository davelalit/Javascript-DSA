// State Pattern in C# 
// This patterns allow to alter its behavior when its internal state changes. The object will appear to change its class.
// The State pattern is a behavioral design pattern that allows an object to change its behavior when its internal state changes. 
// This pattern is useful when you want to allow an object to alter its behavior based on its internal state, and it promotes flexibility by allowing you to change the behavior of an object at runtime without modifying its class.

// Pros:
// 1. Flexibility: The State pattern allows for dynamic changes in behavior based on the internal state of an object, which promotes flexibility and maintainability.
// 2. Encapsulation: The State pattern promotes encapsulation by allowing you to separate the behavior of an object based on its state into separate classes, which promotes maintainability and scalability.
// 3. Open/Closed Principle: The State pattern follows the Open/Closed Principle by allowing you to extend the behavior of an object by adding new state classes without modifying the existing code, which promotes scalability and maintainability.
// Cons:
// 1. Complexity: The State pattern can introduce additional complexity to the codebase, especially if there are many states and a large number of classes to manage.
// 2. Performance overhead: The State pattern can add performance overhead to the code, as it requires additional classes and interfaces to be defined, and the context may need to perform additional operations to delegate to the current state, which can make the code more difficult to understand and maintain.

public interface VendingMachineState
{
    void insertCoin();
    void dispenseItem();
}

public class IdleStage : VendingMachineState
{
    public void insertCoin()
    {
        Console.WriteLine("Coin inserted. Transitioning to WorkingState.");
        vendingMachine.SetState(new WorkingState());
    }

    public void dispenseItem()
    {
        Console.WriteLine("Please insert a coin first.");
    }
}

public class WorkingState : VendingMachineState
{
    public void insertCoin()
    {
        Console.WriteLine("Coin already inserted. Please select a product.");
    }

    public void dispenseItem()
    {
        Console.WriteLine("Collect your item. Transitioning to IdleState.");
        vendingMachine.SetState(new IdleStage());
    }
}

public class VendingMachine
{
    private VendingMachineState machineState;
    public VendingMachineState getMachineState()
    {
        return machineState;
    }

    public void setMachineState(VendingMachineState machineState)
    {
        this.machineState = machineState;
    }
}

// Client code
public class Client
{
    public static void Main(string[] args)
    {
        VendingMachine vendingMachine = new VendingMachine();
        vendingMachine.SetState(new IdleStage(vendingMachine));

        vendingMachine.getMachineState().insertCoin(); // Output: Coin inserted. Transitioning to WorkingState.
        vendingMachine.getMachineState().dispenseItem(); // Output: Collect your item. Transitioning to IdleState.
    }
}