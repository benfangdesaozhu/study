// 解析call和apply的原理
// 首先，要理解原理的话，我们需要知道的概念和他们的使用场景
// mdn上。对call的解释是：call()方法使用一个指定的this值和单独给出的一个或者多个参数来调用一个函数
// mdn上。对apply的解释是：apply()方法调用一个具有给定this值的函数，以及作为一个数组（或类似数组对象）提供的参数。

// 从解释上来。首先明确一点，就是call和apply都是一个方法。
// Function.prototype.call(thisArg, arg1, arg2,....,argn) 、Function.prototype.apply(thisArg,[arg1,...,argn])
// 第一个参数，是函数运行时使用的 this 值（如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装。）

// call和apply只有一个区别。就是接收的第二个参数不一样。
// call接收一个参数列表，apply接收的是一个参数数组

function sayWord() {
    var talk = [this.name, 'say', this.word].join(' ');
    console.log(this.name, talk);
  }
  
  var bottle = {
    name: 'bottle', 
    word: 'hello'
  };
  
  // 使用 call 将 bottle 传递为 sayWord 的 this
  sayWord.call(bottle); 
  // bottle say hello

  
  // 例子2
  name=121321
  sayWord.call()
  // undefined say
// 从上面的例子： 我们可以看到。call方法 改变了this的指向（由sayWord指向bottle）。 bottle执行了sayWord的方法
Function.prototype.myCall = function () {
    // console.log(this) // 当前this指向sayWord

    let target = [...arguments].shift() // 将this要指向的目标值对象
    // if (typeof target !== 'function') {
    //   throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    // }
    target = target ? Object(target) : window // 例子2：（如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装。）
    target.fn = this // 将目标对象新增fn对象，对象的value是 sayWord方法

    const arg = [...arguments].slice(1) // bottle函数的参数
    const result = target.fn(...arg) // bottle执行了sayWord的方法
    delete target.fn // 删除当前对象
    return result // 返回 sayWord的返回值（函数是可以有返回值的）
}
sayWord.myCall(); 
