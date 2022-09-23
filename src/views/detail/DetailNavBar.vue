<template>
    <div>
        <nav-bar>
            <div slot="left" class="left-item">
                <img src="@/assets/img/common/back.svg" alt="" @click="backClick">
            </div>
            <div slot="center" class="center-style">
            <div v-for="(item,index) in titles" class="item-style"
            :class="{active:index == currentIndex.currentIndex}"
            @click="touchClick(index)" :key="index">
            <span>{{item}}</span>
            </div>
            </div>
        </nav-bar>
    </div>
</template>
<script>
import NavBar from '@/components/common/navbar/NavBar.vue';
export default {
  name: 'DetailNavBar',
   data() {
      return {
        titles:['商品详情'],
      }
   },
   props:{
    currentIndex:{
        type:Object,
        default(){
            return {currentIndex:0}
        }
    }
   },
   created(){
   },
   components:{
    NavBar
   },
   computed:{
   },
   methods:{
    touchClick(index){
        this.currentIndex.currentIndex = index
        this.$emit('moveabout',index)
    },
    backClick(){
        this.$router.back()
    }
   },
}
</script>
<style lang="css" scoped>
    .center-style{
        display: flex;
        font-size: 13px;
    }
    .item-style{
        flex: 1;
    }
    .item-style span{
        padding: 5px;
        color: black;
    }
    .active{
        color: var(--color-high-text)
    }
    .active span{
        border-bottom: 2px solid var(--color-tint);
        color: var(--color-high-text)
    }
    .left-item img{
        margin-top: 12px;
    }
</style>
