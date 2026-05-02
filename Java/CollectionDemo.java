import java.util.*;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.ConcurrentSkipListSet;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.*;

class Person implements Comparable<Person> {
    String name;
    int age;

    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Comparable: natural ordering by age
    @Override
    public int compareTo(Person other) {
        return Integer.compare(this.age, other.age);
    }

    @Override
    public String toString() {
        return name + " (" + age + ")";
    }
}

// Comparator: custom ordering by name
class NameComparator implements Comparator<Person> {
    @Override
    public int compare(Person p1, Person p2) {
        return p1.name.compareTo(p2.name);
    }
}

public class CollectionDemo {
    public static void main(String[] args) {
        // ✅ ArrayList Exampleh
        List<Person> people = new ArrayList<>();
        people.add(new Person("Alice", 30));
        people.add(new Person("Bob", 25));
        people.add(new Person("Charlie", 35));

        System.out.println("ArrayList:");
        people.forEach(System.out::println);

        // ✅ Set Example (removes duplicates)
        Set<String> cities = new HashSet<>(Arrays.asList("Bengaluru", "Delhi", "Mumbai", "Delhi"));
        System.out.println("\nSet (unique values): " + cities);

        // ✅ Map Example
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Math", 90);
        scores.put("Science", 85);
        scores.put("English", 92);
        System.out.println("\nMap:");
        scores.forEach((subject, score) -> System.out.println(subject + " -> " + score));

        // ✅ Comparable vs Comparator
        System.out.println("\nSorted by age (Comparable):");
        Collections.sort(people);
        people.forEach(System.out::println);

        System.out.println("\nSorted by name (Comparator):");
        Collections.sort(people, new NameComparator());
        people.forEach(System.out::println);

        // ✅ Stream API (Need: functional style, concise, parallelizable)
        System.out.println("\nStream API Examples:");

        // forEach with Stream
        people.stream().forEach(p -> System.out.println("Person: " + p));

        // filter
        List<Person> adults = people.stream()
                .filter(p -> p.age >= 30)
                .collect(Collectors.toList());
        System.out.println("\nFiltered (age >= 30): " + adults);

        // map
        List<String> names = people.stream()
                .map(p -> p.name.toUpperCase())
                .collect(Collectors.toList());
        System.out.println("\nMapped (names to uppercase): " + names);

        // reduce
        int totalAge = people.stream()
                .map(p -> p.age)
                .reduce(0, Integer::sum);
        System.out.println("\nReduced (sum of ages): " + totalAge);

        // sorted
        List<Person> sortedByAge = people.stream()
                .sorted(Comparator.comparingInt(p -> p.age))
                .collect(Collectors.toList());
        System.out.println("\nSorted with Stream (by age): " + sortedByAge);

        // HashMap example: Allows nulls
        Map<Integer, String> hashMap = new HashMap<>();
        hashMap.put(1, "Java");
        hashMap.put(null, "Null Key allowed"); // Works
        hashMap.put(2, null);                  // Works
        System.out.println("HashMap: " + hashMap);

        // Hashtable example: Does NOT allow nulls
        try {
            Map<Integer, String> hashtable = new Hashtable<>();
            hashtable.put(1, "Java");
            // hashtable.put(null, "Error");    // Throws NullPointerException
            // hashtable.put(2, null);         // Throws NullPointerException
            System.out.println("Hashtable: " + hashtable);
        } catch (NullPointerException e) {
            System.out.println("Hashtable Error: Nulls are not permitted.");
        }

        // 1. List (ordered, allows duplicates)
        List<Trade> tradeList = new ArrayList<>();
        tradeList.add(new Trade(1, "AAPL", 150.0));
        tradeList.add(new Trade(2, "GOOG", 2800.0));
        tradeList.add(new Trade(3, "AAPL", 152.0));
        System.out.println("List: " + tradeList);

        // 2. Set (unique elements)
        Set<String> symbols = new HashSet<>();
        symbols.add("AAPL");
        symbols.add("GOOG");
        symbols.add("AAPL"); // duplicate ignored
        System.out.println("Set: " + symbols);

        // 3. SortedSet (TreeSet, keeps order)
        SortedSet<Double> prices = new TreeSet<>();
        prices.add(150.0);
        prices.add(2800.0);
        prices.add(152.0);
        System.out.println("SortedSet: " + prices);

        // 4. Map (key-value)
        Map<Integer, Trade> tradeMap = new HashMap<>();
        tradeMap.put(1, new Trade(1, "AAPL", 150.0));
        tradeMap.put(2, new Trade(2, "GOOG", 2800.0));
        System.out.println("Map: " + tradeMap);

        // 5. LinkedList (queue-like operations)
        LinkedList<Trade> tradeQueue = new LinkedList<>();
        tradeQueue.add(new Trade(4, "MSFT", 300.0));
        tradeQueue.addFirst(new Trade(5, "TSLA", 700.0));
        System.out.println("LinkedList (queue): " + tradeQueue);

        // 6. Stack (LIFO)
        Stack<String> stack = new Stack<>();
        stack.push("First");
        stack.push("Second");
        System.out.println("Stack pop: " + stack.pop());

        // 7. PriorityQueue (min-heap)
        PriorityQueue<Double> pq = new PriorityQueue<>();
        pq.add(152.0);
        pq.add(150.0);
        pq.add(2800.0);
        System.out.println("PriorityQueue poll: " + pq.poll());

        // --- Concurrent Collections ---
        // 8. ConcurrentHashMap (thread-safe map)
        ConcurrentHashMap<String, AtomicInteger> volumeMap = new ConcurrentHashMap<>();
        volumeMap.put("AAPL", new AtomicInteger(0));
        volumeMap.get("AAPL").incrementAndGet();
        System.out.println("ConcurrentHashMap: " + volumeMap);

        // 9. CopyOnWriteArrayList (safe for iteration under concurrency)
        CopyOnWriteArrayList<String> safeList = new CopyOnWriteArrayList<>();
        safeList.add("Thread1");
        safeList.add("Thread2");
        System.out.println("CopyOnWriteArrayList: " + safeList);

        // 10. BlockingQueue (producer-consumer)
        BlockingQueue<Trade> blockingQueue = new ArrayBlockingQueue<>(10);
        blockingQueue.offer(new Trade(6, "NFLX", 500.0));
        System.out.println("BlockingQueue take: " + blockingQueue.poll());

        // 11. ConcurrentLinkedQueue (lock-free queue)
        ConcurrentLinkedQueue<String> clq = new ConcurrentLinkedQueue<>();
        clq.add("Event1");
        clq.add("Event2");
        System.out.println("ConcurrentLinkedQueue poll: " + clq.poll());

        // 12. ConcurrentSkipListSet (sorted, concurrent)
        ConcurrentSkipListSet<Double> skipListSet = new ConcurrentSkipListSet<>();
        skipListSet.add(100.0);
        skipListSet.add(200.0);
        System.out.println("ConcurrentSkipListSet: " + skipListSet);
    }
}

class Trade {
    final int id;
    final String symbol;
    final double price;

    Trade(int id, String symbol, double price) {
        this.id = id;
        this.symbol = symbol;
        this.price = price;
    }

    @Override
    public String toString() {
        return symbol + "@" + price;
    }
}