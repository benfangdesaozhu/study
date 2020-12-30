import Vue from "vue"
import App from "./APP"

import "./style/index.less"
console.log(111)
new Vue({
    render:h=>h(App)
}).$mount('#app')