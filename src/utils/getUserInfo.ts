import { cloud, hideLoading, showLoading } from "@tarojs/taro";

interface IResponse {
  // 用户唯一标识
  OpenID: string;
  ownRoom: string[];
  joinedRoom: string[];
}

interface IReturn extends IResponse {
  OpenID: string;
}

export default async (OpenID: string): Promise<IReturn | undefined> => {
  showLoading({
    title: "获取房间列表",
  });
  try {
    const response = await request({
      url: `https://poem-lab.vercel.app/api/userInfo?openid=${OpenID}`,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  } finally {
    hideLoading();
  }
};
