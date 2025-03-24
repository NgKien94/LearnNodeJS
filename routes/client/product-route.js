const express = require('express')
const controller = require('../../controllers/client/product-controller')
const router = express.Router()

router.get('/', controller.index)


// router.get('/products/create', (req,res)=>{
//     res.render('client/pages/products/index.pug')
// })


// router.get('/products/edit', (req,res)=>{
//     res.render('client/pages/products/index.pug')
// })

router.get('/:slugCategory',controller.category)
// router.get('/:slug',controller.detail)

module.exports = router;