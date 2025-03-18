const systemConfig = require('../../config/system')
const Account = require('../../models/account-model')
const Role = require('../../models/role-model')

module.exports.requireAuth = async (req, res, next) => {
    if (!req.cookies.token) {
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
        return;
    }   
    else {
        const user = await Account.findOne({token: req.cookies.token}).select("-password")
        if(user){
            const role = await Role.findOne({
                _id: user.role_id
            }).select("title permissions")

           
            res.locals.user = user; // trả user hiện tại ra cho view, để authorization
            res.locals.role = role; // trả role hiện tại ra cho view, để authorization
            next();
        }
        else{
            res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
            return ;
        }
    }
}