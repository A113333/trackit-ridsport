var common = require('../common.js');
var config = common.config();

module.exports = {

    'facebookAuth' : {
        'clientID'      : config.facebook_app_id,//process.env.AWS_fbApp_clientID, // your App ID 1114593348644713
        'clientSecret'  : config.facebook_app_secret, //process.env.AWS_fbApp_secret, // 'd97c3c3e9d6f58f2d1127450dc3c0028', // your App Secret
        'callbackURL'   : config.facebook_app_callback //process.env.AWS_fbApp_callbackURL // || 'http://localhost:3000/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:3000/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : "517882072959-jbvhgja73b9hgjeju0kgufrlhoij87ut.apps.googleusercontent.com",
        'clientSecret'  : 'osnNT7PdFKz6WWp1Mf_Q_8fp',
        'callbackURL'   : 'http://localhost:3000/auth/google/callback'
    }

};