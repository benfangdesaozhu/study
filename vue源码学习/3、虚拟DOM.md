### 1、虚拟DOM简介（vue中的虚拟dom实现）

#### 1.1 什么是虚拟DOM

    虚拟DOM(virtual-dom)只是一个概念，并不是真实的DOM。它是一个用来表示DOM的一种树形结构的对象（本质上就是一个js对象）。

#### 1.2 为什么需要虚拟DOM

    相比于操作DOM对象，处理原生的javascript对象的效率会更高。

    如果有一个渲染对象树（V-DOM）能表示DOM结构，那么每当这个对象发生变化的时候，我们就能使用最新的渲染对象树转化为真正的dom树。从而达到渲染整个视图的目的。

    如果是按照上述说的，直接使用新的渲染对象树进行渲染整个试图的话，那和innerHtml是一样的效果，在渲染之前，会比较更新前的渲染对象树和更新后的渲染对象树的差异，这些差异就是我们需要进行更新的部分试图。这样就达到了，渲染的时候，只需要操作哪些不同部分的DOM结构，从而达到更新整个试图的作用。

    而vue是数据驱动的。所以我们可以总结vue的虚拟DOM以及更新试图的过程

    1、用javascript对象结构表示DOM树的结构，然后用这个树构建一个真正的DOM结构，插到文档中去。
    2、当数据变更后，重新构建一个新的对象树。然后对旧的对象树和新的对象树进行比较。记录两者差异
    3、将旧的对象树更新到新的对象树上（结构一致，不变。增的，在旧的结构添加。删的，在旧的结构进行删除，使得新旧的结构保持一致)

### 2、vue中的VNode实现

#### 2.1、 VNode类

    我们来看看vue中的源码VNode类

```
源码位置：
https://github.com/vuejs/vue/blob/v2.6.0/src/core/vdom/vnode.js

export default class VNode {
  tag: string | void; // 当前节点的标签名
  data: VNodeData | void; // 
  children: ?Array<VNode>; // 当前节点的子节点集合（一个数组）
  text: string | void; // 当前节点的文本
  elm: Node | void; // 当前虚拟节点对应的真实dom节点
  ns: string | void; // 
  context: Component | void; // rendered in this component's scope
  key: string | number | void; // 节点的key属性，用于标记节点，用于优化
  componentOptions: VNodeComponentOptions | void; // 组件的options选项
  componentInstance: Component | void; // component instance // 组件实例
  parent: VNode | void; // component placeholder node（组件占位符节点） // 组件父节点（后续确定是什么）

  // strictly internal
  raw: boolean; // contains raw HTML? (server only) // 是否是原始Html
  isStatic: boolean; // hoisted static node // 静态节点
  isRootInsert: boolean; // necessary for enter transition check // 
  isComment: boolean; // empty comment placeholder? // 是否为注释节点
  isCloned: boolean; // is a cloned node? // 是否为克隆节点
  isOnce: boolean; // is a v-once node? // 是否有v-once指令节点
  asyncFactory: Function | void; // async component factory function // 异步组件工厂功能
  asyncMeta: Object | void;
  isAsyncPlaceholder: boolean;
  ssrContext: Object | void;
  fnContext: Component | void; // real context vm for functional nodes
  fnOptions: ?ComponentOptions; // for SSR caching
  devtoolsMeta: ?Object; // used to store functional render context for devtools
  fnScopeId: ?string; // functional scope id support

  constructor (
    tag?: string,
    data?: VNodeData,
    children?: ?Array<VNode>,
    text?: string,
    elm?: Node,
    context?: Component,
    componentOptions?: VNodeComponentOptions,
    asyncFactory?: Function
  ) {
    this.tag = tag 
    this.data = data 
    this.children = children 
    this.text = text
    this.elm = elm
    this.ns = undefined
    this.context = context
    this.fnContext = undefined
    this.fnOptions = undefined
    this.fnScopeId = undefined
    this.key = data && data.key
    this.componentOptions = componentOptions
    this.componentInstance = undefined
    this.parent = undefined
    this.raw = false
    this.isStatic = false
    this.isRootInsert = true
    this.isComment = false
    this.isCloned = false
    this.isOnce = false
    this.asyncFactory = asyncFactory
    this.asyncMeta = undefined
    this.isAsyncPlaceholder = false
  }

  // DEPRECATED: alias for componentInstance for backwards compat.
  /* istanbul ignore next */
  get child (): Component | void {
    return this.componentInstance
  }
}

从上面的源码可以看到。VNode类是一个描述真实DOM节点所需的一系列属性。
```

```
// 创建注释节点
export const createEmptyVNode = (text: string = '') => {
  const node = new VNode()
  node.text = text
  node.isComment = true
  return node
}
// 创建文本节点
export function createTextVNode (val: string | number) {
  return new VNode(undefined, undefined, undefined, String(val))
}
```

https://github.com/livoras/blog/issues/13