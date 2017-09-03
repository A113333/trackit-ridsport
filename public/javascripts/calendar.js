var calendar = {};
var data = [{}];
var moment = require('moment/min/moment-with-locales.min');
var eventArray = [];
var calEventArry = [];
var addPlanTemplate = require("../templates/addPlan.hbs");
var critts = require("./btns/critts");
var print = require("./print");

//{eventType: "Hoppning", date: '2017-07-09', title: 'CLNDR GitHub Page Finished', url: 'http://github.com/kylestetz/CLNDR' },
//{eventType: "Hoppning", date: '2017-07-09', title: 'CLNDR GitHub Page Finished', url: 'http://github.com/kylestetz/CLNDR' },
//{eventType: "Hoppning", date: '2017-07-19', title: 'CLNDR GitHub Page Finished', url: 'http://github.com/kylestetz/CLNDR' }
require('./CLNDR');
var calTemplate = require('../templates/cal.hbs');
var displayEventsTemplate = require('../templates/displayEvents.hbs');
var thisMonth = moment().format('YYYY-MM');

var addPlanBtn = require("./btns/addPlanBtn");
var addloggBtn = require("./btns/addLogg");

var printHome = function () {
  $( ".bottomNavBar" ).removeClass( "hidden" );
  $( "#appHeader" ).html( "Min Kalender" );
  $('.main-content').html(homeTemplate()).promise().then(function () {

      display('#mainCal', '#eventInfo', window.localUser);

  })

};

var addLoggsToEvents = function () {

  var tempArr = [];
  var tempLoggArr = [];
  eventArray.forEach(function (curr, index, arr) {
    if(curr.eventType === "logg"){
      //var logg = arr.slice(index, 1);
      //console.log("logg from foreach")
      tempLoggArr.push(curr);
    }
    else if(curr.eventType ==="userLogg"){

      tempLoggArr.push(curr);
    }
    else{
      tempArr.push(curr)
    }
  });


  tempLoggArr.forEach(function (curr, index) {
    tempArr.forEach(function (curr2, index2, arr) {
      if(curr2.id === curr.id){
        if(curr.eventType === "userLogg"){
          console.log("found a userlogg")
          curr2.userLogg = curr;
        }
        else{
          console.log("found a match" + index2);
        curr2.logg = curr;
        }
      }
    })
  });


  calEventArry = tempArr.slice(0);

};

var clndr = function (divId, eventsId, eventArr) {

  //addLoggsToEvents();

  console.log('--- Calender is called on : divid eventsId window.localUser.tranings -----');
  console.log(divId);
  console.log(eventsId);
  console.log(window.localUser.tranings);
  $(divId).clndr({
    weekOffset: 1,
    events: window.localUser.tranings,
    render: function (data) {
      var template = calTemplate(data).toString();
      // To check if the templete is being loaded correctly
      //console.log(template);
      return template;
    },

    daysOfTheWeek: ['S', 'M', 'T', 'O', 'T', 'F', 'L'],

    clickEvents: {
      click: function (target) {
        var date = target.date._i;
        console.log(date);
        var thisDaysEvents = target.events;
        $('.clickedDate').removeClass('clickedDate');
        $(target.element).toggleClass('clickedDate');

        console.log("---target.events---");
        console.log(target.events);
        $(eventsId).html(displayEventsTemplate(target.events)).promise().then(function () {
          $(".addLoggBtn").click(function (clickEvent) {
            window.location.hash ="#addLogg";

            console.log("-------- clickEvent.target.id ----------------");
            console.log(clickEvent.target);

            if(thisDaysEvents.length > 0){
              console.log("-------- events längre än 0 --------");
              thisDaysEvents.forEach(function (curr, index) {
                console.log("curr : " + JSON.stringify(curr));
                console.log(clickEvent.target);
                if(curr._id = clickEvent.target.id){
                  console.log("curr----- finns");
                  console.log(curr);
                  print.addLogg(curr);
                }});
            }
            else {
              print.addLogg(events[0])
            }
          });
          $(".deleteLoggBtn").click(function (event) {

            var id = $(this).data("id");

            $.ajax({
              url: "/user/horseLogg" + '?' +"id="+ id,
              type: 'DELETE',
              success: function(data){
                console.log(data);
                window.localUser= data;

                ('#mainCal', '#eventInfo', window.localUser);
                scrollTo(0,0)
              },
              error: function(data){
                console.log(data)
              }
            });
          });

          $("#addTraning").click(function () {
            window.location.hash ="#addTraningPlan";
           print.addTraning(date)
          })
        })

      },
      onMonthChange: function (month) {
        console.log('you just went to ' + month.format('MMMM, YYYY'));
      },
    },
    doneRendering: function () {
      //om man behöver nån extra callback

    },

    multiDayEvents: {
      singleDay: 'date',
      endDate: 'endDate',
      startDate: 'startDate',
    },

  });
};

// dena funktionen som anropas utifrån för att visa calendern
var display = function (divID, eventsId, user) {
  // console.log("cal called on----- divId------ EventsId----- EventsArr");
  // console.log(divID);
  // console.log(eventsId);
  // console.log(window.localUser.tranings);
  if(window.localUser.tranings != undefined){
    console.log('--- Event Array Was sent to displayCal--- user != undefined');
    console.log(eventArray);
// anropar calender construtorn med de divsen vi fått som argument
    clndr(divID, eventsId);

    //om man vill ha idag förvalt
    $( ".today" ).trigger( "click" );
  }
  else{
  // Events o load into calendar
    console.log('--- tranings array Array ---');
    console.log(window.localUser.tranings);
    clndr(divID, eventsId);


  }
};

module.exports = {
  display: display,
};

