var express = require("express");
var Filter = require('bad-words');

var filter = new Filter();
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
    var sub = req.body.sub;
    var phone = req.body.phone;

    var data = {
        name:name,
        phone:phone,
        job:job,
        shift:shift,
        sub:sub
    };
    if(req.user) {
        //Makes sure the name does not contain swears
        if (filter.isProfane(name)) {
            res.json("Please make sure that your name does not include swears/profane language.");
        }
        else {
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
                            //Inserts into database
                            dbo.collection(date).insertOne(data);
                            db.close();
                        }); 
                    }
                });
                res.json("You have successfully signed up.");
                db.close();
            });
        }
    }
});

//Returns a list of all signed up for a certain shift
router.post("/get", function(req,res){
    var date = req.body.date;
    var shift = req.body.shift;
    if(req.user) {
        MongoClient.connect(url, function(err, db) {
            var dbo = db.db(db_name);
            dbo.collection(date).find({shift:shift}).toArray(function(err, results){
                res.json(results);
            });
            
            db.close();
        });
    }
});

//Deletes a user from the signup
router.post("/delete", function(req, res) {
    //Makes sure user in logged in
    if(req.user) {
        MongoClient.connect(url, function(err, db) {
            var dbo = db.db(db_name);
            dbo.collection(req.body.date).deleteOne({job:req.body.job, shift:req.body.shift});
            res.json("Successfully deleted.");
        });
    }
});

module.exports = router;