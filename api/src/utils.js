"use strict";

exports.handleSuccededResponse = (body) => {
  return {
    statusCode: 200,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(body)
  };
};

exports.handleErrorResponse = (error) => {
  return {
    statusCode: 400,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify({ message: error.message })
  };
}