export abstract class CustomError extends Error {
  public abstract statusCode: number;
  public abstract code: string;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;

    /**
     * Explanation:
     *
     * When you create an instance of a derived class, for example:
     *
     *   new NotFoundError('Resource not found');
     *
     * inside the constructor of the base class (CustomError), the property `new.target`
     * will specifically refer to the NotFoundError constructor (not CustomError). Thus, the expression
     * `new.target.prototype` returns the prototype of the NotFoundError class (i.e., NotFoundError.prototype).
     *
     * The call:
     *
     *   Object.setPrototypeOf(this, new.target.prototype);
     *
     * explicitly sets the prototype of the created object (`this`) to NotFoundError.prototype.
     * This ensures that the instance correctly inherits all methods and properties of NotFoundError
     * and that the `instanceof NotFoundError` check works as expected.
     *
     * In short, even though this code is executed within the constructor of the base class (CustomError),
     * it ensures that the created object "recognizes" itself as an instance of the derived class (NotFoundError
     * in this case) rather than just an instance of CustomError or Error.
     */

    Object.setPrototypeOf(this, new.target.prototype);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
