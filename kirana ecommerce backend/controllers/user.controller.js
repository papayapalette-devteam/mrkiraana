

const UserModel=require('../models/user.model');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');



const registerUser=async (req,res) => {
    try {
  
        const {name,email,password}=req.body;
        if(!name || !email || !password){
            return res.status(400).send({message:"All Fields are mandatory"})
        }
        // const newUser=new UserModel({name,email,password,phone_number,address,house_no,landmark,city,state,country,father_name,mother_name});
         const newUser=new UserModel({name,email,password});
        const resp=await newUser.save();
        return res.status(201).send({ message: 'Registered successfully', user: resp });
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({error:"Error Occured"})
    }
    
}

const updateuser=async (req,res) => {
    try {
        const email=req.params.email
        const resp= await UserModel.findOneAndUpdate({ email: email }, req.body, { new: true })
        return res.status(200).send({ message: 'User Updated successfully'});
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({error:"Error Occured"})
    }
    
}

const getprofilebyemail=async (req,res) => {
    try {
        const email=req.params.email
        const resp= await UserModel.findOne({ email: email })
        return res.status(200).send({ message: 'User get successfully',user:resp});
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({error:"Error Occured"})
    }
    
}

const getusers=async (req,res) => {
    try {
        const resp= await UserModel.find()
        return res.status(200).send({ message: 'User get successfully',user:resp});
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({error:"Error Occured"})
    }
    
}


const loginUser= async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: 'Email and Password are mandatory' });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    return res.status(200).send({ message: 'Login successful', user });

  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Error occurred' });
  }
} 


// reset PASSWORD
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).send({ message: 'Email and new password are mandatory' });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password in DB
    user.password = hashedNewPassword;
    await user.save();

    return res.status(200).send({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(500).send({ error: 'Internal server error' });
  }
};




const sendResetEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({ message: 'Email is required' });
  }

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Define reset link (later you can generate a token)
   const resetLink = `http://localhost:3000/SetPassword`;


    // Setup nodemailer transport
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can use other services like SendGrid, Outlook, etc.
      auth: {
        user: 'bharatproperties570@gmail.com',
        pass: 'thpf pvbb pwfn idvf', // ⚠️ Use Gmail app password, NOT your actual Gmail password
      },
    });

    const mailOptions = {
      from: 'bharatproperties570@gmail.com',
      to: email,
      subject: 'Reset Your Password',
      html: `
        <p>Hi ${user.name || ''},</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link will expire in 15 minutes.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send({ message: 'Reset password email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).send({ error: 'Failed to send reset email' });
  }
};

const setNewPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).send({ message: 'Email and new password are required' });
  }

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    res.status(200).send({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Set new password error:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};






module.exports={registerUser,loginUser,resetPassword, sendResetEmail,setNewPassword,updateuser,getprofilebyemail,getusers}