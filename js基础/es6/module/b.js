exports.done = false
var b = require('./a.js')
console.log('b加载')
exports.done = true
console.log('b加载完毕',b)