<template>
  <div class="qrcode-page">
    <img class="avatar-img" :src="avatar || defaultAvatar" />
    <p>{{ nickname }}</p>
    <div class="qrcode-wrapper">
      <img class="qrcode-img" src="http://zjshop.tcpan.com/app/qrcodec/member" alt="二维码" /> 
    </div>
    <p class="tip">长按图片，识别二维码</p>
    <bottom />
  </div>
</template>

<script>
import bottom from '../components/bottom';
import { requestUserInfo } from '@/api';
import defaultAvatar from '@/assets/default-avatar.png';
export default {
  components: { bottom },
  data () {
    return {
      avatar: null,
      nickname: '-',
      defaultAvatar
    }
  },
  mounted () {
    document.title = '我的二维码';
    this._requestUserInfo();
  },
  methods: {
    _requestUserInfo () {
      requestUserInfo()
      .then(r => {
        const res = r.data;
        console.log(res);          
        if (res.code == 0) {
          this.nickname = res.data.nickname;
          this.avatar = res.data.headimgurl;
        } else {
          this.changeToast(res.msg);
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../styles/mixin.scss';
  .qrcode-page {
    background: #fff;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .avatar-img {
    width: px2rem(50);
    height: px2rem(50);
    padding: px2rem(4);
    border-radius: 50%;
    border: 1px solid $primary_color;
    margin-top: px2rem(40);
  }
  .qrcode-wrapper {
    width: px2rem(249);
    height: px2rem(249);
    margin-top: px2rem(20);
    border: 1px solid $primary_color;
    position: relative;
    &:before, &:after {
      content: '';
      position: absolute;
      z-index: -1;
      bottom: -15px;
      left: 10px;
      width: 50%;
      height: 20%;
      box-shadow: 0 15px 10px red;
      transform: rotate(-3deg); 
    }
    &:after {
      right:10px;
      left: auto;
      -webkit-transform:rotate(3deg);
      -moz-transform:rotate(3deg);
      -o-transform:rotate(3deg);
      transform:rotate(3deg);
    }
  }
  .qrcode-img {
    width: 100%;
    height: 100%;
  }
  .tip {
    margin-top: px2rem(30);
    font-size: px2rem($size_middle);
    color: #858585;
  }
</style>
