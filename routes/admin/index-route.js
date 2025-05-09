
const authMiddleWare = require('../../middlewares/admin/auth-middleware')
const dashboardRoutes = require('./dashboard-route')
const productRoutes = require('./product-route')
const productCategoryRoutes = require('./product-category-route')
const roleRoutes = require('./role-route')
const accountRoutes = require('./account-route')
const authRoutes = require('./auth-route')
const myAccountRoutes = require('./my-account-route')
const settingRoutes = require('./setting-route')

const authController = require('../../controllers/admin/auth-controller')
const systemConfig = require('../../config/system')


module.exports = (app) =>{
    const PATH_ADMIN = systemConfig.prefixAdmin;

    app.get(PATH_ADMIN,authController.login)

    app.use(PATH_ADMIN+ '/dashboard',
        authMiddleWare.requireAuth,
        dashboardRoutes)

    app.use(PATH_ADMIN + '/products',authMiddleWare.requireAuth,productRoutes)
    
    app.use(PATH_ADMIN+'/products-category',authMiddleWare.requireAuth,productCategoryRoutes)

    app.use(PATH_ADMIN+'/roles',authMiddleWare.requireAuth,roleRoutes)

    app.use(PATH_ADMIN+'/accounts',authMiddleWare.requireAuth,accountRoutes)

    app.use(PATH_ADMIN+'/my-account',authMiddleWare.requireAuth,myAccountRoutes)

    app.use(PATH_ADMIN+'/auth', authRoutes)

    app.use(PATH_ADMIN+'/settings',authMiddleWare.requireAuth, settingRoutes)
}