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
        
        let keyword = ""
        if(req.query.keyword){
            keyword = req.query.keyword;
            filterObject.title = {$regex: new RegExp(keyword,"i")} // chỉ định tìm kiếm gần đúng, luôn bọc trong regex
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