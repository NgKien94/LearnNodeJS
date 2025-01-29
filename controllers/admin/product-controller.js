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
        const searchObject = searchHelpers(req.query);
        if(searchObject.regex){
            findObject.title = searchObject.regex;
        }
    

        //End Search


        // cập nhật  findObject theo hành vi của người dùng , (search và filter)

        const products = await Product.find(findObject)


        res.render('admin/pages/products/index', {
            pageTitle: 'Danh sách sản phẩm',
            products: products,
            filterStatus: filterStatus,
            keyword: searchObject.keyword
        })
    }

}