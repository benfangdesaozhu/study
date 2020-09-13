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