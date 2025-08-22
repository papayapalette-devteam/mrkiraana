const express = require('express');
const router = express.Router();
const upload = require('../middlewares/fileupload');
const {
  addCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
} = require('../controllers/coupon.controller');

// ✅ Routes for coupon operations
router.post('/addcoupon', upload.any(), addCoupon);
router.get('/getcoupons', getAllCoupons);
router.get('/:id', getCouponById); // Get coupon by ID
router.put('/:id', upload.any(), updateCoupon); // Update coupon by ID
router.delete('/:id', deleteCoupon); // Delete coupon by ID

module.exports = router;
