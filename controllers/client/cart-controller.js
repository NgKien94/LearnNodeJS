const Cart = require('../../models/cart-model')
const Product = require('../../models/product-model')
const productHelper = require('../../helpers/products')

//[GET] /cart
module.exports.index = async (req, res) => {

    const cartId = req.cookies.cartId;

    const cart = await Cart.findOne({
        _id: cartId
    })


    if (cart.products.length > 0) {
        for (const item of cart.products) {
            const productId = item.product_id;
            const productInfo = await Product.findOne({
                _id: productId
            });

            productInfo.priceNew = productHelper.priceNewProduct(productInfo);
            item.productInfo = productInfo;
            item.totalPrice = item.quantity * productInfo.priceNew;
        }
    }

    cart.totalPrice = cart.products.reduce((sum, item) => sum + item.totalPrice, 0);

    res.render('client/pages/cart/index.pug', {
        pageTitle: 'Giỏ hàng',
        cartDetail: cart
    });
}

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

        req.flash('success', 'Tạo giỏ hàng và thêm sản phẩm thành công');
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

    req.flash('success', 'Thêm sản phẩm vào giỏ hàng thành công');
    res.redirect(req.get('Referrer') || '/products');
};

//[DELETE] /cart/delete/:productId
module.exports.delete = async (req, res) => {
    const cartId = req.cookies.cartId;

    const productId = req.params.productId;
  
    await Cart.updateOne(
        {
            _id: cartId,
        }, {
        "$pull": {
            "products": {
                "product_id": productId
            }
        }
    })

    req.flash('success', 'Xóa sản phẩm khỏi giỏ hàng thành công');
    res.redirect(req.get('Referrer') || '/products');
}

//[GET] /cart/update/:productId/:quantity
module.exports.update = async (req, res) => {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    const quantity = parseInt(req.params.quantity);

    await Cart.updateOne({
        _id: cartId,
        'products.product_id': productId
    },{
        'products.$.quantity': quantity  
    })

    req.flash('success','Cập nhật số lượng sản phẩm trong giỏ hàng thành công');
    res.redirect(req.get('Referrer') || '/products');
}