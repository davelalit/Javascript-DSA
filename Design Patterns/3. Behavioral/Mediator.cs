// Mediator Pattern in C#
// It encourage loose couplig by keeping objects from referring to each other explicitly and allows them to commmunicate through a mediator object. This pattern is useful when you want to reduce the complexity of communication between multiple objects, and it promotes maintainability by centralizing the communication logic in a single mediator object.
// The Mediator pattern is a behavioral design pattern that defines an object (the mediator) that encapsulates how a set of objects interact. This pattern promotes loose coupling by keeping objects from referring to each other explicitly, and it allows you to change the interaction between objects independently of the objects themselves. This pattern is useful when you want to reduce the complexity of communication between multiple objects, and it promotes maintainability by centralizing the communication logic in a single mediator object.
// This pattern defines an object that encapsulates how a set of objects interact. This pattern promotes loose coupling by keeping objects from referring to each other explicitly, and it allows you to change the interaction between objects independently of the objects themselves.
// The Mediator pattern is a behavioral design pattern that defines an object (the mediator) that encapsulates how a set of objects interact. This pattern promotes loose coupling by keeping objects from referring to each other explicitly, and it allows you to change the interaction between objects independently of the objects themselves. This pattern is useful when you want to reduce the complexity of communication between multiple objects, and it promotes maintainability by centralizing the communication logic in a single mediator object.
// Pros:
// 1. Loose coupling: The Mediator pattern promotes loose coupling between objects, as they do not need to refer to each other explicitly, which promotes maintainability and scalability.
// 2. Centralized communication: The Mediator pattern centralizes the communication logic in a single mediator object, which promotes maintainability and scalability by keeping related communication logic together in a single class hierarchy.
// 3. Flexibility: The Mediator pattern allows you to change the interaction between objects independently of the objects themselves, which promotes flexibility and adaptability to changing requirements.
// Cons:
// 1. Complexity: The Mediator pattern can introduce additional complexity to the codebase, especially if there are many types of objects and a large number of interactions to manage.
// 2. Performance overhead: The Mediator pattern can add performance overhead to the code, as it requires additional classes and interfaces to be defined, and the mediator may need to perform additional operations to manage the interactions between objects, which can make the code more difficult to understand and maintain.

public interface Colleague
{
    void placeBid(int bidAmount);
    void receiveBidNotification(int bidAmount);
    String getName();
}

public class Bidder : Colleague
{
    private String name;
    private AuctionMediator auctionMediator;
    public Bidder(String name, AuctionMediator mediator)
    {
        this.name = name;
        this.auctionMediator = mediator;
        mediator.addBidder(this);
    }

    public void placeBid(int bidAmount) // Send message to mediator
    {
        Console.WriteLine($"{name} placed a bid of {bidAmount}");
        auctionMediator.placeBid(this, bidAmount);
    }

    public void receiveBidNotification(int bidAmount) // Receive message from mediator
    {
        Console.WriteLine($"{name} received a bid notification of {bidAmount}");
    }

    public String getName()
    {
        return name;
    }
}

public interface IAuctionMediator
{
    void addBidder(Colleague colleague);
    void placeBid(Colleague bidder, int bidAmount);
}

public class AuctionMediator: IAuctionMediator
{
    private List<Colleague> colleagues = new List<Colleague>();

    public void addBidder(Colleague colleague)
    {
        colleagues.Add(colleague);
    }

    public void placeBid(Colleague bidder, int bidAmount)
    {
       foreach(Colleague colleague in colleagues)
       {
           if(colleague != bidder)
           {
               colleague.receiveBidNotification(bidAmount);
           }
       }
    }

    private void notifyBidders(Colleague bidder, int bidAmount)
    {
        foreach (var b in bidders)
        {
            if (b != bidder)
            {
                b.receiveBidNotification(bidAmount);
            }
        }
    }
}

// Client code
public class Client
{
    public static void Main(string[] args)
    {
        IAuctionMediator auction = new AuctionMediator();
        Bidder bidder1 = new Bidder("Bidder 1", auction);
        Bidder bidder2 = new Bidder("Bidder 2", auction);
        Bidder bidder3 = new Bidder("Bidder 3", auction);

        bidder1.placeBid(100);
        bidder2.placeBid(150);
        bidder3.placeBid(200);

        // Output:
        // Bidder 1 placed a bid of 100
        // Bidder 2 received a bid notification of 100
        // Bidder 3 received a bid notification of 100
        // Bidder 2 placed a bid of 150
        // Bidder 1 received a bid notification of 150
        // Bidder 3 received a bid notification of 150
        // Bidder 3 placed a bid of 200
        // Bidder 1 received a bid notification of 200
        // Bidder 2 received a bid notification of 200
    }
}