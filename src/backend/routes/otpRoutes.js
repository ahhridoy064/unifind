const express = require("express");
const User = require("../models/User");
const OTP = require("../models/OTP");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const router = express.Router();

// Send OTP
router.post("/send-otp", async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const otpCode = Math.floor(100000 + Math.random() * 900000);

    const otp = new OTP({ email, otpCode, expiresAt: Date.now() + 10 * 60000 });
    await otp.save();

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL, pass: process.env.PASSWORD }
    });

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP code is ${otpCode}. It will expire in 10 minutes.`
    });

    res.json({ message: "OTP sent successfully" });
});

// Verify OTP & Reset Password
router.post("/verify-otp", async (req, res) => {
    const { email, otpCode, newPassword } = req.body;
    const otp = await OTP.findOne({ email, otpCode });

    if (!otp || otp.expiresAt < Date.now()) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ email }, { password: hashedPassword });
    await OTP.deleteOne({ email });

    res.json({ message: "Password reset successfully" });
});

module.exports = router;
