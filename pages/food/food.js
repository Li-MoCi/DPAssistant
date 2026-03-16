Page({
  data: {
    recognizedFood: null,
    todayRecords: [],
    weekReport: ''
  },
  onLoad() {
    // 模拟从全局加载今日记录
    const app = getApp();
    const today = new Date().toISOString().slice(0,10);
    const records = app.globalData.dietRecords.filter(r => r.date === today);
    this.setData({ todayRecords: records });
  },
  takePhoto() {
    wx.chooseImage({
      success: (res) => {
        wx.showLoading({ title: '识别中...' });
        setTimeout(() => {
          wx.hideLoading();
          // 模拟识别结果
          this.setData({
            recognizedFood: { name: '苹果', sugar: 15 }
          });
        }, 1500);
      }
    });
  },
  uploadImage() {
    // 模拟上传相册图片，与拍照类似
    wx.chooseImage({
      success: () => {
        wx.showLoading({ title: '识别中...' });
        setTimeout(() => {
          wx.hideLoading();
          this.setData({
            recognizedFood: { name: '全麦面包', sugar: 20 }
          });
        }, 1500);
      }
    });
  },
  confirmRecord() {
    const food = this.data.recognizedFood;
    if (!food) return;
    const newRecord = {
      date: new Date().toISOString().slice(0,10),
      meal: '正餐', // 简化处理
      foods: [{ name: food.name, amount: '1份' }],
      sugar: food.sugar
    };
    let records = this.data.todayRecords;
    records.push(newRecord);
    this.setData({ todayRecords: records, recognizedFood: null });
    wx.showToast({ title: '记录成功', icon: 'success' });
    // 更新全局
    const app = getApp();
    app.globalData.dietRecords.push(newRecord);
  },
  generateWeekReport() {
    wx.showLoading({ title: '生成周报中...' });
    setTimeout(() => {
      wx.hideLoading();
      const report = '本周膳食纤维摄入不足，建议多吃绿叶蔬菜（如菠菜、西兰花）。碳水化合物摄入偏高，可适当减少主食量。继续保持低GI饮食！';
      this.setData({ weekReport: report });
    }, 1000);
  }
})