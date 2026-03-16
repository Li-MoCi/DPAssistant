App({
  globalData: {
    userInfo: null,
    // 模拟用户历史数据
    healthRecords: [
      { date: '2026-03-10', type: '空腹血糖', value: 6.2 },
      { date: '2026-03-10', type: '餐后血糖', value: 9.8 },
      { date: '2026-03-11', type: '空腹血糖', value: 6.5 },
      { date: '2026-03-11', type: '餐后血糖', value: 9.2 },
      { date: '2026-03-12', type: '空腹血糖', value: 6.0 },
      { date: '2026-03-12', type: '餐后血糖', value: 8.5 },
      { date: '2026-03-13', type: '空腹血糖', value: 5.8 },
      { date: '2026-03-13', type: '餐后血糖', value: 8.0 },
    ],
    dietRecords: [
      { date: '2026-03-13', meal: '早餐', foods: [{ name: '全麦面包', amount: '2片' }], sugar: 15 },
      { date: '2026-03-13', meal: '午餐', foods: [{ name: '荞麦面', amount: '150g' }], sugar: 30 },
    ]
  },
  onLaunch() {
    // 模拟获取用户信息
    this.globalData.userInfo = { nickName: '糖友', avatarUrl: '' }
  }
})