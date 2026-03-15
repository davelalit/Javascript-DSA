// Memento Pattern in C# (Memory keeper)
// Provides an ability to revert an objet to a previous state i.e. UNDO Capablity and it does not explose the object internal implmenation. The memento pattern is a behavioral design pattern that allows you to capture and externalize an object's internal state without violating encapsulation, so that the object can be restored to that state later. This pattern is useful when you want to provide a way to restore an object to a previous state without exposing its internal implementation, and it promotes flexibility by allowing you to change the internal implementation of the object without affecting the client code that uses the memento.
// This pattern allows you to capture and externalize an object's internal state without violating encapsulation,   so that the object can be restored to that state later. This pattern is useful when you want to provide a way to restore an object to a previous state without exposing its internal implementation, and it promotes flexibility by allowing you to change the internal implementation of the object without affecting the client code that uses the memento.
// The Memento pattern is a behavioral design pattern that allows you to capture and externalize an object's internal state without violating encapsulation, so that the object can be restored to that state later. This pattern is useful when you want to provide a way to restore an object to a previous state without exposing its internal implementation, and it promotes flexibility by allowing you to change the internal implementation of the object without affecting the client code that uses the memento.
// Originator - It represets the objects for which state needs to be saved and restored. It creates a memento containing a snapshot of its current internal state and uses the memento to restore its internal state.
// Memento - It represents an Object which holds the state of the Originator object. It protects against access by objects other than the originator.
// Caretaker - Manages the list of states(i.e. list of Mementos). It never operates on or examines the contents of a memento, but simply keeps it safe. It may also be responsible for deciding when to save and restore the originator's state.

// Pros:
// 1. Encapsulation: The Memento pattern promotes encapsulation by allowing you to capture and externalize an object's internal state without exposing its internal implementation, which promotes maintainability and scalability.
// 2. Flexibility: The Memento pattern allows you to change the internal implementation of      the object without affecting the client code that uses the memento, which promotes adaptability to changing requirements.
// 3. Improved code organization: The Memento pattern promotes better code organization by separating the internal state of an object from the client code that uses the memento, which promotes maintainability and scalability.
// Cons:    
// 1. Complexity: The Memento pattern can introduce additional complexity to the codebase, especially if there are many types of mementos and a large number of classes to manage.
// 2. Performance overhead: The Memento pattern can add performance overhead to the code, as it requires additional classes and interfaces to be defined, and the memento may need to perform additional operations to capture and restore the internal state of the object, which can make the code more difficult to understand and maintain.

public class ConfigurationOrigniator // Originator
{
    int height;
    int width;
    public ConfigurationOrigniator(int height, int width)
    {
        this.height = height;
        this.width = width;
    }

    public ConfigurationMemento createMemento()
    {
        return new ConfigurationMemento(height, width);
    }

    public void restoreMemento(ConfigurationMemento memento)
    {
        this.height = memento.height;
        this.width = memento.width;
    }
}

public class ConfigurationMemento // Memento
{
    public int height;
    public int width;
    public ConfigurationMemento(int height, int width)
    {
        this.height = height;
        this.width = width;
    }
}

public class ConfigurationCaretaker // Caretaker
{
    private List<ConfigurationMemento> history = new List<ConfigurationMemento>();
    public void addMemento(ConfigurationMemento memento)
    {
        history.Add(memento);
    }
    public ConfigurationMemento undo()
    {
        if(history.Count != 0)
        {
            ConfigurationMemento lastMemento = history[history.Count - 1]; // Get the last memento from history
            history.RemoveAt(history.Count - 1); // Remove the last memento from history after retrieving it
            return lastMemento;
        }
        return null;
    }
}

// Client code
public class Client
{
    public static void Main(string[] args)
    {
        ConfigurationOrigniator configurationOrigniator = new ConfigurationOrigniator(10, 20);
        ConfigurationCaretaker configurationCaretaker = new ConfigurationCaretaker();
        configurationCaretaker.addMemento(configurationOrigniator.createMemento());
        configurationOrigniator.restoreMemento(configurationCaretaker.undo());
    }
}