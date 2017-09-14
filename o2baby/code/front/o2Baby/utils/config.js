let host = "https://babyapi.gas777.com/v1";
let localImagePath = '../../../../images/';
let Config = {

  host,
  //二维码扫码
  scanUrl: `${host}/scan/scan?iden=`,

  //手动输入二维码
  codeUrl: `${host}/scan/scan?code`,

  //获取token令牌
  tokenUrl: `${host}/token/user`,

  //扫码/手动输码的订单
  orderOneUrl: `${host}/order_one`,

  //预订单
  orderUrl: `${host}/order`,

  //添加收货地址
  addressUrl: `${host}/address`,

  //气站查询
  stationUrl: `${host}/station?`,

  // 归还  所需参数 {orderNo :,stationID ,}
  returnUrl: `${host}/order/return`,

  //产品列表
  productListUrl: `${host}/products`,

  //本地图片图标资源路径
  localIconImagePath: `${localImagePath}icon/`,

  //本地图片背景资源路径
  loacalBgImagePath: `${localImagePath}bg`,

  //本地图片其他资源路径
  localOtherImagePath: `${localImagePath}other`
};
export { Config };