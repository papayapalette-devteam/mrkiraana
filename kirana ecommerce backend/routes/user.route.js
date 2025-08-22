const express = require('express');
const { registerUser, loginUser, resetPassword,sendResetEmail,setNewPassword, updateuser, getprofilebyemail, getusers } = require('../controllers/user.controller'); // replaced updatePassword with resetPassword
const {addcustomerorder,viewallorders, deleteorder} = require('../controllers/customerorder');
const router = express.Router();

// Register route
router.post('/registration', registerUser);
router.get('/getusers/',getusers)
router.put('/updateuser/:email',updateuser)
router.get('/getuserprofile/:email',getprofilebyemail)
// Reset password route (forget password)
router.put('/password', resetPassword);

// Login route
router.post('/login', loginUser);




router.post('/forgot-password', sendResetEmail); // 👈 Add this route
router.post('/set-new-password', setNewPassword); // ✅ Add this route


router.post('/customerorder',addcustomerorder)
router.get('/viewallorders',viewallorders)
router.delete('/deleteorder/:_id',deleteorder)
module.exports = router;