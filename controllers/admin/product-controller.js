// [GET] /admin/products/
const Product = require('../../models/product-model')
const filterStatusHelpers = require('../../helpers/filterStatus');
const searchHelpers = require('../../helpers/search')
const paginationHelpers = require('../../helpers/pagination')

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


    // Pagination
    const countProducts = await Product.countDocuments(findObject);
    const objectPagination = paginationHelpers(
        {
            currentPage: parseInt(req.query.page) || 1,
            limitItems: 4
        }, countProducts
    )

    // End pagiation

    const products = await Product.find(findObject).limit(objectPagination.limitItems).skip(objectPagination.skip)
    // limit - lấy tối đa bao nhiêu sản phẩm
    // skip - bỏ qua bao nhiêu sản phẩm trước đó


    res.render('admin/pages/products/index', {
        pageTitle: 'Danh sách sản phẩm',
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
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

    res.redirect(req.get('Referrer') || '/admin/products') // thay vì dùng back đã lỗi thời
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


            break;
        case "inactive":
            await Product.updateMany(
                { _id: { $in: ids } }, // Điều kiện lọc: _id nằm trong mảng ids
                { $set: { status: status } }
            )
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

            break;
    }

    res.redirect(req.get('Referrer') || '/admin/products')
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
    res.redirect(req.get('Referrer') || '/admin/products')
}