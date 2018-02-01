<template>
  <a :class="['btn', clsName]" href="javascript:;" @click="onClick">{{ title }}</a>
</template>

<script>
export default {
  props: {
    title: String,
    clsName: {
      type: String,
      default: 'fill'
    },
    onClick: {
      type: Function,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../styles/mixin.scss';
  .btn {
    display: inline-block;
    height: px2rem(49);
    line-height: px2rem(49);
    text-align: center;
    border-radius: px2rem(24.5);
    padding: 0 px2rem(100);
    margin-top: px2rem(25);
    font-size: px2rem($size_default);
  }

  .stroke {
    border: 1px solid $border_color;
    color: #858585;
  }

  .fill {
    color: #fff;
    background: $primary_color;
  }
</style>
