var register = function(Handlebars) {
    var helpers = {
        ifIsZero: function (value, options) {
            if(value === 0) {
                return options.fn(this);
            }
            return options.inverse(this);
        },


        inc: function(value, options) {
            return parseInt(value) + 1;
        },
        foo: function(var1, var2) {

        }
    };

    if (Handlebars && typeof Handlebars.registerHelper === "function") {
        for (var prop in helpers) {
            Handlebars.registerHelper(prop, helpers[prop]);
        }
    } else {
        return helpers;
    }

};

module.exports.register = register;
module.exports.helpers = register(null);