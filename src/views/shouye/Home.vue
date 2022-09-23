<template>
    <div id="home">
      <van-nav-bar class="nav-bar">
      <template #left>
        <div class="home-title">
          <div>{{ promptTime }}</div>
          <div class="username one-text" @click="$router.push({ name: 'Profile' })">{{ username }}</div>
        </div>
      </template>
      <template #right>
        <van-search class="home-search" placeholder="输入商品名称" shape="round" @click="$router.push({name:'Category'})"/>
      </template>
    </van-nav-bar>
      <scroll class="content" 
              ref="scroll" 
              :probeType="3" 
              @scroll="contentScroll" 
              :pullUpLoad="true"
              @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImage"></home-swiper>
      <div class="line">
        <span>热卖推荐</span>
      </div>
      <home-goods-list :GOODS="hotProducts"></home-goods-list>
      
    </scroll><back-top @click.native="backClick()" v-show="currentPosition"></back-top>
    <main-tab-bar></main-tab-bar>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import 'vant/lib/index.css';
import { NavBar,Search } from 'vant';
import HomeSwiper from './ChlidHome/HomeSwiper.vue'
import MainTabBar from '@/components/content/MainTabBar/MainTabBar.vue'
import HomeGoodsList from './ChlidHome/HomeGoodsList.vue'
import Scroll from '@/components/common/scroll/Scroll.vue'
import BackTop from '../../components/content/backTop/BackTop.vue'
import axios from 'axios'
import {debounce} from '@/common/utils'
import { getBanners,getGoods } from '@/network/login'
export default {
  name: 'Home',
   data() {
      return {
        banners:[],
        hotProducts: [],
        currentPosition:false,  //判断当前位置是否显示返回顶部按钮
        saveY:0
      }
   },
   components:{
    HomeSwiper,
    HomeGoodsList,
    Scroll,
    BackTop,
    Search,
    NavBar,
    MainTabBar
   },
   activated() {
    //该组件被激活时进行位置的保存以及页面刷新
    this.$refs.scroll && this.$refs.scroll.scroll && this.$refs.scroll.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll && this.$refs.scroll.scroll && this.$refs.scroll.scroll.refresh()
   },
   deactivated() {
    //浏览位置的保存
    this.saveY = this.$refs.scroll.scroll.y
   },
   created(){
    //创建时执行的函数
    this.getBanners();
    this.getGoods();
   },
   computed:{

    //引用vuex中的State属性
    ...mapState(["username"]),

    promptTime() {
      //判断时间显示提示语
      let currentHour = new Date().getHours();
      return currentHour >= 6 && currentHour <= 12 ? "早上好" : 12 < currentHour && currentHour < 18 ? "下午好" : currentHour >= 18 && currentHour <= 24 ? "晚上好" : "深夜好";
},
   },
   methods:{

    swiperImage(){
      // this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTops
    },

    contentScroll(position){
      //1.判断BackTOP是否显示
      if(position.y>-300){
        this.currentPosition = false
      }else{
        this.currentPosition = true
      }
    },

    loadMore(){
      
    },

    getBanners(){
      //获取首页广告的数据请求
      getBanners('U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=').then(res=>{
        // console.log(res);
        this.banners = res.result
    })},

    getGoods(){
      //获取首页热门推荐商品的数据请求
      getGoods('U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=').then(res=>{
        console.log(res);
        this.hotProducts = res.result;
      })
    },

    backClick(){
      //返回顶部按钮的跳转执行
      this.$refs.scroll && this.$refs.scroll.scroll && this.$refs.scroll.scroll.scrollTo(0,0,500)
   },
   
   },
   mounted() { 
    this.$bus.$on('ItemImageLoad',()=>{ 
      const refresh = debounce(this.$refs.scroll.getRefresh,500) //执行防抖函数
      this.$refs && this.$refs.scroll && this.$refs.scroll.scroll && refresh()
    })
   }
}
</script>
<style lang="css" scoped>

.home-nav{
  background-color: var(--color-tint);
  color: #fff;
  position: relative;
  z-index: 9;
}

.content{
      position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;
}

.tab-control{
  position: relative;
  z-index: 7;
}
.tab-control1{
  position: relative;
  z-index: 2;
}
.line {
        border-top: 1px solid #e8e8e8;
        text-align: center;
        width: 100%;
        background-color: #f7f7f7;
        padding: 10px;
}
.line span{
          padding: 0 10px;
          width: 100%;
          font-size: 16px;
          font-weight: bolder;
          color: var(--color-tint);
        }
.home-title {
        display: flex;
        color: 646566;
}
.username {
          margin-left: 10px;
          color: var(--color-tint);
          max-width: 60px;
          font-weight: bold;
        }
        .home-search {
        padding: 0;
      }
</style>
