public class Demo {
    public static void main(String[] args) {

        String  paragraph = "I am in an interview for Nomura. current time is 5 PM";
        int wordCount = 10;
        Map<String, Integer> freq = new HashMap<String, Integer>()

        String[] output = paragraph.split(" ");
        for(String result in output){
           if(!freq.get(result)){
              freq.put(result, 1);
           }
           else {
            freq.put(result, freq.get(result) + 1)
           }
        }


        
    }
}