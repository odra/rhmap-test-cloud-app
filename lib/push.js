"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const $fh = require('fh-mbaas-api');

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

  response.status(200)
    .send(`You wanna send a notification to ${request.params.token}?`);
  // const message = {
  //   alert: 'Hello Push Notification!',
  //   sound: 'default'
  // };

  // // dispatch the payload message to the internal push server
  // $fh.push(message, options, (err, res) => {
  //   if (err) {
  //     response.send(`Push error: ${err}.toString()`);
  //   } else {
  //     response.status(202).send(`Notification sent [status: ${res.status}]!`);
  //   }
  // });
});

module.exports = push;
