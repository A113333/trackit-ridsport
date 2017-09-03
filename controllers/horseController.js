var horseModel = require('../models/horseModel.js');

/**
 * horseController.js
 *
 * @description :: Server-side logic for managing localHorses.
 */
module.exports = {

    /**
     * horseController.list()
     */
    list: function (req, res, next) {
        horseModel.find(function (err, horses) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting horse.',
                    error: err
                });
            }
            console.log("getting localHorses");
            return res.json(horses);
        });
    },

    /**
     * horseController.show()
     */
    show: function (req, res, next) {
        var name = req.params.id;
        horseModel.findOne({name: name}, function (err, horse) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting horse.',
                    error: err
                });
            }
            if (!horse) {
                return res.status(404).json({
                    message: 'No such horse'
                });
            }
            return res.json(horse);
        });
    },

    /**
     * horseController.create()
     */
    create: function (req, res, next) {
        console.log(req.user);
        var horse = new horseModel({
            name : req.body.name,
            color : req.body.color,
            gender : req.body.gender,
            age : req.body.age,
            type : req.body.type,
            tranings : req.body.tranings,
            plan : req.body.plan,
            riderId: req.user.email
        });

        horse.save(function (err, horse) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating horse',
                    error: err
                });
            }
            return res.redirect('/home');
        });
    },

    /**
     * horseController.update()
     */
    update: function (req, res, next) {
        var id = req.params.id;
        horseModel.findOne({_id: id}, function (err, horse) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting horse',
                    error: err
                });
            }
            if (!horse) {
                return res.status(404).json({
                    message: 'No such horse'
                });
            }

            horse.name = req.body.name ? req.body.name : horse.name;
            horse.color = req.body.color ? req.body.color : horse.color;
            horse.gender = req.body.gender ? req.body.gender : horse.gender;
            horse.age = req.body.age ? req.body.age : horse.age;
            horse.type = req.body.type ? req.body.type : horse.type;
            horse.tranings = req.body.tranings ? req.body.tranings : horse.tranings;
            horse.plan = req.body.plan ? req.body.plan : horse.plan;

            horse.save(function (err, horse) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating horse.',
                        error: err
                    });
                }

                return res.json(horse);
            });
        });
    },

    /**
     * horseController.remove()
     */
    remove: function (req, res, next) {
        var id = req.params.id;
        horseModel.findByIdAndRemove(id, function (err, horse) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the horse.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },

    listByUser: function (req, res, next) {
        var id = req.email;
        horseModel.find({riderId: id}, function (err, horses) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting horse.',
                    error: err
                });
            }
            if (!horses) {
                return res.status(404).json({
                    message: 'No such horse'
                });
            }
            return res.json(horses);
        });
    }
};
