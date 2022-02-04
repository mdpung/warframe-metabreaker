import { MongoClient } from 'mongodb'
import { dbConfig } from "../config/config.js"

const connectionString = dbConfig.uri;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  monitorCommands: true // Enables logging
});

client.on('commandStarted', (event) => console.debug(event)); // Log when db command starts
client.on('commandSucceeded', (event) => console.debug(event)); // Log when db command succeeds
client.on('commandFailed', (event) => console.debug(event)); // Log when db command fails

let dbConnection;

export function connectToServer(callback) {
  client.connect(function (err, db) {
    if (err || !db) {
      return callback(err);
    }

    dbConnection = db.db(dbConfig.namespace);
    console.log('Successfully connected to MongoDB.');

    return callback();
  });
}

export function getDb() {
  return dbConnection;
}