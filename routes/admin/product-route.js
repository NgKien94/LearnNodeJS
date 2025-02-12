const express = require('express')
const controller = require('../../controllers/admin/product-controller')
const multer = require('multer')
const storageMulter = require('../../helpers/storageMulter')
const upload = multer({storage: storageMulter()})

const validate = require('../../validates/admin/product-validate')
// //Upload files
// const path = require('path');
// const multer = require('multer');

// // Cấu hình multer với diskStorage
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.resolve(__dirname, '../../public/uploads/')); // Đường dẫn tuyệt đối đến thư mục lưu file
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, uniqueSuffix + '-' + file.originalname); // Đặt tên file tránh bị trùng
//     }
// });


// const upload = multer({ storage: storage});
// //End upload


const route = express.Router()

route.get('/',controller.index)

route.patch('/change-status/:status/:id',controller.changeStatus)

route.patch('/change-multi', controller.changeMulti)

route.delete('/delete/:id',controller.deleteItem) // xóa cứng hay xóa mềm vẫn tương tự route

route.get('/create',controller.create)

route.post(
    '/create',
    upload.single('thumbnail'),
    validate.createPost,
    controller.createPost) // data trong single là thumbnail

module.exports = route;