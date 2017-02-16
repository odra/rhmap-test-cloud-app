"use strict";

const request = require("request");

const PUSH_URL = "http://testing.eteam.skunkhenry.com/api/v2/ag-push/rest/sender";

class API {

    static sendNotificationToApp(options, callback) {
        const body = {
            "message": {
                "alert": "Hello from node backend!",
                "sound": "default"
            },
            "criteria": {
                "alias": [options.alias]
            }
        };

        request.post(PUSH_URL, callback)
            .json(body)
            .auth(options.pushApplicationID, options.masterSecret);
    }
}

module.exports = API;
