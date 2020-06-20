var _EMAIL="alonnsohackerone@gmail.com"
var _PASS="8infinite"
var _TO="helenicejoana@gmail.com"
(function () {
    "use strict";
    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;
    var ui = WinJS.UI;
    var htmlinited = false;
    var editor;
    var asynCancel = null;
    var m_atts = new Array();
    ui.Pages.define("/default.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            init_gui();
        },

        unload: function () {

        }

    });

    function init_gui() {

        // add OnClick event handler
        var btn = document.getElementById("btnSend");
        btn.addEventListener("click", send_email, false);
    }

    function send_email() {
        var btn = document.getElementById("btnSend");

        var result = "";

        var oMail = new EASendMail.SmtpMail("TryIt");

        // Set sender email address, please change it to yours
        oMail.from = new EASendMail.MailAddress(_EMAIL);

        // Add recipient email address, please change it to yours
        oMail.to.add(new EASendMail.MailAddress(_TO));

        // Set email subject
        oMail.subject = "test email with inline image from JavaScript HTML5 project";

        var oServer = new EASendMail.SmtpServer('smtp.gmail.com');

        // User and password for ESMTP authentication
        oServer.user = _EMAIL;
        oServer.password = _PASS;

        // If your SMTP server requires TLS connection on 25 port, please add this line
        // oServer.connectType = EASendMail.SmtpConnectType.connectSSLAuto;

        // If your SMTP server requires SSL connection on 465 port, please add this line
        // oServer.port = 465;
        // oServer.connectType = EASendMail.SmtpConnectType.connectSSLAuto;

        var oSmtp = new EASendMail.SmtpClient();


        // get a file path from PicturesLibrary,
        // to access files in PicturesLibrary, you MUST have "Pictures Library" checked in
        // your project -> Package.appxmanifest -> Capabilities
        Windows.Storage.KnownFolders.picturesLibrary.getFileAsync("test.jpg")
        .then(function (file) {

            var attfile = file.path;
            // if you want to add attachment from remote URL instead of local file.
            // var attfile = "http://www.emailarchitect.net/test.jpg";

            return oMail.addAttachmentAsync(attfile);
        })
        .then(function (oAttachment) {
            // you can change the Attachment name by
            // oAttachment.name = "mytest.jpg";

            //Specifies the attachment as an embedded image
            var contentID = "test001@host";
            oAttachment.contentID = contentID;
            oMail.htmlBody = "<html><body>this is an <img src=\"cid:"
                            + contentID + "\"> embedded picture.</body></html>";

            btn.disabled = true;
            return oSmtp.sendMailAsync(oServer, oMail);
        })
        .done(function () {

            result = "Email was sent successfully!";
            // Display Result by Diaglog box
            (new Windows.UI.Popups.MessageDialog(result, "Success")).showAsync();
            btn.disabled = false;
        },

        // error handle
        function (e) {
            // because javascript exception only gives the stack trace messages, but it is not
            // real description of exception, so we give a property lastErrorMessage for javascript.
            if (oMail.lastErrorMessage != "") {
                result = oSmtp.lastErrorMessage;
            }
            else if (oSmtp.lastErrorMessage != "") {
                result = oSmtp.lastErrorMessage;
            }
            else {
                result = e.message;
            }
            (new Windows.UI.Popups.MessageDialog(result, "Error Information")).showAsync();
            btn.disabled = false;
        });
    }
})();