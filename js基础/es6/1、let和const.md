es6之前。声明变量的方式，只有var和函数声明两种。并且，在解析javascript代码时，会先进行变量提升。

在es6中增加了let const 
### let

let声明的变量有以下特征：

1、为javascript增加了块级作用域

2、不存在变量提升。变量提升（就是可以在变量声明之前使用这个变量）

```
// var声明变量时
console.log(a) // undefined 变量提升
var a = 2

// let 声明变量时
console.log(b) // 报错ReferenceError
let b = 2

```
3、会形成暂时性死区

只要在块级作用域内（块级作用域es6才有）使用let声明变量,它所声明的变量就绑定在当前作用域内，不在受外部变量影响。

es6明确规定。如果在区块内使用了let、const声明变量，这一区块从一开始就形成封闭的作用域。凡事在let、const声明的变量之前使用这些变量，都会报错。
```
var temp = 'test'
if(true) {
    typeof test // undefined
    typeof temp // 也会报错：ReferenceError
    console.log(temp) // ReferenceError
    let temp = 'scope'
}
// 在es5是：使用typeof对一个未声明的变量，typeof会返回undefined.但在使用了let的声明的变量之前进行类型检测，会报错
```

4、不允许变量重复声明

不允许在相同作用内，重复声明

```
// 报错
function func() {
  let a = 10;
  var a = 1;
}

// 报错
function func() {
  let a = 10;
  let a = 1;
}

function func(argu) {
  let argu = 10
}
func() // 报错

function func(argu) {
    {
        let argu = 10
    }
}
func() //正常
```

### 2、块级作用域（貌似增加了块级作用域。需要再去找资料求证。与原文写的不符）

es6之前，javascript只有两种作用域。全局作用域、函数作用域

而es6。在增加了let和const之后，在块级内使用let和const从而使当前作用域形成一个块级作用域（并不是es6增加了块级作用域）

```
for(var i = 0; i< 10; i++){

}
console.log(i) // 10  

// 如果是es6增加了块级作用域。这个打印会报错，其实不然，这个打印并不会报错。

//但是如果我们把var 改成let声明。便会报错
for(let i = 0; i< 10; i++){

}
console.log(i) // 10  

// 这更能让人容易理解。es6中的let和const会让当前作用域块形成块级作用域



```

### 3、const

const声明的是一个常量。声明了之后就不会改变。（如果是基本数据类型不会改变。引用数据类似的话。不能定义改变引用类型的指针。）

const在声明的时候就必须初始化，如果不初始化，会报错

const和let类似：

    1、只在所声明的块级作用域内有效
    2、const也不会变量提升、同样存在暂时性死区，只能在声明后面使用
    3、与let一样，不能重复声明
