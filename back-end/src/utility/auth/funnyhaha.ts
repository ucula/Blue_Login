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
      subject: "",
      html: `<h1></h1>
      <p></p>`,
    });

    console.log(`Message sent: ${info.messageId}`);
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
}

sendVerificationEmail("anuth.indy@gmail.com");
