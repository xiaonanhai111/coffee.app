<template>
 <div id="shop-item">
    <div class="item-selector">
      <check-buttom @checkBtnClick="checkedChange" v-model="product.checked"></check-buttom>
    </div>
    <div class="item-img">
      <img :src="product.small_img" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{product.name}}</div>
      <div class="item-desc">商品描述: {{product.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{product.price}}</div>
        <div class="item-count right">x{{product.count}}</div>
      </div>
      <div class="quxiao" @click="quxiao">×</div>
    </div>
  </div>
</template>
<script>
import CheckButtom from './CheckButtom.vue';
export default {
  name: 'CartListItem',
   data() {
      return {
      }
   },
   props:{
    product:{
        type:Object,
        default(){
            return {}
        }
    },
    index:{
          type:Number,
          default:null
    }
   },
   created(){
   },
   components:{
    CheckButtom
   },
   computed:{
   },
   methods:{
    checkedChange() {
        this.product.checked = !this.product.checked;
      },
    quxiao(){
          let sid = JSON.stringify(this.product.sid)
          this.$emit('deleted',sid,this.index)
    }
   },
}
</script>
<style lang="css" scoped>
  #shop-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    width: 224px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }
  .quxiao {
    position: absolute;
    top: 0;
    right: 0;
}
</style>
