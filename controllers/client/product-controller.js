const Product = require("../../models/product-model")
const productsHelper = require("../../helpers/products")
// [GET] /products


module.exports.index = async (req,res) =>{
    const products = await Product.find({
        status: "active",
        deleted: false
    })
    .sort({position: "desc"});

    
    const newProducts = productsHelper.priceNewProducts(products)

  //console.log({products})
    res.render('client/pages/products/index.pug',{
        pageTitle:'Danh sách sản phẩm',
        products: newProducts
    })
}

module.exports.detail = async (req,res) =>{
    try{    
        console.log(req.params.slug)
    const find = {
        deleted: false,
        slug: req.params.slug,
        status: "active" 
    }
    const product = await Product.findOne(find)
    console.log(product)
    
    res.render("client/pages/products/detail",{
        pageTitle: product.title,
        product: product
    })
    }catch(error){
        console.log(error)
        res.redirect('/products')
    }
}