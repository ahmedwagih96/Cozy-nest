abstract class BaseError extends Error {
  abstract statusCode: number;
  constructor(public message : string) {
    super();
  }
}

export default BaseError;
