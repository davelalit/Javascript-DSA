// Proxy Pattern C#
// The Proxy pattern is a structural design pattern that provides a surrogate or placeholder for another object to control access to it.
// This pattern is useful when you want to add additional functionality to an object without modifying its structure
// or when you want to control access to an object, such as in the case of lazy initialization, access control, or logging.

// Pros:
// 1. Control over object access: The Proxy pattern allows you to control access to an
//    object, which can be useful for implementing lazy initialization, access control, or logging.
// 2. Additional functionality: The Proxy pattern allows you to add additional functionality to an object without modifying its structure, which promotes flexibility and maintainability.
// 3. Separation of concerns: The Proxy pattern promotes separation of concerns by allowing you to separate the core functionality of an object from the additional functionality provided by the proxy, which promotes maintainability and scalability.
// Cons:
// 1. Complexity: The Proxy pattern can introduce additional complexity to the codebase, especially if there are many types of proxies and a large number of objects to proxy.
// 2. Performance overhead: The Proxy pattern can add performance overhead to the code, as it requires additional classes and interfaces to be defined, and the proxy may need to perform additional operations before or after delegating to the real object, which can make the code more difficult to understand and maintain.

// Refer - https://www.youtube.com/watch?v=WxGtmIBZszk&list=PL6W8uoQQ2c61X_9e6Net0WdYZidm7zooW&index=37

interface EmployeeDao
{
    void create();
}

class EmployeeDaoImpl : EmployeeDao
{
    public void create()
    {
        Console.WriteLine("Employee created in database.");
    }
}

class EmployeeDaoProxy : EmployeeDao
{
    private EmployeeDaoImpl employeeDao;

    public void create()
    {
        if (employeeDao == null)
        {
            employeeDao = new EmployeeDaoImpl();
        }
        Console.WriteLine("Logging: Creating employee...");
        employeeDao.create();
    }
}

// Client code
public class Client
{
    public static void Main(string[] args)
    {
        EmployeeDao employeeDao = new EmployeeDaoProxy();
        employeeDao.create();

        // Output:
        // Logging: Creating employee...
        // Employee created in database.
    }
}