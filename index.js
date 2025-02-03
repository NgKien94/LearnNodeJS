  const express = require('express')
  const systemConfig = require('./config/system')
  const routeClient = require("./routes/client/index-route")
  const routeAdmin = require('./routes/admin/index-route')
  const methodOverride = require('method-override') // ghi đè method của form
  const  bodyParser = require('body-parser');


  const database = require("./config/database")
  require("dotenv").config()

  database.connect()



  const app = express()
  app.use(methodOverride('_method')) // ghi đè method của form
  app.use(bodyParser.urlencoded({ extended: false })) // body-parser, phân tích body của HTTP request

  const port = process.env.PORT 

  app.use(express.static('public'))


  app.set('views','./views')
  app.set('view engine', 'pug')

  //App Local variable 
  app.locals.prefixAdmin = systemConfig.prefixAdmin // tạo ra các biến toàn cục trên toàn dự án
  routeClient(app)
  routeAdmin(app)


  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })