// 实现一个 Object.assign()

// 要实现一个这个方法。首先我们需要清楚这个方法的概念。

// Object.assign(target, ...source) 方法将所有可枚举属性的值从一个或者多个源对象复制到目标对象，他将返回目标对象

const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);
console.log(target,returnedTarget,source)

// 分别打印 {a: 1, b: 4, c: 5}, a: 1, b: 4, c: 5}, { b: 4, c: 5 }


if( typeof Object.assign !== 'function') {
    //  Object.defineProperty
    // 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。
    Object.defineProperty(Object, 'assign', {
        value: function (target, source) {
            if(target === null || target === undefined) {
                throw new TypeError('Cannot convert undefined or null to object');
            }
            var obj = target
            for(var i = 1; i < arguments.length; i++) {
                var targetObj = arguments[i]
                for(item in targetObj) {
                    // hasOwnProperty 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）。
                    if(Object.prototype.hasOwnProperty.call(targetObj, item)) {
                        obj[item] = targetObj[item]
                    }
                }
            }
            return obj
        },
        writable: true,
        configurable: true
      })
}

// Object.defineProperty()
// MDN上的解释：方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

Object.defineProperty(obj, prop, descriptor)
// obj 要定义属性的对象
// prop 要定义或者修改属性的名称或Symbol
// descriptor 要定义或修改的属性描述符(在es5之前没有提供检测属性特性的方法，从es5开始，所有属性都具备了属性描述符。)。
var myTestObj = {a:2}
Object.getOwnPropertyDescriptor(myTestObj, 'a') // {value: 2, writable: true, enumerable: true, configurable: true}
//对象的属性里目前存在的属性描述符有两种主要形式：数据描述符和存取描述符。
//数据描述符是一个具有值的属性，该值可以是可写的，也可以是不可写的。
//存取描述符是由 getter 函数和 setter 函数所描述的属性。

// 数据描述符：
// writable:Boolean
// writable 决定是否可以修改属性的值
var myTestWritable = {}
Object.defineProperty(myTestWritable, 'a', {
    value:2,
    writable: false,
    configurable: true,
    enumerable: true,
})
myTestWritable.a = 3
console.log(myTestWritable.a) // 2 
// 我们可以看出，对属性值的修改失败。如果在严格模式下，这个方法还会报错（Uncaught SyntaxError: Invalid or unexpected token 提示我们无法修改一个不可写的属性）。
// 后续还会介绍setter 和 getter.简单来说，writable为false的时候（属性不可改变），相当于定义了一个空操作的setter

// configurable: Boolean
// configurable 决定属性描述符是否可配置。如果可配置，就可以使用Object.defineProperty的方法来修改属性描述符
var myTestConfigurable = {a:2}
Object.defineProperty(myTestConfigurable, 'a', {
    value: 3,
    writable: true,
    configurable: false,
    enumerable: true,
})
console.log(myTestConfigurable.a) // 3
myTestConfigurable.a = 5
console.log(myTestConfigurable.a) // 5

// Object.defineProperty(myTestConfigurable, 'a', {
//     value: 7,
//     writable: false,
//     enumerable: true,
// })

Object.defineProperty(myTestConfigurable, 'a', {
    value: 7,
    writable: true,
    configurable: true,
    enumerable: true,
}) // Uncaught TypeError: Cannot redefine property: a
// 从打印的结果可以看出，最后的defineProperty()会产生一个typeError错误，
// 不论是否处于严格模式，尝试修改一个不可配置的属性描述符都会出错
// 注意：把configurable修改成false是单向操作，不可撤销
// 但是configurable：false的前提下，不修改configurable的情况可以修改writable的状态从true改为false,但是不能从false改为true,如注释部分
// 除了无法修改之外。configurable：false还会禁止删除这个属性。

// enumerable: Boolean
// writable 决定是否可枚举
var myTestEnumerable = {a:1, b:2, c:3}
Object.defineProperty(myTestEnumerable, 'a', {
    enumerable: false
})
for(var item in myTestEnumerable) {
    console.log(item)
}
// b c
// 通过结果，我们可容易的得出，当对象属性的属性描述符enumerable为false的时候，该属性就不会出现在对象属性的枚举中。
// Object.freeze(...) 会创建一个冻结对象，这个方法实际上会在一个现有对象上调用Object.seal(...)
//并把所有的属性的writable修改为false.这样就达到不能修改他们的值的效果
var myTestFreeze = {a:2}
Object.freeze(myTestFreeze)
myTestFreeze.a = 3
console.log(myTestFreeze) // {a: 2}

// Object.seal(...) 会创建一个‘密封’的对象，这个方法实际上会在一个现有对象上调用Object.preventExtensions(...),
// 并把所有属性的属性描述符的configurable的值修改为false.‘密封’之后不仅不能加新属性，也不能配置或者删除任何现有属性，虽然可以修改属性的值
var myTestSeal = {a:2}
Object.seal(myTestSeal)
myTestSeal.a = 3
myTestSeal.b = 1
console.log(myTestSeal) // {a: 3}

// Object.preventExtensions(...) 禁止一个对象添加新属性并且保留现有属性
var myTestPreventExtensions = {a:2}
Object.preventExtensions(myTestPreventExtensions)
myTestPreventExtensions.b = 3
console.log(myTestPreventExtensions) // {a: 2}
//结果显而易见。 禁止一个对象添加新属性并且保留现有属性（严格模式报错。typeError）



//默认情况下，使用 Object.defineProperty() 添加的属性值是不可修改（immutable）的。




// in操作符 和 hasOwnProperty的区别

