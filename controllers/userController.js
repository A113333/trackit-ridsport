var userModel = require('../models/userModel.js');
var subDocs = require('../models/subDocumentsModel.js');
var mongoose = require('mongoose');
ObjectId = mongoose.ObjectID;

var selfCrittSchema = subDocs.SelftCrittSchema;
//var User = userModel.User;

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    addSelfCritt: function (req, res) {
        var id = req.user._id;
        console.log("req.body add critt");
        console.log(req.body);

    var newCritt = {
        critt : req.body.critt,
        desc : req.body.desc
    };
        console.log("newCritt   :" );
    console.log(newCritt);
        userModel.findOneAndUpdate(
          { "_id": id},
          {
              "$push": {
                  "selfCritts": newCritt
              }
              },
        {new: true},
          function(err,doc) {
              if (err) {
                  return JSON.stringify({
                      message: 'Error when deleting the user.',
                      error: err
                  });
              }
             // console.log(doc);
              return doc;
          });


},


    updateSelfCritt: function (req, res) {
        var user = req.user;
        console.log(user);
        var id = user._id;
        var newCritt = {
            critt: req.body.critt,
            desc: req.body.desc
        };
        console.log(req.body);
        console.log("runs ADD    selfcrittUSercontroller   id:  " + id);
        userModel.findOneAndUpdate(
          { "_id": id},
          {
              "$push": {
                  "selfCritts.$": newCritt
              }
          },
          function(err,doc) {
              if (err) {
                  return res.status(500).json({
                      message: 'Error when deleting the user.',
                      error: err
                  });
              }
              console.log(doc);
              return res.status(204).json(doc);
          });
    },
    /**
     * userController.remove()
     */
    deleteSelfCritt: function (req, res) {
        console.log("runs deleteSelfcrittUSercontroller");
        console.log(req.body);

        var userID =mongoose.Types.ObjectId(req.user._id);
        var testID = JSON.parse(req.body._id);
        var objectId = mongoose.Types.ObjectId(testID);


        userModel.findOneAndUpdate( {_id : userID} ,
          {$pull: { "selfCritts": { "_id": objectId }}},
          {upsert: true, 'new': true},
        function(err, doc){
              if(err)//toDo handle error
              {return err.message}
             else{   console.log("no error   + doc");
            console.log(doc)
                  return(doc);
              }
        })
    },

    /**
     * userController.list()
     */
    list: function (req, res) {
        userModel.find(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            console.log("getting users");
            return res.json(users);
        });
    },

    /**
     * userController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        userModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }
            return res.json(user);
        });
    },

    /**
     * userController.create()
     */
    create: function (req, res) {
        var user = new userModel({
            name : req.body.name,
            email : req.body.email,
            horses : req.body.horses,
            kriterier : req.body.kriterier

    });

        user.save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating user',
                    error: err
                });
            }
            return res.status(201).json(user);
        });
    },

    /**
     * userController.update()
     */
    update: function (req, res) {

        var id = req.params.id;
        userModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.name = req.body.name ? req.body.name : user.name;
            user.email = req.body.email ? req.body.email : user.email;
            user.horses = req.body.horses ? req.body.horses : user.horses;
            user.kriterier = req.body.kriterier ? req.body.kriterier : user.kriterier;

            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.json(user);
            });
        });
    },

    /**
     * userController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        userModel.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
