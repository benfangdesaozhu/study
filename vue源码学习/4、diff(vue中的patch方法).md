虚拟DOM的核心部分是patch,它可以将vnode渲染成真实的dom

patch（补丁）的过程实质上是指：以新的VNode为基准，改造旧的oldVNode使之与新的VNode相同，这就是patch的过程。

实际上，patch的过程主要是做三件事：

* 1、创建节点：

    * 新的VNode中有而旧的VNode没有，就在旧的VNode创建不存在的节点

* 2、删除节点：

    * 新的VNode中没有，而旧的VNode有这个节点，则在旧的oldVNode上删除这个节点

* 3、更新节点

    * 新的VNode和旧的oldVNode中都有，就以新的VNode为准，更新旧的oldVNode。

### 2、创建节点

    我们直接看源码部分。
```
function isDef (v) {
    return v !== undefined && v !== null
}
function isTrue (v) {
    return v === true
}
function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
) {
    const data = vnode.data
    const children = vnode.children
    const tag = vnode.tag
    if (isDef(tag)) { // 判断当前节点的标签名不为空
        vnode.elm = nodeOps.createElement(tag, vnode) // 创建元素节点
        createChildren(vnode, children, insertedVnodeQueue) // 创建元素节点的子节点
        insert(parentElm, vnode.elm, refElm) // 插入节点中
    } else if (isTrue(vnode.isComment)) { // 是否为注释节点
        vnode.elm = nodeOps.createComment(vnode.text) // 创建注释节点
        insert(parentElm, vnode.elm, refElm)
    } else { // 
        vnode.elm = nodeOps.createTextNode(vnode.text) // 创建文本节点
        insert(parentElm, vnode.elm, refElm)
    }
}

function createChildren (vnode, children, insertedVnodeQueue) {
      if (Array.isArray(children)) {
        {
          checkDuplicateKeys(children);
        }
        for (var i = 0; i < children.length; ++i) {
          createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i); // 这里递归创建子节点
        }
      } else if (isPrimitive(vnode.text)) {
        nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
      }
    }
```

从上方的代码，我们可以清晰的看出。

* 需要判断当前的tag是否存在tag标签。如果存在标签。则调用createElement创建元素节点，然后再递归创建子节点。创建好所有的子节点之后，插入DOM中

* 如果不存在tag标签。则判断当前节点是否为注释节点.只需要判断VNode中的isComment属性是否为true就行.如果为true,则表示该节点为注释节点.

* 如果既不是元素节点,也不是注释节点,那就被认为是文本节点,则调用createTextNode方法来创建文本节点,再插入到DOM中.

![创建节点](./images/创建节点.png)
### 3、删除节点
```
function parentNode (node) {
    return node.parentNode
}
function removeNode (el) {
    const parent = nodeOps.parentNode(el) // 获取父节点
    // element may have already been removed due to v-html / v-text 元素可能由于v-html/v-text而被删除
    if (isDef(parent)) { // 存在
      nodeOps.removeChild(parent, el) 删除
    }
  }
```

    如果在新的VNode节点没有,而在旧的oldVNode中有,那么就需要把这些节点从旧的oldVNode删除.删除很简单.获取到父节点之后,调用父节点的removeChild方法即可.

### 4、更新节点
