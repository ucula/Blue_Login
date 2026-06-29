import { CLIENT_URL, SMTP_PASS, SMTP_USER } from "@/config";

export async function sendVerificationEmail(email: string) {
  const nodemailer = require("nodemailer");

  // Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "cheriew02@gmail.com",
      pass: "fpdj qfup mmqj trlo",
    },
  });

  // const verificationUrl = `${CLIENT_URL}${path}?token=${token}`;

  try {
    const info = await transporter.sendMail({
      from: "cheriew02@gmail.com",
      to: email,
      subject: "ปริศนาฟ้าเเว๊บๆ",
      html: `<h1>คำถาม</h1>
      <p>ถ้าอินชอบฮันนี่เเล้วเจิ้นชอบอินเเล้วฮันนี่ชอบเบิ้ลเเล้วเบิ้ลชอบสั่งข้าวเเละเจิ้นชอบเบิ้ล สรุปใครชอบเจิ้น</p>`,
    });

    console.log(`Message sent: ${info.messageId}`);
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
}

for (let i = 0; i < 5; i++) sendVerificationEmail("anuth.indy@gmail.com");
