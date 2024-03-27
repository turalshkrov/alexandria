const nodemailer = require('nodemailer');
const Cryptr = require('cryptr');
require('dotenv').config();
const cryptr = new Cryptr(process.env.CRYPTR_SECRETKEY);

const sendVerifyUpdateMail = async (to, email) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    }
  });

  const encryptedEmail = cryptr.encrypt(email);
  const link = `${process.env.BASE_API_URL}/users/update-email/verify/${encryptedEmail}`;
  let info = await transporter.sendMail({
    from: '"Alexandria App" alexandria.library.app@gmail.com',
    to: to,
    subject: 'Verify Email Address',
    html: "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
  });
}

module.exports = sendVerifyUpdateMail;