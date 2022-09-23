<template>
    <div id="cart">
      <nav-bar class="topbar">
        <div slot="center">购物袋({{cartlength}})</div>
      </nav-bar>
      <cart-list class="cart-list"></cart-list>
      <cart-buttom-bar class="buttom-bar"></cart-buttom-bar>
      <main-tab-bar></main-tab-bar>
    </div>
</template>
<script>
import CartButtomBar from './ChlidComps/CartButtomBar.vue';
import NavBar from '@/components/common/navbar/NavBar.vue';
import CartList from './ChlidComps/CartList.vue'
import MainTabBar from '@/components/content/MainTabBar/MainTabBar.vue'
import {getShopbagData} from '@/network/login'
export default {
  name: 'Cart',
   data() {
      return {
      }
   },
   components:{
    NavBar,
    CartList,
    CartButtomBar,
    MainTabBar
   },
   created(){
    this.getShopbagData(); //创建时执行getShopbagData()函数
   },
   computed:{
    cartlength(){
      return this.$store.state.CartList.length  //计算出购物袋中商品的总数量
    }
   },
   activated() {
            this.getShopbagData();
        },
   methods:{
    //请求用户加入购物袋的商品的数据
    getShopbagData(){
      let tokenString = this.$cookies.get("token");
      getShopbagData('U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=',tokenString).then(res=>{
        console.log(res);
        res.result.forEach(element => {  //用forEach语句对数组中的数据进行更改  更改原因：数据中自带的checked属性为false，在添加后应为true 方便后面购物袋功能的操作
          element.checked = true;
        });
        this.$store.commit('getCartList',res.result) //使用vuex中的mutations属性中的方法getCartList()，将请求到的数据添加到state中的CartList中
      }).catch(error=>{
        console.log(error);
      })
    },
    // buy(){
    //   let tokenString = this.$cookies.get("token");
    //   getShopbagData('U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=',tokenString).then(res=>{
    //     // console.log(res);
    //     res.result.forEach(element => {  
    //       this.$store.commit('changesids',element.sid)
    //     });
    //   }).catch(error=>{
    //     console.log(error);
    //   })
    //   this.$router.push({name:'Pay'})
    // }

   },
}
</script>
<style lang="css" scoped>
    #cart {
    /*position: relative;*/
    height: 100vh;
  }
  .topbar{
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    width: 100%;
    z-index: 9;
  }

.cart-list {
    position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;
  }
</style>
