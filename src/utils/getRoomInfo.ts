import { cloud } from "@tarojs/taro";
import { showLoading, hideLoading } from "@tarojs/taro"
const db = cloud.database()  //获取数据库的引用
const _ = db.command     //获取数据库查询及更新指令

export default (roomId: string, onSuccess: (res: any) => void): void => {
  showLoading({
    title: "正在磨墨"
  })
  try {
    db.collection("room").where({
      _id: roomId
    }).field({
      memberNum: true,
      roomName: true,
      posts: true,
      description: true,
      _id: true
    }).limit(1).get().then(res => {
      onSuccess && onSuccess(res)
    })
  } catch (error) {
    console.error(error);
  } finally {
    hideLoading()
  }
};
