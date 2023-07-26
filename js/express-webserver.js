/* 使用express模块创建一个web服务器 */

//1.引入express
const express = require("express");
//2.创建应用对象
const app = express();
//3.创建路由规则
//request是对请求报文的封装
//response是对响应报文的封装
app.get("/", (request, response) => {
  //设置响应
  response.send("Hello Express");
});

//ajax请求-不带参数
app.get("/server", (request, response) => {
  //设置响应头
  response.setHeader("Access-Control-Allow-Origin", "*");
  //设置响应体
  response.send("Hello Ajax");
});

//ajax请求-带参数
app.get("/json-server", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  //响应一个数据
  const data = {
    name: "qklxmy",
  };
  response.send(JSON.stringify(data));
});

//jquery-get请求
app.get("/jquery-server", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.send("Hello Jquery Ajax");
});

//jquery-post请求
app.post("/jquery-server-post", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  const data = { name: "111" };
  response.send(JSON.stringify(data));
});

//axios-get请求
app.post("/axios-get", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  //返回值
  response.send("Hello axios");
});

//axios-post请求
app.post("/axios-post", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  //返回值
  const data = { name: "111" };
  response.send(data);
});

//带参数axios-get请求
app.post("/axios-get/params", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  //返回值
  const data = { name: "success" };
  response.send(data);
});

//带参数axios-post请求
app.post("/axios-post/params", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  //返回值
  response.send("success");
});

//promise
app.post("/promise", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  //返回值
  response.send("Hello promise");
});

app.listen(8081, () => {
  console.log("服务器已启用,8081端口监听中...");
});
