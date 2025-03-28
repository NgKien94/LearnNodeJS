const Product = require("../../models/product-model")
const ProductCategory = require('../../models/product-category-model')
const productsHelper = require("../../helpers/products")
const productsCategoryHelper = require("../../helpers/products-category")
// [GET] /products


module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    })
        .sort({ position: "desc" });


    const newProducts = productsHelper.priceNewProducts(products)

    //console.log({products})
    res.render('client/pages/products/index.pug', {
        pageTitle: 'Danh sách sản phẩm',
        products: newProducts
    })
}

// [GET] get detail product /detail/:slugProduct
module.exports.detail = async (req, res) => {
    try {
  
        const find = {
            deleted: false,
            slug: req.params.slugProduct,
            status: "active"
        }
        const product = await Product.findOne(find)
        if(product.product_category_id){
            const category = await ProductCategory.findOne({
                _id: product.product_category_id,
                status: "active",
                deleted: false
            })

            product.category = category;
        }
        product.priceNew = productsHelper.priceNewProduct(product);

        res.render("client/pages/products/detail", {
            pageTitle: product.title,
            product: product
        })
    } catch (error) {
        console.log(error)
        res.redirect('/products')
    }
}

module.exports.category = async (req, res) => {
    try {
        console.log(req.params.slugCategory)

        const category = await ProductCategory.findOne({
            deleted: false,
            status:"active",
            slug: req.params.slugCategory
        })

        

        const listSubCategory = await productsCategoryHelper.getSubCategory(category.id)
        const listSubCategoryId = listSubCategory.map((item) => item.id)


        const products = await Product.find({
            product_category_id: { $in : [category.id,...listSubCategoryId]},
            deleted: false
        }).sort({ position: "desc" })
        const newProducts = productsHelper.priceNewProducts(products)

        res.render('client/pages/products/index.pug', {
            pageTitle: category.title,
            products: newProducts
        })
    }
    catch (error) {
        console.log(error);
        res.redirect('/products')
    }
}

