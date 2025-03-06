const express = require('express')
const controller = require('../../controllers/admin/role-controller');
const route = express.Router()

route.get('/', controller.index);

route.get('/create', controller.create);


route.post('/create', controller.createPost);

module.exports = route;