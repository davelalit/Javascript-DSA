// Composite Pattern C#
// This pattern helps in scenarios where we have OBJCET inside OBJECT(tree like structure) and we want to perform some operations on them.
// The Composite pattern is a structural design pattern that allows you to compose objects into tree structures to
// represent part-whole hierarchies. This pattern is useful when you want to treat individual objects and compositions of objects uniformly, and it promotes flexibility by allowing you to work with complex tree structures without needing to know the specific types of objects in the tree.

// Pros:
// 1. Uniformity: The Composite pattern allows you to treat individual objects and compositions of objects uniformly, which promotes flexibility and maintainability.
// 2. Simplified client code: The Composite pattern simplifies client code by allowing you to work with complex tree structures without needing to know the specific types of objects in the tree, which promotes maintainability and scalability.
// 3. Extensibility: The Composite pattern allows for easy addition of new types of components and composites without modifying existing code, which promotes scalability.
// Cons:
// 1. Complexity: The Composite pattern can introduce additional complexity to the codebase, especially if there are many types of components and composites and a large number of objects in the tree.
// 2. Performance overhead: The Composite pattern can add performance overhead to the code, as it requires additional classes and interfaces to be defined, and the tree structure may require additional operations to traverse and manipulate, which can make the code more difficult to understand and maintain.


using System;

public interface FileSystem
{
    void ls();
}

public class File : FileSystem
{
    public void ls()
    {
        Console.WriteLine("File content");
    }
}

public class Directory : FileSystem
{
    private List<FileSystem> fileSystems = new List<FileSystem>();

    public void add(FileSystem fileSystem)
    {
        fileSystems.Add(fileSystem);
    }

    public void ls()
    {
        foreach (var fileSystem in fileSystems)
        {
            fileSystem.ls();
        }
    }
}

// Client code
public class Client
{
    public static void Main(string[] args)
    {
        Directory root = new Directory();
        File file1 = new File();
        File file2 = new File();
        root.add(file1);
        root.add(file2);

        Directory subDir = new Directory();
        File file3 = new File();
        subDir.add(file3);
        root.add(subDir);

        Console.WriteLine("Listing root directory:");
        root.ls();

        Console.WriteLine("Listing sub directory:");
        subDir.ls();
        // Output:
        // Listing root directory:
        // File content
        // File content
        // File content
        // Listing sub directory:
        // File content
    }
}
