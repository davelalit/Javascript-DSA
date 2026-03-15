// Command Pattern in C# (Command)
// Turns requests(commands) into objects, allowing you to either parameterized or queue them, This will help to decouple the request sender and receiver. This pattern is useful when you want to decouple the sender of a request from its receiver, and it promotes flexibility by allowing you to change the request handling logic without affecting the client code that uses the command.
// This pattern encapsulates a request as an object, thereby allowing for parameterization of clients with queues, requests, and operations. It also allows for the support of undoable operations.
// The Command pattern is a behavioral design pattern that allows you to encapsulate a request as an object, thereby allowing for parameterization of clients with queues, requests, and operations. This pattern is useful when you want to decouple the sender of a request from its receiver, and it promotes flexibility by allowing you to change the request handling logic without affecting the client code that uses the command.
// Pros:
// 1. Decoupling: The Command pattern promotes decoupling between the sender of a request and its receiver, as the sender does not need to know which object will handle the request, which promotes maintainability and scalability.
// 2. Dynamic handling: The Command pattern allows for dynamic handling of requests, as commands can be added or removed at runtime without modifying the sender or the other handlers, which promotes flexibility.
// 3. Support for undoable operations: The Command pattern allows for the support of undoable operations, as commands can be stored and executed later, which promotes maintainability and scalability.
// Cons:    
// 1. Performance overhead: The Command pattern can add performance overhead to the code, as it requires additional classes and interfaces to be defined, and the request may need to be passed through multiple handlers before it is processed, which can make the code more difficult to understand and maintain.    
// 2. Complexity: The Command pattern can introduce additional complexity to the codebase, especially if there are many types of commands and a large number of classes to manage, which can make the code more difficult to understand and maintain.



public class AirConditioner
{
    Boolean isOn;
    int temperature;
    public void turnOn()
    {
        isOn = true;
        Console.WriteLine("Air conditioner turned on.");
    }

    public void turnOff()
    {
        isOn = false;
        Console.WriteLine("Air conditioner turned off.");
    }

    public void setTemperature(int temperature)
    {
        this.temperature = temperature;
        Console.WriteLine("Air conditioner temperature set to " + temperature + " degrees.");
    }
}

public interface ICommand
{
    void Execute();
}

public class TurnOnCommand : ICommand
{
    private AirConditioner airConditioner;

    public TurnOnCommand(AirConditioner airConditioner)
    {
        this.airConditioner = airConditioner;
    }

    public void Execute()
    {
        airConditioner.turnOn();
    }
}

public class TurnOffCommand : ICommand
{
    private AirConditioner airConditioner;

    public TurnOffCommand(AirConditioner airConditioner)
    {
        this.airConditioner = airConditioner;
    }

    public void Execute()
    {
        airConditioner.turnOff();
    }
}

public class MyRemoteControl // Invoker/Sender
{
    private ICommand command;

    public void SetCommand(ICommand command)
    {
        this.command = command;
    }

    public void PressButton()
    {
        command.Execute();
    }
}

// Client code
public class Client
{
    public static void Main(string[] args)
    {
        AirConditioner airConditioner = new AirConditioner();
        MyRemoteControl remoteControl = new MyRemoteControl();

        // Turn on the air conditioner
        remoteControl.SetCommand(new TurnOnCommand(airConditioner));
        remoteControl.PressButton();

        // Set temperature to 25 degrees
        airConditioner.setTemperature(25);

        // Turn off the air conditioner
        remoteControl.SetCommand(new TurnOffCommand(airConditioner));
        remoteControl.PressButton();

        // Output:
        // Air conditioner turned on.
        // Air conditioner temperature set to 25 degrees.
        // Air conditioner turned off.
    }   
}

