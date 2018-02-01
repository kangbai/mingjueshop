<template>
  <div class="input-wrapper">
    <img class="left-icon" :src="leftImg" />
    <input :placeholder="placeholder" :type="type" @input="onChange" />
    <slot name="right-sec"></slot>
  </div>
</template>

<script>
  export default {
    props: {
      leftImg: String,
      placeholder: String,
      type: String,
      onChange: {
        type: Function,
        default: () => {}
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../styles/mixin.scss";
  input::placeholder {
    color: $placeholder_color;
  }
  .input-wrapper {
    display: flex; 
    height: px2rem(50);
    align-items: center;
    margin: 0 px2rem(12);
    border-bottom: 1px solid $bg_color;
    font-size: px2rem($size_default);
  }
  .input-wrapper .left-icon {
    width: px2rem(24);
    margin-left: px2rem(6);
    margin-right: px2rem(10);
  }
  .input-wrapper input {
    outline: none;
    padding: 0;
    margin: 0;
    font-size: px2rem($size_default);
    flex: 1;
    height: px2rem(45);
    // margin: 
  }
</style>

