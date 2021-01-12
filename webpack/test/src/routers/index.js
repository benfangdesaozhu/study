import Vue from 'vue';
import Router from 'vue-router'
const login = () => import('./../view/login/login.vue')
// import page1 from './../view/login/page1.vue';
// import login from './../view/login/login.vue'
const page1 = () => import('./../view/login/page1.vue')
const page2 = () => import('./../view/login/page2.vue')
Vue.use(Router)


const router = new Router({
    mode: 'history',
    routes: [
        {   
            path: '/',
            component: login,
        },
        {
            path: '/page1',
            component: page1
        },
        {
            path: '/page2',
            component: page2
        }
    ]
})
router.beforeEach((to, from, next) => {
    // console.log(to, from, nprogress)
    // nprogress.start()
    next()
})
router.afterEach(() => {
    // nprogress.done()
})
export default router