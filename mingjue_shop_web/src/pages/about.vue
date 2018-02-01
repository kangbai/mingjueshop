<template>
  <div class="about-page">
    <img class="logo" src="../assets/logo.png" />
    <p class="title">名爵商城</p>
    <div class="cell-list">
      <!-- <cell title="APP下载" /> -->
      <router-link to="/qrcode">
        <cell title="关注名爵" />
      </router-link>
      <router-link to="/privacy">
        <cell title="隐私条约" :hideBorder="true" />        
      </router-link>
    </div>
  </div>
</template>

<script>
  import cell from '../components/cell';
  export default {
    components: { cell },
    mounted () {
      document.title = '关于我们';
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/mixin.scss';
  .about-page {
    text-align: center;
    padding-top: px2rem(30);
  }
  .logo {
    width: px2rem(68);
  }
  .title {
    font-size: px2rem(13);
  }
  .cell-list {
    background: #fff;
    margin-top: px2rem(30);
  }
</style>
