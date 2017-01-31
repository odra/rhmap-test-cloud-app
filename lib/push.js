"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const $fh = require('fh-mbaas-api');
const Message = require('../model/message');
const Options = require("../model/options");

const push = new express.Router();

push.use(cors());
push.use(bodyParser());

// Endpoint for testing backend deployment
push.get("/", (request, response) => {
  response.status(200)
    .send("Hello from node backend!");
});

// Endpoint for send push to 1 device
push.get('/:token', (request, response) => {

  const message = new Message("Hello from node backend!");
  const options = new Options();
  options.alias.push(request.params.token);

  $fh.push(message, options, (err, res) => {
    if (err) {
      console.log(`Push error: ${err}.toString()`);
      response.send(`Push error: ${err}.toString()`);
    } else {
      console.log(`Notification sent [status: ${res.status}]!`);
      response.status(202)
        .send(`Notification sent [status: ${res.status}]!`);
    }
  });
});

module.exports = push;
