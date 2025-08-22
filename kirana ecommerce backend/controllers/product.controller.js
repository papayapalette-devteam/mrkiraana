const ProductModel = require('../models/product.model');
const cloudinary = require('cloudinary').v2;
const fs=require('fs')

// Configure Cloudinary
require('dotenv').config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// ✅ Add a new product
const addProduct = async (req, res) => {
  try {
    const { title, description, price, sku, quantity,  product_quantity, discount, brand, unit, variations, categories, tags, colors } = req.body;

    // const image = req.file ? req.file.filename : null;


    
    const productpic = [];

       // Upload documents to Cloudinary if files exist
    if (req.files && Array.isArray(req.files)) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        productpic.push(result.secure_url);
        
        // Delete local file after upload
        fs.unlink(file.path, err => {
          if (err) console.error(`Failed to delete file: ${file.path}`, err);
        });
      }
    }

    const newProduct = new ProductModel({
      title,
      description,
      price,
      sku,
      quantity,
      product_quantity,
      discount,
      brand,
      unit,
      variations,
      categories,
      tags,
      colors,
      image:productpic
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);

  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params._id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ Update a product
const updateProduct = async (req, res) => {
  try {

       const productpic = [];
       // Upload documents to Cloudinary if files exist
    if (req.files && Array.isArray(req.files)) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        productpic.push(result.secure_url);
        
        // Delete local file after upload
        fs.unlink(file.path, err => {
          if (err) console.error(`Failed to delete file: ${file.path}`, err);
        });
      }
    }
    const updateData = {
      ...req.body,
      image:productpic
 
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(req.params._id, updateData, { new: true });
    if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ Delete a product
const deleteProduct = async (req, res) => {
  try {
    const deleted = await ProductModel.findByIdAndDelete(req.params._id);
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// POST /api/product/bulkupload
const bulkupload= async (req, res) => {
  try {
    const { products } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "No products provided" });
    }

    // Create bulk operations array for upsert (update if exists via SKU, insert new if not)
    const bulkOps = products.map(item => ({
      updateOne: {
        filter: { sku: item.sku },
        update: {
          $set: {
            title: item.title,
            sku:item.sku || "",
            price: Number(item.price) || 0,
            quantity: Number(item.quantity) || 0,
            description:item.description || "",
            unit: item.unit || "",
            discount: Number(item.discount) || 0,
            brand: item.brand || "",
            categories: item.categories || "",          // string field
            tags: item.tags || [],                        // array of arrays as per schema
            colors: item.colors || [],                    // array of arrays as per schema
            updatedAt: new Date()
          }
        },
        upsert: true
      }
    }));

    // Perform bulkWrite operation with upsert option
    const bulkWriteResult = await ProductModel.bulkWrite(bulkOps);

    res.status(200).json({
      message: "Bulk upload successful",
      matchedCount: bulkWriteResult.matchedCount,
      modifiedCount: bulkWriteResult.modifiedCount,
      upsertedCount: bulkWriteResult.upsertedCount
    });
  } catch (error) {
    console.error("Bulk upload error:", error);
    res.status(500).json({ message: "Failed to upload products", error: error.message });
  }
}






module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  bulkupload
};
