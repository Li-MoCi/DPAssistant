Page({
  data: {
    userRequest: '',
    recipe: '',
    messages: [
      { role: 'assistant', content: '您好！我是您的AI营养助手。今天想吃点什么？我可以为您定制控糖方案。' }
    ],
    loading:false
  },
  onInput(e) {
    this.setData({ userRequest: e.detail.value });
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
  generateRecipe() {
    this.addMessage('user',this.data.userRequest)
    const req = this.data.userRequest.trim() || '均衡饮食';
    this.setData({
      loading:true
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
        loading:false
      })
    }, 1000);
  },
  startVoice() {
    wx.showToast({ title: '语音识别中...', icon: 'none' });
    setTimeout(() => {
      this.setData({ inputValue: '我想吃面条' });
    }, 2000);
  },

})