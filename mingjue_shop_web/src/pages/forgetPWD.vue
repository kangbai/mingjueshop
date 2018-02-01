<template>
  <div class="login-page">
    <my-input :leftImg="phoneIcon" placeholder="输入手机号" :onChange="(e) => { handleInputChange(e.target.value, 'phone') }" />
    <my-input :leftImg="imgVerify" placeholder="验证码" :onChange="(e) => { handleInputChange(e.target.value, 'imgCode') }">
      <img @click="handleChangeImgVerify" slot="right-sec" class="img-verify" :src="picCaptcha" alt="验证码" />
    </my-input>
    <my-input :leftImg="phoneVerify" placeholder="手机验证码" :onChange="(e) => { handleInputChange(e.target.value, 'msgCode') }">
      <button slot="right-sec" class="btn-send" :disabled="leftSec !== -1"  @click="handleSendMsgCode">{{ leftSec < 0 ? '发送验证码' : leftSec + 's重新发送' }}</button>
    </my-input>
    <my-input :leftImg="pwdIcon" placeholder="输入密码" type="password" :onChange="(e) => { handleInputChange(e.target.value, 'pwd') }" />
    <my-button title="确认" clsName="fill" :onClick="handleForgetPWD" />
    <bottom :isRegister="false" />
  </div>
</template>

<script>
  import myInput from '../components/input';
  import phoneIcon from '../assets/phone-icon.png';
  import pwdIcon from '../assets/pwd-icon.png';
  import imgVerify from '../assets/img-verify-icon.png'
  import phoneVerify from '../assets/phone-verify-icon.png'
  import myButton from '../components/button';
  import defaultCode from '../assets/default-code.png';
  import bottom from '../components/bottom';
  import { requestMsgCode, requestImgCode, requestRegister , requestForgetPWDUrl} from '@/api';
  import { mapActions } from 'vuex';
  export default {
    components: { myInput, myButton, bottom },
    data () {
      return {
        leftSec: -1,
        phone: '',
        pwd: '',
        imgCode: '',
        msgCode: '',
        picCaptcha: '',
        sessionId: ''
      }
    },
    created () {
      this.phoneIcon = phoneIcon;
      this.pwdIcon = pwdIcon;
      this.imgVerify = imgVerify;
      this.phoneVerify = phoneVerify;
      this.defaultCode = defaultCode;
    },
    mounted () {
      document.title = '忘记密码';
      this._requestImgCode();
    },
    methods: {
            ...mapActions(['changeToast']),
    _requestImgCode () {
      requestImgCode()
              .then(r => {
        const res = r.data;
      console.log(res);
      if (res.code == 0) {
        this.picCaptcha = res.data.pic_captcha;
        this.sessionId = res.data.session_id;
      } else {
        this.changeToast(res.msg);
      }
    })
    },
    handleInputChange (val, type) {
      this[type] = val;
    },
    handleSendMsgCode () {
      if (this.phone.length === 0) {
        this.changeToast('请输入手机号');
        return;
      }
      if (this.imgCode.length === 0) {
        this.changeToast('请输入图片验证码');
        return;
      }
      requestMsgCode(this.phone, this.sessionId, this.imgCode)
              .then(r => {
        var res = r.data;
      console.log(res);
      if (res.code == 0) {
        this.leftSec = 60;
        var timer = setInterval(() => {
          this.leftSec -= 1;
        if (this.leftSec < 0) {
          clearInterval(timer);
        }
      }, 1000)
      } else {
        this.changeToast(res.msg);
      }
    })
    },
    handleForgetPWD () {
      requestForgetPWDUrl(this.phone, this.msgCode, this.pwd)
              .then(r => {
        const res = r.data;
      console.log(res);
      if (res.code == 0) {
        //this.$router.push('/login');
        this.changeToast('密码修改成功');
      } else {
        this.changeToast(res.msg);
      }
    })
    .catch(err => {
        console.log(err);
      this.changeToast('网络有问题～');
    })
    },
    handleChangeImgVerify () {
      this._requestImgCode();
    }
  }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/mixin.scss';
  .login-page {
    text-align: center;
    background: #fff;
    height: 100%;
  }
  .img-verify {
    width: px2rem(80);
    height: px2rem(32);
  }
  .btn-send {
    color: $primary_color;
    background: transparent;
    font-size: px2rem($size_middle);
    height: 100%;
  }
  .btn-send:disabled {
    color: #666;
  }
</style>
