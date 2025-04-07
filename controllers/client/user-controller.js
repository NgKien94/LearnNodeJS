const md5 = require("md5");

const User = require("../../models/user-model");
const ForgotPassword = require("../../models/forgot-password-model");
const generate = require("../../helpers/generate");
const sendMailHelper = require("../../helpers/sendMail");

//[GET] /user/register

module.exports.register = async (req, res) => {
    res.render('client/pages/user/register', {
        pageTitle: "Đăng ký tài khoản"
    })
}

//[POST] /user/register

module.exports.registerPost = async (req, res) => {
    const existEmail = await User.findOne({
        email: req.body.email,
        deleted: false
      });

    if(existEmail) {
        req.flash("error", "Email đã tồn tại!");
        res.redirect(req.get('Referrer'));
        return;
    }

    req.body.password = md5(req.body.password);
    const user = new User(req.body);
    await user.save();


    res.cookie('tokenUser',user.tokenUser)

    res.redirect('/')
}

//[GET] /user/login
module.exports.login = async (req, res) => {
    res.render('client/pages/user/login', {
        pageTitle: "Đăng nhập tài khoản"
    })
}


//[POST] /user/login
module.exports.loginPost = async (req, res) => {
   

    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({
        email: email,
        deleted: false
    });

    if(!user){
        req.flash("error", "Email không tồn tại!");
        res.redirect(req.get('Referrer'));
        return;
    }

    if(md5(password) != user.password){
        req.flash("error", "Sai mật khẩu!");
        res.redirect(req.get('Referrer'));
        return;
    }

    if(user.status == "inactive"){  
        req.flash("error", "Tài khoản đang bị khóa!");
        res.redirect(req.get('Referrer'));
        return;
    }

    res.cookie('tokenUser',user.tokenUser)

    res.redirect('/')
}

//[GET] /user/logout
module.exports.logout = async (req, res) => {
    res.clearCookie('tokenUser')
    res.redirect('/')
}

//[GET] /user/password/forgot
module.exports.forgotPassword = async (req, res) => {
    res.render('client/pages/user/forgot-password', {
        pageTitle: "Quên mật khẩu"
    })
}

//[POST] /user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({
        email: email,
        deleted: false
    });

    if(!user){
        req.flash("error", "Email không tồn tại!");
        res.redirect(req.get('Referrer'));
        return;
    }

    //Việc 1:  Tạo mã OTP và lưu OTP, email vào collection (forgot-password)
        const otp = generate.generateRamdomNumer(8);
        const objectForgotPassword = {
            email: email,
            otp: otp,
            expireAt: Date.now()
        }
        
        const forgotPassword = new ForgotPassword(objectForgotPassword);
        await forgotPassword.save();


    

    // Gửi mã OTP qua email của user
    const subject = "Mã OTP xác thực tài khoản";
    const html = `<h1>Mã OTP xác thực tài khoản của bạn là: ${otp}</h1><br> <p>Vui lòng không chia sẻ mã OTP này với bất kỳ ai khác.</p>
    <p>Mã OTP sẽ hết hạn sau <b>3 phút</b>.</p>`;
    sendMailHelper.sendMail(email,subject,html);

    res.redirect(`/user/password/otp?email=${email}`)
   
}

//[GET] /user/password/otpPassword
module.exports.otpPassword = async (req, res) => {
    const email = req.query.email;
    res.render('client/pages/user/otp-password', {
        pageTitle: "Xác thực OTP",
        email: email
    })
}

//[POST] /user/password/otpPasswordPost
module.exports.otpPasswordPost = async (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;

    const result = await ForgotPassword.findOne({
        email: email,
        otp: otp,
    })
    
    if(!result){
        req.flash("error", "Mã OTP không đúng!");
        res.redirect(req.get('Referrer'));
        return;
    }

    const user = await User.findOne({
        email: email,
        deleted: false
    });
    
    res.cookie('tokenUser',user.tokenUser)


    res.redirect('/user/password/reset');
}


//[GET] /user/password/resetPassword
module.exports.resetPassword = async (req, res) => {
    res.render('client/pages/user/reset-password', {
        pageTitle: "Đặt lại mật khẩu"
    })
}


//[POST] /user/password/resetPasswordPost
module.exports.resetPasswordPost = async (req, res) => {
    const password = req.body.password;
    const tokenUser = req.cookies.tokenUser;

    await User.updateOne({
        tokenUser: tokenUser
    },{
        password: md5(password)
    })
    req.flash("success", "Đặt lại mật khẩu thành công!");
    res.redirect('/');

}