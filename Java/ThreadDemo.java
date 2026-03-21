/*
 *  Here’s a comprehensive Java example that demonstrates all the features you asked for: Threads, Multiple Threads, Thread Priority, Sleep, Runnable vs Thread,
    Race Condition, and Thread States.
 * 🔑 Key Features Demonstrated
    • 	Threads:  extends .
    • 	Multiple Threads: , , , ,  all run concurrently.
    • 	Thread Priority:  shows how scheduling can be influenced.
    • 	Sleep:  pauses execution.
    • 	Runnable vs Thread:  shows the  interface approach.
    • 	Race Condition:  increments a counter without synchronization, leading to unpredictable results.
    • 	Thread States:  shows states before and after execution.
 */

class MyThread extends Thread {
    public MyThread(String name) {
        super(name);
    }

    @Override
    public void run() {
        System.out.println(getName() + " started. State: " + getState());
        for (int i = 0; i < 3; i++) {
            System.out.println(getName() + " running iteration " + i);
            try {
                Thread.sleep(500); // Sleep demo
            } catch (InterruptedException e) {
                System.out.println(getName() + " interrupted!");
            }
        }
        System.out.println(getName() + " finished.");
    }
}

class MyRunnable implements Runnable {
    private String name;

    public MyRunnable(String name) {
        this.name = name;
    }

    @Override
    public void run() {
        System.out.println(name + " started via Runnable.");
        for (int i = 0; i < 3; i++) {
            System.out.println(name + " running iteration " + i);
            try {
                Thread.sleep(300);
            } catch (InterruptedException e) {
                System.out.println(name + " interrupted!");
            }
        }
        System.out.println(name + " finished.");
    }
}

class RaceConditionDemo {
    private int counter = 0;

    public void increment() {
        counter++;
    }

    public int getCounter() {
        return counter;
    }
}

public class ThreadDemo {
    public static void main(String[] args) throws InterruptedException {
        // Thread using Thread class
        MyThread t1 = new MyThread("Thread-1");
        MyThread t2 = new MyThread("Thread-2");

        // Thread using Runnable
        Thread t3 = new Thread(new MyRunnable("Runnable-Thread"));

        // Set priorities
        t1.setPriority(Thread.MIN_PRIORITY); // 1
        t2.setPriority(Thread.MAX_PRIORITY); // 10
        t3.setPriority(Thread.NORM_PRIORITY); // 5

        System.out.println("Initial States:");
        System.out.println(t1.getName() + " state: " + t1.getState());
        System.out.println(t2.getName() + " state: " + t2.getState());
        System.out.println(t3.getName() + " state: " + t3.getState());

        // Start threads
        t1.start();
        t2.start();
        t3.start();

        // Race condition demo
        RaceConditionDemo raceDemo = new RaceConditionDemo();

        Thread tr1 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                raceDemo.increment(); // Not synchronized → race condition
            }
        });

        Thread tr2 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                raceDemo.increment();
            }
        });

        tr1.start();
        tr2.start();

        tr1.join();
        tr2.join();

        System.out.println("Race Condition Counter (expected 2000): " + raceDemo.getCounter());

        // Wait for other threads to finish
        t1.join();
        t2.join();
        t3.join();

        System.out.println("Final States:");
        System.out.println(t1.getName() + " state: " + t1.getState());
        System.out.println(t2.getName() + " state: " + t2.getState());
        System.out.println(t3.getName() + " state: " + t3.getState());
    }
}