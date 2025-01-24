  const express = require('express')
  const systemConfig = require('./config/system')
  const routeClient = require("./routes/client/index-route")
  const routeAdmin = require('./routes/admin/index-route')
  
  const database = require("./config/database")
  require("dotenv").config()

  database.connect()



  const app = express()
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