const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/sampledb";

function testConnection(){
    MongoClient.connect(url, function(err,db){
        if(err) throw err;
        console.log("Connected");
        db.close();
    })
}

function createCollection(colName){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sampledb");
        dbo.createCollection(`${colName}`, function(err, res) {
          if (err) throw err;
          console.log("Collection created!");
          db.close();
        });
      });
}

function insertNewUser(username,email){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db("sampledb");
        let dat = { username, email};

        dbo.collection("users").insertOne(dat, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      });
}

function readUserByEmail(email){
    MongoClient.connect(url, function(err,db){
        if(err) throw err;
        let dbo = db.db("sampledb");
        dbo.collection("users").findOne({email},function(err,res){
            if(err) throw err;
            console.log(res);
            db.close();
        })
    })
}

function deleteByEmail(email){
    MongoClient.connect(url, function (err, db) {
        if(err) throw err;
        let dbo = db.db("sampledb");
        dbo.collection("users").deleteOne({email}, function (err,res) {
            if(err) throw err;
            console.log("Successfully deleted a user");
            db.close();
        })
    })
}

function updateEmailByUsername(username,newemail) {
    MongoClient.connect(url, function (err, db) {
        if(err) throw err;
        let dbo = db.db("sampledb");
        dbo.collection("users").updateOne({username},{$set : {email : newemail}}, function (err,res) {
            if(err) throw err;
            console.log("Successfully updated a user");
            db.close();
        })
    })
}

module.exports = {
    testConnection,
    createCollection,
    insertNewUser,
    readUserByEmail,
    deleteByEmail,
    updateEmailByUsername
}
