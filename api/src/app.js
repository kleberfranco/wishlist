const express = require('express')
const routes = require('./config/routes')
const bodyParser = require('body-parser')
const dotenv = require('dotenv/config');
const database = require('./dabase');
const notFound = require('../src/exceptions/notFound')
const emailInvalid = require('../src/exceptions/emailInvalid')

class App {
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
        this.response();
    }

    routes() {
        this.server.use(routes);
    }

    middlewares() {
        this.server.use(bodyParser.json());
    }

    response() {
        this.server.use((error, req, res, next) => {
            let status = 400
            if (error instanceof notFound || error instanceof emailInvalid) {
                status = error.statusCode()
            }
            res.status(status).json({message: error.message})
        })
    }
}

module.exports = App;
