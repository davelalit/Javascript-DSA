import java.util.*;
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
        // ✅ ArrayList Example
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
    }
}