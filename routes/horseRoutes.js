var express = require('express');
var router = express.Router();
var horseController = require('../controllers/horseController.js');
var Horse = require('../models/horseModel.js');
var User = require("../models/userModel.js");
//  ----------------------------------------------- Horse Based Routes  -----------------------------------------------
//var user = new User;

router.get('/', function (req, res, next) {
  if(!req.user) {
    console.log("måste logga in bör visas")
  }

  user.horses.find(function (err, horses) {
    if (err) {
      return res.status(500).json({
        message: 'Error when getting horse.',
        error: err,
      });
    }

    if (!horses) {
      return res.status(404).json({
        message: 'No  horses',
      });
    }


    res.json(horses);

  });
});


router.post('/', function (req, res, next) {

  console.log('------------------------------------------------- post add horse ---------------------------------');
  console.log(req.body);

var id = req.user._id;

  var horse = {
    name     : req.body.name,
    age      : req.body.age,
    //  gender: req.body.gender,
    type     : req.body.type,
    riderId  : id,
    e        : req.body.e,
    ue       : req.body.ue,
    u        : req.body.u,
    img      : req.body.img,
    criterias: req.body.criterias
  };
//  User.findById(req.user._id, {$push: {"horses": horse}},
//    {safe: true, upsert: true, new: true}, function (err, user) {
//      if (err) return console.log(err);
//
//      user.save(function (err, user) {
//        if (err) return console.log(err);
//        res.json(user);
//      });
//    });

  User.findByIdAndUpdate(id, { $push:{horses: horse}}, { new: true }, function (err, user) {
    if (err) return console.log(err);
    res.json(user);
  });

})
/*
 * GET
 */
router.get('/:id', horseController.show);

/*
 * POST
 */
router.post('/', horseController.create);

/*
 * PUT
 */
router.put('/:id', horseController.update);

/*
 * DELETE
 */
router.delete('/:id', horseController.remove);

module.exports = router;


