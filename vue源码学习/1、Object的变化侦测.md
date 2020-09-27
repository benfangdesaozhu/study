本次源码阅读，参考vue2.6.0版本。[详情可参考](https://github.com/vuejs/vue/tree/v2.6.0)

### Object的变化侦测

#### 1、vue是如何追踪变化

在研究vue是如何追踪变化的之前。我们先了解下，javascript是通过什么来检测对象变化的？

这个问题看过红宝书等其他的前端进阶书籍的同学都知道。es6之前可以通过Object.defineProperty以及es6的Proxy来实现。

因为浏览器对es6的支持还不是很理想，vue2的版本，使用Object.defineProperty的方法来实现。

vue3使用Proxy替换了Object.defineProperty的方来来实现响应式

并且因为Object.defineProperty的方法是es5中一个无法shim的特性。导致vue不能兼容ie8以及之前的版本。

```
function defineReactive (data, key, val) {
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function(){
            return val
        },
        set: function(newVal){
            if(newVal === val) {
                return
            }
            val = newVal
        }
    })
}

这里的defineReactive用来对Object.DefineProperty进行封装。
其作用是定义了一个响应式数据。也就是在这个函数中进行变化追踪，
封装后只需要传入data、key、val就行

每当从data中读取监听的key时，会触发get函数。在对监听的key设置值时，set函数会被触发。
```


#### 2、依赖收集

##### 2.1、如何收集依赖

```
<template>
    <div>{{name}}</div>
</template>
data(){
    return {
        name: 'cjm'
    }
}
vue中定义的数据，在name变化时。模版中数也会跟随这数据的变化而变化。

那与上面的defineReactive有什么关联呢？

我的理解是：通过defineReactive监听data中返回的对象的每一个值。
当模版中使用name的时候，就会触发get方法，并在该方法收集对应的依赖，
当name发生变化时，会触发set方法，通过set方法来触发set收集的依赖。

总结来说：在getter中收集依赖，在setter中触发依赖
```

##### 2.2、依赖收集到哪去？

```
在2.1中我们明确知道。在getter中收集依赖，那么收集到的依赖放哪呢

首先我们想到的就是将每一个key对应的收集到的依赖放到一个数组中。这样defineReactive
就可以改造成这样

function defineReactive(data, key, val){
    var Dep = []
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            Dep.push(window.target)
            return val
        },
        set: function(newVal) {
            if(newVal === val) {
                return
            }
            for(var i = 0 ;i< Dep.length; i++) {
                Dep[i]()
            }
            val = newVal
        }
    })
}

这里创建了Dep数组，用来存储收集的依赖
然后在set被触发的时候，循环Dep以触发收集到的依赖。

这里把Dep单独提取出来。

class Dep {
    constructor(){
        this.subs = []
    }
    addSub (sub) {
        this.subs.push(sub)
    }

    removeSub(sub){
        remove(this.subs, sub)
    }
    depend(){
        if(window.target) {
            this.addSub(window.target)
        }
    }
    notify() {
        var subs = this.subs.slice()
        for(let i = 0 ; i < subs.length; i++) {
            subs[i].update() // 调用watcher的update方法
        }
    }

}
function remove(subs, sub) {
    if(subs.length) {
        const index = subs.indexOf(sub)
        index > -1 && subs.splice(index, 1)
    }
}

defineReactive的方法也可以改造为：

function defineReactive(data, key, val) {
    let subs = new Dep()
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            subs.depend()
        },
        set: function(newVal) {
            if(val === newVal) {
                return val
            }
            val = newVal
            subs.notify()
        }
    })
}

依赖收集在getter中，而收集依赖收集到Dep中
```

##### 2.3、依赖收集所收集的依赖是谁？

因为依赖收集发生在getter中，并切依赖收集到Dep中，所有。我们可以知道。我们所要收集的依赖其实是depend方法内的window.target。

收集谁，也可以理解为。收集到的依赖，在数据变化之后要通知谁（收集谁，就是通知谁）

我们要通知用到的数据的地方，而用到数据的地方有很多，而且类似还不一样。既有模版，也有用户写的watch，这个时候需要抽象一个类出来，能集中处理这些情况的。然后，我们在收集阶段只收集这个封装好的类的实例进来，通知也只通知它一个。我们叫它Watcher.

也就是依赖收集，收集的就是Watcher

##### 2.4、什么是Watcher
疑问🤔️：执行Object.defineProperty和watcher的执行先后，因为defineProperty的depend是需要target。而target的赋值是在watcher中的
(打断点去看。发现，会先执行Object.DefineProperty,然后模版中使用到的值会触发Object.DefineProperty的getter方法，将收集当前watcher实例依赖。)
```
class Watcher {
    constructor(vm, expOrFn, cb,){
        this.vm = vm

        this.cb = cb
        this.getter = parsePath(expOrFn)
        this.value = this.get()
    }

    get(){
        window.target = this
        let value = this.getter.call(this.vm, this,vm)
        window.target = null
        return value
    }
    update(){
        var oldValue = this.value
        var value = this.get()
        this.cb.call(this.vm, value, oldValue)
    }
}
这个Watcher类，在创建实例的时候，会调用原型属性的get方法，把当前实例赋值给target(收集依赖的方法)


/**
 * Parse simple path.(解析简单路径)
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}
// 如果是vue.html的简单demo例子。是不会执行parsePath方法解析滴。(待有空，再分析。)
```

##### 2.5、递归侦测所有的key

```
class Observer {
    constructor(val) {
        this.value = val
        if(!Array.isArray(val)) {
            this.walk()
        }
    }
    walk() {
        let keys = Object.keys(this.value)
        for(var i = 0; i< keys.length; i++) {
            defineReactive(this.value, keys[i], this.value[keys[i]])
        }
    }
}

function defineReactive(data, key, val) {
    if(typeOf val === 'object') {
        new Observer(val)
    }
    let subs = new Dep()
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            subs.depend()
        },
        set: function(newVal) {
            if(val === newVal) {
                return val
            }
            val = newVal
            subs.notify()
        }
    })
}

```