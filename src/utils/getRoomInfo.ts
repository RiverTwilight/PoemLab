import { request } from "@tarojs/taro";

export default async (RoomId: number): Promise<roomData | undefined> => {
  try {
    const response = await request({
      url: `https://poem-lab.vercel.app/api/roomInfo/roomId=${RoomId}`,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
