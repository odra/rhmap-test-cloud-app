"use strict";

const DEFAULT_CONFIG_TTL = -1;

class Options {
    constructor() {
        this.config = new Config();
        this.criteria = new Criteria();
    }
}

class Criteria {
    constructor() {
        this.alias = [];
        this.deviceType;
        this.categories;
        this.variants;
    }
}

class Config {
    constructor() {
        this.ttl = DEFAULT_CONFIG_TTL;
    }
}

module.exports = Options;
