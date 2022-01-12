"use strict";

const { createConn } = require('../../db');
const COLLECTION_NAME = 'documents';
const { ObjectId } = require('mongodb');

exports.create = async (payload) => {
  try {
		const db = await createConn();
		const data = await db.collection(COLLECTION_NAME).insert(payload)

		return { data }
  } catch (error) {
		return { error }
	}
};

exports.list = async () => {
  try {
		const db = await createConn();
		const data = await db.collection(COLLECTION_NAME).find({}).toArray();

		return { data }
  } catch (error) {
		return { error }
	}
};

exports.get = async (id) => {
  try {
		const db = await createConn();
		const data = await db.collection(COLLECTION_NAME).findOne({ _id: ObjectId(id) });

		return { data }
  } catch (error) {
		return { error }
	}
};

exports.update = async (id, payload) => {
  try {
		const db = await createConn();
		const data = await db.collection(COLLECTION_NAME).update({ _id: ObjectId(id) }, { $set: payload })

		return { data }
  } catch (error) {
		return { error }
	}
};

exports.delete = async (id) => {
  try {
		const db = await createConn();
		const data = await db.collection(COLLECTION_NAME).deleteOne({ _id: ObjectId(id) })

		return { data }
  } catch (error) {
		return { error }
	}
};

exports.deleteAll = async () => {
  try {
		const db = await createConn();
		const data = await db.collection(COLLECTION_NAME).deleteMany({})

		return { data }
  } catch (error) {
		return { error }
	}
}