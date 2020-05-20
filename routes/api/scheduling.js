var express = require("express");

var router = express.Router();

//Connects to the database
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var db_name = "ChurchDatabase";

router.post("add", function(req, res){
    var date = req.body.date;
    var shift = req.body.shift;
    var job = req.body.job;

    MongoClient.connect(url, function(err, db) {
        var dbo = db.db(db_name);

        dbo.collection(date).find({shift:shift, job:job}, function(err, results) {
            //Job is taken
            if (results) {
                
            }
            //Job is not taken
            else {
                //Job is not taken
                dbo.collection("Users").findOne({email:req.cookies.authToken}, function(err, result) {
                    //User found
                    if (result) {
                        var data = {
                            Name: result.firstName + " " + result.lastName,
                            Phone: result.phone,
                            Job: job,
                            Shift: shift
                        }
                        dbo.collection(date).insertOne(data);
                    }
                });
            }
        });
        db.close();
    });
});

module.exports = router;