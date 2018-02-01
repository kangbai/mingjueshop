<template>
  <div class="fans-item">
    <div class="left">
      <img class="avatar" :src="fans.headimgurl" />
      <span class="nickname">{{ fans.nickname }}</span>
    </div>
    <p class="right">{{ (fans.province || '') + '  ' + (fans.city || '') }}</p>
  </div>
</template>

<script>
  export default {
    props: ['fans']
  }
</script>

<style lang="scss" scoped>
  @import '../styles/mixin.scss';
  .fans-item {
    margin: 0 px2rem(15);
    border-bottom: 1px solid $border_color;
    height: px2rem(64);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .fans-item .avatar {
    width: px2rem(40);
    height: px2rem(40);
    vertical-align: middle;
  }
  .fans-item .nickname {
    font-size: px2rem($size_default);
    margin-left: px2rem(8);
  }
  .fans-item .right {
    color: #A8A8A8;
    font-size: px2rem($size_small);
  }
</style>
