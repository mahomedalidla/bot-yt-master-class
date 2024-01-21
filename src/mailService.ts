import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

let transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export async function sendMail(to: string, subject: string, text: string) {
  let mailOptions = {
    from: process.env.SMTP_USER,
    to: to,
    subject: subject,
    text: text
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email enviado: ' + info.response);
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
  }
}