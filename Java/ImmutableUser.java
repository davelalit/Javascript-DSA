import java.util.HashMap;
import java.util.Map;

// 1. Class is final
public final class ImmutableUser {
    // 2. Fields are private and final
    private final String name;
    private final int id;
    private final Map<String, String> metadata;

    // 3. Initialize fields via constructor
    public ImmutableUser(String name, int id, Map<String, String> metadata) {
        this.name = name;
        this.id = id;
        
        // 4. Defensive copy for mutable objects during initialization
        Map<String, String> tempMap = new HashMap<>();
        for (Map.Entry<String, String> entry : metadata.entrySet()) {
            tempMap.put(entry.getKey(), entry.getValue());
        }
        this.metadata = tempMap;
    }

    public String getName() {
        return name;
    }

    public int getId() {
        return id;
    }

    // 5. Defensive copy when returning mutable objects
    public Map<String, String> getMetadata() {
        return new HashMap<>(metadata);
    }
}
