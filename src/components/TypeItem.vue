<template>
    <div class="type-item" @click="goDetail(item.pid)">
      <div class="left-img"><img class="auto-img" :src="item.smallImg" /></div>
      <div class="right-text">
        <div class="left one-text">
          <div class="up">{{ item.name }}</div>
          <div class="down">{{ item.enname }}</div>
        </div>
        <div class="right">&yen; {{ item.price }}</div>
      </div>
    </div>
  </template>
  
  <script>
    export default {
      name: "TypeItem",
      props: {
        item: {
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
    .type-item {
      background-color: #fff;
      display: flex;
      padding: 10px;
      margin: 10px;
      .auto-img{
      width: 55px;
      height: 55px;
    }
      .left-img {
        width: 60px;
        height: 60px;
        background: #000;
        margin-right: 10px;
      }
      .right-text {
        display: flex;
        width: calc(100% - 70px);
        .left {
          margin-right: auto;
          color: #666;
          width: calc(100% - 60px);
          .up {
            margin-top: 10px;
            margin-bottom: 5px;
          }
          .down {
          }
        }
        .right {
          color: var(--color-tint);
          font-weight: bold;
          font-size: 14px;
          line-height: 60px;
        }
      }
    }
  </style>
  