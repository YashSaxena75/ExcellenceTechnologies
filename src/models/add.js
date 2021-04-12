// Modules required by the application
const express = require("express");
const mongoose = require("mongoose");
const validator = require("validator");

//Creating Model for candidate
const list = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true,unique:true,
    validator(value)
    {
        if(!validator.isEmail(value))
        {
            console.log("Invalid Email");
        }
    }
    }

})


// Creating Model for test_score
const lists = new mongoose.Schema({
    email: {type:String,required:true,unique:true},
    firstround: {type:Number, required:true , min:1,max:10},
    secondround: {type:Number, required:true,min:1,max:10},
    thirdround: {type:Number, required:true,min:1,max:10}

})

//Creating Collection candidate 
const Candidate = new mongoose.model("Candidate",list);

//Creating Collection test_score
const Testscore = new mongoose.model("Testscore",lists);

//export both the collection 
module.exports = {Candidate , Testscore};