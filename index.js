// *****新建 index.js

//引入 node http模块
var http = require("http");
//引入 gitee-webhook-handler依赖
var createHandler = require("gitee-webhook-handler");
//path： 地址后面路径 http://127.0.0.1:9000/webhooks   secret:填写 gitee || github 配置的webHook密码
var handler = createHandler({ path: "/webhooks", secret: "123456" });

//引入 child_process  创建一个子进程 函数
function run_cmd(cmd, args, callback) {
  var spawn = require("child_process").spawn;
  var child = spawn(cmd, args);
  var resp = "";

  child.stdout.on("data", function (buffer) {
    resp += buffer.toString();
  });
  child.stdout.on("end", function () {
    callback(resp);
  });
}
//创建一个 HTTP 代理服务器
http
  .createServer(function (req, res) {
    // handler  传入 req, res
    handler(req, res, function (err) {
      // 发生错误 error
      res.statusCode = 404;
      res.end("no such location");
    });
  })
  .listen(9000, function () {
    console.log(new Date() + "WebHook启动运行端口：", 9000);
  });
//监听push钩子 时触发函数
handler.on("Push Hook", function (event) {
  // 执行 sh 文件
  console.log("执行server脚本中----");
  run_cmd(
    "sh",
    ["./shell/serverHooks.sh", event.payload.repository.name],
    function (text) {
      console.log("------走了", text);
    }
  );
  console.log(
    "Received a push event for %s to %s",
    event.payload.repository.name,
    event.payload.ref
  );
});
//监听Issue
handler.on("Issue Hook", function (event) {
  console.log(
    "Received an issue event for %s action=%s: #%d %s",
    event.payload.repository.name,
    event.payload.action,
    event.payload.issue.number,
    event.payload.issue.title
  );
});

//监听发生错误
handler.on("error", function (err) {
  console.error("Error:", err.message);
});
