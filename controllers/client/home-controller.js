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
    const newProductsFeatured =  productsHelper.priceNewProducts(productsFeatured);
    
    //Lấy ra sản phẩm mới nhất
    const productsNew = await Product.find({
        deleted: false,
        status: "active"
    }).sort({position: "desc"}).limit(6)

    const newProductsNew = productsHelper.priceNewProducts(productsNew)
    //End get latest products

    res.render('client/pages/home/index.pug', {
        pageTitle: 'Home page',
        productsFeatured: newProductsFeatured,
        productsNew: newProductsNew
    });
}