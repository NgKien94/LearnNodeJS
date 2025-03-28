const Cart = require('../../models/cart-model')

module.exports.cartId =  async (req,res,next) =>{
    if(!req.cookies.cartId){
        const cart = new Cart();
        await cart.save();
        
        const expiresTime = 1000 * 86400 * 365;

        res.cookie("cartId",cart.id,{
            expires: new Date(Date.now() + expiresTime)
        });
    }
    else{
        // Đã có giỏ hàng
    }
    next();
}