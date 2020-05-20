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
                        console.log(result)
                        var data = {
                            name: result.firstName + " " + result.lastName,
                            phone: result.phone,
                            job: job,
                            shift: shift
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

module.exports = router;