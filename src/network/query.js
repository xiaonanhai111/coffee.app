import axios from 'axios';
export function request(config) {
    //1.创建axios实例
    const instance = axios.create({
        baseURL: 'https://apis.netstart.cn/xmsc',
        timeout: 500000
    })

    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err);
    })

    return instance(config);
}