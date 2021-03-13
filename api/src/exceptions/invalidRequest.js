class InvalidRequest extends Error {
    constructor(message) {
        super(message);
        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name
        this.status = 422
    }

    statusCode() {
        return this.status
    }
}

module.exports = InvalidRequest