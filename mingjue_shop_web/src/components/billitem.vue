<template>
  <div class="bill-item">
    <div class="item-left">
      <p class="name">{{ bill.content }}</p>
      <p class="time">{{ createdTime }}</p>
    </div>
    <div class="item-right">
      <span class="count">+{{ bill.je }}</span>
      <span :class="['status', bill.tx_url ? 'withdraw' : 'complete']" @click="handleWithdraw">{{ bill.tx_url ? '立即提现' : bill.state }}</span>
    </div>
  </div>
</template>

<script>
  import { formatDate } from '@/util';
  export default {
    props: {
      bill: Object
    },
    computed: {
      createdTime () {
        return formatDate(this.bill.mktime);
      }
    },
    methods: {
      handleWithdraw () {
        const url = this.bill.tx_url;
        if (url) {
          window.location.href = url;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/mixin.scss';
  .bill-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: px2rem(55);
    // background: #fff;
    border-bottom: 1px solid $border_color;
    color: $dark_text_color;    
  }
  .item-left .name {
    font-size: px2rem($size_default);
  } 
  .item-left .time {
    color: #A8A8A8;
    font-size: px2rem($size_small);
  }
  .item-right {
    display: flex;
    align-items: center;
  }
  .item-right .count {
    font-size: px2rem(18);
    margin-right: px2rem(12);
  }
  .item-right .status {
    border-radius: px2rem(2);
    font-size: px2rem(11);
    padding: px2rem(2) px2rem(6);
  }
  .item-right .status.complete {
    border: 1px solid #1AB6FF;    
    color: #1AB6FF;
  }
  .item-right .status.wait {
    border: 1px solid #1AB6FF;
    color: #1AB6FF;
  }
  .item-right .status.withdraw {
    color: #fff;
    background: #FB712B;
    padding: px2rem(4);
  }
</style>
