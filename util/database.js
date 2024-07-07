const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
require('dotenv').config(); // Load environment variables from .env file

let db;

const mongoConnect = (callback) => {
    const uri = process.env.DB_CONNECTION_STRING;

    if (!uri) {
        throw new Error('DB_CONNECTION_STRING environment variable is not defined');
    }

    mongoClient.connect(uri)
        .then(client => {
            console.log('connected!');
            db = client.db();
            callback(); // Pass the client object here
        }).catch(err => {
            console.log(err);
            throw err;
        });
};

const getDb = () => {
    if (db) {
        return db;
    }
    throw 'No database found';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;