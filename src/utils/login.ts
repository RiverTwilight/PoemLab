export default function login() {
  wx.login({
    success(res) {
      if (res.code) {
        //发起网络请求
        wx.request({
          url: "https://test.com/onLogin",
          data: {
            code: res.code,
          },
        });
      } else {
        console.log("登录失败！" + res.errMsg);
      }
    },
  });
}
