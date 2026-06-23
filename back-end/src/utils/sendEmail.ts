import { SMTP_PASS, SMTP_USER } from "@/config";

export async function sendVerificationEmail(email: string, token: string) {
  const nodemailer = require("nodemailer");

  // Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const verificationUrl = `http://localhost:5173/signup/verify?token=${token}`;

  try {
    const info = await transporter.sendMail({
      from: "cheriew02@gmail.com",
      to: email,
      subject: "Verification Link - Blue Login",
      html: `<h1>Verify your email</h1>
      <p>Please verify your email by clicking the link below:</p>
      <a href="${verificationUrl}">${verificationUrl}</a>`,
    });

    console.log(`Message sent: ${info.messageId}`);
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
}
