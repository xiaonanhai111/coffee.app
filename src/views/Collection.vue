<template>
    <div id="collect">
      <van-nav-bar title="我的收藏" left-text="返回" left-arrow @click-left="$router.go(-1)" />
      <template v-if="allLikeData.length > 0">
        <Bg>
          <div class="collect-items">
            <Product class="collect-item" v-for="(item, index) in allLikeData" :key="index" :product="item">
              <template #delete>
                <van-icon name="delete-o" @click.stop="deleteCollectItem(item.pid, index)"></van-icon>
              </template>
            </Product>
          </div>
        </Bg>
      </template>
      <div v-else>
        <van-empty description="收藏已空空,赶紧去逛一逛!">
          <div class="guang" @click="$router.push({ path: '/' })">逛一逛</div>
        </van-empty>
      </div>
    </div>
  </template>
  
  <script>
    import Bg from "@/components/Bg.vue";
    import Product from "@/components/Product";
  
    export default {
      name: "Collection",
      components: { Bg, Product },
      data() {
        return {
          allLikeData: [],
        };
      },
      created() {
        this.getAllLikeData();
      },
      activated() {
            this.getAllLikeData();
        },
      methods: {
        getAllLikeData() {
          let tokenString = this.$cookies.get("token");
          if (!tokenString) return this.$router.push({ name: "Login" });
  
          this.$toast.loading({ message: "加载中...", forbidClick: true, duration: 0 });
          this.axios({
            method: "GET",
            url: this.baseUrl + "/findAllLike",
            params: { appkey: this.appkey, tokenString },
          })
            .then(res => {
              this.$toast.clear();
              if (res.data.code === 700) {
                this.$toast({ message: res.data.msg, forbidClick: true, duration: 1000 });
                return this.$router.push({ name: "Login" });
              }
              if (res.data.code === 2000) {
                this.allLikeData = res.data.result;
              } else {
                this.$toast({ message: res.data.msg, forbidClick: true, duration: 1000 });
              }
            })
            .catch(err => {
              console.log(err);
              this.$toast.clear();
            });
        },
  
        deleteCollectItem(pid, index) {
          let tokenString = this.$cookies.get("token");
          if (!tokenString) return this.$router.push({ name: "Login" });
  
          this.$toast.loading({ message: "加载中...", forbidClick: true, duration: 0 });
          this.axios({
            method: "POST",
            url: this.baseUrl + "/notlike",
            data: { appkey: this.appkey, tokenString, pid },
          })
            .then(res => {
              this.$toast.clear();
              if (res.data.code === 700) {
                this.$toast({ message: res.data.msg, forbidClick: true, duration: 1000 });
                return this.$router.push({ name: "Login" });
              }
              if (res.data.code === 900) {
                this.allLikeData.splice(index, 1);
              }
              this.$toast({ message: res.data.msg, forbidClick: true, duration: 1000 });
            })
            .catch(err => {
              console.log(err);
              this.$toast.clear();
            });
        },
      },
    };
  </script>
  
  <style lang="less" scoped>
    #collect {
      /deep/ .van-nav-bar .van-icon,
      /deep/ .van-nav-bar__text {
        color: var(--color-tint);
      }
      .collect-items {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
      }
      .collect-item {
        width: 33.3%;
        // margin-right: 10px;
      }
      .collect-item:nth-child(3n) {
        margin-right: 0px;
      }
      .van-icon {
        vertical-align: middle;
      }
      .guang {
        color: #fff;
        font-size: 14px;
        width: 70px;
        height: 28px;
        background-color: var(--color-tint);
        text-align: center;
        line-height: 28px;
        border-radius: 14px;
      }
    }
  </style>
  