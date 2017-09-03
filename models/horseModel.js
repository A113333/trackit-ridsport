var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var horseSchema = new Schema({
    name: String,
    riderId: String,
    color: String,
    gender: String,
    age: Number,
    type: String,
  img: String,
    tranings: [
        { type: { type: String, required: false },
            result: { type: Object, required: true },
            date: { type: Date, default: Date.now },
          },],

    u: { type: String, required: false },
    e: { type: String, required: false },
    ue: { type: String, required: false },

    plan: {},
    criterias:[],

    testTranings: [],
  });

module.exports = mongoose.model('horse', horseSchema);

horseSchema.methods.addTraning = function (data) {
    console.log;

  };

var connection = mongoose.createConnection('mongodb://localhost/pt');
var Horse = connection.model('Horse', horseSchema);
module.exports = Horse;



/*

för att lägga till träning :
hors.tranings.push( {tränings obj}  )
    db.Horse.update({'Searching criteria goes here'},
        {
            $push : {
                tranings :  {
                    "crit1": user input here,
                    "crit2": user input here,
                    "crit3": user input here
                } //inserted data is the object to be inserted
            }
        });*/
