var express = require("express");
var crypto = require('crypto');

var router = express.Router();

//Connects to the database
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var db_name = "ChurchDatabase";

//Checks if the email and password match
function login(userObj) {
    var match = true;
    MongoClient.connect(url, function(err, db) {
        var dbo = db.db(db_name);
        dbo.collection("Users").findOne({email:userObj.email}, function(err, result) {
            try {
                result.password;
                match = false;
                if (userObj.password === result.password) {
                    match = true;
                }
            }
            catch (err) {
                match = false;
            }
            db.close();
        });
    });
    console.log(match)
    return match
}

//Inserts the userObj into the database
//The userObj will contain firstName, lastName, email, password
function create_account(userObj) {
    var success = false;
    MongoClient.connect(url, function(err, db) {
        
        var dbo = db.db(db_name);
        //Checks if an account with the same email already exists
        dbo.collection("Users").findOne({email:userObj.email}, function(err, result) {
            //If result.email causes an error it means that the result is null 
            //therefore an entry for that email doesn't exist yet
            try {
                result.email
            }
            catch (error) {
                success = true
            }
          });
          //Otherwise inserts the new user into the database
        if(success) {
            dbo.collection("Users").insertOne(userObj, function(err, res) {
                db.close();
            });
        }
    });
    return success
}

//If the user forgets their password they can input their email and their password
//will be emailed to them.
function forgot_password(userObj) {

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
        dbo.collection("Users").findOne({email:userObj.email}, function(err, result) {
          if (err) return false;
          
          send_email(result);

          db.close();
        });
      });
      return true
}

router.post("/login", function(req, res){
    const generateAuthToken = () => {
        return crypto.randomBytes(30).toString('hex');
    }

    if (login(req.body)) {
        console.log("LOGGED IN!");
        var authToken = generateAuthToken();

        authTokens[authToken] = req.body.email;

        res.cookie('AuthToken', authToken);
        res.redirect('../../../protected');
        return;
    } else {
        res.render('home/login');
    }
});

//Sends the user an email with their password
router.post("/forgotpassword", function(req, res){
    if (forgot_password(req.body)) {
        res.json("An email has been sent to you with your password.");
    }
    else {
        res.json("An account with this email does not exist");
    }
});

//Creates an account for the user
router.post("/register", function(req, res){
    if (create_account(req.body)) {
        res.json("Account Created!");
    }
    else {
        res.json("Error, an account with this email address already exists.");
    }
});

module.exports = router;