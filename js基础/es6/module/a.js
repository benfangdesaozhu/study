exports.done = false
var a = require('./b.js')
console.log('a加载')
exports.done = true
console.log('a加载完毕')