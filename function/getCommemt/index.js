const cloudbase = require("@cloudbase/node-sdk");

const app = cloudbase.init({});
// 1. 获取数据库引用
const db = app.database();
const _ = db.command;
exports.main = async (event, context) => {
//   const u_id = event["queryStringParameters"]["user_id"];// 当前登录用户ID
//   const _id = event["queryStringParameters"]["_id"]; // 当前播放视频ID
//   var u_id = event["queryStringParameters"]["user_id"];//
  const transaction = await db.startTransaction()
  const commentcoll = transaction.collection("comment")
  const seccommentcoll = transaction.collection("seccomment")
  const userInfocoll = transaction.collection("userInfo")
  const videoRescoll = transaction.collection('videoRes')
// 返回数据
  
  const anw = {}
  const test = []
// 拉取视频评论
  const videoinfo = await videoRescoll.get()
  const videodata = videoinfo.data
  for (let m=0;m<videodata.length; ++m){
      // 找寻不同视频的评论
      v_id = videodata[m]._id
       const commentinfo = await commentcoll.where({
      video_id:v_id
        }).get()
      const commentdata = commentinfo.data
      const comdata = {}
      for (let i=0;i< commentdata.length;i++) {
      // 获取第一级评论
        const {_id, user_id, content, comment_atte, date} = commentdata[i]
        const seccomment_id = commentdata[i].seccomment_id
        const user_nameinfo  = await userInfocoll.where({
            user_id:user_id
        }).get()
        const user_name = user_nameinfo.data[0].author
        const user_pic = user_nameinfo.data[0].avatar
        const com_atte_n = commentdata[i].comment_atte
      // 获取第二级评论
        const secdata = {}
        for (let j=0;j<seccomment_id.length;j++){
            const secinfo = await seccommentcoll.doc(seccomment_id[j]).get()
            const sec_id = secinfo.data._id
            const secuser_id = secinfo.data.user_id
            const seccontent = secinfo.data.content
            const seccontentdate = secinfo.data.date
            const seccontentatte = secinfo.data.comment_atte
            const secuser_nameinfo  = await userInfocoll.where({
                user_id:secuser_id
            }).get()
                const secusername = secuser_nameinfo.data[0].author
                const secuserpic = secuser_nameinfo.data[0].avatar
                secdata[j] = [secusername,seccontent, seccontentdate, seccontentatte, secuserpic, sec_id]
        }
        comdata[i] = [user_name,content, date, secdata, user_pic,com_atte_n, _id]
        // test.push(secdata)
        // data[i] = [user_name,content, comment_atte ,comment_atte, secdata]
        // cominfo= [user_name,content, comment_atte ,comment_atte, secdata]
  }
  anw[v_id] = comdata
  
       
  }
 
 
  

  await transaction.commit()
  return {
    anw
    // data
    // attentions
  };
};