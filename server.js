
var express=require("express");
var path=require('path');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var User=require("./models/Reg");
var bcrypt=require('bcrypt');
var session=require('express-session');

//connect specify our database(kplc db)
mongoose.connect("mongodb://127.0.0.1:27017/kplc");
//conncet to db
let db=mongoose.connection;
//show if connected
db.once('open',function(){
    console.log("db connected");
});
//check for errr
db.on('error',function(err){
console.log(err);
});
//initial express app
var app=express();
app.use(express.static(path.join(__dirname, 'Public')));

//middle ware to parse post data from the form 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
var engine = require('ejs-locals');
//set up session middleware
app.use(session({secret:"hutot",reset:false,saveUninitialized:true}));
app.engine('ejs', engine);
//set ejs as our templation engine
app.set('view engine','ejs');
//set the dir where our views will be located
app.set('views','Views');
//set the public folder for css and js

app.get("/",function(req,res){

    res.render("index.ejs");
});
app.get("/thewife", function(req,res){

res.render("shirley.ejs",{fname:"shirley",sname:"Moraa", lname:"Ondieki"})
});
app.post("/payment",function(req,res){
  var email=req.body.email;
  var amount=req.body.amount;
  var acc=req.body.acc;

});
app.get("/Pay",function(req,res){

    res.render("Pay.ejs");
});

app.get("/math",function(req,res){

    res.render("analysis.ejs",{name:"philip",age:100});
});
app.get("/dash",function(req,res){

    res.render("dash.ejs",{name: [12, 19, 3, 5, 2, 3,12,80,70,90,40,21,35,60]});
});

app.get("/token/:id",function(req,res,next){
var stripe = require("stripe")(
  "sk_test_A98yWXNGWXcQZBMc3DkXLi3d"
);
 let token=req.params.id
stripe.charges.create({
  amount: 5000,
  currency: "usd",
  source: token, // obtained with Stripe.js
  description: "buying tokken"
}, function(err, charge) {
    if(err){
    res.send("failed")

    }else{
  
  res.send("charged")   
    }
  

});

});


app.post("/login",function(req,res){
var email=req.body.email;
var password=req.body.password;

if(email=="admin@gmail.com"&& password=="pass123"){
    res.render("dash.ejs",{email:email,name:[10,20,30,40,59]})
}



});
app.get("/register",function(req,res){
    res.render("register.ejs");
   var nameer= bcrypt.hashSync("philip",10,function(){});
    console.log(nameer);
});

//drake   
app.post("/register",function(req,res){

    var email=req.body.email;
    var contact=req.body.contact;
    var residence=req.body.residence;
    var password=req.body.password;
    var enc= bcrypt.hashSync(password,10,function(){});
    console.log(enc);


    var newOne=new User({email:email,contact:contact,residence:residence,password:enc});
    newOne.save();
    res.send("registration complete "+email);
});

//start our server at port 3000
app.listen(3000,function(){

    console.log("server started at port 3000");
});