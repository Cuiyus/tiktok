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
  
// 取消关注导致视频收藏数-1
//   const videoinfo = await videoRescoll.doc(_id).get() 
//   const {attentions} = videoinfo
  const cancelattention = await videoRescoll.doc(_id).update({
      attentions:_.inc(-1)
  })
// 取消关注导致当前用户喜欢的视频资源减少
  const videoinfo = await videoRescoll.doc(_id).get() 
  const {videourl} = videoinfo.data
  const cancelvideo = await userInfocoll.where({
      user_id:u_id
  }).update({
      likevideoList:_.pop(videourl)
  })
  // 获取取消关注后的点赞数
  const cur_video = await videoRescoll.doc(_id).get()
  const atte_n = cur_video.data.attentions
  await transaction.commit()

  return {
    _id,
    u_id,
    atte_n
  };
};