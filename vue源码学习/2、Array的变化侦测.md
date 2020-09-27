## 1.前言
第一篇文章我们介绍了object的变化侦测。object的变化侦测主要是应用Object.defineProperty方法在getter进行依赖收集，setter进行通知依赖更新。

而数组可以通过数组的原型上的方法来改变数组的内容。所以Object的通过getter和setter的方法就行不通。

在es6之前。javascript没有提供元编程的能力，也就没有提供可以拦截原型方法的能力。但是我们可以自定义的方法去覆盖原生的原型方法
![array方法](./images/array方法.png)
```
const arrayProto = Array.prototype // Array的原型（这上方有array的一些方法,如上图）
export arrayMethods = Object.create(arrayProto) // 创建一个继承Array.prototype的对象

[
    'push',
    'pop',
    'unshift',
    'shift',
    'splice',
    'sort',
    'reverse'
].forEach(function(method){
    var original = arrayMethods[method] // 原生的方法
    Object.defineProperty(arrayMethods, original, {
        value: function mutator(...argus) {
            return original.apply(this, argus)
        },
        enumerable: false,
        writable: true,
        configurable: true
    }) // 在arrayMethods对象上，封装push、pop等七个方法，用来覆盖原生的方法
})
```
当arrayMethods调用pop、push等七个方法的时候，实际执行的是mutator方法。而mutator中执行的是原生的方法（Array.prototype.push等）。因此我们可以在mutator函数中做一些事，例如通知依赖更新。

实例详细见[demo](./vue.html)

![arrya监测](./images/arrya监测.png)

再介绍Object的侦测的时候，我们知道，通过Observer类能侦测所有的数据，

```
class Observer {
    constructor(value) {
        this.value = value
        if(Array.isArray(value)) {
            value.__proto__ = arrayMethods // 新增
        } else {
            this.walk(value)
        }
    }
}
在之前的基础上，我们增加value.__proto__ = arrayMethods这段代码

它的作用是将拦截器赋值给value.__proto__,通过__proto__属性，可以巧妙的实现覆盖value原型的功能。 这个时候被侦测的数组[].push，调用的是arrayMethods的push方法。

__proto__是Object.getPrototypeOf和setPrototypeOf的早期实现。所有使用es6的Object.setPrototypeOf来代替__proto__是完全可以的
```
![__proto__](./images/__proto__覆盖.png)

### 把拦截器方法挂载到数组的属性上。
```
__proto__并不是所有浏览器都支持。因此我们需要处理__proto__不支持的情况。

vue中的做法很粗暴，如果不能使用__proto__属性，就直接将arrayMethods的方法设置到被侦测的数组上。

const hasProto = '__proto__' in {}
const arraykeys = Object.getOwnPropertyNames(arrayMethods)
class Observer {
    constructor(value) {
        this.value = value
        if(Array.isArray(value)) {
            if(hasProto) {
                value.__proto__ = arrayMethods
            } else {
                copyAugment(value, arrayMethods, arraykeys)
            }
        } else {
            this.walk(value)
        }
    }
}
/*
** obj:数组
** src: arrayMethods
** keys: 拦截数组的七个方法['pop', 'push', 'shift', 'unShift', 'splice', 'sort', 'reserve']
**/
function copyAugment (obj, src, keys) {
    for(let i = 0; i < keys.length; i++) {
        const key = keys[i]
        def(obj, key, src[key])
    }
}
```
![不支持__proto__](./images/不支持__proto__.png)
```

Observer类。

new Observer(value) // data中的数据

function def (obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    });
}

var hasProto = '__proto__' in {} // 是否有__proto__属性
const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto)
function Observer (value) {
    this.dep = new Dep()
    if(Array.isArray(value)) {
        if(hasProto) {
            protoAugment(value, arrayMethods)
        } else {
            copyAugment(value, arrayMethods, arrayKeys)
        }
    } else {
        this.walk(value)
    }
}
Observer.prototype.walk = function (obj) {
    const keys = Object.keys(obj)
    for(let i = 0; i < keys.length; i++) {
        defineReactive(obj, keys[i])
    }
}
function protoAugment(obj, src) {
    obj.__proto__ = src
}

function copyAugment (target: Object, src: Object, keys: Array<string>) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    def(target, key, src[key])
  }
}
```