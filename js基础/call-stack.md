### **什么是执行上下文**
执行上下文就是javascript代码被解析和执行所在环境的抽象概念

### **执行上下文类型**
执行上下文共三种类型：

1. **全局执行上下文**
    - 它是默认的、最基础的执行上下文。不在函数中代码的代码都位于全局执行上下文。它做了两件事：1、创建一个全局对象，在浏览器中这个对象就是windows。2、将this指针指向这个全局对象，一个程序只能有一个全局执行上下文
2. **函数执行上下文**
    - 每次调用函数，都会为该函数创建一个新的执行上下文，每个函数都有自己的执行上下文，但是只有在函数被调用的时候才会创建，每当一个新的执行上下文被创建，它都会按照特定的顺序执行一系列步骤，具体过程将在本文后面讨论。
3. **even执行上下文**
    -  运行在 eval 函数中的代码也获得了自己的执行上下文

### **执行栈**
执行栈。也叫调用栈，具有后进先出（LOFI）结构，用于存储在代码执行期间创建的所有执行上下文。
当javascript首次读取脚本的时候，会先创建一个全局的执行上下文并将其推入当前的执行栈。每当有一个函数调用，引擎都会为改该函数创建一个新的执行上下文并将其推入当前的执行栈的顶端（栈顶）。
引擎会运行执行上下文在栈顶的函数，执行完毕后，并将对应的执行上下文从栈顶移除，上下文控制权将移到当前执行栈的下一个执行上下文中
let a = 'Hello World!';

```
debugger
function first() {  
  console.log('Inside first function');  
  second();  
  console.log('Again inside first function');  
}

function second() {  
  console.log('Inside second function');  
}

first();  
console.log('Inside Global Execution Context');
```
具体可以打开chrome浏览器，将这段代码赋值到控制台中，查看Sources中的Call Stack中的展示
![alt 属性文本](https://user-gold-cdn.xitu.io/2018/11/5/166e258e1d0281a6?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
当代码执行完毕后，引擎会把全局执行上下文从执行栈中移除

### **执行上下文是如何被创建的**

执行上下文分两个阶段创建: **1)创建阶段； 2）执行阶段**

### **创建阶段**
1. 确定**this**值，也被称为 **This Binding**。
2. **LexicalEnvironment（词法环境）** 组件被创建。
3. **VariableEnvironment（变量环境）** 组件被创建。

直接看伪代码可能更加直观

```
ExecutionContext = {  
  ThisBinding = <this value>,     // 确定this 
  LexicalEnvironment = { ... },   // 词法环境
  VariableEnvironment = { ... },  // 变量环境
}
```
关于this（This Binding）后序会有专门一篇进行介绍。

### **词法环境**
**词法环境**由两部分组成：1）环境记录；2）对外部环境的引用
1. **环境记录**是存储变量和函数声明的位置
2. **对外部环境的引用**意味着它们可以访问其外部的词法环境

**词法环境**有两种类型：
    - **全局环境**：（在全局执行上下文）是没有一个外部环境的词法环境。全局环境的外部环境引用为**null**.它拥有一个全局对象（window对象）及其关联的方法和属性（例如数组方法）以及任何用户自定义的全局变量，this指向这个全局对象
    - **函数环境**：用户在函数中定义的变量存储在**环境记录**中。对外部环境的引用可以是全局环境，也可以是包含内部函数的外部函数环境（也可以理解为包含当前函数环境的函数所在的环境变量）

抽象地说，词法环境在伪代码中看起来像这样：
```
GlobalExectionContext = {  // 全局执行上下文
  LexicalEnvironment: {    	  // 词法环境
    EnvironmentRecord: {   		// 环境记录
      Type: "Object",      		   // 全局环境
      // 标识符绑定在这里 
      outer: <null>  	   		   // 对外部环境的引用
  }  
}

FunctionExectionContext = { // 函数执行上下文
  LexicalEnvironment: {  	  // 词法环境
    EnvironmentRecord: {  		// 环境记录
      Type: "Declarative",  	   // 函数环境
      // 标识符绑定在这里 			  // 对外部环境的引用
      outer: <Global or outer function environment reference>  
  }  
}
```
**注意**:对于**函数环境**而言，**函数环境**还包含一个arguments对象。该对象包含了索引和传递给函数的参数之间的映射以及传递给函数的参数的长度（数量）
```
function foo(a, b) {  
  var c = a + b;  
}  
foo(2, 3);

// arguments 对象  
Arguments: {0: 2, 1: 3, length: 2},
```
### **变量环境**
**变量环境**也是一个词法环境。因此它具有上面定义的词法环境的所有属性
在 ES6 中，**LexicalEnvironment** 组件和 **VariableEnvironment** 组件的区别在于前者用于存储函数声明和变量（ let 和 const ）绑定，而后者仅用于存储变量（ var ）绑定。
```
let a = 20;  
const b = 30;  
var c;
function multiply(e, f) {  
 var g = 20;  
 return e * f * g;  
}
c = multiply(20, 30);
```
执行上下文如下所示：
```
GlobalExectionContext = {
  ThisBinding: <Global Object>,
  LexicalEnvironment: {  
    EnvironmentRecord: {  
      Type: "Object",  
      // 标识符绑定在这里  
      a: < uninitialized >,  
      b: < uninitialized >,  
      multiply: < func >  
    }  
    outer: <null>  
  },

  VariableEnvironment: {  
    EnvironmentRecord: {  
      Type: "Object",  
      // 标识符绑定在这里  
      c: undefined,  
    }  
    outer: <null>  
  }  
}

FunctionExectionContext = {  
  ThisBinding: <Global Object>,
  LexicalEnvironment: {  
    EnvironmentRecord: {  
      Type: "Declarative",  
      // 标识符绑定在这里  
      Arguments: {0: 20, 1: 30, length: 2},  
    },  
    outer: <GlobalLexicalEnvironment>  
  },

  VariableEnvironment: {  
    EnvironmentRecord: {  
      Type: "Declarative",  
      // 标识符绑定在这里  
      g: undefined  
    },  
    outer: <GlobalLexicalEnvironment>  
  }  
}
```
**注意**： 只有在遇到函数 multiply 的调用时才会创建函数执行上下文。
从上方的分析可以看出。let 和 count 定义的变量没有任何与之关联的值，但var定义的变量设置为undefined

这是因为在创建过程中，代码会被扫描并解析变量和函数声明，并对函数声明存储在环境中，而变量会设置为undefined(在var声明的情况)，或者保持未初始化（let或者const的情况）。
这就是为什么你可以在声明之前访问 var 定义的变量（尽管是 undefined ），但如果在声明之前访问 let 和 const 定义的变量就会提示引用错误的原因。
这是我们所说的变量提升

### **执行阶段**
这是整篇文章中最简单的部分。在此阶段，完成对所有变量的分配，最后执行代码。

注： 在执行阶段，如果 Javascript 引擎在源代码中声明的实际位置找不到 let 变量的值，那么将为其分配 undefined 值。

参考

[理解 Javascript 执行上下文和执行栈](https://juejin.im/post/6844903704466833421#heading-6)