### class 类

再介绍类之前。我们先回顾下构造函数
```
function Car (name, price) {
    this.name = name
    this.price = price
}
Car.prototype.run = function() {
    console.log('run')
}
var mzd = new Car('马自达','14')
mzd.constructor === Car //  true
mzd.run() // run
```
es6引进类，作为对象的模版。通过class关键字，可以定义类

事实上，es6的类可以看作是一个语法糖。它的绝大部分功能都能通过es5实现。新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。

```
上面的代码可以使用es6的类来写

class Car{
    constructor(name, price) {
        this.name = name 
        this.price = price
    }
    run(){
        console.log('run')
    }
}
var mzd = new Car('马自达','14')

mzd.constructor === Car //  true
mzd.run() // run
```

```
constructor方法

constructor方法是类的默认方法。通过new命令生成的对象实例的时候，自动调用该方法。一个类必须拥有constructor方法，如果没有定义，会默认添加一个空的constructor方法。

默认返回实例对象(即this).也可以指向返回另一个对象。
```

```
类的实例对象

function Point(x,y){
    this.x = x;
    this.y = y;
    console.log(x + y)
}
es5之前。构造函数不单单可以直接调用，也可以使用new Point(1,2)


class PointC {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
而类的调用。只能使用new PointC(1,2). 
不能直接使用PointC(1,2)
```

```
不存在变量提升

Class不存在变量提升（hoist），这一点与ES5完全不同。

es5中:可以正常执行。如下面的实例

new Point(1,2)
function Point(x,y){
    this.x = x;
    this.y = y;
    console.log(x + y)
}

而class中

new PointC(1,2) // 报错：PointC is not defined
class PointC {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```

#### 私有方法（无需实例化(即无需用new操作符实化对象)就可以调用的方法就叫静态方法，实例不能调用）

私有方法是常见需求，但ES6不提供，只能通过变通方法模拟实现。

```
class myClass{

  // 公有方法
  foo(baz) {
    console.log(111)
  }
  // 模拟静态方法
  bar(){
    bar1.call(this, 1,2)
  }

  // 约定某一规则进行定义 比如这里：约定下划线的为静态方法
  _bar() {

  }
};

function bar1 (x,y) {
    console.log(x,y)
}

// 这样实例还是能正常调用模拟的静态方法。所有还是不太行。只能约定
```
#### this 的问题

```
只要我们不在class的constructor方法内改变this指向。
这个类创建的实例，this都指向该实例。

class myClass{
  constructor(x,y) {
      this.x = x 
      this.y = y
  }
  foo(baz) {
    console.log(baz, this.x)
  }
};
var myclass = new myClass(1,2)

var {foo} = myclass

foo() // 使用结构赋值之后，直接调用foo。this指向改变
```
