import request from './home2'
import qs from 'qs'
export function login(params) {
    console.log(qs.stringify(params));
    return request({
        url: "http://www.kangliuyong.com:10002/login",
        method: 'post',
        data: qs.stringify(params),
    })
}

export function register(params) {
    console.log(params);
    return request({
        url: "http://www.kangliuyong.com:10002/register",
        method: 'post',
        data: qs.stringify(params)
    })
}

export function getUserInfo(appkey, token) {
    console.log(appkey, token);
    return request({
        url: "http://www.kangliuyong.com:10002/findAccountInfo",
        method: 'get',
        params: {
            appkey: appkey,
            tokenString: token
        }
    })
}

export function getBanners(appkey) {
    // console.log(appkey);
    return request({
        url: "http://www.kangliuyong.com:10002/banner",
        method: 'get',
        params: {
            appkey: appkey,
        }
    })
}

export function getGoods(appkey) {
    // console.log(appkey);
    return request({
        url: "http://www.kangliuyong.com:10002/typeProducts",
        method: 'get',
        params: {
            appkey: appkey,
            key: "isHot",
            value: 1
        }
    })
}

export function getDetailData(appkey, pid) {
    // console.log(appkey);
    return request({
        url: "http://www.kangliuyong.com:10002/productDetail",
        method: 'get',
        params: {
            appkey: appkey,
            pid: pid
        }
    })
}

export function getShopbagCount(appkey, token) { //获取购物车商品条目请求
    // console.log(appkey);
    return request({
        url: "http://www.kangliuyong.com:10002/shopcartRows",
        method: 'get',
        params: {
            appkey: appkey,
            tokenString: token
        }
    })
}

export function getLikeProduct(appkey, pid, token) { //查询收藏商品接口请求
    // console.log(appkey);
    return request({
        url: "http://www.kangliuyong.com:10002/findlike",
        method: 'get',
        params: {
            appkey: appkey,
            pid: pid,
            tokenString: token
        }
    })
}

export function like(params) {
    // console.log(appkey);
    return request({
        url: "http://www.kangliuyong.com:10002/like",
        method: 'POST',
        data: qs.stringify(params)
    })
}

export function notLike(params) {
    // console.log(appkey);
    return request({
        url: "http://www.kangliuyong.com:10002/notlike",
        method: 'POST',
        data: qs.stringify(params)
    })
}

export function addShopbag(params) { //加入购物车接口请求
    // console.log(appkey);
    return request({
        url: "http://www.kangliuyong.com:10002/addShopcart",
        method: 'POST',
        data: qs.stringify(params)
    })
}

export function getShopbagData(appkey, token) { //查询用户所有购物车商品接口请求
    // console.log(appkey);
    return request({
        url: "http://www.kangliuyong.com:10002/findAllShopcart",
        method: 'GET',
        params: {
            appkey: appkey,
            tokenString: token
        }
    })
}

export function deleteShopcart(params) {
    // console.log(appkey);
    return request({
        url: "http://www.kangliuyong.com:10002/deleteShopcart",
        method: 'POST',
        data: qs.stringify(params)
    })
}