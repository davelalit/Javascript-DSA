// Singleton Design Pattern in C#
// Ensure a class has only one instance and provide a global point of access to it.

// 4 ways to implement Singleton pattern in C#:
// 1. Eagar Initialization: The instance is created at the time of class loading. This is the simplest way to implement a singleton, but it may lead to resource wastage if the instance is never used.
// 2. Lazy Initialization: The instance is created only when it is needed. This approach
//    is more efficient in terms of resource usage, but it requires additional code to handle thread safety.
// 3. Thread-Safe Singleton: This implementation ensures that the singleton instance is created in a thread-safe manner, preventing multiple threads from creating multiple instances simultaneously.
// 4. Double-Checked Locking: This is an optimization of the thread-safe singleton implementation that reduces the overhead of acquiring a lock by first checking if the instance is already created before acquiring the lock.

// Refer - https://www.youtube.com/watch?v=OuNOyFg942M&list=PL6W8uoQQ2c61X_9e6Net0WdYZidm7zooW&index=32

using System;
public class Singleton
{
    private static Singleton instance;

    // Private constructor to prevent instantiation from outside the class
    private Singleton() { }

    // Public method to provide access to the instance
    public static Singleton Instance
    {
        get
        {
            if (instance == null)
            {
                instance = new Singleton();
            }
            return instance;
        }
    }

    public void SomeMethod()
    {
        Console.WriteLine("Method called on singleton instance.");
    }
}
// Client code
public class Client
{
    public static void Main(string[] args)
    {
        // Access the singleton instance and call a method
        Singleton singletonInstance = Singleton.Instance;
        singletonInstance.SomeMethod();
    }
}