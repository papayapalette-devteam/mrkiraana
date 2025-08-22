const express =require('express');
const cors = require('cors');
require('dotenv').config();
require('./config');
const bodyParser = require('body-parser');

const app= express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json())

app.get('/',(req,res)=>res.send('user Managment system is running'));
app.use('/api/user',require('./routes/user.route'));
app.use('/api/product',require('./routes/product.route'));
app.use('/api/category',require('./routes/category.route'));
app.use('/api/staff', require('./routes/staff.route'));
app.use('/api/brand', require('./routes/brand.route'));
app.use('/api/coupon', require('./routes/coupon.route'));


app.use('/uploads', express.static('uploads'));


app.listen(process.env.PORT,()=>{console.log(`server listing to PORT ${process.env.PORT} `);
})



