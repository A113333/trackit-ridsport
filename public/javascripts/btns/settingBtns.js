////$(selector).slideDown(speed,callback);
var editArrTemplate = require("../../templates/lib/editArrTemplate.hbs");
var addToUser =require("../../templates/lib/addToUser.hbs");
var confBoxTemplate = require('../../templates/lib/confBox.hbs');

//var draggable = require("../lib/dragabilly");


var redPacklist = function () {
  $("#redPacklist").click(function(){
    $("#redPacklistPanel").slideToggle("fast");
  });
};


var redHorseCritts = function () {

  $("#redHorseCritts").click(function(){
    console.log(window.localUser.critts);

    var loadPanel = function (toggle) {
    $("#redHorseCrittsPanel").html(editArrTemplate({arr:window.localUser.critts})).promise().done(function () {
      // this is so that iam able to reload the view without toggle the panel after the ajax calls
      if(toggle){ if ($(this).is(":hidden")) {
        $(this).slideDown("fast");
        console.log("has class hidden")
      }
      else {
        $(this).slideUp("fast");
      }
      }
      console.log("template loaded to panel");

      // on delete icon: takes the id from the element id, and posts a del request to
      $(".smallDeleteIcon").click(function (e) {
        config = {
          text: "Vill du ta bort bedömningspunkten?",
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
              url        : '/user/critt',
              type       : 'DELETE',
              data       : query,
              contentType: "application/x-www-form-urlencoded",
              success    : function (data) {
                console.log(" ----- userCritt  was deleted, the response from server:");
                console.log(data);
                window.localUser = data;
                // reloads the dom after update
                $(".md-overlay").remove();
                $("#confBox").remove();
                return setTimeout(loadPanel, 100);

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

      $("#showAddToUser").click(function (e) {
        console.log("kör add to user");
        $(".main-content").append(addToUser({title:"Ny bedömningspunkt för häst", placeholder:"Skriv in ett namn på bedömningspunkt här",
          secondPlaceholder: "Skriv en beskrivning av din bedömningspunkt här"})).promise().done(function () {
            console.log("addToUser teomplate loaded");
          //toDo ändra atrb src till okIcon
          $("#closeModal").click(function (e){
            $(".addToUserModalConatiner").remove()
          });
          $("#addToUserBtn").click(function (e) {
            e.preventDefault();
            console.log("showAddTemp in red horse critts körs runs");
            var objectoToAdd = $("#objectoToAdd").val();
            var objectDesc = $("#objectDesc").val();
            var critt = {
              name: objectoToAdd,
              desc: objectDesc
            };
            var data = JSON.stringify(critt);
            console.log("new critts " + data);
            console.log(data);

            $.ajax({
              url: '/user/critt',
              type: 'Post',
              data: data,
              contentType: 'application/json',
              success: function (data) {
                console.log(" ----- critt  was added, the response from server:");
                console.log(data);
                window.localUser = data;
                // reloads the dom after update
                $(".addToUserModalConatiner").remove();
                return setTimeout(loadPanel, 300);

              },
              fail: function (msg) {
                //toDo modal to display failed db call
                console.log("failed post to /critt");
              }
            });
          })
        })
      });
    })
    };
    loadPanel("toggle")
  });
};

var redUSer = function () {

  $("#redUSer").click(function(){
    console.log("hello world");
    $("#redUSerpanel").slideToggle("fast");
  });
};

var editTypesOfTraning = function () {
  $("#editTypesOfTranings").click(function () {
 //   $("#editTypesOfTraningPanel").toggleClass("hidden")
    console.log(window.localUser.typesOfTraning);
    // denna function tar userns träningstypes och visar dem genom en slide down panel när användaren klickar på "redigera träningstyper"
    //lägger även till on click för ta bort och lägg till ny träningstyp
    var loadPanel = function (toggle) {
      $("#editTypesOfTraningPanel").html(editArrTemplate({arr: window.localUser.typesOfTraning})).promise().done(function () {
        if(toggle){
        if ($(this).is(":hidden")) {
          $(this).slideDown("fast");
          console.log("has class hidden")
        }
        else {
          $(this).slideUp("fast");
        }
        }
        $(".smallDeleteIcon").click(function (e) {

          config = {
            text: "Ta bort träningstyp?",
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
                url        : '/user/typesOfTraning',
                type       : 'DELETE',
                data       : query,
                contentType: "application/x-www-form-urlencoded",
                success    : function (data) {
                  console.log(" ----- userCritt  was deleted, the response from server:");
                  console.log(data);
                  window.localUser = data;
                  // reloads the dom after update
                  $(".md-overlay").remove();
                  $("#confBox").remove();
                  return setTimeout(loadPanel, 100);

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
        $("#showAddToUser").click(function (e) {
          console.log("kör add to user");

          $(".main-content").append(addToUser({
            title            : "Ny träningstyp",
            placeholder      : "Skriv in ett namn träningstypen här",
            secondPlaceholder: "Här kan du skriva en beskrivning av din träningstyp"
          })).promise().done(function () {
            //toDo ändra atrb src till okIcon

            $("#closeModal").click(function (e) {
              $(".addToUserModalConatiner").remove()
            });

            $("#addToUserBtn").click(function (e) {
              e.preventDefault();
              console.log("showAddTemp runs");
              var objectoToAdd     = $("#objectoToAdd").val();
              var objectDesc       = $("#objectDesc").val();
              var newTypeOfTraning = {
                name: objectoToAdd,
                desc: objectDesc
              };
              var data             = JSON.stringify(newTypeOfTraning);
              console.log("new typeOfTraning " + data);
              console.log(data);

              $.ajax({
                url        : '/user/typesOfTraning',
                type       : 'POST',
                data       : data,
                contentType: 'application/json',
                success    : function (data) {
                  console.log(" ----- typesOfTraning  was added, the response from server:");
                  console.log(data);
                  window.localUser = data;
                  // reloads the dom after update
                  $(".addToUserModalConatiner").remove();
                  return setTimeout(loadPanel, 500);

                },
                fail       : function (msg) {
                  //toDo modal to display failed db call
                  console.log("failed post");
                  //window.location.hash = "userHorses";
                }
              });
            })
          })
        });
      })
    };
    loadPanel("toggle");
  });
};

var redSelfCritts = function () {
  $("#redUserCrittsBtn").click(function () {

    var loadPanel = function (config) {
    $("#redUserCrittssPanel").html(editArrTemplate({
      //the array to display
      arr   : window.localUser.selfCritts,
      config: ""
    })).promise().done(function () {
      //to toggle slide
      $("#addToUserText").html("Lägg till bedömningspunkt");
      if(config){
      if ($(this).is(":hidden")) {
        $(this).slideDown("fast");
        console.log("has class hidden")
      }
      else {
        $(this).slideUp("fast");
      }
      }

      $("#showAddToUser").click(function (e) {
        console.log("kör add to user");
        $(".main-content").append(addToUser({title:"Ny bedömningspunkt för ryttare",
          placeholder:"Skriv in ett namn för bedömningspunkten här",
          secondPlaceholder: "Här kan du skriva en beskrivning av din bedömningspunkt"})).promise().done(function () {
          //toDo ändra atrb src till okIcon

          $("#closeModal").click(function (e){
            $(".addToUserModalConatiner").remove()
          });

          $("#addToUserBtn").click(function (e) {
            e.preventDefault();
            console.log("showAddTemp runs");
            var objectoToAdd = $("#objectoToAdd").val();
            var objectDesc = $("#objectDesc").val();
            var newSelfCritt = {
              name: objectoToAdd,
              desc: objectDesc
            };
            var data = JSON.stringify(newSelfCritt);
            console.log("new newSelfCritt " + data);
            console.log(data);

            $.ajax({
              url        : '/user/selfCritts',
              type       : 'POST',
              data       : data,
              contentType: 'application/json',
              success    : function (data) {
                console.log(" ----- selfCritts  was added, the response from server:");
                console.log(data);
                window.localUser = data;
                // reloads the dom after update
                $(".addToUserModalConatiner").remove();
                return setTimeout(loadPanel, 500);

              },
              fail       : function (msg) {
                //toDo modal to display failed db call
                console.log("failed post");
                //window.location.hash = "userHorses";
              }
            });
          })
        })
      });
      $(".editIcon").click(function(e){
        // to avoid 2 add buttons
        //$("#addIcon").addClass("hidden");
        $(this).attr("src", "./images/lib/icons/add.png");
        //toDo confBox ta bort critt om ja =
        console.log(e);
        var id = $(event.target).attr('id');
        console.log("id :" + id);
        // this is representing the input box;
        var theCritt = $(this).prev().val();
        console.log("theCritt :" + theCritt);
        console.log(window.localUser.selfCritts);

        $(this).click(function(e){
          console.log("this onclick körs");
          $.ajax({
            url: '/user/selfCritts',
            type: 'POST',
            data: JSON.stringify(window.localUser.selfCritts),
            contentType: 'application/json',
            success: function(data){
              console.log(" ----- userCritt  was updated, the response from server:");
              console.log(data);
              window.localUser = data;

              return reloadArr(data.selfCritts, "#redUserCrittssPanel")


            },
            fail: function (msg) {
              window.location.hash = "userHorses";
            }
          });
        })
      });

      $(".smallDeleteIcon").click(function (e) {
        config = {
          text: "Vill du ta bort bedömningspunkten?",
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
              url        : "/user/selfCritts",
              type       : 'DELETE',
              data       : query,
              contentType: "application/x-www-form-urlencoded",
              success    : function (data) {
                console.log(" ----- userCritt  was deleted, the response from server:");
                console.log(data);
                window.localUser = data;
                // reloads the dom after update
                $(".md-overlay").remove();
                $("#confBox").remove();
                return setTimeout(loadPanel, 100);

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
  })
    };
    loadPanel("config")

});

};

var showBanskiss = function () {
  $(".main-content").addClass("draggable");

  $("#banskiss").click(function() {
    // if you have multiple .draggable elements
// get all draggie elements
    var draggableElems = document.querySelectorAll('.draggable');
// array of Draggabillies
    var draggies = []
// init Draggabillies
    for ( var i=0, len = draggableElems.length; i < len; i++ ) {
      var draggableElem = draggableElems[i];
      var draggie = new Draggabilly( draggableElem, {
        // options...
      });
      draggies.push( draggie );
    }


    console.log("hello world");
    $(".main-content").append(banskissTemplate()).promise().done(function () {
      console.log("template loaded")
    })
  })
};


var addOnClicks = function() {
  redSelfCritts();
  editTypesOfTraning();
  redHorseCritts();
  redUSer();
  showBanskiss()
};


module.exports = {
addOnClicks: addOnClicks
}