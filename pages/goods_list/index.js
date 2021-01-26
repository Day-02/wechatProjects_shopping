// pages/goods_list/index.js
import { request } from '../../request/index'
Page({

  data: {
    tabs: [
      {
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      },
      {
        id: 2,
        value: '价格',
        isActive: false
      }],
    goodsList: [],
    totalPages: 3
  },
  //接口要的参数
  queryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },

  onLoad: function (options) {
    this.queryParams.cid = options.cid
    this.getGoodsList()
  },

  //获取商品列表
  async getGoodsList() {
    const { data: res } = await request({ url: '/goods/search', data: this.queryParams })
    let goodsList = res.message.goods
    //拼接数据
    this.setData({ goodsList: [...this.data.goodsList, ...goodsList] })

    let total = res.message.total
    this.totalPages = Math.ceil(total / this.queryParams.pagesize)
    wx.stopPullDownRefresh()
  },
  //标题的点击事件
  handleTabsItemChange(e) {
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((item, i) => i === index ? item.isActive = true : item.isActive = false);
    this.setData({ tabs })
  },

  //页面触底事件
  onReachBottom() {
    if (this.queryParams.pagenum >= this.totalPages) {
      wx.showToast({
        title: '已经到底了😜',
      });
    } else {
      this.queryParams.pagenum++
      this.getGoodsList()
    }
  },
  //下拉刷新事件
  onPullDownRefresh() {
    this.setData({
      goodsList: []
    })
    this.queryParams.pagenum = 1
    this.getGoodsList()
  },

})
