fiber

diff

    React-hooks自 16.8以来才真正被推而广之

    react-hooks 设计动机。

    类组件和函数组件两种形式的思考

    类组件 基于 es6 class 继承React.component得来的组件

    函数组件：以函数形式存在的React组件。再没有React.hooks的时候，函数组件内部无法定义和维护state,函数组件也被叫做无状态组件

    函数组件和类组件的对比：

    类组件需要继承class，函数组件不需要
    类组件可以访问生命周期，函数组件不能
    类组件可以获取实例化后的this,并基于this做各种事情，函数组件不可以
    类组件可以定义并维护state,而函数组件不能

    最主要的差别：就是面向对象编程和函数式编程两套不同的设计思想的差异。函数组件更契合react。react组件就是 ui= render(data).函数组件会捕获render内部的状态，而类组件不会。

    原因是。props虽然是不可变的,但this是可变的，this上的数据是可以被修改的

    useState() 为函数组件引入状态的api.

    useEffect() 用于为函数组件引入副作用的钩子。可以在一定程度上弥补了生命周期的缺失
    componentDidMount、comPonentDidUpdate和componentWillUnmount这三个生命周期做的事，可以放在useEffect中


    为什么要使用hooks.
        1、告别难以理解的class  this问题、还有生命周期
        2、解决业务逻辑难以拆分的问题  逻辑和生命周期耦合在一起
        3、是状态逻辑复用变得简单可变
        4、函数组件从设计思想上来看更加契合react的理念

    hooks 不能完全为函数组件补全类组件的功能，比如生命周期get­Snapshot­Before­Update

    hooks在使用层面有严格的规范约束



    hooks的工作机制

    使用原则：
    1、只能在react函数中调用Hook
    2、不要在循环、条件或者嵌套函数中调用hook（主要是为了确保hooks在每次渲染时保持同样的执行顺序）

    主要底层依赖顺序链表
