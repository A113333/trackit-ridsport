
var addLoggTemplate = require('../templates/addLogg.hbs');
var addUserLoggTemplate = require('../templates/addUserLogg.hbs');
var showHorseTemplate = require('../templates/showHorse.hbs');
var showAllHorsesTemplate = require('../templates/showAllHorses.hbs');
var homeTemplate = require('../templates/home.hbs');
var userTemplate = require('../templates/user.hbs');
var statsTemplate = require("../templates/stats.hbs");
var confBoxTemplate = require('../templates/lib/confBox.hbs');
var msgBoxTemplate = require('../templates/lib/msgBox.hbs');
var addPlanTemplate = require("../templates/addPlan.hbs");
var statsSwiperTemplate = require("../templates/lib/statsSwiper.hbs");
var statsViewTemplate = require("../templates/lib/statsViewTemplate.hbs");
var topScoresTemplate =  require("../templates/lib/topScores.hbs");


var settingsBtns = require("./btns/settingBtns");
var addHorseBtn = require("./btns/addHorseBtn");
var crittBtns = require("./btns/critts");


var msgBox = function (config) {
  $("body").append(msgBoxTemplate(config)).promise().then(function () {

  })
};
// event är för att kunna skicka med id o date parametrar

var creatHorseLogg = function () {
  var logg = {
    totalScore: 0,//{ score: Number, total: Number}, //typ 20/100
    scores:[],           //[{critt: String, score: Number}], // [{hand: 5}]
    comments: $("#planComments").val(),
    average: 0,
    traningsId: $("#_id").val()
  };

  var totalt = 0;

  // spara alla rangeslider i en array med namn o värde
  $('input[type=range]').each(function (index, value) {
// this and lenght is so that they wont get added to score array
    if(this.name === "lenght"){
      console.log("lenght")
    }
    if(this.name === "intensitet"){
      console.log("intensitet")
    }

    else{
      var currInput = "#score" + index.toString();
     // logg.scores.push($(currInput).val());
      var value =  $(currInput).val();
      if(value===undefined){
        console.log("value undefiend")
      }
      else{
      console.log("-------- this value and currintputVal ------");
      console.log(this);
      console.log(this.name + "  " + value);
      logg.totalScore += Number(value);
      var tempObj = {
        critt : this.name,
        pts: value
      };
      logg.scores.push(tempObj);
      }
    }
  });

  console.log("------  n logg------ ------------------------");
  //logg.totalScore = totalScore();
  console.log(logg.scores.length);
  console.log(logg.totalScore);
  var average = logg.totalScore  / logg.scores.length;
  logg.average = Math.round(average);
  console.log(logg);



  return logg;
};
var sendHorseLogg = function (event, cb) {
  var logg = creatHorseLogg(event);
  $.ajax({
    url: '/user/horseLogg',
    type: 'POST',
    data: JSON.stringify(logg),
    contentType: 'application/json',
    success: function(data){
      cb(data);
    },
    fail: function (msg) {
      window.location.hash = "cal";
      msgBox({class:"fail", text:"Oj något gick fel!"});
      setTimeout(function() {
        $('#msg').remove();
      }, 2000);
    }

  })
};
var creatUserLogg= function (event) {
  var logg = {

    horse: $("#horseName").val(),
    typeOfTraning:  $("#typeOfTraning").val(),
    comments: $("#loggComments").val(),
    scores: [],
    intensitet: $("#intensitet").val(),
    lenght: $("#lenght").val(),
    date: event.date,
    id: Number(event.id),
    totalScore: 0,
  };

  var tempScores =[];
  var totalt = 0;
  var tempScoreObj = {};

  // spara alla rangeslider i en array med namn o värde
  $('input[type=range]').each(function (index, value) {

    if(this.name === "lenght"){
      console.log("lenght")
    }

    if(this.name === "intensitet"){
      console.log("intensitet")
    }
    else{
      var currInput = "#score" + index.toString();
      logg.scores.push($(currInput).val());
      var value =  $(currInput).val();

      if(value === undefined){
        console.log("value is undefined")
      }
      else{
        var scoreName = this.name;
        console.log("-------- this value and currintputVal ------");
        console.log(this);
        console.log(this.name + "  " + value);
        logg['totalScore'] += Number(value);
        tempScoreObj[scoreName] = value;
        tempScores.push(tempScoreObj);
        tempScoreObj = {};
        //console.log($(currInput).val());
      }
    }
  });

  console.log("------------tempScores ------------------------");
  console.log(totalt);
  logg.scores = tempScores.slice(0);
  console.log(logg);
  return logg;

};
var getAllRangeValues = function () {
  var logg= {};
  var tempScores =[];
  var totalt = 0;
  var tempScoreObj = {};

  // spara alla rangeslider i en array med namn o värde
  $('input[type=range]').each(function (index, value) {

    if(this.name === "lenght"){
      console.log("lenght")
    }

    if(this.name === "intensitet"){
      console.log("intensitet")
    }
    else{
      var currInput = "#score" + index.toString();
      var value =  $(currInput).val();
      if(value === undefined){
        console.log("value is undefined")
      }
      else{
        var scoreName = this.name;
        totalt += Number(value);
        tempScoreObj[scoreName] = value;
        tempScores.push(tempScoreObj);
        tempScoreObj = {};
        //console.log($(currInput).val());
      }
    }
  });
tempScores.push({totalt: totalt})
  return tempScores.slice(0);

};

var transformRangeSliders = function () {
  $('input[type="range"]').rangeslider({
    polyfill: false,

    // Default CSS classes
    rangeClass: 'rangeslider',
    disabledClass: 'rangeslider--disabled',
    horizontalClass: 'rangeslider--horizontal',
    verticalClass: 'rangeslider--vertical',
    fillClass: 'rangeslider__fill',
    handleClass: 'rangeslider__handle',

    onInit : function() {
      console.log(this.$range );
      this.output = $( '<div class="range-output" />' ).insertAfter( this.$range ).html(  this.$element.val() );
    },
    onSlide : function( position, value ) {
      this.output.html( value );
    },

    // Callback function
    onSlideEnd: function (position, value) {},
  });
};

var loadTemplate = function (div, template, config ) {
 return $(div).html(template(config)).promise()

};

var confBox = function (config) {
  console.log(config);
  $(".main-content").append(confBoxTemplate(config)).promise().then(function () {
    $("#confBox").addClass("md-show");

    console.log("confbox appended");
    console.log(config.alts[0]+"Btn");
    $("."+config.alts[0]).click(function (clickEvent) {
      console.log("användaren sa nej");
    config.no()
    });
    $("." + config.alts[1]).click(function (clickEvent) {
      console.log("användaren sa ja");
      config.yes();
    });
  })
};


var displaySingelHorse = function (id) {
  window.location.hash = "#displayHorse";
  var tempHorse;
  // om funktionen körs och inte är en reload med sidan(vilket den är om tempHorse finns, så laddar den templaten med rätt häst från id på diven som visade hästen
  if(!tempHorse){
    console.log("no temp horse");
    window.localUser.horses.forEach(function(curr, index, thisArr){
      if(curr._id === id){
       // console.log("found match");
       // console.log(curr);
        tempHorse = curr
      }
    });
  }
  console.log("temp horse");
  console.log(tempHorse);

  $('.main-content').html(showHorseTemplate(tempHorse)).promise().done(function () {
    var horseTranings = [];
    var loadTranings = function (horse) {
      if(tempHorse){
      //console.log("temphorsename " + tempHorse.name);
      window.localUser.tranings.forEach(function (curr, i, arr) {
        if(curr.horseLogg){
          console.log("horselogg finns + tempHorsename");
          console.log(tempHorse.name.toString());
          if(curr.horse === tempHorse.name){
            console.log("found match");
            console.log(curr.horse);
          horseTranings.push(curr);
          }
        }
      })
      }
    };
    loadTranings(tempHorse);
    console.log(horseTranings);
    $(".smallDeleteIcon").click(function (e) {
      console.log("onClick körs");
      config = {
        text: "Vill du ta bort din häst?",
        alts: ["Nej", "Ja"],
        yes: function () {
          var id    = e.target.id;
          var query = {
            _id: id
          };
          console.log("id to delete " + id);
          console.log(query);
          //console.log(data);
          $.ajax({
            url        : '/user/horse',
            type       : 'DELETE',
            data       : query,
            contentType: "application/x-www-form-urlencoded",
            success    : function (data) {
              console.log(" ----- horse  was deleted, the response from server:");
              console.log(data);
              window.localUser = data;
              // reloads the dom after update
              $(".md-overlay").remove();
              $("#confBox").remove();
              return window.location.hash === "#userHorses";

            },
            fail       : function (msg) {
              //toDo modal to display failed db call
              $(".md-overlay").remove();
              $("#confBox").remove();
              console.log("failed post");
              //window.location.hash = "userHorses";
            }
          });

        },
        no: function () {
          // ta bort rutan här
          $(".md-overlay").remove();
          $("#confBox").remove();
        }
      };

      $(".main-content").append(confBoxTemplate(config)).promise().then(function () {
        $("#confBox").addClass("md-show");
        $("."+config.alts[0]).click(function (clickEvent) {
          config.no()
        });
        $("." + config.alts[1]).click(function (clickEvent) {
          config.yes();
        });
      })
    });

  });
};
var showAllHorses = function () {
console.log(window.localUser);
      $('.main-content').html(showAllHorsesTemplate(window.localUser)).promise().done(function () {
        $('.horseDisplay').click(function (event) {
          var id = $(this).attr('id');
          console.log("horse id to display:");
          console.log(id);

          displaySingelHorse(id);
        });

        $('.addHorseBtn').click(function () {
          addHorseBtn.addOnClick();
        });
      });

  };

var addUserLogg = function (event) {
  console.log("--------- localuser befor userlogg");
  console.log(localUser);
  loadTemplate(".main-content", addUserLoggTemplate, window.localUser).then(function () {
    console.log("laddat add user logg templaten");
    transformRangeSliders();

    $(".postUserLoggBtn").click(function (clickEvent) {

      var scores = getAllRangeValues();

      var userLogg = {
        totalScore: totalScore,
        scores: scores,
        comments: $("#loggComments").val(),
        id: event.id,
        traningId: $("#traningId").val(),
      };

      console.log("---- print.adduserLogg------- 1 logg    2 scores");
      console.log(userLogg);
      console.log(scores);

      $.ajax({
        url: '/user/userLogg',
        type: 'POST',
        data: JSON.stringify(logg),
        contentType: 'application/json',
        success: function(data){
          console.log("USER ----- logg posted, the response from server:");
          console.log(data);
        }
      })



    })

  })
};

var addLogg = function (event) {
  console.log("----- event sent to print.addLogg-------");
  console.log(event);
  window.location.hash = "addHorseLogg";

      loadTemplate(".main-content", addLoggTemplate, {event: event, user: window.localUser}).then(function () {
        console.log("addLogg template loaded");

        transformRangeSliders();

        $('.postLoggBtn').click(function (clickEvent) {

// visar en confermation box, till den skickas en text, två alternative, samt vad som skall hända vide de olika alternativen
          confConfig = {
            text: "Vill du lägga till en ryttarlogg?",
            alts: ["Nej", "Ja"],
            yes: function () {
              window.location.hash = "#addUserLogg";
              $( "#appHeader" ).html( "Kalender : Logga Träning" );
              // hämtar, skapar och skickar en ny "häst logg" en ny logg
               sendHorseLogg(event, function (data){
                 $(".main-content").html(addUserLoggTemplate({event: event, user:window.localUser})).promise().then(function () {
                   console.log("laddat add user logg templaten");
                   console.log(event);
                   var eventClass = "calendar-day-" + event.date;
                   $(eventClass).addClass("logged");
                   transformRangeSliders();

                   $(".postUserLoggBtn").click(function (clickEvent) {
               var userLogg =  creatHorseLogg();

                     $.ajax({
                       url: '/user/userLogg',
                       type: 'POST',
                       data: JSON.stringify(userLogg),
                       contentType: 'application/json',
                       success: function(data){
                         console.log("USER ----- logg posted, the response from server:");
                         console.log(data);
                         window.localUser = data;
                         window.location.hash = "cal";
                         msgBox({class:"sucess", text:"Din logg har sparats!"});
                         setTimeout(function() {
                           $('#msg').remove();
                         }, 2000);
                       },
                       fail: function (msg) {
                         window.location.hash = "cal";
                         msgBox({class:"fail", text:msg})
                         setTimeout(function() {
                           $('#msg').remove();
                         }, 2000);
                       }
                     })
                   })

                 })



               });

            },
            no: function () {
            sendHorseLogg(event, function (data) {
              console.log("USER ----- logg posted, the response from server:");
              console.log(data);
              window.localUser = data;
              window.location.hash = "cal";
              msgBox({class:"sucess", text:"Din logg har sparats!"});
              setTimeout(function() {
                $('#msg').remove();
              }, 2000);
            })
            }
          };
          confBox(confConfig);
        });

        $(".back").click(function (clickEvent) {
          window.location.hash = "cal"
        })


      });

};

var home = function (user) {
  console.log("---------------------------------------- home i print körs...!!!!!!!!!!!!!!!!!!!!!!!!!!")
  $( ".bottomNavBar" ).removeClass( "hidden" );
  $('.main-content').html(homeTemplate()).promise().then(function () {

    if(window.localUser === undefined)
      $.get('/user', function (data) {
        window.localUser = data;
      }).promise().then(function () {
        // console.log("-----user------ from main page display cal   + window.localuser n  window.localUser.plan");
        // console.log( window.localUser);
        // console.log( window.localUser.plans);
        displayCal.display('#mainCal', '#eventInfo', window.localUser)

      });


      displayCal.display('#mainCal', '#eventInfo', window.localUser).promise().then(function () {
      })
  })

};

var user = function (user) {
  loadTemplate(".main-content", userTemplate, window.localUser).then(function () {
    console.log("funkar");
    console.log(typeof settingsBtns.addOnClicks);
    settingsBtns.addOnClicks()

  })


};

var stats = function (user) {
  loadTemplate(".main-content", statsTemplate, window.localUser).done(function () {
     loadTemplate('#stastSwiperContainer', statsSwiperTemplate, window.localUser.tranings).done(function () {
       console.log("should render lightslider");
       $('#light-slider').lightSlider({
         item:3,
         loop:true,
         slideMove:1,
         easing: 'cubic-bezier(0.25, 0, 0.2fa5, 1)',
         speed:600,
         adaptiveHeight:true,
         responsive : [
           {
             breakpoint:800,
             settings: {
               item:3,
               slideMove:1,
               slideMargin:6,
             }
           },
           {
             breakpoint:480,
             settings: {
               item:2,
               slideMove:1
             }
           }
         ]
       });

       $('.loggCard').each(function () {
         var $this = $(this);
         $this.on("click", function () {
           console.log($(this).data("traning.type"));
           var data = $(this).data("traning");
           loadTemplate("#statsView", statsViewTemplate, data).done(function () {})
         });
       });
     }
    );
     var topScores = [];
     var tempTraningArr = window.localUser.tranings.slice(0);

    tempTraningArr.sort(function(a,b) {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    });

    tempTraningArr.splice(10);
console.log(tempTraningArr);
    tempTraningArr.forEach(function(curr, index, arr){
       var userTop = 0;
       var userTop = 0;
       var horsesTop = 0;
       var topHorseLogg;
       var topUserLogg;
       if(curr.horseLogg && curr.horseLogg.average > horsesTop ){
           horsesTop = curr.horseLogg.average;
           console.log("found new top old top = " +horsesTop + " new top :"+ curr.horseLogg.average );
           topHorseLogg = curr.horseLogg;
       }

       if(curr.userLogg){
         if(curr.userLogg.average > userTop){
           userTop = curr.userLogg.average;
           console.log("found new top");
           topUserLogg = curr.userLogg;
         }
       }

       if(index === arr.length -1 ){
         console.log("array for each är sluuuut");
         console.log(topHorseLogg);
         console.log(topUserLogg);
         topScores.push(topHorseLogg);
         topScores.push(topUserLogg)
       }


     });
     console.log("after foreach topscores");
     console.log(topScores);
     loadTemplate("#topScores", topScoresTemplate, topScores)



   // https://github.com/sachinchoolur/lightslider
  })
};

//toDo fixa add traning efter nya traning model
var addTraning = function (date) {
  if (window.location.hash != "#addTraning") {
    console.log("hash is not addTraning");
   // window.location.hash = "#addTraning"
  }
  else if(date === undefined){
    // bör lägga till datepicker i addTraning
    console.log("inget datum");
    date = false;
  }

  console.log("---- print / add traning");
  $('.main-content').html(addPlanTemplate(window.localUser)).promise().done(function () {
    console.log("user sent to addPLanTemplate ", window.localUser);
    //kolla så att user objektet är satt

    $( "#appHeader" ).html( "Min Kalender : Lägg till ny träningsplanering" + " " +  date );
    //ifall userobjectet tappats
    if(window.localUser === undefined){
      console.log("-----user undefined addPlanBtn köres-----");

      $.get('/user', function (data) {
        window.localUser= data;
      })
        .fail(function () {
          //user offline
          alert('error');
        });
    }

    // för om rangesliders till "snygga sliders"
    $('input[type="range"]').rangeslider({
      polyfill: false,
      // Default CSS classes
      rangeClass: 'rangeslider',
      disabledClass: 'rangeslider--disabled',
      horizontalClass: 'rangeslider--horizontal',
      verticalClass: 'rangeslider--vertical',
      fillClass: 'rangeslider__fill',
      handleClass: 'rangeslider__handle',

      onInit : function() {
        this.output = $( '<div class="range-output" />' ).insertAfter( this.$range ).html( this.$element.val() );
      },
      onSlide : function( position, value ) {
        this.output.html( value );
      },

      // Callback function
      onSlideEnd: function (position, value) {},
    });
    // sätter onclicks för att kunna lägga till / ta bort kriterier
    crittBtns.addAndRemoveCritts();

    $('#postTraningBtn').click(function () {
      console.log("kör post add plan");
      var traning = {
        horse: $("#horseName").val(),
        type: $("#typeOfTraning").val(),
        comments: $("#planComments").val(),
        critts: crittBtns.getAllCritts(),
        intensitet: $("#intensitet").val(),
        lenght: $("#lenght").val(),
        date: date,
      };
      console.log("traning    amd inArr:");
      console.log(traning);
      var inArr = $.inArray("Välj..", traning.critts);
      console.log(inArr)
     if(traning.horse===""){ $("#horseName").addClass("error").focus();
       $("#horseName").blur(function (event) {
         $("#horseName").removeClass("error")
       }) }
       else if(traning.type===""){ $("#typeOfTraning").addClass("error").focus();
       $("#typeOfTraning").blur(function (event) {
         $("#typeOfTraning").removeClass("error")
       })
       }


      else if (inArr > -1) {
         console.log("erro in critt choose");
       $(".critts").addClass("error").focus();;
       $("#crittHeaderSpan");
       $(".critts").blur(function (event) {
         $(".critts").removeClass("error")
       })

     }
     else{
         console.log("no form errors");
      $.ajax({
        url: 'http://localhost:3000/user/tranings',
        type: "POST",
        data: JSON.stringify(traning),
        contentType: 'application/json',
        success: function(data){
          console.log("USER ----- plan posted, the response from server:");
          console.log(data);
          window.localUser = data;

          //toDo ta bort com nedan
           window.location.hash = "cal";
          //msgBox({class:"sucess", text:"Din plannering har sparats!"})
        },
        fail: function (msg) {
          //window.location.hash = "cal";
          console.log("failed to update " + msg);
          msgBox({class:"fail", text:"Oj, något gick fel, prova igen!"})
        }
      })
     }
    })
  });
};



module.exports = {
  home: home,
  confBox: confBox,
  addLogg: addLogg,
  showAllHorses: showAllHorses,
  user: user,
  stats: stats,
  addTraning: addTraning,
};