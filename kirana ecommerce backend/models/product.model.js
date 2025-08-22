const mongoose = require('mongoose');
const { array } = require('../middlewares/fileupload');

const productSchema = new mongoose.Schema({
  title: { type: String, },                      // Product title
  description: { type: String },                                // Product description
  price: { type: Number,},                      // Product base price
  sku: { type: String, },          // Stock Keeping Unit
  quantity: { type: Number,  },    
  product_quantity: { type: Number,default: 1  },                // Product quantity
  discount: { type: Number, default: 0 },                       // Discount percentage
  brand: { type: String },                                      // Brand name
  unit: { type: String,  },                       // Unit (e.g., piece, kg)
  variations: [
    {
      name: { type: String },                                   // e.g., Size, Material
      options: [{ type: String }]                               // e.g., ['Small', 'Medium', 'Large']
    }
  ],
  image: { type: Array },  // Image URL or path (assuming a single image URL or path)
                                     // Image URL or path
  categories: { type: String },                               // Product categories
  tags: [{ type: Array }],                                     // Product tags
  colors: [{ type: Array }],                                   // Available colors
}, { timestamps: true });                                       // Auto-manage createdAt and updatedAt

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
