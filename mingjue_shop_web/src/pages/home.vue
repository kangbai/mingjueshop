<template>
  <div class="shop-page">
    <router-view class="content"></router-view>
    <tabbar />
  </div>
</template>

<script>
  import tabbar from '../components/tabbar';
  export default {
    components: { tabbar },
    mounted () {
      document.title = '名爵商城';
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/mixin.scss';
  .shop-page {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .shop-page .content {
    flex: 1;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
</style>
