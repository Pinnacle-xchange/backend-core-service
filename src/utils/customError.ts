export class CustomError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}
