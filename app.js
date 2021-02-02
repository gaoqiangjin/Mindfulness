//app.js
require('umtrack-wx');
var plugin = requirePlugin("chatbot");
App({
  umengConfig: {
    appKey: '5eb50b35978eea078b7e95a6', //由友盟分配的APP_KEY
    // 是否使用openid进行统计，此项为false时将使用友盟+随机ID进行用户统计。
    // 使用openid来统计微信小程序的用户，会使统计的指标更为准确，对系统准确性要求高的应用推荐使用OpenID。
    useOpenid: false,
    autoGetOpenid: false, // 是否需要通过友盟后台获取openid，如若需要，请到友盟后台设置appId及secret
    debug: true, //是否打开调试模式
    uploadUserInfo: true // 自动上传用户信息，设为false取消上传，默认为false
  },
  onLaunch: function() {
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top, //胶囊按钮与顶部的距离
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2 //导航高度
        this.globalData.navHeight = navHeight
        this.globalData.navTop = navTop
        this.globalData.windowHeight = 750 / res.windowWidth * res.windowHeight + navHeight + navTop
        console.log(navHeight, navTop)
      },
      fail(err) {
        console.log(err);
      }
    })
    plugin.init({
      appid: "N96vvCsQyWplnmBdZ3OeYWqJCyi10d", //小程序示例账户，仅供学习和参考
      guideList: ["您好"],
      textToSpeech: false, //默认为ture打开状态
      welcome: "请问有什么需要帮助？",
      welcomeImage: 'http://inews.gtimg.com/newsapp_bt/0/10701537095/1000',
      background: "rgba(247,251,252,1)",
      robotHeader: 'https://res.wx.qq.com/mmspraiweb_node/dist/static/miniprogrampageImages/talk/leftHeader.png',
      userHeader: 'https://res.wx.qq.com/mmspraiweb_node/dist/static/miniprogrampageImages/talk/rightHeader.png',
      userName: '',
      defaultWheel: ''
    });
  },
  isLogin() {
    return this.globalData.userID
  },
  globalData: {
    currentPlanID: '',
    userInfo: null,
    userID: '',
    navHeight: 0,
    navTop: 0,
    windowHeight: 0
  }
})