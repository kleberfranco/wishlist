const express = require('express')
const routes = require('./config/routes')
const bodyParser = require('body-parser')
const dotenv = require('dotenv/config');
const database = require('./dabase');
const notFound = require('../src/exceptions/notFound')
const invalidRequest = require('../src/exceptions/invalidRequest')
const paginate = require('express-paginate');

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
        this.server.use(paginate.middleware(10, 50));
        this.server.use(bodyParser.json());
    }

    response() {
        this.server.use((error, req, res, next) => {
            let status = 400
            if (error instanceof notFound || error instanceof invalidRequest) {
                status = error.statusCode()
            }
            res.status(status).json({message: error.message})
        })
    }
}

module.exports = App;
