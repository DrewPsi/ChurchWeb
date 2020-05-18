var express = require("express");
var crypto = require('crypto');

var router = express.Router();

//Connects to the database
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var db_name = "ChurchDatabase";

//Randomly generates a pin when an account is created
function generatePin() {
    var string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz12345678901234567890!@!@";
    var pin = "";
    for (let i = 0; i < 8; i++) {
        pin += string[Math.floor(Math.random() * 76)];
    }
    return pin;
}

//Checks if the email and password match
router.post("/login", function(req, res){
    const generateAuthToken = () => {
        return crypto.randomBytes(30).toString('hex');
    }

    MongoClient.connect(url, function(err, db) {
        var dbo = db.db(db_name);
        dbo.collection("Users").findOne({email:req.body.email}, function(err, result) {
            if(result){
                if (req.body.password == result.password) {
                    var authToken = generateAuthToken();

                    authTokens[authToken] = req.body.email;

                    res.cookie('AuthToken', authToken);
                    res.json("Logged in!");
                    return;
                }
                else {
                    res.json("Incorrect password");
                }
            }
            else {
                res.json("No account found with that email address");
            }

            db.close();
        });
    });
});

//If the user forgets their password they can input their email and their password
//will be emailed to them.
router.post("/forgotpassword", function(req, res){

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
        var dbo = db.db(db_name);
        dbo.collection("Users").findOne({email:req.body.email}, function(err, result) {
          
          if (result){
            send_email(result);
            res.json("An email has been sent to you with your password.");
          }
          else {
            res.json("An account with this email does not exist");
          }

          db.close();
        });
    });
});

//Creates an account for the user
router.post("/register", function(req, res){
    var pin = generatePin();
    req.body.password = pin;
    console.log(req.body);

    //Inserts the userObj into the database
    //The userObj will contain firstName, lastName, email, password
    MongoClient.connect(url, function(err, db) {
        var dbo = db.db(db_name);
        
        dbo.collection("Users").insertOne(req.body, function(err, result) {
            //If the user already exists
            if (err) {
                res.json("Error, an account with this email address already exists.");
            }
            else {
                res.json("Account Created! Your pin is " + pin);
            }
            db.close();
        });
    });
});

module.exports = router;