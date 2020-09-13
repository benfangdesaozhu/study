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
```
apply方法拦截函数的调用、call和apply操作
方法接收三个参数：
第一个参数：目标对象
第二个参数：目标对象的上下文对象（this）
第三个参数：目标对象的参数数组

var target = function() {return 'i am target'}
var handler = {
    apply: function() {
        return 'i am proxy'
    }
}
var proxy = new Proxy(target, handler)
proxy() // "i am proxy"

直接调用Reflect.apply方法，也会被拦截。
Reflect.apply(proxy,null,{})// "i am proxy"

Reflect的apply和Proxy的用法相同。
```

```
has()方法用来拦截hasProperty(是否拥有该属性)，即判断该方法是否有某个属性时，会调用这个方法。典型的就是in运算符
该方法接收两个参数：分别是目标对象和需查询的属性
var handler = {
    has: function(target, key) {
        console.log(target, key)
        // {_prop: "foo", prop: "foo"} "a"
        return key in target;
    }
}
var target = { _prop: 'foo', prop: 'foo' };
Object.setPrototypeOf(target, {'a': 1})
var proxy = new Proxy(target, handler)
'a' in proxy // true
```
```
deleteProperty()
该方法用于拦截delete操作，如果这个属性无法被delete删除，则该方法抛出错误或者是返回false

var handler = {
    deleteProperty: function(target, key) {
        console.log(target, key)
        if (key[0] === '_') {
            throw new Error(`Invalid attempt to delete private property ${key}`)
        }
        return true
    }
}
var a = {
    b: 1,
    '_b': 2
}
var proxy = new Proxy(a, handler)
delete proxy.b // true
delete proxy._b // Invalid attempt to delete private property _b
```
```
defineProperty()
defineProperty方法拦截了Object.defineProperty操作

该方法会拦截目标对象的以下操作:

1、Object.defineProperty()
2、Reflect.defineProperty()
3、proxy.property = value


var p = {
  a: '1'
};

var handler = {
  defineProperty(target, key, attribute) {
    console.log('defineProperty');
    // Reflect.defineProperty(target, key, attribute);
  }
};
var obj = new Proxy(p, handler);
obj.p = 2 
// 这能说明第三种：打印拦截器中的defineProperty方法 ‘defineProperty’
```

```
var p = {
  a: '1'
};

var handler = {
  set(target, key, value, receiver) {
    console.log('set');
  },
  defineProperty(target, key, attribute) {
    console.log('defineProperty');
    // Reflect.defineProperty(target, key, attribute);
  }
};
var obj = new Proxy(p, handler);
obj.p = 2 
// 只能打印set中的‘set’.但是不会触发拦截器的defineProperty方法
说明，在同时拥有set和defineProperty时。一般情况下只会触发set.不会触发defineProperty
```


```
var p = {
  a: '1'
};

var handler = {
  set(target, key, value, receiver) {
    console.log('set');
    Reflect.set(target, key, value, receiver)
    // Reflect.defineProperty(receiver,key, {})
  },
  defineProperty(target, key, attribute) {
    console.log('defineProperty');
    // Reflect.defineProperty(target, key, attribute);
  }
};
var obj = new Proxy(p, handler);
obj.p = 2 
// 先打印 ‘set’、在打印defineProperty。

注意，如果 Proxy 对象和 Reflect 对象联合使用，前者拦截赋值操作，后者完成赋值的默认行
为，而且传入了receiver，那么Reflect.set会触发Proxy.defineProperty拦截。

上面代码中。Proxy.set代码中使用Reflect.set,而且传入了receiver，导致触发Proxy.defineProperty拦截。因为Proxy.set的receiver指向当前Proxy实例。而Reflect一旦传入receiver，就会把属性赋值给receiver上面（即obj）。导致触发defineProperty.如果Reflect没有传入receiver。则就不会触发defineProperty的拦截

同理。结合使用的使用的是欧，只要Reflect的方法指向当前Proxy实例的，都会触发defineProperty。例如set中注释的地方
```

```
var p = new Proxy({}, {
  defineProperty: function(target, prop, descriptor) {
    console.log('called: ' + prop);
    return true
  }
});

var desc = { configurable: true, enumerable: true, value: 10 };
Object.defineProperty(p, 'a', desc); // called: a

能说明第一点

Reflect.defineProperty(p, 'a', desc);

能说明第三点
```

```
getOwnPropertyDescriptor()方法拦截Object.getOwnPropertyDescriptor(),返回一个属性描述符对象或者undefined

var handler = {
    getOwnPropertyDescriptor: function(target, key){
        console.log(target, key)
        if(key[0] === '_') {
            return
        }
        return Object.getOwnPropertyDescriptor(target,key)
    }
}
var a = {b: 1, _b: 2}
var proxy = new Proxy(a, handler)
Object.getOwnPropertyDescriptor(proxy, 'b') // {value: 1, writable: true, enumerable: true, configurable: true}
Object.getOwnPropertyDescriptor(proxy, 'c') // undefined
Object.getOwnPropertyDescriptor(proxy, '_b') // undefined
```

```
获取和设置对象的原型

Proxy实例的拦截获取对象的原型和设置对象的原型getPrototypeOf、setPrototypeOf
getPropertyOf(object)

setPrototypeOf(object,prototype)
prototype 一个对象或者是null

var handler = {
    setPrototypeOf:function(object,property) {
        console.log(1, object,property)
        return true
    },
    getPrototypeOf:function(object) {
        return Object.getPrototypeOf(object)
    }
}
var a = {}
var proxy = new Proxy(a, handler)
Object.setPrototypeOf(proxy, {b: 1})
Object.setPrototypeOf(proxy)  // 返回proxy的原型

其中getPrototypeOf拦截获取对象的原型。
• Object.prototype.__proto__
• Object.prototype.isPrototypeOf()
• Object.getPrototypeOf()
• Reflect.getPrototypeOf()
• instanceof
这些方法会触发。
a instanceof proxy
```
```
ownKeys()方法用来拦截对象自身属性的读取操作。
• Object.getOwnPropertyNames()
• Object.getOwnPropertySymbols()
• Object.keys()
• for...in循环

var a = {
    a:1,
    b:2,
    c:3
}
var handler = {
    ownKeys: function(target) {
        console.log(target)
        return ['a']
    }
}
var proxy = new Proxy(a, handler)
Object.keys(proxy)

```

```
isExtensible()方法拦截Object.isExtensible操作。

preventExtensions()拦截Object.preventExtensions()。该方法必须返回一个布尔值，否则会被自动转为布尔值。
这个方法有一个限制，只有目标对象不可扩展时（即Object.isExtensible(proxy)为false），proxy.preventExtensions才能返回true，否则会报错。
```
Reflect也有Proxy的13中方法。用法相同