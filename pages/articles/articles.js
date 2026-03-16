Page({
  data: {
    todayArticle: null,
    historyArticles: [],
    allArticles: [
      { id: 1, title: '糖尿病饮食误区，你中招了吗？', summary: '很多糖友不敢吃水果，其实适量低GI水果有益健康……', content: '详细内容：水果选择樱桃、柚子等，每天不超过200g。' },
      { id: 2, title: '运动降糖的正确方式', summary: '餐后1小时运动最佳，快走、游泳等有氧运动效果好……', content: '详细内容：每周至少150分钟中等强度运动，注意足部保护。' },
      { id: 3, title: '如何预防糖尿病足', summary: '每天检查双脚，穿合适的鞋袜，避免受伤……', content: '详细内容：洗脚水温不超过37℃，用浅色毛巾擦干以便发现破损。' }
    ]
  },
  onLoad() {
    // 随机选择一篇作为今日推荐
    const randomIndex = Math.floor(Math.random() * this.data.allArticles.length);
    this.setData({
      todayArticle: this.data.allArticles[randomIndex],
      historyArticles: this.data.allArticles.filter((_, i) => i !== randomIndex)
    });
  },
  viewDetail(e) {
    const id = e.currentTarget.dataset.id;
    const article = this.data.allArticles.find(a => a.id === id);
    wx.showModal({
      title: article.title,
      content: article.content,
      showCancel: false
    });
  }
})