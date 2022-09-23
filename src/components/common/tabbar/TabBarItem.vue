<template>
    <div class="tab-bar-item" @click="itemClick()">
      <div v-if="!isActive"><slot name="item-icon"></slot></div>
      <div v-else><slot name="item-icon-active"></slot></div>
      <div :style="activeStyle"><slot name="item-text"></slot></div>
      </div>
</template>
<script>
export default {
  name: 'TabBarItem',
  props:{
    path: String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
   data() {
      return {
        // isActive:false
      }
   },
   created(){
   },
   computed:{
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor} : {}
    }
   },
   methods:{
    itemClick(){
      this.$router.push(this.path)
    }
   },
}
</script>
<style lang="css" scoped>
.tab-bar-item{
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 10px;
}

.tab-bar-item img{
  width: 25px;
  height: 25px;
  vertical-align: middle;
  margin-top: 5px;
}
</style>
