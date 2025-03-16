const nodemailer = require('nodemailer');
const crypto = require('crypto');

let OTP = ''; 

const sendOTP = async (email) => {
  OTP = crypto.randomInt(100000, 999999).toString(); 

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, 
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Reset Your Password',
    text: `Your OTP for password reset is ${OTP}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP sent to email');
  } catch (error) {
    console.error('Error sending OTP: ', error);
  }
};

module.exports = { sendOTP };
