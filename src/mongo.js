const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/sampledb";

MongoClient.connect(url, function(err,db){
    if(err) throw err;
    console.log("Connected");
    db.close();
})