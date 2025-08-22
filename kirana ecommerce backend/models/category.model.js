const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  }, // Category name
  
  parent: { 
    type: String, 
    default: null 
  }, // Optional parent category name

 children: { type: String }, // 🔁 was: [String] Single string value (could be comma separated)
 // List of child category names

  description: { 
    type: String, 
    trim: true 
  }, // Optional category description

  image: { 
    type: Array 
  } // Optional image path or URL

}, { timestamps: true });

const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;
