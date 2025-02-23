
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

// Config cloudinary

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
});

//End config cloudinary

module.exports.upload = (req, res, next) => {
    // trường hợp có file được upload 
    if (req.file) {
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );

                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };

        async function uploadCloud(req) {
            try {
                let result = await streamUpload(req);
                req.body[req.file.fieldname] = result.secure_url;
                next();

            } catch (error) {
                console.error("Lỗi upload Cloudinary:", error);
            }
        }

        uploadCloud(req).catch((error) => next(error)) // truyền thẳng đến middleware xử lý lỗi

    }
    else {
        // trường hợp không có file upload
        next();
    }
}