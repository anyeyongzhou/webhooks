var http = require("http");
let server = http.createServer(function (req, res) {
  console.log(req.method, req.url);
  if (req.method == "POST" && req.url == "/wenhool") {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ ok: true }));
  }
});
server.listen(4000, function () {
  console.log(new Date() + "wenhook服务在4000端口启动", 4000);
});
