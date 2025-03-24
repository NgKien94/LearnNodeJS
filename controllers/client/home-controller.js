const Product = require("../../models/product-model")
const productsHelper = require('../../helpers/products')
// [GET] /

module.exports.index = async (req,res) =>{
    // lấy ra sản phẩm nổi bật 
    const productsFeatured = await Product.find({
        featured: "1",
        deleted: false,
        status: "active"
    }).limit(6);
    //End lấy ra sản phẩm nổi bật
    const newProducts =  productsHelper.priceNewProducts(productsFeatured);
    
    res.render('client/pages/home/index.pug', {
        pageTitle: 'Home page',
        productsFeatured: newProducts
    });
}