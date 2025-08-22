const customerorder = require('../models/order');
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
const addcustomerorder = async (req, res) => {
  try {
    const{firstName,lastName,address,city,state,postcode,email,phone,notes,shipping,payment, cardNumber,order_details,total_amount} = req.body;

     const orderCount = await customerorder.countDocuments();
    const newOrderId = `ORD${String(orderCount + 1).padStart(5, '0')}`; 

    const neworder = new customerorder({order_id: newOrderId,firstName,lastName,address,city,state,postcode,email,phone,notes,shipping,payment, cardNumber,order_details,total_amount});

    const saveorder = await neworder.save();
    res.status(200).json(saveorder);

  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const viewallorders = async (req, res) => {
  try {
  
    const orders = await customerorder.find()
    res.status(200).json(orders);

  } catch (error) {
    console.error('Error getting product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const deleteorder = async (req, res) => {
  try {
    const id=req.params._id
    const orders = await customerorder.findByIdAndDelete({_id:id})
    res.status(200).json("order deleted...");

  } catch (error) {
    console.error('Error getting product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports={addcustomerorder,viewallorders,deleteorder}