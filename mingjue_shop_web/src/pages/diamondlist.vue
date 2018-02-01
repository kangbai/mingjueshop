<template>
  <div class="diamond-list-page">
    <div class="input-wrapper">
      <input type="number" placeholder="输入转让者手机号" v-model="phone"/>
      <button class="search" @click="handleSearch"></button>
    </div>
    <div class="people-list">
      <cell :onClick="handlePush" :hideBorder="true" v-if="userInfo.nickname" :title="userInfo.nickname" />
    </div>
  </div>
</template>

<script>
  import cell from '../components/cell';
  import { requestGetUserByPhone } from '@/api';
  import { mapActions } from 'vuex';
  export default {
    components: { cell } ,
    data () {
      return {
        phone: '',
        userInfo: {}
      }
    },
    mounted () {
      document.title = '钻石转让';
    },
    methods: {
      ...mapActions(['changeToast']),
      handleSearch () {
        console.log(this.phone);
        const phone = this.phone;
        if (phone.length === 0) {
          this.changeToast('请输入手机号')
          return;
        }
        requestGetUserByPhone(phone)
          .then(r => {
            const res = r.data;
            console.log(res);
            if (res.code == 0) {
              this.userInfo = res.data;
            } else {
              this.changeToast(res.msg);
            }
          })
      },
      handlePush () {
        console.log('push');
        this.$router.push(`/diamond/${this.phone}`);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/mixin.scss';
  .input-wrapper {
    background: #fff;
    border-bottom: 1px solid $border_color;
    padding: px2rem(10);
    position: relative;
  }
  .input-wrapper input {
    text-align: center;
    width: 100%;
    height: px2rem(40);
    border-radius: px2rem(5);
    padding: 0 px2rem(40);
    background: #F0F0F0;
  }
  .input-wrapper .search {
    position: absolute;
    width: px2rem(40);
    height: px2rem(40);
    background: url('../assets/search-icon.png') no-repeat center;
    background-size: px2rem(20) px2rem(20);
    top: px2rem(10);
    right: px2rem(10);
  }
  .people-list {
    background: #fff;
  }
</style>
