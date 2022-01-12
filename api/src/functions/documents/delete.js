"use strict";

const repo = require('../../repositories/document');
const { handleSuccededResponse, handleErrorResponse } = require('../../utils');

exports.delete = async event => {
  try {
		const documentId = event.pathParameters?.documentId;
		const { data, error } = documentId ? await repo.delete(documentId) : await repo.deleteAll();

    if (error) {
      return handleErrorResponse(error)
    }

    return handleSuccededResponse(data)
  } catch (e) {
    return handleErrorResponse(e)
  }
};
