
const mongoose = require("mongoose");

const vendorlistSchema = new mongoose.Schema({
    name:{type:String,required:true},
    paymentDate:{type:String ,required:true},
    orderId:{type:String ,required:true},
    location:{type:String ,required:true},
    status:{type:Boolean ,required:true},
    payment:{type:Number ,required:true},
})

const vendorModel =  mongoose.model("vendorlist",vendorlistSchema);

module.exports = {vendorModel}


