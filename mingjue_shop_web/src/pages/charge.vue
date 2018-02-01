<template>
  <div class="home-page">
      <!-- <div class="phone-input">
        <input v-model="phoneNum" type="number" placeholder="请输入您的手机号码" />
        <p class="error-tip">输入手机号码有误！</p>
      </div>
      <div class="charge-content">
         <div class="charge-section">
          <p class="title phone">充话费</p>
          <div class="charge-wrapper">
            <div 
              v-for="phone in phoneList" 
              class="charge-item"
              :key="phone.sp_id"
              @click="handleChargePhone(phone)"
            >
              <p>¥{{ phone.price_sc }}元</p>
              <p>售价：¥{{ phone.price }}</p>
            </div>
          </div>
        </div>
      </div> -->
      <!-- <div style="height: 200px; width=100%;background: #fff;"></div> -->
      <!-- <div class="charge-topic" @click="handleDelegate">
        <a href="javascript:;">
          <img class="topic-img" :src="isAgent ? manageDelegate : beDelegate " alt="活动">
        </a>
      </div> -->
      <div v-if="from !== 'app'" class="charge-topic">
        <a href="http://fir.im/dycz">
          <img class="topic-img" src="../assets/download.jpg" alt="活动">
        </a>
      </div>
      <div class="charge-content">
        <div class="charge-section">
          <p class="title coin">商城活动卡</p>
          <div class="charge-wrapper">
            <div class="charge-item" @click="handleInputDiamond">
              <p>+钻</p>
              <p>售价：***</p>
            </div>
            <div class="charge-item" @click="handleClickDiamond(20)">
              <p>20钻</p>
              <p>售价：¥20.00</p>
            </div>
            <div class="charge-item" @click="handleClickDiamond(50)">
              <p>50钻</p>
              <p>售价：¥50.00</p>
            </div>
            <div class="charge-item" @click="handleClickDiamond(100)">
              <p>100钻</p>
              <p>售价：¥100.00</p>
            </div>
          </div>
        </div>
      </div>
      <div class="charge-topic">
        <!-- <p class="topic-index">专题2</p> -->
        <a href="http://zjshop.tcpan.com/app/sb/entrance">
          <img class="topic-img" src="../assets/sb-banner.png" alt="赏宝">
        </a>
      </div>
      <div class="charge-topic">
        <!-- <p class="topic-index">专题1</p> -->
        <a href="http://zjshop.tcpan.com/api/bjl/entrance">
          <img class="topic-img" src="../assets/bjl-banner.png" alt="百家乐">
        </a>
      </div>
      <!-- <div class="charge-topic">
        <a href="http://zjshop.tcpan.com/app/sgdzz/entrance">
          <img class="topic-img" src="../assets/sgdr-banner.png" alt="水果达人">
        </a>
      </div> -->
    <!-- <router-link to="/profile" class="pop">
      <img src="../assets/profile.png" />
    </router-link> -->
    <div v-if="showDiamondInput" class="dialog-diamond">
      <div class="content">
        <h3>充商城活动卡</h3>
        <i class="close-btn" @click="handleHideDialog"></i>
        <input v-model="diamondNum" type="number" placeholder="输入充值钻石数">
        <button @click="handleBuyDiamond">确认</button>
      </div>
    </div>
    <div v-if="showChoosePay" class="charge-phone-dialog">
      <div class="content">
        <h3>选择支付方式</h3>
        <i class="close-btn" @click="handleHideDialog"></i>
        <div class="pay-list">
          <div class="pay-item" @click="handleWechatBuyCard">
            <div class="left">
              <img :src="from == 'app' ? aliIcon : wechatIcon" />
              <span>{{ from == 'app' ? '支付宝支付' : '微信支付'}}</span>
            </div>
            <i></i>
          </div>
          <div class="pay-item" @click="handleCoinBuyCard">
            <div class="left">
              <img src="../assets/diamondpay.png" />
              <span>金币支付</span>
            </div>
            <i></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { requestChargeProductListUrl, requestDiamondPay, requestBuyCard, requestUserInfo, requestDelegate } from '@/api';
  import { mapActions } from 'vuex';
  import { validPhoneNum } from '@/util';
  import wechatIcon from '@/assets/wechatpay.png';
  import aliIcon from '@/assets/alipay.png';
  // import beDelegate from '@/assets/be-delegate.png';
  // import manageDelegate from '@/assets/manage-delegate.png';
  export default {
    data () {
      return {
        showDiamondInput: false,
        showChoosePay: false,
        // isAgent: false,
        // phoneList: [],
        phoneList: [
          { sp_id: '2', name: '话费充值30元', price: '30.00', price_sc: '30.00' },
          { sp_id: '3', name: '话费充值50元', price: '50.00', price_sc: '50.00' },
          { sp_id: '4', name: '话费充值100元', price: '100.00', price_sc: '100.00' },
          { sp_id: '5', name: '话费充值200元', price: '200.00', price_sc: '200.00' },
          { sp_id: '6', name: '话费充值300元', price: '300.00', price_sc: '300.00' },
          { sp_id: '7', name: '话费充值500元', price: '500.00', price_sc: '500.00' }
        ],
        diamondNum: '',
        curPhone: {},
        phoneNum: '',
        wechatIcon,
        aliIcon
        // beDelegate,
        // manageDelegate
      }
    },
    computed: {
      from () {
        const from = document.getElementById('from-input').value;
        // return this.$store.state.deviceInfo.from
        return from;
      },
      platform () {
        const platform = document.getElementById('platform-input').value;
        return platform;
        // return this.$store.state.deviceInfo.platform
      }
    },
    mounted () {
      document.title = '积分活动';
      this._requestUserInfo();
      // this._requestChargeProductListUrl();
    },
    methods: {
      ...mapActions(['changeToast']),
      _requestUserInfo () {
        requestUserInfo()
          .then(r => {
            const res = r.data;
            console.log(res);
            if (res.code == 0) {
              this.isAgent = Number(res.data.is_agents);
            }
          })
      },
      // _requestChargeProductListUrl () {
      //   requestChargeProductListUrl()
      //     .then(r => {
      //       const res = r.data;
      //       console.log(res);
      //       if (res.code == 0) {
      //         this.phoneList = res.data;
      //       }
      //     })
      // },
      handleHideDialog () {
        this.showDiamondInput = false;
        this.showChoosePay = false;
      },
      handleBuyCard (payWay) {
        if (!this.phoneNum.length) {
          this.changeToast('请输入手机号');
        }
        requestBuyCard(this.curPhone.sp_id, this.phoneNum, payWay)
          .then(r => {
            const res = r.data;
            console.log(res);
            console.log(this.from);
            if (res.code == 0) {
              if (res.data.type == 1) {
                window.location.href = res.data.zf_url; 
              } else if (res.data.type == 2) {
                this.showChoosePay = false;
                this.changeToast(res.msg);
              } else {
                console.log('----支付宝-----');
                window.AppExec && window.AppExec.callHandler('alipay', res.data, (cbData) => {
                  if (cbData == 1) {
                    this.showChoosePay = false;
                    this.changeToast('支付成功');
                  } else {
                    this.changeToast('支付失败');
                  }
                });
              }
            } else {
              this.showChoosePay = false;
              this.changeToast(res.msg);
            }
          })
          .catch(err => {
            this.changeToast('网络有问题～');
          })
      },
      handleCoinBuyCard () {
        this.handleBuyCard(2);
      },
      handleWechatBuyCard () {
        this.handleBuyCard(this.from == 'app' ? 3 : 1);
      },
      handleChargePhone (phone) {
        if (!this.phoneNum.length) {
          this.changeToast('请输入手机号');
          return;
        } else if (!validPhoneNum(this.phoneNum)) {
          this.changeToast('请输入合法的手机号');
          return;
        }
        this.showChoosePay = true;
        this.curPhone = phone;
      },
      handleInputDiamond () {
        this.diamondNum = '';
        this.showDiamondInput = true;
      },
      handleBuyDiamond () {
        const diamondNum = this.diamondNum;
        if (diamondNum.length === 0) return;
         if (!(/^\d+$/.test(diamondNum))) {
            this.changeToast('输入的数额不合法');
            return;
        }
        this.handleClickDiamond(diamondNum);
      },
      handleClickDiamond (price) {
        const payWay = this.from == 'app' ? '2' : '1';
        requestDiamondPay(price, payWay)
          .then(r => {
            const res = r.data;
            console.log(res);
            if (res.code == 0) {
              if (this.from == 'app') {
                console.log('----支付宝-----');
                window.AppExec && window.AppExec.callHandler('alipay', res.data,(cbData) => {
                  if (cbData == 1) {
                    this.changeToast('支付成功');
                  } else {
                    this.changeToast('支付失败');
                  }
                });
                // window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.callHandler(
                //   'alipay', 
                //   {'param': res.data}, 
                //   function(responseData) {
                //     alert(responseData)
                //   }
                // );
              } else {
                window.location.href = res.data.pay_url;                
              }
            } else {
              this.showChoosePay = false;
              this.changeToast(res.msg);
            }
          })
          .catch(err => {
            console.log('error:', err);
            this.changeToast('网络有问题～');
          })
      },
      handleBuyDelegate () {
        const type = this.from == 'app' ? 2 : 1;
        requestDelegate(type)
          .then(r => {
            const res = r.data;
            console.log('delegate : ', res);
            if (res.code == 0) {
              if (type == 1) {
                window.location.href = res.data.pay_url;
              } else {
                console.log('----支付宝-----');
                window.AppExec && window.AppExec.callHandler('alipay', res.data, (cbData) => {
                  if (cbData == 1) {
                    this.changeToast('支付成功');
                  } else {
                    this.changeToast('支付失败');
                  }
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
            console.log(err);
            this.changeToast('网络有问题～');
          })
      },
      handleDelegate () {
        console.log('-----')
        if (this.isAgent) {
          this.$router.push('/delegate');
        } else {
          this.handleBuyDelegate();
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/mixin.scss';
  .home-page {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    background:-webkit-linear-gradient(90deg,#00ABD6,#00CCB1);
  }
  .phone-input {
    margin: 0 px2rem(10);  
    padding-bottom: px2rem(17);
    padding-top: px2rem(12);
    border-bottom: 1px solid #fff;
    position: relative;
    /* display: flex;
    justify-content: space-between;
    align-items: center; */
    background: transparent;
  }
  .phone-input input {
    font-size: px2rem(26);
    width: 100%;
    padding: 0 px2rem(5);
    color: #fff;
    height: px2rem(30);
    line-height: px2rem(30);
    background: transparent;
    outline: none;
    border: none;
  }
  .phone-input input::placeholder {
    color: #fff;
  }
  .phone-input .error-tip {
    display: none;
    color: #dd4646;
    font-size: px2rem($size_small);
    position: absolute;
    bottom: 0;
    left: px2rem(5);
  }
  .charge-content {
    margin: px2rem(10);
    margin-right: 0; 
    background: #fff;
    border-radius: px2rem(6); 
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .charge-section {
    padding-top: px2rem(10);
  }
  .charge-section .title {
    color: #838383;
    font-size: px2rem($size_middle);
    margin-left: px2rem(10);
    margin-bottom: px2rem(6);
    padding-left: px2rem(5);
  }
  .charge-section .title:before {
    content: '';
    display: inline-block;
    height: px2rem(13);
    width: px2rem(13);
    position: relative;
    left: px2rem(-5);
    top: px2rem(1);
    background-size: cover;
    background-repeat: no-repeat;
  }
  .charge-content .phone:before {
    background-image: url(../assets/phone-bill.png);
  }
  .charge-content .data:before {
    background-image: url(../assets/phone-data.png);
  }
  .charge-content .coin:before {
    background-image: url(../assets/game-coin.png);
  }

  .charge-wrapper {
    padding-bottom: px2rem(15);
    height: px2rem(90);
    box-sizing: content-box;
    white-space: nowrap;  
    overflow-x: auto;
  }
  .charge-wrapper .charge-item {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: px2rem(90);
    width: px2rem(110);
    margin-left: px2rem(10);
    border-radius: px2rem(4);
    border: 1px solid #DBDBDB;
    color: #4D4D4D;
    font-size: px2rem($size_small);  
    p {
      font-weight: bold;
    }
  }
  .charge-topic {
    margin: 0 px2rem(10);
    margin-top: px2rem(10);
    padding: px2rem(6);
    border-radius: px2rem(4);
    height: px2rem(140);
    background: #fff;
    margin-bottom: px2rem(15);
    position: relative;
  }
  .charge-topic .topic-index {
    color: #fff;
    font-size: px2rem($size_middle);
    position: absolute;
    top: px2rem(5);
    left: px2rem(5);
    z-index: 1;
    width: px2rem(51);
    height: px2rem(50.5);
    background: url(../assets/topic-idx.png) no-repeat;
    background-size: cover;
  }
  .charge-topic .topic-img {
    width: 100%;
    height: 100%;
  }
  .dialog-diamond, .charge-phone-dialog {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
  }
  .dialog-diamond .content {
    height: px2rem(186);
    width: px2rem(305);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background: #fff;
    border-radius: px2rem(5);
    text-align: center;
  }

  .dialog-diamond .content h3, .charge-phone-dialog h3 {
    line-height: px2rem(44);
    width: 100%;
    text-align: center;
    font-weight: bold;
    color: #000;
    border-bottom: 1px solid #DADADA;
  }
  .dialog-diamond .content input {
    width: px2rem(258);
    height: px2rem(44);
    text-align: center;
    border-bottom: 1px solid #E5E5E5;
    margin-top: px2rem(10);
  }
  .dialog-diamond .content button {
    width: px2rem(225);
    height: px2rem(44);
    border-radius: px2rem(22);
    background: $primary_color;
    margin-top: px2rem(20);
    color: #fff;
  }
  .dialog-diamond .content .close-btn, .charge-phone-dialog .close-btn {
    position: absolute;
    top: 0;
    left: 0;
    width: px2rem(44);
    height: px2rem(44);
    background: url('../assets/close.png') no-repeat center;
    background-size: px2rem(14) px2rem(14);
  }

  .charge-phone-dialog .content {
    height: px2rem(132);
    width: px2rem(280);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background: #fff;
    border-radius: px2rem(5);
    text-align: center;
  }
  .charge-phone-dialog .pay-list {
    width: 100%;
    padding: 0 px2rem(10);
  }
  .charge-phone-dialog .pay-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: px2rem(44);
    border-bottom: 1px solid #E5E5E5;
    &:last-child {
      border-bottom: none;
    }
  }
  .charge-phone-dialog .pay-item img {
    width: px2rem(16);
    height: px2rem(16);
    vertical-align: middle;
    margin-right: px2rem(3);
  }
  .charge-phone-dialog .pay-item i {
    background: url('../assets/r-arrow.png') no-repeat;
    width: px2rem(15);
    height: px2rem(15);
    background-size: cover;
  }
  // .charge-phone-dialog .content {
  //   // height: px2rem(186);
  //   width: px2rem(305);
  //   position: absolute;
  //   left: 0;
  //   right: 0;
  //   top: 0;
  //   bottom: 0;
  //   margin: auto;
  //   background: #fff;
  //   border-radius: px2rem(5);
  //   text-align: center;
  // }
  // .pop {
  //   position: fixed;
  //   right: px2rem(30);
  //   bottom: px2rem(100);
  //   background: #00C6B8;
  //   width: px2rem(45);
  //   height: px2rem(45);
  //   box-sizing: content-box;
  //   border-radius: 50%;
  //   display: flex;  
  //   align-items: center;
  //   justify-content: center;
  //   z-index: 10;
  //   border: px2rem(4) solid #EDFFFD;
  // }
  // .pop img {
  //   width: px2rem(17);
  //   height: px2rem(22);
  // }
</style>
