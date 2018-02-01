<template>
  <div class="alipay-page">
    <div v-if="binded" class="binded">
      <img src="../assets/binded.png" />
      <p>成功绑定支付宝</p>
      <button @click="handleUnbind">解除绑定</button>
    </div>
    <div v-else>
      <div class="input-wrapper">
        <input v-model="account" type="text" class="account-input" placeholder="输入支付宝账号" />
        <input v-model="name" type="text" class="pwd-input" placeholder="请输入支付宝名称" />
      </div>
      <my-button clsName="fill" title="确认" :onClick="handleBind" />
    </div>
  </div>
</template>

<script>
  import myButton from '../components/button';
  import { requestBindAlipay, requestUnbindAlipay, requestUserInfo } from '@/api';
  import { mapActions } from 'vuex';
  export default {
    components: { myButton },
    data () {
      return {
        account: '',
        name: '',
        binded: false
      }
    },
    mounted () {
      document.title = '绑定支付宝';
      this._requestUserInfo();
    },
    methods: {
      ...mapActions(['changeToast']),
      _requestUserInfo () {
        requestUserInfo()
        .then(r => {
          const res = r.data;        
          if (res.code == 0) {
            this.binded = Number(res.data.is_binding_alipay);
          } else {
            this.changeToast(res.msg);
          }
        })
      },
      handleBind () {
        if (!this.account.length || !this.name.length) return;
        requestBindAlipay(this.name, this.account)
          .then(r => {
            const res = r.data;
            this.changeToast(res.msg);
            if (res.code == 0) {
              this._requestUserInfo();
            }
          })
      },
      handleUnbind () {
        requestUnbindAlipay()
          .then(r => {
            const res = r.data;
            this.changeToast(res.msg);
            if (res.code == 0) {
              this.binded = 0;
            }
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/mixin.scss';
  .alipay-page {
    text-align: center;
  }
  .input-wrapper {
    background: #fff;
  }
  .input-wrapper input {
    height: px2rem(60);
    width: 100%;
    text-align: center;
    font-size: px2rem(18);
    &:first-child {
      border-bottom: 1px solid $border_color;
    }
  }
  .input-wrapper input::placeholder {
    color: $text_color;
  }
  .binded {
    padding-top: px2rem(60);
    img {
      width: px2rem(83);      
    }
    p {
      font-size: px2rem($size_default);
    }
    button {
      margin-top: px2rem(40);
      width: px2rem(295);
      height: px2rem(49);
      border-radius: px2rem(24.5);
      background: $primary_color;
      color: #fff;
      font-size: px2rem($size_default);
    }
  }
</style>
