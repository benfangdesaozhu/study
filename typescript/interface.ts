function print1(test: {label: boolean}) {
    console.log(test.label)
}
let obj = {size: 1, label: false}
print1(obj) 

interface value1 {
    label: string
}

function print2(test: value1) {
    console.log(test.label)
    return 1
}
let obj1 = {size: 10, label: `1111`}
print2(obj1)
let obj2 ={label: '1'}
print2(obj2)

// 可选属性
// 接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在。
// 用法：只需要在属性名字的后面加个？符号就可表示为可选属性
interface SquareConfig {
    color?: string, // 有问好代表可选
    year: number,
}
function print3(test: SquareConfig) {
    console.log(test)
    return 1
}
print3({year: 1})
print3({year: 1, color: 'red'})
// print3({color: 'red'}) // Argument of type '{ color: string; }' is not assignable to parameter of type 'SquareConfig'.Property 'year' is missing in type '{ color: string; }' but required in type 'SquareConfig'.
// 在接口SquareConfig中的year是必填的，但是{color: 'red'} 缺少SquareConfig类型必填的参数，所有报错

// 只读属性 readonly  一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 readonly来指定只读属性:

interface readonlyE {
    readonly x: string,
    readonly y: number,
}
let a: readonlyE = {x: '1',y:2}
// a.x = 3 //  Cannot assign to 'x' because it is a read-only property.

// ReadonlyArray ReadonlyArray<T>类型，它与Array<T>相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改
