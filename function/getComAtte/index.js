const cloudbase = require("@cloudbase/node-sdk");

const app = cloudbase.init({});
// 1. 获取数据库引用
const db = app.database();
const _ = db.command;
exports.main = async (event, context) => {
//   const u_id = event["queryStringParameters"]["user_id"];// 当前登录用户ID
  const c_id = event["queryStringParameters"]["c_id"]; // 当前播放视频ID
  const transaction = await db.startTransaction()
  const comcoll = transaction.collection("comment")

  const addattention = await comcoll.doc(c_id).update({
      comment_atte:_.inc(1)
  })

// 点赞后，获取更新当前视频点赞数并返回
  const cur_com = await comcoll.doc(c_id).get()
  const atte_n = cur_com.data.comment_atte
  await transaction.commit()
  return {
    c_id,
    // addattention,
    
    atte_n
    // attentions
  };
};