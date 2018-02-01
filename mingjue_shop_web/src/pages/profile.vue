<template>
  <div class="profile-page">
    <div class="profile-info">
      <img @click="handleClickAvatar" class="avatar" :src="userInfo.headimgurl || defaultAvatar" />
      <p class="nickname">{{ userInfo.nickname || '-' }}</p>
      <div class="money-section">
        <div class="money-item">
          <p class="type">金币</p>
          <i class="icon-coin"></i>
          <p>{{ Number(userInfo.JB) || 0 }}</p>
        </div>
        <div class="money-item">
          <p class="type diamond">钻石</p>
          <i class="icon-diamond"></i>
          <p>{{ Number(userInfo.ZS) || 0 }}</p>
        </div>
        <div class="money-item">
          <p class="type reward">奖励</p>
          <i class="icon-reward"></i>
          <p>{{ Number(userInfo.JL) || 0 }}</p>
        </div>
      </div>
    </div>
    <div class="link-wrapper">
      <router-link :to="link.toPath" class="link-item" v-for="(link, index) in links" :key="index">
        <img :src="link.iconUrl" />
        <p>{{ link.name }}</p>
      </router-link>
    </div>
    <div class="redpocket-section">
      <div class="rp-list" v-if="bills.length > 0">
        <div class="rp-item" v-for="bill in bills" :key="bill.id">
          <div class="left">
            <p class="date">{{ bill.date }}</p>
            <p class="time">{{ handleTime(bill.mktime) }}</p>
          </div>
          <div class="right">
           <span class="count">-{{ bill.je }}</span>
           <span :class="['status', bill.tx_url ? 'withdraw' : 'wait']" @click="handleWithdraw(bill)">{{ bill.tx_url ? '立即提现' : bill.state }}</span>
          </div>
        </div>
      </div>
      <button class="generate-rp-btn" @click="handleCloseSendCoin(true)">生成红包</button>
    </div>
    <div class="cell-section">
      <cell title="二维码" @click.native="handlePush('/myqr')" />
      <cell title="绑定支付宝" @click.native="handlePush('/alipay')" />
      <!-- <cell title="金币转出" @click.native="handleCloseSendCoin(true)"/> -->
      <cell title="钻石转让" @click.native="handlePush('/diamondlist')" />
      <a v-if="from !== 'app'" href="/app/login_in/refresh"><cell title="刷新信息" /></a>
      <a v-if="from !== 'app'" href="http://fir.im/dycz"><cell title="下载app" /></a>
      <cell title="我是代理" @click.native="handlePush('/delegate')" />
      <cell title="关于我们" :hideBorder="true" @click.native="handlePush('/about')" />
    </div>
    <div class="logout-btn" @click="handleLogout">退出</div>
    <p class="version-tip">Version 1.0</p>
    <div v-if="showSendCoin" class="dialog-coin">
      <div class="content">
        <h3>生成红包</h3>
        <i class="close-btn" @click="handleCloseSendCoin(false)"></i>
        <input v-model="coinNum" type="number" :placeholder="'可生成红包' + (Number(userInfo.JB) || 0) + '元'">
        <button @click="handleSendCoin">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
  import cell from '../components/cell';
  import orderIcon from '../assets/order-icon.png';
  import billIcon from '../assets/bill-icon.png';
  import fansIcon from '../assets/fans-icon.png';
  import shopIcon from '../assets/shop-icon.png';
  import { saveLogined } from '@/util/storage';
  import { requestUserInfo, requestLogout, requestWithdraw, requestBill } from '@/api';
  import { mapActions } from 'vuex';
  import defaultAvatar from '../assets/default-avatar.png';
  export default {
    components: { cell },
    data () {
      return {
        userInfo: {},
        cells: [],
        showSendCoin: false,
        coinNum: '',
        bills: []
      }
    },
    computed: {
      from () {
        const from = document.getElementById('from-input').value;
        // return this.$store.state.deviceInfo.from
        console.log(from);
        return from;
      },
      platform () {
        const platform = document.getElementById('platform-input').value;
        return platform;
        // return this.$store.state.deviceInfo.platform
      }
    },
    methods: {
      ...mapActions(['changeToast']),
      handlePush (toPath) {
        if(toPath == '/myqr'){
          window.location.href = "http://zjshop.tcpan.com/app/login_in/qrcode?mid="+this.userInfo.mid;
        }else{
          this.$router.push(toPath)
        }
      },
      handleLogout () {
        console.log(this.from);
          console.log(this,'-----sss');
        if (this.from == 'app') {
           window.AppExec && window.AppExec.callHandler('logout', null, (cbData) => {
            
          });
        } else {
          requestLogout()
          .then(r => {
            const res = r.data;
            if (res.code == 0) {
              // saveLogined(0);
              this.$router.push('/login');
            }
          })
        }
      },
      handleCloseSendCoin (val) {
       this.coinNum = '';
        this.showSendCoin = val;
      },
      handleSendCoin () {
        console.log(this.coinNum);
        if (this.coinNum.length === 0) {
          this.changeToast('请输入红包数');
          return;
        };
        requestWithdraw(this.coinNum)
          .then(r => {
            const res = r.data;
            console.log(res);
            this.changeToast(res.msg);
            if (res.code == 0) {
              this.showSendCoin = false;
              this._requestUserInfo();
            }
          })
      },
      _requestUserInfo () {
        requestUserInfo()
        .then(r => {
          const res = r.data;
          console.log(res);
          if (res.code == 0) {
            this.userInfo = res.data;
            this._requestBill();
          } else {
            this.changeToast(res.msg);
          }
        })
      },
      handleClickAvatar () {

        if (this.from == 'app') return;
        window.location.href = '/app/login_in/refresh';
      },
      _requestBill () {
        requestBill(1, 2)
          .then(r => {
            const res = r.data;
            console.log(res);
            if (res.code == 0) {
              this.bills = res.data.list;
            } else {
              this.changeToast(res.msg);
            }
          })
      },
      handleWithdraw (bill) {
        const url = bill.tx_url;
        if (url) {
          window.location.href = url;
        }
      },
      handleTime (mktime) {
        const mkDate = new Date(Number(mktime) * 1000);
        return mkDate.getHours() + ': ' + mkDate.getMinutes();
      }
    },
    created () {
      console.log("--",this);
      this.defaultAvatar = defaultAvatar;
      this.links = [
        { name: '订单', iconUrl: orderIcon, toPath: '/order' },
        { name: '账单', iconUrl: billIcon, toPath: '/bill' },
        { name: '粉丝', iconUrl: fansIcon, toPath: '/fans' },
        { name: '商城', iconUrl: shopIcon, toPath: '/' },
      ];
    },
    mounted () {
      document.title = '个人中心';
      this._requestUserInfo();
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/mixin.scss';
  .profile-page {
    background: #f5f5f5;
    height: 100vh;
  }
  .profile-info {
    background-color: $primary_color;
    height: px2rem(255);
    text-align: center;
  }
  .avatar {
    width: px2rem(65);
    height: px2rem(65);
    border: px2rem(3) solid #A9EDE3;
    border-radius: 50%;
    margin-top: px2rem(20);
    background: #fff;
  }
  .nickname {
    font-size: px2rem($size_default);
    line-height: px2rem(44);
    color: #fff;
  }
  .money-section {
    display: flex;
    border-top: 1px solid #00B199;
    padding-top: px2rem(10);
  }
  .money-item {
    flex: 1;
    text-align: center;
    position: relative;
    &:after {
      content: '';
      // float: right;
      position: absolute;
      right: 0;
      top: px2rem(20);
      height: px2rem(35);
      width: 1px;
      background: #00B199;
    }
    &:last-child {
      &:after {
        display: none;
      }
    }
  }
  .money-item p {
    color: #fff;
    font-size: px2rem(18);
  }
  .money-item .type {
    font-size: px2rem(13);
  }
  .money-item i {
    content: '';
    display: inline-block;
    width: px2rem(22);
    height: px2rem(22);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    margin: px2rem(3) 0;
  }
  .money-item i.icon-coin {
    background-image: url('../assets/coin.png');
  }
  .money-item i.icon-diamond {
    background-image: url('../assets/diamond.png');
  }
  .money-item i.icon-reward {
    background-image: url('../assets/reward.png');
  }
  .link-wrapper {
    display: flex;
    background: #fff;
    border-radius: px2rem(5);
    width: px2rem(355);
    height: px2rem(60);
    margin-bottom: px2rem(12);
    position: relative;
    left: px2rem(10);
    top: px2rem(-10);
    z-index: 9;
    &:after {
      content: '';
      position: absolute;
      top: px2rem(60);
      width: px2rem(305);
      left: px2rem(25);
      height: px2rem(12);
      background: url('../assets/profile-shadow.png') no-repeat;
      background-position: bottom;
      background-size: px2rem(345) px2rem(68);
    }
  }
  .link-item {
    flex: 1;
    text-align: center;
    padding-top: px2rem(8);
  }
  .link-item img {
    width: px2rem(18);
    height: px2rem(20);
  }
  .link-item p {
    color: #878787;
    font-size: px2rem($size_small);
  }
  .redpocket-section {
    // background: #fff;
    position: relative;
    padding-top: px2rem(20);    
    min-height: px2rem(60);
    .rp-list {
      background: #fff;
      padding: px2rem(20) px2rem(15) 0;
      margin-bottom: px2rem(12);
      // display: none;
      .rp-item {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #E0E0E0;
        padding: px2rem(15) 0;
        .left .date {
          color: #666;
          font-size: px2rem($size_default);
        }
        .left .time {
          color: #B6B6B6;
          font-size: px2rem($size_small);
        }
        .right .count{
          color: #666666;
          font-size: px2rem(15);
          margin-right: px2rem(12);
        }
        .right .status {
          border-radius: px2rem(2);
          font-size: px2rem(11);
          padding: px2rem(2) px2rem(6);
        }
        .right .status.wait {
          border: 1px solid #00CCB1;
          color: #00CCB1;
        }
        .right .status.withdraw {
          color: #fff;
          background: #FB712B;
          padding: px2rem(4);
        }
      }
    }
    .generate-rp-btn {
      width: px2rem(270);
      height: px2rem(40);
      background: $primary_color;
      border-radius: px2rem(20);
      color: #fff;
      font-size: px2rem($size_middle);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
  }
  
  .cell-section {
    background: #fff;
  }
  .logout-btn {
    width: 100%;
    height: px2rem(49);
    background: #fff;
    font-size: px2rem(15);
    margin-top: px2rem(6);
    text-align: center;
    line-height: px2rem(49);
  }
  .version-tip {
    text-align: center;
    color: #C2C2C2;
    line-height: px2rem(40);
    font-size: px2rem($size_middle);
  }
  .dialog-coin {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
  }
  .dialog-coin .content {
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

  .dialog-coin .content h3 {
    line-height: px2rem(44);
    width: 100%;
    text-align: center;
    font-weight: bold;
    color: #000;
    border-bottom: 1px solid #DADADA;
  }
  .dialog-coin .content input {
    width: px2rem(258);
    height: px2rem(44);
    text-align: center;
    border-bottom: 1px solid #E5E5E5;
    margin-top: px2rem(10);
  }
  .dialog-coin .content button {
    width: px2rem(225);
    height: px2rem(44);
    border-radius: px2rem(22);
    background: $primary_color;
    margin-top: px2rem(20);
    color: #fff;
  }
  .dialog-coin .content .close-btn {
    position: absolute;
    top: 0;
    left: 0;
    width: px2rem(44);
    height: px2rem(44);
    background: url('../assets/close.png') no-repeat center;
    background-size: px2rem(14) px2rem(14);
  }
</style>
