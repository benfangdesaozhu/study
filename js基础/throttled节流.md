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

```
        // option
        // leading：false 表示禁用第一次执行
        // trailing: false 表示禁用停止触发的回调
        function throttle (func, wait, option) {
            var timeout;
            var prevTime = 0; // 上一次执行回调的时间戳

            //无option传入的时候，初始化为{}
            if (!option) options = {}; 

            // 每次触发事件回调的时候，都执行这个方法
            var throttled =  function () {
                // 记录当前时间
                var now = new Date().getTime()

                var argu = arguments

                // 处理当leading：false（第一次回调不执行）的时候
                // 当prevTime=0代表第一次执行
                if(!prevTime && option.leading === false) prevTime = now

                // 如果走了上面判断，prevTime = now
                // 这个时候的 wait - (now - prevTime) = wait，如果传入了值，remaining就大于0， 本次就不执行了
                var remaining = wait - (now - prevTime) // remaining 距离下次执行func的时间
                if (remaining <= 0 || remaining > wait) {
                    if(timeout) {
                        clearTimeout(timeout);
                        timeout = null;
                    }
                    prevTime = now
                    func.apply(this, argu)
                } else if(!timeout && option.trailing !== false) {
                    // 最后一次需要触发的情况
                    // 如果已经存在一个定时器，则不会进入该 if 分支
                    // 如果 {trailing: false}，即最后一次不需要触发了，也不会进入这个分支
                    // 间隔 remaining milliseconds（毫秒） 后触发 later 方法
                    timeout = setTimeout(function(){
                        prevTime = new Date().getTime()
                        timeout = null
                        func.apply(this, argu)
                    }, wait);
                }
            }
            throttled.cancel = function () {
                prevTime = 0;
                timeout = null
                clearTimeout(timeout)
            }
            return throttled
        }
```
具体示例参考[throttled节流.html](https://github.com/benfangdesaozhu/study/blob/master/js%E5%9F%BA%E7%A1%80/throttled%E8%8A%82%E6%B5%81.html)