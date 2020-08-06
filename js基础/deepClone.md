### **从零实现一个深拷贝**

最简单的：按照之前实现的shallowCopy的方法。我可以使用在浅拷贝的基础上，进行递归进行来实现一个深拷贝(浅拷贝 + 递归)
```
var a = {
    name: "muyiy",
    book: {
        title: "You Don't Know JS",
        price: "45"
    },
    a1: undefined,
    a2: null,
    a3: 123
}
```
```
function simpleDeepClone () {
    if (typeof arguments[0] !== 'object' || typeof === null) return arguments[0] 
    var result = Array.isArray(arguments[0]) ? [] : {};
    for(var i = 1; i < arguments.length; i++) {
        var targetObj = arguments[i]
        for(item in targetObj) {
            if(Object.prototype.hasOwnProperty.call(targetObj, item)) {
                var targetValue = targetObj[item]
                if(typeof targetValue === 'object'){
                    simpleDeepClone(arguments[0], targetObj[item])
                } else {
                    result[item] = targetObj[item]
                }
            }
        }
    }
    return result
}
simpleDeepClone({}, a)
```
```
a.circleRef = a;
simpleDeepClone({}, a)
```

上述的方法，当遇到循环引用的情况，会出现‘爆栈’的情况。（报错： Uncaught RangeError: Maximum call stack size exceeded）

```
// 解决爆栈问题 可以使用hash表。这里采用jq extend的一种处理方式
function simpleDeepClone1 () {
    if (typeof arguments[0] !== 'object' || typeof === null) return arguments[0] 
    var result = Array.isArray(arguments[0]) ? [] : {};
    for(var i = 1; i < arguments.length; i++) {
        var targetObj = arguments[i]
        for(item in targetObj) {
            if(Object.prototype.hasOwnProperty.call(targetObj, item)) {
                var targetValue = targetObj[item]
                // 为了避免这个问题，我们需要判断要复制的对象属性是否等于 target，如果等于，我们就跳过：
                if(arguments[1] === targetValue){
                    continue
                }
                if(typeof targetValue === 'object'){
                    simpleDeepClone(arguments[0], targetObj[item])
                } else {
                    result[item] = targetObj[item]
                }
            }
        }
    }
    return result
}
simpleDeepClone({}, a)
```


### **接下来我们看下jq的extend的实现方法**

**首先介绍下jq的extend方法(合并两个或者更多的对象的内容到第一个对象中)**
```
// 函数的第一个参数可以传一个布尔值，如果为 true，我们就会进行深拷贝，false 依然当做浅拷贝，这个时候，target 就往后移动到第二个参数。

jQuery.extend([deep],target [, object1 ] [, objectN ] )
```
```
jQuery.extend = function () {
    var target = arguments[0]||{}, a = 1, a1 = arguments.length, deep = false   
    if (target.constructor === Boolean) {
        deep = target
        target = arguments[1] || {}
    }
    if (a1 === 1) {
        a = 0
    }
    var result = {}
    for(var i = a; i < a1; i++ ) {
        var target = a1[i]
    }
}
```
