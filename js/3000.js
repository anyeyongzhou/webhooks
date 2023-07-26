/* 简单的http服务器，用于开启3000端口测试，当别的服务器访问本服务器的3000端口时窗口打印信息 */

let http = require("http");
http
  .createServer(function (req, res) {
    console.log(req.headers);
    res.end("3000");
  })
  .listen(3000, function () {
    console.log("已经成功监听3000端口");
  });
