var crittsTemplate = require('../../templates/lib/selectCritts.hbs');
var selectTemplate = require('../../templates/lib/singelCritt.hbs');
var addOneCrittTemplate = require("../../templates/lib/addOneCritt.hbs");
var defaultCritts = ["Takt", "Känsla", "Framåtbjudning", "Avspändhet", "Lösgjordhet", "Känsla hand/mun", "Samling", "Rakriktning", "Liksidighet", "Focus"];
var nrOfCritts = 2;
var horsesArr;
var preSelected;
var crittsArr = [];
var user;

var addCritt = function (newCritt) {
  console.log('funkar');

};
var printSelects = function () {
  // todo fel hantering för dessa
  console.log("----------preSelected---------");
  console.log(preSelected);

  console.log("----------crittsArr---------");
  console.log(crittsArr);

  console.log("--------nrOfCritts------");
  console.log(nrOfCritts)

  var critts = {
    criterias: [] ,
  };
  for(i = 0 ; i < nrOfCritts; i ++){
    critts.criterias.push(crittsArr)
  }

  $('#defaultCritts').html(crittsTemplate(critts)).promise().done(function () {
    if(preSelected === undefined){
      console.log("no preslects")
    }
    else{
      console.log(preSelected);

      preSelected.forEach(function (curr, index) {
        var currInput = "#critt" + index.toString();
        var newValue = curr;
        $("#critt" + index.toString()).val(curr);
        console.log(curr);
        console.log(currInput)
      })

      // $('.crittGrp').each(function (index, value) {
      //   var currInput = "#critt" + index.toString();
      //   var newValue = preSelected[index];
      //   $(currInput).val(newValue.toString());
      //   console.log("--------This each curr input and preselect at index    ----------");
      //   console.log($(currInput).val());
      //   console.log(preSelected[index])
      // })

    }
    console.log("#crit1 after .crittgrp .each");
    console.log($("#critt1").val());

  })
};

var displayplayCritts = function (nrOfSelects, user, horses) {
  if(user === undefined){
    console.log("---------user Undefined critt köres------");
    console.log(user);
    $.get('/user', function (data) {
      user = data;
      crittsArr = data.user.kriterier.slice(0);
      console.log(user)
    })

  }
  else {
    console.log("-------user avible critt.js------")
    console.log(user);
    crittsArr = user.kriterier.slice(0)
  }

  if(nrOfSelects ===undefined){
    nrOfCritts = 2;
  }
  else{
    nrOfCritts = nrOfSelects
  };

  if(horses === undefined){
    console.log("horse  undefined:");

    $.get( "/", function( data ) {
      console.log("got all localHorses");
      console.log(data);
      horsesArr = data.horses
    }).promise().done(function () {
      var tempHorse;
      var tempTypeOfTraning;

      $('#horse').change(function (e){
       var horsename = this.value;
        //console.log(horsename);
        tempTypeOfTraning = $('#type').val();
      //  console.log(tempTypeOfTraning);


        horsesArr.forEach(function (curr, index) {
          if(curr.name === horsename){
            console.log("Found Horse");
            console.log(curr);
            tempHorse = curr;
            //om typ av träning är vald
            if(tempTypeOfTraning != " "){
              curr.criterias.forEach(function (curr, index) {
                console.log("horseArr.For ");
                console.log(tempTypeOfTraning);
                if(curr.type.toLowerCase() === tempTypeOfTraning.toLowerCase()){
                  console.log("------Found a critt arr for preselect ");
                  preSelected = curr.critts.slice(0);
                nrOfCritts = curr.critts.length
                }
              })
            }
          }
        });
        printSelects()
      });

      $('#type').change(function (e){
        tempTypeOfTraning = $('#type').val();
        var type = tempTypeOfTraning.toLowerCase();
        tempHorse.criterias.forEach(function (curr, index) {

          if(curr.type.toLowerCase() === type){
            console.log(curr);
            preSelected = curr.critts.slice(0);
            nrOfCritts = curr.critts.length;
            printSelects();
          }
        })
      });

      $('#nrOfCrits').change(function (e){
        nrOfCritts = $('#nrOfCrits').val();
        printSelects()
      })
    });
  }
};

var addAndRemoveCritts = function() {
  var counter = 0;
  $('#addCritt').click(function () {
    counter ++;
    console.log(window.localUser.critts)
    $("#defaultCritts").append(addOneCrittTemplate({crittArr:window.localUser.critts, counter:counter})).promise()
  });

  $('#deleteOneCritt').click(function () {

    if($('#defaultCritts select')){
    $('#defaultCritts select').last().remove();
    }
  });

};

var removeOnCritt = function () {

};
//
//  $('#nrOfCrits').change(function (e) {
//    critts.criterias = [defaultCritts ];
//    var optionSelected = $('option:selected', this);
//    nrOfCritts = this.value;
//
//    console.log('kör nrOfCrits.change nr of critts:');
//    console.log(nrOfCritts);
////anropar funktionen som lägger visar kriterier selectn, första parametern: hur många andra parameter: vilken array av slect värden som skall användas
//    printSelects();
//  });
//
//};

var getAllCritts = function () {
  var critts = []; // lösgjordhet framåt
  $("#defaultCritts option:selected").each(function () {
    console.log($(this).text());
    critts.push($(this).text());
  });

  return critts;
};

module.exports = {
  addCritt: addCritt,
  displayCritts: displayplayCritts,
  getAllCritts: getAllCritts,
  addAndRemoveCritts: addAndRemoveCritts
};