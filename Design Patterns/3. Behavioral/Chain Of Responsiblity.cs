//  Behavioral Design Pattern
// Guides how different objects communicate with each other efficiently and distribute tasks efficiently, 
// making software system flexible and easy to maintain. 
// It focuses on the interaction between objects and how they collaborate to achieve a common goal, rather than on the structure of the objects themselves.

// Chain of Responsibility Pattern in C# (Responsibility Chain)
// allows multiple objects to handle a request without the sender needing to know which object will handle it. The request is passed along a chain of objects until it is handled by an object that can process it. This pattern is useful when you want to decouple the sender of a request from its receivers, and it promotes flexibility by allowing you to add or remove handlers at runtime without modifying the sender or the other handlers.
// Pros:
// 1. Decoupling: The Chain of Responsibility pattern promotes decoupling between the sender of a request and its receivers, as the sender does not need to know which object will handle the request, which promotes maintainability and scalability.
// 2. Dynamic handling: The Chain of Responsibility pattern allows for dynamic handling of requests,    as handlers can be added or removed at runtime without modifying the sender or the other handlers, which promotes flexibility.
// 3. Single Responsibility Principle: The Chain of Responsibility pattern adheres to the Single Responsibility Principle by allowing you to separate concerns and add functionality to handlers without changing their core behavior, which promotes maintainability and scalability.
// Cons:
// 1. Performance overhead: The Chain of Responsibility pattern can add performance overhead to the code, as it requires additional classes and interfaces to be defined, and the request may need to be passed through multiple handlers before it is processed, which can make the code more difficult to understand and maintain.
// 2. Unhandled requests: The Chain of Responsibility pattern can lead to unhandled requests if there is no handler in the chain that can process the request, which can lead to unexpected behavior and potential bugs in the code.

// Refer - https://www.youtube.com/watch?v=DBDnUkTobaE&list=PL6W8uoQQ2c61X_9e6Net0WdYZidm7zooW&index=46

public class LogProcessor
{
    private LogProcessor nextProcessor;

    public LogProcessor(LogProcessor processor)
    {
        nextProcessor = processor;
    }

    public virtual void ProcessLog(string log)
    {
        if (nextProcessor != null)
        {
            nextProcessor.ProcessLog(log);
        }
    }
}

public class InfoLogProcessor : LogProcessor
{
    public InfoLogProcessor(LogProcessor processor) : base(processor)
    {
        
    }
    public override void ProcessLog(string log)
    {
        if (log.Contains("INFO"))
        {
            Console.WriteLine("Processing info log: " + log);
        }
        else
        {
            base.ProcessLog(log);
        }
    }
}

public class DebugLogProcessor : LogProcessor
{
    public DebugLogProcessor(LogProcessor processor) : base(processor)
    {
        
    }
    public override void ProcessLog(string log)
    {
        if (log.Contains("DEBUG"))
        {
            Console.WriteLine("Processing debug log: " + log);
        }
        else
        {
            base.ProcessLog(log);
        }
    }
}

// Client code
public class Client
{
    public static void Main(string[] args)
    {
        LogProcessor infoProcessor = new InfoLogProcessor(new DebugLogProcessor(null));
        
        infoProcessor.ProcessLog("INFO: This is an info log.");
        infoProcessor.ProcessLog("DEBUG: This is a debug log.");
        infoProcessor.ProcessLog("ERROR: This is an error log.");

        // Output:
        // Processing info log: INFO: This is an info log.
        // Processing debug log: DEBUG: This is a debug log.
    }
}
