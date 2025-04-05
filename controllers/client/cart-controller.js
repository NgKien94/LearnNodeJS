const Cart = require('../../models/cart-model')


//[POST] /cart/add/:productId
module.exports.addPost = async (req, res) => {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);

    let cart = await Cart.findOne({ _id: cartId });

    // Nếu cart không tồn tại, tạo mới
    if (!cart) {
        cart = await Cart.create({
            _id: cartId,
            products: [{
                product_id: productId,
                quantity: quantity
            }]
        });

        req.flash('success','Tạo giỏ hàng và thêm sản phẩm thành công');
        return res.redirect(req.get('Referrer') || '/products');
    }

    // Nếu cart đã tồn tại
    const existProductInCart = cart.products.find(item => item.product_id == productId);
    if (existProductInCart) {
        const newQuantity = existProductInCart.quantity + quantity;
        await Cart.updateOne(
            {
                _id: cartId,
                'products.product_id': productId
            },
            {
                'products.$.quantity': newQuantity
            }
        );
    } else {
        const objectCart = {
            product_id: productId,
            quantity: quantity
        };
        await Cart.updateOne(
            { _id: cartId },
            { $push: { products: objectCart } }
        );
    }

    req.flash('success','Thêm sản phẩm vào giỏ hàng thành công');
    res.redirect(req.get('Referrer') || '/products');
};
