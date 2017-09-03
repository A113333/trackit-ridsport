var print = require("../print");

var addLoggBtn = function (events) {
  $('.addLoggBtn').click(function (clickEvent) {
    console.log("-------- clickEvent ------- events. ---------");
    console.log(clickEvent.target.id);
    console.log(events);

if(events.length > 0){
  console.log("-------- events längre än 0 --------")
    events.forEach(function (curr, index) {
      if(curr.id = clickEvent.target.id){
        console.log("curr----- finns");
        console.log(curr);
        print.addLogg(curr);
      }});
}
else {
  print.addLogg(events[0])
}

  })
};

module.exports = {
  addLoggBtn: addLoggBtn,
};