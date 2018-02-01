<template>
  <div id="app">
    <router-view></router-view>
    <div v-if="showToast" class="toast" >
      <p>{{ toastTitle }}</p>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  // import { saveDeviceInfo } from '@/util/storage';

  export default {
    name: 'app',
    data () {
      return {
        showToast: false
      }
    },
    mounted () {

      // 设置html的font-size
      document.addEventListener('DOMContentLoaded', function () {
        const ratio = 375 / 10
        const rem = window.innerWidth / ratio
        const dpr = window.devicePixelRatio
        const html = document.querySelector('html')
        html.classList.add(`env__dpr-${dpr}`)
        html.style.fontSize = window.innerWidth / 10 + 'px'
      });


      // 
      // const from = document.getElementById('from-input').value;
      // const platform = document.getElementById('platform-input').value;
      // saveDeviceInfo({
      //   from,
      //   platform
      // });
    },
    computed: {
      ...mapState(['toastTitle'])
      // toastTitle () {
      //   const toastTitle = this.$store.state.toastTitle;
      //   console.log('--------', toastTitle);
      //   this.showToast = true;
      //   setTimeout(() => {
      //     this.showToast = false;
      //   }, 1000)
      //   return toastTitle;
      // }
    },
    watch: {
      toastTitle: function (val, oldVal) {
        if (val.length) {
          this.showToast = true;
          setTimeout(() => {
            this.showToast = false;
            this.changeToast('');
          }, 1000)
        }
        return val;
      }
    },
    methods: {
      ...mapActions(['changeToast'])
    }
  }
</script>

<style lang="scss">
  @import "./styles/global.scss";
  #app {
    background: #f5f5f5;  
    height: 100vh;
  }
  .toast {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(49, 49, 49, 0.8);
      max-width: px2rem(210);
      color: #fff;
      padding: px2rem(8) px2rem(12);
      border-radius: px2rem(4);
      z-index: 999;
      text-align: center;
    }
    .page-infinite-loading {
      text-align: center;
      height: 50px;
      line-height: 50px;   
    }
</style>
