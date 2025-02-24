const express = require('express')
const route = express.Router()

const controller = require('../../controllers/admin/product-category-controller')

const multer = require('multer')
const upload = multer()
const uploadCloud = require('../../middlewares/admin/uploadCloud-middleware')
const validate = require('../../validates/admin/product-category-validate')



//[GET] /admin/products-category
route.get('/', controller.index)

//[GET] /admin/products-category/create
route.get('/create',controller.create)

//[POST] /admin/products-category/createPost

route.post(
    '/create',
    upload.single('thumbnail'),
    uploadCloud.upload,
    validate.createPost,
    controller.createPost) // data trong single là thumbnail



module.exports = route;