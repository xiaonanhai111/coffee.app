import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: "",
        userInfo: [],
        CartList: [],
        shopbagCount: 0,
        dot: false,
        isLoadShopbagCount: false,
        username: "",
        sids: []
    },
    getters: {
        cartList(state) {
            return state.CartList
        },
    },
    mutations: {

        getToken(state, payload) { //将请求到的token存入state.token中
            state.token = payload
        },

        getUserInfo(state, payload) { //将请求到的user信息存入state.userInfo中
            state.userInfo = payload
        },

        getCartList(state, payload) { //将请求到的购物袋中的商品数据存入state.CartList中
            state.CartList = payload
        },

        addCart(state, payload) { //将商品数据添加到state.CartList中
            payload.count++
                state.CartList.push(payload)
        },

        changeShopbagCount(state, payload) { //更新购物袋中商品的总数量
            state.shopbagCount = payload;
        },

        changeDot(state, payload) { //更新dot的状态
            state.dot = payload;
        },

        changeIsLoadShopbagCount(state, payload) { //是否加载商品条目数量显示
            state.isLoadShopbagCount = payload;
        },

        changeUsername(state, payload) { //更新username
            state.username = payload;
        },

        changesids(state, payload) { //更新username
            state.sids.push(payload)
        },

    },
    actions: {},
    modules: {}
})