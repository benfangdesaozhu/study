vue为什么要重写原数组方法？

1、Vue 的响应式是通过 Object.defineProperty() 实现的，这个 api 没办法监听数组长度的变化，也就没办法监听数组的新增。
2、Vue 无法检测通过数组索引改变数组的操作，这不是 Object.defineProperty() api 的原因，而是[尤大认为性能消耗与带来的用户体验不成正比](https://github.com/vuejs/vue/issues/8562)。对数组进行响应式检测会带来很大的性能消耗，因为数组项可能会大，比如1000条、10000条。
