<template>
  <div class="login-page">
    <my-input
      :leftImg="phoneIcon"
      placeholder="输入手机号"
      :onChange="handlePhoneChange"
    />
    <my-input
      :leftImg="pwdIcon"
      placeholder="输入密码"
      type="password"
      :onChange="handlePwdChange"
    />
    <my-button title="登录" clsName="fill" :onClick="handleLogin" />
    <router-link to="/register">
      <my-button title="注册" clsName="stroke" />      
    </router-link><br>
    <router-link to="/forgetPWD">
      <p class="to-forgetPWD">&nbsp;&nbsp;&nbsp;&nbsp;忘记密码</p>
    </router-link>
    <bottom />
  </div>
</template>

<script>
  import myInput from '../components/input';
  import phoneIcon from '../assets/phone-icon.png';
  import pwdIcon from '../assets/pwd-icon.png';
  import myButton from '../components/button';
  import bottom from '../components/bottom';
  import { requestLogin } from '@/api';
  import { mapActions } from 'vuex';
  // import { saveLogined } from '@/util/storage';
  export default {
    components: { myInput, myButton, bottom },
    data () {
      return {
        phoneNum: '',
        pwd: ''
      }
    },
    created () {
      this.phoneIcon = phoneIcon;
      this.pwdIcon = pwdIcon;
    },
    mounted () {
      document.title = '登录';
    },
    methods: {
      ...mapActions(['changeToast']),
      handlePhoneChange (e) {
        this.phoneNum = e.target.value;
      },
      handlePwdChange (e) {
        this.pwd = e.target.value;
      },
      handleLogin () {
        if (!this.pwd.length || !this.phoneNum.length) {
          this.changeToast('请输入账号或密码');
        }
        requestLogin(this.phoneNum, this.pwd)
        .then(r => {
          const res = r.data;
          if (res.code == 0) {
            this.$router.push('/');
          } else {
            this.changeToast(res.msg);
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  @import '../styles/global.scss';
  .login-page {
    text-align: center;
    background: #fff;
    height: 100%;
  }
  .to-forgetPWD {
      display: inline-block;
      color: $light_text_color;
      font-size: px2rem($size_middle);
      margin-top: px2rem(12);
  &:after {
       content: '';
       display: inline-block;
       width: px2rem(15);
       height: px2rem(15);
       margin-left: px2rem(2);
       background: url('../assets/r-arrow.png') no-repeat;
       background-size: cover;
       position: relative;
       top: px2rem(3);
   }
  }
</style>
