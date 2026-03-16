Page({
  data: {
    messages: [
      { role: 'assistant', content: '您好，我是糖尿病健康助手，有什么可以帮您？' }
    ],
    inputValue: ''
  },
  onInput(e) {
    this.setData({ inputValue: e.detail.value });
  },
  sendMessage() {
    const text = this.data.inputValue.trim();
    if (!text) return;
    this.addMessage('user', text);
    this.setData({ inputValue: '' });
    // 模拟AI响应
    setTimeout(() => {
      const reply = this.mockAIResponse(text);
      this.addMessage('assistant', reply);
    }, 500);
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
  mockAIResponse(question) {
    // 模拟基于知识图谱/RAG的回答
    if (question.includes('症状')) return '糖尿病的典型症状是“三多一少”，即多饮、多尿、多食和体重下降。但部分患者症状不明显，建议定期监测血糖。';
    if (question.includes('药物')) return '常用降糖药物包括二甲双胍、磺脲类、胰岛素等。请遵医嘱用药，切勿自行调整。';
    if (question.includes('并发症')) return '长期高血糖可能导致心血管疾病、肾病、视网膜病变等并发症。控制血糖、血压、血脂是预防关键。';
    return '您的问题我已记录，正在为您查询知识库… 建议咨询专业医生获取更准确信息。';
  },
  startVoice() {
    wx.showToast({ title: '语音识别模拟中...', icon: 'none' });
    setTimeout(() => {
      this.setData({ inputValue: '糖尿病能吃什么水果？' });
    }, 1000);
  }
})