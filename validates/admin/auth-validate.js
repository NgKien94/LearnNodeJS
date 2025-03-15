module.exports.loginPost = (req, res, next) => {
	if(!req.body.email){
		req.flash("error", `Email have to be filled in`);
		res.redirect("back");
		return;
	}

    if(!req.body.password){
		req.flash("error", `Password have to be filled in`);
		res.redirect("back");
		return;
	}
	
	next();
};