import {
  showLoading,
  request,
  hideLoading,
  setStorageSync,
  login as taroLogin,
} from "@tarojs/taro";

export default function login(onSuccess: ()=>void) {
  showLoading({
    title: "登录中",
  });

  taroLogin({
    success: (res) => {
      if (res.code) {
        console.log(res.code);
        //发起网络请求
        // request({
        //   url: `https://poem-lab.vercel.app/api/login?jscode=${res.code}`,
        //   success: (res) => {
        //     const { openid, session_key } = res.data.body
        //     setStorageSync('login_session', {
        //       openid
        //     })
        //     onSuccess && onSuccess()
        //     // TODO 登陆后回调
        //   },
        // });
      } else {
        console.log("登录失败！" + res.errMsg);
      }
    },
    complete() {
      hideLoading();
    },
    fail() {
      console.log("登录失败");
    },
  });
}
