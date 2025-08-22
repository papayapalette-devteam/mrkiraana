const BrandModel = require('../models/brand.model');
const cloudinary = require('cloudinary').v2;
const fs=require('fs')



require('dotenv').config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// ✅ Add new brand
const addBrand = async (req, res) => {
  try {
    const { name, email, website, location, description, status } = req.body;
    const brandpic = [];

       // Upload documents to Cloudinary if files exist
    if (req.files && Array.isArray(req.files)) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        brandpic.push(result.secure_url);
        
        // Delete local file after upload
        fs.unlink(file.path, err => {
          if (err) console.error(`Failed to delete file: ${file.path}`, err);
        });
      }
    }

    if (!name || !email || !status ) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    const newBrand = new BrandModel({
      name,
      email,
      website,
      location,
      description,
      status,
      image:brandpic,
    });

    const savedBrand = await newBrand.save();
    res.status(201).json(savedBrand);
  } catch (error) {
    console.error('Error adding brand:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ Get all brands
const getAllBrands = async (req, res) => {
  try {
    const brands = await BrandModel.find();
    res.status(200).json(brands);
  } catch (error) {
    console.error('Error fetching brands:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ Get brand by ID
const getBrandById = async (req, res) => {
  try {
    const brand = await BrandModel.findById(req.params.id);
    if (!brand) return res.status(404).json({ error: 'Brand not found' });
    res.status(200).json(brand);
  } catch (error) {
    console.error('Error fetching brand by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ Update brand
const updateBrand = async (req, res) => {
  try {
    const { name, email, website, location, description, status } = req.body;
        const brandpic = [];

       // Upload documents to Cloudinary if files exist
    if (req.files && Array.isArray(req.files)) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        brandpic.push(result.secure_url);
        
        // Delete local file after upload
        fs.unlink(file.path, err => {
          if (err) console.error(`Failed to delete file: ${file.path}`, err);
        });
      }
    }

        const updateData = {...req.body,image:brandpic}


    const updatedBrand = await BrandModel.findByIdAndUpdate(
      req.params.id,updateData,{ new: true }
    );

    if (!updatedBrand) return res.status(404).json({ error: 'Brand not found' });
    res.status(200).json(updatedBrand);
  } catch (error) {
    console.error('Error updating brand:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ Delete brand
const deleteBrand = async (req, res) => {
  try {
    const deleted = await BrandModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Brand not found' });
    res.status(200).json({ message: 'Brand deleted successfully' });
  } catch (error) {
    console.error('Error deleting brand:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  addBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand
};
