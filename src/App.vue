<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view :key="$route.path"></router-view>
    </keep-alive>
    <!-- <main-tab-bar></main-tab-bar> -->
  </div>
</template>
<script>
import MainTabBar from './components/content/MainTabBar/MainTabBar.vue'
export default {
  name: 'App',
  components: {
    MainTabBar,
  }
}

</script>
<style>
@import url('./assets/css/base.css');
@import url('./assets/css/normalize.css');
</style>
