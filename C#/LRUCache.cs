using System;
using System.Collections.Generic;

public class LRUCache<K, V>
{
    private readonly int capacity;
    private readonly Dictionary<K, LinkedListNode<(K key, V value)>> cacheMap; // Key to node mapping for O(1) access
    private readonly LinkedList<(K key, V value)> lruList; // Maintains order of usage: most recently used at front, least at back

    public LRUCache(int capacity)
    {
        if (capacity <= 0) throw new ArgumentException("Capacity must be > 0");
        this.capacity = capacity;
        cacheMap = new Dictionary<K, LinkedListNode<(K, V)>>();
        lruList = new LinkedList<(K, V)>();
    }

    public V Get(K key)
    {
        if (!cacheMap.TryGetValue(key, out var node))
            throw new KeyNotFoundException("Key not found in cache");

        // Move accessed node to front (most recently used)
        lruList.Remove(node);
        lruList.AddFirst(node);

        return node.Value.value;
    }

    public void Put(K key, V value)
    {
        if (cacheMap.TryGetValue(key, out var node))
        {
            // Update existing node
            lruList.Remove(node);
        }
        else if (cacheMap.Count >= capacity)
        {
            // Evict least recently used (last node)
            var lruNode = lruList.Last;
            lruList.RemoveLast();
            cacheMap.Remove(lruNode.Value.key);
        }

        // Insert new node at front
        var newNode = new LinkedListNode<(K, V)>((key, value));
        lruList.AddFirst(newNode);
        cacheMap[key] = newNode;
    }
}

// Client code
public class Client
{
    public static void Main(string[] args)
    {
       var tradeCache = new LRUCache<string, string>(3);

tradeCache.Put("AAPL", "Apple Inc metadata");
tradeCache.Put("MSFT", "Microsoft metadata");
tradeCache.Put("GOOG", "Google metadata");

// Access AAPL → moves to front
Console.WriteLine(tradeCache.Get("AAPL"));

// Insert new item → evicts least recently used (MSFT if not accessed)
tradeCache.Put("TSLA", "Tesla metadata");
    }
}

