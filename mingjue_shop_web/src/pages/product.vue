<template>
  <div class="product-page">
    <div class="product-content">
      <div class="carousel-wrapper">
        <mt-swipe>
          <mt-swipe-item
            v-for="(ad, index) in productInfo.ad"
            :key="index"
          >
            <img class="carousel-img" :src="ad" />
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="product-info">
        <p class="title">{{ productInfo.name }}</p>
        <p class="money-color sell-price">{{ Number(productInfo.type) === 1 ? '¥' + productInfo.price : productInfo.zs_price + '金币' }}</p>
        <p class="market-price">市场价：{{ `¥${productInfo.price_sc || 0}` }}</p>
        <!-- <p class="market-price">市场价：{{ Number(productInfo.type) === 1 ? `¥${productInfo.price_sc || 0}` : `${productInfo.zs_price || 0}金币` }}</p> -->
      </div>
      <div class="product-count">
        <step :onInputChange="handleProductNum" />
        <span class="diamond" v-if="Number(productInfo.type) === 1">赠送{{ productInfo.zs_price || 0 }}钻石</span>
      </div>
      <div class="product-description">
        <h3>商品介绍</h3>
        <div class="product-ms" v-html="productInfo.ms"></div>
      </div>
    </div>
    <div class="bar">
      <div class="share-redpocket" @click="handleBack">
        <!-- <p class="money-color">18.00</p>
        <p>分享红包</p> -->
        返回
      </div>
      <a href="javascript:;" class="btn-buy" @click="handleBuy">立即购买</a>
    </div>
  </div>
</template>

<script>
  import step from '../components/step';
  import { requestGoodsDetail } from '@/api';
  import { mapActions } from 'vuex';

  export default {
    components: { step },
    data () {
      const productId = this.$route.params.productId;      
      return {
        productInfo: {},
        count: 1,
        productId: productId
      }
    },
    mounted () {
      this._requestGoodsDetail();
    }, 
    methods: {
      ...mapActions(['changeToast']),
      _requestGoodsDetail () {
        requestGoodsDetail(this.productId)
        .then(r => {
          const res = r.data;
          console.log(res);
          if (res.code == 0) {
            this.productInfo = res.data;
            // WARNING: TEST
            // this.productInfo.ad = [
            //   'https://lh3.googleusercontent.com/l6JAkhvfxbP61_FWN92j4ulDMXJNH3HT1DR6xrE7MtwW-2AxpZl_WLnBzTpWhCuYkbHihgBQ=w640-h400-e365',
            //   'https://ichef-1.bbci.co.uk/news/1024/cpsprodpb/693C/production/_95804962_p0517py6.jpg',
            //   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvuAhICWfPpaFFCi8q5UDZRjdnNRPpuHddj7EYxKBQN_YfVY0e'
            // ];
          } else {
            changeToast(res.msg);
          }
        })
        .catch(err => {
          changeToast('网络有问题～');
        })
      },
      handleBuy () {
        this.$router.push(`/settlement?pid=${this.productId}&count=${this.count}`);
      },
      handleProductNum (num) {
        this.count = num;
      },
      handleBack () {
        this.$router.back();
        // this.$router.push('/buy');
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/mixin.scss';
  .product-page {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .product-content {
    flex: 1;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    overflow-x: hidden;
  }
  .product-info {
    text-align: center;
  }
  .product-info .title {
    font-size: px2rem(15);
    margin: px2rem(6) 0;
  }
  .product-info .sell-price {
    font-size: px2rem(18);
  }
  .product-info .market-price {
    font-size: px2rem($size_small);
    color: #808080;
    margin-bottom: px2rem(10);
    text-decoration: line-through;
  }
  .product-count {
    background: #fff;
    padding: px2rem(16) px2rem(15);
    display: flex;
    justify-content: space-between;
  }
  .product-count .diamond {
    background: #FFAE00;
    padding: 0 px2rem(20);
    border-radius: px2rem(15);
    line-height: px2rem(30);
  }
  .product-description {
    padding-top: px2rem(15);
    color: #666;
    h3 {
      font-size: px2rem($size_middle);
      padding-left: px2rem(15);
      padding-bottom: px2rem(15);
    }
  }
  .bar {
    display: flex;
    
  }
  .bar .share-redpocket {
    width: px2rem(104);
    background: #2E3742;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .money-color {
    color: #FFAE00;
  }
  .bar .btn-buy {
    flex: 1;
    background: $primary_color;
    text-align: center;
    height: px2rem(49);
    line-height: px2rem(49);  
    font-size: px2rem($size_default);
    color: #fff;
  }
  .carousel-wrapper {
    width: 100%;
    height: px2rem(350);
  }
  .carousel-img {
    width: 100%;
    height: 100%;
  }
</style>

<style lang="scss">
  @import '../styles/mixin.scss';
  .mint-swipe-indicator {
    background: #fff;
    margin: 0 px2rem(4);    
    opacity: 1;
  }
  .mint-swipe-indicator.is-active {
    background: $primary_color;
  }
  img {
    max-width: 100%;
  }
  .product-ms p {
    font-size: 0;
  }
</style>

