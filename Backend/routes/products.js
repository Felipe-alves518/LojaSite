const express = require('express');
const router = express.Router();
const {getAllProducts, NewProduct,register,login,getCart,addCart,getName,DeleteCart} = require ("../controllers/products")

router.route('/').get(getAllProducts).post(NewProduct);
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/cart').get(getCart)
router.route('/:id').patch(addCart).delete(DeleteCart)
router.route('/name').get(getName)




module.exports = router;