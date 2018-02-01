<template>
  <div class="logistics-page">
    <div class="logistics-info">
      <img :src="goodsPic" />
      <div class="content">
        <p class="status">物流状态 <span>{{ expressStatus }}</span></p>
        <p class="source">承运来源：{{ expressCompany }}</p>
        <p class="order">订单编号：{{ expressNum }}</p>
      </div>
    </div>
    <div class="logistics-detail">
      <div
        class="detail-item"
        v-for="(express, index) in expressList" 
        :key="index"
      >
        <div class="line"></div>
        <div class="item-content">
          <p class="message">{{ express.status }}</p>
          <p class="time">{{ express.time }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { requestExpress } from '@/api';
  export default {
    data () {
      return {
        expressList: [],
        expressNum: '',
        expressStatus: '',
        expressCompany: '',
        goodsPic: ''
      }
    },
    mounted () {
      document.title = '我的物流';
      const orderId = this.$route.params.orderId;
      const STATUS = ['在途中', '派件中', '已签收', '派件失败'];
      requestExpress(orderId)
        .then(r => {
          const res = r.data;
          if (res.code == 0) {
            const { list, deliverystatus, number, company, pic } = res.data.result;
            this.expressList = list;
            this.expressNum = number;
            this.expressCompany = company;
            this.expressStatus = STATUS[Number(deliverystatus) - 1];
            this.goodsPic = pic;
          }
        })
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/mixin.scss';
  .logistics-info {
    background: #fff;
    display: flex;
    padding: px2rem(11) px2rem(15);
  }
  .logistics-info .content {
    p {
      color: #808080;
      font-size: px2rem($size_small);
    }
    .status {
      font-size: px2rem($size_default);
      line-height: px2rem(24);
      span {
        color: #E34646;
      }
    }
  }
  .logistics-info img {
    width: px2rem(60);
    height: px2rem(60);
    margin-right: px2rem(10);
  }
  .logistics-detail {
    background: #fff;
    margin-top: px2rem(10);
    position: relative;
    // .line {
    //   position: absolute;
    //   top: 20px;
    //   left: 20px;
    //   bottom: 20px;
    //   width: 2px;
    //   background: #EAEAEA;
    // }
    .detail-item {
      margin-left: px2rem(20);
      // border-left: 1px solid #EAEAEA;
      color: #808080;
      padding-left: px2rem(20);     
      position: relative;
      &:first-child {
        color: $primary_color;
        &:after {
          background: $primary_color;
          width: px2rem(12);
          height: px2rem(12);
          border: px2rem(2) solid #a8eee5;
        }
      } 
      &:last-child {
        .line {
          display: none;
        }
        .item-content {
          border-bottom: none;
        }
      }
      &:after {
        content: '';
        display: inline-block;
        position: absolute;
        left: 0;
        transform: translateX(-50%);
        top: 20px;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #DBDBDB;
      }
      .line {
        position: absolute;
        top: 20px;
        left: -1px;
        bottom: -20px;
        width: 2px;
        background: #EAEAEA;
      }
      .item-content {
        padding: px2rem(10) 0;        
        border-bottom: 1px solid #EAEAEA;
        .message {
          font-size: px2rem($size_middle);
          line-height: px2rem(24);
        }
        .time {
          font-size: px2rem(11);
        } 
      }
    }
  }
</style>
