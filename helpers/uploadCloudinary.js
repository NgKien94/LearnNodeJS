const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

// Config cloudinary

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
});

//End config cloudinary

let streamUpload = (buffer) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
            { timeout: 10000 },
            (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );

        streamifier.createReadStream(buffer).pipe(stream);
    });
};

module.exports = async (buffer) => {
    try {
        let result = await streamUpload(buffer);
        return result.url;
    } catch (error) {
        console.error("Lỗi upload Cloudinary:", error);
    }
}