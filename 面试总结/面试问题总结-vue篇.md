vue computed和watch的区别
vue model指令的实现原理。
vue 虚拟dom diff算法
vue router history和hash的原理是啥
vue引用的是个fun为不是一个obj
vue-router的实现。history的实现、404问题
监听不了路由变换。

vuex模块化的实现。namespace概念
vuex的持久化缓存
vue模板解析

小程序跳转慢，有研究过为什么慢吗？
小程序背后实现的原理。和h5本质的区别在哪


es6新特性
promise介绍一下。all race的区别
es6的模块化和common.js模块化的区别
js的事件队列（异步）宏任务和微任务
js里有了宏任务为什么还要有微任务呢（调用方有什么区别吗。宏任务由宿主发起，微任务由js引擎发起的）
webpack背后的打包原理。打包流程是怎么样的
webpack的loader和pluging区别
webpack性能优化
h5的项目构建和发布。ci、cd流程
css盒模型
margin重叠解决方案。BFC
flex属性
浏览器的重绘和回流
浏览器输入url开始到页面显示的过程。发生了什么
DNS解析流程是怎样的
http的缓存机制
https了解过吗。加密过程（对称加密。密钥是怎么来的）
jq深拷贝



组件库怎么实现按需加载、
webpack的pre -load
微前端的应用，但是没有解决问题

操作面板有没有一种可能，还是同步，用户体感还是一样。

微前端mudusa 运作方式
改造了那些东西
了解，使用过的 登录鉴权方式有哪些
你对浏览器跨域处理、运作方式是怎样的。  浏览器采用的cors机制，怎么运作

nginx配置，怎么配置


react 状态管理。运作方式。原理。 reduce原理。
reduce  function

react 逻辑服用。 hoc、hooks、

hooks、 有没有什么方法，class components可以使用hooks
usestate 为什么不能在判断中使用hooks

有没有情况，hooks就需要放在if/else里面。而且放在里面特别好使
CommonJS和ESM的区别，我说了动态静态 / 按值按引用这俩区别

用react实现全局modal组件，调用方式modal.show()

[fn,fn,...]内所有函数为异步函数，需要实现一个函数可以使该数组内的所有函数按顺序串行执行？
HTTP缓存，强制缓存/策略缓存
CSS选择器的优先级
版本号 分别代表的含义  npm 特殊字符的意思 ^ ~ 这类的

webpack如何做优化
webpack如何配置多入口
promise有哪几种状态，promise.all有没有保证顺序
cdn有哪些好处
浏览器缓存、http缓存、DNs缓存
微前端子应用如何通信
http状态码301 307 302 
构造函数返回值为对象/基本类型/函数时，new的返回值分别是什么
websocket怎么建立连接、状态码是多少
本地开发和生产环境如何解决跨域
vue和react的区别
babel的工作流程
react组件优化渲染，减少不必要的重渲染
react和vue重渲染的区别（template的优化和date的监听）
react 17为什么不需要 import React from 'react'
redux的工作流。有哪些部分组成、reduce有什么用
react fiber的作用
写一个react.useRequest、useDebounce


301和302的区别 从缓存角度上，301会缓存结存、302下次还会通过服务器中拉取

webpack执行机制。run和compile 和 complier写 compile和complition的区别

webpack的插件执行机制。tabable的实现
vue模板解析

以下两段代码的结果和原因

function side(arr) {
  arr[0] = arr[2];
}
function a(a, b, c) {
  c = 10;
  side(arguments); 
  return a + b + c;
}

console.log(a(1,2,3))


function side(arr) {
  arr[0] = arr[2];
}
function a(a, b, c=3) {
  c = 10;
  side(arguments); 
  return a + b + c;
}

console.log(a(1,2,3))