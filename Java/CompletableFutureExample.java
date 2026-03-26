import java.util.concurrent.*;
import java.util.function.Supplier;

public class CompletableFutureExample {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newFixedThreadPool(4);

        // Task 1: Simulate API call
        CompletableFuture<String> api1 = CompletableFuture.supplyAsync(() -> {
            sleep(1000);
            return "Data from API 1";
        }, executor);

        // Task 2: Simulate failure
        CompletableFuture<Object> api2 = CompletableFuture.supplyAsync(() -> {
            sleep(500);
            throw new RuntimeException("API 2 failed");
        }, executor).exceptionally(ex -> {
            System.out.println("Fallback for API 2: " + ex.getMessage());
            return "Fallback data";
        });

        // Combine results
        CompletableFuture<String> combined = api1.thenCombine(api2, (result1, result2) -> {
            return result1 + " + " + result2;
        });

        // Final result
        System.out.println("Combined Result: " + combined.get());

        executor.shutdown();
    }

    private static void sleep(int ms) {
        try { Thread.sleep(ms); } catch (InterruptedException ignored) {}
    }
}