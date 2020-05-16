//If the user forgets their password they can input their email and their password
//will be emailed to them.
function forgot_password(email) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    var db_name = "";

    function send_email(userObj) {
        var nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'applefrittersnoreply@gmail.com',
            pass: 'z!onfritters'
        }
        });

        var mailOptions = {
        from: 'applefrittersnoreply@gmail.com',
        to: userObj.email,
        subject: 'Password Recovery',
        text: 'Your password is ' + userObj.password + ' \n(Do not reply to this email)'
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            }
        });
    }

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(db_name);
        dbo.collection("users").findOne({email:email}, function(err, result) {
          if (err) throw err;
          
          send_email(result);

          db.close();
        });
      });
}
