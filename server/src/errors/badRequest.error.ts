import { BaseError } from "./";

class BadRequestError extends BaseError {
  statusCode = 400;
  message: string;
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}
export default BadRequestError;
