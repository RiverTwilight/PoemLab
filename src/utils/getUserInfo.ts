import { cloud } from "@tarojs/taro";

const db = cloud.database()  //获取数据库的引用
const _ = db.command     //获取数据库查询及更新指令

// Lookup不能再
export default async (openid: string): Promise<any>=> {
  try {
    const data = db.collection("user").aggregate().match({
      _openid: openid
    }).addFields({
      ownRoom: _
    }).lookup({
      from: "room",
      localField: "_openid",
      foreignField: "owner",
      as: "ownRoom"
    }).limit(1).end().then(res=>{
      console.log(res)
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};
