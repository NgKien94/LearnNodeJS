const express = require('express')
const controller = require('../../controllers/admin/product-controller')
const multer = require('multer')
const upload = multer()
const uploadCloud = require('../../middlewares/admin/uploadCloud-middleware')

const validate = require('../../validates/admin/product-validate')

const route = express.Router()

route.get('/', controller.index)

route.patch('/change-status/:status/:id', controller.changeStatus)

route.patch('/change-multi', controller.changeMulti)

route.delete('/delete/:id', controller.deleteItem) // xóa cứng hay xóa mềm vẫn tương tự route

route.get('/create', controller.create)

route.post(
    '/create',
    upload.single('thumbnail'),
    uploadCloud.upload,
    validate.createPost,
    controller.createPost) // data trong single là thumbnail


route.get('/edit/:id', controller.edit)

route.patch(
    '/edit/:id',
    upload.single('thumbnail'),
    uploadCloud.upload,
    validate.createPost,
    controller.editPatch)

route.get('/detail/:id', controller.detail)

module.exports = route;