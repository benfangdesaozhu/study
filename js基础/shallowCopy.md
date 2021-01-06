### **复制对象**

复制的方法有很多，比如说直接赋值、浅复制、深复制

**赋值**会根据赋值目标的类型的不同分为浅复制和深复制

比如赋值一个原始类型的值(两个变量互不影响)。

```
var a = 1
var b = a
console.log(a) // 1
b = 2
console.log(a,b) //1, 2
```
再比如赋值一个引用类型的值(两个变量具有相同的引用，指向了同一个对象的地址（堆），相互影响)
```
var a = {a: 1}
var b = a
console.log(a) // {a: 1}
b.a = 2
console.log(a,b) //{a: 2}, {a: 2}
```
### **浅复制（shallow clone）**
1. **什么是浅复制**

创建一个新对象，这个新对象有着原始对象的一份值，如果属性是基本数据类型，复制的是这个基本数据类型的值，如果属性是引用数据类型，复制的是就是内存地址，所以如果其中一个对象改变了内存地址，就会影响另一个对象。（浅复制只解决第一层的问题，复制的是第一层的基本数据类型，第一层的引用类型的地址）

2. **浅复制的应用场景**

Object.assign(target, ...sources)[Object.assign的实现](https://github.com/benfangdesaozhu/study/blob/master/js%E5%9F%BA%E7%A1%80/6%E3%80%81Object.assign.js)

var a = {b : {c : 2}}
var b = {...a}

...扩展运算符也可以浅复制

**MDN**上对该方法的解释是：方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

Array.prototype.slice()
slice() 方法返回一个新的数组对象，这一对象是一个由 begin和 end（不包括end）决定的原数组的浅拷贝。原始数组不会被改变。
Array.prototype.concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
slice、和concat都是浅拷贝

数组的话也可以使用扩展运算符进行浅拷贝
var a = [{b:1}]
var b = [...a]


Underscore的实现（create a (shallow-cloned) duplicate of an object）创建对象的（浅克隆）副本
```
function isObject (obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
}
function extend (obj) {
    if (!_.isObject(obj)) return obj;
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
      source = arguments[i];
      for (prop in source) {
        if (Object.prototype.hasOwnProperty.call(source, prop)) {
            obj[prop] = source[prop];
        }
      }
    }
    return obj;
};
function clone (obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
};
var isArray = Array.isArray || function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
};
```

### **深复制**
1. **什么是深复制**

深复制会复制所有的属性，并复制属性指向的动态分配的内存。当对象和它所引用的对象一起复制时即发生深拷贝。深复制相比于浅复制速度较慢并且花销较大。复制前后两个对象互不影响。

2. **深复制的应用场景**

JSON.parse(JSON.stringify(object))

对数组深拷贝之后，改变原数组不会影响到拷贝之后的数组。

但是该方法有以下几个问题。

1、会忽略 undefined

2、会忽略 symbol

3、不能序列化函数

4、不能解决循环引用的对象

5、不能正确处理new Date()

6、不能处理正则

undefined、symbol 和函数这三种情况，会直接忽略。

Lodash 
```
 function baseClone(value, bitmask, customizer, key, object, stack) {
      var result,
          isDeep = bitmask & CLONE_DEEP_FLAG,
          isFlat = bitmask & CLONE_FLAT_FLAG,
          isFull = bitmask & CLONE_SYMBOLS_FLAG;

      if (customizer) {
        result = object ? customizer(value, key, object, stack) : customizer(value);
      }
      if (result !== undefined) {
        return result;
      }
      if (!isObject(value)) {
        return value;
      }
      var isArr = isArray(value);
      if (isArr) {
        result = initCloneArray(value);
        if (!isDeep) {
          return copyArray(value, result);
        }
      } else {
        var tag = getTag(value),
            isFunc = tag == funcTag || tag == genTag;

        if (isBuffer(value)) {
          return cloneBuffer(value, isDeep);
        }
        if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
          result = (isFlat || isFunc) ? {} : initCloneObject(value);
          if (!isDeep) {
            return isFlat
              ? copySymbolsIn(value, baseAssignIn(result, value))
              : copySymbols(value, baseAssign(result, value));
          }
        } else {
          if (!cloneableTags[tag]) {
            return object ? value : {};
          }
          result = initCloneByTag(value, tag, isDeep);
        }
      }
      // Check for circular references and return its corresponding clone.
      stack || (stack = new Stack);
      var stacked = stack.get(value);
      if (stacked) {
        return stacked;
      }
      stack.set(value, result);

      if (isSet(value)) {
        value.forEach(function(subValue) {
          result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
        });
      } else if (isMap(value)) {
        value.forEach(function(subValue, key) {
          result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
        });
      }

      var keysFunc = isFull
        ? (isFlat ? getAllKeysIn : getAllKeys)
        : (isFlat ? keysIn : keys);

      var props = isArr ? undefined : keysFunc(value);
      arrayEach(props || value, function(subValue, key) {
        if (props) {
          key = subValue;
          subValue = value[key];
        }
        // Recursively populate clone (susceptible to call stack limits).
        assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
      });
      return result;
    }
```
https://jerryzou.com/posts/dive-into-deep-clone-in-javascript/