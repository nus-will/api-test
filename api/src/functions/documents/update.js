"use strict";

const repo = require('../../repositories/document');
const { handleSuccededResponse, handleErrorResponse } = require('../../utils');

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
