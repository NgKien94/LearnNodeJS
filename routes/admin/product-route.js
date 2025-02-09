const express = require('express')
const controller = require('../../controllers/admin/product-controller')
const route = express.Router()

route.get('/',controller.index)

route.patch('/change-status/:status/:id',controller.changeStatus)

route.patch('/change-multi', controller.changeMulti)

route.delete('/delete/:id',controller.deleteItem) // xóa cứng hay xóa mềm vẫn tương tự route

route.get('/create',controller.create)

route.post('/create',controller.createPost)

module.exports = route;