<template>
  <div class="bottom-wrapper">
    <p v-if="isRegister" @click="handleToPrivacy">注册即同意用户协议</p>
  </div>
</template>

<script>
  export default {
    props: {
      isRegister: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      handleToPrivacy () {
        this.$router.push('/privacy');
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/mixin.scss';
  .bottom-wrapper {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: px2rem(100);
    background: url('../assets/bottom-bg.png') no-repeat;
    background-size: cover;
  }

  p {
    font-size: px2rem($size_small);
    color: #58EDD9;
    position: absolute;
    bottom: px2rem(20);
    left: 0;
    text-align: center;
    right: 0;
  }
</style>
