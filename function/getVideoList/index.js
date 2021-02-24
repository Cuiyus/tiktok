const cloudbase = require("@cloudbase/node-sdk");

const app = cloudbase.init({});
// 1. 获取数据库引用
const db = app.database();

exports.main = async (event, context) => {
  const res = await db.collection("videoRes").get();
  return {
    res
  };
};