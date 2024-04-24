const nodemailer = require('nodemailer');
const Cryptr = require('cryptr');
const MailTemplate = require('../mail templates/');
require('dotenv').config();
const cryptr = new Cryptr(process.env.CRYPTR_SECRETKEY);

const sendVerifyUpdateMail = async (to, email, name) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    }
  });
  const mailTemplate = new MailTemplate(name);

  const encryptedEmail = cryptr.encrypt(email);
  const link = `${process.env.BASE_API_URL}/users/update-email/verify/${encryptedEmail}`;
  let info = await transporter.sendMail({
    from: '"Alexandria App" alexandria.library.app@gmail.com',
    to: to,
    subject: 'Verify Email Address',
    html: mailTemplate.getTemplate('verify'),
  });
}

module.exports = sendVerifyUpdateMail;