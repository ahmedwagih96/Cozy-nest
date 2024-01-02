import { BaseError } from "./";

class UnauthorizedError extends BaseError {
  statusCode = 401;
  message: string;
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}
export default UnauthorizedError;
