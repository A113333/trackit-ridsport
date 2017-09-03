var showAllHorsesTemplate = require('../../templates/showAllHorses.hbs');
var showHorseTemplate = require('../../templates/showHorse.hbs');
var addHorse = require('./addHorseBtn');

var user;
var userHorses;



var displayAllHorses = function () {
  $.get('/' +
    '', function (data) {
    console.log(data);
    user = data.user;
    userHorses = data.horses;
    $('.main-content').html(showAllHorsesTemplate(data)).promise().done(function () {
      $('.horseDisplay').click(function (event) {
        var id = $(this).attr('id');
        console.log(id);
        displaySingelHorse(id);
      });

      $('.addHorseBtn').click(function () {
        console.log("addHorsBtn user");
        console.log(user);
        addHorse.addHorse(user);
      });
    });
  });
};

module.exports = {
  displayHorses: displayAllHorses,
};
