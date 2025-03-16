require("dotenv").config();
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const schoolRoutes = require('./routes/schoolRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const bcrypt = require('bcrypt');
const { sendOTP } = require('./controllers/otpController');
const User = require('./models/User'); 

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

//mongoose.connect(mongoDB)


// .env থেকে MongoDB URI নেওয়া
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("MongoDB URI is missing! Check your .env file.");
  process.exit(1); // সার্ভার বন্ধ করে দাও, কারণ DB কানেকশন ছাড়া কাজ করবে না
}

// MongoDB-তে কানেক্ট করা
// mongoose
//   .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("✅ MongoDB Connected Successfully!"))
//   .catch((err) => {
//     console.error("❌ MongoDB Connection Failed:", err);
//     process.exit(1);
//   });


const otpCache = {}; 

app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    
    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ success: false, message: 'Server error during registration' });
  }
});

app.post('/api/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = await sendOTP(email);
  otpCache[email] = otp; 
  res.json({ message: 'OTP sent to your email' });
});

app.post('/api/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  if (otpCache[email] === otp) {
    delete otpCache[email];
    res.json({ message: 'OTP verified, you can now set a new password' });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
});


app.post('/api/set-new-password', async (req, res) => {
  const { newPassword, email } = req.body;

  try {
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);


    await User.findOneAndUpdate({ email }, { password: hashedPassword });

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('Password reset error:', err);
    res.status(500).json({ message: 'Error updating password' });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/schools', schoolRoutes);
app.use('/api/reviews', reviewRoutes);


app.get('/api/test', (req, res) => {
  res.send('API is working!');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));