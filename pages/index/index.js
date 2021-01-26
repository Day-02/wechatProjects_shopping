import { request } from '../../request/index';
Page({
  data: {
    //轮播图数组
    swiperList: [],
    //导航栏数组
    cateList: [],
    //导航栏数组
    floorList: []

  },
  //开始就加载，created()
  onLoad: function (options) {
    this.getSwiperList(),
      this.getCateList(),
      this.getFloorList()
  },

  //获取轮播图数据
  getSwiperList() {
    request({ url: '/home/swiperdata' })
      .then(result => {
        this.setData({
          swiperList: result.data.message
        })
      })
  },

  //获取导航栏数据
  getCateList() {
    request({ url: '/home/catitems' })
      .then(result => {
        this.setData({
          cateList: result.data.message
        })
      })
  },

  //获取导航栏数据
  getFloorList() {
    request({ url: '/home/floordata' })
      .then(result => {
        this.setData({
          floorList: result.data.message
        })
      })
  }
});