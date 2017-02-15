"use strict";

const winston = require("winston");

class LoggerHelper {

    static init() {
        winston.add(winston.transports.File, { filename: `${Date.now()}.log` });
        winston.remove(winston.transports.Console);
    }

    static log(msg) {
        winston.info(msg);
    }

    static error(msg) {
        winston.error(msg);
    }

}

module.exports = LoggerHelper;