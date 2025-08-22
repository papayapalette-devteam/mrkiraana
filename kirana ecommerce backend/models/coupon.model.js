const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    productType: {
      type: String,
      
    },
    code: {
      type: String,
      
    },
    endTime: {
      type: Date,
      
    },
    discountPercentage: {
      type: Number,
     
     
    },
    minimumAmount: {
      type: Number,
      
      min: 0
    },
    image: {
      type: Array // store the image filename or full URL
    },
    status: {
      type: String,
     
      
      default: 'active'
    }
  },
  { timestamps: true }
);

const CouponModel = mongoose.model('Coupon', couponSchema);

module.exports = CouponModel;