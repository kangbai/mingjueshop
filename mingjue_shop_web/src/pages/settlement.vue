<template>
  <div class="settlement-page">
    <div class="settlement-content">
      <div class="product-info">
        <img :src="productInfo.thumbnail" />
        <div class="content">
          <p>{{ productInfo.name }}</p>
          <div class="count">
            <p class="price">价格：{{ (Number(productInfo.type) === 1) ? (`¥${Number(productInfo.price) || 0}`) : (`${productInfo.zs_price || 0}金币`)  }}</p>
            <step :from="count" :onInputChange="handleCountChange" />
          </div>
        </div>
      </div>
      <div class="user-info">
        <div class="common phone">
          <span>收货人电话</span>
          <input v-model="phone" type="number" placeholder="添加收货人电话号码" />
        </div>
        <div class="common name">
          <span>收货人姓名</span>
          <input v-model="name" type="text" placeholder="添加收货人名字" /> 
        </div>
        <div class="common address" @click="handlePresentPicker">
          <span>选择省</span>
          <p>{{ area }}</p>
        </div>
        <!-- <div class="common address" @click="handlePresentPicker">
          <input v-model="area" type="text" placeholder="请填写省市区" />
        </div> -->
        <div class="common detail-address">
          <input v-model="address" type="text" placeholder="请填写详细地址" />
        </div>
        <div class="message">
          <textarea v-bind="message" type="text" placeholder="给卖家留言" />
        </div>
      </div>
      <!-- <div class="pay-info">
        <div 
          class="common pay-item" 
          v-for="(pay, index) in payList" 
          :key="index"
          @click="handleSelectPay(index)"
        >
          <div class="left">
            <img :src="pay.icon" />
            <span>{{ pay.title }}</span>
          </div> 
          <i :class="{ 'selected': paySelect === index }"></i>
        </div>
      </div> -->
    </div>
    <div class="pay-bar">
      <p>总计：<span>{{ totalPrice }}</span></p>
      <button class="btn-confirm" @click="handlePay">确认订单</button>
    </div>
    <div v-if="showPicker" class="picker-wrapper">
      <div class="picker-bar">
        <button @click="handleCancelPicker">取消</button>
        <button @click="handleConfirmPicker">完成</button>
      </div>
      <!-- <smooth-picker class="picker" :data="pickerData" /> -->
      <mt-picker 
        :slots="slots" 
        value-key="name" 
        @change="handlePickerChange"
      ></mt-picker>
    </div>
    
  </div>
</template>

<script>
  import step from '../components/step';
  import alipay from '../assets/alipay.png';
  import wechatPay from '../assets/wechatpay.png';
  import diamondPay from '../assets/diamondpay.png';
  import coinPay from '../assets/coinpay.png';
  import { requestGoodsPayDetail, requestGoodsPay } from '@/api';
  import { mapActions } from 'vuex';
  import { province, city, area } from '@/util/area'

  export default {
    components: { step },
    data () {
      const { pid, count } = this.$route.query;    
      const defaultCity = this._filterCity(province[0].code);
      const defaultArea = this._filterArea(defaultCity[0].code);
      return {
        // paySelect: 0
        showPicker: false,
        count: Number(count),
        pid: pid,
        productInfo: {},
        phone: '',
        name: '',
        area: '',
        address: '',
        message: '',
        slots: [
          {
            flex: 1,
            values: province,
            className: 'slot1',
            textAlign: 'right',
            defaultIndx: 0,
            value: province[0]
          }, {
            flex: 1,
            values: defaultCity,
            className: 'slot2',
            textAlign: 'center',
            value: defaultCity[0],
            defaultIndex: 0
          }, {
            flex: 1,
            values: defaultArea,
            className: 'slot3',
            textAlign: 'left',
            value: defaultArea[0],
            defaultIndex: 0
          }
        ],
        selectedAddress: {
          province: { code: '', name: '' },
          city: { code: '', name: '' },
          area: { code: '', name: '' }
        }
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
      },
      totalPrice () {
        const type = Number(this.productInfo.type);
        if (type === 1) {
          const money = Number(this.productInfo.price) * this.count || 0;
          return `¥${money}`;
        } else {
          const coin = Number(this.productInfo.zs_price) * this.count || 0;
          return `${coin}金币`;
        }
      }
    },
    created () {
      //  this.payList = [
      //   { title: '微信支付', icon: wechatPay },
      //   { title: '支付宝支付', icon: alipay },
      //   { title: '钻石支付', icon: diamondPay },
      //   { title: '金币支付', icon: coinPay }
      // ];
    },
    mounted () {
      document.title = '结算';
      requestGoodsPayDetail(this.pid)
        .then(r => {
          const res = r.data;
          console.log(res);
          if (res.code == 0) {
            const { name, price, thumbnail, type, zs_price } = res.data;
            this.productInfo = {
              name,
              price,
              thumbnail,
              price,
              zs_price,
              type 
            }
          }
        })
    },
    methods: {
      ...mapActions(['changeToast']),
      // handleSelectPay (index) {
      //   this.paySelect = index;
      // }
      handlePay () {
        // 1: 微信 2: 钻石 3: 支付宝
        let type = this.productInfo.type;
        if (this.from == 'app' && type == 1) {
          type = 3;
        }
        const goods = {
          goods_id: this.pid,
          name: this.name,
          area: this.area,
          address: this.address,
          phone: this.phone,
          type: type,
          numb: this.count,
          msg: this.message
        };
        console.log(goods);
        requestGoodsPay(goods)
          .then(r => {
            const res = r.data;
            console.log(res);
            if (res.code == 0) {
              if (type == 1) {
                window.location.href = res.data.pay_url;
              } else if (type == 2) {
                this.changeToast(res.msg);
                this.$router.push('/order');
              } else {
                console.log('----支付宝-----');
                window.AppExec && window.AppExec.callHandler('alipay', res.data, (cbData) => {
                  if (cbData == 1) {
                    this.changeToast('支付成功');
                    this.$router.push('/order');
                  } else {
                    this.changeToast('支付失败');
                  }
                });
              }
            } else {
              this.changeToast(res.msg);
            }
          })
          .catch(err => {
            this.changeToast('网络有问题～');
          })
      },
      handlePresentPicker () {
        this.showPicker = true;
      },
      handlePickerChange (picker, values) {
        const { province, city, area } = this.selectedAddress;
        const curProvince = values[0];
        const curCity = values[1];
        const curArea = values[2];
        this.selectedAddress = { province: curProvince, city: curCity, area: curArea };
        if (curProvince && (curProvince.code !== province.code)) {
          this._onProvinceChange(curProvince, picker);
        } 
        if (curCity && (curCity.code !== city.code)) {
          this._onCityChange(curCity, picker);
        } 
        if (curArea && (curArea.code !== area.code)) {
          this._onAreaChange(curArea);
        } 
      },
      _onProvinceChange (item, picker) {
         if (item && item.code) {
              const city = this._filterCity(item.code);
              const area = this._filterArea(city[0].code);
              this.$set(this.slots[1], 'values', city);
              this.$set(this.slots[2], 'values', area);
          } else {
              this.$set(this.slots[1], 'values', []);
              this.$set(this.slots[2], 'values', []);
          }
      },
      _onCityChange (item, picker) {
          if (item && item.code) {
            const area = this._filterArea(item.code)
            this.$set(this.slots[2], 'values', area);
          } else {
            this.$set(this.slots[2], 'values', []);
          }
      },
      _onAreaChange (item) {

      },
      _filterCity(code) {
          const cityData = city.filter((c, index) => {
              return c.code.substring(0, 2).padEnd(6, '0000') == code
          });
          return cityData;
      },
      _filterArea(code) {
        const areaData = area.filter((a, index) => {
            return a.code.substring(0, 4).padEnd(6, '00') == code
        });
        return areaData;
      },
       _parseResult(value) {
          value = value || this.value;
          let cId = value ? value.substring(0, 4).padEnd(6, '00') : ""
          let pId = value ? cId.substring(0, 2).padEnd(6, '0000') : ""
          this.selected = {
              province: {
                  code: pId
              },
              city: {
                  code: cId
              },
              area: {
                  code: value
              }
          }
      },
      handleCountChange (val) {
        this.count = val;
      },
      handleCancelPicker () {
        this.showPicker = false;
      },
      handleConfirmPicker () {
        const { province, city, area } = this.selectedAddress;
        if (province.name.length === 0 || city.name.length === 0 || area.name.length === 0) {
          this.changeToast('请选择省\市\区');
          return;
        }
        this.area = province.name + ' ' + city.name + ' ' + area.name;
        this.showPicker = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/mixin.scss';
  .settlement-page {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .settlement-content {
    flex: 1;
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
  .product-info {
    background: #fff;
    padding: px2rem(12) px2rem(15);
    display: flex;
    margin-bottom: px2rem(12);
  }
  .product-info img {
    width: px2rem(75);
    height: px2rem(75);
    margin-right: px2rem(12);
  }
  .product-info .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .product-info .content .count {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .product-info .content .count .price {
    color: #FB712B;
  }
  .user-info {
    background: #fff;
    padding: 0 px2rem(13);
    border-bottom: 1px solid #CCCCCC;
  }
  .common {
    height: px2rem(44);
    border-bottom: 1px solid #E5E5E5;
    display: flex;
    align-items: center;
  }
  .common span {
    margin-right: px2rem(18);
  }
  .user-info .address {
    justify-content: space-between;
  }
  .user-info .address p {
    padding-right: px2rem(10);
    &:after {
      content: '';
      display: inline-block;
      width: px2rem(15);
      height: px2rem(15);
      background: url('../assets/r-arrow.png') no-repeat;
      background-size: cover;
    }
  }
  .user-info .message {
    height: px2rem(70);
    padding: px2rem(10) 0;
  }
  .user-info .message textarea {
    width: 100%;
    height: 100%;
    resize: none;
  }
  .pay-info {
    background: #fff;
    padding: 0 px2rem(13);
  }
  .pay-info .pay-item {
    justify-content: space-between;
    &:last-child {
      border-bottom: none;
    }
  }
  .pay-info .pay-item img {
    width: px2rem(16);
    height: px2rem(16);
    vertical-align: middle;
    margin-right: px2rem(4);
  }
  .pay-info .pay-item i {
    width: px2rem(17);
    height: px2rem(17);
    background: #EFEFEF;
    border-radius: 50%;
  }
  .pay-info .pay-item i.selected {
    background: #EFEFEF;
    width: px2rem(9);
    height: px2rem(9);
    background-color: $primary_color;
    margin-right: px2rem(4);
    box-shadow: 0 0 0 px2rem(4) #fff,
                0 0 0 px2rem(5) $primary_color;
  }
  .pay-bar {
    display: flex;
    background: #fff;
  }
  .pay-bar p {
    flex: 1;
    line-height: px2rem(49);
    padding-left: px2rem(15);
  }
  .pay-bar p span {
    color: #FFAE00;
  }
  .pay-bar button {
    width: px2rem(117);
    line-height: px2rem(49);
    background: $primary_color;
    color: #fff;
    font-size: px2rem($size_default);
  }
  input:placeholder {
    color: #A8A8A8;
  }
  .picker-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: px2rem(218);
    font-size: px2rem(16);
    background: #E5E5E5;
  }
  .picker-bar {
    background: #f2f2f2;
    height: px2rem(40);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 px2rem(10);
  }
  .picker-bar button {
    color: $primary_color;
    background: none;
  }
  .picker {
    height: px2rem(178);
    background: #E5E5E5;
  }
</style>

<style lang="scss">
  @import '../styles/mixin.scss';
  .smooth-picker .smooth-handle-layer .smooth-top {
    background: transparent!important;
  }
  .smooth-picker .smooth-handle-layer .smooth-middle {
    height: px2rem(34)!important;
  }
  .smooth-picker .smooth-handle-layer .smooth-bottom {
    background: transparent!important;
  }
  .smooth-picker .smooth-item {
    height: px2rem(34)!important;
    font-size: px2rem($size_default)!important;
    // transform: rotateX(23deg) translate3d(0px, 0px, px2rem(50))!important; 
    // transition: transform 150ms ease-out!important;
  }
</style>

