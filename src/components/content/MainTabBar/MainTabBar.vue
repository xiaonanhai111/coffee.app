<template>
      <tab-bar>
      <tab-bar-item path="/home">
      <img slot="item-icon" src="../../../assets/img/tabbar/home.svg" alt="">
      <img slot="item-icon-active" src="../../../assets/img/tabbar/home_active.svg" alt="">
      <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category">
      <img slot="item-icon" src="../../../assets/img/tabbar/category.svg" alt="">
      <img slot="item-icon-active" src="../../../assets/img/tabbar/category_active.svg" alt="">
      <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart">
      <img slot="item-icon" src="../../../assets/img/tabbar/cart.svg" alt="">
      <img slot="item-icon-active" src="../../../assets/img/tabbar/cart_active.svg" alt="">
      <div slot="item-text">购物袋</div>
      </tab-bar-item>
      <tab-bar-item path="/my">
      <img slot="item-icon" src="../../../assets/img/tabbar/profile.svg" alt="">
      <img slot="item-icon-active" src="../../../assets/img/tabbar/profile_active.svg" alt="">
      <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>
<script>
import TabBarItem from '../../common/tabbar/TabBarItem.vue'
import TabBar from '../../common/tabbar/TabBar.vue'
export default {
  name: 'MainTabBar',
   data() {
      return {
      }
   },
   components:{
    TabBarItem,
    TabBar
   },
   created(){
   },
   computed:{
   },
   methods:{
   },
}
</script>
<style lang="css" scoped>

</style>
