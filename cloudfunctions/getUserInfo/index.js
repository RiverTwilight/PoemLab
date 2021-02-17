// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(23)
  return await db.collection("user").aggregate().match({
    _openid: event.openid
  }).lookup({
    from: "room",
    localField: "_openid",
    foreignField: "owner",
    as: "ownRoom"
  }).limit(1).end().then(res => console.log(res));
}