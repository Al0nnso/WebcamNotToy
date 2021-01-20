
function sendEmail(bimage,Body){

    var ID = function () {
        return '_' + Math.random().toString(36).substr(2, 9);
    };
    
    var _EMAIL="your_elasticemail@gmail.com"
    var _PASS="your_elasticemail_password"
    var _TO="your_email@gmail.com"
    var _HOST='smtp.elasticemail.com'

    const Attachments= [
        {   // encoded string as an attachment
          name: 'webcam.jpg',
          data: bimage.split("base64,")[1],
          encoding: 'base64'
        }]
    Email.send({
        Host : _HOST,
        Username : _EMAIL,
        Password : _PASS,
        To : _TO,
        From : _EMAIL,
        Subject : "WEBCAM Snap "+ID(),
        Body,
        Attachments
    }).then(
    message => console.log(message)//alert(message)
    );
}
