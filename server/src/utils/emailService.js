const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  from: process.env.SMTP_USER,
});

const sendVerificationEmail = async (email, token) => {
  const link = `http://localhost:5173/verify-email?id=${token}`;

  await transporter.sendMail({
    to: email,
    subject: "Potwierdź rejestrację",
    html: `<p>Kliknij, aby potwierdzić swoje konto:</p>
           <a href="${link}">${link}</a>`,
  });
};

module.exports = { sendVerificationEmail };
