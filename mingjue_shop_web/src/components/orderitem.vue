<template>
  <div class="order-item">
    <div class="info-wrapper">
      <div class="left">
        <img :src="order.img" />
        <div class="content">
          <p class="product-name">{{ order.sp_name }}</p>
          <p class="product-num">数量：{{ order.numb }}</p>
          <p class="product-price price-color">总价：{{ order.goods_price }}</p>
        </div>
      </div>
      <i class="r-arrow"></i>
    </div>
    <div class="bottom">
      <div class="left">
        <p class="time">{{ createdTime }}</p>      
        <p class="total">合计：<span class="price-color">¥{{ order.total_price }}</span></p>
      </div>
      <div class="status-wrapper">
        <button v-if="btns[0].title" class="gray-btn" @click="btns[0].onClick">{{ btns[0].title }}</button>        
        <button class="orange-btn" @click="btns[1].onClick">{{ btns[1].title }}</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { formatDate } from '@/util';
  export default {
    props: {
      order: Object,
      onClose: { type: Function, default: () => {} },
      onPay: { type: Function, default: () => {} },
      onExpress: { type: Function, default: () => {} }
    },
    computed: {
      createdTime () {
        return formatDate(this.order.mktime);
      },
      btns () {
        let tmp = [];
        const expressBtn = { title: '查看物流', onClick: this.handleCheckExpress };
        const payedBtn = { title: '已支付', onClick: () => {} };
        switch (Number(this.order.state)) {
          case 1: // 代付款
            const closeBtn = { title: '关闭订单', onClick: this.handleCloseOrder };
            const payBtn = { title: '立即支付', onClick: this.handlePayOrder };
            tmp = [closeBtn, payBtn];
            break;
          case 2: // 待发货
            tmp = [{}, payedBtn];
            break;
          case 3: // 已发货
            tmp = [expressBtn, payedBtn];
            break;
          case 4: // 已完成
            const completeBtn = { title: '已完成', onClick: () => {} };
            tmp = [{}, completeBtn];
            break;
          default:
            break;
        }
        return tmp;
      }
    },
    methods: {
      handleCloseOrder () {
        this.onClose(this.order);
      },
      handlePayOrder () {
        this.onPay(this.order.bill_id);
      },
      handleCheckExpress () {
        this.onExpress(this.order.bill_id);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/mixin.scss';
  .order-item {
    background: #fff;
    padding-top: px2rem(10);
    padding-left: px2rem(15);
    margin-bottom: px2rem(10);
  }
  .info-wrapper {
    background: #F7F7F7;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: px2rem(10);
  }
  .info-wrapper .left {
    display: flex;
  }
  .info-wrapper .left img {
    width: px2rem(75);
    height: px2rem(75);
  }
  .info-wrapper .left .content {
    margin-left: px2rem(10);
    padding-top: px2rem(4);
  }
  .info-wrapper .left .product-name {
    font-size: px2rem($size_default);
  }
  .info-wrapper .left .product-num {
    font-size: px2rem(13);
    color: #A8A8A8;
    margin-top: px2rem(6);
    margin-bottom: px2rem(4);
  }
  .info-wrapper .left .product-price {
    font-size: px2rem(13);
  }
  .price-color {
    color: #FB712B;
  }
  .info-wrapper .r-arrow {
    width: px2rem(15);
    height: px2rem(15);
    background: url('../assets/r-arrow.png') no-repeat;
    background-size: cover;
  }
  .time {
    color: #A8A8A8;
    font-size: px2rem(11);
    line-height: px2rem(30);
  }
  .order-item .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: px2rem(8);
  }
  .status-wrapper button {
    border-radius: px2rem(2);
    width: px2rem(50);
    height: px2rem(25);
    color: #fff;
    font-size: px2rem(11);
  }
  .status-wrapper .orange-btn {
    background: #FB712B;
  }
  .status-wrapper .gray-btn {
    background: #CCCCCC;
  }
</style>
