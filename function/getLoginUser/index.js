const cloudbase = require("@cloudbase/node-sdk");

const app = cloudbase.init({});
// 1. 获取数据库引用
const db = app.database();

const _ = db.command;

exports.main = async (event, context) => {
  const res = await db
    .collection("userLogin")
    .where({
      loginStatus: "SignIn"
    })
    .get();
  return {
    res
  };
};