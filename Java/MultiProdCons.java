import java.util.concurrent.*;

class Producer implements Runnable {
    private final BlockingQueue<Integer> queue;
    private final int id;

    Producer(BlockingQueue<Integer> q, int id) {
        this.queue = q;
        this.id = id;
    }

    @Override
    public void run() {
        try {
            for (int i = 0; i < 10; i++) {
                queue.put(i); // blocks if queue is full
                System.out.println("Producer " + id + " produced: " + i);
                Thread.sleep(200); // simulate production time
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}

class Consumer implements Runnable {
    private final BlockingQueue<Integer> queue;
    private final int id;

    Consumer(BlockingQueue<Integer> q, int id) {
        this.queue = q;
        this.id = id;
    }

    @Override
    public void run() {
        try {
            while (true) {
                Integer item = queue.take(); // blocks if queue is empty
                System.out.println("Consumer " + id + " consumed: " + item);
                Thread.sleep(500); // simulate processing time
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}

public class MultiProdCons {
    public static void main(String[] args) {
        BlockingQueue<Integer> queue = new ArrayBlockingQueue<>(5); // bounded queue
        ExecutorService executor = Executors.newFixedThreadPool(6);
        // Multiple producers
        for (int i = 1; i <= 2; i++) {
            executor.submit(new Producer(queue, i));
        }
        // Multiple consumers
        for (int i = 1; i <= 4; i++) {
            executor.submit(new Consumer(queue, i));
        }
        executor.shutdown();
    }
}
