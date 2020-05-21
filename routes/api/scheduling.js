var express = require("express");

var router = express.Router();

//Connects to the database
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var db_name = "ChurchDatabase";

//Signs a user up
router.post("/add", function(req, res){
    var date = req.body.date;
    var shift = req.body.shift;
    var job = req.body.job;
    var name = req.body.name;

    MongoClient.connect(url, function(err, db) {
        var dbo = db.db(db_name);

        //Checks if exists
        dbo.collection(date).findOne({shift:shift, job:job}, function(err, results) {
            //Job is taken
            if (results) {/*do nothing*/}
            //Job is not taken
            else {
                MongoClient.connect(url, function(err, db) {
                    var dbo = db.db(db_name);
                    //Gets the data
                    dbo.collection("Users").findOne({email:req.user}, function(err, result) {
                        //Creates the data to be stored in the database
                        var data = {
                            name: name,
                            phone: result.phone,
                            job: job,
                            shift: shift,
                            sub: result.firstName + " " + result.lastName
                        }

                        MongoClient.connect(url, function(err, db) {
                                var dbo = db.db(db_name);
                                //Inserts into database
                                dbo.collection(date).insertOne(data);
                                db.close();
                        }); 
                    });
                    db.close();
                });
            }
        });
        db.close();
    });
});

//Returns a list of all signed up for a certain shift
router.post("/get", function(req,res){
    var date = req.body.date;
    var shift = req.body.shift;

    MongoClient.connect(url, function(err, db) {
        var dbo = db.db(db_name);
        dbo.collection(date).find({shift:shift}).toArray(function(err, results){
            res.json(results);
        });
        
        db.close();
    });
});

module.exports = router;