Page({
  data: {
    weeklyReport: {
      score: 85,
      summary: '膳食纤维摄入不足（缺口 15%），优质蛋白及碳水摄入达标。建议增加深色叶菜摄入。',
      nutrients: [
        { id: 'fiber', name: '膳食纤维', progress: 45, status: '缺口 15%' },
        { id: 'protein', name: '蛋白质', progress: 100, status: '已达标' },
        { id: 'carb', name: '碳水化合物', progress: 100, status: '已达标' }
      ],
      plan: '午餐额外增加一份绿叶蔬菜。',
      recommendations: [
        { id: 'gi', title: '挑选对血糖友好的优质食材', subtitle: 'GI 值低更有助于血糖稳定' },
        { id: 'menu', title: '推荐食谱：高纤膳食', subtitle: '本周精选 5 款简单食谱' }
      ]
    }
  },
  onShow(){
    // 获取自定义 tabBar 组件实例
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      // 将当前页面的索引（这里是首页，索引0）设置给 tabBar 组件
      this.getTabBar().setData({
        selected: 3
      })
    }
},
});