//Inserts the userObj into the database
//The userObj will contain firstName, lastName, email, password
function create_account(userObj) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    var db_name = "";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(db_name);
        dbo.collection("users").insertOne(userObj, function(err, res) {
            if (err) throw err;
            db.close();
        });
    });
}