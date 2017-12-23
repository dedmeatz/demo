var express = require('express');
var mysql = require('mysql');

var router = express.Router();

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'dev'
});

connection.connect(function(err){
  if(!err) {
    console.log("Database is connected ...");    
  } else {
    console.log("Error connecting database ...");    
  }
});

router.get('/rooms',function(req,res){
  connection.query('SELECT * from rooms', function(err, rows, fields) {
    rows.forEach(function(row, index) {
      connection.query('SELECT * from beacons where beacon_id = ?', row.beacon_id, function(err, beacon, fields) {
        if (!err) {
          console.log('The solution is: ', rows, beacon);
          res.json({"rows" : rows});
        }
        else {
          console.log('Error while performing Query.');
          res.json({"message" : "ERROR"});
        }
      });
    });

    
  });
});

router.get("/room/:id/:major/:minor",function(req,res){
  res.json({"roomId" : req.params.id, "major": req.params.major, "minor": req.params.minor});
});

module.exports = router;
