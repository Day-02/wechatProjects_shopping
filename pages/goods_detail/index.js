// pages/goods_detail/index.js
import { request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },

  onLoad: function (options) {
    const { goods_id } = options
    this.getGoodsDetail(goods_id)
  },
  //获得商品详情数据
  async getGoodsDetail(goods_id) {
    const { data: res } = await request({ url: '/goods/detail', data: { goods_id } })
    this.goodsObj = res.message
    console.log(this.goodsObj);
    let goodsObj = res.message
    this.setData({
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: goodsObj.pics,
      }
    })
  },
  //点击轮播图放大预览
  handlePreviewImage(e) {
    const urls = this.goodsObj.pics.map(v => v.pics_mid)
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      current,
      urls
    })
  },
  //点击加入购物车
  handleCartAdd() {
    let cart = wx.getStorageSync("cart") || [];
    let index = cart.findIndex(v => v.goods_id === this.goodsObj.goods_id)
    if (index === -1) {
      this.goodsObj.num = 1
      this.goodsObj.checked = true
      cart.push(this.goodsObj)
    } else {
      cart[index].num++
    }
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: '已成功添加',
      icon: 'success',
      mask: true
    });
  }
})