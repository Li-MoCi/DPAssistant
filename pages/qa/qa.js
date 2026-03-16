Page({
  data: {
    messages: [
      { role: 'assistant', content: '您好，我是糖尿病健康助手，有什么可以帮您？' }
    ],
    inputValue: '',
    loading: false  // 是否等待回复
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
    const API_KEY = 'sk-32f8bbb0ad874b40aa295430b1e50ada'; // 请替换为真实DeepSeek API密钥
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
  startVoice() {
    wx.showToast({ title: '语音识别中...', icon: 'none' });
    setTimeout(() => {
      this.setData({ inputValue: '糖尿病能吃什么水果？' });
    }, 2000);
  }
})