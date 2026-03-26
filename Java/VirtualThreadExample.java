/*
## 🔹 Explanation

- **Thread.ofVirtual()**  
  Creates a new virtual thread. Unlike platform threads, these are not tied 1:1 to OS threads. Instead, they are scheduled by the JVM.

- **ExecutorService with Virtual Threads**  
  `Executors.newVirtualThreadPerTaskExecutor()` creates an executor that runs each task in its own virtual thread. This is ideal for workloads with many short-lived tasks (like handling thousands of requests).

- **Lightweight & Scalable**  
  Virtual threads are cheap to create and manage. You can easily spawn thousands without exhausting system resources, unlike traditional threads.

---

## 🔹 Key Differences: Platform vs Virtual Threads

| Feature                  | Platform Threads (Traditional) | Virtual Threads (Java 21) |
|---------------------------|--------------------------------|----------------------------|
| Backed by OS thread       | Yes                           | No (managed by JVM)        |
| Creation cost             | High                          | Very low                   |
| Scalability               | Limited (~thousands)          | Millions possible          |
| Best use case             | Long-running tasks            | High-concurrency, short tasks |

---

## 🔹 Why Use Virtual Threads?

- **Simplifies concurrency**: No need for complex async programming (CompletableFuture, reactive frameworks).  
- **Better resource utilization**: JVM handles scheduling efficiently.  
- **Ideal for I/O-bound tasks**: Database queries, network calls, microservices.  

 */
import java.util.concurrent.*;
public class VirtualThreadExample {
    public static void main(String[] args) throws InterruptedException {
        
        Thread.startVirtualThread(
    () -> System.out.println(
      "Hello from a virtual thread!"));
      
        // Example 1: Start a single virtual thread
        Thread vt = Thread.ofVirtual().start(() -> {
            System.out.println("Hello from Virtual Thread: " + Thread.currentThread());
        });
        vt.join(); // Wait for completion

        // Example 2: Using ExecutorService with Virtual Threads
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 0; i < 10; i++) {
                int taskId = i;
                executor.submit(() -> {
                    System.out.println("Task " + taskId + " running on " + Thread.currentThread());
                });
            }
        } // Executor automatically closes
    }
}