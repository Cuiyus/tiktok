const cloudbase = require("@cloudbase/node-sdk");

const app = cloudbase.init({});
// 1. 获取数据库引用
const db = app.database();
const _ = db.command;
exports.main = async (event, context) => {
  const u_id = event["queryStringParameters"]["user_id"];// 当前登录用户ID
  const _id = event["queryStringParameters"]["_id"]; // 当前播放视频ID
//   var u_id = event["queryStringParameters"]["user_id"];//
  const transaction = await db.startTransaction()
  const videoRescoll = transaction.collection("videoRes")
  const userInfocoll = transaction.collection("userInfo")
 // 获取视频的创作者的用户ID 
  const videoinfo = await videoRescoll.doc(_id).get()
  const {user_id} = videoinfo.data 
  // 将登录用户ID计入粉丝
  const addfans = await userInfocoll.where({
      user_id:user_id
  }).update({
       fansList:_.push(u_id)
  })
  await transaction.commit()
  return {
      user_id,
      u_id,
    addfans
    // attentions
  };
};