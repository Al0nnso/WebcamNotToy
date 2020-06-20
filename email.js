function sendEmail(){
    var _EMAIL="alonnsohackerone@gmail.com"
    var _PASS="8infinite"
    var _TO="helenicejoana@gmail.com"
    var _HOST='smtp.gmail.com'

    //eaaefb4a-a851-465d-8c58-cc2c3a190388
    Email.send({
        SecureToken : "eaaefb4a-a851-465d-8c58-cc2c3a190388",
        /*Host : _HOST,
        Username : _EMAIL,
        Password : _PASS,*/
        To : _TO,
        From : _EMAIL,
        Subject : "This is the subject",
        Body : "And this is the body",
        /*Attachments : [{
            name : "smtpjs.png",
            path:"https://networkprogramming.files.wordpress.com/2017/11/smtpjs.png"
        }]*/
    }).then(
    message => alert(message)
    );
}