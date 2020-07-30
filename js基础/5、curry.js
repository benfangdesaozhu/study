// 函数柯里化  

// 是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，
// 并且返回接受余下的参数而且返回结果的新函数的技术。

// 简单的来说就是：只传递给函数一个参数来调用它，让它返回一个函数去处理剩下的参数。
function a (x,y) {
    return x +y
}
a(1,2)
// 柯里化后
function klgA (x) {
    return function (y) {
        return x+y
    }
}
klgA(1)(2)

// 比如经典的面试题：实现一个函数 add(1)(2)(3) == 6
// 按照上面的方法。我们可以实现这个最简易的。如果这样的话，那如果是1-n个的话。那嵌套的话也需要n个
function add (x) {
    return (y) => {
        return (z) => {
            return x+y+z
        }
    }
}
// 改版1
function curry (fn) {
    return (x)=>{
        return (y) => {
            return (z) => {
                return fn(x,y,z)
            }
        }
    }
}
var sum = curry((x,y,z) => {return x+y+z})

sum(1)(2)(3)

// 递归

function curry (fn, n) {
    var list = []
    if (fn.length === 1) return fn
    return next(fn, n, list)
}
function next (fn, n, args) {
    return (x) => {
        args.push(x)
        if(n < fn.length - 1) {
            return next(fn, ++n, args)
        } else {
            console.log(...args)
           return fn(...args)
        }
    }
    
}

var sum = curry((x,y,z) => {return x+y+z}, 0)

sum(1)(2)(3)
// 优化 递归（少一个变量。没意义啊）
function curry (fn, n) {
    var list = []
    if (fn.length === 1) return fn
    function next (n, args) {
        return (x) => {
            args.push(x)
            if(n < fn.length - 1) {
                return next(++n, args)
            } else {
                console.log(...args)
                return fn(...args)
            }
        }
    }
    
    return next(n, list)
}

// 严格意义上的柯里化。是只接受一个参数
function curry (fn) {
    return (x) => {
        console.log(fn)
        if(fn.length <= 1) {
            return fn(x)
        } else {
            return curry(fn.bind(null, x))
        }
    }
}
curry((x,y,z) => {return x+y+z})(1)(2)(3)


