global.jQuery = require('jquery');
var $ = require('jquery-browserify');
var moment = require('moment');
var hbsfy = require('hbsfy');
var _ = require('underscore');
var homeTemplate = require('../templates/home.hbs');
var addPlanBtn = require("./btns/addPlanBtn");
require('rangeslider.js');
require('../../node_modules/jquery-validation/dist/jquery.validate.js');
require('../../node_modules/lightslider/dist/js/lightslider.min.js');
var refs = require("../../creds");
// för variablar som är beroende av prossec.env
var common = require('../../common.js');
var appConfig = common.config();


//var Backbone = require('backbone');
//Backbone.$ = $;

var addTraningBtn = require('./btns/addTraningBtn');
var calender = require('./calendar');



var print = require("./print");

var addNavOnClicks = function () {
  $('.showHorses').click(function () {
    window.location.hash = "userHorses"
  });

  $('.calIcon').click(function () {
    window.location.hash = "cal"
  });

  $('.userIcon').click(function () {
    window.location.hash = "user"
  });

  $('.statsIcon').click(function () {
    window.location.hash = "stats"
  });

};

var printHome = function () {
  $( ".bottomNavBar" ).removeClass( "hidden" );

  $('.main-content').html(homeTemplate()).promise().then(function () {

    if(window.localUser === undefined)
      $.get('/user', function (data) {
        console.log("got the user + the  user:");
        console.log(data);
        window.localUser = data;
      }).promise().then(function () {
        $( "#appHeader" ).html( window.localUser.name + "s Kalender" );
        console.log("-----user------ from main page display cal window.localUser.tranings");
        console.log(window.localUser.tranings);
        calender.display('#mainCal', '#eventInfo', window.localUser);
        //addPlanBtn.addPlanBtn(target.date._i);
                });

    else{
      $( "#appHeader" ).html( window.localUser.name + "s Kalender" );
      calender.display('#mainCal', '#eventInfo', window.localUser);
    }

  })

};

//toDo loding animnation
// för framtida integration av loding skärm
$(window).load(function() {
  console.log("window load körs");
  $(".se-pre-con").fadeOut("slow");
});



$(document).ready(function () {
  window.scrollTo(0,0);
  console.log(window.location.hash);


  window.fbAsyncInit = function() {
    FB.init({
      appId      : appConfig.facebook_app_id,
      cookie     : true,
      xfbml      : true,
      version    : '{latest-api-version}'
    });
    FB.AppEvents.logPageView();
  };

  (function(d, s, id){
    console.log("fb inti runs");
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "http//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
    console.log(response)
  });

  if (window.location.pathname == '/') {
      console.log('window path /');
    $(document).ready(function() {


      $("#regBtn").click(function () {
        console.log("onclick showlogin");
        $("#registerBox").toggleClass("hidden");
        $("#fbLoginBtn").toggleClass("hidden")

      });


        $('#logginFacebook').click(function () {
          console.log("loggar in m fbook");

          window.location = refs.fbCbUrl;

        });

        $('#logginGoogle').click(function () {
          console.log("loggar in m google")
        });

        // to hide bottom navbar
        $( ".bottomNavBar" ).addClass( "hidden" );
      });
    }
// för att restatt appen  window.location.pathname = '/home'
    if (window.location.pathname == '/home') {
      $(document).ready(function(){
        console.log("document ready");
        $( "#appHeader" ).html("Kalender" );
      addNavOnClicks();
      if(window.location.hash === "#cal"){
     printHome();}
    });
    }
});
// prints the sutiable page on haschange
$(window).on('hashchange', function() {
  //(x-coord, y-coord);
  window.scrollTo(0,0);
  console.log(window.location.hash);
  if (window.location.hash === "#user") {
    $( "#appHeader" ).html( window.localUser.name + "s Inställningar" );
    $( ".current" ).removeClass( "current" );
    $( "#settingsIcon" ).addClass( "current" );
    print.user(window.localUser);
  };

  if (window.location.hash === "#userHorses") {
    $( "#appHeader" ).html( window.localUser.name + "s Hästar" );
    $( ".current" ).removeClass( "current" );
    $( "#horsesIcon" ).addClass( "current" );
    print.showAllHorses(window.localUser);
  };



  if (window.location.hash === "#addTraning") {
    $( "#appHeader" ).html( window.localUser.name + "s Nya träning" );
    $( ".current" ).removeClass( "current" );
    $( "#calIcon" ).addClass( "current" );
   // print.addTraning();
  };

  if (window.location.hash === "#stats") {
    $( "#appHeader" ).html( window.localUser.name + "s Statestik" );
    $( ".current" ).removeClass( "current" );
    $( "#statsIcon" ).addClass( "current" );
    print.stats(window.localUser);
  };

  if (window.location.hash === "#cal")// same as home
   {
     window.scrollTo(0,0);
     $( ".current" ).removeClass( "current" );
     $( "#calIcon" ).addClass( "current" );
     $( "#appHeader" ).html( window.localUser.name + "s Kalender" );
  printHome(window.localUser)

  };
  //
  // if (window.location.hash = "#userHorses") {
  //   print.user(window.localUser);
  //   print.showAllHorses(window.localUser, localHorses);
  // };
});

