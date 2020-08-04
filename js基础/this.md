## **this全面解析**
要清楚理解的知道this的绑定，首先我们要清楚**调用位置**

### **调用位置**

**调用位置**就是函数在代码中被调用的位置（非函数声明的位置）
而调用位置最重要的是分析调用栈（就是为了到达当前执行位置所调用的所有函数）
下面举个例子来看看到底什么是调用位置和调用栈

```
function baz () {
    // 2、当前的调用栈是:baz
    // 因此当前的调用位置是全局作用域
    console.log('baz')

    bar() // 3、bar的调用位置
}

function bar () {
    // 4、当前的调用栈是:baz->bar
    // 因此，当前的调用位置在baz中
    console.log('bar')
    foo()// 5、foo的调用位置
}

function foo () {
    // 6、当前的调用栈是:baz->bar->foo
    // 因此，当前的调用位置在bar中
    console.log('foo')
}
baz() // 1、baz的调用位置
// 序列代码执行顺序。通过执行顺序来分析调用位置和调用栈
```
**注意**：我们是如何从调用栈中分析出真正的调用位置的，因为它决定了this的绑定

### **绑定规则**

我们来看看函数的执行过程中调用位置是如何决定this的绑定对象

首先，我们必须找到调用位置，然后判断需要使用以下四条规则中的哪一条。
1. **默认绑定**：

**规则**：严格模式下。函数内的this会绑定到undefined，非严格模式下，this会绑定到全局对象
- 独立函数调用（可以认为这条规则是无法应用其他规则时的默认规则）
```
function foo () {
    // "use strict"
    console.log(this.a) 
    // 非严格模式：打印出2
    // 严格模式下因为this是undefined.所以undefined.a会报错‘Uncaught TypeError: Cannot read property 'a' of undefined’
}
var a = 2
foo()

```
```
"use strict";
var a = 10;
function foo () {
  console.log('this1', this) // this1, undefined
  console.log(window.a) // 10
  console.log(this.a) // Uncaught TypeError: Cannot read property 'a' of undefined
}
console.log(window.foo) // foo Function
console.log('this2', this) // this2, window
foo();
```
**注意**：开启了严格模式，只是说使得函数内的this指向undefined，它并不会改变全局中this的指向。因此this1中打印的是undefined，而this2还是window对象。


2. **隐式绑定**

**规则**：函数在调用位置，是否有上下文对象，如果有，那么this就会隐式绑定到这个对象上。
- 调用位置是否有上下文对象。或者说是否被某个对象拥有或者包含。（需要注意隐式绑定丢失的情况）
- 对应的函数的调用方法：方法调用

``` 
function foo1 () {
    console.log(this.a)
}
var obj = {
    a: 2,
    foo: foo1
}
// 这里可以看出foo()方法，是obj的引用。所有这个this指向obj对象。
// 当函数引用有上下文对象时，隐式绑定规则会把函数调用中的this绑定到这个上下文对象。
// 对象属性引用链中只有上一层或者说最后一层在调用位置中起作用。
obj.foo() // 2 
var yinshi = obj.foo
yinshi() // undefined(特殊，隐式丢失)
// 参数传参也是隐式赋值（会造成隐式丢失）
// 隐式绑定的函数会丢失绑定对象,而this绑定到全局对象或者undefined上，取决于是否是严格模式
```
3. **显示绑定**

**规则**：我们可以通过apply、call、bind将函数中的this绑定到指定对象上。

[call解析](https://github.com/benfangdesaozhu/study/blob/master/js%E5%9F%BA%E7%A1%80/2%E3%80%81call.js)

[apply解析](https://github.com/benfangdesaozhu/study/blob/master/js%E5%9F%BA%E7%A1%80/3%E3%80%81apply.js)

[bind解析](https://github.com/benfangdesaozhu/study/blob/master/js%E5%9F%BA%E7%A1%80/4%E3%80%81bind.js)

- 硬绑定。对象内部包含一个指向函数的属性（call,apply,bind---如果接收的第一个参数为空或者是null，undefineddd的话，则会忽略这个参数（应用的默认绑定规则）） 
- API调用的‘上下文’，es6新增的数组方法（filter,map，forEach 等等的第二个参数，接受的是显式绑定的this的值）
```
function foo () {
  console.log(this.a)
}
var obj = { a: 1 }
var a = 2

foo() // 2 默认绑定规则
foo.call(obj) //1 显示绑定规则（硬绑定 ）
foo.apply(obj) //1 显示绑定规则（硬绑定 ）
foo.bind(obj) //foo Function 返回的是原函数的一个拷贝
```
```
function foo(el) {
	console.log( el, this.id );
}

var obj = {
    id: "awesome"
}

var myArray = [1, 2, 3]
// 调用foo(..)时把this绑定到obj
myArray.forEach( foo, obj );
// 1 awesome 2 awesome 3 awesome
```
4. **new绑定**

**new的时候会做哪些事情：（[实现new方法](https://github.com/benfangdesaozhu/study/blob/master/js%E5%9F%BA%E7%A1%80/1%E3%80%81new.js)）**

    1. 创建一个全新的对象。
    2. 这个新对象会被执行 [[Prototype]] 连接。
    3. 这个新对象会绑定到函数调用的this。
    4. 如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象。

**规则**：使用构造调用的时候，this会自动绑定在new期间创建的对象上。
- new绑定
- 对应的函数的调用方法：构造函数调用
```
function foo(a) {
    this.a = a;
}

var bar = new foo(2); // bar和foo(..)调用中的this进行绑定
console.log( bar.a ); // 2
```
5. **箭头函数绑定**

 mdn上解释：箭头函数语法更简洁，函数内没有this.arguments,super.适合用于那些本来需要匿名函数的地方，并且不能作为构造函数

 它里面的this是由外层作用域来决定的，且指向函数定义时的this而非执行时。

 箭头函数的this无法通过bind、call、apply来直接修改


 它里面的this是由外层作用域来决定的，且指向函数定义时的this而非执行时

 字面量创建的对象，作用域是window，如果里面有箭头函数属性的话，this指向的是window

 构造函数创建的对象，作用域是可以理解为是这个构造函数，且这个构造函数的this是指向新建的对象的，因此this指向这个对象。

 箭头函数的this是无法通过bind、call、apply来直接修改，但是可以通过改变作用域中this的指向来间接修改。


### **优先级**
**默认绑定 < 隐式绑定 < 显式绑定 < new绑定**

**更多实例**：请参考[this解析与实例](https://github.com/benfangdesaozhu/study/blob/master/js%E5%9F%BA%E7%A1%80/0%E3%80%81this.js)