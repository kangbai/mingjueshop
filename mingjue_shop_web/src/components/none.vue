<template>
  <div class="none-page">
    <img :src="icon" />
    <p>{{ title }}</p>
  </div>
</template>

<script>
  export default {
    props: ['icon', 'title']
  }
</script>

<style lang="scss" scoped>
  @import '../styles/mixin.scss';
  .none-page {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: px2rem(188);
  }
  .none-page img {
    width: px2rem(56);
    margin-bottom: px2rem(10);
  }
  .none-page p {
    width: 100%;
    text-align: center;
  }
</style>
