const ProductCategory = require('../../models/product-category-model')
const systemConfig = require('../../config/system');
const createTreeHelper = require('../../helpers/createTree') // lấy ra tất cả danh mục theo cấp


//[GET] /admin/products-category
module.exports.index = async (req, res) => {

    let find = {
        deleted: false
    }

    const records = await ProductCategory.find(find);
    const newRecords = createTreeHelper.tree(records); // lấy ra tất cả danh mục có phân cấp

    res.render('admin/pages/products-category/index', {
        pageTitle: "Danh mục sản phẩm",
        records: newRecords
    })
}


//[GET] /admin/products-category/create
module.exports.create = async (req, res) => {

    // [GET] lấy ra tất cả danh mục
    let find = {
        deleted: false
    }
    const records = await ProductCategory.find(find);
    const newRecords = createTreeHelper.tree(records); // lấy ra cả danh mục con của các danh mục cha
    //End [GET]  lấy ra tất cả danh mục

    res.render('admin/pages/products-category/create', {
        pageTitle: "Tạo mới danh mục sản phẩm",
        records: newRecords
    })
}


//[POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {

    if (!req.file) {
        req.body.thumbnail = ""
    }
    if (req.body.position == "") {
        req.body.position = await ProductCategory.countDocuments() + 1;
    }
    else {
        req.body.position = parseInt(req.body.position);
    }

    const record = new ProductCategory(req.body);
    await record.save()
    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
}

//[GET] /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;


        const data = await ProductCategory.findOne({
            deleted: false,
            _id: id
        });

        console.log(data)

        const records = await ProductCategory.find({
            deleted: false
        })


        const newRecords = createTreeHelper.tree(records);

        res.render('admin/pages/products-category/edit.pug', {
            pageTitle: 'Chỉnh sửa danh mục',
            data: data,
            records: newRecords
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products-category`)
    }
}

//[PATCH] /admin/products-category/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;

    req.body.position = parseInt(req.body.position);
    await ProductCategory.updateOne({ _id: id }, req.body)
    res.redirect(`/admin/products-category/edit/${id}`)
}

