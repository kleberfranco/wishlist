/**
 * A class that return a specific error.
 */
class InvalidRequest extends Error {
  /**
   * class constructor.
   * @param {string} message
   */
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.status = 422;
  }

  /**
   * return error number
   * @return {number} code
   */
  statusCode() {
    return this.status;
  }
}

module.exports = InvalidRequest;
