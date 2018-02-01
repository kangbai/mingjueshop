<template>
  <div class="charge-item" @click="onClick">
    <p class="price">{{ item.price_sc }}元</p>
    <p class="sell-price">售价：¥{{ item.price }}</p>
  </div>
</template>

<script>
export default {
  props: {
    item: { type: Object, default () { return {} }},
    onClick: () => {}
  }
}
</script>

<style lang="scss" scoped>
  @import '../styles/mixin.scss';
  .charge-item {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 170px;
    width: 200px;
    margin-left: 20px;
    border-radius: 8px;
    border: 1px solid #DBDBDB;
    color: #4D4D4D;
    font-size: 24px;  
  }

  .charge-item .price {
    font-size: px2rem(20);
  }
</style>
