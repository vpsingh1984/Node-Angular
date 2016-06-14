var express = require('express');
var app =  express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get("/contactlist", function(req, res){
  console.log('Request Coming from controller');

  db.contactlist.find(function(err, docs){
     console.log(docs);
     res.json(docs);
  });
 });

app.post('/contactlist', function(req, res){
  console.log(req.body);
  db.contactlist.insert(req.body, function(err, doc){
    res.json(doc);
  });
});

app.delete('/contactlist/:id', function(req, res){
  var id = req.params.id;
  console.log(id);
  db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
    res.json(doc);
  })
});

app.get('/contactlist/:id', function(req, res){
  var id = req.params.id;
  console.log(id);
  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
    res.json(doc);
  })
});

app.put('/contactlist/:id', function(req, res){
  var id = req.params.id;
  console.log(id);
  db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc){
      res.json(doc);
    });
});







// var path = require('path');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// //var exphbs = require('express-handlebars');
// //var expressValidator = require('express-validator');
// //var flash = require('connect-flash');
// //var session = require('express-session');
// //var passport = require('passport');
// //var LocalStrategy = require('passport-local').Strategy;
// var mongo = require('mongodb');
// var mongoose = require('mongoose');
// //mongoose.connect = ('mongodb://127.0.0.1:27017/loginapp');
// mongoose.connect('mongodb://localhost/loginapp');
// var db = mongoose.connection; 

// //View Engine

// //Body parser middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(cookieParser());

// //set static folder
// app.use(express.static(path.join(__dirname, 'public')));


app.listen(5000);
console.log("server running on 5000");