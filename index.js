const express = require('express')
require("dotenv").config()

const path = require('path')
const systemConfig = require('./config/system')
const routeClient = require("./routes/client/index-route")
const routeAdmin = require('./routes/admin/index-route')
const methodOverride = require('method-override') // ghi đè method của form
const bodyParser = require('body-parser');
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const moment = require('moment')



const database = require("./config/database")
database.connect()



const app = express()
app.use(methodOverride('_method')) // ghi đè method của form
app.use(bodyParser.urlencoded({ extended: false })) // body-parser, phân tích body của HTTP request

const port = process.env.PORT


//app.use(express.static('public')) // local sẽ hiểu
app.use(express.static(`${__dirname}/public`)) // dành cho online khi deploy


//app.set('views', './views') // local sẽ hiểu
app.set('views', `${__dirname}/views`) // dành cho online khi deploy
app.set('view engine', 'pug')

app.use(cookieParser('ABCDEFK')); // đối số là key bất kỳ - chìa khóa bí mật cho cookie
app.use(session({
  secret: 'ABC123', // Chìa khóa bí mật cho session
  resave: false, // Không lưu lại phiên nếu không có thay đổi
  saveUninitialized: true, // Lưu phiên mặc dù không có gì thay đổi
  cookie: { maxAge: 60000 } // Thời gian tồn tại của cookie (60000ms = 1 phút)
}));

app.use(flash());

// Tiny MCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
//End Tiny MCE

//App Local variable 
app.locals.prefixAdmin = systemConfig.prefixAdmin // tạo ra các biến toàn cục chỉ dùng được trong các file view - (pug)
app.locals.moment = moment;


routeClient(app)
routeAdmin(app)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})