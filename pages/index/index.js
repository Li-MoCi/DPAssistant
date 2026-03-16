Page({
  data: {
    nickName: '糖友',
    avatarUrl: 'https://cdn.nlark.com/yuque/0/2026/png/62865233/1772981014253-55468e3a-c3dc-4da9-acae-a8d6612ad346.png',
    functions: [
      { title: '科普问答', desc: '语音/文字提问', icon: '/images/qqa.png', url: '/pages/qa/qa' },
      { title: '饮食记录', desc: '拍照识别，智能分析', icon: '/images/food.png', url: '/pages/food/food' },
      { title: '数字营养师', desc: '个性化控糖食谱', icon: '/images/recipe.png', url: '/pages/nutritionist/nutritionist' },
      { title: '健康数据', desc: '血糖血压趋势分析', icon: '/images/health.png', url: '/pages/health/health' },
      { title: '健康资讯', desc: '每日科普推送', icon: '/images/articles.png', url: '/pages/articles/articles' }
    ]
  },
  onLoad() {
    const app = getApp();
    this.setData({
      nickName: app.globalData.userInfo.nickName,
      avatarUrl: app.globalData.userInfo.avatarUrl || '/images/default-avatar.png'
    });
  },
  goToPage(e) {
    console.log(e)
    if(e.currentTarget.dataset.url=="/pages/articles/articles" ||e.currentTarget.dataset.url=="/pages/nutritionist/nutritionist" )
    {
      console.log(e)
    wx.navigateTo({ url: e.currentTarget.dataset.url });
    }
    else
    {
      console.log("cccccc")
      wx.switchTab({
        url: e.currentTarget.dataset.url,
      })
    }
  }
})