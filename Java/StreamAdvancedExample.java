/*public class InnerStreamAdvancedExample {
🔹 Explanation of Pipeline
• 	 → Keeps only orders above ₹50,000.
• 	 → Sorts orders by amount in descending order.
• 	 → Groups orders by region into a .
• 	 → Nicely prints grouped results.


Why This Is Advanced?
- Combines filtering, sorting, and grouping in one pipeline.
- Produces a structured report directly from raw data.
- Avoids imperative loops, making the code concise and expressive.

    
} */
import java.util.*;
import java.util.stream.*;

class Order {
    String customerName;
    String region;
    double amount;

    Order(String customerName, String region, double amount) {
        this.customerName = customerName;
        this.region = region;
        this.amount = amount;
    }

    public String getCustomerName() { return customerName; }
    public String getRegion() { return region; }
    public double getAmount() { return amount; }
}

public class StreamAdvancedExample {
    public static void main(String[] args) {
        List<Order> orders = List.of(
            new Order("Lalit", "South", 75000),
            new Order("Nidhi", "North", 30000),
            new Order("Arjun", "South", 120000),
            new Order("Meera", "West", 60000),
            new Order("Ravi", "North", 80000)
        );

        // Advanced Stream pipeline
        Map<String, List<Order>> highValueOrdersByRegion =
            orders.stream()
                  .filter(o -> o.getAmount() > 50000) // Step 1: Filter
                  .sorted(Comparator.comparingDouble(Order::getAmount).reversed()) // Step 2: Sort
                  .collect(Collectors.groupingBy(Order::getRegion)); // Step 3: Group

        // Print results
        highValueOrdersByRegion.forEach((region, orderList) -> {
            System.out.println("Region: " + region);
            orderList.forEach(o -> 
                System.out.println("  " + o.getCustomerName() + " -> ₹" + o.getAmount()));
        });
    }
}