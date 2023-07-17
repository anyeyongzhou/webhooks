let http = require("http");
let crypto = require("crypto");
let dayjs = require("dayjs");
var spawn = require("child_process").spawn;
let sendMail = require("./sendMail");
const SECRET = "123456";
function sign(data) {
  return "sha1=" + crypto.createHmac("sha1", SECRET).update(data).digest("hex");
}
let server = http.createServer(function (req, res) {
  console.log(req.method, req.url);
  if (req.url == "/webhook" && req.method == "POST") {
    let buffers = [];
    req.on("data", function (data) {
      buffers.push(data);
    });
    req.on("end", function () {
      let body = Buffer.concat(buffers);
      let sig = req.headers["x-hub-signature"];
      let event = req.headers["x-github-event"];
      let id = req.headers["x-github-delivery"];
      if (sig !== sign(body)) {
        return res.end("Not Allowed");
      }
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ ok: true }));
      //===========分割线===================
      if (event === "push") {
        //开始部署
        // 获取当前时间戳
        let nowTimestamp = dayjs().valueOf();
        let payload = JSON.parse(body);
        let child = spawn("sh", [`./${payload.repository.name}.sh`]);
        console.log(payload.repository.name + "项目开始自动部署");
        let buffers = [];
        child.stdout.on("data", function (buffer) {
          buffers.push(buffer);
        });
        child.stdout.on("end", function () {
          console.log(payload.repository.name + "项目部署结束");
          let logs = Buffer.concat(buffers).toString();
          let date = dayjs().format("YYYY年M月D日 HH:mm:ss");
          // 获取当前时间戳
          let nowTimestamp_1 = dayjs().valueOf();
          let formattedDate = dayjs(nowTimestamp_1 - nowTimestamp).format(
            "HH:mm"
          );
          sendMail(`
            <h1>部署日期: ${date}</h1>
            <h2>部署人: ${payload.pusher.name}</h2>
            <h2>部署时长: ${formattedDate}</h2>
            <h2>部署邮箱: ${payload.pusher.email}</h2>
            <h2>提交信息: ${
              payload.head_commit && payload.head_commit["message"]
            }</h2>
            <h2>布署日志: ${logs.replace("\r\n", "<br/>")}</h2>
        `);
        });
      }
    });
  } else {
    res.end("Now Found!");
  }
});
server.listen(4000, () => {
  console.log("webhook服务正在4000端口上启动!");
});
