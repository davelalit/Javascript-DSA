// Observer Pattern in C# (Observer Design Pattern)
// This patterns an object(Observable) maintains a list of its dependents(Observers) and notifies them automatically of any state changes, usually by calling one of their methods.
// The Observer pattern is a behavioral design pattern that allows an object (the subject) to maintain
// a list of its dependents (observers) and notify them automatically of any state changes, usually by calling one of their methods. This pattern is useful when you want to establish a one-to-many relationship between objects, where changes in one object should be reflected in all its dependents, and it promotes flexibility by allowing you to add or remove observers at runtime without modifying the subject.

// Pros:
// 1. Loose coupling: The Observer pattern promotes loose coupling between the subject and its observers, as the subject does not need to know the specific types of its observers, which promotes maintainability and scalability.
// 2. Dynamic relationships: The Observer pattern allows for dynamic relationships between the subject and its observers, as observers can be added or removed at runtime without modifying the subject, which promotes flexibility.
// 3. Reusability: The Observer pattern promotes reusability by allowing you to use the same subject with different observers, and the same observer with different subjects, which promotes maintainability and scalability.
// Cons:
// 1. Performance overhead: The Observer pattern can add performance overhead to the code, as it requires additional classes and interfaces to be defined, and the subject may need to perform additional operations to notify its observers, which can make the code more difficult to understand and maintain.    
// 2. Memory leaks: The Observer pattern can lead to memory leaks if observers are not properly removed from the subject when they are no longer needed, which can cause the subject to hold references to observers that should be garbage collected, leading to increased memory usage and potential performance issues.

public interface IObserver
{
    void update();
}

public class Observer : IObserver
{
    public void update()
    {
        Console.WriteLine("Observer updated.");
    }
}

public interface IObservable
{
    void addObserver(IObserver observer);
    void removeObserver(IObserver observer);
    void notify();
    void setData(int data);
}

public class Subject : IObservable
{
    private List<IObserver> observers = new List<IObserver>();
    private int state;

  
    public void setData(int data)
    {
        this.state = data;
        Console.WriteLine("Subject state changed to: " + state);
        notify();
    }

    public void addObserver(IObserver observer)
    {
        observers.Add(observer);
    }

    public void removeObserver(IObserver observer)
    {
        observers.Remove(observer);
        Console.WriteLine("Observer removed.");
    }

    public void notify()
    {
        foreach (IObserver observer in observers)
        {
            observer.update();
        }
    }
}

// Client code
public class Client
{
    public static void Main(string[] args)
    {
        Subject subject = new Subject();
        Observer observer1 = new Observer();
        Observer observer2 = new Observer();

        subject.addObserver(observer1);
        subject.addObserver(observer2);

        subject.setData(10); // This will notify both observers

        subject.removeObserver(observer1);

        subject.setData(20); // This will notify only observer2
    }
}