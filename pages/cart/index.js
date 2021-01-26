// pages/cart/index.js
import {
  getSetting,
  openSetting,
  chooseAddress,showModal,showToast
} from '../../utils/asyncWx.js'
Page({

  data: {
    address: {},
    cart: [],
    allchecked: false,
    totalPrice: 0,
    totalNum: 0,
  },
  onShow() {
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync("cart") || [];
    this.setCart(cart)
    this.setData({
      address
    })
  },

  //点击添加收货地址按钮
  async handleChooseAddress() {
    try {
      const res1 = await getSetting()
      const scopeAddress = res1.authSetting["scope.address"]
      if (scopeAddress === false) {
        await openSetting()
      }
      let address = await chooseAddress()
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
      wx.setStorageSync("address", address);
    } catch (error) {
      console.log(error);
    }
  },
  //商品的选中
  handleItemChange(e) {
    const goods_id = e.currentTarget.dataset.id
    let {
      cart
    } = this.data
    let index = cart.findIndex(v => v.goods_id === goods_id)
    cart[index].checked = !cart[index].checked
    this.setCart(cart)
  },
  //商品的全选
  handleItemAllCheck() {
    let {
      cart,
      allchecked
    } = this.data
    allchecked = !allchecked
    cart.forEach(v => v.checked = allchecked)
    this.setCart(cart)
  },
  //商品数量改变
  async handleItemNumEdit(e) {

    const {
      operation,
      id
    } = e.currentTarget.dataset
    let {
      cart
    } = this.data
    const index = cart.findIndex(v => v.goods_id === id)
    if (cart[index].num === 1 && operation === -1) {
      const res=await showModal({content:"您是否要删除该商品？"})
      if (res.confirm) {
        cart.splice(index, 1)
        this.setCart(cart)
      }
    }else{ cart[index].num += operation
      this.setCart(cart)}
   
  },
  //设置购物车状态
  setCart(cart) {
    let allchecked = true
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price
        totalNum += v.num
      } else {
        allchecked = false
      }
    });
    allchecked = cart.length != 0 ? allchecked : false
    this.setData({
      cart,
      allchecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync("cart", cart);
  },
  //结算
 async handlePay(){
    const {address,totalNum}=this.data
    if(!address.userName){
      await showToast({title:"您还没有选择收货地址"})
      return
    }
    if(totalNum===0){
      await showToast({title:"您还没有选择商品"})
      return
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    });
  }
})