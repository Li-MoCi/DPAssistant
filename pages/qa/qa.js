Page({
  data: {
    messages: [
      { role: 'assistant', content: '您好！我是您的AI营养助手。今天想吃点什么？我可以为您定制控糖方案。' }
    ],
    inputValue: '',
    loading: false, // 是否等待回复
    activeTab: 'assistant',
    isassistant: true,

// 下面是数字营养师的变量
    userRequest: '',
    recipe: '',
    messages_nutritionost: [
      { role: 'assistant', content: '您好！我是您的AI营养助手。今天想吃点什么？我可以为您定制控糖方案。' }
    ],
    loading_nutritionost:false
  },
  onShow(){
    // 获取自定义 tabBar 组件实例
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      // 将当前页面的索引（这里是首页，索引0）设置给 tabBar 组件
      this.getTabBar().setData({
        selected: 1
      })
    }
},
  onInput(e) {
    this.setData({ inputValue: e.detail.value });
  },

  sendMessage() {
    const text = this.data.inputValue.trim();
    if (!text || this.data.loading) return;
    this.addMessage('user', text);
    this.setData({ inputValue: '' });
    // 调用DeepSeek API
    this.callDeepSeekAPI(text);
  },

  addMessage(role, content) {
    const msgs = this.data.messages;
    msgs.push({ role, content });
    this.setData({ messages: msgs }, () => {
      wx.pageScrollTo({
        selector: '#chat-list',
        offsetTop: 1000,
        duration: 300
      });
    });
  },

  // 调用 DeepSeek API
  async callDeepSeekAPI(prompt) {
    this.setData({ loading: true });

    // 注意：实际使用时，API密钥不应放在前端，建议通过云函数或自有服务器转发
    const API_KEY = 'API_KEY'; // 请替换为真实DeepSeek API密钥
    const API_URL = 'https://api.deepseek.com/v1/chat/completions';

    try {
      const response = await new Promise((resolve, reject) => {
        wx.request({
          url: API_URL,
          method: 'POST',
          header: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
          },
          data: {
            model: 'deepseek-chat',
            messages: [
              {
                role: 'system',
                content: '你是一位专业的糖尿病健康顾问，请根据用户问题提供准确、易懂的回答。回答要简洁但包含关键医疗建议。强调咨询专业医生的重要性。'
              },
              {
                role: 'user',
                content: prompt
              }
            ],
            stream: false,
            max_tokens: 1024
          },
          success: (res) => {
            if (res.statusCode === 200) {
              resolve(res.data);
            } else {
              reject(new Error(`API错误: ${res.statusCode}`));
            }
          },
          fail: reject
        });
      });

      const reply = response.choices[0].message.content;
      this.addMessage('assistant', reply);
    } catch (error) {
      console.error('API调用失败', error);
      this.addMessage('assistant', '抱歉，我暂时无法回答，请稍后再试。');
    } finally {
      this.setData({ loading: false });
    }
  },


  addToPlan() {
    wx.showToast({ title: '已加入今日计划', icon: 'success' });
  },

  startVoice() {
    wx.showToast({ title: '语音识别中...', icon: 'none' });
    setTimeout(() => {
      this.setData({ inputValue: '我想吃面条' });
    }, 2000);
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    console.log(e);
    this.setData({
      activeTab: tab,
      isassistant: tab === 'assistant'   // 同步更新
    });
  },

  // 下面是数字营养师的页面展示
  addMessage_nutritionost(role, content) {
    const msgs = this.data.messages_nutritionost;
    msgs.push({ role, content });
    this.setData({ messages_nutritionost: msgs }, () => {
      wx.pageScrollTo({
        selector: '#chat-list',
        offsetTop: 1000,
        duration: 300
      });
    });
  },
  generateRecipe() {
    const text = this.data.inputValue.trim();
    if (!text || this.data.loading) return;
    this.addMessage_nutritionost('user', text);
    this.setData({ inputValue: '' });
    const req = this.data.userRequest.trim() || '均衡饮食';
    this.setData({
      loading_nutritionost:true
    })
    setTimeout(() => {
      wx.hideLoading();
      let recipe = '';
      if (req.includes('面条')) {
        recipe = '推荐：荞麦面（低GI）搭配鸡胸肉和大量蔬菜（如菠菜、番茄）。进餐顺序：先喝汤，再吃菜，最后吃面。荞麦面富含膳食纤维，有助于平稳血糖。';
      } else if (req.includes('米饭')) {
        recipe = '建议将白米饭替换为糙米或杂粮饭（如燕麦米、黑米）。搭配清蒸鱼和焯水西兰花，烹饪用油控制在10g以内。';
      } else {
        recipe = '推荐食谱：早餐：全麦面包2片+无糖酸奶+水煮蛋；午餐：糙米饭100g+清炒鸡胸肉+凉拌黄瓜；晚餐：番茄豆腐汤+蒸南瓜。两餐之间可加餐一小把坚果。';
      }
      this.setData({ recipe });
      this.setData({
        loading_nutritionost:false
      })
    }, 1000);
  },
});