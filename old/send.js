const nodemailer = require('nodemailer');

var _EMAIL="alonnsohackerone@gmail.com"
var _PASS="8infinite"
var _TO="helenicejoana@gmail.com"
var _HOST='smtp.gmail.com'

const transporter = nodemailer.createTransport({
    host: _HOST,
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
        user: _EMAIL,
        pass: _PASS
    },
    tls: { rejectUnauthorized: false }
  });
var cat = "...base64 encoded image...";
const attachments= [
      {   // encoded string as an attachment
        filename: 'cat.jpg',
        content: cat.split("base64,")[1],
        encoding: 'base64'
      }
]
const mailOptions = {
    from: _EMAIL,
    to: _TO,
    subject: 'E-mail enviado usando Node!',
    text: 'Bem fácil, não? ;)',
    //html: 'Embedded image: <img src="cid:unique@kreata.ee"/>',
    //html: output, // html body
    /*attachments: [{
        filename: 'image.png',
        path: '/path/to/file',
        cid: 'unique@kreata.ee' //same cid value as in the html 
    }]*/
    attachments,
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email enviado: ' + info.response);
    }
  });