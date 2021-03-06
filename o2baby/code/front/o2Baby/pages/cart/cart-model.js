import {Base} from '../../utils/base.js';
import {Constants} from '../../utils/constants.js';
import {Config} from '../../utils/config.js';

/**
 * @class 首页类
 * 扫码操作
 * 确认登录状态
 */
class Cart extends Base {
    constructor() {
        super();
        this._storageKeyName = 'cart';
    }

    /**
     * 添加到购物车
     * 当之前无该商品时,直接添加一条新纪录,数量为counts
     * 当之前已存在过该商品,则对应商品数目 +counts
     * @param item 商品对象
     * @param counts 商品数目
     */
    add(item, counts) {
        let cartData = this.getCartDataFromLocal();
        let isHasInfo = this._isHasThatOne(item.id, cartData);
        console.log(isHasInfo.index);
        if (isHasInfo.index === -1) {
            item.counts = counts;
            item.zIndex = -1; //删除按钮的宽度
            item.offsetX = 0;  //初始位置
            item.selectStatus = true; //选中的状态，当商品添加购物车的时候，默认的状态是被选中的状态
            cartData.push(item);
        } else {
            cartData[isHasInfo.index].counts += counts;
            cartData[isHasInfo.index].delBtnWidth = 58;
            cartData[isHasInfo.index].offsetX = 0;
        }

        wx.setStorageSync(this._storageKeyName, cartData);

    }

    /**
     * 本地缓存数据更新
     @param data 需要保存的数据
     */
    execSetStorageSync(data) {
        wx.setStorageSync(this._storageKeyName, data);
    }


    /**
     * 从缓存中取数据对象
     */
    getCartDataFromLocal(flag) {
        let res = wx.getStorageSync(this._storageKeyName);
        if (!res) {
            res = [];
        }

        // 在下单的时候过滤不下单的商品
        if (flag) {
            let tempRes = [];
            for (let item of res) {
                item.selectStatus && tempRes.push(item);
            }
            res = newRes;
        }
        return res;
    }

    /**
     * 计算购物车下的所有商品总和
     @param  flag true 考虑商品选择状态，
     flag 为false，则忽略商品的选择状态，返回所有商品总和
     */
    getCartTotalCounts(flag) {
        let cartList = this.getCartDataFromLocal();
        // 如果不给初识值，会返回Nav
        let counts = 0;
        for (let item of cartList) {
            flag && item.selectStatus && (counts += item.counts);
            // 忽略 flag标记与选择状态 返回商品总和
            counts += item.counts;
        }
        return counts;
    }

    /**
     * 私有方法 修改商品数目 ,外部不可调用
     * @param id 商品id
     * @param counts 商品数目
     */
    _changeCounts(id, counts) {

        // 获取存储在缓存中购物车的数据

        let cartData = this.getCartDataFromLocal(),

            // 判断传入的商品是否存在
            hasInfo = this._isHasThatOne(id, cartData);
        console.log(hasInfo);

        if (hasInfo.index !== -1) {
            if (hasInfo.data.counts > 1) {
                cartData[hasInfo.index].counts += counts;
            }
        }

        wx.setStorageSync(this._storageKeyName, cartData); // 更新本地缓存
    }

    // 增加商品的数目

    addCounts(id) {
        this._changeCounts(id, 1);
    }


    // 减少购物车商品数目

    cutCounts(id) {
        this._changeCounts(id, -1);
    }

    /**
     * 删除商品
     * @params ids 获取删除的商品id
     */
    delete(ids) {
        if (!(ids instanceof Array)) {
            ids = [ids];
        }

        let cartData = this.getCartDataFromLocal();

        console.log(ids);

        console.log(cartData);


        for (let i = 0; i < ids.length; i++) {
            let hasInfo = this._isHasThatOne(ids[i], cartData);

            console.log(hasInfo);


            if (hasInfo.index !== -1) {
                cartData.splice(hasInfo.index, 1); // 删除数组某一项
            }
        }

        wx.setStorageSync(this._storageKeyName, cartData);

    }


    /**
     * 之前是否存在过该商品
     * @param id 商品唯一Id
     * @param itemList 商品对象数组
     * return 当前商品数据以及商品序号
     */
    _isHasThatOne(id, itemList) {
        let item,
            res = {index: -1}; // result是对象，初始值index:-1
        for (let index in itemList) {
            if (itemList[index].id === id) {
                res = {
                    index: index,
                    data: itemList[index]
                }
                break;
            }
        }
        return res;
    }

    /**
     * 购物车数据整理
     */
    getNewList() {
        let cartList = wx.getStorageSync(Constants.CART);
        let newCartList = [];
        let kindContainer = new Set();
        //去重处理
        for (let item of cartList) {
            kindContainer.add(item.id);
        }
        //产品种类数据详细获取 购物车默认选中状态
        for (let item of cartList) {
            for (let index of kindContainer.values()) {
                if (item.id === index) {
                    newCartList.push(item);
                }
            }
        }


        let kindO2 = [];
        for (let index = 0, length = cartList.length; index < length; i++) {
            console.log()
        }
    }

}

export {Cart}