setState 是同步还是异步

    如果是同步的话。每次setState都会执行更新的生命周期，触发render渲染，这对于性能来说开销是非常大的。

    所有实现的话。就如vue的nexttick或者eventLoop是一样的。
    每来一个setState，就把他塞进一个队列当中，等时机成熟，把队列当中的state结果做合并，最后只针对最新的state值走一遍更新流程  这个过程就叫做‘批量更新’

    在setTimeout当中的话。setState又是同步的

    setState的表现会因调用场景的不同而不同：
        在react钩子函数及合成事件中表现为异步
        在setTimeout、setInterval等函数，包括dom原生事件中，他表现为同步


    fiber架构

    react15以stack Reconciler 重构为react16版本的Fiber Reconciler

    Stack Reconciler 局限性 是一个同步递归的过程

    Fiber Reconciler

    react 16在所有情况下都是异步渲染的吗



    React.render调用栈---初始化阶段
