"use strict";

// Production specific configuration
// =================================
module.exports = {
    // Server IP
    ip:    process.env.IP || undefined,

    // Server port
    port: process.env.PORT || 3000,

    // MongoDB connection options
    mongo: {
        uri:    "mongodb://localhost/pt"
    },
    secrets: {
        fbSecretApp:     process.env["d97c3c3e9d6f58f2d1127450dc3c0028"]
    }
};