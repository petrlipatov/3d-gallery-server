import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  public statusCode = 404;
  public code = "NOT_FOUND";

  constructor(message: string = "Resource not found") {
    super(message);
  }
}
