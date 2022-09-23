import axios from "axios";

// 创建axios初始化
const service = axios.create({
    baseURL: "https://apis.netstart.cn/yunyuedu",
    // http://127.0.0.1:8080/#/
    timeout: 30000, //超时时间
    // headers:{
    //     "Content-Type":"application/json;charset=utf-8",//表单数据转化
    // },
    // withCredentials:true,
})

service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
    // request 拦截器 发送数据到后台前拦截
service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log("axios中request报错", error);
        Promise.reject(error);
    }
)

// response 拦截器 获取后台数据前拦截
service.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        console.log("axios中response报错", error);
        Promise.reject(error);
    }
)
export default service;