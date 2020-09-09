### Iterator(迭代器或者遍历器)和for...of

了解下迭代器Iterator的概念。

javascript原有表示"集合"的数据结构，主要有数组和对象。es6中添加了两种。Map和Set。

遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署Iterator接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

Iterator的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是ES6创造了一种新的遍历命令for...of循环，Iterator接口主要供for...of消费。

```
所谓迭代器的本质其实就是一个具有next方法的对象。每次调用next方法。都会返回一个结果对象。该结果对象有value和done属性。并且每调用一次next方法，对应结果对象的value值与迭代的对象所对应的索引位置的值相同（相当于可迭代对象[next调用次数]）

function CreateIterator(item) {
    var index = 0
    return {
        next: function() {
            item.index
            var done = item.length >= index
            var value = done ? item[index++] : undefined
            return {
                value,
                done
            }
        }
    }
}
var a = CreateIterator([1,2,3])
console.log(a.next()) // {value: 1, done: true}
console.log(a.next()) // {value: 2, done: true}
console.log(a.next()) // {value: 3, done: true}
console.log(a.next()) // {value: undefined, done: false}
```

```
for...of是
```