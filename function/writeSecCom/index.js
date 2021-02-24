const cloudbase = require("@cloudbase/node-sdk");

const app = cloudbase.init({});
// 1. 获取数据库引用
const db = app.database();
const _ = db.command;
exports.main = async (event, context) => {
  const u_id = event["queryStringParameters"]["user_id"];// 当前登录用户ID
  const c_id = event["queryStringParameters"]["c_id"]; // 当前互动主评论ID
  const s_com = event["queryStringParameters"]["s_com"]; //互动评论内容
//   var u_id = event["queryStringParameters"]["user_id"];//
  const transaction = await db.startTransaction()
  const comInfo = transaction.collection("comment")
  const scomInfo = transaction.collection("seccomment")
// 确定当前时间
// 添加当前的时间
  const date = new Date()
  //   YYYY-mm-dd HH:MM
  let fmt = "mm-dd"
  let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    }; 
// 添加互动评论记录
  const add_scom = await scomInfo.add({
      content:s_com,
      user_id:u_id,
      comment_id:c_id,
      date:fmt,
      comment_atte:0
  })
// 将互动评论ID添加到comment的seccomment_id[]中
  const sec_id = add_scom.id
  const add_secList = await comInfo.doc(c_id).update({
      seccomment_id:_.push(sec_id)
  })
  await transaction.commit()
  return {
    sec_id,
    add_secList
    // attentions
  };
};