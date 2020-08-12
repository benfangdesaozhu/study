### 防抖（debounce）
**防抖函数：一个需要频繁触发的函数，在规定的时间内，只让最后一次执行，前面的不生效**
```
// 简单版
function debounce (func, wait) {
    // 初始化延时器
    var timeout = null
    return function () {
        console.log(timeout)
        clearTimeout(timeout)
        timeout = setTimeout(func, wait)
    }
}
// 从上述的打印结果来看，timeout可以访问debounce函数内初始化的timeout。这是利用闭包的原理，可以让变量，长期保存在内存中
```
**this**
```
function debounce (func, wait) {
    // 初始化延时器
    var timeout = null
    return function () {
        clearTimeout(timeout)
        timeout = setTimeout(function(){
            // 根据this的四个原则，来判断this是指向哪个
            func.call(this)
        }, wait)
    }
}
```
**arguments**
```
function debounce (func, wait) {
    var timeout = null
    return function () {
        var argu = arguments
        clearTimeout(timeout)
        timeout = setTimeout(function(){
            func.apply(this,argu)
        },wait)
    }
}
```
**立即执行immediate**
```
// func 需要处防抖的函数
// wait 在多久时间内不重复触发
// immediate 是否立即执行
function debounce(func,wait,immediate) {
    // 定时器
    var timeout = null
    return function() {
        var argu = arguments
        if(timeout) clearTimeout(timeout)
        if(immediate){
            var callNow = !timeout
            // 在一定时间内重置timeout，在wait时间内，重复触发，不会执行回调函数
            timeout = setTimeout(function(){
                timeout = null
            }, wait)
            // 根据timeout来判断是否可以执行回调
            if(callNow) func.apply(this, argu)
        } else {
            timeout = setTimeout(function(){
                func.apply(this, argu)
            }, wait)
        }
    }
}
```
**因为防抖的函数也有返回值**
```
function debounce (func, wait, immediate) {
    var timeout = null
    return function(){
        var argu = arguments
        var result
        if(timeout) clearTimeout(timeout)
        if(immediate) {
            var callNow = !timeout
            timeout = setTimeout(function(){
                timeout = null
            }, wait)
            if(callNow) result = func.apply(this, argu)
        } else {
            timeout = setTimeout(function(){
                func.apply(this, argu)
            }, wait)
        }
        return result
    }
}
```
**取消防抖**
```
function debounce (func, wait, immediate) {
    var timeout = null
    var debounced =  function(){
        var argu = arguments
        var result
        if(timeout) clearTimeout(timeout)
        if(immediate) {
            var callNow = !timeout
            timeout = setTimeout(function(){
                timeout = null
            }, wait)
            if(callNow) result = func.apply(this, argu)
        } else {
            timeout = setTimeout(function(){
                func.apply(this, argu)
            }, wait)
        }
        return result
    }
    // 在取消防抖后，可以立即重新触发防抖
    // 如示例当中：每间隔10秒才能触发一次防抖。但是取消之后，可以立即重新触发
    debounced.cancel = functino() {
        clearTimeout(timeout)
        timeout = null
    }
    return debounced
}
```
防抖示例：请参考[防抖](https://github.com/benfangdesaozhu/study/blob/master/js%E5%9F%BA%E7%A1%80/debounce.html)

