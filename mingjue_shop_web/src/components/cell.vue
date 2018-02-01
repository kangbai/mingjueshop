<template>
  <div class="cell-wrapper" @click="onClick">
    <div class="content" :class="{ 'no-border': hideBorder }">
      <span>{{ title }}</span>
      <i class="r-arrow"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    hideBorder: {
      type: Boolean,
      default: false
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
  .content {
    margin-left: px2rem(14);
    padding-right: px2rem(20);
    border-bottom: 1px solid $border_color;
    height: px2rem(44);    
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .no-border {
    border-bottom: none;
  }
  .cell-wrapper .r-arrow {
    width: px2rem(15);
    height: px2rem(15);
    background: url('../assets/r-arrow.png') no-repeat;
    background-size: cover;
  }
</style>
