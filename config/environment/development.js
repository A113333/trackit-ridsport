"use strict";

// Development specific configuration
// =================================
module.exports = {
    // Server IP
    ip:    process.env.IP || undefined,

    // Server port
    port: process.env.PORT || 5000,

    // MongoDB connection options
    mongo: {
        uri:    "'mongodb://localhost/pt'"
    },
    secrets: {
        fbSecretApp:     process.env["fbSecretApp"]
    }
};