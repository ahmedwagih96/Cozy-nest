import { BaseError } from "./";

class NotFoundError extends BaseError {
  statusCode = 404;
  message: string;
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}

export default NotFoundError;
