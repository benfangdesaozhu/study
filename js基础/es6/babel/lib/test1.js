// node
// var a = require('./test')
//es6
import * as a from './test'
console.log(a)
console.log(a.count);  // 3
a.add();
console.log(a.count); // es6 4 node 3