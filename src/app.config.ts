export default {
  pages: [
    "pages/index/index",
    "pages/me/index",
    "pages/room/index",
    "pages/createRoom/index",
  ],
  window: {
    backgroundTextStyle: "light",
    backgroundColor: "#F6EFEF",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    // 使用custom-tab-bar
    custom: true,
    color: "rgba(0, 0, 0, 0.6)",
    selectedColor: "rgba(0, 162, 0, 1)",
    backgroundColor: "#000",
    borderStyle: "black",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
      },
      {
        pagePath: "pages/me/index",
        text: "我的",
      },
    ],
  },
};
