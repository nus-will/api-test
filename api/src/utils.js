"use strict";

const commonHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true
};

exports.handleSuccededResponse = (body) => {
  return {
    statusCode: 200,
    headers: commonHeaders,
    body: JSON.stringify({
      success: true,
      data: body
    })
  };
};

exports.handleErrorResponse = (error) => {
  return {
    statusCode: 400,
    headers: commonHeaders,
    body: JSON.stringify({
      success: false,
      message: error.message
    })
  };
}