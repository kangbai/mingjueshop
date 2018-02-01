<template>
  <div class="product-item" @click="onClick(good.id)">
    <div class="img-wrapper">
      <img class="product-img" :src="good.pic" />      
      <p class="coin">{{ type == 1 ? ('赠送' + good.zs_price + '钻石') : (good.zs_price + '金币')}}</p>
    </div>
    <div class="product-content">
      <div class="left">
        <h3>{{ good.goods_name }}</h3>
        <p>{{ good.jj }}</p>
      </div>
      <div class="right">
        <p class="sell-price">{{ type == 1 ? '¥' : ''}}<span>{{ type == 1 ? good.price : '' }}</span></p>
        <p class="market-price">市场价：¥{{good.price_sc}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      good: Object,
      type: {
        type: Number,
        default: 1
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
  .product-item {
    border-radius: px2rem(5);
    background: #fff;
    padding: px2rem(6);
    margin-bottom: px2rem(10);
    box-shadow: 0 px2rem(5) px2rem(4) #e7e6ea;
  }
  .img-wrapper {
    position: relative;
    width: 100%;
    height: px2rem(140);
  }
  .img-wrapper .coin {
    position: absolute;
    right: 0;
    bottom: 0;
    background: #FFAE00;
    font-size: px2rem($size_small);
    color:#231B05;
    padding: px2rem(3) px2rem(10);
    border-top-left-radius: px2rem(70);
    border-bottom-left-radius: px2rem(70);
  }
  .product-img {
    width: 100%;
    height: 100%;
    border-radius: px2rem(4);
  }
  .product-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .product-content .left h3 {
    font-size: px2rem(13);
    line-height: px2rem(22);
    font-weight: bold;
  }
  .product-content .left p {
    color: #A8A8A8;
    font-size: px2rem(11);
  }
  .product-content .right {
    text-align: right;
  }
  .product-content .right .sell-price {
    color: #000009;
  }
  .product-content .right .sell-price span {
    font-size: px2rem(18);
  }
  .product-content .right .market-price {
    color: #B6B6B6;
    font-size: px2rem(10);
    text-decoration: line-through;
  }
</style>
