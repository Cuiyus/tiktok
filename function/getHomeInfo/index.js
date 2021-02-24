const cloudbase = require('@cloudbase/node-sdk')
const app = cloudbase.init({})
// 1. 获取数据库引用
const db = app.database()
const _ = db.command;

exports.main = async (event, context) => {
  const transaction = await db.startTransaction()
  const homeInfocoll = transaction.collection('homeInfo')
  const videoRescoll = transaction.collection('videoRes')
  const userlogincoll = transaction.collection('userLogin')
  const userinfocoll = transaction.collection('userInfo')
  const comcoll = transaction.collection("comment")
  const seccomcoll = transaction.collection("seccomment")

// 判断当前用户是否为创作者粉丝
  // 获取登录用户ID
  const userlogininfo = await userlogincoll.where({
      loginStatus:"SignIn"
  }).get()
  const userinfo = userlogininfo.data[0] //获取第一条记录，因为登录的用户只有一位
  const user_id= userinfo.user_id
  const likevideoList = await userinfocoll.where({
      user_id:user_id
  }).get()
  const likevideoListdata = likevideoList.data[0].likevideoList
  
  // 获取播放视频ID还有对应创作者ID
  const videoinfo = await videoRescoll.get()

  const videodata = videoinfo.data

  const data = {}
  var videourl,u_id, atte_n, share_n
  var likeflag = fansflag = false
  for (let i = 0; i < videodata.length; ++i){
      videourl = videodata[i].videourl
      u_id = videodata[i].user_id
        const fansinfo = await userinfocoll.where({
         user_id:u_id
      }).get()
      const fansdata = fansinfo.data[0].fansList

      for (let j = 0;j < likevideoListdata.length;j++){
          if (videourl == likevideoListdata[j]){
              likeflag = true
              break
          }else{
              likeflag = false
          }
      }
      
      for (let j = 0;j < fansdata.length;j++){
          if (user_id  == fansdata[j]){
              fansflag = true
              break
          }else{
              fansflag = false
          }
      }
      _id = videodata[i]._id
      u_id = videodata[i].user_id
      atte_n = videodata[i].attentions
      avatarurl = videodata[i].avatar
      share_n = videodata[i].share
      bgm = videodata[i].bgm
      description = videodata[i].description
      author =  videodata[i].author
      bgm_pic = videodata[i].bgm_pic

      const com = await comcoll.where({
      video_id:_id
        }).get()
        const com_n = com.data.length
        let seccom_n = 0
        for (let i=0;i<com.data.length;i++){
            const n = com.data[i].seccomment_id.length
            seccom_n += n
        } 
        const total = com_n + seccom_n

      data[i] = [_id, u_id, avatarurl, atte_n, total, videourl, likeflag, fansflag, author,bgm, description, bgm_pic]
  }
  
   
  await transaction.commit()

  return {
      data
  };
};