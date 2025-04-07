const nodemailer = require('nodemailer');


module.exports.sendMail = (email,subject,html) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    var mailOptions = {
        from: 'quangkienof@gmail.com',
        to: email,
        subject: subject,
        html: html
        //html: '<h1>Body/template of the Email</h1>' // HTML body thay cho text ở trên
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}