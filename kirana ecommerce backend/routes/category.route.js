const express = require('express');
const router = express.Router();
const upload = require('../middlewares/fileupload');

// ✅ Import all category controller functions
const {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require('../controllers/category.controller');

// ✅ Routes
router.post('/addcategory', upload.any(), addCategory);               // Add category
router.get('/getcategory', getAllCategories);                        // Get all categories
router.get('/categories/:_id', getCategoryById);                     // Get single category by ID
router.put('/categories/:_id', upload.any(), updateCategory); // Update category
router.delete('/categories/:_id', deleteCategory);                   // Delete category

module.exports = router;
