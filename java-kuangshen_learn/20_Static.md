[toc]

static 如果修饰方法，那么该方法就是静态方法， 如果用于修饰属性，那么就叫做静态属性。 

那么什么叫做静态属性，他和普通的属性有什么区别呢？



### 类变量

```java
//注意是在Student类中
package com.jayce.staticDemo;

public class Student {
    private static int age;//静态变量（属性）
    private double score;//非静态变量（属性）

    public static void main(String[] args) {

        //我们访问一个静态的变量，可以通过实例化的对象去访问，还可以直接通过类访问；
        //原因最最早的时候就提过，因为类中的静态变量也叫做类变量。它从属于类，在类被创建的时候就已经
        //存在了，但是非静态变量是在类被实例化之后，才会被创建。
        Student s1 = new Student();
        System.out.println(s1.age);
        System.out.println(Student.age);

        //如果访问一个非静态变量
        System.out.println(s1.score);
        //System.out.println(Student.score);//非法访问 java: 无法从静态上下文中引用非静态 变量 score
    }
}
```

### 类方法

```java
package com.jayce.staticDemo;

public class Person {
    public void run(){
        System.out.println("run methods");
    }
    public static void eat(){
        System.out.println("eat");
    }

    public static void main(String[] args) {
        //在当前类中，静态方法可以直接调用
        eat();
        //run();//非法

        //静态的方法还可以通过类直接调用
        Person.eat();


        //和属性一样，非静态方法就必须通过实例化对象去调用，但是不能直接通过类去调用。
        Person ps1 = new Person();
        ps1.run();
        ps1.eat();//当然也可以调用类静态方法
        //Person.run();//非法


    }
    //甚至在当前类中，可以在非静态方法中直接去调用静态方法, 但是注意，不能在静态方法中去调用动态方法
    public void say(){
        eat();
    }
    
}
```





### **匿名代码块**

```java
package com.jayce.staticDemo;

public class Block {
    {
        //代码块（匿名代码块）
        System.out.println("匿名代码块");
    }
    static{
        //静态代码块
        //常用于初始化一些数据
        System.out.println("静态代码块");
    }

    public Block() {
        System.out.println("无参构造");
    }

    public static void main(String[] args) {
        Block block = new Block();
        System.out.println("--------------------------");
        Block block1 = new Block();
    }
}

```

```bash
#output
静态代码块
匿名代码块
无参构造
--------------------------
匿名代码块
无参构造
```



- 匿名代码块和静态代码块是在创建对象时，就自动创建了。

- 执行顺序是 

  ```mermaid
  graph LR
  静态代码块 --> 匿名代码块 --> 构造方法
  ```

  

- 静态代码块只会执行一次





### 代码块的引申拓展

利用代码块先于构造器函数先执行的特点，我们常常可以进行一些初始化操作。 

```java
package com.jayce.staticDemo;

public class MathDemo {
    public static void main(String[] args) {
        System.out.println(Math.random());//0.6136308738095609
    }
}
```

和JavaScript 一样，`Math.random()` 方法可以用于返回一个介于0~1 的随机数。 

假设我们需频繁使用该方法，可以利用代码块的特性做一些操作以简化我们以后对该方法的调用。 

```java
 package com.jayce.staticDemo;

import static java.lang.Math.random;//静态导入包
public class MathDemo {
    public static void main(String[] args) {
        System.out.println(random());//0.8017849371004561
    }
}
```

这样，我们就可以直接执行random方法，省写了`Math.random()` 。





### `final` 修饰符

如果一个类被`final` 修饰了，那么这个类就不能够再被继承了。 

```java
package com.jayce.finalDemo;
final public class Person {
}
```

```java
package com.jayce.finalDemo;
public class Student exdents Person{//非法
}

```

