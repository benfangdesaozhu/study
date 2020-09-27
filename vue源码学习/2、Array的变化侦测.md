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