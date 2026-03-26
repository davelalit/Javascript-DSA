package Concurrency;
import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.RecursiveTask;

class SumTask2 extends RecursiveTask<Long> {
    private final long[] array;
    private final int start;
    private final int end;
    private static final int THRESHOLD = 10_000; // Threshold for direct computation

    SumTask2(long[] array, int start, int end) {
        this.array = array;
        this.start = start;
        this.end = end;
    }

    @Override
    protected Long compute() {
        if (end - start <= THRESHOLD) {
            long sum = 0;
            for (int i = start; i < end; i++) {
                sum += array[i];
            }
            return sum;
        } else {
            int mid = start + (end - start) / 2;
            SumTask2 leftTask = new SumTask2(array, start, mid);
            SumTask2 rightTask = new SumTask2(array, mid, end);
            
            leftTask.fork(); // Asynchronously execute the left task
            long rightResult = rightTask.compute(); // Compute the right task
            long leftResult = leftTask.join(); // Wait for the left task and get its result

            return leftResult + rightResult;
        }
    }
}

public class ForkJoinPoolExample {
    public static void main(String[] args) {
        ForkJoinPool pool = new ForkJoinPool();
        long[] array = new long[100_000];
        
        // Fill array with numbers (1 to 100_000 for demonstration)
        for (int i = 0; i < array.length; i++) {
            array[i] = i + 1;
        }

        SumTask2 task = new SumTask2(array, 0, array.length);
        long result = pool.invoke(task); // Invokes the task and waits for completion
        System.out.println("Sum: " + result);
        pool.shutdown();
    }
}
