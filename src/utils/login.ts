import { showLoading, request, hideLoading, login as taroLogin } from "@tarojs/taro";

export default function login() {
  showLoading({
    title: "登录中",
  });

  taroLogin({
    success: (res) => {
      if (res.code) {
        console.log(res.code);
        //发起网络请求
        request({
          url: `https://poem-lab.vercel.app/api/login?jscode=${res.code}`,
        });
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
