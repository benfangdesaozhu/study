// 类型注解（say一定需要传入的是string类型）
function test (say: string) {
    console.log(`hello ${say}`)
}
var say = `world`;

test(say)

// 基本类型

let test1: string = `111`
let test2: number = 1
let test3: boolean = false

// 数组定义有两种方式
let arr: Array<number> = [1,2,3]
let arr1: number[] = [1,2,3]

// 元组 Tuple：元组类型表示一个已知元素的数量和类型的数组，各个元素的类型不必相同

let arrTuple: [string,number, boolean] = [`1`,2,false];

// 枚举：enum: enum类型是对javascipt标准类型的一个补充
// 默认情况下，从0开始为元素编号。 你也可以手动的指定成员的数值。 
enum Color {yellow, blue} // 相当于对象{0: 'yellow', 1: 'blue', yellow: 0, 'blue': 1}
let c: Color = Color.yellow

enum Color1 {yellow=1, blue} // 相当于对象 {1: 'yellow', 2: 'blue', yellow: 1, 'blue': 2}

let c1: Color1 = Color1.yellow

enum Color2 {yellow=1111, blue} // 相当于对象  {1111: "yellow", 1112: "blue", yellow: 1111, blue: 1112}

enum Color3 {yellow, blue=`heh`} // 相当于对象  {0: "yellow", yellow: 0, blue: "heh"}

enum Color4 {yellow="hah1", blue=`heh`} // 相当于对象  {yellow: "hah1", blue: "heh"}

enum Color5 {yellow="hah1", blue=2} // 相当于对象  {2: "blue", yellow: "hah1", blue: 2}

// enum Color6 {yellow="hah1", blue} // 报错 Enum member must have initializer

// Any 可以定义任何类型

let anyE: any = 1

let anyE1: any = `1`
let anyE2: any = [1,'2']
let anyE3: any = {a: 1, b: '1'}

// void void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void

function warnUser (): void {
    console.log("This is my warning message")
}

// 声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null：
let warnUser1: void = undefined
let warnUser2: void = null


// null 和 undefined

// TypeScript里，undefined和null两者各自有自己的类型分别叫做undefined和null。 和 void相似，它们的本身的类型用处不是很大：
let nullE: null = undefined
let nullE1: null = null
let undefinedE: undefined = undefined
let undefinedE1: undefined = null

// Never


// Object
// object表示非原始类型，也就是除number、string、boolean、symbol、null或undefined之外的类型
let objE: object = {}

// Object类型包括了原始值
let objE1: Object = 1

// 这个网站入门。言简意赅，很容易明白。
// https://ts.xcatliu.com/ 