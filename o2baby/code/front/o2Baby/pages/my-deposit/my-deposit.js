// my-deposit.js
let dialogItem = {
    showDialogStatus: false,
    content: '真的要退押金吗?',
    confirmText: '退押金',
    cancelText: '考虑一下'
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dialogItem: {
            showDialogStatus: false,
            content: '真的要退押金吗?',
            confirmText: '退押金',
            cancelText: '考虑一下'
        }
    },
    showOrHideDialog: function () {
        this.data.dialogItem.showDialogStatus = !this.data.dialogItem.showDialogStatus;
        this.setData({
            dialogItem: this.data.dialogItem
        })
    },
    /**
     * 退钱
     */
    bindBack: function (e) {
        wx.redirectTo({
            url: '../return-success/return-success'
        })
        this.setData({
            showDialogStatus: false
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            deposit: options.deposit
        })
        // console.log(this.data.deposit);
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