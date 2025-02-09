import { CustomError } from "./custom-error";

export class ServerError extends CustomError {
  public statusCode = 500;
  public code = "SERVER_ERROR";

  constructor(message: string = "Internal server error") {
    super(message);
  }
}
