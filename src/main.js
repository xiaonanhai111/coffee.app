import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.prototype.$bus = new Vue()
import { NavBar } from 'vant';
Vue.use(NavBar);
import { Search } from 'vant';
Vue.use(Search);
import { Stepper } from 'vant';
Vue.use(Stepper);
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.config.productionTip = false

// 导入 axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)


// 导入vant组件
import 'vant/lib/index.css'
import Vant from 'vant';
Vue.use(Vant);

// 请求之前执行, 请求拦截器
axios.interceptors.request.use(config => {
    // console.log('config ==> ', config);

    // 判断请求方式是否等于 post
    if (config.method === 'post') {
        // console.log('修改前:config.data ==> ', config.data);
        // 序列化post请求参数
        let paramsString = '';
        for (let key in config.data) {
            paramsString += `${key}=${config.data[key]}&`;
        }

        config.data = paramsString.slice(0, -1);
        // console.log('需改后:config.data ==> ', config.data)
    }
    // 必须返回config
    return config;
})

Vue.config.productionTip = false;

// 将请求路径和appkey存放在原型属性里面
Vue.prototype.baseUrl = 'http://www.kangliuyong.com:10002';
Vue.prototype.appkey = 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=';


// 定义全局过滤器
Vue.filter('formatDate', (data, format) => {

    // data: 需要进行格式化的数据
    let date = new Date(data);

    // 获取年份
    let year = date.getFullYear().toString();

    if (/(y+)/.test(format)) {
        // 获取匹配组的内容
        let yearContent = RegExp.$1;

        format = format.replace(yearContent, year.slice(year.length - yearContent.length));
    }

    // 替换月日时分秒
    let dateObject = {
        M: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds()
    }

    for (let key in dateObject) {
        // 生成动态正则表达式
        let reg = new RegExp(`(${key}+)`);

        if (reg.test(format)) {
            // 获取匹配组的内容
            let content = RegExp.$1;

            format = format.replace(content, dateObject[key] >= 10 ? dateObject[key] : content.length === 2 ? '0' + dateObject[key] : dateObject[key]);
        }
    }

    return format;
})



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')