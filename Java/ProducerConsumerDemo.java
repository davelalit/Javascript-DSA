import java.util.LinkedList;
import java.util.Queue;

class SharedBuffer {
    private final Queue<Integer> queue = new LinkedList<>();
    private final int capacity;

    public SharedBuffer(int capacity) {
        this.capacity = capacity;
    }

    public synchronized void produce(int value) throws InterruptedException {
        while (queue.size() == capacity) {
            wait(); // wait if buffer is full
        }
        queue.add(value);
        System.out.println("Produced: " + value);
        notifyAll(); // notify consumer
    }

    public synchronized int consume() throws InterruptedException {
        while (queue.isEmpty()) {
            wait(); // wait if buffer is empty
        }
        int value = queue.poll();
        System.out.println("Consumed: " + value);
        notifyAll(); // notify producer
        return value;
    }
}

public class ProducerConsumerDemo {
    public static void main(String[] args) {
        SharedBuffer buffer = new SharedBuffer(5);

        Thread producer = new Thread(() -> {
            int i = 0;
            try {
                while (true) {
                    buffer.produce(i++);
                    Thread.sleep(500);
                }
            } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
        });

        Thread consumer = new Thread(() -> {
            try {
                while (true) {
                    buffer.consume();
                    Thread.sleep(1000);
                }
            } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
        });

        producer.start();
        consumer.start();
    }
}