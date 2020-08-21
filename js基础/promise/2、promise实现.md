![Promise对象](./../images/t.png)

```
首先简单的使用Promise

var a = new Promise(function(resolve, reject){
    if(){
        resolve()
    } else {
        reject()
    }
})

a.then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})
```
简单版（同步）
```
var PENDING = 0
var FULFILLED = 1
var REJECTED = 2
function MyPromise (fn) {
    debugger
    var _this = this
    // 默认状态是PENDING
    _this.state = PENDING
    // 存储状态的值 默认是null
    _this.value = null

    // 状态转换为fulfill
    function fulfill (result) {
        _this.state = FULFILLED
        _this.value = result
    }

    // 状态转换为reject
    function reject (error) {
        _this.state = REJECTED
        _this.value = error
    }
    try {
        fn(fulfill, reject)
    }catch(err) {
        reject(err)
    }
}
MyPromise.prototype.then = function (a, b) {
    if(this.state === FULFILLED) {
        a(this.value)
    }
    if (this.status === REJECTED) {
        b(this.value)
    }
}

new MyPromise(function(res, rej){
    res(1)
}).then(res => {
    console.log(res)
})
// 打印 1

new MyPromise(function(res, rej){
    setTimeout(()=>{
        res(1)
    })
}).then(res => {
    console.log(res)
}) // 没有打印信息
```
处理异步
```
var PENDING = 0
var FULFILLED = 1
var REJECTED = 2
function MyPromise (fn) {
    debugger
    var _this = this
    // 默认状态是PENDING
    _this.state = PENDING
    // 存储状态的值 默认是null
    _this.value = null

    var onFlufilledCallbacks  // Promise resolve回调函数
    var onRejectedCallbacks  // Promise reject回调函数

    // 状态转换为fulfill
    function fulfill (result) {
        _this.state = FULFILLED
        _this.value = result
    }

    // 状态转换为reject
    function reject (error) {
        _this.state = REJECTED
        _this.value = error
    }
    try {
        fn(fulfill, reject)
    }catch(err) {
        reject(err)
    }
}
MyPromise.prototype.then = function (a, b) {
    if(this.state === FULFILLED) {
        a(this.value)
    }
    if (this.status === REJECTED) {
        b(this.value)
    }
}
```

https://zhuanlan.zhihu.com/p/183801144

瓶子君

https://www.promisejs.org/implementing/
