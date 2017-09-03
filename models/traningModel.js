var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var traningSchema = new Schema({
    type: {unique: false, type: String},
    criterias: {},
    points: {unique: false, type: Number},
    createdAt: { type: Date, default: Date.now },

});

var Traning = mongoose.model("Traning", traningSchema);

module.exports = Traning;


// Spara träningar som {takt : 8, känsla: 3 ... osv}   ?