var express = require("express");

var app = express();

var router = express.Router();

var index = require("./routes/index.js")
var rooms = require("./routes/rooms.js")

router.use("/", function(req,res,next) {
  next();
});
router.use("/rooms",function(req,res,next){
  next();
});
router.use("/room/:id/:major/:minor",function(req,res,next){
  console.log(req.params.id)
  if(req.params.id == 0) {
    res.json({"message" : "You must pass ID other than 0"});    
  }
  else next();
});

router.get("/", index);
router.get("/rooms", rooms)
router.get("/room/:id/:major/:minor", rooms)

app.use("/",router);

app.listen(3000,function(){
  console.log("Live at Port 3000");
});
