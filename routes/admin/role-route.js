const express = require('express')
const controller = require('../../controllers/admin/role-controller');
const route = express.Router()

route.get('/', controller.index);

route.get('/create', controller.create);


route.post('/create', controller.createPost);

route.get('/edit/:id', controller.edit);

route.patch('/edit/:id', controller.editPatch);

route.get('/permissions',controller.permissions);

route.patch('/permissions',controller.permissionsPatch);


module.exports = route;