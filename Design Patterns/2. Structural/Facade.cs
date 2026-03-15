// Facade Pattern in C# (Mukhota)
// This pattern helps to hide the system complexity from clients and provides a simple interface to interact with the system.
// The Facade pattern is a structural design pattern that provides a simplified interface to a complex subsystem. 
// This pattern is useful when you want to hide the complexities of a system and provide a simple interface for clients to interact with, 
// and it promotes flexibility by allowing you to change the underlying subsystem without affecting the client code that uses the facade.

// Pros:
// 1. Simplified interface: The Facade pattern provides a simplified interface to a complex subsystem, which promotes ease of use and maintainability.
// 2. Decoupling: The Facade pattern decouples the client code from the complexities of the subsystem, which promotes flexibility and maintainability.
// 3. Improved code organization: The Facade pattern promotes better code organization by separating the client code from the subsystem code, which promotes maintainability and scalability.
// Cons:    
// 1. Limited functionality: The Facade pattern may limit the functionality available to clients, as it provides a simplified interface that may not expose all the features of the underlying subsystem.
// 2. Performance overhead: The Facade pattern can add performance overhead to the code, as it requires additional classes and interfaces to be defined, and the facade may need to perform additional operations to delegate to the underlying subsystem, which can make the code more difficult to understand and maintain.

// Refer - https://www.dofactory.com/net/facade-design-pattern
//         https://refactoring.guru/design-patterns/facade/csharp/example
using System;

/// <summary>
/// The 'Subsystem ClassA' class
/// </summary>
public class Bank
{
    public bool HasSufficientSavings(Customer c, int amount)
    {
        Console.WriteLine("Check bank for " + c.Name);
        return true;
    }
}
/// <summary>
/// The 'Subsystem ClassB' class
/// </summary>
public class Credit
{
    public bool HasGoodCredit(Customer c)
    {
        Console.WriteLine("Check credit for " + c.Name);
        return true;
    }
}
/// <summary>
/// The 'Subsystem ClassC' class
/// </summary>
public class Loan
{
    public bool HasNoBadLoans(Customer c)
    {
        Console.WriteLine("Check loans for " + c.Name);
        return true;
    }
}
/// <summary>
/// Customer class
/// </summary>
public class Customer
{
    private string name;
    // Constructor
    public Customer(string name)
    {
        this.name = name;
    }
    public string Name
    {
        get { return name; }
    }
}
/// <summary>
/// The 'Facade' class
/// </summary>
public class Mortgage
{
    Bank bank = new Bank();
    Loan loan = new Loan();
    Credit credit = new Credit();
    public bool IsEligible(Customer cust, int amount)
    {
        Console.WriteLine("{0} applies for {1:C} loan\n",
            cust.Name, amount);
        bool eligible = true;
        // Check creditworthyness of applicant
        if (!bank.HasSufficientSavings(cust, amount))
        {
            eligible = false;
        }
        else if (!loan.HasNoBadLoans(cust))
        {
            eligible = false;
        }
        else if (!credit.HasGoodCredit(cust))
        {
            eligible = false;
        }
        return eligible;
    }
}

// Client code
public class Client
{
    public static void Main(string[] args)
    {
        // Facade
        Mortgage mortgage = new Mortgage();
        Customer customer = new Customer("John Doe");
        bool eligible = mortgage.IsEligible(customer, 125000);
        Console.WriteLine("\n" + customer.Name +
            " has been " + (eligible ? "Approved" : "Rejected"));
        // Output:
        // John Doe applies for $125,000.00 loan

        // Check bank for John Doe
        // Check loans for John Doe
        // Check credit for John Doe

        // John Doe has been Approved
    }
}

