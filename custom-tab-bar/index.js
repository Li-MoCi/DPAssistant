// custom-tab-bar/index.js
// 可以直接从 app.json 中读取 tabBar 配置，也可以在这里硬编码
const app = getApp();

Component({
  data: {
    selected: 0, // 当前选中的 tab 索引
    // 从 app.json 读取配置，或者直接在此处定义列表
    "list": [
      {
        "pagePath": "/pages/index/index",
        "text": "首页",
        "iconPath": "/images/home.png",
        "selectedIconPath": "/images/home_active.png"
      },
      {
        "pagePath": "/pages/qa/qa",
        "text": "科普",
        "iconPath": "/images/qa.png",
        "selectedIconPath": "/images/qa_active.png"
      },
      {
        "pagePath": "/pages/food/food",
        "text": "饮食",
        "iconPath": "/images/food.png",
        "selectedIconPath": "/images/food_active.png"
      },
      {
        "pagePath": "/pages/health/health",
        "text": "健康",
        "iconPath": "/images/dietitian.png",
        "selectedIconPath": "/images/dietitian_active.png"
      },
      {
        "pagePath": "/pages/medicine/medicine",
        "text": "用药",
        "iconPath": "/images/medicine.png",
        "selectedIconPath": "/images/medicine_active.png"
      }
    ]
  },
  methods: {
    // tab 的点击事件
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      
      const index = data.index
      // 1. 先切换本组件的选中态，让视觉立即反馈
      this.setData({
        selected: index
      })
      // 2. 再执行页面跳转。由于是 tab 页，必须使用 wx.switchTab
      wx.switchTab({ url })
    }
  }
})