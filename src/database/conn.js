// Making connection to mongodb database

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/task",{useCreateIndex:true, useNewUrlParser:true, 
useUnifiedTopology:true }).then(() => {console.log("Connection Successful!")})
.catch((err)=>{console.log(err)});