/* 使用http模块创建一个web服务器 */
const http = require("http");
// 创建 web 服务器实例
const server = http.createServer();
// 为服务器实例绑定 request 事件，监听客户端的请求
server.on("request", function (req, res) {
  const url = req.url;
  const method = req.method;
  const str = `Your request url is ${url}, and request method is ${method}`;
  console.log(str);
  // 设置 Content-Type 响应头，解决中文乱码的问题
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  // 解决跨域问题
  res.setHeader("Access-Control-Allow-Origin", "*");
  // 向客户端响应内容
  res.end(str);
});
//启动服务器
server.listen(8080, function () {
  console.log("服务运行在8080端口");
});
