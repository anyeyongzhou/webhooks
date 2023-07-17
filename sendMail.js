const nodemailer = require("nodemailer");
const user = "w1354785752@163.com"; //
const smtp = "FIECWWXLIRPRWUJH"; //在邮箱中获取的smtp码

let transporter = nodemailer.createTransport({
  // host: 'smtp.ethereal.email',
  //以下方法都可以使用
  /* service: "163", // 使用了内置传输发送邮件，支持qq、163、Outlook、Gmail、Hotmail、Yahoo */

  host: "smtp.163.com",
  port: 465,
  secureConnection: true, // 使用 SSL
  auth: {
    user: user,
    pass: smtp,
  },
});

function sendMail(message) {
  let mailOptions = {
    from: user, // 发送者
    to: "1354785752@qq.com", // 接收者，多个接受者用,隔开
    subject: "汪全玉的部署通知", // 邮件主题
    html: message, // HTML 邮件内容
    //text: '汪全玉的邮件', // 纯文本邮件内容
  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("发送邮件失败：" + error);
    }
    console.log("邮件发送: %s", info.messageId);
  });
}
module.exports = sendMail;
