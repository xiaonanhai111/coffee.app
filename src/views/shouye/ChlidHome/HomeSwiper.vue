<template>
    <div>
      <swiper>
        <swiper-item v-for="(item,index) in banners" :key="index" >
        <a :href="item.link">
          <img :src="item.bannerImg" alt="" @load="ImageLoad">
        </a>
        </swiper-item>
      </swiper>
    </div>
</template>
<script>
import { Swiper,SwiperItem } from '@/components/common/swiper'
export default {
  name: 'HomeSwiper',
   data() {
      return {
         isLoad:false
      }
   },
   props:{
      banners:{
         type:Array,
         default(){
            return []
         }
      }
   },
   components:{
      Swiper,
      SwiperItem
   },
   created(){
   },
   computed:{
   },
   methods:{
      ImageLoad(){
         if(!this.isLoad){
            this.$emit('swiperImageLoad') 
            this.isLoad = true 
         }
         
      }
   },
}
</script>
<style lang="css" scoped>

</style>
