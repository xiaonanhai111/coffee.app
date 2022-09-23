<template>
    <div class>
        <scroll class="content" :probeType="3" :pullUpLoad="true" ref="scroll">
            <cart-list-item v-for="(item,index) in $store.state.CartList" 
                            :key="index" 
                            :product="item" 
                            :index="index"
                            @deleted="deleted"></cart-list-item>
        </scroll>
    </div>
</template>
<script>
import CartListItem from './CartListItem.vue'
import Scroll from '@/components/common/scroll/Scroll.vue';
import {deleteShopcart} from "@/network/login"
export default {
  name: 'CartList',
   data() {
      return {
      }
   },
   components:{
    Scroll,
    CartListItem
   },
   activated() {
    //激活组件时执行刷新函数
    this.$refs.scroll && this.$refs.scroll.scroll && this.$refs.scroll.getRefresh()
   },
   created(){
   },
   computed:{
   },
   methods:{
    deleted(pamars){  //删除购物袋中商品的请求
        this.$store.state.CartList.splice(pamars[1],1)
        let tokenString = this.$cookies.get("token");
        console.log(tokenString);
        let sid  = pamars[0]
        if (!tokenString) return this.$router.push({ name: "Login" });
        let params1 = {
            appkey:this.appkey,
            tokenString:this.tokenString,
            sids:sid
        }
        deleteShopcart(params1).then(res=>{
            console.log(res);
        }).catch(error=>{
            console.log(error);
        })
    }
   },
}
</script>
<style lang="css" scoped>
    .content{
        height: calc(100vh - 44px - 89px);
        overflow: hidden;
    }
</style>
