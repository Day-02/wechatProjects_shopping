import { request } from '../../request/index'
Page({
  data: {
    //左侧菜单数据
    leftMenuList: [],
    //右侧内容数据
    rightContent: [],
    //被点击的左侧的菜单
    currentIndex: 0,
    scrollTop: 0
  },
  //接口数据用于清洗
  Cates: [],
  onLoad: function (options) {
    const Cates = wx.getStorageSync('cates')
    if (!Cates) {
      this.getCates()
    }
    else {
      if (Date.now() - Cates.time > 1000 * 60) this.getCates()
      else {
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }

  },
  //获取数据
  async getCates() {
    const res = await request({
      url: '/categories'
    })
    this.Cates = res.data.message;
    wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
    let leftMenuList = this.Cates.map(v => v.cat_name);
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })

  },
  //左侧菜单的点击事件
  handleItemTap(e) {
    const { index } = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0
    })
  }
})