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
    var _this = this
    // 默认状态是PENDING
    _this.state = PENDING
    // 存储状态的值 默认是null
    _this.flufillValue = null
    _this.rejectValue = null

    _this.onFlufilledCallbacks = []  // Promise resolve回调函数
    _this.onRejectedCallbacks = []  // Promise reject回调函数

    // 状态转换为fulfill
    function fulfill (result) {
        _this.state = FULFILLED
        _this.flufillValue = result
        _this.onFlufilledCallbacks.forEach((ele) => {
            ele()
        })
        _this.onFlufilledCallbacks = []
    }

    // 状态转换为reject
    function reject (error) {
        _this.state = REJECTED
        _this.rejectValue = error
        _this.onRejectedCallbacks.forEach((ele) => {
            ele()
        })
        _this.onRejectedCallbacks = []
    }
    try {
        fn(fulfill, reject)
    }catch(err) {
        reject(err)
    }
}
MyPromise.prototype.then = function (a, b) {
    if(this.state === FULFILLED) {
        a(this.flufillValue)
    }
    if (this.status === REJECTED) {
        b(this.rejectValue)
    }
    if(this.state === PENDING) {
        this.onFlufilledCallbacks.push(() => {
            a(this.flufillValue)
        })
        this.onRejectedCallbacks.push(() => {
            b(this.rejectValue)
        })
    }
}
```

```
写到这里，再看网上的实现方式，感觉瓶子君的实现比较容易理解。
var PENDING = 0
var FULFILLED = 1
var REJECTED = 2

function myPromise(fn) {
    var _this = this
    // 默认状态是PENDING
    _this.state = PENDING
    // 存储状态的值 默认是null
    _this.flufillValue = null
    _this.rejectValue = null

    _this.onFlufilledCallbacks = []  // Promise resolve回调函数
    _this.onRejectedCallbacks = []  // Promise reject回调函数

    _this.resolve = function (value) {
        // 如果参数是个promise(也就是新的myPromise的实例)
        if(value instanceof myPromise) {
            return value.then(_this.resolve, _this.reject)
        }
        setTimeout(() => {
            if(_this.state === PENDING) {
                _this.state === FULFILLED
                _this.flufillValue = value
                _this.onFlufilledCallbacks.forEach((ele) => {
                    ele()
                })
            }
        })
    }

    _this.reject = function (value) {
        setTimeout(() => {
            if(_this.state === PENDING) {
                _this.state === REJECTED
                _this.rejectValue = value
                _this.onRejectedCallbacks.forEach((ele) => {
                    ele()
                })
            }
        })
    }
    try {
        fn(resolve, reject)
    }catch(err) {
        _this.reject(err)
    }
}
myPromise.prototype.then = function (a, b) {
    var _this = this
    a = typeof a === 'function' ? a : () => {}
    b = typeof b === 'function' ? b : (error) => { throw error}
    if(this.state === FULFILLED) {
        return new myPromise(function(resolve, reject) {
            setTimeout(() => {
                var x = a(_this.flufillValue)
                if(value instanceof myPromise) {
                    return value.then(_this.resolve, _this.reject)
                }
                resolve(x)
            })
        })
    }
    if (this.status === REJECTED) {
        return new myPromise(function(resolve, reject) {
            setTimeout(() => {
                reject(b(_this.rejectValue))
            })
        })
    }
    if(this.state === PENDING) {
        return new myPromise(function(resolve, reject) {
            _this.onFlufilledCallbacks.push(() => {
                resolve(a(_this.flufillValue))
            })
            _this.onRejectedCallbacks.push((resolve, reject) => {
                reject(b(_this.rejectValue))
            })
        })
    }
}
```

https://zhuanlan.zhihu.com/p/183801144

瓶子君

https://www.promisejs.org/implementing/
