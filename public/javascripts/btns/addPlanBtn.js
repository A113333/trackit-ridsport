var addPlanTemplate = require('../../templates/addPlan.hbs');
var critts = require("./critts");
var msgBox = require("../../templates/lib/msgBox.hbs");




var addPlanBtn = function (date) {


  $('.addPlanBtn').click(function () {
    var user = window.localUser;
    window.location.hash = "addPlan";
    $('.main-content').html(addPlanTemplate(user)).promise().done(function () {

      if(user === undefined){
        console.log("-----user undefined addPlanBtn köres-----");

        $.get('/user', function (data) {
          window.localUser= data;
          console.log(window.localUser)
        })
          .fail(function () {
            //user offline
            alert('error');
          });
      }

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


      critts.addAndRemoveCritts(window.localUser.kriterier);

      $('.postAddPlan').click(function () {
        console.log("pressed posted add plan");
        var traning = {
          horse: $("#horseName").val(),
          eventType: $("#typeOfTraning").val(),
          comments: $("#planComments").val(),
          critts: critts.getAllCritts(),
          intensitet: $("#intensitet").val(),
          lenght: $("#lenght").val(),
          date: date,
        };
        if(config.date){
          event.date = config.date
        }


        // {eventType: "Hoppning", date: '2017-07-09', title: 'CLNDR GitHub Page Finished', url: 'http://github.com/kylestetz/CLNDR' }

        console.log("traning befor submitting to addPlan---------------");
        console.log(traning);
        //   //todo vad händer när man sparat ner ett nytt event?
        $("#addTraningForm").validate({
          errorPlacement: function(){
            return false;  // suppresses error message text
          },

          rules: {
            // simple rule, converted to {required:true}
            horse: "required",
                  },

          wrapper: "span",
          submitHandler: function(form) {
            $.post("/user/addPlan", (traning),
              function(data, status){
                console.log("Data: " + data + "\nStatus: " + status);
              });
          }
        });
      })

    });

  });


};

module.exports = {
  addPlanBtn: addPlanBtn,
};