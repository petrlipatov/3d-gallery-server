import { CustomError } from "./custom-error";

export class UnauthorizedError extends CustomError {
  public statusCode = 401;
  public code = "UNAUTHORIZED";

  constructor(message: string = "Not authorized") {
    super(message);
  }
}
