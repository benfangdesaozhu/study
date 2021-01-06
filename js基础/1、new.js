// 实现一个new： 创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例

// 首先我们要知道new 一个对象做了什么（会进行以下操作） mdn上解释如下

// 1、创建一个空的简单的javascript对象（即{}）
// 2、链接该对象（即设置该对象的构造函数）到另一个对象
// 3、将步骤1新创建的对象作为this的上下文
// 4、如果该对象没有返回对象，则返回this

function my_new () {
    const obj = {} // 创建一个对象（步骤1）
    const oth = [].shift.call(arguments) // 获得构造函数    
    obj.__proto__ = oth.prototype // 步骤3
    const result = oth.apply(obj, arguments) // 执行构造函数。 结构（步骤2）
    console.log(oth, obj, result)
    return typeof result === 'object' ? result : obj // 步骤4
}


function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function() {
       console.log(this.name)
    }
}
new Person('cjm', 18, 'cxy')

my_new(Person,'cjm', 18, 'cxy')