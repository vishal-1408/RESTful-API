var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
//
// mongoose.set("useNewUrlParser","true");
// mongoose.set("useCreateIndex","true");
// mongoose.set("useUnifiedTopology","true");
// mongoose.set("useFindAndModify","false");
mongoose.connect("mongodb://localhost/wiki",{useNewUrlParser: true,useUnifiedTopology:true});

articleSchema = new mongoose.Schema({
  title : String,
  content : String
});

var Article= mongoose.model("Article",articleSchema);

app.set("view engine","ejs");
app.use(bodyParser({extend:true}));

app.get("/",function(req,res){
  res.send("hello");
})


app.route("/articles")
.get(function(req,res){
  Article.find({},function(err,sol){
    if(err) console.log(err);
    else{
      res.send(sol);
    }
  })
})

.post(function(req,res){
  Article.create(req.body.article,function(err,sol){
    if(err) {
      console.log(err);
      res.send(err);
    }
    else{
      console.log(sol);
      res.send("post Saved succesfully");
    }
  })
})

.delete(function(req,res){
  Article.deleteMany({},function(err,sol){
    if(err) res.send(err);
    else{
      res.send("articles deleted succesfully");
    }
  })
})

app.route("/articles/:id")
.get(function(req,res){
  console.log(req.params.id);
  Article.findOne({title:req.params.id},function(err,sol){
    if(err) res.send(err);
    else {
      res.send(sol);
    }
  })
})
.put(function(req,res){
  console.log(req.params.id);
  Article.replaceOne({title:req.params.id},req.body.article,function(err,sol){
    if(err) res.send(err);
    else {
      res.send("succefully updated");
      console.log(sol);
    }
  }
  )
})
.patch(function(req,res){
  console.log(req.params.id);
  Article.updateOne({title:req.params.id},req.body.article,function(err,sol){
    if(err) res.send(err);
    else {
      res.send("succefully updated");
      console.log(sol);
    }
  }
  )
})
.delete(function(req,res){
  Article.deleteOne({title:req.params.id},function(err){
    if(err) console.log(err);
    else{
      res.send("Succesfully Deleted");
    }
  })
})

app.listen(3000,()=>{
  console.log("server started");
})
