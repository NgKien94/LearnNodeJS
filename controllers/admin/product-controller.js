// [GET] /admin/products/
const Product = require('../../models/product-model')

module.exports = {
    index: async (req,res) => {

        let filterStatus = [
            {
                name: "Tất cả",
                status: '',
                class: ''
            },
            {
                name: "Hoạt động",
                status: 'active',
                class: ''
            },
            {
                name: "Dừng Hoạt động",
                status: 'inactive',
                class: ''
            }
        ]


        let filterObject = {
            deleted: false
        }

        if(req.query.status){
            const index = filterStatus.findIndex(item => item.status == req.query.status)
            filterStatus[index].class = 'active'
        }
        else{
            const index = filterStatus.findIndex(item => item.status == "");
            filterStatus[index].class = 'active'
        }

            // dữ liệu theo status
        if(req.query.status) {
            filterObject.status = req.query.status
        }
        

        const products = await Product.find(filterObject)


        res.render('admin/pages/products/index', {
            pageTitle: 'Danh sách sản phẩm',
            products: products,
            filterStatus: filterStatus
        })
    }
    
}