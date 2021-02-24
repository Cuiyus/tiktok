const cloudbase = require("@cloudbase/node-sdk");

const app = cloudbase.init({});
// 1. 获取数据库引用
const db = app.database();
const _ = db.command;
exports.main = async (event, context) => {
//   const u_id = event["queryStringParameters"]["user_id"];// 当前登录用户ID
  const sec_id = event["queryStringParameters"]["sec_id"]; // 当前视频评论ID
  const transaction = await db.startTransaction()
  const seccomcoll = transaction.collection("seccomment")

  const addattention = await seccomcoll.doc(sec_id).update({
      comment_atte:_.inc(1)
  })

// 点赞后，获取更新当前视频点赞数并返回
  const cur_com = await seccomcoll.doc(sec_id).get()
  const atte_n = cur_com.data.comment_atte
  await transaction.commit()
  return {
    sec_id,
    // addattention,
    atte_n
    // attentions
  };
};