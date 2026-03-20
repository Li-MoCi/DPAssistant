Page({
  data: {
    nickName: '糖友',
    avatarUrl: 'https://cdn.nlark.com/yuque/0/2026/png/62865233/1772981014253-55468e3a-c3dc-4da9-acae-a8d6612ad346.png',
    health: {
      bloodSugar: 6.2,
      status: '目标范围内',
      trend: [28, 38, 32, 45],
      fiberCurrent: 18,
      fiberTarget: 25,
      fiberProgress: 72
    },
    quickTools: [
      { id: 'voice', title: 'AI 语音问诊', icon: '🎙️', url: '/pages/qa/qa' },
      { id: 'food', title: '食物识别', icon: '📷', url: '/pages/food/food' },
      { id: 'reminder', title: '用药提醒', icon: '💊', url: '/pages/medicine/medicine' },
      { id: 'report', title: '营养师周报', icon: '📋', url: '/pages/health/health' }
    ],
    lowGITopics: [
      {
        id: 1,
        tag: '误区',
        title: '关于糙米的5个误区，你需要了解',
        readTime: 5,
        cover: 'https://cdn.nlark.com/yuque/0/2026/png/62865233/1773836571634-51360471-dcf7-4538-a4f0-9f35acf2cad5.png?x-oss-process=image%2Fformat%2Cwebp'
      },
      {
        id: 2,
        tag: '烹饪',
        title: '有助于稳定血糖的低GI食谱',
        readTime: 8,
        cover: 'https://cdn.nlark.com/yuque/0/2026/png/62865233/1773836589626-51193218-366f-4c63-a983-ddc50e1f4f5f.png?x-oss-process=image%2Fformat%2Cwebp'
      }
    ]
  },

  onShow(){
        // 获取自定义 tabBar 组件实例
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
          // 将当前页面的索引（这里是首页，索引0）设置给 tabBar 组件
          this.getTabBar().setData({
            selected: 0
          })
        }
  },

  onLoad() {
    const app = getApp();
    this.setData({
      nickName: app.globalData.userInfo.nickName,
      avatarUrl: app.globalData.userInfo.avatarUrl || '/images/default-avatar.png'
    });
  },

  goToPage(e) {
    const url = e.currentTarget.dataset.url;
    if (!url) return;
      wx.switchTab({ url });

  },

  viewAllArticles() {
    wx.navigateTo({ url: '/pages/articles/articles' });
  },

  viewArticle(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/articles/articles?id=${id}`
    });
  }
});

