"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const $fh = require('fh-mbaas-api');
const async = require("async");
const Message = require('../model/message');
const Options = require("../model/options");
const Logger = require("../utils/logger");

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

  Logger.log(`[${request.params.appId}] Sending push to all devices.`);
  $fh.push(message, options, (err, res) => {
    Logger.log(`[${request.params.appId}] Response was: ${err || res}`);
    response.send(err || res);
  });
});

// Endpoint for sending push to a list of aliases
pushRoute.post('/:appId', (request, response) => {
  const message = new Message("Hello from node backend!");
  const options = new Options();
  options.apps.push(request.params.appId);

  const aliases = request.body;
  Logger.log(`[${request.params.appId}] Sending push to ${aliases.length} devices asynchronously.`);
  async.each(aliases, alias => {
    options.aliases[0] = alias;
    Logger.log(`[${request.params.appId}] Sending push to ${options.aliases[0]}.`);
    $fh.push(message, options, (err, res) => {
      Logger.log(`[${request.params.appId}] [${options.aliases[0]}] Response was: ${err || res}.`);
    });
  },
    err => Logger.error(`[${request.params.appId}] [${options.aliases[0]}] Async Error: ${err}.`)
  );

  response.send(`Notifications are being sent for ${aliases.length}. Check the results in the Cloud App logs."`)
});

// Endpoint for sending push to 1 device
pushRoute.get('/:appId/:alias', (request, response) => {
  const message = new Message("Hello from node backend!");
  const options = new Options();
  options.apps.push(request.params.appId);
  options.aliases.push(request.params.alias);

  Logger.log(`[${request.params.appId}] Sending push to ${request.params.alias}.`);
  $fh.push(message, options, (err, res) => {
    Logger.log(`[${request.params.appId}] [{request.params.alias}] Response was: ${err || res}.`);
    response.send(err || res);
  });
});

module.exports = pushRoute;
