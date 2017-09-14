import {Config} from '../../utils/config.js';
import {Home} from 'home-model.js';
import {Cart} from '../cart/cart-model.js';

let cart = new Cart();
let app = getApp();
let home = new Home();
Page({
    data: {
        icon: {
            cart: `${Config.localIconImagePath}cart@3x.png`,
            scan: `${Config.localIconImagePath}scan@3x.png`,
            my: `${Config.localIconImagePath}my@3x.png`,
        }
    },
    /**
     * [我要用氧]按钮触发事件
     */
    toProduct: function () {

        wx.navigateTo({
            url: '../product-list/product-list',
        })
    },
    /**
     * 跳转到购物车
     * 无信息 空提示
     * 有数据 购物车详情画面
     */
    toCart: () => {
        wx.navigateTo({
            url: '../cart/cart'
        });
    },
    /**
     * 扫一扫处理
     *
     */
    onScanCode: function () {

        let self = this;
        home.scanCode((iden) => {
            home.getProductInfo(iden, () => {
                let totalCounts = home.getTotalCounts();
                console.log(totalCounts);
                self.setData({
                    cartListNum: totalCounts
                })
            });

        });
    },
    onReady: function () {
        let totalCounts = home.getTotalCounts();
        this.setData({
            cartListNum: totalCounts
        })
    },
    onShow: function () {

    },
    toMine: function (e) {
        console.log("toMine" + e);
        wx.login({
            success: (res) => {
                console.log(res);
                if (res.code) {

                } else {
                    console.log('获取用户登录态失败！' + res.errMsg);
                }
            }
        })
        wx.navigateTo({
            url: "../my/my"
        });
    }
})

