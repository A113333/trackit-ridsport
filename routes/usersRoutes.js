
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
ObjectId = mongoose.ObjectID;

var User = require('../models/userModel.js');


router.get("/", function(req, res, next) {

  if (req.user === undefined) {
    // The user is not logged in
    res.json({"error": "not Logged in"});
  } else {
    res.json(req.user);
  }
});



router.get('/plans', function (req, res, next) {
  console.log('get to /cal/info');
  if (req.user === undefined) {
    // The user is not logged in
    console.log("not logged in and trying to get /cal/info");
    res.json({});
  } else {
    res.json({
      plans: req.user.plans,
      user: req.user
    });
  }
});


router.post("/horses", function (req, res, next) {
  console.log("get call to user/horses   req.body");
  console.log(req.body)
});

router.post("/selfCritts", function (req, res, next) {
  console.log("get call to user/selfCritts   req.body");
  console.log(req.body);
 // console.log(req)
  var id = req.user._id;
  console.log("       id          " + id);
var newCritt = req.body;

  User.findOneAndUpdate({ _id: id },{$push: {"selfCritts": newCritt}}, { new: true }, function (err, data) {
    if (err) {
     console.log(err)
    } else {
      console.log("---------data---------------");
      console.log(data);

      res.json(data);
    }


    //skicka med msg "du har sparat din träning"
  });


});
router.delete("/selfCritts", function (req, res, next) {
  console.log(" req body from delete selfcritt");
  console.log(req.body);

  var userID = mongoose.Types.ObjectId(req.user._id);
  var objectId = mongoose.Types.ObjectId(req.body._id);


  User.findOneAndUpdate({_id : userID} ,
    {$pull: { "selfCritts": { "_id": objectId }}},
    {upsert: true, 'new': true},
    function(err, doc){
      if(err)//toDo handle error
      {res.json(err.message)}
      else{   console.log("no error   + doc");
        console.log(doc)
        res.json(doc);
    }
})

});




router.post('/typesOfTraning', function (req, res, next) {
  var userId = mongoose.Types.ObjectId(req.user._id);
 // var userId = mongoose.Types.ObjectId(req.body._id);
  console.log("req.body post /traningTypes");
  console.log(req.body);

  var newTraningType = {
    name : req.body.name,
    desc : req.body.desc
  };
  console.log("new traningtype:");
  console.log(newTraningType);

  User.findOneAndUpdate({ "_id": userId}, {"$push": {"typesOfTraning": newTraningType}}, {new: true, upsert: true},
    function(err, doc) {
      if (err) {
        res.json(err.message)
      }
      else {
        console.log("sparade ny träningstype");
       // console.log(doc);
        res.json(doc);
      }
    });
  // console.log(doc);
});
router.delete("/typesOfTraning", function (req, res, next) {
  console.log(" req body from delete traningTypes");
  console.log(req.body);

  var userId = mongoose.Types.ObjectId(req.user._id);
  var objectId = mongoose.Types.ObjectId(req.body._id);
 // var objectId = mongoose.Types.ObjectId(req.body.objId);
 // var userId = mongoose.Types.ObjectId(req.body._id);

  User.findOneAndUpdate({_id : userId},{$pull:{"typesOfTraning":{"_id": objectId }}}, {upsert: true, 'new': true},
    function(err, doc){
      if(err)//toDo handle error
      {res.json(err.message)}
      else{   console.log("no error   + doc");
        console.log(doc)
        res.json(doc);
      }
    })

});


router.post('/packlist', function (req, res, next) {
  var userId = mongoose.Types.ObjectId(req.user._id);
  //var userId = mongoose.Types.ObjectId(req.body._id);
  console.log("req.body post /traningTypes");
  console.log(req.body);

  var packItem = {
    typeOfEvent : req.body.typeOfEvent,
    item : req.body.item
  };
  console.log("new packItem:");
  console.log(packItem);

  User.findOneAndUpdate({ "_id": userId}, {"$push": {"packlist": packItem}}, {new: true, upsert: true},
    function(err, doc) {
      if (err) {
        res.json(err.message)
      }
      else {
        console.log("sparade nytt packitem");
        console.log(doc);
        res.json(doc);
      }
    });
  // console.log(doc);
});
router.delete("/packlist", function (req, res, next) {
  console.log(" req body from delete traningTypes");
  console.log(req.body);

  var userId = mongoose.Types.ObjectId(req.user._id);
  //var objectId = mongoose.Types.ObjectId(req.body._id);
   var objectId = mongoose.Types.ObjectId(req.body.objId);
  // var userId = mongoose.Types.ObjectId(req.body._id);

  User.findOneAndUpdate({_id : userId},{$pull:{"packlist":{"_id": objectId }}}, {upsert: true, 'new': true},
    function(err, doc){
      if(err)//toDo handle error
      {res.json(err.message)}
      else{   console.log("no error   + doc");
        console.log(doc)
        res.json(doc);
      }
    })

});



router.post('/tranings/', function (req, res, next) {

 var userId = mongoose.Types.ObjectId(req.user._id);
 // var userId = mongoose.Types.ObjectId(req.body._id);
  var objId = req.body.traningId;
  console.log("req.body post /tranings ");
  console.log(req.body);

var critts = req.body.critts.slice(0);
  var traning = {
    horse: req.body.horse,
    type: req.body.type,
    comments: req.body.comments,
    critts: critts,
    intensitet: req.body.intensitet,
    lenght: req.body.lenght,
    date: req.body.date,
  };
  console.log("new traning:");
  console.log(traning);

  User.findOneAndUpdate({ _id: userId}, {
    "$push": {tranings: traning}
  }, {new: true, upsert: true},
    function(err, doc) {
      if (err) {
        res.json(err.message)
      }
      else {
        console.log("sparade en ny träning");
        console.log(doc);
        res.json(doc);
      }
    });
  // console.log(doc);
});


router.post('/horseLogg', function (req, res, next) {
  var userId = mongoose.Types.ObjectId(req.user._id);
  var traningId = mongoose.Types.ObjectId(req.body.traningsId);
  // var userId = mongoose.Types.ObjectId(req.body._id);
  //var objId = req.body.traningId;
  console.log("req.body post /horseLogg ");
  console.log(req.body);

  var scores = req.body.scores.slice(0);
  var horseLogg = {
    totalScore: req.body.totalScore, // 15,//{ score: Number, total: Number}, //typ 20/100
    scores: scores,  //[{critt1: "takt", score: 7}],           //[{critt: String, score: Number}], // [{hand: 5}]
    comments: req.body.comments, // "rida fint",
    average: req.body.average,
  };
  console.log("new horseLogg:");
  console.log(horseLogg);

  var sendObj = JSON.stringify(horseLogg);



  User.findOneAndUpdate({ "_id": userId, "tranings._id": traningId},
    {"$set": {"tranings.$.horseLogg": horseLogg}},
      {new: true, upsert: true},
    function(err, doc) {
      if (err) {
        console.log("error");
        console.log(err);
        res.json("error")
      }
      else {
        console.log("sparade en ny horselogg");
        console.log(doc);
        res.json(doc);
      }
    });
  // console.log(doc);
});
router.delete("/horseLogg", function (req, res, next) {
  console.log(" req.query.id from delete horseLogg");
  console.log(req.query);


  var userId = mongoose.Types.ObjectId(req.user._id);
  var objectId = mongoose.Types.ObjectId(req.query.id);
  // var objectId = mongoose.Types.ObjectId(req.body.objId);
  // var userId = mongoose.Types.ObjectId(req.body._id);

  User.findOneAndUpdate({_id : userId},{$pull:{"tranings":{"_id": objectId }}}, {upsert: true, 'new': true},
    function(err, doc){
      if(err)//toDo handle error
      {res.json(err.message)}
      else{   console.log("no error   + doc");
        //console.log(doc)
        res.json(doc);
      }
    })

});
// deletes when deleting a horse logg
router.post('/userLogg', function (req, res, next) {
  console.log("req.body post /userLogg ");
  console.log(req.body);
  var userId = mongoose.Types.ObjectId(req.user._id);
  var traningId = mongoose.Types.ObjectId(req.body.traningsId);
  // var userId = mongoose.Types.ObjectId(req.body._id);
  //var objId = req.body.traningId;


  var scores = req.body.scores.slice(0);
  var userLogg = {
    totalScore: req.body.totalScore, // 15,//{ score: Number, total: Number}, //typ 20/100
    scores: scores,  //[{critt1: "takt", score: 7}],           //[{critt: String, score: Number}], // [{hand: 5}]
    comments: req.body.comments, // "rida fint",
    average: req.body.average,
  };
  console.log("new userLogg:");
  console.log(userLogg);

  var sendObj = JSON.stringify(userLogg);
  User.findOneAndUpdate({ "_id": userId, "tranings._id": traningId},
    {"$set": {"tranings.$.userLogg": userLogg}},
    {new: true, upsert: true},
    function(err, doc) {
      if (err) {
        console.log("error");
        console.log(err);
        res.json("error")
      }
      else {
        console.log("sparade en ny horselogg");
        console.log(doc);
        res.json(doc);
      }
    });
  // console.log(doc);
});



router.post('/critt', function (req, res, next) {
  var userId = mongoose.Types.ObjectId(req.user._id);
  // var userId = mongoose.Types.ObjectId(req.body._id);
  console.log("req.body post /traningTypes");
  console.log(req.body);

  var newCritt = {
    name : req.body.name,
    desc : req.body.desc
  };
  console.log("new critt:");
  console.log(newCritt);

  User.findOneAndUpdate({ "_id": userId}, {"$push": {"critts": newCritt}}, {new: true, upsert: true},
    function(err, doc) {
      if (err) {
        res.json(err.message)
      }
      else {
        console.log("sparade nytt critt");
        // console.log(doc);
        res.json(doc);
      }
    });

});
router.delete("/critt", function (req, res, next) {
  console.log(" req body from delete critt");
  console.log(req.body);

  var userId = mongoose.Types.ObjectId(req.user._id);
  var objectId = mongoose.Types.ObjectId(req.body._id);
  // var objectId = mongoose.Types.ObjectId(req.body.objId);
  // var userId = mongoose.Types.ObjectId(req.body._id);

  User.findOneAndUpdate({_id : userId},{$pull:{"critts":{"_id": objectId }}}, {upsert: true, 'new': true},
    function(err, doc){
      if(err)//toDo handle error
      {res.json(err.message)}
      else{   console.log("no error   + doc");
        console.log(doc)
        res.json(doc);
      }
    })

});

router.delete("/horse", function (req, res, next) {
  console.log(" req body from delete horse");
  console.log(req.body);

  var userId = mongoose.Types.ObjectId(req.user._id);
  var objectId = mongoose.Types.ObjectId(req.body._id);
  // var objectId = mongoose.Types.ObjectId(req.body.objId);
  // var userId = mongoose.Types.ObjectId(req.body._id);

  User.findOneAndUpdate({_id : userId},{$pull:{"horses":{"_id": objectId }}}, {upsert: true, 'new': true},
    function(err, doc){
      if(err)//toDo handle error
      {res.json(err.message)}
      else{   console.log("no error   + doc");
        console.log(doc);
        res.json(doc);
      }
    })

});

module.exports = router;


// "\"sita fint\"sss", = för många "" tecken''


