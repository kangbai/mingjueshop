<template>
  <div class="tabbar">
    <router-link class="tabbar-item" :to="item.toPath" v-for="(item, index) in items" :key="item.tile">
      <img :src="selectedIndex === index ? item.selIcon : item.icon" />
      <p :class="{ 'selected': selectedIndex === index }">{{ item.title }}</p>
    </router-link>
  </div>
</template>

<script>
  import coin from '../assets/tabbar-coin.png';
  import coinSel from '../assets/tabbar-coin-sel.png'
  import mingjue from '../assets/tabbar-mingjue.png';
  import mingjueSel from '../assets/tabbar-mingjue-sel.png'
  import profile from '../assets/tabbar-profile.png';
  import profileSel from '../assets/tabbar-profile-sel.png'
  import activity from '../assets/tabbar-activity.png';
  import activitySel from '../assets/tabbar-activity-sel.png'
  export default {
    data () {
      return {
        items: [
          { title: '名爵商城', icon: mingjue, selIcon: mingjueSel, toPath: '/mingjue' },          
          { title: '积分商城', icon: coin, selIcon: coinSel, toPath: '/coin' },
          { title: '积分活动', icon: activity, selIcon: activitySel, toPath: '/charge' },
          { title: '个人中心', icon: profile, selIcon: profileSel, toPath: '/profile' }
        ]
      }
    },
    computed: {
      selectedIndex () {
        var selectedIndex = 0;
        this.items.forEach((item, index) => {
          if (item.toPath == this.$route.path) {
            selectedIndex = index;
          }
        })
        return selectedIndex;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/mixin.scss';
  .tabbar {
    // height: px2rem(49);
    height: 49px;
    width: 100%;
    background: #fff;
    border-top: 1px solid #CCCCCC;
    display: flex;
  }
  .tabbar-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .tabbar-item img {
    width: 30px;// px2rem(30);
    height: 30px;//px2rem(30);
  }
  .tabbar-item p {
    color: #A4A4A4;
    font-size: 10px;//px2rem(11);
  }
  .tabbar-item p.selected {
    color: $primary_color;
  }
</style>
