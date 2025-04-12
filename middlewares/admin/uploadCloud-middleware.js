const uploadCloudToCloudinary = require('../../helpers/uploadCloudinary');

module.exports.upload = async (req, res, next) => {
    // trường hợp có file được upload 

    if (req.file) {

       const result = await uploadCloudToCloudinary(req.file.buffer).catch((error) => next(error)) // truyền thẳng đến middleware xử lý lỗi
       req.body[req.file.fieldname] = result;
    }
    
    next();
}