"use strict";

const repo = require('../../repositories/document');
const { handleSuccededResponse, handleErrorResponse } = require('../../utils');

exports.get = async event => {
  try {
    const documentId = event.pathParameters?.documentId;
    const { data, error } = documentId ? await repo.get(documentId) : await repo.list();

    if (error) {
      return handleErrorResponse(error)
    }

    return handleSuccededResponse(data)
  } catch (e) {
    return handleErrorResponse(e)
  }
};
