import java.util.concurrent.locks.ReentrantLock;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class CustomConcurrentHashMap<K, V> {
    private static final int DEFAULT_CAPACITY = 16;

    // Each bucket has its own lock
    private final Bucket<K, V>[] buckets;

    @SuppressWarnings("unchecked")
    public CustomConcurrentHashMap(int capacity) {
        buckets = new Bucket[capacity];
        for (int i = 0; i < capacity; i++) {
            buckets[i] = new Bucket<>();
        }
    }

    public CustomConcurrentHashMap() {
        this(DEFAULT_CAPACITY);
    }

    private int getBucketIndex(Object key) {
        return Math.abs(key.hashCode() % buckets.length);
    }

    public void put(K key, V value) {
        int index = getBucketIndex(key);
        buckets[index].put(key, value);
    }

    public V get(K key) {
        int index = getBucketIndex(key);
        return buckets[index].get(key);
    }

    public void remove(K key) {
        int index = getBucketIndex(key);
        buckets[index].remove(key);
    }

    // Inner bucket class with its own lock
    private static class Bucket<K, V> {
        private final ReadWriteLock lock = new ReentrantReadWriteLock();
        private Node<K, V> head;

        public void put(K key, V value) {
            lock.writeLock().lock();
            try {
                Node<K, V> node = head;
                while (node != null) {
                    if (node.key.equals(key)) {
                        node.value = value;
                        return;
                    }
                    node = node.next;
                }
                head = new Node<>(key, value, head);
            } finally {
                lock.writeLock().unlock();
            }
        }

        public V get(K key) {
            lock.readLock().lock();
            try {
                Node<K, V> node = head;
                while (node != null) {
                    if (node.key.equals(key)) {
                        return node.value;
                    }
                    node = node.next;
                }
                return null;
            } finally {
                lock.readLock().unlock();
            }
        }

        public void remove(K key) {
            lock.writeLock().lock();
            try {
                Node<K, V> prev = null;
                Node<K, V> node = head;
                while (node != null) {
                    if (node.key.equals(key)) {
                        if (prev == null) {
                            head = node.next;
                        } else {
                            prev.next = node.next;
                        }
                        return;
                    }
                    prev = node;
                    node = node.next;
                }
            } finally {
                lock.writeLock().unlock();
            }
        }
    }

    // Node class for linked list
    private static class Node<K, V> {
        final K key;
        V value;
        Node<K, V> next;

        Node(K key, V value, Node<K, V> next) {
            this.key = key;
            this.value = value;
            this.next = next;
        }
    }
}