function login(userObj) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    var db_name = "";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(db_name);
        dbo.collection("Users").findOne({email:userObj.email}, function(err, result) {
          if (err) throw err;
          
          if (userObj.password == result.password) {
            //Login is a success
          }
          else {
            //Unsuccessful Login
          }

          db.close();
        });
    });
}