<template>
    <div class="goodsItem">
        <img :src="GOODS.smallImg" alt="" @load="imageload" @click="ItemClick">
        <div class="goodsTitle">
            <h6>{{GOODS.name}}</h6>
        </div>
        <span><img src="@/assets/img/common/start.png" alt=""></span>
        <span>￥{{GOODS.price}}</span>
        <span class="about"><img src="@/assets/img/common/other.png" alt=""></span>
    </div>
</template>
<script>
export default {
  name: 'HomeGoodsListItem',
   data() {
      return {

   }
   },
   props:{
            GOODS:{
                type:Object,
                default(){
                    return []
                }
            }
        },
   created(){
   },
   computed:{
   },
   methods:{
    imageload(){
        this.$bus.$emit('ItemImageLoad')
    },
    ItemClick(){
        this.$router.push('/detail/'+ this.GOODS.pid)
    }
   },
}
</script>
<style lang="css" scoped>
    .goodsItem{
        width: 150px;
        height: 250px;
        flex: 1;
        text-align: center;
        
        margin: 5px;
        background-color: var(--color-background);
        border-radius: 10px;
        box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
    }
    .goodsItem img{
        margin-top: 10px;
        width: 140px;
        height: 160px;
    }
    .goodsItem span{
        margin-right: 5px; 
    }
    .goodsItem span img{
        margin-top: 30px;
        margin-bottom: 0;
        width: 20px;
        height: 20px;
       
    }
    .goodsTitle{
        height: 20px;
        margin: 0 5px 0 5px;
        padding-top: 10px;
    }
    .about{
        float: right;
        margin-top: 5px;
    }
</style>
