Page({
  data: {
    recordTypes: ['空腹血糖', '餐后血糖', '血压(收缩压)', '体重'],
    currentType: '空腹血糖',
    inputValue: '',
    advice: '根据近三天数据，您的空腹血糖稳定在6.0左右，但餐后血糖偏高。建议晚餐后散步30分钟，并注意控制主食量。',
    healthData: []
  },
  onLoad() {
    const app = getApp();
    this.setData({ healthData: app.globalData.healthRecords });
    this.drawChart();
  },
  onTypeChange(e) {
    this.setData({ currentType: this.data.recordTypes[e.detail.value] });
  },
  onValueInput(e) {
    this.setData({ inputValue: e.detail.value });
  },
  addRecord() {
    const val = parseFloat(this.data.inputValue);
    if (isNaN(val)) {
      wx.showToast({ title: '请输入有效数值', icon: 'none' });
      return;
    }
    const newRecord = {
      date: new Date().toISOString().slice(0,10),
      type: this.data.currentType,
      value: val
    };
    let records = this.data.healthData;
    records.push(newRecord);
    this.setData({ healthData: records, inputValue: '' });
    wx.showToast({ title: '记录成功', icon: 'success' });
    // 更新全局
    getApp().globalData.healthRecords.push(newRecord);
    this.drawChart();
    // 模拟更新建议
    this.updateAdvice();
  },
  drawChart() {
    const ctx = wx.createCanvasContext('glucoseChart');
    // 简单绘制折线，只演示
    const data = this.data.healthData.filter(r => r.type.includes('血糖')).slice(-7);
    if (data.length === 0) return;
    const values = data.map(r => r.value);
    const max = Math.max(...values) + 1;
    const min = Math.min(...values) - 1;
    const stepX = 60;
    ctx.beginPath();
    ctx.setStrokeStyle('#07c160');
    ctx.setLineWidth(3);
    data.forEach((item, index) => {
      const x = 50 + index * stepX;
      const y = 300 - ((item.value - min) / (max - min)) * 200;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.draw();
  },
  updateAdvice() {
    // 模拟AI分析
    this.setData({
      advice: '您最近一次餐后血糖为9.2，较前日有所下降。继续保持良好习惯，建议增加蔬菜摄入。'
    });
  }
})