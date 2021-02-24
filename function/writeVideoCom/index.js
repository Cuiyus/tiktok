const cloudbase = require("@cloudbase/node-sdk");

const app = cloudbase.init({});
// 1. 获取数据库引用
const db = app.database();
const _ = db.command;
exports.main = async (event, context) => {
  const u_id = event["queryStringParameters"]["user_id"];// 当前登录用户ID
  const _id = event["queryStringParameters"]["_id"]; // 当前播放视频ID
  const v_com = event["queryStringParameters"]["v_com"]; //对当前视频的一级评论
//   var u_id = event["queryStringParameters"]["user_id"];//
  const transaction = await db.startTransaction()
  const comInfo = transaction.collection("comment")
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

// 添加评论记录
  const add_vcom = await comInfo.add({
      comment_atte:0,
      content:v_com,
      seccomment_id:[],
      user_id:u_id,
      video_id:_id,
      date:fmt
  })
 
  await transaction.commit()
  return {
    add_vcom
    // attentions
  };
};