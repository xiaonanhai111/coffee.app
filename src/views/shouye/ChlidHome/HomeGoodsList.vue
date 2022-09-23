<template>
    <div class="goodsList">
        <home-goods-list-item v-for="item in GOODS" :GOODS="item"></home-goods-list-item>
    </div>
</template>
<script>
import HomeGoodsListItem from './HomeGoodsListItem.vue';
export default {
  name: 'HomeGoodsList',
   data() {
      return {
        
      }
   },
   props:{
    GOODS:{
        type:Array,
        default(){
            return []
        }
    }
   },
   components:{
    HomeGoodsListItem
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
    .goodsList{
        display: flex;
        flex-wrap: wrap;
        background-color:rgba(215, 216, 218, 0.385);
    }
</style>
