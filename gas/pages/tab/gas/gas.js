// pages/gas/gas.js
import GasStaion from '../../tpls/gas-station-tpl/gas-station-tpl.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [
      '../../../images/ads/banner-1.jpg',
      '../../../images/ads/banner-2.jpg',
      '../../../images/ads/banner-3.jpg',
      '../../../images/ads/banner-4.jpg',
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let gasStaion = new GasStaion(this);
    gasStaion.getStationList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})