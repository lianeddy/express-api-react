const nodemailer = require('nodemailer');
const util = require('util');

const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : 'lian.eddy@gmail.com',
        pass : 'uuclxrtqhgklmmin'
    },
    tls : {
        rejectUnauthorized : false
    }
});

const transportAwait = util.promisify(transporter.sendMail).bind(transporter);

module.exports = {
    transporter,
    transportAwait
};