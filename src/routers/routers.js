// Modules required by application

const express = require("express");
const validator = require("validator");
const alert = require("alert");
const path = require("path")
const hbs = require("hbs");
const app = express();
const staticpath = path.join(__dirname,"../views/")
const {Candidate , Testscore} = require("../models/add")
require("../database/conn")

// setting up hbs to create templates for the application
app.use(express.static(`${staticpath}`))
app.set("view engine","hbs");
hbs.registerPartials(`${staticpath}`)
//app.use(express.json());  For Postman
app.use(express.urlencoded({extended:false})); // When we have a Form


//Defining routes


app.get("/",(req,res) => {
    res.render("main");
})
app.get("/add",(req,res) => {
    res.render("index")
});

app.post("/add", async (req,res) => {
    try
    {
        const em = validator.isEmail(req.body.email)
        if(em)
        {
        const result = new Candidate({
            name: req.body.fullname,
            email: req.body.email
        });

        const result1 = new Testscore({
            email:req.body.email,
            firstround: req.body.fround,
            secondround: req.body.sround,
            thirdround: req.body.tround
        })
        const c = await result.save();
        const t = await result1.save();
        res.render("index")
        }
        else
        {
            res.send("Invalid Email")
        }
    }catch(err)
    {
        res.send(err);
    }
})

app.get("/fround", async (req,res) => {
    try
    {
    const resu = await Testscore.aggregate([{$group:{_id:"$id",total:{$sum:"$firstround"}}}])
    const big = await Testscore.aggregate([{$group:{_id:"$id",maxx:{$max:"$firstround"}}}])
    const av = await Testscore.aggregate([{$group:{_id:"$id",avgs:{$avg:"$firstround"}}}])
    const avs = av[0].avgs;
    const max = big[0].maxx
    const sum = resu[0].total
    const emails = await Testscore.find({firstround:max},{email:1,_id:0})
    res.render("fround",{sum:sum,avg:avs,max:max,name:emails})
    }catch(err)
    {
        res.send("It looks like Database is Empty")
    }
})
app.get("/sround", async (req,res) => {

    try{
    const resu = await Testscore.aggregate([{$group:{_id:"$id",total:{$sum:"$secondround"}}}])
    const big = await Testscore.aggregate([{$group:{_id:"$id",maxx:{$max:"$secondround"}}}])
    const av = await Testscore.aggregate([{$group:{_id:"$id",avgs:{$avg:"$secondround"}}}])
    const avs = av[0].avgs;
    const max = big[0].maxx
    const sum = resu[0].total
    const emails = await Testscore.find({secondround:max},{email:1,_id:0})
    res.render("sround",{sum:sum,avg:avs,max:max,name:emails})
    }catch(err)
    {
        res.send("It looks like Database is Empty")
    }
})
app.get("/tround", async (req,res) => {
    try
    {
    const resu = await Testscore.aggregate([{$group:{_id:"$id",total:{$sum:"$thirdround"}}}])
    const big = await Testscore.aggregate([{$group:{_id:"$id",maxx:{$max:"$thirdround"}}}])
    const av = await Testscore.aggregate([{$group:{_id:"$id",avgs:{$avg:"$thirdround"}}}])
    const avs = av[0].avgs
    const max = big[0].maxx
    const sum = resu[0].total
    const emails = await Testscore.find({thirdround:max},{email:1,_id:0})
    res.render("tround",{sum:sum,avg:avs,max:max,name:emails})
    }catch(err)
    {
        res.send("It looks like Database is Empty")
    }
})

app.use(function (req,res,next){
	res.status(404).render('404');
});

module.exports = app;