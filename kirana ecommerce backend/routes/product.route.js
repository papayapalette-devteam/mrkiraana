const express = require('express');
const router = express.Router();
const upload = require('../middlewares/fileupload');

// ✅ Import all product controller functions
const {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  bulkupload,
  getAllCategories,
  getProductsByCategory
} = require('../controllers/product.controller');

// ✅ Routes
router.post('/', upload.any(), addProduct); 
router.post('/bulkupload', bulkupload); // Add product
router.get('/getproduct', getAllProducts);            // Get all products
router.get('/products/:_id', getProductById);         // Get single product by ID
router.put('/products/:_id', upload.any(), updateProduct); // Update product
router.delete('/products/:_id', deleteProduct);       // Delete product
router.get('/get-categories', getAllCategories); 
router.get('/get-categories-products/:categories', getProductsByCategory); 

module.exports = router;
