// send-test-mail.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "maildev", // nếu app chạy trong compose thì dùng "maildev"
  port: Number(process.env.SMTP_PORT || 1025),
  secure: false,
});

const info = await transporter.sendMail({
  from: '"Forume App" <no-reply@forume.local>',
  to: "test@example.com",
  subject: "MailDev works 🎉",
  html: "<h1>Hello</h1><p>This is a dev email captured by MailDev.</p>",
  text: "Hello - dev email",
});

console.log("Sent:", info.messageId);
