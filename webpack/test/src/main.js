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

import VueI18n from 'vue-i18n'

import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import ElementLocale from 'element-ui/lib/locale'
Vue.use(VueI18n)
const zhLocaleObj = {...zhLocale}
zhLocaleObj.el.pagination.goto = '跳转123123'
const i18n = new VueI18n({
    locale: 'zh', // set locale
    messages: {
        zh: zhLocaleObj
      }, // set locale messages
  })
  
ElementLocale.i18n((key, value) => i18n.t(key, value))
Vue.use(ElementUI)
console.warn('main=', process.env.NODE_ENV)
new Vue({
    router,
    store,
    render:h=>h(App)
}).$mount('#app')