var addHorseTemplate = require('../../templates/addHorseTemplate.hbs');
var imgCarulseTemplate = require("../../templates/lib/chooseImg.hbs");
var crittsHelpers = require("./critts");


//displayplayCritts funktionen som  visar kriterier selectn, första parametern: hur många andra parameter: vilken array av slect värden som skall användas

//var Swiper = require('../../../node_modules/swiper/dist/js/swiper.min.js');

//för att nå img från anna funktion
var img       = '';

var creatDefaultCritts = function () {

  var tempCriterias =[];
  var critts = []; // lösgjordhet framåt
  var criterias = [];
  $("#defaultCritts option:selected").each(function () {
    tempCriterias.push($(this).text());
  });

  window.localUser.typeOfTraning.forEach(function (curr, index) {
    var temp = {
      type: curr,
      critts : tempCriterias.splice(0)};
    criterias.push(temp);

  });
}

var addHorse = function (user) {
  window.location.hash ="addHorse";
  $( "#appHeader" ).html( "Mina Hästar, Lägger till ny häst:" );
  $('.main-content').html(addHorseTemplate(window.localUser)).promise().done(function () {
    crittsHelpers.addAndRemoveCritts();
     $('.chooseImg').html(imgCarulseTemplate({
        title: 'Välj Bild',
        icons: ['/images/horseIcons/horse1.png', '/images/horseIcons/horse6.png', '/images/horseIcons/horse5.png', '/images/horseIcons/horse4.png', '/images/horseIcons/horse3.png', '/images/horseIcons/horse2.png',
          '/images/horseIcons/horse7.png', '/images/horseIcons/horse8.png', '/images/horseIcons/horse9.png', '/images/horseIcons/horse10.png', '/images/horseIcons/horse11.png', '/images/horseIcons/horse12.png']
      })
    ).promise().done(function () {


     $('#light-slider').lightSlider({
       item:5,
       loop:true,
       slideMove:1,
       easing: 'cubic-bezier(0.25, 0, 0.2fa5, 1)',
       speed:600,
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


    //https://github.com/sachinchoolur/lightslider

    // klick på en icon bild
    $('img.iconImg').click(function () {
      $('.iconImg').removeClass('bordered');
      console.log(event.target);
      img = event.target.src;
      $(this).addClass('bordered');

    });
     });

    $('.addHorseBtn').click(function () {
      console.log("körs");
        var horse = {
          name: $('#horseName').val(),
          age:  $('#horseAge').val(),
          type: $('#horseType').val(),
          img: img,
          u:  $('#u').val(),
          ue: $('#ue').val(),
          e: $('#e').val(),
        };
        console.log("horse on post");
        console.log(horse);
// om formuläret är valid så returnas true och en post körs, annars ingenting
      if ($("#addHorseForm").validate({
          errorPlacement: function(){
            return false;  // suppresses error message text
          },

          rules: {
            // simple rule, converted to {required:true}
            name: "required",
            horseType: "required",
            critt0: "required",
            age: "required",

            // compound rule
            //email: {
            //  required: true,
            //   email: true
            //  }
          },

          wrapper: "span",
        })) {
        console.log("validation returnns true");
          $.ajax({
            url: 'horses',
            type: 'POST',
            data: JSON.stringify(horse),
            contentType: 'application/json',
            success: function(data){
              console.log(" ----- horse was add, the response from server:");
              console.log(data);
              window.localUser = data;
              window.location.hash = "userHorses";
            },
            fail: function (msg) {
              window.location.hash = "userHorses";
            }
          })
        }
      else {
        console.log("validation false")
      }


    });



  });

};

module.exports = {
  addOnClick: addHorse,
};
