import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () =>
    import ('../views/shouye/Home')
const Category = () =>
    import ('../views/fenlei/Category')
const Cart = () =>
    import ('../views/gouwuche/Cart')
const Detail = () =>
    import ('../views/detail/Detail')
const Login = () =>
    import ('../views/loginregist/Login')

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


const routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/category',
        name: 'Category',
        component: Category
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart
    },
    {
        path: '/detail/:pid',
        name: 'Detail',
        component: Detail
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/my',
        name: 'My',
        meta: { title: '我的' },
        component: () =>
            import ('@/views/My')
    },
    {
        path: '/personalData',
        name: 'PersonalData',
        meta: { title: '个人中心' },
        component: () =>
            import ('@/views/PersonalData')
    },
    {
        path: '/addressList',
        name: 'AddressList',
        meta: { title: '新增地址' },
        component: () =>
            import ('@/views/AddressList')
    },
    {
        path: '/address/:aid?',
        name: 'Address',
        meta: { title: '地址管理' },
        component: () =>
            import ('@/views/Address')
    },
    {
        path: '/securityCenter',
        name: 'SecurityCenter',
        meta: { title: '安全中心' },
        component: () =>
            import ('@/views/SecurityCenter')
    },
    {
        path: "/collection",
        name: "Collection",
        meta: { title: '我的收藏' },
        component: () =>
            import ("@/views/Collection")
    },
    {
        path: "/order",
        name: "Order",
        mata: { title: '我的订单' },
        component: () =>
            import ("@/views/Order")
    },
    {
        path: '/search',
        name: 'Search',
        mata: { title: '搜索' },
        component: () =>
            import ('@/views/Search.vue')
    },
    {
        path: '/pay',
        name: 'Pay',
        mata: { title: '购买' },
        component: () =>
            import ('@/views/Pay.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

//全局后置路由守卫————初始化的时候被调用、每次路由切换之后被调用
router.afterEach((to, from) => {
    document.title = to.meta.title || '瑞幸咖啡' //更新浏览器文档标题
})

export default router