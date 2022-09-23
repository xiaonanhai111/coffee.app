<template>
    <div id="tab-bar">
      <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'TabBar',
   data() {
      return {
      }
   },
   created(){
   },
   computed:{
   },
   methods:{
   },
}
</script>
<style lang="css" scoped>
#tab-bar{
  display: flex;
  background-color: #f6f6f6;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 9;
  box-shadow: 0px -1px 1px rgba(100, 100, 100, .1);
}
/* .tab-bar-item{
  flex: 1;
  text-align: center;
  height: 49px;
}

.tab-bar-item img{
  width: 25px;
  height: 25px;
} */
</style>
