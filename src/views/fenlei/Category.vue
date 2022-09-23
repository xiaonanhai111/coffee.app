<template>
    <div>
      <div class="menu">
    <!-- 顶部搜索栏 -->
         <van-search class="menu-search"  @click="goSearch" shape="round" placeholder="请输入商品名称" />
    <!-- tab栏 -->
         <van-tabbar v-model="active" :fixed="false" :border="false" @change="tab">
      <!-- 推荐产品 -->
         <van-tabbar-item>
           <span>{{ tabbarData[0].title }}</span>
           <template #icon="props"><img :src="props.active ? tabbarData[0].icon.active : tabbarData[0].icon.inactive" /> </template>
         </van-tabbar-item>
          <!-- 具体分类产品 -->
         <van-tabbar-item v-for="(item, index) in allType" :key="index">
           <span>{{ item.typeDesc }}</span>
           <template #icon="props"><img :src="props.active ? item.icon.active : item.icon.inactive" /> </template>
         </van-tabbar-item>
        </van-tabbar>

        <div class="type-items">
          <TypeItem v-for="(item, index) in currentTypeData" :key="index" :item="item"></TypeItem>
        </div>
      </div>
      <main-tab-bar></main-tab-bar>
    </div>
</template>
<script>
import MainTabBar from '@/components/content/MainTabBar/MainTabBar.vue'
import TypeItem from '@/components/TypeItem.vue'
export default {
  name: 'Category',
   data() {
      return {
        allType: [],
        active: 0,
        // 当前类型的产品数据
        currentTypeData: [],
      }
   },
   components:{
    MainTabBar,
    TypeItem
   },
   created(){
    this.getAllType();
    this.getTypeProducts(1, "isHot");
   },
   computed:{
    tabbarData() {
        return [
          { title: "推荐", icon: { active: require("@/assets/images/icons_21.gif"), inactive: require("@/assets/images/icons_09.gif") } },
          { title: "拿铁", icon: { active: require("@/assets/images/icons_19.gif"), inactive: require("@/assets/images/icons_05.gif") } },
          { title: "咖啡", icon: { active: require("@/assets/images/icons_18.gif"), inactive: require("@/assets/images/icons_03.gif") } },
          { title: "瑞纳冰", icon: { active: require("@/assets/images/icons_20.gif"), inactive: require("@/assets/images/icons_07.gif") } },
          { title: "水果茶", icon: { active: require("@/assets/images/icons_22.png"), inactive: require("@/assets/images/icons_11.gif") } },
        ];
      },
   },
   methods:{
    getAllType() {   //所有商品类型的请求
        this.$toast.loading({ message: "加载中...", forbidClick: true, duration: 0 });
        this.axios({
          method: "GET",
          url: this.baseUrl + "/type",
          params: { appkey: this.appkey },
        })
          .then(res => {
            this.$toast.clear();
            if (res.data.code === 700) {
              this.$toast({ message: res.data.msg, forbidClick: true, duration: 1000 });
              return this.$router.push({ name: "Login" });
            }
            if (res.data.code === 400) {
              for (var i = 0; i <= res.data.result.length - 1; i++) {
                for (var j = 0; j <= this.tabbarData.length - 1; j++) {
                  if (res.data.result[i].typeDesc == this.tabbarData[j].title) {  //将类型数据以及类型图片都填充到res.data.result中
                    res.data.result[i].icon = this.tabbarData[j].icon;
                  }
                }
              }
              this.allType = res.data.result;
            }
          })
          .catch(err => {
            console.log("err ==> ", err);
            this.$toast.clear();
          });
      },

      getTypeProducts(item, currentType) {  //根据商品类型得到相关的商品数据
        this.$toast.loading({ message: "加载中...", forbidClick: true, duration: 0 });
        this.axios({
          method: "GET",
          url: this.baseUrl + "/typeProducts",
          params: { appkey: this.appkey, key: currentType, value: item.type ? item.type : item },
        })
          .then(res => {
            this.$toast.clear();
            if (res.data.code === 500) this.currentTypeData = res.data.result;
          })
          .catch(err => {
            console.log(err);
            this.$toast.clear();
          });
      },

      tab(index) {
        if (index == 0) {
          this.getTypeProducts(1, "isHot");  //默认指定类型
          return;
        }
        this.getTypeProducts(this.allType[index - 1], "type");  //点击改变后，根据类型进行相关商品数据的获取
      },

      // 跳转到搜索
      goSearch() {
            this.$router.push({name: 'Search'});
        }
   },
}
</script>
<style lang="less" scoped>
  .menu {
    padding-top: 134px;
    padding-bottom: 44px;
    background: #f7f7f7;
    .menu-search {
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100%;
      z-index: 10;
    }
    .van-tabbar {
      position: fixed;
      top: 54px;
      left: 0px;
      width: 100%;
      background-color: #f7f7f7;
    }
    .van-tabbar-item--active {
      background-color: #f7f7f7;
      color: #722110;
    }
    .van-tabbar-item__icon img {
      width: 35px;
      height: 35px;
    }
    .van-tabbar-item__text span {
      font-weight: bold;
    }
    .van-tabbar {
      padding: 15px 0;
    }
  }
</style>
