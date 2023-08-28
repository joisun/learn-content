package day01_bitwise_operation;

public class Test {

    public static void main(String[] args) {
        testFunc(12387149);
    }

    public static void testFunc(int num) {
        for (int i = 31; i >= 0; i--) {
            String result = (num & (1 << i)) == 0 ? "0" : "1";
            System.out.print(result);
        }

    }
}


