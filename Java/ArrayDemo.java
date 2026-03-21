/*
📝 Explanation of Features
- Methods → Defined in MathUtil.
- Method Overloading → Same method name add with different parameters.
- Stack vs Heap → Variables on stack, objects on heap.
- Need of Array → Store multiple values of same type.
- Creation of Array → int[] numbers = new int[5];.
- Multi-dimensional Array → int[][] matrix.
- Jagged Array → Rows of different lengths.
- 3D Array → int[][][] cube.
- Drawbacks of Array → Fixed size, no dynamic resizing, homogeneous data only.
- Array of Objects → Student[] students.
- Enhanced for loop → Simplified iteration (for (int num : numbers)).

 */
// package demo;

// Class with methods and method overloading
class MathUtil {
    // Simple method
    int add(int a, int b) {
        return a + b;
    }

    // Method overloading (same name, different parameters)
    double add(double a, double b) {
        return a + b;
    }

    int add(int a, int b, int c) {
        return a + b + c;
    }
}

// Class for array of objects
class Student {
    String name;
    int age;

    Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    void display() {
        System.out.println("Student: " + name + ", Age: " + age);
    }
}

public class ArrayDemo {
    public static void main(String[] args) {
        // Methods and Overloading
        MathUtil util = new MathUtil();
        System.out.println("Add int: " + util.add(5, 3));
        System.out.println("Add double: " + util.add(2.5, 3.5));
        System.out.println("Add three ints: " + util.add(1, 2, 3));

        // Stack vs Heap (conceptual)
        // - Local variables (like 'util') live on stack
        // - Objects (like new MathUtil()) live on heap

        // Need of Array: store multiple values of same type
        int[] numbers = new int[5]; // Creation of Array
        for (int i = 0; i < numbers.length; i++) {
            numbers[i] = i * 2;
        }

        // Enhanced for loop
        System.out.println("1D Array:");
        for (int num : numbers) {
            System.out.println(num);
        }

        // Multi-dimensional Array (2D)
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6}
        };
        System.out.println("2D Array:");
        for (int[] row : matrix) {
            for (int val : row) {
                System.out.print(val + " ");
            }
            System.out.println();
        }

        // Jagged Array (rows of different lengths)
        int[][] jagged = new int[3][];
        jagged[0] = new int[]{1, 2};
        jagged[1] = new int[]{3, 4, 5};
        jagged[2] = new int[]{6};
        System.out.println("Jagged Array:");
        for (int[] row : jagged) {
            for (int val : row) {
                System.out.print(val + " ");
            }
            System.out.println();
        }

        // 3D Array
        int[][][] cube = new int[2][2][2];
        int counter = 1;
        for (int i = 0; i < cube.length; i++) {
            for (int j = 0; j < cube[i].length; j++) {
                for (int k = 0; k < cube[i][j].length; k++) {
                    cube[i][j][k] = counter++;
                }
            }
        }
        System.out.println("3D Array:");
        for (int[][] plane : cube) {
            for (int[] row : plane) {
                for (int val : row) {
                    System.out.print(val + " ");
                }
                System.out.println();
            }
            System.out.println("---");
        }

        // Drawbacks of Array:
        // - Fixed size
        // - Cannot store mixed types
        // - No built-in dynamic resizing (use ArrayList instead)

        // Array of Objects
        Student[] students = new Student[3];
        students[0] = new Student("Alice", 20);
        students[1] = new Student("Bob", 22);
        students[2] = new Student("Charlie", 19);

        System.out.println("Array of Objects:");
        for (Student s : students) {
            s.display();
        }
    }
}