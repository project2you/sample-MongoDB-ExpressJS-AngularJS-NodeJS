var express        =         require("express");
var bodyParser     =         require("body-parser");
var app            =         express();
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var db

// Connection URL
var url = 'mongodb://project2you:8agWav16#@cluster0-shard-00-00-3poj2.mongodb.net:27017,cluster0-shard-00-01-3poj2.mongodb.net:27017,cluster0-shard-00-02-3poj2.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

const stitch = require("mongodb-stitch")
const client = new stitch.StitchClient('demo-hvzuc');

db = client.service('mongodb', 'mongodb-atlas').db('test');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

MongoClient.connect(url, (err, database) => {
  if (err) return console.log(err)
  console.log('Database Connected')
  
  db = database
  
  app.listen(8080, () => {
    console.log('listening on 8080')
  })
  
})

app.get('/',function(req,res){
  res.sendfile("index.html");
});

app.post('/login',function(req,res){
  var user_name=req.body.user;
  var password=req.body.password;
  var myobj = { name: user_name , password: password };
  
  console.log("User name = "+user_name+", password is "+password);
  res.end("done");

    db.collection("item").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
    });
});
