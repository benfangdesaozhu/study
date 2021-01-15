// import './styles/test.css'
// const a = 1
// document.write('hello webpack1211221')

import Vue from "vue"
import App from "./APP.vue"
import router from './routers'
import store from './store'
import "./styles/test.css"
import "./styles/index.less"

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

console.warn('main=', process.env.NODE_ENV)

new Vue({
    router,
    store,
    render:h=>h(App)
}).$mount('#app')