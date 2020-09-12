#### defineProperty

使用过vue的，都应该知道数据绑定，并且vue2的源码当中的数据绑定也使用到了Object.defineProperty这个方法

首先：我们了解最基本的使用方式
```
语法：Object.defineProperty(obj, prop, descriptor)
mdn上的描述是：Object.defineProperty()方法会直接在一个对象上
定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

参数描述：
obj: 要定义属性的对象
prop: 要定义或修改的属性名称
descriptor: 要定义或者修改的属性描述符

对象中的属性描述符目前就两种：数据描述符和存储描述符

数据描述符：具有值的属性，该值可写或者不可写

存储描述符：由getter或者setter函数所描述的属性。

一个属性的描述符中只能存在这两者中的一种，不能同时是两者.
同时存在的化，浏览器会报Invalid property descriptor. Cannot both specify accessors and a value or writable attribute,的错误
```
这两种属性描述符都是对象。它们共享以下两种属性

1、configurable: 
    当且仅当该属性描述符的configurable键值为true时，该属性的描述符才能被改变，也能被删除。默认为false
```
var obj = {}
var val = null

Object.defineProperty(obj, 'a', {
    configurable: false,
    enumerable: true,
    value: 1,
    writable: true
})
// 再次修改的时候
Object.defineProperty(obj, 'a', {
    configurable: true,
    enumerable: true,
    value: 1,
    writable: true
})

//报错Cannot redefine property: a
    t Function.defineProperty
```
2、enumerable:定义了对象的属性是否可以在 for...in 循环和 Object.keys() 中被枚举。

    当且仅当该属性描述符的enumerable键值为true是，该属性才能出现在对象的枚举属性中。默认为false

```
var obj = {}
var val = null

Object.defineProperty(obj, 'a', {
    configurable: true,
    enumerable: false,
    value: 1,
    writable: true
})
for(var i in obj){
    console.log(i) 
    // 当属性描述符的enumerable为false的时候(表示不可枚举) i打印undefined

    // 当属性描述符的enumerable为true的时候 i打印 'a'
}
```

数据描述符的属性有（可选）：

value:

    该属性对应的值。默认为undefined

writable:
```
    当且仅当该属性描述符的writable键值为true是，该属性的值才能出被改变。默认为false

    var obj = {}
    var val = null

    Object.defineProperty(obj, 'a', {
        configurable: true,
        enumerable: true,
        value: 1,
        writable: false
    })
    obj.a = 2
    console.log(obj.a) // 1
```
存储描述符的属性有（可选）：set、get是两个函数

get: 
    
    属性的getter函数。如果没有getter，则为undefined.当访问该属性时，会调用此函数。此函数的返回值作为对象的键值

set:
```
    属性的setter函数。如果没有setter，则为undefined.当属性值被修改时，会调用此函数，该方法接受一个参数（也就是被赋予的新值）

```

```

    var obj = {}
    var val = null

    Object.defineProperty(obj, 'a', {
        enumerable: true,
        configurable: true,
        get: function(){
            return val
        },
        set: function(curr){
            val = curr
        }
    })
    obj.a // 访问的时候，会调用getter函数。
    obj.a = 2 // 给属性赋值的时候，会调用setter函数
```

```
// 最简单的输入框双向绑定
    <input id="input" type="text">
    <div id="div"></div>


    var input = document.getElementById('input')
    var div = document.getElementById('div')
    var val = {}
    input.addEventListener('input', function(e){
        val.text = input.value
    })
    Object.defineProperty(val, 'text', {
        configurable: true,
        enumerable: true,
        get: function(){
        },
        set: function(val) {
            div.innerHTML = val
        }
    })
```

#### Proxy

使用defineProperty只能对属性的读取(get)和设置(set)进行操作.

es6中提供了Proxy.用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种‘元编程’。

Proxy不单单有set、get、还能apply、has、delete等其他行为。
但是，要是Proxy其作用，必须针对Proxy的实例进行操作，而不是针对目标对象进行操作

```
var target = {
    a: 1
}
var proxy = new Proxy(target, {
    get: function(target, property, shili) {
        console.log(target, property, shili)
        return target[property]
    }
})
proxy.p 
// 调用了get（拦截对象属性的读取）方法。打印出 {a: 1} "p" Proxy {a: 1}

这样我们就能得出get的用法。有三个参数。第三个非必传。
第一个参数表示，代理对象。
第二个参数表示，当前属性
第三个参数表示，当前Proxy实例的对象
```

```
var target = {
    a: 1
}
var proxy = new Proxy(target, {
    set: function(target, key, value, shili) {
        console.log(target, key, value, shili)
        // {a: 1} "a" 2 Proxy {a: 1}
        target[key] = value
    }
})
proxy.a = 2
console.log(target, proxy) // {a: 2}  Proxy {a: 2}

从上述例子，我们可以知道。
set（拦截对象属性的设置）方法。能接受四个参数。第四个非必传

第一个参数：表示当前代理对象
第二个参数：表示属性名
第三个参数：表示属性值
第四个参数：当前Proxy实例的对象
```

相对应的还有has、construct、apply、deleteProperty、defineProperty、getOwnPropertyDescriptor、
getPrototypeOf、isExtensible、ownKeys、preventExtensions、setPropertyOf等拦截方法