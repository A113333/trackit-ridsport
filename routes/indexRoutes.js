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
    res.redirect('http://138.68.77.225/auth/facebook/callback');
  return next();
  };



router.get("/", function(req, res, next) {

  res.render("main", { title: 'Track-It Ridsport', layout: 'landingPage' })
});
// route for logging out
router.get('/logout', function (req, res, next) {
  req.logout();
  res.redirect('/');
});

router.get('/login', function (req, res, next) {

  // render the page and pass in any flash data if it exists
  res.render('login.hbs', { message: req.flash('loginMessage') });
});

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
