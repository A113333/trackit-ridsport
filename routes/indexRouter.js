/**
 * Created by AlleochSaga on 10/02/17.
 */
"use strict";
/*jshint esversion: 6 */

// Use the express.Router class to create modular, mountable route handlers.
var express = require("express");
var router = express.Router();
//var formRoutes = require("../formRoutes.js");
//var mainRoutes = require("./mainRoutes.js");

//models
var Horse = require("../models/addHorseModel");

//var criterias = ["takt", "känsla", "framåtbjudning"];

var criterias = { criteria1:['Takt'], criteria2:["Framåtbjudning"],  criteria3:['Känsla'] };


router.get('/', function(req, res) {
    res.render('index.hbs');
});

router.get("/addHorse", function(req, res, next) {
    res.render("addHorse.hbs");
});

router.post("/addHorse", function(req, res, next) {

    var horse = new Horse ({
        name:  req.body.name,
        age: req.body.age,
       //  gender: req.body.gender,
        type: req.body.type,

        });
    console.log(req.body);
    console.log(horse.name + horse.age);
horse.save( function (err, horse) {
    if(err) return console.error(err);
    horse.speak();

});
    res.redirect("/addHorse")
});



router.get("/addTraning", function(req, res, next) {
    console.log("köra laddar add traning");
    res.render("addTraning.hbs", {"criterias" : criterias} );
});


router.post("/addTraning", function(req, res, next) {
    console.log(req.body);
    res.redirect(200, "/savePage.hbs");
});


router.get('/home', function(req, res, next) {
    res.render('home.hbs');
});


router.get('/savePage', function(req, res, next) {
    console.log("kööör /savePage --------------------------");
    res.render('savePge.hbs');
});




// Exports
module.exports = router;