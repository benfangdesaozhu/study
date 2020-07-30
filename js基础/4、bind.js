// bind和call、apply最大的区别就是 
// 前者返回一个原函数的拷贝，并拥有指定的this值和初始化参数。 // 第22行打印结果
// 后者直接执行了函数 // 第15行打印结果

const module1 = {
    x: 42,
    getX: function() {
      return this.x;
    }
  };
  const test = {
      x: 'test'
  }
  console.log('call', module1.getX.call(test))
  // call test
  const unboundGetX = module1.getX;
  console.log(unboundGetX()); // The function gets invoked at the global scope
  // expected output: undefined
  
  const boundGetX = unboundGetX.bind(module1);
  console.log(boundGetX, boundGetX());
  // expected output: [Function bound.getX] 42

// 1、指定 this
// 2、传入参数
// 3、返回一个函数
// 4、柯里化
//fn.bind(null, x)
Function.prototype.myBind = function (context) {
    const args = Array.prototype.slice.call(arguments, 1)
    const that = this
    return function () {
        const bindArgs = Array.prototype.slice.call(arguments)
        return that.apply(context, args.concat(bindArgs))
    }
} // 不支持new
const boundGetX1 = unboundGetX.myBind(module1);
console.log(boundGetX1, boundGetX());
// 但还有一个问题，bind 有以下一个特性：
// 一个绑定函数也能使用 new 操作符创建对象：这种行为就像把原函数当成构造器，提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。


// 函数柯里化以Haskell Brooks Curry命名，柯里化是指将一个函数分解为一系列函数的过程，每个函数都只接收一个参数。
//（译注：这些函数不会立即求值，而是通过闭包的方式把传入的参数保存起来，直到真正需要的时候才会求值）


// 策略模式（设计模式）