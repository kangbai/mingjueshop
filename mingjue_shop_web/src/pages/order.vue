<template>
  <div class="order-page">
    <div class="order-status">
      <div 
        v-for="(status, index) in statusList" 
        :key="index" 
        :class="['status-item', selectedStatus == index ? 'selected' : '' ]"
        @click="handleStatusChange(index)"
      >
        <span>{{ status }}</span>
      </div>
    </div>
    <div v-if="orderList.length" class="order-list">
      <order-item 
        v-for="order in orderList" 
        :key="order.bill_id"
        :order="order"
        :onClose="handleCloseOrder"
        :onPay="handlePayOrder"
        :onExpress="handleCheckExpress"
      />
     <p v-if="curPage <= totalPage && (totalPage !== 1)" class="page-infinite-loading" @click="handleLoadMore">
          {{ loading ? '正在加载更多...' : '点击加载更多...'}}
      </p>
    </div>
    <div v-else class="order-none">
      <img src="../assets/record.png" />
      <p>您还没有相关的订单</p>
      <router-link to="/" class="btn">去商城逛逛</router-link>
    </div>
  </div>
</template>

<script>
  import orderItem from '../components/orderitem';
  import loadmoreBtn from '@/components/loadmorebtn';
  import { requestGoodsOrder, requestCloseOrder, requestOrderPay } from '@/api';
  import { mapActions } from 'vuex';
  export default {
    components: { orderItem, loadmoreBtn },
    data () {
      return {
        orderList: [],
        statusList: [],
        selectedStatus: 0,
        curPage: 1,
        totalPage: 1,
        loading: false
      }
    },
    mounted () {
      document.title = '我的订单';
      this._requestGoodsOrder(0);      
    },
    methods: {
      ...mapActions(['changeToast']),
      handleStatusChange (index) {
        this.selectedStatus = index;
        this.curPage = 1;
        this.orderList = [];
        this._requestGoodsOrder();
      },
      _requestGoodsOrder () {
        requestGoodsOrder(this.curPage, this.selectedStatus)
        .then(r => {
          const res = r.data;
          console.log(res);
          this.loading = false;
          if (res.code == 0) {
            this.statusList = res.data.status_list;
            this.orderList = this.orderList.concat(res.data.list);
            this.curPage = Number(res.data.page) + 1;
            this.totalPage = Number(res.data.page_count);
          }
        })
        .catch(err => {
          this.loading = false;
          this.changeToast('网络有问题～');
        })
      },
      handleCloseOrder (order) {
        console.log(this.orderList.indexOf(order));
        requestCloseOrder(order.bill_id)
          .then(r => {
            const res = r.data;
            console.log(r.data);
            if (res.code == 0) {
              // this.curPage = 1;
              // this._requestGoodsOrder();
              const index = this.orderList.indexOf(order);
              this.orderList.splice(index, 1);
              this.orderList = this.orderList;
            }
          })
      },
      handlePayOrder (order_id) {
        // const { deviceInfo } = this.$store.state;
        // const type = deviceInfo.from == 'app' ? 2 : 1;
        const from = document.getElementById('from-input').value;
        const type = from == 'app' ? 2 : 1;
        console.log('pay order....');
        requestOrderPay(order_id, type)
          .then(r => {
            const res = r.data;
            console.log('--------', r, '-----');
            if (res.code == 0) {
              if (type == 1) {
                window.location.href = res.data.pay_url; 
              } else {
                console.log('----支付宝-----');
                window.AppExec &&  window.AppExec.callHandler('alipay', res.data, (callbackData) => {
                  // 1 成功 0 失败
                  this.changeToast(callbackData == 1 ? '支付成功' : '支付失败');
                });
                  // window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.callHandler(
                  //   'alipay', 
                  //   {'param': res.data}, 
                  //   function(responseData) {
                  //     alert(responseData)
                  //   }
                  // );
              }
            } else {  
              this.changeToast(res.msg);
            }
          })
          .catch(err => {
            this.changeToast('网络有问题～');
          })
      },
      handleCheckExpress (orderId) {
        this.$router.push(`/logistics/${orderId}`);
      },
      handleLoadMore () {
        if (this.loading) return;
        this.loading = true;
        this._requestGoodsOrder();
      }
    } 
  }
</script>

<style lang="scss" scoped>
  @import '../styles/mixin.scss';
  .order-page {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .order-status {
    height: px2rem(44);
    background: #fff;
    border-bottom: 1px solid #D5D5D5;
    display: flex;
    align-items: center;
  }
  .status-item {
    flex: 1;
    text-align: center;
  }
  .status-item span {
    display: inline-block;
    font-size: px2rem(13);
    color: #808080;
    padding: px2rem(8);
  }
  .selected span {
    border-bottom: 2px solid $primary-color;
    color: $primary-color;
  }
  .order-list {
    flex: 1;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .order-none {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    font-size: px2rem(13);
    color: #666666;
  }
  .order-none img {
    width: px2rem(56);
  }
  .order-none p {
    line-height: px2rem(36);
  }
  .order-none .btn {
    margin-top: px2rem(4);
    text-decoration: none;
    border: 1px solid #979797;
    padding: px2rem(12) px2rem(18);
    border-radius: px2rem(5);
    &:visited {
      text-decoration: none;  
      color: #666666;    
    }
  }
</style>
