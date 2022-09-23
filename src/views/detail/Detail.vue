<template>
    <div id="detail">
        <detail-nav-bar ref="nav-bar" class="home-nav"></detail-nav-bar>
        <div><img class="auto-img" :src="detailData.large_img" /></div>

        <!-- 商品信息 -->
        <div class="pro-info">
          <div class="pro-box">
            <div class="pro-name">
              <div class="ch-name">{{ detailData.name }}</div>
              <div class="en-name">{{ detailData.enname }}</div>
            </div>
            <div class="pro-price">&yen;{{ detailData.price }}</div>
          </div>
           <!-- 规格 -->
          <div class="rules">
             <div class="rule" v-for="(v1, i1) in detailData.rulesData" :key="i1">
             <div class="rule-title">{{ v1.title }}</div>
             <div class="rule-items">
                <div :class="{ active: v1.currentIndex === i2 }" 
                             v-for="(v2, i2) in v1.rule" 
                             :key="i2" 
                             @click="selectRule(v1, i2)">{{ v2 }}</div>
             </div>
             </div>
          </div>
          <!-- 数量 -->
          <div class="count-box">
            <div class="select-count">选择数量</div>
            <div class="count"><van-stepper v-model="count" theme="round" button-size="22" disable-input /></div>
          </div>
          <!-- 描述 -->
          <div class="desc">
            <div class="desc-title">商品描述</div>
            <div class="desc-text">
              <div v-for="(item, index) in detailData.desc" :key="index">{{ index + 1 }}、{{ item }}</div>
            </div>
          </div>
        </div>
            <!-- 底部商品导航 -->
        <van-goods-action>
           <van-goods-action-icon icon="bag" text="购物袋" color="#666" :badge="shopbagCount > 0 ? shopbagCount : ''" @click="$router.push({ name: 'Cart' })" />
           <van-goods-action-icon icon="like" :text="likeStatus ? '已收藏' : '收藏'" :color="likeStatus ? 'var(--color-tint)' : '#666'" @click="likeAndNotLike" />
           <van-goods-action-button color="#6391f0" type="warning" text="加入购物袋" @click="addShopbag(false)" />
           <van-goods-action-button color="var(--color-tint)" type="danger" text="立即购买" @click="addShopbag(true)" />
           </van-goods-action>
    </div>
</template>
<script>
import 'vant/lib/index.css';
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';
import { Stepper } from 'vant';
import { mapState, mapMutations } from "vuex";
import { getDetailData , getShopbagCount , getLikeProduct , like , notLike , addShopbag} from '@/network/login'
import DetailNavBar from './DetailNavBar.vue'
export default {
  name: 'Detail',
   data() {
      return {
        pid: null,
        detailData: {},
        count: 1,
        likeStatus: false,
      }
   },
   created(){
    this.pid = this.$route.params.pid
    this.getDetailData();
    this.getLikeProduct();
    this.getShopbagCount();

   },
   components:{
    DetailNavBar,
    Stepper,
    GoodsAction,
    GoodsActionIcon,
    GoodsActionButton
   },
   computed:{
    ...mapState(["shopbagCount", "isLoadShopbagCount"]),
   },
   methods:{
    ...mapMutations(["changeShopbagCount", "changeIsLoadShopbagCount"]),

    getShopbagCount(){   //获取购物车商品条目数据
      if (this.isLoadShopbagCount) return;
      let tokenString = this.$cookies.get("token");
      getShopbagCount('U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=',tokenString).then(res=>{
        // console.log(res);
        if (res.code === 700) return;
        if (res.code === 8000) {
              this.changeShopbagCount(res.result);
              this.changeIsLoadShopbagCount(true);
            }
      }).catch(error=>{
        console.log(error);
      })
    },

    getDetailData(){  //获取商品详情页的数据
      getDetailData('U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=',this.pid).then(res=>{
        // console.log(res);
        if (res.code === 600) {
              let data = res.result[0];
              // 处理【规格】数据
              let rules = ["cream", "tem", "sugar", "milk"];
              data.rulesData = [];
              rules.forEach(v => {
                if (!data[v]) return; // 如果其中某个规格为空，则不添加进data.rulesData里
                let rulesText = data[v].split("/"); // 将'全糖/半糖' 切割成 ["全糖", "半糖"]
                let currentRule = { title: data[v + "_desc"], currentIndex: 0, rule: [] }; // {title: "温度", currentIndex: 0, rule: Array(0)}
                rulesText.forEach(item => currentRule.rule.push(item)); // {title: "温度", currentIndex: 0, rule: ["全糖", "半糖"]}
                data.rulesData.push(currentRule);
              });
              //处理【商品描述】数据
              data.desc = data.desc.split("\n");

              this.detailData = data;
            }
      })
    },
    
    selectRule(item, index) {  //选择规格时选中的位置
        item.currentIndex = index;
      },

    likeAndNotLike() {    //收藏的点击事件    通过likeStatus的值判断是否收藏
        if (this.likeStatus) {
          this.notLike();
        } else {
          this.like();
        }
      },

    getLikeProduct(){  //查询收藏商品接口请求
      let tokenString = this.$cookies.get("token");  //获取存入cookie中的token值
      getLikeProduct('U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=',this.pid,tokenString).then(res=>{
        // console.log(res);
        if (res.code === 1000) {
              if (res.result.length > 0) {
                this.likeStatus = true;   //如果查询到该商品已被收藏，likeStatus值为true，显示已收藏状态
              }
            }
      }).catch(error=>{
        console.log(error);
      })
    },

    like(){  //收藏商品请求
      let tokenString = this.$cookies.get("token");
      if (!tokenString) return this.$router.push({ name: "Login" });
      let params = {
        appkey:'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=',
        pid : this.pid,
        tokenString : tokenString
      }
      like(params).then(res=>{
        console.log(res);
        if (res.code === 700) this.$router.push({ name: "Login" });
            if (res.code === 800) this.likeStatus = true;
      }).catch(error=>{
        console.log(error);
      })
    },

    notLike(){  //取消收藏请求
      let tokenString = this.$cookies.get("token");
      if (!tokenString) return this.$router.push({ name: "Login" });
      let params = {
        appkey:'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=',
        pid : this.pid,
        tokenString : tokenString
      }
      notLike(params).then(res=>{
      if (res.code === 700) this.$router.push({ name: "Login" });
          if (res.code === 900) {
            if (res.result === 1) {
                this.likeStatus = false;
              }
            }
      }).catch(error=>{
        console.log(error);
      })
    },

    addShopbag(isBuy) {  //添加商品请求
        let tokenString = this.$cookies.get("token");
        if (!tokenString) return this.$router.push({ name: "Login" }); 
        let rules = [];
        this.detailData.rulesData.forEach(v => rules.push(v.rule[v.currentIndex])); // 处理成：["默认奶油", "冷", "全糖"]
        let pamars = {
          appkey: 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=',
          pid: this.pid,
          tokenString : tokenString,
          count: this.count,
          rule: rules.join("/")
        }

        addShopbag(pamars)
          .then(res => {
            if (res.code === 700) {
              return this.$router.push({ name: "Login" });
            }
            if (res.code === 3000) {    
              if (res.status === 1) {   // 其中status = 0, 表示修改数量   status = 1, 添加一条新的数据
                this.changeShopbagCount(this.shopbagCount + 1);
              }
              if (isBuy) this.$router.push({ name: "Pay", query: { sids: res.sid } });
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
   },
   mounted() {
   },

}
</script>
<style lang="less" scoped>
  #detail {
    .home-nav{
      position: fixed;
      width: 100%;
    }
    .auto-img{
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    padding-bottom: 50px;
    /deep/ .van-nav-bar .van-icon,
    /deep/ .van-nav-bar__text {
      color: var(--color-tint);
    }
    /deep/ .van-stepper--round .van-stepper__minus {
      color: var(--color-tint);
      border-color: var(--color-tint);
    }
    /deep/ .van-stepper--round .van-stepper__plus {
      background-color: var(--color-tint);
    }
    .pro-info {
      background-color: #fff;
      position: relative;
      top: -20px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      margin: 0 10px;
      padding: 10px;
      .pro-box {
        display: flex;
        .pro-name {
          .ch-name {
            color: #666;
            font-size: 14px;
          }
          .en-name {
            color: #999;
            font-size: 12px;
          }
        }
        .pro-price {
          margin-left: auto;
          color: var(--color-tint);
          font-size: 14px;
          font-weight: bold;
          line-height: 33px;
        }
      }
    }
    .rules {
      margin-top: 30px;
      .rule {
        display: flex;
        margin-bottom: 10px;
        .rule-title {
          width: 60px;
          height: 28px;
          line-height: 28px;
          font-size: 14px;
        }
        .rule-items {
          display: flex;
          > div {
            width: 60px;
            height: 28px;
            line-height: 28px;
            text-align: center;
            background: #e8e8e8;
            border-radius: 14px;
            color: #666;
            margin-right: 10px;
            &:last-child {
              margin-right: 0;
            }
            &.active {
              background-color: var(--color-tint);
              color: #fff;
            }
          }
        }
      }
    }
    .count-box {
      margin-top: 30px;
      border-top: 1px solid #e8e8e8;
      border-bottom: 1px solid #e8e8e8;
      padding: 20px 0;
      display: flex;
      .select-count {
        // font-size: 14px;
        color: #999;
      }
      .count {
        margin-left: auto;
      }
    }
    .desc {
      margin-top: 30px;
      .desc-title {
        font-size: 14px;
        color: #666;
      }
      .desc-text {
        margin-top: 10px;
        font-size: 12px;
        color: #999;
        > div {
          margin-bottom: 10px;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
</style>
