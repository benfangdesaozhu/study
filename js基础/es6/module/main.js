var a = require('./a.js')
var b = require('./b.js')
console.log('main加载完毕',a,b)

// b加载
// b加载完毕 { done: false }
// a加载
// a加载完毕
// main加载完毕 { done: true } { done: true }