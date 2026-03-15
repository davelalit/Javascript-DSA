// Flyweight Pattern in C# (lightweight boxer)
// This pattern helps to reduce memory usage by sharing data among multiple objects. It is used when we have a large number of similar objects that share common data, and we want to minimize memory usage by sharing the common data among the objects.
// The Flyweight pattern is a structural design pattern that allows you to share objects to support a large number of fine-grained objects efficiently. This pattern is useful when you have a large number of similar objects that share common data, and you want to minimize memory usage by sharing the common data among the objects.

// Intrinsic data (Common): shared among all objects and remain same once defined one value.
// Extrinsic data: change based on client input and differs from one object to another. It is not shared and is stored outside the flyweight objects.   

// From Object, remove all the extrinsic data and keep only intinsic data(this object is called flyweight object).
// Client will pass the extrinsic data as parameters to the method of flyweight object. This way we can share the common data among multiple objects and reduce memory usage.
// Extrinsic data can be passed in the parameter to the Flyweight class.
// Caching can be used for the Flyweight object and used whenever required. This way we can avoid creating multiple objects for the same intrinsic data and further reduce memory usage.

// Pros:
// 1. Memory efficiency: The Flyweight pattern can significantly reduce memory usage by sharing common data among multiple objects, which can be especially beneficial when dealing with a large number of similar objects.
// 2. Improved performance: The Flyweight pattern can improve performance by reducing the number of objects that need to be created and managed, which can lead to faster object creation and reduced memory overhead.
// 3. Separation of concerns: The Flyweight pattern promotes separation of concerns by allowing you to separate the intrinsic state (shared data) from the extrinsic state (unique data), which can lead to better code organization and maintainability.
// Cons:
// 1. Complexity: The Flyweight pattern can introduce additional complexity to the codebase, especially if there are many types of flyweights and a large number of objects to manage, which can make the code more difficult to understand and maintain.
// 2. Performance overhead: The Flyweight pattern can add performance overhead to the code, as it requires additional classes and interfaces to be defined, and the flyweight may need to perform additional operations to manage the shared data, which can make the code more difficult to understand and maintain.

interface IRobot
{
    void display(int x, int y);
}
public class Sprites{}
public class HumanoidRobot : IRobot
{
    // Keep only intinsic data
    private string type; // Intrinsic data (shared among all robots)
    private Sprites body; // Intrinsic data (shared among all robots)

    public HumanoidRobot(string type, Sprites body)
    {
        this.type = type;
        this.body = body;
    }
    public void display(int x, int y) // Extrinsic data (unique to each robot) will be passed as parameters to the method
    {
        Console.WriteLine($"Displaying {type} robot at coordinates ({x}, {y})");
    }
}

public class RoboticDog : IRobot
{
    // Keep only intinsic data
    private string type; // Intrinsic data (shared among all robots)
    private Sprites body; // Intrinsic data (shared among all robots)

    public RoboticDog(string type, Sprites body)
    {
        this.type = type;
        this.body = body;
    }
    public void display(int x, int y) // Extrinsic data (unique to each robot) will be passed as parameters to the method
    {
        Console.WriteLine($"Displaying {type} robot at coordinates ({x}, {y})");
    }
}

public class RobotFactory
{
    private Dictionary<string, IRobot> robotCache = new Dictionary<string, IRobot>(); // Cache to store flyweight objects

    public IRobot getRobot(string type)
    {
        if (!robotCache.ContainsKey(type))
        {
            // Create a new robot and add it to the cache
            if (type == "Humanoid")
            {
                robotCache[type] = new HumanoidRobot(type, new Sprites());
            }
            else if (type == "Dog")
            {
                robotCache[type] = new RoboticDog(type, new Sprites());
            }
        }
        return robotCache[type]; // return null if type is not "Humanoid" or "Dog"
    }
}

// Client code
public class Client
{
    public static void Main(string[] args)
    {
        RobotFactory factory = new RobotFactory();

        IRobot humanoid1 = factory.getRobot("Humanoid"); // This will create a new HumanoidRobot and add it to the cache
        humanoid1.display(10, 20);

        IRobot humanoid2 = factory.getRobot("Humanoid"); // This will return the existing HumanoidRobot from the cache, as it has the same intrinsic data (type and body) as humanoid1
        humanoid2.display(30, 40);

        IRobot dog1 = factory.getRobot("Dog");
        dog1.display(50, 60);

        IRobot dog2 = factory.getRobot("Dog");
        dog2.display(70, 80);
    }
}
