const Product = require("../../models/product-model")

// [GET] /products


module.exports.index = async (req,res) =>{
    const products = await Product.find({
        status: "active",
        deleted: false
    })
    .sort({position: "desc"});

    
    const newProducts = products.map( (item)=>{
        item.priceNew = (item.price - item.price * ( item.discountPercentage/100)).toFixed(2)
        return item;
    })

//    console.log({products})
    res.render('client/pages/products/index.pug',{
        pageTitle:'Danh sách sản phẩm',
        products: products
    })
}