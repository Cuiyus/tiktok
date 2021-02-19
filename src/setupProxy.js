// const proxy = require('http-proxy-middleware');
// module.exports = function (app) {
//     app.use(proxy('/api', {
//         target: "http://39.97.235.139:39003/",
//         pathRewrite: {'^/api': ''},
//         changeOrigin: true
//     }));
// };

// const proxy = require("http-proxy-middleware")
// moudle.exports=function(app){
//   app.use(
//     proxy("^api/",{
//       target:'https://tiktok-2gdyda5xaa901b00-1259343309.ap-shanghai.app.tcloudbase.com',
//       changeOrigin:true,
//       pathRewrite:{"^api/":""}
//     })
//   )
// }

const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "^/api",
    // '/getHomeInfo',
    createProxyMiddleware(
      {
        // target: "http://39.97.235.139:39003/",
        // target: 'http://http://localhost:3000',
        target: 'https://tiktok-2gdyda5xaa901b00-1259343309.ap-shanghai.app.tcloudbase.com',
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    )
  )
};

// const express = require('express')
// const app = express();
// //下载插件 http-proxy-middleware
// const { createProxyMiddleware } = require('http-proxy-middleware');
//
// //代理服务器的操作
// // 设置允许跨域访问该服务器
// app.all('*', function (req,res,next) {
//   res.header('Access-Control-Allow-Origin', '*');//第二个参数是白名单
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   res.header('Access-Control-Allow-Methods', '*');
//   res.header('Content-Type','application/json;charset=utf-8');
//   next();
// });
//
// //中间件 筛子 每个请求来之后 都会转发到target 后端服务器
// app.use(
//   '/',
//   createProxyMiddleware(
//     {
//       target: 'https://tiktok-2gdyda5xaa901b00-1259343309.ap-shanghai.app.tcloudbase.com',
//       changeOrigin: true
//     }
//   )
// );
//
// app.listen(3000);
