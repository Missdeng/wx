// pages/goods-list/goods-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSelected: true,
    show: false,
    activeTabIndex: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 当为扫码页面进入时,则显示桌号信息
    if (options) {
      console.log(options);
      this.setData({
        scanType: options.scanType
      })
    }

  },
  // 切换tab 
  switchTabbar: function (e) {
    var currentActiveIndex = e.currentTarget.dataset.index;
    this.setData(
      {
        activeTabIndex: parseInt(currentActiveIndex)
      }
    );

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