const Role = require('../../models/role-model')
const systemConfig = require('../../config/system')

// [GET] /admin/roles/
module.exports.index = async (req, res) => {

    let find = {
        deleted: false
    }

    const records = await Role.find(find)


    res.render('admin/pages/roles/index.pug', {
        pageTitle: 'Nhóm quyền',
        records: records
    })
}


// [GET] /admin/create/
module.exports.create = (req, res) => {

    res.render('admin/pages/roles/create.pug', {
        pageTitle: 'Tạo nhóm quyền'
    })
}


// [POST] /admin/create/
module.exports.createPost = async (req, res) => {


    const record = new Role(req.body);
    await record.save();

    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}


// [GET] /admin/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id

        let find = {
            _id: id,
            deleted: false
        }


        const data = await Role.findOne(find)
        console.log(data)

        res.render('admin/pages/roles/edit.pug', {
            pageTitle: 'Sửa nhóm quyền',
            data: data
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/roles`)
    }
}


// [PATCH] /admin/edit/:id
module.exports.editPatch = async (req, res) => {
    try {
        const id = req.params.id
        console.log(req.body)
        await Role.updateOne({ _id: id }, req.body)
        req.flash('success', "Cập nhật quyền thành công")
        
    } catch (error) {
        req.flash('error', "Cập nhật quyền thất bại")
    }
    res.redirect(req.get('Referrer') || `${systemConfig.prefixAdmin}/roles`)
}