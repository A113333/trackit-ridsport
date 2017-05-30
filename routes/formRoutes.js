/**
 * Created by A113.
 */
"use strict";
/*jshint esversion: 6 */


//for reference
//let home = function(req, res, next) {
//    res.render("home/index", { csrfToken: req.csrfToken(),title: "Alles Snippets", success: req.session.success, errors: req.session.errors });
//    req.session.errors = null;
//};



// var Horse = require("../models/addHorse");

var addHorsePage = function(req, res, next) {
    res.render("addHorse");
};

var postHorse = function(req, res, next) {

    //var horseName = req.body.name;

    var alle = new Horse({
       name: "lucky",
        age: 11,
        gender: "valack",
        type: "hopp"
    });
   // console.log(alle);
    console.log(req.body);
    res.redirect("/addHorse")
};




module.exports = {
    addHorsePage: addHorsePage,

};