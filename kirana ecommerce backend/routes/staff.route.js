const express = require('express');
const router = express.Router();
const upload = require('../middlewares/fileupload'); // Multer middleware for image upload

// ✅ Import controller functions
const {
  addStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff
} = require('../controllers/staff.controller');

// ✅ Routes
router.post('/addstaff', upload.any(), addStaff);              // Add staff/admin
router.get('/getstaff', getAllStaff);                                    // Get all staff
router.get('/staff/:_id', getStaffById);                                 // Get staff by ID
router.put('/staff/:_id', upload.any(), updateStaff);          // Update staff
router.delete('/staff/:_id', deleteStaff);                               // Delete staff

module.exports = router;
