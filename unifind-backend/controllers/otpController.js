const nodemailer = require('nodemailer');
const crypto = require('crypto');

// let OTP = ''; 
const otpStore = {};

const sendOTP = async (email) => {
  OTP = crypto.randomInt(100000, 999999).toString(); 

  
  otpStore[email] = { otp: OTP, expiresAt: Date.now() + 5 * 60 * 1000 };

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
    // console.log('OTP sent to email');
    console.log(`✅ OTP sent to ${email}: ${OTP}`);
    return OTP;
  } catch (error) {
    // console.error('Error sending OTP: ', error);
    console.error('❌ Error sending OTP:', error);
    throw new Error('Failed to send OTP');
  }
};

const verifyOTP = (email, otp) => {
  const storedOTP = otpStore[email];
  
  if (!storedOTP) {
    return { success: false, message: "OTP not found or expired" };
  }

  if (storedOTP.otp !== otp) {
    return { success: false, message: "Invalid OTP" };
  }

  if (storedOTP.expiresAt < Date.now()) {
    delete otpStore[email]; 
    return { success: false, message: "OTP expired" };
  }

  delete otpStore[email]; // OTP সফলভাবে যাচাই হলে ডিলিট করে দিচ্ছি
  return { success: true, message: "OTP verified" };
};

// module.exports = { sendOTP };
module.exports = { sendOTP, verifyOTP };
