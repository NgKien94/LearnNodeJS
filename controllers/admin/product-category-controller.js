const ProductCategory = require('../../models/product-category-model')
const systemConfig = require('../../config/system');


//[GET] /admin/products-category
module.exports.index = async (req,res) =>{
    
    let find = {
        deleted: false
    }

    const records = await ProductCategory.find(find);
    console.log(records); 

    res.render('admin/pages/products-category/index',{
        pageTitle: "Danh mục sản phẩm",
        records: records
    })
}


//[GET] /admin/products-category/create
module.exports.create = (req,res) =>{
    res.render('admin/pages/products-category/create',{
        pageTitle: "Tạo mới danh mục sản phẩm"
    })
}


//[POST] /admin/products-category/create
module.exports.createPost = async (req,res) =>{
   
    if(!req.file){
        req.body.thumbnail = ""
    }
    if(req.body.position==""){
        req.body.position =  await ProductCategory.countDocuments() + 1;
    }
    else{
        req.body.position = parseInt(req.body.position);
    }

    const record = new ProductCategory(req.body);
    record.save()
    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
}