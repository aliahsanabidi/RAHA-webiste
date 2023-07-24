const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mongoose = require("mongoose");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://my_username:my_password@cluster0.udlqg3k.mongodb.net/DATABASE=customerDB?retryWrites=true&w=majority", {useNewUrlParser: true});
//previous mongoose connect line we used. It used to send the data when we were logging through localhost
// mongoose.connect("mongodb+srv://aliahsan_raha:amal9288@cluster0.udlqg3k.mongodb.net/customerDB", {useNewUrlParser: true});
const customerSchema = mongoose.Schema({
  firName: String,
  lasName: String,
  emailaddress: String,
  phoneNumber: String,
  issueAtHand: String
}, {timestamps: true});

const Customer = mongoose.model("Customer", customerSchema);

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.get("../index.html", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.get("/success.html", function(req, res){
  res.sendFile(__dirname + "/success.html");
});

app.post("/failure.html", function(req, res){
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;
  var phoneNumber = req.body.phoneNumber;
  var issueAtHand = req.body.issueAtHand;

const newCustomer = new Customer ({
  firName: firstName,
  lasName: lastName,
  emailaddress: email,
  phoneNumber: phoneNumber,
  issueAtHand: issueAtHand},
);

  // newCustomer.save(function(err){
  //   if (err){
  //     // res.redirect("/failure.html");
  //     console.log(err);
  //   } else {
  //     res.redirect("/success.html");
  //   }
  // });

  newCustomer.save();

  console.log(firstName, lastName, email, phoneNumber, issueAtHand);

  // res.redirect("../success.html");
});



app.post("/", function(req, res){
  res.redirect("/");
});

app.get("../failure.html", function(req, res){
  res.sendFile(__dirname + "/failure.html");
});



app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
