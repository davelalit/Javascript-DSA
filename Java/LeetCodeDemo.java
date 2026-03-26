import java.util.*;

/*  */
class PairSum {
public static int countPairs(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>();
        int count = 0;
        for (int num : nums) {
            if (map.containsKey(k - num)) {
                count += map.get(k - num);
            }
            map.put(num, map.getOrDefault(num, 0) + 1);
        }
        return count;
    }
}
public class LeetCodeDemo {
    

    public static void main(String[] args) {
        int[] arr = {1, 5, 7, -1, 5};
        System.out.println(PairSum.countPairs(arr, 6)); // Output: 3
    }
}