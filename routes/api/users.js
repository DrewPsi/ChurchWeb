var express = require("express");

var router = express.Router();

//Connects to the database
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var db_name = "ChurchDatabase";

//Checks if the email and password match
function login(userObj) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(db_name);
        dbo.collection("Users").findOne({email:userObj.email}, function(err, result) {
          if (err) throw err;
          
          if (userObj.password == result.password) {
            return true;
          }
          else {
            return false;
          }

          db.close();
        });
    });
}

//Inserts the userObj into the database
//The userObj will contain firstName, lastName, email, password
function create_account(userObj) {

    MongoClient.connect(url, function(err, db) {
        
        var dbo = db.db(db_name);
        //Checks if an account with the same email already exists
        if (dbo.collection("Users").find({email: userObj.email}).limit(1)) {
            return false
        }
        //Otherwise inserts the new user into the database
        dbo.collection("Users").insertOne(userObj, function(err, res) {
            db.close();
        });
        return true
    });
}

router.get("/", function(req, res){
    res.json("This is a json status code for the users api");
});

router.get("/login", function(req, res){
    
});

router.post("/signup", function(req, res){
    if (create_account(req.body)) {
        res.json("Account Created!");
    }
    else {
        res.json("Error, an account with this email address already exists.");
    }
});

module.exports = router;