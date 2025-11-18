const mongoose = require ('mongoose');


const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'must provide a name'],
        trim:true,
        maxlength: [20,'no more than 20 characters']
    },
    image:{
        type:String,
        required:[true,'must provide a image'],
    },
    price:{
        type: Number,
        required:[true,'must provide a price']
    }




});


module.exports = mongoose.model('Products',ProductSchema);
