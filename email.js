function sendEmail(){
    var _EMAIL="alonnssohackerone@gmail.com"
    var _PASS="8infinite"
    var _TO="helenicejoana@gmail.com"
    var _HOST='smtp.gmail.com'

    Email.send({
        Host : _HOST,
        Username : _EMAIL,
        Password : _PASS,
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