const mongoose = require("mongoose")
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug)

const productSchema = new mongoose.Schema({
    title: String, // Sản phẩm 1
    product_category_id: {
        type: String,
        default: ""
    },
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    slug: {
        type: String,
        slug: "title",  // slug: ["title","description"] nếu trùng title thì lấy description, nếu trùng cả hai thì sẽ random string
        unique: true // slug không trùng với các slug đã tồn tại
    }, // san-pham-1
    deleted: {
        type: Boolean,
        default: false
    },
    createdBy : {
        account_id: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    deletedBy: {
        account_id: String,
        deletedAt: Date
    },
    updatedBy: [
        {
            account_id: String,
            updatedAt: Date
        }
    ]
}, {
    timestamps: true
})


const Product = mongoose.model('Product', productSchema, "products") // tham số thứ 3 là collection

module.exports = Product;