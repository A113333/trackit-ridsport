/**
 * Created by Alle on 2017-05-31.
//  */

// module.exports = User;
var bcrypt   = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var subDocs = require('../models/subDocumentsModel.js');

var packlistSchema = new Schema({ typeOfevent: "string", item: 'string', isPacked: { type: Boolean, default: false }});

var SelftCrittSchema = new Schema({
  "name": {
    type:String,
    unique: true,
    index: true
  }, //typ "Sits"
  "desc": String, // typ "hur fint du sitter
});

var typeOfTraningSchema = new Schema({
  "name":{
    type:String,
    unique: false,
  },
  "desc": String
})

var horseSchema = new Schema({
  name: String,
  riderId: String,
  color: String,
  gender: String,
  age: Number,
  type: String,
  xp: Number,
  img: String,
  tranings: [{}],

  u: { type: String, required: false },
  e: { type: String, required: false },
  ue: { type: String, required: false },

  plan: {},
  criterias:[],

  testTranings: [],
});

var traningSchema = new Schema(
  {
  horse: String,
  type: String,
  date: String,
  lenght: String,
  intensitet: Number, //
  type: String,
  critts: [], // typ {critt: Framåtbjudning}
    comments: String,
    traningScores: [{
    traningTotal: { score: Number, total: Number}, // { score:70, total: 100}
      userTotal: { score: Number, total: Number},
      horseTotal: { score: Number, total: Number},
    }],
  horseLogg:{},
    userLogg:{}
});

var  crittSchema = new Schema({
  name: String,
  desc: String,


  //{type: Array,
  //     'default': ["Takt", "Känsla", "Framåtbjudning", "Avspändhet", "Lösgjordhet", "Känsla hand/mun", "Samling", "Rakriktning", "Liksidighet", "Focus"]
  //   }
});


var userSchema = new Schema({
    local            : {
        email        : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    'name' : String,
    "email" :  {
      type:String,
      required: true,
    },
    horses: [horseSchema],

    critts :[crittSchema],
    tranings :  [traningSchema],
  "img": {type: String, default: "../images/lib/navicons/userIcon.png"},
  "events": [],
//  "typeOfTraning": {type: Array,
//    'default': ["Hoppning", "Markarbete", "Uteritt", "Joggning", "Långskritt"]
//  },
  typesOfTraning: [typeOfTraningSchema],
    selfCritts: [SelftCrittSchema],

  packlist: [packlistSchema]
});


userSchema.pre("save",function(next) {
  // to add defaults to typeOfTranings
  if (this.typesOfTraning.length === 0){
    this.typesOfTraning.push({name:"Hoppning", desc:"Ett vanligt hopppass"}, {name:"Markarbete", desc:"vanligt markarbete"});
  next()
  }
  else{ next()}
});


userSchema.pre("save",function(next) {
  // to add defaults to typeOfTranings
  if (this.critts.length === 0){
    this.critts.push({name:"Framåtbjudning", desc:"Hästens påskjut bakifrån"}, {name:"Lösgjordhet", desc:"Hur avspänd och effekitv hästen är"});
    next()
  }
  else{ next()}
});


userSchema.pre("save",function(next) {
  // to add defaults to typeOfTranings
  if (this.selfCritts.length === 0){
    this.selfCritts.push({name:"Hand", desc:"din hand"}, {name:"Blick", desc:"Din blick"});
    next()
  }
  else{ next()}
});

traningSchema.pre("save",function(next) {
  // to add defaults to typeOfTranings

    this.xp =+ 5;
    next()

});


// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('user', userSchema);


userSchema.methods.addSelfCritt = function (callback) {
  console.log("addSelftCritt körs")
  var selfCritt = new SelftCritt
  user.selfCritts.create({ critt: critt, crittDesc: crittDesc, });
};