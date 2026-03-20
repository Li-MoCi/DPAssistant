Page({
  data: {
    defaultImage: 'https://cdn.nlark.com/yuque/0/2026/png/62865233/1773912758345-1e55504c-796a-43a9-ab50-a3900aded322.png?x-oss-process=image%2Fformat%2Cwebp',
    recognizedFood: null,
    todayRecords: [],
    weekReport: '',
    dailySugar: 45,
    dailyLimit: 60,
    dailyProgress: 75
  },

  onLoad() {
    // 模拟从全局加载今日记录
    const app = getApp();
    const today = new Date().toISOString().slice(0, 10);
    const records = app.globalData.dietRecords.filter(r => r.date === today);
    this.setData({ todayRecords: records });
    this.updateProgress();
  },
  onShow(){
    // 获取自定义 tabBar 组件实例
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      // 将当前页面的索引（这里是首页，索引0）设置给 tabBar 组件
      this.getTabBar().setData({
        selected: 2
      })
    }
},
  updateProgress() {
    const progress = Math.min(100, Math.round((this.data.dailySugar / this.data.dailyLimit) * 100));
    this.setData({ dailyProgress: progress });
  },

  uploadImage() {
    wx.chooseImage({
      success: (res) => {
        const imagePath = res.tempFilePaths[0];
        wx.showLoading({ title: '识别中...' });
        setTimeout(() => {
          wx.hideLoading();
          // 模拟识别结果
          this.setData({
            recognizedFood: { name: '荞麦面', sugar: 45, image: imagePath }
          });
        }, 1500);
      }
    });
  },

  takePhoto() {
    wx.chooseImage({
      success: (res) => {
        const imagePath = res.tempFilePaths[0];
        wx.showLoading({ title: '识别中...' });
        setTimeout(() => {
          wx.hideLoading();
          this.setData({
            recognizedFood: { name: '荞麦面', sugar: 45, image: imagePath }
          });
        }, 1500);
      }
    });
  },

  confirmRecord() {
    const food = this.data.recognizedFood;
    if (!food) return;
    const newRecord = {
      date: new Date().toISOString().slice(0, 10),
      meal: '正餐',
      foods: [{ name: food.name, amount: '1份' }],
      sugar: food.sugar
    };
    const records = [...this.data.todayRecords, newRecord];
    const dailySugar = this.data.dailySugar + food.sugar;
    this.setData({
      todayRecords: records,
      // recognizedFood: null,
      dailySugar
    }, () => {
      this.updateProgress();
    });
    wx.showToast({ title: '记录成功', icon: 'success' });

    // 更新全局
    const app = getApp();
    app.globalData.dietRecords.push(newRecord);
  },

  generateWeekReport() {
    wx.showLoading({ title: '生成周报中...' });
    setTimeout(() => {
      wx.hideLoading();
      const report = '本周营养评分 85。膳食纤维摄入不足（缺口 15%），优质蛋白及碳水摄入达标。建议增加深色叶菜摄入。';
      this.setData({ weekReport: report });
    }, 1000);
  },

  reset() {
    this.setData({ recognizedFood: null });
  },

  goBack() {
    wx.navigateBack();
  }
});