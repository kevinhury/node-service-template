const mongoose = require('mongoose');
const { mongo, env } = require('./app');

// set mongoose Promise to Bluebird
mongoose.Promise = Promise;

// Exit application on error
mongoose.connection.on('error', err => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
});

// print mongoose logs in dev env
if (env === 'development') {
    mongoose.set('debug', true);
}

/**
* Connect to mongo db
*
* @returns {object} Mongoose connection
* @public
*/
exports.connect = () => {
    const uri = mongo.uri || 'localhost';
    mongoose.connect(`mongodb://${uri}:27017/node-service-template`, {
        keepAlive: 1,
        useNewUrlParser: true,
    });
    return mongoose.connection;
};
