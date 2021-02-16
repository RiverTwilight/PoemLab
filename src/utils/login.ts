import {
  showLoading,
  request,
  hideLoading,
  setStorageSync,
  login as taroLogin,
  cloud
} from "@tarojs/taro";

export default function login(onSuccess: () => void) {
  showLoading({
    title: "登录中",
  });

  taroLogin({
    success: (res) => {
      if (res.code) {
        console.log(res.code);
        cloud.callFunction({
          name: 'login',
          data: {
            jscode: res.code
          }
        }).then((res) => {
          console.log(res)
          const { openid, session_key } = res
          setStorageSync('login_session', {
            openid
          })
          onSuccess && onSuccess()
          // TODO 登陆后回调
        })
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
