var crittsTemplate = require('../../templates/lib/selectCritts.hbs');
var defaultCritts = ["Takt", "Känsla", "Framåtbjudning", "Avspändhet", "Lösgjordhet", "Känsla hand/mun", "Samling", "Rakriktning", "Liksidighet", "Focus"];
var nrOfCritts = 2;

var addCritt = function (newCritt) {
  console.log('funkar');

  $.post( "/user/addCritt", {data: newCritt }, function( data ) {
    console.log(data);
  });
};

var displayplayCritts = function (nrOfSelects, preSelected, crittArr) {

  var preSelected = preSelected;
  console.log("------ nr of selects-----")
  console.log(nrOfSelects);
  console.log("------ crittARr-----")
  console.log(crittArr)

  var critts = {
    criterias: [] ,
  };

  if(crittArr === undefined){
    var crittArr = defaultCritts;
    console.log("------ crittARr was undefined-----")
    console.log(crittArr)
    for(i = 0 ; i < nrOfSelects; i ++){
      critts.criterias.push(crittArr)
    }
  }

  for(i = 0 ; i < nrOfSelects; i ++) {
    critts.criterias.push(crittArr)
  }

  $('.critts').html(crittsTemplate(critts)).promise().done(function () {
    if (preSelected) {
      console.log(preSelected)
    }
    else{
      console.log("no preslected")
    }

    $("#defaultCritts").each(function (index, value) {
      var currInput = ".critt" + index.toString();
      $("input"[name = currInput]).val('2');
      $(currInput).val('3');
      console.log(this);

      console.log(currInput);


      $(currInput).val(preSelected[index])
      //$("#defaultCritts option:selected")[index].innerHtml = preSelected[index];

     // console.log(  $("#defaultCritts option:selected"))

    })


  })
};

var onClicks = function() { $('.addCrit').click(function () {
  if($("#newCritt").val()===" "){
    console.log("should display a warning")
  }
  var newCritt = $("#newCritt").val();
  console.log($("#newCritt").val());

  addCritt(newCritt);

  defaultCritts.push(newCritt);
  $("#newCritt").val(" ");

  displayplayCritts(nrOfCritts, defaultCritts);

});

  $('#nrOfCrits').change(function (e) {
    critts.criterias = [defaultCritts];
    var optionSelected = $('option:selected', this);
    nrOfCritts = this.value;

    console.log('kör selected');
    console.log(nrOfCritts);
//anropar funktionen som lägger visar kriterier selectn, första parametern: hur många andra parameter: vilken array av slect värden som skall användas
    displayplayCritts(nrOfCritts, defaultCritts);


  });

};

module.exports = {
  addCritt: addCritt,
  displayCritts: displayplayCritts,
  crittsOnclick: onClicks,
};
