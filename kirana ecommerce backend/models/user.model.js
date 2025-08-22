const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  houseNo: { type: String },
  landmark: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  pincode:{type:String},
  fatherName: { type: String },
  motherName: { type: String },
  password: { type: String, required: true }
}, { timestamps: true });  // fixed 'timestamp' to 'timestamps'

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
