instance 指的是实例的意思， 通过`instanceof` 能够用于判断某个 "对象"  是否为 "某个类" 的实例；该关键字将会返回一个布尔值。 

```java
//基类
package com.jayce.instanceofDemo;
public class Father {
}
=================================
//子类
package com.jayce.instanceofDemo;
public class Son extends Father{
}
```

```java
package com.jayce.instanceofDemo;

public class Application {
    public static void main(String[] args) {
        Son son = new Son();
        Father father = new Father();
        System.out.println(son instanceof Object);//true
        System.out.println(father instanceof Object);//true
        System.out.println(son instanceof Son);//true
        System.out.println(father instanceof Father);//true
    }
}
```





**类之间的转换**

其实这里的内容，在之前将多态的时候就有涉及。

```java
//基类
package com.jayce.trans;
public class Person {
}
========================================
//子类
package com.jayce.trans;
public class Student extends Person{
    public void say(){
        System.out.println("say sth");
    }
}
```

```java
package com.jayce.trans;

public class Application {
    public static void main(String[] args) {
        Person ps1 = new Student();//低转高 => 不需要强制转换
        //ps1.say();//非法的调用，因为say()是 Student 类中的方法，Person中并不具备该方法。

        //如果想让ps1能够调用该方法，就需要想办法将ps1 转为Student的实例对象， 这里就是由高转低的过程 => 此时需要强制类型转换
        ((Student) ps1).say();
        //等同于
        // Student obj = (Student) ps1;
        // obj.say()
    }
}
```

