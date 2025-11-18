const CustomAPIError = require('../errors/custom-error');
const Products = require ('../models/products');
const User = require ('../models/user');
const jwt = require('jsonwebtoken');


const getAllProducts = async (req,res) =>{
    const {name} = req.query;
    const queryObject = {};

    if(name){
        queryObject.name = { $regex: name, $options: 'i' };
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page-1) * limit;

    const findProduct = await Products.find(queryObject).skip(skip).limit(limit);
    res.status(200).json(findProduct);
    
    
    
}

const NewProduct = async (req,res) =>{

    const addProduct = await Products.create(req.body);
    res.status(201).json({addProduct})   

}

const login = async (req,res) => {
    const {username, password} = req.body
    const findTheUser = await User.findOne({username:username,password:password})

    if (!findTheUser){
         throw new CustomAPIError('this account does not exist', 400)

    }

    const token = jwt.sign({userId:findTheUser._id,name:findTheUser.name},process.env.jwtSecret,{expiresIn:'30d'})

    res.status(201).json({token, findTheUser})



}

const register = async (req,res) => {
    const {username, password} = req.body

    if (!username || !password){
        throw new CustomAPIError('Please provide email and password', 400)

    }

    const NewUser = await User.create({...req.body})

    NewUser.validate()

    const token = jwt.sign({userId:NewUser._id,name:NewUser.username},process.env.jwtSecret,{expiresIn:'30d'})
    res.status(201).json({token})
    console.log(NewUser);
        
    



}


const getCart = async (req,res) => {
    const authHeader = req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new CustomAPIError('No token provided', 401)
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token,process.env.jwtSecret)
        const userFind = await User.find({_id:decoded.userId})
        res.json({cart:userFind[0].cart})
        
    
        
    } catch (error) {
        throw new CustomAPIError('Not authorized', 401)
    }




}


const addCart = async (req,res) => {
    //get auth header
    const authHeader = req.headers.authorization;
    const {id: productId} = req.params;

    const findProduct = await Products.find({_id:productId})
    
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new CustomAPIError('No token provided', 401)
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token,process.env.jwtSecret)
        const userFind = await User.find({_id:decoded.userId})
        const patchCart = await User.findOneAndUpdate({_id: userFind}, {$push:{cart:findProduct}});
        res.json({patchCart})
        
    
        
    } catch (error) {
        throw new CustomAPIError('Not authorized', 401)
    }

}

const DeleteCart = async (req,res) => {
    //get auth header
    const authHeader = req.headers.authorization;
    const {id: productId} = req.params;

    
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new CustomAPIError('No token provided', 401)
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token,process.env.jwtSecret)
        const findUser = await User.findOne({_id:decoded.userId})
        const patchCart = await User.findOneAndUpdate({_id:findUser._id}, {$pull:{cart:{_id:productId}}});
        res.json({patchCart})
        
    
        
    } catch (error) {
        throw new CustomAPIError('Not authorized', 401)
    }

}

const getName = async (req, res) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new CustomAPIError('No token provided', 401)
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token,process.env.jwtSecret)
        const userFind = await User.findOne({_id:decoded.userId})
        res.json({name:userFind.username})
    } catch (error) {
        throw new CustomAPIError('Not authorized', 401)
    }



}






module.exports ={
getAllProducts,
NewProduct,
register,
login,
getCart,
addCart,
getName,
DeleteCart

};