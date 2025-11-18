const mongoose = require ('mongoose');


const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        unique:true,
        required:[true,'must provide a name'],
        trim:true,
        maxlength: [20,'no more than 20 characters']

    },
    password:{
        type: String,
        required:[true,'must provide a password'],
        trim:true,
        maxlength: [20,'no more than 20 characters']
    },
    cart:[{
        name:{
            type:String,
            trim:true,
            maxlength: [20,'no more than 20 characters']
        },
        image:{
            type:String,
        },
        price:{
            type: Number,
        }
    }

    ]




});

module.exports = mongoose.model('user',UserSchema)