"use strict";

const repo = require('../../repositories/document');
const { handleSuccededResponse, handleErrorResponse } = require('../../utils');

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
