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
        debugger
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
                fn(_this.resolve, _this.reject)
            }catch(err) {
                _this.reject(err)
            }
        }
        myPromise.prototype.then = function (a, b) {
            debugger
            var _this = this
            console.log(a)
            a = typeof a === 'function' ? a : (value) => value // 相当于return value 这里卡了挺久的
            b = typeof b === 'function' ? b : (error) => { throw error}
            if(this.state === FULFILLED) {
                return new myPromise(function(resolve, reject) {
                    setTimeout(function(){
                        var x = a(_this.flufillValue)
                        console.log(a)
                        if(x instanceof myPromise) {
                            x.then(resolve, reject)
                        }
                        resolve(x)
                    })
                })
            }
            if (this.state === REJECTED) {
                return new myPromise(function(resolve, reject) {
                    setTimeout(() => {
                        reject(b(_this.rejectValue))
                    })
                })
            }
            if(this.state === PENDING) {
                // 当还处于pending 是。将当前的回调放入第一次new的promise中。
                console.log(_this)
                return new myPromise(function(resolve, reject) {
                    _this.onFlufilledCallbacks.push(() => {
                       var x = a(_this.flufillValue)
                        if(x instanceof myPromise) {
                          x.then(resolve, reject)
                        }
                        resolve(x)
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

<!-- promise all的实现 -->
 function customerPromiseAll(promises) {
    return new Promise((resolve, reject) => {
      let resultCount = 0; //计数器
      let promiseLen = promises.length; //传入的promise个数
      let results = new Array(promiseLen);//初始化数组用于存放返回结果
 
      //按顺序执行
      for (let i = 0; i < promiseLen; i++) {
        promises[i].then(value => {
          resultCount++;
          results[i] = value; //保证执行结果的顺序
          if (resultCount === promises.length) {
            return resolve(results) //执行完最后一个promise，则返回
          }
        }, error => {
          reject(error) //执行错误直接reject
        })
      }
    })
  }