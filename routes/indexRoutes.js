/**
 * Created by AlleochSaga on 10/02/17.
 */
'use strict';
/*jshint esversion: 6 */

var common = require('../common.js');
var config = common.config();
var express = require('express');
var router = express.Router();
var User = require('../models/userModel.js');
var passport = require('passport');

//var fbCallback = common.facebook_app_callback;

router.isLoggedIn = function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
   // res.redirect('/');
  return next();
  };


router.get("/", function(req, res, next) {

  res.render("main", { title: 'my other page', layout: 'landingPage' })
});
// ----------------------------Locals----------------------------------------
// ----------------------------Locals----------------------------------------



router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/home#cal', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true, // allow flash messages
  }));

router.get('/signup', function (req, res, next) {

    // render the page and pass in any flash data if it exists
    res.render('signup.hbs', { message: req.flash('signupMessage') });

  });

//process the signup form
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/home#cal', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true, // allow flash messages
  }));



// route for logging out
router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
  });

// =====================================
// GOOGLE ROUTES =======================
// =====================================
// send to google to do the authentication
// profile gets us their basic information including their name
// email gets their emails
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// the callback after google has authenticated the user
router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/home#cal',
        failureRedirect: '/',
      }));



// =====================================
// FACEBOOK ROUTES =====================
// =====================================
// route for facebook authentication and login
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/home#cal',
        failureRedirect: '/',
      }));
// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

// locally --------------------------------
router.get('/connect/local', function (req, res) {
    res.render('connect-local.hbs', { message: req.flash('loginMessage') });
  });

router.post('/connect/local', passport.authenticate('local-signup', {
    successRedirect: '/home#cal', // redirect to the secure profile section
    failureRedirect: '/connect/local', // redirect back to the signup page if there is an error
    failureFlash: true, // allow flash messages
  }));

// facebook -------------------------------

// send to facebook to do the authentication
router.get('/connect/facebook', passport.authorize('facebook', { scope: 'email' }));

// handle the callback after facebook has authorized the user
router.get('/connect/facebook/callback',
    passport.authorize('facebook', {
        successRedirect: '/home#cal',
        failureRedirect: '/',
      }));

// twitter --------------------------------


// google ---------------------------------

// send to google to do the authentication
router.get('/connect/google', passport.authorize('google', { scope: ['profile', 'email'] }));

// the callback after google has authorized the user
router.get('/connect/google/callback',
    passport.authorize('google', {
        successRedirect: '/home#cal',
        failureRedirect: '/',
      }));


// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

// local -----------------------------------
router.get('/unlink/local', function (req, res) {
  var user            = req.user;
  user.local.email    = undefined;
  user.local.password = undefined;
  user.save(function (err) {
    res.redirect('/home#cal');
  });
});

// facebook -------------------------------
router.get('/unlink/facebook', function (req, res) {
  var user            = req.user;
  user.facebook.token = undefined;
  user.save(function (err) {
    res.redirect('/home#cal');
  });
});

// twitter --------------------------------
router.get('/unlink/twitter', function (req, res) {
  var user           = req.user;
  user.twitter.token = undefined;
  user.save(function (err) {
    res.redirect('/home#cal');
  });
});

// google ---------------------------------
router.get('/unlink/google', function (req, res) {
  var user          = req.user;
  user.google.token = undefined;
  user.save(function (err) {
    res.redirect('/home#cal');
  });
});




// --------------------------------------------------------------------


router.get('/home', function (req, res, next) {
  if (req.user === undefined) {
    console.log('inte inloggad');
  }
    res.render('inApp.hbs', { user: req.user});
});



// måste anropas med en array med users localHorses
router.get('/plan', function (req, res, next) {
    var email = req.user.email;
    var horses;
    User.findOne({ email: email }, function (err, user) {
        if (err) return handleError(err);

        var usern = user;
        console.log(user);
        res.render('plan.hbs', { user: usern });
      });

  });


// var id = req.user.email;
//
// if (req.user.email === undefined) {
//   id =  req.user.facebook.email;
// }
//
// var localHorses;
// User.findOne({ email: id }, function (err, user) {
//   if (err) return console.log(err, message);
//
//   var usern = user;
//   console.log(user);
//   if (usern.plan === undefined) {
//     return 'no plans';
//   }
//
//   res.status(200).send({ userplans: usern.plans });
//
// });

//});

// planText   comments

module.exports = router;
