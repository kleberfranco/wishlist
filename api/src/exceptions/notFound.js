/**
 * A class that return a specific error.
 */
class NotFound extends Error {
  /**
   * class constructor.
   * @param {string} message
   */
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.status = 404;
  }

  /**
   * return error number
   * @return {number} code
   */
  statusCode() {
    return this.status;
  }
}

module.exports = NotFound;