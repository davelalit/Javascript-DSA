// Vistior Pattern in C# (Visitor)
// Allows adding new operations to existing classes without modifying them and encourage OPEN/CLOSED principle. It allows you to separate an algorithm from the objects on which it operates. This pattern is useful when you want to add new operations to existing object structures without modifying the structures themselves, and it promotes flexibility by allowing you to change the behavior of an object at runtime without modifying its class.
// The Visitor pattern is a behavioral design pattern that allows you to separate an algorithm from the objects
// This pattern allows you to separate an algorithm from the objects on which it operates. It promotes flexibility by allowing you to add new operations to existing object structures without modifying the structures themselves, and it promotes maintainability by keeping related operations together in a single class hierarchy.     
// The Visitor pattern is a behavioral design pattern that allows you to separate an algorithm from the objects on which it operates. This pattern is useful when you want to add new operations to existing object structures without modifying the structures themselves, and it promotes flexibility by allowing you to change the behavior of an object at runtime without modifying its class. 
// Pros:
// 1. Flexibility: The Visitor pattern allows for dynamic changes in behavior based on the type of object being visited, which promotes flexibility and maintainability.
// 2. Encapsulation: The Visitor pattern promotes encapsulation by allowing you to separate the behavior of an object based on its type into separate classes, which promotes maintainability and scalability.
// 3. Open/Closed Principle: The Visitor pattern follows the Open/Closed Principle by       
// allowing you to extend the behavior of an object by adding new visitor classes without modifying the existing code, which promotes scalability and maintainability.
// Cons:
// 1. Complexity: The Visitor pattern can introduce additional complexity to the codebase, especially if there are many types of objects and a large number of visitor classes to manage.
// 2. Performance overhead: The Visitor pattern can add performance overhead to the code, as it requires additional classes and interfaces to be defined, and the context may need to perform additional operations to delegate to the current visitor, which can make the code more difficult to understand and maintain.
public interface RoomVisitor
{
    void visit(SingleRoom singleRoom);
    void visit(DoubleRoom doubleRoom);
}

public class RoomPricingVisitor : RoomVisitor // Operation-1
{
    public void visit(SingleRoom singleRoom)
    {
        singleRoom.roomPrice = 100;
    }

    public void visit(DoubleRoom doubleRoom)
    {
        doubleRoom.roomPrice = 150;
    }
}

public class RoomMaintenanceVisitor : RoomVisitor // Operation-2
{
    public void visit(SingleRoom singleRoom)
    {
        Console.WriteLine("Performing maintenance on single room.");
    }

    public void visit(DoubleRoom doubleRoom)
    {
        Console.WriteLine("Performing maintenance on double room.");
    }
}   

public interface RoomElement
{
    void accept(RoomVisitor visitor);
}

public class SingleRoom : RoomElement
{
    public int roomPrice = 0;
    public void accept(RoomVisitor visitor)
    {
        visitor.visit(this);
    }
}

public class DoubleRoom : RoomElement
{
    public int roomPrice = 0;
    public void accept(RoomVisitor visitor)
    {
        visitor.visit(this);
    }
}

// Client code
public class Client
{
    public static void Main(string[] args)
    {
        RoomElement singleRoom = new SingleRoom();
        RoomElement doubleRoom = new DoubleRoom();

        RoomVisitor pricingVisitor = new RoomPricingVisitor();
        singleRoom.accept(pricingVisitor);
        doubleRoom.accept(pricingVisitor);

        Console.WriteLine("Single Room Price: " + ((SingleRoom)singleRoom).roomPrice);
        Console.WriteLine("Double Room Price: " + ((DoubleRoom)doubleRoom).roomPrice);

        RoomVisitor maintenanceVisitor = new RoomMaintenanceVisitor();
        singleRoom.accept(maintenanceVisitor);
        doubleRoom.accept(maintenanceVisitor);
    }
}