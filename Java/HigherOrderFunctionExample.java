import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.function.Function;
import java.util.function.Predicate;

public class HigherOrderFunctionExample {

    // A higher-order function that takes a Predicate as an argument
    public static <T> List<T> filterList(List<T> list, Predicate<T> predicate) {
        return list.stream()
                   .filter(predicate)
                   .collect(Collectors.toList());
    }

     // A higher-order function that returns a Function
    public static Function<Integer, Integer> createMultiplier(int factor) {
        // Returns a lambda expression (function)
        return x -> x * factor;
    }

    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // A lambda expression implementing the Predicate functional interface
        Predicate<Integer> isEven = number -> number % 2 == 0;

        // Calling the higher-order function, passing the Predicate (function) as an argument
        List<Integer> evenNumbers = filterList(numbers, isEven);

        System.out.println("Original list: " + numbers);
        System.out.println("Even numbers: " + evenNumbers);


        // Call the higher-order function to get a specific function (multiply by 5)
        Function<Integer, Integer> multiplyByFive = createMultiplier(5);

        // Use the returned function
        int result = multiplyByFive.apply(10);
        System.out.println("Result of multiplying 10 by 5: " + result); // Outputs 50

        // Get another function (multiply by 2)
        Function<Integer, Integer> multiplyByTwo = createMultiplier(2);
        int result2 = multiplyByTwo.apply(10);
        System.out.println("Result of multiplying 10 by 2: " + result2); // Outputs 20



        // Use List.of() to create an immutable list
        List<String> names = List.of("Alice", "Bob", "Charlie");

        // Map is a higher-order function that uses a function (toUpperCase)
        // to transform elements into a new, immutable list.
        List<String> upperCaseNames = names.stream()
            .map(String::toUpperCase)
            .collect(Collectors.toList());

        System.out.println("Original list (immutable): " + names);
        System.out.println("New list (transformed): " + upperCaseNames);
        // Output:
        // Original list (immutable): [Alice, Bob, Charlie]
        // New list (transformed): [ALICE, BOB, CHARLIE]
    }
}