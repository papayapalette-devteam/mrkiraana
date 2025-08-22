const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    
    },

    email: {
      type: String,
    
    },

    website: {
      type: String,
      
    },

    location: {
      type: String,
     
    },

    description: {
      type: String,
     
    },

    status: {
      type: String,
    
    },

    image: {
      type: Array, // store the image filename or full URL
      
    }
  },
  { timestamps: true }
);

const BrandModel = mongoose.model('Brand', brandSchema);

module.exports = BrandModel;
