/*
The race condition has been fixed by adding the synchronized keyword 
to the increment() method. Now only one thread can execute it at a time, 
making the count++ operation thread-safe. The final count will consistently 
be 2000 instead of an unpredictable lower value.
 */

import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.*;

class Counter {
    int count = 0;
    // void increment() { count++; }
    synchronized void increment() { count++; }
}

class AtomicCounter {
    AtomicInteger count = new AtomicInteger(0);
    void increment() { count.getAndIncrement(); }
}

class SharedData {
    volatile boolean flag = false;
}

class MyThread2 extends Thread {
    SharedData data;
    MyThread2(SharedData data) {
        this.data = data;
    }

    public void run() {
        while (!data.flag) {
            // Busy-wait until flag is true
        }
        System.out.println("Flag changed!");
    }
}

public class RaceConditionDemo {
    public static void main(String[] args) throws InterruptedException, ExecutionException {
        Counter c = new Counter();
        Thread t1 = new Thread(() -> { for (int i = 0; i < 1000; i++) c.increment(); });
        Thread t2 = new Thread(() -> { for (int i = 0; i < 1000; i++) c.increment(); });
        t1.start(); t2.start();
        t1.join(); t2.join();
        System.out.println("Counter Final count: " + c.count);

        AtomicCounter ac = new AtomicCounter();
        Thread act1 = new Thread(() -> { for (int i = 0; i < 1000; i++) ac.increment(); });
        Thread act2 = new Thread(() -> { for (int i = 0; i < 1000; i++) ac.increment(); });
        act1.start(); act2.start();
        act1.join(); act2.join();
        System.out.println("AtomicCounter Final count: " + ac.count.get());

        /*
        - MyThread2 keeps checking flag.
        - When main() sets flag = true, the change is immediately visible to MyThread2 because flag is volatile.
        - Without volatile, MyThread2 might never see the change due to caching.

        Volatile keyword can be used with boolean flag/state and shared object reference 
        to ensure that changes made by one thread are immediately visible to other threads. 
        This is known as volatile read, which ensures that changes made by one thread are immediately visible to other threads.
        but for Counters(count++)(Not atomic) and compound conditions(Needs synchronization) its not working as expected.
        
         */
        SharedData data = new SharedData();
        MyThread2 t = new MyThread2(data);
        t.start();

        Thread.sleep(1000); // Simulate delay
        data.flag = true;   // Change flag from main thread
        System.out.println("Flag changed from main thread!");

        ExecutorService executor = Executors.newFixedThreadPool(2);
        Future<Integer> result = executor.submit(() -> {
            return 42; // Simulated computation
        });
        System.out.println("Result: " + result.get());
        executor.shutdown();


    }
}

