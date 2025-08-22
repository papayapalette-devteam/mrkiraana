const CategoryModel = require('../models/category.model');
const cloudinary = require('cloudinary').v2;
const fs=require('fs')




// Configure Cloudinary
require('dotenv').config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
// ✅ Add a new category
const addCategory = async (req, res) => {
  try {
    const { name, parent, children, description } = req.body;


    
      const catpic = [];
    
           // Upload documents to Cloudinary if files exist
        if (req.files && Array.isArray(req.files)) {
          for (const file of req.files) {
            const result = await cloudinary.uploader.upload(file.path);
            catpic.push(result.secure_url);
            
            // Delete local file after upload
            fs.unlink(file.path, err => {
              if (err) console.error(`Failed to delete file: ${file.path}`, err);
            });
          }
        }

    // Directly store children as string (e.g., "Shoes,Slippers")
    const newCategory = new CategoryModel({
      name,
      parent,
      children,  // assumed to be a string now
      description,
      image:catpic
    });

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ Get single category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params._id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.status(200).json(category);
  } catch (error) {
    console.error('Error fetching category by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ Update a category
const updateCategory = async (req, res) => {
  try {
    const { name, parent, children, description } = req.body;

          const catpic = [];
    
           // Upload documents to Cloudinary if files exist
        if (req.files && Array.isArray(req.files)) {
          for (const file of req.files) {
            const result = await cloudinary.uploader.upload(file.path);
            catpic.push(result.secure_url);
            
            // Delete local file after upload
            fs.unlink(file.path, err => {
              if (err) console.error(`Failed to delete file: ${file.path}`, err);
            });
          }
        }

        const updatedata={
          ...req.body,
          image:catpic
        }

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      req.params._id,updatedata,{ new: true });

    if (!updatedCategory) return res.status(404).json({ error: 'Category not found' });
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ Delete a category
const deleteCategory = async (req, res) => {
  try {
    const deleted = await CategoryModel.findByIdAndDelete(req.params._id);
    if (!deleted) return res.status(404).json({ error: 'Category not found' });
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};
