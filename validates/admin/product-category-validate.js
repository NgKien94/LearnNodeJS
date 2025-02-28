module.exports.createPost = (req,res,next) =>{
    // validate title (backend)
    if(!req.body.title){
        req.flash('error','Vui lòng nhập tiêu đề')
        res.redirect(req.get('Referrer') || `${systemConfig.prefixAdmin}/products-category`)
        return
    }

    // Nếu thành công thì chuyển sang middle ware tiếp theo xử lý và trả phản hồi về client
    
    next()

   //end validate title (backend)
}