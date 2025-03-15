module.exports.createPost = (req,res,next) =>{
    // validate title (backend)
    if(!req.body.fullName){
        req.flash('error','Vui lòng nhập họ tên')
        res.redirect(req.get('Referrer') || `${systemConfig.prefixAdmin}/accounts`)
        return
    }

    if(!req.body.email){
        req.flash('error','Vui lòng nhập email')
        res.redirect(req.get('Referrer') || `${systemConfig.prefixAdmin}/accounts`)
        return
    }

    if(!req.body.password){
        req.flash('error','Vui lòng nhập mật khẩu')
        res.redirect(req.get('Referrer') || `${systemConfig.prefixAdmin}/accounts`)
        return
    }

    // Nếu thành công thì chuyển sang middle ware tiếp theo xử lý và trả phản hồi về client
    
    next()

   //end validate title (backend)
}


module.exports.editPatch = (req,res,next) =>{
    // validate title (backend)
    if(!req.body.fullName){
        req.flash('error','Vui lòng nhập họ tên')
        res.redirect(req.get('Referrer') || `${systemConfig.prefixAdmin}/accounts`)
        return
    }

    if(!req.body.email){
        req.flash('error','Vui lòng nhập email')
        res.redirect(req.get('Referrer') || `${systemConfig.prefixAdmin}/accounts`)
        return
    }
    // Nếu thành công thì chuyển sang middle ware tiếp theo xử lý và trả phản hồi về clien   
    next()
   //end validate title (backend)
}