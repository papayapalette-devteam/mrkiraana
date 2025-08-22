const mongoose=require('mongoose')

const orderschema=new mongoose.Schema({
    order_id:{type:String},
    firstName: {type:String},
    lastName:  {type:String},
    address: {type:String},
    city:  {type:String},
    state:  {type:String},
    postcode:  {type:String},
    email:  {type:String},
    phone:  {type:String},
    notes: {type:String},
    shipping:  {type:String},
    payment:  {type:String}, 
    cardNumber:  {type:String},
    order_details: {type:Array},
    total_amount:{type:String}
},{timestamps:true})

const customerorder=mongoose.model('customerorder',orderschema)
module.exports=customerorder