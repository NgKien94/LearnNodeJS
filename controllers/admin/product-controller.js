// [GET] /admin/products/
const Product = require('../../models/product-model')
const filterStatusHelpers = require('../../helpers/filterStatus');


module.exports = {
    index: async (req, res) => {

        // Optimize here
        const filterStatus = filterStatusHelpers(req.query);

        let filterObject = {
            deleted: false
        }

        // dữ liệu theo status
        if (req.query.status) {
            filterObject.status = req.query.status
        }

        let keyword = ""
        if (req.query.keyword) {
            keyword = req.query.keyword;
            filterObject.title = { $regex: new RegExp(keyword, "i") } // chỉ định tìm kiếm gần đúng, luôn bọc trong regex
        }

        const products = await Product.find(filterObject)


        res.render('admin/pages/products/index', {
            pageTitle: 'Danh sách sản phẩm',
            products: products,
            filterStatus: filterStatus,
            keyword: keyword
        })
    }

}