import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

public class ProducerConsumerBQ {
    public static void main(String[] args) {
        BlockingQueue<Integer> queue = new ArrayBlockingQueue<>(5);

        Thread producer = new Thread(() -> {
            int i = 0;
            try {
                while (true) {
                    queue.put(i); // waits if full
                    System.out.println("Produced: " + i);
                    i++;
                    Thread.sleep(500);
                }
            } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
        });

        Thread consumer = new Thread(() -> {
            try {
                while (true) {
                    int value = queue.take(); // waits if empty
                    System.out.println("Consumed: " + value);
                    Thread.sleep(1000);
                }
            } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
        });

        producer.start();
        consumer.start();
    }
}