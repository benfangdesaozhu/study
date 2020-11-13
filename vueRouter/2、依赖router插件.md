我们在上文提到。初始化VueRouter的时候，会在VueRouter添加install属性，以便依赖该插件（vue.use(VueRouter)）的时候，调用install函数。

现在来看一下install具体的代码(在第一章中也有说明)

```
function install (Vue) {  
    // 源码中为什么还需要这个判断呢？在vue.use已经判断过是否安装过插件，个人感觉是多余的判断。  
    if (install.installed) { return }
    install.installed = true
    
    // 向Vue的原型上注入$router和$route
    Object.defineProperty(Vue.prototype, '$router', {
      get: function get () { return this.$root._router }
    })
  
    Object.defineProperty(Vue.prototype, '$route', {
      get: function get$1 () { return this.$root._route }
    })

    Vue.mixin({
      // 在vue的生命周期beforeCreate阶段执行
      beforeCreate: function beforeCreate () {
        // 判断实例中的$options中是否有router  
        if (this.$options.router) {
          // 给实例的_router 赋值  
          this._router = this.$options.router
          // 初始化init
          this._router.init(this)
          // 实例的_route成响应式
          Vue.util.defineReactive(this, '_route', this._router.history.current)
        }
      }
    })
    // 注册组件
    Vue.component('router-view', View)
    Vue.component('router-link', Link)
}
```

当我们依赖插件的时候，会调用Vue.use(VueRouter)。这个时候会执行install方法

调用install方法。会做以下三件事

    1. 向Vue的原型上注入$router和$route
    2. 调用Vue.mixin({beforeCreate})方法,传入beforeCreate生命周期参数
    3. 注册router-view和router-link组件

所有在创建一个vue的实例的时候，会执行生命周期钩子函数。这个时候会去执行
```
// 判断vue实例中的$options中是否有router  
if (this.$options.router) {
    // 给实例的_router 赋值  
    this._router = this.$options.router
    // 初始化init
    this._router.init(this)
    // 实例的_route成响应式
    Vue.util.defineReactive(this, '_route', this._router.history.current)
}
```

执行VueRouter的内定义的生命周期钩子函数beforeCreate，主要执行以下几步

    1. 首先判断vue的实例中有$options中有无router。如果有router，说明已经创建过VueRouter的实例。

        这里介绍下。在构建vue的实例的时候，会给实例赋值this.$options = {el: '#app',...options,router: router},所以，如果已经创建过VueRouter的实例，则this.$options.router = 路由实例
    2. 然后给vue实例的_router赋值。
    3. 执行VueRouter的实例的init方法。也就是VueRouter原型上的init方法
    4. 将vue实例中的_route变成响应式

接着我们来看init方法
```
// app 是vue的实例
VueRouter.prototype.init = function init (app) {
    var this$1 = this;
    this.app = app
    var ref = this;
    var mode = ref.mode;
    var options = ref.options;
    var fallback = ref.fallback;
    switch (mode) {
      case 'history':
        this.history = new HTML5History(this, options.base)
        break
      case 'hash':
        this.history = new HashHistory(this, options.base, fallback)
        break
      case 'abstract':
        this.history = new AbstractHistory(this)
        break
      default:
        assert(false, ("invalid mode: " + mode))
    }
  
    this.history.listen(function (route) {
      this$1.app._route = route
    })
  };
```
init主要是做以下几件事
    1. 给VueRouter的实例的app属性赋值，值为Vue的实例
    2. 根据定义的mode值，选用不同的路由模式。[history和hash的实现](./router-model.html)

我们发现在构建这些路由模式hash或者history的时候，都会调用this.transitionTo(getLocation(this.base)).下面一章我们单独分析三种模式的实现。

现在我们再来看下注册组件
```
Vue.component('router-view', View)
Vue.component('router-link', Link)

Vue['component'] = function (
    id,
    definition
) {
    definition.name = definition.name || id;
    definition = this.options._base.extend(definition);
    this.options[type + 's'][id] = definition;
    return definition
};
```

```
var View = {
    name: 'router-view',
    functional: true,
    props: {
      name: {
        type: String,
        default: 'default'
      }
    },
    // h: 4294行 function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
    // ref: FunctionalRenderContext构造函数的实例
    // createFunctionalComponent中 new FunctionalRenderContext()
    render: function render (h, ref = {children, parent, data, props, slots, scopedSlots, injections, listeners}) {
      var props = ref.props;
      var children = ref.children;
      var parent = ref.parent;
      var data = ref.data;
  
      data.routerView = true
  
      var route = parent.$route
      var cache = parent._routerViewCache || (parent._routerViewCache = {})
      var depth = 0
      var inactive = false
  
      while (parent) {
        if (parent.$vnode && parent.$vnode.data.routerView) {
          depth++
        }
        if (parent._inactive) {
          inactive = true
        }
        parent = parent.$parent
      }
  
      data.routerViewDepth = depth
      var matched = route.matched[depth]
      if (!matched) {
        return h()
      }
  
      var component = inactive
        ? cache[props.name]
        : (cache[props.name] = matched.components[props.name])
  
      if (!inactive) {
        (data.hook || (data.hook = {})).init = function (vnode) {
          matched.instances[props.name] = vnode.child
        }
      }
  
      return h(component, data, children)
    }
}
```