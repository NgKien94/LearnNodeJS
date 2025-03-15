const md5 = require('md5')
const Account = require('../../models/account-model')

const systemConfig = require("../../config/system");

//[GET] /admin/auth/login
module.exports.login = async (req,res) =>{
    res.render('admin/pages/auth/login.pug',{
        pageTitle:  "Login Page"
    })
}


//[POST] /admin/auth/login
module.exports.loginPost = async (req,res) =>{
    
    const {email,password} = req.body;
    
    const user =  await Account.findOne({
        email: email,
        deleted:false
    })

    if(!user){
        req.flash("error","Email is not exit")
        res.redirect(req.get('Referrer'))
        return ;
    }

   
    if(md5(password) != user.password){
        req.flash("error","Incorrect password")
        res.redirect(req.get('Referrer'))
        return ;
    }


    if(user.status !="active"){
        req.flash("error","This account has been locked")
        res.redirect(req.get('Referrer'))
        return ;
    }

    res.cookie("token",user.token)
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
}