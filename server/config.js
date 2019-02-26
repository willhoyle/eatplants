var convict = require('convict');
var yaml = require("yaml")
var path = require("path")

convict.addParser({ extension: ['yml', 'yaml'], parse: yaml.parse });

// Define a schema
var config = convict({
    env: {
        doc: "The application environment.",
        format: ["production", "development", "test"],
        default: "development",
        env: "NODE_ENV"
    },
    ip: {
        doc: "The IP address to bind.",
        format: "ipaddress",
        default: "127.0.0.1",
        env: "IP_ADDRESS",
    },
    port: {
        doc: "The port to bind.",
        format: "port",
        default: 3333,
        env: "PORT",
        arg: "port"
    },
    db: {
        uri: {
            doc: "Database host name/IP",
            format: '*',
            default: 'mongodb://localhost:27017/pureplantgains'
        },
        name: {
            doc: "Database name",
            format: String,
            default: 'pureplantgains'
        }
    }
});

config.loadFile(path.resolve(__dirname, '../env.yaml'))

// Perform validation
config.validate({ allowed: 'strict' });

module.exports = config;