<template>
  <div class="shop-coin-page">
    <div class="carousel-wrapper">
      <mt-swipe :show-indicators="ad.length > 1">
          <mt-swipe-item
            v-for="a in ad"
            :key="a.ad_id"
            class="carousel-item">
            <a :href="a.url" class="carousel-link">
              <img class="carousel-img" :src="a.pic" :alt="a.title" />
            </a>
          </mt-swipe-item>
        </mt-swipe>
    </div>
    <div class="product-list">
      <product-item 
        v-for="good in goodsList" 
        :key="good.id" 
        :good="good"
        :type="type"
        :onClick="handleToDetail"
      />
      <p v-if="curPage <= totalPage && (totalPage !== 1)" class="page-infinite-loading" @click="handleLoadMore">
          {{ loading ? '正在加载更多...' : '点击加载更多...'}}
      </p>
    </div>
  </div>
</template>

<script>
  import productItem from '../components/productitem';
  import { requestGoodsList, requestAd } from '@/api';
  import { mapActions } from 'vuex';
  export default {
    components: { productItem },
    data () {
      return { 
        goodsList: [],
        ad: [],
        curPage: 1,
        totalPage: 1,
        loading: false,
        type: 2
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
      document.title = '积分商城';
      requestAd(4)
        .then(r => {
          const res = r.data;
          console.log(res);
          if (res.code == 0) {
            this.ad = res.data;
          }
        })
      this._requestGoodsList();
    },
    methods: {
       ...mapActions(['changeToast']),
      _requestGoodsList () {
        requestGoodsList(this.type, this.curPage)
          .then(r => {
            const res = r.data;
            this.loading = false;
            console.log('home: ', res);
            if (res.code == 0) {
              this.goodsList = this.goodsList.concat(res.data.list);
              this.totalPage = res.data.page_count;
              this.curPage = Number(res.data.page) + 1;
            }
          })
          .catch(err => {
            this.loading = false;
            this.changeToast('网络有问题～');
          })
      },
      handleToDetail (productId) {
        console.log(productId);
        this.$router.push(`/product/${productId}`);
      },
      handleLoadMore () {
        if (this.loading) return;
        this.loading = true;
        this._requestGoodsList();
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/mixin.scss';
  .shop-coin-page {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }
  .product-list {
    overflow-x: hidden;
    padding: px2rem(10);
  }
  .carousel-wrapper {
    // width: 100%;
    height: px2rem(176);
    background: #fff;
  }
  .carousel-item {
    padding: px2rem(10) px2rem(10) px2rem(26);
  }
  .carousel-link {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .carousel-img {
    border-radius: px2rem(6);
    width: 100%;
    height: 100%;
  }
</style>

<style lang="scss">
  @import '../styles/mixin.scss';
  .mint-swipe-indicators {
    bottom: px2rem(6);
  }
  .mint-swipe-indicator {
    background: #fff;
    margin: 0 px2rem(4);    
    opacity: 1;
    width: px2rem(3);
    height: px2rem(3);
    background: #D9D9D9;
  }
  .mint-swipe-indicator.is-active {
    background: $primary_color;
    width: px2rem(5);
    height: px2rem(5);
    // box-shadow: 0 px2rem(2) px2rem(2) #00CBB1;
  }
</style>