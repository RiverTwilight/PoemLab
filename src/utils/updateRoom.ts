import { cloud } from "@tarojs/taro";
import { showLoading, hideLoading } from "@tarojs/taro"

const db = cloud.database()  //获取数据库的引用
const _ = db.command     //获取数据库查询及更新指令

export default (roomId: string, newPost: IRoomPost, onSuccess: (res: any) => void): void => {
  showLoading({
    title: "正在发送"
  })
  try {
    db.collection("room").doc(roomId).update({
      data: {
        posts: _.push(newPost)
      },
      success: (res) => {
        console.log(newPost)
        onSuccess && onSuccess(res)
      }
    })
  } catch (error) {
    console.error(error);
  } finally {
    hideLoading()
  }
};
