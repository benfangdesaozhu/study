// this 的绑定情况有五种   (在使用let const 的变量。不会绑定在windows上)

// 1、默认绑定（严格/非严格模式）  
// 2、隐式绑定 
// 3、显示绑定
// 4、new绑定 
// 5、箭头函数绑定

// 1、调用位置：是指函数在代码中被调用的位置（执行的位置， 不是声明函数的位置）


// 2、绑定规则
// 2.1 默认绑定 (严格模式 'use strict'下 函数内的this.指向undefined. 非严格模式下，指向全局对象)
// function foo() {
//     console.log( this.a );
//   }
//   var a = 2;
//   (function(){
//     "use strict";
//     foo();
//   })(); // 打印2
// 对应的函数的调用方法：独立调用
function foo () {
    console.log(this.a)
}
var a = 2
foo() // 2
// 2.2 隐式绑定（调用位置是否有上下文对象，或者说是被某个对象拥有或者包含。） // 需要注意隐式绑定丢失的情况。
// 对应的函数的调用方法：方法调用
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
yinshi() // undefined(特殊，隐私丢失)
// 隐式绑定的函数会丢失绑定对象，（明日再确认）



// 2.3 显示绑定（call,apply,bind） es6新增的数组方法（filter,map，forEach 等等的第二个参数，接受的是this的值）
// 对应的函数的调用方法：间接调用（call、apply、bind）

// 2.4 new绑定
// 对应的函数的调用方法：构造函数调用
var dd = 'window'
function Person (name) {
  this.dd = name
  this.foo = function () {
    console.log(this.dd)
    return function () {
      console.log(this.dd)
    }
  }
}
var person1 = new Person('person1')
var person2 = new Person('person2')

person1.foo.call(person2)()
person1.foo().call(person2)
  
// 3优先级
// 默认绑定 < 隐式绑定 < 显式绑定 < new绑定

// 箭头函数:
// mdn上解释：箭头函数语法更简洁，函数内没有this.arguments,super.适合用于那些本来需要匿名函数的地方，并且不能作为构造函数
// 它里面的this是由外层作用域来决定的，且指向函数定义时的this而非执行时。
// 箭头函数的this无法通过bind、call、apply来直接修改

// 它里面的this是由外层作用域来决定的，且指向函数定义时的this而非执行时
// 字面量创建的对象，作用域是window，如果里面有箭头函数属性的话，this指向的是window
// 构造函数创建的对象，作用域是可以理解为是这个构造函数，且这个构造函数的this是指向新建的对象的，因此this指向这个对象。
// 箭头函数的this是无法通过bind、call、apply来直接修改，但是可以通过改变作用域中this的指向来间接修改。
var dd = 'window'
function Person (name) {
  this.dd = name
  this.foo1 = function () {
    console.log(this.dd)
  }
  this.foo2 = () => {
    console.log(this.dd)
  }
}
var person2 = {
  dd: 'person2',
  foo2: () => {
    console.log(this.dd)
  }
}
var person1 = new Person('person1')
person1.foo1() // person1
// 构造函数对象中普通函数和箭头函数的区别
person1.foo2() // person1
person2.foo2() // windows


var name = 'window'
function Person (name) {
  this.name = name
  this.foo1 = function () {
    console.log(this.name)
    return function () {
      console.log(this.name)
    }
  }
  this.foo2 = function () {
    console.log(this.name)
    return () => {
      console.log(this.name)
    }
  }
  this.foo3 = () => {
    console.log(this.name)
    return function () {
      console.log(this.name)
    }
  }
  this.foo4 = () => {
    console.log(this.name)
    return () => {
      console.log(this.name)
    }
  }
}
var person1 = new Person('person1')
person1.foo1()() // person1 windows
person1.foo2()() // person1 person1
person1.foo3()() // person1 windows
person1.foo4()() // person1 person1


// 箭头函数的this无法通过bind、call、apply来直接修改
var name = 'window'
var obj1 = {
  name: 'obj1',
  foo1: function () {
    console.log(this.name)
    return () => {
      console.log(this.name)
    }
  },
  foo2: () => {
    console.log(this.name)
    return function () {
      console.log(this.name)
    }
  }
}
var obj2 = {
  name: 'obj2'
}
obj1.foo1.call(obj2)() // obj2 obj2
obj1.foo1().call(obj2) // obj1 obj1
obj1.foo2.call(obj2)() // window window
obj1.foo2().call(obj2) // window obj2

// 做错了
var name = 'window'
function Person (name) {
  this.name = name
  this.obj = {
    name: 'obj',
    foo1: function () {
      return function () {
        console.log(this.name)
      }
    },
    foo2: function () {
      return () => {
        console.log(this.name)
      }
    }
  }
}
var person1 = new Person('person1')
var person2 = new Person('person2')

person1.obj.foo1()()
person1.obj.foo1.call(person2)()
person1.obj.foo1().call(person2)

person1.obj.foo2()()
person1.obj.foo2.call(person2)()
person1.obj.foo2().call(person2)

// person1.obj.foo1()()返回的是一个普通的匿名函数，调用它的是window，所以打印出window。
// person1.obj.foo1.call(person2)()中是使用.call(person2)改变第一层函数中的this，匿名函数和它没关系，依旧是window调用的，所以打印出window。
// person1.obj.foo1().call(person2)是通过.call(person2)改变匿名函数内的this，所以绑定有效，因此打印出person2。
// person1.obj.foo2()()第一层为普通函数，第二层为匿名箭头函数。首先让我们明确匿名箭头函数内的this是由第一层普通函数决定的，所以我们只要知道第一层函数内的this是谁就可以了。而这里，第一层函数最后是由谁调用的呢 🤔️？是由obj这个对象，所以打印出obj。
// person1.obj.foo2.call(person2)()中使用.call(person2)改变了第一层函数中的this指向，所以第二层的箭头函数会打印出person2。
// person1.obj.foo2().call(person2)中使用.call(person2)想要改变内层箭头函数的this指向，但是失败了，所以还是为外层作用域里的this，打印出obj。

// https://juejin.im/post/5e6358256fb9a07cd80f2e70#heading-25

// node https://github.com/qufei1993/Nodejs-Roadmap


function Foo() {
    getName = function () { alert (1); };
    return this;
}
Foo.getName = function () { alert (2);};
Foo.prototype.getName = function () { alert (3);};
var getName = function () { alert (4);};
function getName() { alert (5);}
 
//请写出以下输出结果：
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();