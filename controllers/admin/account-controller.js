const Account = require("../../models/account-model");
const Role = require("../../models/role-model");
const systemConfig = require("../../config/system");
const md5 = require("md5")

//[GET] /admin/accounts
module.exports.index = async (req, res) => {
	const records = await Account.find({
		deleted: false
	}).select("-password -token")

	for (const record of records) {
		const role = await Role.findOne({
			_id: record.role_id,
			deleted: false
		});
		record.role = role;
	}

	res.render("admin/pages/accounts/index", {
		titlePage: "Danh sách tài khoản",
		records: records
	});
}

//[GET] /admin/accounts/create
module.exports.create = async (req, res) => {

	const roles = await Role.find({
		deleted: false
	})

	res.render("admin/pages/accounts/create", {
		titlePage: "Tạo mới tài khoản",
		roles: roles
	});
}


//[POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {

	const emailExist = await Account.findOne({
		deleted: false,
		email: req.body.email
	})
	if (emailExist) {
		req.flash('error', "Email này đã tồn tại");
		res.redirect(`${systemConfig.prefixAdmin}/accounts/create`)
	}
	else {
		req.body.password = md5(req.body.password)

		const records = new Account(req.body);
		await records.save();

		res.redirect(`${systemConfig.prefixAdmin}/accounts`)
	}

}


//[GET] /admin/accounts/edit/id
module.exports.edit = async (req, res) => {

	const id = req.params.id;
	let find = {
		_id: id,
		deleted: false
	}

	try {
		const data = await Account.findOne(find)
		const roles = await Role.find({ deleted: false })

		res.render("admin/pages/accounts/edit", {
			titlePage: "Trang cập nhật tài khoản",
			data: data,
			roles: roles
		});
	} catch (error) {
		res.redirect(`${systemConfig.prefixAdmin}/accounts`);
	}
}


//[PATCH] /admin/accounts/edit/id
module.exports.editPatch = async (req, res) => {
	const id = req.params.id;
	const emailExist = await Account.findOne({
		_id: { $ne: id},
		email: req.body.email,
		deleted: false
	})

	if (emailExist) {
		req.flash('error', "Email existed")
	}
	else {
		if (req.body.password) {
			console.log("password", req.body.password)
			req.body.password = md5(req.body.password)
		}
		else {
			delete req.body.password
		}

		await Account.updateOne({ _id: id }, req.body)
		req.flash('success', "Update account successfull")
	}

	res.redirect(req.get('Referrer') || `${systemConfig.prefixAdmin / accounts}`)

}