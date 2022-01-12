"use strict";

const repo = require('../repositories/document');
const { handleSuccededResponse, handleErrorResponse } = require('../utils');

exports.index = async _event => {
  try {
    const { data, error } = await repo.list();

    if (error) {
      return handleErrorResponse(error)
    }

    return handleSuccededResponse(data)
  } catch (e) {
    return handleErrorResponse(e)
  }
};

exports.get = async event => {
  try {
    const { documentId } = event.pathParameters;
    const { data, error } = await repo.get(documentId);

    if (error) {
      return handleErrorResponse(error)
    }

    return handleSuccededResponse(data)
  } catch (e) {
    return handleErrorResponse(e)
  }
};

exports.create = async event => {
  try {
    const { documents } = JSON.parse(event.body);
    const { data, error } = await repo.create(documents);

    if (error) {
      return handleErrorResponse(error)
    }

    return handleSuccededResponse(data)
  } catch (e) {
    return handleErrorResponse(e)
  }
};

exports.update = async event => {
  try {
    const payload = JSON.parse(event.body);
		const { documentId } = event.pathParameters;
    const { data, error } = await repo.update(documentId, payload);

    if (error) {
      return handleErrorResponse(error)
    }

    return handleSuccededResponse(data)
  } catch (e) {
    return handleErrorResponse(e)
  }
};

exports.delete = async event => {
  try {
		const { documentId } = event.pathParameters;
		const { data, error } = await repo.delete(documentId);

    if (error) {
      return handleErrorResponse(error)
    }

    return handleSuccededResponse(data)
  } catch (e) {
    return handleErrorResponse(e)
  }
};

exports.deleteAll = async _event => {
  try {
		const { data, error } = await repo.deleteAll();

    if (error) {
      return handleErrorResponse(error)
    }

    return handleSuccededResponse(data)
  } catch (e) {
    return handleErrorResponse(e)
  }
};