什么是Promise

Promise是什么？不论是es6的Promise,还是jquery的promise.不同的库有不同的实现，但是大家遵守统一的规范，所有，Promise不是指定的某一个实现，**而是一种规范，是一套处理javascript异步的机制**

Promise的规范有很多，如Promise/A、Promise/B、Promise/D以及Promise/A的升级版Promise/A+，其中ES6遵循Promise/A+规范，有关Promise/A+，你可以参考一下：

* 英文版：[Promise/A+](https://promisesaplus.com/)
* 翻译版：[Promise/A+翻译](https://www.ituring.com.cn/article/66566)

promises的核心思想是：promise代表异步操作的结果。 一个承诺处于三种不同状态之一：

* pending(待定)：Promise的初始状态

* Fulfilled(已完成)：Promise的完成状态

* rejected(已拒绝)：Promise的拒绝状态

只有异步操作的结果，可以决定当前是是哪一种状态。任何其他操作都无法改变这个状态。

一旦状态改变，由pending状态变更为已完成或已拒绝的状态，它就不会再改变（即永远无法再改变）。

状态的改变仅且只有两种可能

* 1、pending -> fulfilled (待定 -> 已完成)
* 2、pending -> rejected (待定 -> 已拒绝)

如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。

```
var a = new Promise(function(resolve,reject){
	resolve(1)
})

a.then(res=>{console.log(res)}) // 1
a.then(res=>{console.log(res)}) // 1
a.then(res=>{console.log(res)}) // 1

```
Promise 也有一些缺点：

    * 无法取消Promise。一旦创建它就会立即执行，无法中途取消
    * 如果不设置回调函数,promise内部抛出错误,不会反应到外部。
    * 当处于pending状态时，无法得知目前进展到哪一个阶段

![](./../images/t.png)

从上图可以看出。

Promise对象是一个构造函数，用来生成Promise实例。

```
var a = new Promise(function(resolve, reject) {
    // ... some code

    if (/* 异步操作成功 */){
        resolve(value)
    } else {
        reject(error)
    }
})
```

Promise构造函数接受一个函数作为参数，该函数有两个参数，分别是resolve（解决）和reject（拒绝）。它们是两个函数，有javascript引擎提供，不需要自己部署。

resolve的作用是：将Peomise对象的状态，从pending变成fulfilled。并将异步的结果当作参数传递出去。

reject的作用：将Promise对象的状态，从pending转换为rejected。并将错误的信息当作参数传递出去

Promise实例生成后，可以用then方法分别指定resolve和reject的回调函数

```
a.then(
    (res)=> {
        console.log(res)
    }, 
    (err) => {
        console.log(err)
    }
)
// then函数可以接受两个回调函数作为参数,第一个回调函数在状态由pending转换为fulfilled时执行，第二个回调函数在状态由pending转换为rejected的时候执行。这两个回调函数都能接受Promise对象传出的值
```
resolve函数的参数除了正常的值以外，还可能是另一个 Promise 实例:如下

```
var p1 = new Promise(function (resolve, reject) {
  // resolve(2222222)

  // reject(111111)
})
var p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})

p2.then(result => console.log(result)).catch(error => console.log(error)) 
// 如果p1是resolve则打印2222222；如果p1是reject则打印111111
```
从上面例子中，p1和p2都是promise的实例。但是p2的resolve方法的参数是p1。即一个异步操作的结果是返回另一个异步操作。

注意：这时的p1的状态会传给p2，也就是。p1的状态决定了p2的状态。如果p1的状态是pending，那么p2的回调函数就会等待p1的状态改变；如果p1的状态已经是fulfilled或者rejected，那么p2的回调函数将会立刻执行。

```
<script>
    var p1 = new Promise(function (resolve, reject) {
        setTimeout(() => reject(new Error('fail')), 3000)
    })

    var p2 = new Promise(function (resolve, reject) {
        setTimeout(() => resolve(p1), 1000)
    })

    p2
    .then(result => console.log(result, 111))
    .catch(error => console.log(error, 222))
    // Error: fail 222
</script>
// 通过上述的秒速，这个就很好理解了。结合事件循环来讲述执行顺序
// 1、首先宏任务script 会执行分别执行p1和p2。
// 2、并将p1内的settimeout和p2内的settimeout（settimeout宏任务）放入宏任务队列中。
// 3、执行p2.then()方法。创建promise的并不是个微任务。而是它的.then()方法是个微任务。
// 4、这个时候p2的promise状态依旧是pending.
// 5、开始执行settimeout宏任务。一秒后，p1的状态变为fulfilled。但是因为resolve接受的是一个promise作为参数。所以，p1的状态由p2的状态决定，3秒后，p2的状态变为rejected。最后，p1的状态由pending转换为p2的状态变为rejected,最后，在catch中回调打印出结果 Error: fail, 222
```

注意，调用resolve或reject并不会终结 Promise 的参数函数的执行。

```
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});
// 2
// 1
```

Promise.prototype.then

从上方的图片，我们可以知晓。Promise的then方法，是挂载在构造函数Promise的原型对象Promise.prototype上的。它的作用是为Promise实例添加状态改变时的回调函数。then方法接手两个回调函数作为参数，第一个回调函数是在状态变为fulfilled是调用，第二个是在状态变为rejected时调用。

then方法返回的是一个新的Promise实例（不是原来的Promise实例）。因此可以采用链式写法，即then后面在调用一个then.如下示例：

```
Promise.resolve(1).then(res=>{console.log(res); return 2}).then(res=>console.log(res))

// 1
// 2
```



https://www.yuque.com/ostwind/es6/docs-promise#704f29e0