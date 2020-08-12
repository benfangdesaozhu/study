### **函数节流(throttle)**

**在给定的时间内，函数最多被触发一次**

原理：如果你持续触发事件，每隔一段时间，只执行一次事件。

**关于节流的实现，有两种主流的实现方式，一种是使用时间戳，一种是设置定时器。**

```
// 使用定时器
function throttle(func, wait) {
    var timeout;
    return function () {
        if(timeout) return
        var argu = arguments
        timeout = setTimeout(function(){
            timeout = null
            func.apply(this, argu)
        }, wait);
    }
}
```
```
//使用时间戳
function throttle(func, wait) {
    var prevTime = 0;
    return function () {
        var now = new Date().getTime()
        var argu = arguments
        if(now - prevTime > wait) {
            prevTime = now
            func.apply(this, argu)
        }
    }
}
```

**比较上序两个方法实现：**

**使用定时器的会在n秒后第一次执行，然后间隔n秒后继续执行（如果有持续触发）**

**使用定时器的在停止触发后依然会再执行一次事件**


**使用时间戳的会立即执行，然后间隔n秒后继续执行（如果有持续触发）**

**使用时间戳的在停止触发后没有办法再执行事件**

