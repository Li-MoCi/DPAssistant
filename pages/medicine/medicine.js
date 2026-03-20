// pages/medicine/medicine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    medicine: [{
      "name": "二甲双胍",
      "time": "08:00 (随餐)",
      "count": "1 片",
      "status": "已服用"
    }, {
      "name": "阿卡波糖",
      "time": "12:00 (餐前)",
      "count": "1 片",
      "status": "待服用"
    }, {
      "name": "格列齐特",
      "time": "18:00 (餐前)",
      "count": "1 片",
      "status": "提醒中"
    }],
    time:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const date=new Date();
    console.log(date)
    date.getMonth();
    date.getDate();
    
    const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    console.log(formattedDate)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow(){
    // 获取自定义 tabBar 组件实例
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      // 将当前页面的索引（这里是首页，索引0）设置给 tabBar 组件
      this.getTabBar().setData({
        selected: 4
      })
    }
},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})