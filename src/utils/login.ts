export default function login() {
  wx.login({
    success(res) {
      if (res.code) {
        console.log(res.code)
        //发起网络请求
        wx.request({
          url: `https://poem-lab.vercel.app/api/login?jscode=${res.code}`
        });
      } else {
        console.log("登录失败！" + res.errMsg);
      }
    },
  });
}
