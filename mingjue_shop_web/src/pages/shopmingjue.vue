<template>
  <div class="shop-mingjue-page">
    <div class="carousel-wrapper">
      <mt-swipe :show-indicators="adList.length > 1">
        <mt-swipe-item
          v-for="ad in adList"
          :key="ad.ad_id"
          class="carousel-item">
          <a :href="ad.url" class="carousel-link">
            <img class="carousel-img" :src="ad.pic" :alt="ad.title" />
          </a>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="product-list">
      <product-item 
        v-for="good in goodsList" 
        :key="good.id" 
        :good="good"
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
        adList: [],
        curPage: 1,
        totalPage: 1,
        loading: false
      }
    },
    mounted () {
      document.title = '名爵商城';
      requestAd(3)
        .then(r => {
          const res = r.data;
          console.log('ad: ', res);
          if (res.code == 0) {
            this.adList = res.data;
          }
        })
      this._requestGoodsList();
    },
    methods: {
      ...mapActions(['changeToast']),
      _requestGoodsList () {
        requestGoodsList(1, this.curPage)
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
      handleClickAd (ad) {
        window.location.href = ad.url;
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
  .shop-mingjue-page {
    width: 100%;
    height: 100%;
  }
  .product-list {
    padding: px2rem(10);
  }
  .carousel-img {
    width: 100%;
    height: 100%;
  }
  .carousel-wrapper {
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

