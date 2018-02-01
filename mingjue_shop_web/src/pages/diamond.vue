<template>
  <div class="diamond-page">
    <div class="user-info">
      <img class="avatar" src="../assets/default-avatar.png" />
      <p class="name">{{ toUser.name || toUser.nickname || '-' }}</p>
      <p class="nickname">昵称：{{ toUser.nickname || '-'}}</p>
    </div>
    <div class="input-wrapper">
      <input placeholder="输入转让钻石数" type="number" v-model="diamondVal" />
      <my-button type="number" title="确认" :onClick="handleConfirm" />
    </div>
  </div>
</template>

<script>
  import myButton from '../components/button';
  import { requestSendDiamond, requestGetUserByPhone } from '@/api';
  import { mapActions } from 'vuex';
  export default {
    components: { myButton },
    data () {
      return {
        toUser: {},
        diamondVal: ''
      }
    },
    mounted () {
      document.title = '钻石转让';
      const phone = this.$route.params.phone;
      requestGetUserByPhone(phone)
        .then(r => {
          const res = r.data;
          if (res.code == 0) {
            this.toUser = res.data;
          } else {
            this.changeToast(res.msg);
          }
        })
    },
    methods: {
      ...mapActions(['changeToast']),
      handleConfirm () {
        if (this.diamondVal.length === 0) return;
        requestSendDiamond(this.toUser.mid, this.diamondVal)
          .then(r => {
            const res = r.data;
            console.log(res);
            this.changeToast(res.msg);
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/mixin.scss';
  .user-info {
    display: flex;
    flex-direction: column;
    padding-top: px2rem(47);
    align-items: center;
  }
  .avatar {
    width: px2rem(55);
    height: px2rem(55);
    border: px2rem(4) solid #fff;
    border-radius: 50%;
  }
  .name {
    font-size: px2rem($size_middle);
    font-weight: bold;
    margin-top: px2rem(3);
    margin-bottom: px2rem(2);
  }
  .nickname {
    color: #808080;
    font-size: px2rem($size_small);
  }
  .input-wrapper {
    margin-top: px2rem(50);
    text-align: center;
  }
  .input-wrapper input {
    width: 100%;
    height: px2rem(60);
    font-size: px2rem(21);
    text-align: center;
  }
  .input-wrapper input::placeholder {
    color: #A8A8A8;
  }
</style>
