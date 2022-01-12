"use strict";

const MongoClient = require('mongodb').MongoClient;

const mongoConnStr = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB_NAME}`;

const client = new MongoClient(mongoConnStr, {
  useNewUrlParser: true,
});

exports.createConn = async () => {
  await client.connect();
  return client.db(process.env.MONGO_DB_NAME);
};
