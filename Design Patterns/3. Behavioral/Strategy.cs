// Strategy Pattern in C# 
// This pattern helps to define multiple algorighm for the task and we can select any algorithm depending on the situation.
// The Strategy pattern is a behavioral design pattern that allows you to define a family of algorithms, encapsulate each one, and make them interchangeable. This pattern is useful when you want to allow clients to choose from a family of algorithms at runtime, and it promotes flexibility by allowing you to change the algorithm being used without modifying the client code that uses it.

// Pros:
// 1. Flexibility: The Strategy pattern allows for dynamic changes in behavior based on the algorithm being used, which promotes flexibility and maintainability.
// 2. Encapsulation: The Strategy pattern promotes encapsulation by allowing you to separate the behavior of an object based on the algorithm being used into separate classes, which promotes maintainability and scalability.
// 3. Open/Closed Principle: The Strategy pattern follows the Open/Closed Principle by allowing you to extend the behavior of an object by adding new algorithm classes without modifying the existing code, which promotes scalability and maintainability.
// Cons:
// 1. Complexity: The Strategy pattern can introduce additional complexity to the codebase, especially  if there are many algorithms and a large number of classes to manage.
// 2. Performance overhead: The Strategy pattern can add performance overhead to the code, as it requires additional classes and interfaces to be defined, and the context may need to perform additional operations to delegate to the current strategy, which can make the code more difficult to understand and maintain.

public interface IPayStrategy
{
    void pay(double amount);
}

public class CreditCardPayment : IPayStrategy
{
    public void pay(double amount)
    {
        Console.WriteLine("Paid " + amount + " using credit card.");
    }
}

public class PayPalPayment : IPayStrategy
{
    public void pay(double amount)
    {
        Console.WriteLine("Paid " + amount + " using PayPal.");
    }
}

public class ShoppingCart
{
    private IPayStrategy payStrategy;

    public void setPayStrategy(IPayStrategy payStrategy)
    {
        this.payStrategy = payStrategy;
    }

    public void checkout(double amount)
    {
        if (payStrategy == null)
        {
            Console.WriteLine("Please select a payment method.");
            return;
        }
        payStrategy.pay(amount);
    }
}

// Client code
public class Client
{
    public static void Main(string[] args)
    {
        ShoppingCart cart = new ShoppingCart();

        cart.setPayStrategy(new CreditCardPayment());
        cart.checkout(100);

        cart.setPayStrategy(new PayPalPayment());
        cart.checkout(200);

        // Output:
        // Paid 100 using credit card.
        // Paid 200 using PayPal.
    }
}