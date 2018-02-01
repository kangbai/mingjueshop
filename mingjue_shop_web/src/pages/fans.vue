<template>
  <div class="fans-page"  v-if="fansList.length > 0">
    <div class="recording-wrapper">
      <div class="record-item">
        <p><img src="../assets/group-num.png" />团队人数</p>
        <p>{{ team_users }}</p>
      </div>
      <div class="record-item">
        <p><img src="../assets/group-achievement.png" />团队业绩</p>
        <p>{{ team_yeji }}</p>
      </div>
      <div class="record-item">
        <p><img src="../assets/fans-num.png" />粉丝人数</p>
        <p>{{ fans }}</p>
      </div>
      <div class="record-item">
        <p><img src="../assets/income.png" />本周收益</p>
        <p>{{ yongjin_me }}</p>
      </div>
    </div>
    <div class="fans-wrapper">
      <fans-item v-for="(fans, index) in fansList" :key="index" :fans="fans" />
       <p v-if="(curPage <= totalPage) && (totalPage !== 1)" class="page-infinite-loading" @click="handleLoadMore">
          {{ loading ? '正在加载更多...' : '点击加载更多...'}}
      </p>
    </div>
  </div>
  <none v-else title="你没有粉丝哦~" :icon="noFans" />
</template>

<script>
  import fansItem from '../components/fansitem';
  import none from '@/components/none';
  import { requestFans } from '@/api';
  import { mapActions } from 'vuex'
  import noFans from '@/assets/no-fans.png';
  export default {
    components: { fansItem, none },
    data () {
      return {
        fansList: [],
        curPage: 1,
        totalPage: 1,
        loading: false,
        team_users: '-',
        team_yeji: '-',
        yongjin_me: '-',
        fans: '-',
        noFans: noFans
      }
    },
    mounted () {
      document.title = '我的粉丝';
      this._requestFans();
    },
    methods: {
      ...mapActions(['changeToast']),
      _requestFans () {
        requestFans(this.curPage)
        .then(r => {
          const res = r.data;
          this.loading = false;
          console.log(res);
          if (res.code == 0) {
            const { list, page, page_count, team_users, team_yeji, yongjin_me,fans } = res.data;
            this.fansList = this.fansList.concat(list);
            this.curPage = Number(page) + 1;
            this.totalPage = Number(page_count);
            this.team_users = team_users;
            this.team_yeji = team_yeji;
            this.yongjin_me = yongjin_me;
            this.fans = fans;
          }
        })
        .catch(err => {
          this.loading = false;
          this.changeToast('网络有问题～');
        })
      },
      handleLoadMore () {
        if (this.loading) return;
        this.loading = true;
        this._requestFans();
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/mixin.scss';
  .fans-page {
    height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .recording-wrapper {
    background: #fff;
    border-bottom: 1px solid #CECECE;
    height: px2rem(83);
    display: flex;
    align-items: center;
  }
  .record-item {
    flex: 1;
    text-align: center;
    p:first-child {
      color: #A8A8A8;
      font-size: px2rem(13);
      img {
        width: px2rem(10);
        height: px2rem(12);
        margin-right: px2rem(2);
      }
    }
    p:last-child {
      color: $dark_text_color;
      font-size: px2rem(17);
    }
  }
</style>
