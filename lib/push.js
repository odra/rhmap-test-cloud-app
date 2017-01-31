"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const $fh = require('fh-mbaas-api');
const Message = require('../model/message');
const Options = require("../model/options");

const pushRoute = new express.Router();

pushRoute.use(cors());
pushRoute.use(bodyParser());

// Endpoint for testing backend deployment
pushRoute.get("/", (request, response) => {
  response.status(200)
    .send("Hello from node backend!");
});

// Endpoint for sending push to all devices of 1 application
pushRoute.get('/:appId', (request, response) => {
  const message = new Message("Hello from node backend!");
  const options = new Options();
  options.apps.push(request.params.appId);

  $fh.push(message, options, (err, res) => {
    if (err) {
      response.status(err.status).send(`Push error: ${err.toString()}`);
    } else {
      response.status(202).send(`Notification sent [status: ${res.status}]!`);
    }
  });
});

// Endpoint for sending push to 1 device
pushRoute.get('/:appId/:token', (request, response) => {
  const message = new Message("Hello from node backend!");
  const options = new Options();
  options.apps.push(request.params.appId);
  options.alias.push(request.params.token);

  $fh.push(message, options, (err, res) => {
    if (err) {
      response.status(err.status).send(`Push error: ${err.toString()}`);
    } else {
      response.status(202).send(`Notification sent [status: ${res.status}]!`);
    }
  });
});

module.exports = pushRoute;
