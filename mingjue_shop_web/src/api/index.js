import axios from 'axios';
var qs = require('qs');

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://tbz.tcpan.com';//https://www.apiview.com
}
// 后台不支持JSON
//axios.defaults.headers.post['Content-Type'] = 'application/json';

const loginUrl = '/app/login_in/login';
const logoutUrl = '/app/login_in/logout';
const registerUrl = '/app/login_in/register';
const forgetPWDUrl = '/app/login_in/forgetPWD';
const smsCaptchaUrl = '/app/login_in/getSmsCaptcha';


const picCaptchaUrl = '/app/login_in/getPicCaptcha';
const userInfoUrl = '/app/login_in/userinfo';
const getUserByPhoneUrl = '/app/login_in/getUserByPhone';
const fansUrl = '/app/login_in/fas';
const sendDiamondUrl = '/app/login_in/exchangeZS';
const withdrawUrl = '/app/login_in/cash';
const billUrl = '/app/login_in/jbLog';
const zsPayUrl = '/app/login_in/zsPay';
const payUrl = '/app/login_in/pay';

const goodsOrderUrl = '/app/goods/order';
const orderDetailUrl = '/app/goods/orderDetail';
const closeOrderUrl = '/app/goods/closeOrder';
const goodsListUrl = '/app/goods/goodsList';
const goodsDetailUrl = '/app/goods/details'
const goodsPayUrl = '/app/goods/pay';
const expressUrl = '/app/goods/express';
const adUrl = '/app/goods/ad';
const payDetailUrl = '/app/goods/payDetail';
const alipayUrl = '/app/goods/binding_alipay';
const unbindAliUrl = '/app/goods/unbundling_alipay';
const orderPayUrl = '/app/goods/orderPay';

const chargeProductListUrl = '/app/chongzhi/product';
const buyChargeUrl = '/app/chongzhi/buycard';
const useChargeUrl = '/app/chongzhi/do_cz';

const agentInfoUrl = '/app/login_in/agents';
const cardPayUrl = '/app/login_in/cardPay';
const drawRewardUrl = '/app/login_in/draw_jl';

import VueRouter from 'vue-router';

const catchUnlogin = (r) => {
  const res = r.data;
  if (res.code == -2) {
    new VueRouter().push('/login');
    return r;
  } else {
    return r;
  }
}

// 发送短信验证码
export const requestMsgCode = (mobile, session_id, pic_captcha) => {
  const params = qs.stringify({ mobile, session_id, pic_captcha });
  return axios.post(smsCaptchaUrl, params)
          .then(r => catchUnlogin(r))
}
// 图形验证码
export const requestImgCode = () => {
  return axios.get(picCaptchaUrl)
          .then(r => catchUnlogin(r))
}

// 注册
export const requestRegister = (mobile, sms_captcha, password, mid) => {
  // var params = new URLSearchParams();
  // params.append('mobile', mobile);
  // params.append('sms_captcha', sms_captcha);
  // params.append('password', password);
  // params.append('mid', mid);
  const params = qs.stringify({ mobile, sms_captcha, password, mid });
  return axios.post(registerUrl, params)
          .then(r => catchUnlogin(r))
}

// 忘记密码
export const requestForgetPWDUrl = (mobile, sms_captcha, password) => {
  const params = qs.stringify({ mobile, sms_captcha, password});
  return axios.post(forgetPWDUrl, params)
      .then(r => catchUnlogin(r))
}

// 登录
export const requestLogin = (mobile, password) => {
  // var params = new URLSearchParams();
  // params.append('mobile', mobile);
  // params.append('password', password);
  // return axios.post(loginUrl, params)
  //         .then(r => catchUnlogin(r))
  return axios.post(loginUrl, qs.stringify({ mobile: mobile, password: password }))
          .then(r => catchUnlogin(r))
}

// 退出登录
export const requestLogout = () => {
  return axios.get(logoutUrl)
          .then(r => catchUnlogin(r))
}

// 商品列表 : 1普通商品 2钻石商品
export const requestGoodsList = (type, page) => {
  return axios.get(`${goodsListUrl}?type=${type}&page=${page}`)
          .then(r => catchUnlogin(r))
}

// 商品详情
export const requestGoodsDetail = (goods_id) => {
  return axios.get(`${goodsDetailUrl}?goods_id=${goods_id}`)
          .then(r => catchUnlogin(r))
}

// 商品订单详情
export const requestGoodsPayDetail = (goods_id) => {
  return axios.get(`${payDetailUrl}?goods_id=${goods_id}`)
          .then(r => catchUnlogin(r))
}

// 商品支付
export const requestGoodsPay = (obj) => {
  // let params = new URLSearchParams();
  // for (let key in obj) {
  //   if (obj.hasOwnProperty(key)) {
  //     params.append(key, obj[key]);
  //   }
  // }
  let params = qs.stringify(obj);
  return axios.post(goodsPayUrl, params)
          .then(r => catchUnlogin(r))
}

// 订单支付 支付方式 1:微信支付 2支付宝支付
export const requestOrderPay = (order_id, type) => {
  // let params = new URLSearchParams();
  // params.append('order_id', order_id);
  // params.append('type', type);
  let params = qs.stringify({ order_id, type });
  return axios.post(orderPayUrl, params);
}

// 首页轮播图 : 3:商品首页 4: 金币首页
export const requestAd = (type) => {
  return axios.get(`${adUrl}?type=${type}`)
          .then(r => catchUnlogin(r))
}
// 商品订单列表
export const requestGoodsOrder = (page = 1, order_status = 0) => {
  console.log(order_status);
  return axios.get(`${goodsOrderUrl}?page=${page}&order_status=${order_status}`)
          .then(r => catchUnlogin(r))
}

// 订单详情
export const requestOrderDetail = (order_id) => {
  return axios.get(`${orderDetailUrl}?order_id=${order_id}`)
          .then(r => catchUnlogin(r))
}

// 物流信息
export const requestExpress = (order_id) => {
  return axios.get(`${expressUrl}?order_id=${order_id}`)
          .then(r => catchUnlogin(r))
}

// 关闭\取消订单
export const requestCloseOrder = (order_id) => {
  return axios.get(`${closeOrderUrl}?order_id=${order_id}`)
          .then(r => catchUnlogin(r))
}

// 粉丝列表
export const requestFans = (page) => {
  return axios.get(`${fansUrl}?page=${page}`)
          .then(r => catchUnlogin(r))
}

// 用户中心
export const requestUserInfo = () => {
  return axios.get(userInfoUrl)
          .then(r => catchUnlogin(r))
}

// 钻石转赠 手机号搜索
export const requestGetUserByPhone = (phone) => {
  return axios.get(`${getUserByPhoneUrl}?phone=${phone}`)
          .then(r => catchUnlogin(r))
}

// 钻石转赠
export const requestSendDiamond = (to_user_id, count) => {
  // let params = new URLSearchParams();
  // params.append('to_user_id', to_user_id);
  // params.append('count', count);
  let params = qs.stringify({ to_user_id, count });
  return axios.post(sendDiamondUrl, params)
          .then(r => catchUnlogin(r))
}

// 申请提现
export const requestWithdraw = (jb) => {
  // let params = new URLSearchParams();
  // params.append('jb', jb);
  const params = qs.stringify({ jb });
  return axios.post(withdrawUrl, params)
          .then(r => catchUnlogin(r))
}

// 账单
export const requestBill = (page = 1, type = 1) => {
  return axios.get(`${billUrl}?page=${page}&type=${type}`)
          .then(r => catchUnlogin(r))
}

// 充值列表
export const requestChargeProductListUrl = () => {
  return axios.get(chargeProductListUrl)
          .then(r => catchUnlogin(r))
}

// 绑定支付宝
export const requestBindAlipay = (name, accounts) => {
  // let params = new URLSearchParams();
  // params.append('name', name);
  // params.append('accounts', accounts);
  const params = qs.stringify({ name, accounts });
  return axios.post(alipayUrl, params)
          .then(r => catchUnlogin(r))
}

// 钻石支付
export const requestDiamondPay = (price, pay_way) => {
  // let params = new URLSearchParams();
  // params.append('price', price);
  // params.append('pay_way', pay_way);
  const params = qs.stringify({ price, pay_way });
  return axios.post(zsPayUrl, params)
          .then(r => catchUnlogin(r))
  // return axios.get(`${zsPayUrl}?price=${price}&pay_way=${pay_way}`)
          // .then(r => catchUnlogin(r))
}

// 支付
export const requestPay = (price) => {
  return axios.get(`${payUrl}?price=${price}`)
          .then(r => catchUnlogin(r))
}

// 购买充值卡 pay_way: 1微信支付 2金币支付 3 支付宝支付
export const requestBuyCard = (sp_id, phone, pay_way) => {
  // let params = new URLSearchParams();
  // params.append('sp_id', sp_id);
  // params.append('phone', phone);
  // params.append('pay_way', pay_way);
  const params = qs.stringify({ sp_id, phone, pay_way });
  return axios.post(buyChargeUrl, params)
          .then(r => catchUnlogin(r))
}

// 代理信息
export const requestAgentInfo = () => {
  return axios.get(agentInfoUrl)
          .then(r => catchUnlogin(r))
}

// 购买会员卡 -> 代理 sp_id=9
export const requestDelegate = (pay_way) => {
  // let params = new URLSearchParams();
  // params.append('sp_id', 9);
  // params.append('pay_way', pay_way);
  const params = qs.stringify({ sp_id: 9 ,pay_way });
  return axios.post(cardPayUrl, params)
          .then(r => catchUnlogin(r))
  // return axios.get(`${cardPayUrl}?sp_id=9&pay_way=${pay_way}`);
}

// 接触支付宝绑定
export const requestUnbindAlipay = () => {
  return axios.get(unbindAliUrl)
          .then(r => catchUnlogin(r))
}


// 提取奖励
export const requestDrawReward = () => {
  return axios.get(drawRewardUrl)
          .then(r => catchUnlogin(r))
}
