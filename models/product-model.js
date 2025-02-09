const mongoose = require("mongoose")
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug)

const productSchema = new mongoose.Schema({
    title: String, // Sản phẩm 1
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
    deletedAt: Date
}, {
    timestamps: true
})


const Product = mongoose.model('Product', productSchema, "products") // tham số thứ 3 là collection

module.exports = Product;