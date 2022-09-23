<template>
  <div class="product" v-if="Object.keys(product).length > 0">
    <div class="img-box" @click="goDetail(product.pid)">
      <img class="auto-img" :src="product.smallImg" />
    </div>
    <div class="pro-info">
      <div class="pro-name one-text">{{ product.name }}</div>
      <div class="pro-enname one-text">{{ product.enname }}</div>
      <div class="pro-price">
        <div class="price">&yen; {{ product.price }}</div>
        <div class="delete-icon"><slot name="delete"></slot></div>
      </div>
    </div>
    <slot name="hot"></slot>
  </div>
</template>

<script>
  export default {
    name: "product",
    props: {
      product: {
        type: Object,
        default() {
          return {};
        },
      },
    },
    methods: {
      goDetail(pid) {
        this.$router.push({ name: "Detail", params: { pid } });
      },
    },
  };
</script>

<style lang="less" scoped>
  .product {
    background-color: #fff;
    border-radius: 5px;
    padding: 5px;
    box-sizing: border-box;
    margin-bottom: 10px;
    .img-box {
      img {
        border-radius: 10px;
        width: 90px;
        height: 90px;
      }
    }
    .pro-info {
      margin-top: 10px;
      .pro-name {
        font-size: 14px;
        color: #666;
      }
      .pro-enname {
        font-size: 12px;
        color: #999;
      }
      .pro-price {
        font-size: 14px;
        margin-top: 5px;
        display: flex;
        .price {
          font-weight: bold;
          color: var(--color-tint);
        }
        .delete-icon {
          margin-left: auto;
          line-height: 16px;
        }
      }
    }
  }
</style>
