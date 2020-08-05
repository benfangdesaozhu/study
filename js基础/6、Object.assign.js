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
// descriptor 要定义或修改的属性描述符。
//默认情况下，使用 Object.defineProperty() 添加的属性值是不可修改（immutable）的。
//对象里目前存在的属性描述符有两种主要形式：数据描述符和存取描述符。
//数据描述符是一个具有值的属性，该值可以是可写的，也可以是不可写的。
//存取描述符是由 getter 函数和 setter 函数所描述的属性。

// 数据描述符：
// configurable（默认为false）
// 这个属性为true的时候，



// in操作符 和 hasOwnProperty的区别

