// cart.js
import { Constants } from '../../utils/constants.js';
import { Cart } from 'cart-model.js';

let cart = new Cart();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {
      src: '../../../images/bg/empty_shopping_cart@3x.png',
      info: '购物车还是空的哦~快去装满它吧'
    },
    delBtnWidth: 75,
    selectAllStatus: true,
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let cartList = wx.getStorageSync(Constants.CART);

    for (let item of cartList) {
      console.log(item);
    }
    this.setData({
      cartList: cartList
    });
  },

  /**
   * 通过产品ID得到其下标索引
   */
  _getProductIndexById: function (id) {
    let cartList = this.data.cartList;

    for (let index in cartList) {
      if (cartList[index].id === id) {
        return index;
      } else {
        console.log("该数据不存在");
      }
    }
  },

  /**
   * 修改 购买数量
   * @param event 事件对象
   */
  changeCounts: function (event) {
    let id = cart.getDataSet(event, 'id'),
      type = cart.getDataSet(event, 'type'),
      index = this._getProductIndexById(id),
      counts = 1;
    console.log(type)

    if (type === 'add') {
      cart.addCounts(id);
    } else {
      counts = -1;
      cart.cutCounts(id);
    }

    this.data.cartList[index].counts += counts;
    this._resetCartData();

  },
  /**
   * 下单时
   */
  submitOrder: function (event) {

  },
  test:function(event){
    console.log("test");
  },

  /**
   * 删除按钮部分操作
   */
  delProduct: function (event) {
    let id = cart.getDataSet(event, 'id'),
      index = this._getProductIndexById(id);

    console.log(id);
    console.log(index);

    this.data.cartList.splice(index, 1); // 删除某一项商品
    this.cartList();
    cart.delete(id);
  },

  /**
   * 修改选中状态
   */
  toggleSelect: function (event) {
    let id = cart.getDataSet(event, 'id'),
      status = cart.getDataSet(event, 'status'),
      index = this._getProductIndexById(id);

    // 取反，改变被选中的状态
    this.data.cartList[index].selectStatus = !status;
    this._resetCartData();
  },
  /**
   * 全选开关
   * 当为全选时,将所有选中改为反选状态
   * 当不为全选时,将所有未选中改为选中状态
   */
  toggleSelectAll: function (event) {
    if (this.data.selectAllStatus) {
      for (let item of this.data.cartList) {
        item.selectStatus = !item.selectStatus;
      }

    } else {
      for (let item of this.data.cartList) {
        item.selectStatus = true;
      }
    }
    this.data.selectAllStatus = !this.data.selectAllStatus;
    this._resetCartData();
  },


  // 更新购物车商品数据

  _resetCartData: function () {

    // 重新计算总金额和商品总数
    let newData = this._calcTotalAccountAndCounts(this.data.cartList);

    // this.data.account

    this.setData({
      account: newData.account,
      selectedCounts: newData.selectedCounts,
      selectedTypeCounts: newData.selectedTypeCounts,
      cartList: this.data.cartList,
      selectAllStatus: this.data.selectAllStatus
    });
  },
  /**
   * 计算 总金额和数量
   * @param data 数量
   */
  _calcTotalAccountAndCounts: function (data) {

    // data 是一个数组

    let len = data.length,

      // 所需要计算的总价格，但是要注意排除掉未选中的商品

      account = 0,

      // 购买的商品数量的总和
      selectedCounts = 0,

      // 挑选的商品种类的总数
      // 假如买了同一种书籍10本，那么selectedCounts为10，而selectedTypeCounts为0

      selectedTypeCounts = 0;

    let multiple = 100;

    // 乘100,避免float类型计算不精确的问题
    //
    for (let i = 0; i < len; i++) {
      if (data[i].selectStatus) {
        account += data[i].counts * multiple * Number(data[i].product_guarantee) * multiple;
        selectedCounts += data[i].counts;
        selectedTypeCounts++;
      }
    }

    return {
      selectedCounts: selectedCounts,
      selectedTypeCounts: selectedTypeCounts,
      account: account / (multiple * multiple)
    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log(this.data.cartList);


    cart.execSetStorageSync(this.data.cartList);
  },
  touchS: function (e) {
    console.log(e);
    let id = cart.getDataSet(e, 'id'),
      index = this._getProductIndexById(id);
    console.log(`touchS`);
    console.log(e.touches[0].pageX);
    if (e.touches.length === 1) {
      this.data.cartList[index].startX = e.touches[0].pageX;
    }
  },
  touchM: function (e) {
    console.log("touchM");
    console.log(e.touches[0].pageX);
    if (e.touches.length === 1) {
      /**
       * 1,当数值为负数时,代表用户从左往右滑动,偏移量=终点-起点(负数)
       * 2,当数值为正数时,代表用户从右往左滑动,偏移量=终点-起点(正数)
       * 左滑动最大偏移量为 按钮宽度的一半:75px;
       * 右滑动达到最大偏移量,偏移量设置为 0 ;
       * */
      let id = cart.getDataSet(e, 'id'),
        index = this._getProductIndexById(id),
        startX = this.data.cartList[index].startX;
      let offsetX = e.touches[0].pageX - startX;
      let equalMaxOffest = Math.abs(offsetX) >= this.data.delBtnWidth / 2;
      if (offsetX < 0 && equalMaxOffest) {
        this.data.cartList[index].offsetX = -this.data.delBtnWidth;
        this.data.cartList[index].zIndex = 1;
      }
      if (offsetX > 0 && equalMaxOffest) {
        this.data.cartList[index].offsetX = 0;
        this.data.cartList[index].zIndex = -1;
      }
      this._resetCartData();
    }

  },
  touchE: function (e) {
    console.log("touchE");
    console.log(e.touches);
  }
});