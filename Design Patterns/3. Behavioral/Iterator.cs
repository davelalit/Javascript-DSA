// Iterator Pattern in C# 
// that provides a way to accesss element from a collection sequentially without exposing its underlying representation. This pattern is useful when you want to provide a standard way to traverse a collection of objects without exposing the underlying implementation of the collection, and it promotes flexibility by allowing you to change the underlying collection implementation without affecting the client code that uses the iterator.
// The Iterator pattern is a behavioral design pattern that provides a way to access the elements of an aggregate object sequentially without exposing its underlying representation. This pattern is useful when you want to provide a standard way to traverse a collection of objects without exposing the underlying implementation of the collection, and it promotes flexibility by allowing you to change the underlying collection implementation without affecting the client code that uses the iterator.
// This pattern provides a way to access the elements of an aggregate object sequentially without exposing its underlying representation.

// Pros:
// 1. Encapsulation: The Iterator pattern promotes encapsulation by hiding the underlying implementation of the collection, which promotes maintainability and scalability.
// 2. Flexibility: The Iterator pattern allows you to change the underlying collection implementation without affecting the client code that uses the iterator, which promotes adaptability to changing requirements.
// 3. Improved code organization: The Iterator pattern promotes better code organization by separating the traversal    logic from the collection implementation, which promotes maintainability and scalability.
// Cons:
// 1. Complexity: The Iterator pattern can introduce additional complexity to the codebase, especially if there are many types of collections and iterators and a large number of classes to manage.
// 2. Performance overhead: The Iterator pattern can add performance overhead to the code, as it requires additional classes and interfaces to be defined, and the iterator may need to perform additional operations to traverse the collection, which can make the code more difficult to understand and maintain.

public class Book
{
    private int price;
    private Stering bookName;
    public Book(int price, string bookName)
    {
        this.price = price;
        this.bookName = bookName;
    }
    public int getPrice()
    {
        return price;
    }
    public string getBookName()
    {
        return bookName;
    }
}

public class Library
{
    private List<Book> booksList;
    public Library(List<Book> booksList)
    {
        this.booksList = booksList;
    }

    public Iterator createIterator()
    {
        return new BookIterator(booksList);
    }
}

public interface Iterator
{
    bool hasNext();
    Book next();
}

public class BookIterator : Iterator
{
    private List<Book> booksList;
    private int index = 0;
    public BookIterator(List<Book> booksList)
    {
        this.booksList = booksList;
    }
    public bool hasNext()
    {
        return index < booksList.Count;
    }
    public Book next()
    {
        if (hasNext())
        {
            return booksList[index++];
        }
        return null;
    }
}

// Client code
public class Client
{
    public static void Main(string[] args)
    {
        List<Book> books = new List<Book>
        {
            new Book(10, "Book 1"),
            new Book(20, "Book 2"),
            new Book(30, "Book 3")
        };
        Library library = new Library(books);
        Iterator iterator = library.createIterator();
        while (iterator.hasNext())
        {
            Book book = iterator.next();
            Console.WriteLine("Book Name: " + book.getBookName() + ", Price: " + book.getPrice());
        }
        // Output:
        // Book Name: Book 1, Price: 10
        // Book Name: Book 2, Price: 20
        // Book Name: Book 3, Price: 30
    }
}