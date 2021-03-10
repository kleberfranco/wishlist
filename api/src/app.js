const express = require('express')
const routes = require('./config/routes')
const bodyParser = require('body-parser')
const dotenv = require('dotenv/config');
const database = require('./dabase');

class App {
    constructor() {
        this.server = express();
        this.middlewares()
        this.routes()


    }
    routes() {
        this.server.use(routes)
    }

    middlewares() {
        this.server.use(bodyParser.json())
    }
}

module.exports = App;
