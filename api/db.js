"use strict";

const MongoClient = require('mongodb').MongoClient;

const mongoUser = 'nusdev';
const mongoDbName = 'test';
const mongoPass = '45tgbhu89!';
const mongoConnStr = 'mongodb+srv://nusdev:45tgbhu89!@cluster0.lo4is.mongodb.net/test';

const client = new MongoClient(mongoConnStr, {
    useNewUrlParser: true,
});

exports.createConn = async () => {
    await client.connect();
    return client.db('test');
};
