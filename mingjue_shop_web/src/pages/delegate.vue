<template>
  <div class="delegate-page">
    <div class="delegate-header">
      <div class="total-achievement">
        <p>本周总业绩</p>
        <h3>{{ info.yeji_total || '0' }}</h3>
      </div>
      <div class="sub-achievement">
        <div class="sub-item">
          <p>直属会员业绩</p>
          <p>{{ info.yeji_first || 0 }}</p>
        </div>
        <div class="sub-item">
          <p>代理会员业绩</p>
          <p>{{ info.yeji_other || 0 }}</p>
        </div>
      </div>
      <p class="note">注：业绩=会员每次游戏中的输赢金额</p>
    </div>
    <div class="delegate-content">
      <div class="money-section">
        <div class="money-item">
          <div>
            <p>本周我的佣金</p>
            <p>{{ info.yongjin_me || 0 }}</p>
          </div>
          <div>
            <p>可提现的佣金</p>
            <p>{{ info.yongjin_cash || 0 }}</p>
          </div>
        </div>
        <div class="money-item">
          <div>
            <p>总佣金</p>
            <p>{{ info.yongjin_total }}</p>
          </div>
          <div>
            <p>下级代理佣金</p>
            <p>{{ info.yongjin_agens || 0 }}</p>
          </div>
        </div>
        <div class="reward-tip">
          <p>当前每万元返{{ info.user_jl || 0}}元</p>
          <p>你产生出创业绩量达到10000000.00 即每万元返200元</p>
        </div>
        <button class="btn-withdraw" @click="handleDraw">立即提现</button>
      </div>
      <div class="commission-note">
        <p>注：总佣金=总业绩/10000*每万返佣金额+额外获得佣金</p>
        <p>我的佣金=总佣金-下级代理佣金</p>
        </div>
      <div class="membership-section">
        <p class="title">我的直属会员</p>
        <p class="total-membership"><span>{{ info.total_fans || 0}}</span>个</p>
        <div class="new-membership">
          <div>
            <p>本周新增</p>
            <p><span>{{ info.new_fans_week || 0 }}</span>个</p>
          </div>
          <div>
            <p>本月新增</p>
            <p><span>{{ info.new_fans_month || 0 }}</span>个</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { requestAgentInfo, requestDrawReward } from '@/api';
  export default {
    data () {
      return {
        info:  {}
      }
    },
    mounted () {
      document.title = '我是代理';
      this._requestAgentInfo();
    },
    methods: {
      _requestAgentInfo () {
        requestAgentInfo()
          .then(r => {
            const res = r.data;
            console.log(res)
            if (res.code == 0) {
              this.info = res.data;
            } else {
              this.$store.dispatch('changeToast', res.msg);
            }
          })
          .catch(err => {
            this.$store.dispatch('changeToast', '网络有问题～');
          })
      },
      handleDraw () {
        requestDrawReward()
          .then(r => {
            const res = r.data;
            console.log(res);
            if (res.code == 0) {
              this.$store.dispatch('changeToast', '提现成功');
              this._requestAgentInfo();
            } else {
              this.$store.dispatch('changeToast', res.msg);
            }
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/mixin.scss';
  .delegate-page {
    background: #fff;
    height: 100%;
  }
  .delegate-header {
    background: $primary_color;
    color: #fff;
    padding: px2rem(20) px2rem(50) px2rem(10);
  }
  .total-achievement {
    text-align: center;
    padding-bottom: px2rem(20);
    border-bottom: 1px solid #00BFA5;
    p {
      font-size: px2rem(13);
      color: #B7FFF5;
    }
    h3 {
      font-size: px2rem(32);
      font-weight: bold;
    }
  }
  .sub-achievement {
    padding: px2rem(6) 0;
    border-bottom: 1px solid #00BFA5;
    display: flex;
    .sub-item {
      flex: 1;
      text-align: center;
      p:first-child {
        color: #B7FFF5;
        font-size: px2rem($size_small);
      }
      p:last-child {
        font-size: px2rem(18);
      }
    }
  }
  .note {
    margin-top: px2rem(16);
    font-size: px2rem(11);
    color: #008271;
    text-align: center;
  }
  .delegate-content {
    padding: px2rem(15);
  }
  .money-section {
    border: 1px solid #C5E4E0;
    padding: 0 px2rem(30) px2rem(18);
    position: relative;
    .money-item {
      display: flex;
      border-bottom: 1px solid rgba(197, 228, 224, 0.5);
      & > div {
        flex: 1;
        text-align: center;
        padding: px2rem(12) 0;
        p:first-child {
          color: #808080;
          font-size: px2rem($size_small);
        }
        p:last-child {
          font-size: px2rem($size_default);
        }
      }
    }
    .reward-tip {
      margin: px2rem(12) 0;
      color: #666666;
      font-size: px2rem(11);
      text-align: center;
      line-height: 1.2;
    }
    .btn-withdraw {
      display: inline-block;
      width: px2rem(130);
      height: px2rem(36);
      border-radius: px2rem(18);
      color: #fff;
      font-size: px2rem($size_middle);
      text-align: center;
      background: $primary_color;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 50%);
    }
  }
  .commission-note {
    color: #666666;
    font-size: px2rem(11);
    line-height: 1.2;
    text-align: center;
    padding: px2rem(28) 0 px2rem(18);
  }
  .membership-section {
    border: 1px solid #C5E4E0;
    padding: 0 px2rem(30);
    position: relative;
    margin-top: px2rem(10);
    .title {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
      padding: 0 px2rem(6);
    }
    .total-membership {
      color: #666;
      font-size: px2rem($size_small);
      text-align: center;
      padding: px2rem(10) 0;
      border-bottom: 1px solid rgba(197, 228, 224, 0.5);
      span {
        font-size: px2rem(18);
      }
    }
    .new-membership {
      display: flex;
      padding: px2rem(10) 0;
      & > div {
        flex: 1;
        text-align: center;
        font-size: px2rem($size_small);
        p:first-child {
          color: #808080;
        }
        p > span{
          font-size: px2rem($size_default);
        }
      }
    }
  }
</style>
