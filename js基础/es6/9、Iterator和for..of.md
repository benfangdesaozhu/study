### Iterator(迭代器或者遍历器)和for...of

了解下迭代器Iterator的概念。

javascript原有表示"集合"的数据结构，主要有数组和对象。es6中添加了两种。Map和Set。

遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署Iterator接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

Iterator的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是ES6创造了一种新的遍历命令for...of循环，Iterator接口主要供for...of消费。

```
所谓迭代器的本质其实就是一个具有next方法的对象。每次调用next方法。都会返回一个结果对象。该结果对象有value和done属性。并且每调用一次next方法，对应结果对象的value值与迭代的对象所对应的索引位置的值相同（相当于可迭代对象[next调用次数]）

Iterator 的遍历过程是这样的。

（1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

（2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。

（3）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。

（4）不断调用指针对象的next方法，直到它指向数据结构的结束位置。

function CreateIterator(item) {
    var index = 0
    return {
        next: function() {
            item.index
            var done = item.length >= index
            var value = done ? item[index++] : undefined
            return {
                value,
                done: !done
            }
        }
    }
}
var a = CreateIterator([1,2,3])
console.log(a.next()) // {value: 1, done: false}
console.log(a.next()) // {value: 2, done: false}
console.log(a.next()) // {value: 3, done: false}
console.log(a.next()) // {value: undefined, done: true}
```

```
for...of是  
在ES6中，有些数据结构原生具备iterator接口（比如数组），即不用任何处理，就可以被for...of循环遍历，有些就不行（比如对象）。原因在于
这些数据结构原生部署了Symbol.iterator属性。

凡是部署了Symbol.iterator属性的数据结构，就称为部署了迭代器的接口。调用这个接口，就会返回一个迭代器对象

iterator接口的目的，就是为所有数据结构，提供了一种统一的访问机制。即for...of循环。

es6中规定。默认的iterator接口部署在数据结构的Symbol.iterator的属性。也就是说，只要一个数据结构拥有Symbol.iterator属性。就可以认为是“可迭代的”

Symbol.iterator属性本身就是一个函数。就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。

var obj = {
    [Symbol.iterator]: function() {
        return {
            next: function(){
                return {
                    value: 1,
                    done: true
                }
            }
        }
    },
    a: 1,
    b: 2
}
var obj1 = {
    a: 1,
    b: 2
}
for(var i of obj){ // obj中有Symbol.iterator属性的函数。所有可迭代，不会报错
    console.log(i)
}
for(var i of obj1){
    console.log(i) // 报错：obj1 is not iterable
}

var cjm = 'cjm'
var itera = cjm[Symbol.iterator]()
itera.next() // {value: "c", done: false}
itera.next() // {value: "j", done: false}
itera.next() // {value: "m", done: false}
itera.next() // {value: undefined, done: true}
```

```
for...of可使用的范围

1、数组
2、Set和Map结构
3、字符串
4、计算生成的数据结构（Set和Map的values、keys、entries）
5、类似数组的对象（argument、nodeList）
6、Generator 对象
7、以及部署了Symbol.iterator属性的数据结构

```

```
遍历语法的比较

经典的for循环

var a = [1,2,3]

for(var i = 0; i < a.length; i++) {
    console.log(a[i])
}

a.forEach(function(value,index,arr){
    console.log(value,index,arr) 
})
// forEach方法无法提前退出循环。break命令或return命令都不能奏效

for...in 可以遍历数组的键名（对象的键名）
for(var key in a) {
    console.log(key)
}
var obj = {
    a:1
}
obj.__proto__.b = 2
// 或者Object.setPrototypeOf(obj, {b:2})
for(var key in obj) {
    console.log(key) 
    // a
    // b
}
// for...in有几个缺点。
// 1、遍历数组，只会返回索引，因为es5的键名是字符串，所以，返回的数组索引也是以字符串形式返回
// 2、不仅仅会遍历数据的原有属性，也会遍历原型链上的键

总之：for...in主要是为了对象的遍历而设计的，不太适合用在数组上。
```

###### 模拟实现for...of

```
function forOf(obj, cb) {
    var itera;
    var result
    if (typeof obj[Symbol.iterator] !== 'function') {
        throw new Error(`${obj} is not a iterable` )
    }
    if(typeof cb !== 'function') {
        throw new Error(`${cb} must be callable` )
    }
    itera = obj[Symbol.iterator]()
    result = itera.next()
    while(!result.done) {
        cb(result.value)
        result = itera.next()
    }
}
```
