[toc]

## 1. 何谓方法

`System.out.println()` 指的是 `System`类中的`out`对象中的`println()` 方法。

**Java 方法是语句的集合，她们在一起执行一个功能。**

- 方法是解决一类问题的步骤的有序组合
- 方法包含于类或者对象中
- 方法在程序中被创建，在其他地方被引用。 

**设计方法的原则：**

方法的本意是功能块，就是实现某个功能的语句块的集合。 我们设计方法的时候，最好保持方法的原子性，就是一个方法只完成一个功能， 这样利于我们后期的扩展。 

```java
// 方法的示例
public class Methods {
    //main 方法
    public static void main(String[] args) {
        int sum = add(1,2);
        System.out.println(sum);
    }

    //加法
    public static int add(int a,int b){
        return a+b;
    }
}
```



## 2. 方法的定义及调用

<span style="color:red">**方法包含一个方法头和一个方法体。** </span>下面是一个方法的所有部分:

```java
修饰符		返回值类型	方法名（[参数类型 参数名],[...],...）{
    ...
        方法体
    ...
	[return 返回值]；
}
```

- 修饰符： 这是可选的，告诉编译器如何调用该方法。定义了该方法的访问类型。
- 返回值类型： 方法可能会返回值， returnValueType 是方法返回值的数据类型。 有些方法执行所需的操作，但没有返回这。这种情况下，returnValueType 是关键字void。
- 方法名：是方法的实际名称。 方法名和参数共同构成方法签名。 
- 参数类型: 参数像是一个占位符。 当方法被调用时，传递值给参数。这个值被成为实参或变量。 参数列表是指方法的参数类型，顺序和参数的个数。 参数时可选的，方法不可以包含任何参数。 
  - 形参： 在方法被调用时用于接收外界输出的数据
  - 实参：调用方法时实际传给方法的数据
- 方法体：方法体包含具体的语句，定义该方法的功能。

**方法的调用：**

- 调用方法： 对象名.方法名（实参列表）

- Java 支持两种调用方法的方式，根据方法是否返回值来选择。

- 当方法返回一个值的时候，方法调用通常被当作一个值。 例如：

  ```java
  int larger = max(30,40);
  ```

- 如果方法返回值是void， 方法的调用一定是一条语句。

  ```java
  System.out.println("Hello world!")；
  ```


> 方法的调用扩展：
>
> **静态方法和非静态方法**
>
> 实验：
>
> file: com.jayce.methods.StaticMethodExg
>
> ```java
> package com.jayce.methods;
> 
> public class StaticMethodExg {
>     //静态方法
>     public static void staticMethod(){
>         System.out.println("这是一个静态方法调用！");
>     }
> }
> ```
>
> file: com.jayce.methods.UnStaticMethodExg
>
> ```java
> package com.jayce.methods;
> 
> public class UnStaticMethodExg {
>     //非静态方法
>     public void unStaticMethod(){
>         System.out.println("这是一个非静态方法调用！");
>     }
> }
> 
> ```
>
> file: com.jayce.methods.Methods
>
> ```java
> package com.jayce.methods;
> 
> public class Methods {
>     public static void main(String[] args) {
>          .unStaticMethod();//编辑器直接红色标红错误：Non-static method 'unStaticMethod()' cannot be referenced from a static context
>         StaticMethodExg.staticMethod();//可调用
>     }
> }
> 
> ```
>
> 以上的实验中可以知道，非静态方法不能像静态方法那样直接，通过```ClassName.Method()` 的方式去调用。  这时候，就要通过new 关键字去实例化这个非静态方法。 
>
> ```java
> //file: com.jayce.methods.Methods
> package com.jayce.methods;
> 
> public class Methods {
>     public static void main(String[] args) {
>         UnStaticMethodExg unStaMed = new UnStaticMethodExg();
>         unStaMed.unStaticMethod();//正常调用
>         
>         //简写
>         //new UnStaticMethodExg().unStaticMethod()
>     }
> }
> 
> ```
>
> 
>
> 
>
> :warning:注意
>
> 不能在一个静态方法中，直接调用非静态方法：
>
> ```java
> public class demo{
>     public static void a(){
>         b();// 错误的调用
>     };
>     public void b(){
>         
>     }
> }
> ```
>
> > 该调用方式错误的原因是， 静态方法实在class 定义的时候就已经存在了的。 而非静态方法则实际上实在class定义之后才被创建的。 
> > 在一个已经存在的静态方法中去直接调用一个还未存在的非静态方法自然是不合法的。 
>
> 

## 3. 方法的重载

**什么是重载**

重载就是在一个类中，有相同的函数名称，但是形参不同的函数。

**方法重载的规则：**

1. 方法名称必须**相同**
2. 参数列表必须**不同**（个数不同、或者类型  不同、参数排列顺序不同等）
3. 方法的返回类型可以相同也可以不相同。
4. 仅仅返回类型不同不足以成为方法的重载。

**实现理论：**

- 方法名称相同时，编译器会根据调用方法的参数个数、参数类型等去逐个匹配，以选择对应的方法，如果匹配失败，则编译器会报错。 

```java
// 方法重载的示例
public class reload {
    public static void main(String[] args) {
        double max = max(30,20);
        int max2 = max(30,20);
        System.out.println(max);
        System.out.println(max2);
    }
    public static int max(int num1,int num2){
        int res = num1 < num2 ? num2 : num1;
        return res;
    }
    public static double max(double num1, double num2){
        double res = num1 < num2 ? num2 : num1;
        return res;
    }
}

// output
30.0
30
```



## 4. 命令行传参

> 作基本了解即可

```bash
# powershell
$ pwd
java_workspace\JavaLearning\src\com\jayce\cmdParams

$  new-item CmdParams.java -type file #powersell 的文件创建命令
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----         2021/6/30     16:33              0 CmdParams.java
```

```java
// CmdParams.java
package com.jayce.cmdParams;

public class CmdParams{
    public static void main(String[] args) {
        for (int i = 0; i < args.length; i++) {
            System.out.println("args[" + i + "]:" + args[i]);
        }
    }
}
```

```java
# powershell
$ javac .\CmdParams.java
$ java CmdParams
错误: 找不到或无法加载主类 CmdParams
```

```bash
$ pwd
E:\Users\jayce\Desktop\java_workspace\JavaLearning\src\com\jayce\cmdParams
$ cd ../../../
$ pwd
E:\Users\jayce\Desktop\java_workspace\JavaLearning\src
$ java com.jayce.cmdParams.CmdParams
$ java com.jayce.cmdParams.CmdParams 我是Jayce 你好啊
args[0]:我是Jayce
args[1]:你好啊
```



## 5. 可变参数



- 在方法声明中，在指定参数类型后加一个省略号（`...`）。
- 一个方法中<span style="color:red">**只能指定一个**</span>可变参数，它<span style="color:red">**必须**</span>是一个方法的<span style="color:red">**最后一个参数**</span>。任何普通的参数必须在它之前声明。

## 6. 递归

- 利用递归可以用简单的程序来解决一些复杂的问题。它通产把一个大型复杂的问题层层转换为一个与原问题相似的规模较小的问题来求解，递归策略只需少量的程序就可以描述出解题过程所需要的多次重复计算，大大地减少了程序的代码量。 递归的能力在于用有限的语句来定义对象的无限集合。
- 递归结构包括两个部分：
  - 递归头：什么时候不调用自身方法。如果没有头，将陷入死循环。 
  - 递归体：什么时候需要调用自身的方法。

```java
// 示例 阶乘
public class JieChen {
    public static void main(String[] args) {
        int res = f(5);
        System.out.println(res);
    }
    public static int f(int n){
        if(n == 1){
            return n;
        }else{
            return n*f(n-1);
        }
    }
}

//output 
120
```



