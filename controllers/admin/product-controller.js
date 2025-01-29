// [GET] /admin/products/
const Product = require('../../models/product-model')
const filterStatusHelpers = require('../../helpers/filterStatus');
const searchHelpers = require('../../helpers/search')

module.exports = {
    index: async (req, res) => {

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
        const objectPagination = {
            currentPage: parseInt(req.query.page) || 1,
            limitItems: 4
        }

        const countProducts = await Product.countDocuments(findObject);
        const totalPage = Math.ceil(countProducts / objectPagination.limitItems);
        objectPagination.totalPage = totalPage;

        objectPagination.skip = (objectPagination.currentPage - 1) * 4;

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

}