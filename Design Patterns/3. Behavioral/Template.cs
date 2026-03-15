// Template Method Pattern in C# (Template Method)
// When you want all classes to follow specific steps to process the tasks but provide flexiblity that 
// each class can have their own logic in that specific step.
// The Template Method pattern is a behavioral design pattern that defines the skeleton of an algorithm in a method, called the template method, and allows subclasses to override specific steps of the algorithm without changing its structure. This pattern is useful when you want to define a common algorithm for a group of related classes but allow each class to provide its own implementation for specific steps of the algorithm, and it promotes flexibility by allowing you to change the implementation of specific steps without affecting the overall structure of the algorithm.

// Pros:
// 1. Code reuse: The Template Method pattern promotes code reuse by allowing you to define a common algorithm in a template method and allowing subclasses to provide their own implementation for specific steps, which promotes maintainability and scalability.
// 2. Flexibility: The Template Method pattern allows for flexibility by allowing subclasses to provide their own implementation for specific steps of the algorithm, which promotes adaptability to changing requirements.
// 3. Open/Closed Principle: The Template Method pattern follows the Open/Closed Principle  by allowing you to extend the behavior of an algorithm by adding new subclasses without modifying the existing code, which promotes scalability and maintainability.
// Cons:
// 1. Complexity: The Template Method pattern can introduce additional complexity to the codebase, especially if there are many steps in the algorithm and a large number of subclasses to manage.
// 2. Inflexibility: The Template Method pattern can be inflexible if the algorithm needs to be changed in a way that affects the overall structure of the algorithm, as it may require changes to the template method and all subclasses, which can make the code more difficult to understand and maintain.

using System;

public abstract class PaymentFlow
{
    protected abstract void ValidateRequest();
    protected abstract void CalculateFees();
    protected abstract void DebitAmount();
    protected abstract void CreditAmount();
    public void ProcessPayment()
    {
        ValidateRequest(); // Step-1: Validate the payment request
        DebitAmount(); // Step-2: Debit the amount from the payer's account
        CalculateFees(); // Step-3: Calculate the fees for the payment
        CreditAmount(); // Step-4: Credit the amount to the payee's account
    }   
}

public class PayToFriendPaymentFlow : PaymentFlow
{
    protected override void ValidateRequest()
    {
        Console.WriteLine("Validating request for Pay to Friend payment.");
    }

    protected override void CalculateFees()
    {
        Console.WriteLine("Calculating fees for Pay to Friend payment.");
    }

    protected override void DebitAmount()
    {
        Console.WriteLine("Debiting amount for Pay to Friend payment.");
    }

    protected override void CreditAmount()
    {
        Console.WriteLine("Crediting amount for Pay to Friend payment.");
    }
}

public class PayToMerchantPaymentFlow : PaymentFlow
{
    protected override void ValidateRequest()
    {
        Console.WriteLine("Validating request for Pay to Merchant payment.");
    }

    protected override void CalculateFees()
    {
        Console.WriteLine("Calculating fees for Pay to Merchant payment.");
    }

    protected override void DebitAmount()
    {
        Console.WriteLine("Debiting amount for Pay to Merchant payment.");
    }

    protected override void CreditAmount()
    {
        Console.WriteLine("Crediting amount for Pay to Merchant payment.");
    }
}

// Client code
public class Client
{
    public static void Main(string[] args)
    {
        PaymentFlow payToFriendPaymentFlow = new PayToFriendPaymentFlow();
        payToFriendPaymentFlow.ProcessPayment();

        PaymentFlow payToMerchantPaymentFlow = new PayToMerchantPaymentFlow();
        payToMerchantPaymentFlow.ProcessPayment();

        // Output:
        // Validating request for Pay to Friend payment.
        // Debiting amount for Pay to Friend payment.
        // Calculating fees for Pay to Friend payment.
        // Crediting amount for Pay to Friend payment.
        // Validating request for Pay to Merchant payment.
        // Debiting amount for Pay to Merchant payment.
        // Calculating fees for Pay to Merchant payment.        
        // Crediting amount for Pay to Merchant payment.
    }
}
