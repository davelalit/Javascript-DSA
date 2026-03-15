// Interpreter Pattern in C#
// Define a grammer for interpreting and evaluating an expression. This pattern is useful when you want to define a language for a specific domain and provide an interpreter to interpret the sentences in that language, and it promotes flexibility by allowing you to change the grammar and interpretation logic without affecting the client code that uses the interpreter.
// The Interpreter pattern is a behavioral design pattern that defines a grammatical representation for a language and provides an interpreter to interpret the sentences in that language. This pattern is useful when you want to define a language for a specific domain and provide an interpreter to interpret the sentences in that language, and it promotes flexibility by allowing you to change the grammar and interpretation logic without affecting the client code that uses the interpreter.

// Pros:
// 1. Flexibility: The Interpreter pattern allows for flexibility by allowing you to change the grammar and interpretation logic without affecting the client code that uses the interpreter, which promotes adaptability to changing requirements.
// 2. Reusability: The Interpreter pattern promotes reusability by allowing you to
// define a language for a specific domain and provide an interpreter to interpret the sentences in that language, which promotes maintainability and scalability.
// 3. Improved code organization: The Interpreter pattern promotes better code organization by separating the grammar
// and interpretation logic into separate classes, which promotes maintainability and scalability.
// Cons:    
// 1. Complexity: The Interpreter pattern can introduce additional complexity to the codebase, especially if the grammar and interpretation logic are complex and there are many classes to manage.
// 2. Performance overhead: The Interpreter pattern can add performance overhead to the code, as it requires additional classes and interfaces to be defined, and the interpreter may need to perform additional operations to interpret the sentences, which can make the code more difficult to understand and maintain.

public class Context
{
    Dictionary<string, int> contextMap = new Dictionary<string, int>();
    public void put(string key, int value)
    {
        contextMap[key] = value;
    }
}

interface IExpression
{
    int interpret(Context context);
}

public class NumberTerminalExpression : IExpression
{
    private String stringValue;
    public NumberExpression(String stringValue)
    {
        this.stringValue = stringValue;
    }
  
    public int interpret(Context context)
    {
        return context.get(stringValue);
    }
}

public class MultiplyNonTerminalExpression : IExpression
{
    private IExpression leftExpression;
    private IExpression rightExpression;
    public MultiplyNonTerminalExpression(IExpression leftExpression, IExpression rightExpression)
    {
        this.leftExpression = leftExpression;
        this.rightExpression = rightExpression;
    }
  
    public int interpret(Context context)
    {
        return leftExpression.interpret(context) * rightExpression.interpret(context);
    }
}

// Client code
public class Client
{
    public static void Main(string[] args)
    {
        Context context = new Context();
        context.put("a", 5);
        context.put("b", 10);
        context.put("c", 3);

        IExpression expression = new MultiplyNonTerminalExpression(
            new MultiplyNonTerminalExpression(new NumberTerminalExpression("a"), new NumberTerminalExpression("b")), 
            new NumberTerminalExpression("c"));
        int result = expression.interpret(context);
        Console.WriteLine("Result: " + result);

        // Output:
        // Result: 150
    }
}

