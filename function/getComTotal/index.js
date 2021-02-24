const cloudbase = require("@cloudbase/node-sdk");

const app = cloudbase.init({});
// 1. 获取数据库引用
const db = app.database();
const _ = db.command;
exports.main = async (event, context) => {
//   const u_id = event["queryStringParameters"]["user_id"];// 当前登录用户ID
  const v_id = event["queryStringParameters"]["v_id"]; // 当前播放视频ID
  const transaction = await db.startTransaction()
  const comcoll = transaction.collection("comment")
  const seccomcoll = transaction.collection("seccomment")

  const com = await comcoll.where({
      video_id:v_id
  }).get()
  const com_n = com.data.length
  let seccom_n = 0
  for (let i=0;i<com.data.length;i++){
      const n = com.data[i].seccomment_id.length
      seccom_n += n
  } 
  const total = com_n + seccom_n

  await transaction.commit()
  return {
    com_n,
    seccom_n,
    total
    // attentions
  };
};