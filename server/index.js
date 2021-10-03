const express = require('express')
const mongoose = require("mongoose")

const app = express();
var cors = require('cors')

const port = 4500;

mongoose.connect("mongodb://localhost:27017/travelcompany")
.then(()=>console.log("MongoDB Connected"))

const Travel = require("./models/travel");
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

app.post("/postData",(req,res)=>{

    const data = req.body;
    Travel.create(data,(err)=>{
        if(err){
            console.log(err)
            res.sendStatus(500)
        }else{
            console.log("Data Created")
            res.sendStatus(200)
        }
    })
})

app.post("/deleteData",(req,res)=>{

    const data = req.body;
    Travel.findByIdAndDelete(data,(err)=>{
        if(err){
            console.log(err)
            res.sendStatus(500)
        }else{
            console.log("Data Delete")
            res.sendStatus(200)
        }
    })
})


app.get("/getData",(req,res)=>{
  Travel.find({},(err,data)=>{
      if(err){
          console.log(err)
      }else{
          res.json(data);
      }
  })
})



app.listen(port,()=>{
    console.log("Server is running on port: " + port)
})