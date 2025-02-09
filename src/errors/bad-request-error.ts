import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  public statusCode = 400;
  public code = "BAD_REQUEST";

  constructor(message: string = "Bad Request") {
    super(message);
  }
}
