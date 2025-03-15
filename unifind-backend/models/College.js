const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  institution:{type:String,required:true},
  type: { type: String, required: true, enum: ['government', 'non-government'] },
  division: { type: String, required: true },
  location: { type: String, required: true },
  googleMapLink: { type: String, required: false }, // ✅ Optional Google Map Link
  contact: {
    phone: { type: String, required: true },
    email: { type: String, required: false }, // ✅ Optional Email
    website: { type: String, required: false }, // ✅ Optional Website
  },
  programs: [{ type: String, required: false }], // ✅ Optional Programs
   admissionRequirements: { type: String, required: false }, // ✅ Optional Admission Requirements
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review', default: [] }], // ✅ Default empty array
  logo: { type: String, required: true },
});

module.exports = mongoose.model('College', schoolSchema);
