import { StatusCodes } from "http-status-codes";

export class NotFound extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCodes = StatusCodes.NOT_FOUND;
  }
}

export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
export class UnauthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthenticatedError';
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
export class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}