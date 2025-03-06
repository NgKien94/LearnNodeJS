// [GET] /admin/products/
const Product = require('../../models/product-model')
const ProductCategory = require('../../models/product-category-model')
const filterStatusHelpers = require('../../helpers/filterStatus');
const searchHelpers = require('../../helpers/search')
const paginationHelpers = require('../../helpers/pagination')
const systemConfig = require('../../config/system')
const createTreeHelper = require('../../helpers/createTree')

// GET /admin/products/
module.exports.index = async (req, res) => {
    // Filter
    const filterStatus = filterStatusHelpers(req.query);

    let findObject = {
        deleted: false
    }

    // dữ liệu theo status
    if (req.query.status) {
        findObject.status = req.query.status
    }
    //End filter



    //Search
    // regex, 
    const objectSearch = searchHelpers(req.query);
    if (objectSearch.regex) {
        findObject.title = objectSearch.regex;
    }
    //End Search

    //Sort
    let sort = {}
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue
    } else {
        sort.position = "desc" // default sort
    }


    //End sort

    // Pagination
    const countProducts = await Product.countDocuments(findObject);
    const objectPagination = paginationHelpers(
        {
            currentPage: parseInt(req.query.page) || 1,
            limitItems: 4
        }, countProducts
    )


    // End pagiation

    const products = await Product.find(findObject)
        .sort(sort)
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip)
    // limit - lấy tối đa bao nhiêu sản phẩm
    // skip - bỏ qua bao nhiêu sản phẩm trước đó


    res.render('admin/pages/products/index', {
        pageTitle: 'Danh sách sản phẩm',
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination,
    })
}


// PATCH /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;


    await Product.updateOne({ _id: id }, {
        $set: {
            status: status // dùng $set khi cập nhật nhiều trường

        }
    })
    req.flash('success', 'Cập nhật trạng thái thành công');

    res.redirect(req.get('Referrer') || `${systemConfig.prefixAdmin}/products`) // thay vì dùng back đã lỗi thời
}

// PATCH /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const ids = req.body.ids.split(',');
    const status = req.body.type;

    switch (status) {
        case "active":
            await Product.updateMany(
                { _id: { $in: ids } }, // Điều kiện lọc: _id nằm trong mảng ids
                { $set: { status: status } }
            )
            req.flash('success', `Cập nhật trạng thái thành công cho ${ids.length} sản phẩm`);

            break;
        case "inactive":
            await Product.updateMany(
                { _id: { $in: ids } }, // Điều kiện lọc: _id nằm trong mảng ids
                { $set: { status: status } }
            )
            req.flash('success', `Cập nhật trạng thái thành công cho ${ids.length} sản phẩm`);
            break;
        case "delete-all":
            await Product.updateMany(
                { _id: { $in: ids } },
                {
                    $set: {
                        deleted: true,
                        deletedAt: new Date()
                    }
                }
            )
            req.flash('success', `Xóa thành công ${ids.length} sản phẩm`);
            break;
        case "change-position":
            for (const item of ids) {
                let [id, position] = item.split('-');
                position = parseInt(position)

                await Product.updateOne(
                    { _id: id },
                    {
                        $set: {
                            position: position
                        }
                    }
                )
            }
            req.flash('success', `Cập nhật vị trí thành công cho ${ids.length} sản phẩm`);
            break;
    }

    res.redirect(req.get('Referrer') || `${systemConfig.prefixAdmin}/products`)
}

//DELETE /admin/products/delete/:id
// XÓA CỨNG thì xóa luôn sản phẩm dùng deleteOne
// Xóa mềm thì chỉ cập nhật trường deleted = true - updateOne

module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;

    // await  Product.deleteOne({_id : id}); // xóa cứng 

    await Product.updateOne(
        { _id: id },
        {
            $set:
            {
                deleted: true,
                deletedAt: new Date() // lấy thêm thời gian xóa
            }
        }
    ) // xóa mềm 
    req.flash('success', `Xóa thành công  sản phẩm`);
    res.redirect(req.get('Referrer') || `${systemConfig.prefixAdmin}/products`)
}


// GET /admin/products/create // get page create a product
module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    }
    const category = await ProductCategory.find(find)
    const newCategory = await createTreeHelper.tree(category)

    res.render('admin/pages/products/create.pug', {
        pageTitle: 'Tạo mới sản phẩm',
        category: newCategory
    })
}

// POST /admin/products/create // Create a product
module.exports.createPost = async (req, res) => {
    if(!req.file){
        req.body.thumbnail =""
    }
    console.log(req.body)
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)

    if (req.body.position == "") {
        const countProducts = await Product.countDocuments()

        req.body.position = countProducts + 1
    }
    else {
        req.body.position = parseInt(req.body.position)
    }


    const product = new Product(req.body)
    await product.save()


    res.redirect(`${systemConfig.prefixAdmin}/products`)

}


// GET  /admin/product/edit/:id   //View UI Edit a product
module.exports.edit = async (req, res) => {

    try {

        const find = {
            deleted: false,
            _id: req.params.id
        }

        const product = await Product.findOne(find)
        const category = await ProductCategory.find({
            deleted: false
        })
        const newCategory = await createTreeHelper.tree(category)


        res.render('admin/pages/products/edit', {
            pageTitle: 'Chỉnh sửa sản phẩm',
            product: product,
            category: newCategory
        })
    } catch (error) {
        req.flash('error', `Truy cập tài nguyên không xác định`);
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
}


// PATCH /admin/products/edit/:id // Edit a product
module.exports.editPatch = async (req, res) => {
    const id = req.params.id
    
    
    
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    req.body.position = parseInt(req.body.position)

    try {
        await Product.updateOne({ _id: id }, req.body)
        req.flash('success', "Chỉnh sửa sản phẩm thành công")
        res.redirect(req.get('Referrer') || `${systemConfig.prefixAdmin}/products`)
    } catch (error) {
        req.flash('error', "Chỉnh sửa sản phẩm thất bại")
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }





}


//GET /admin/products/detail/:id  //view detail a product 
module.exports.detail = async (req, res) => {
    const find = {
        deleted: false,
        _id: req.params.id
    }

    const product = await Product.findOne(find)


    res.render(`admin/pages/products/detail`, {
        pageTitle: product.title,
        product: product
    })
}