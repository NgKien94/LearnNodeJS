const productRoutes = require("./product-route")
const homeRoutes = require("./home-route")
const categoryMiddleware = require('../../middlewares/client/category-middleware')

module.exports = (app) =>{
    app.use(categoryMiddleware.category); // khi chạy qua từng route sẽ luôn chạy middleware này trước

    app.use('/',homeRoutes)
    
    app.use('/products',productRoutes)

}