<template>
  <div class="bill-page">
    <!-- <mt-loadmore
      ref="loadmore"
      :top-method="handleFetchData"
      :bottom-method="handleLoadMore"
      v-if="billList.length > 0"
    > -->
      <div 
        class="bill-list"
        v-if="billList.length > 0"
      >
        <billItem 
          v-for="bill in billList" 
          :key="bill.id"
          :bill="bill"
        />
        <p  v-if="curPage <= totalPage && (totalPage !== 1)" class="page-infinite-loading" @click="handleLoadMore">
          {{ loading ? '正在加载更多...' : '点击加载更多...'}}
        </p>
      </div>
    <!-- </mt-loadmore> -->
    <none v-else title="没有账单记录！" :icon="norecord" @click="handleLoadMore" />    
  </div>
</template>

<script>
  import billItem from '../components/billitem';
  import none from '@/components/none';
  import { requestBill } from '@/api';
  import { mapActions } from 'vuex';
  import norecord from '@/assets/record.png';
  export default {
    components: { billItem, none },
    data () {
      return {
        billList: [],
        curPage: 1,
        totalPage: 1,
        norecord,
        loading: false
      }
    },
    mounted () {
      document.title = '账单';
      this._requestBill();      
    },
    methods: {
      ...mapActions(['changeToast']),
      _requestBill () {
        requestBill(this.curPage)
        .then(r => {
          const res = r.data;
          this.$refs.loadmore && this.$refs.loadmore.onTopLoaded();
          this.$refs.loadmore && this.$refs.loadmore.onBottomLoaded();
          console.log(res);
          this.loading = false;
          if (res.code == 0) {
            this.billList = this.billList.concat(res.data.list);
            this.curPage = Number(res.data.page) + 1;
            this.totalPage = Number(res.data.page_count);
          } else {
            this.changeToast(res.msg);
          }
        })
        .catch(err => {
          this.loading = false;
          this.changeToast('网络有问题～');
        })
      },
      handleFetchData () {
        console.log('----');
        this.curPage = 1;
        this.billList = [];
        this._requestBill();
      },
      handleLoadMore () {
        console.log('-----');
        if (this.loading) return;
        this.loading = true;
        this._requestBill();
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/mixin.scss';
  .bill-page {
    // height: 100%;
  }
  .bill-list {
    padding: 0 px2rem(15);
    background: #fff;    
  }
  .page-infinite-loading {
    text-align: center;
    height: 50px;
    line-height: 50px;    
  }
</style>
