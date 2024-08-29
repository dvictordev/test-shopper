export class InvalidReadError extends Error {
  public errorCode: string;
  public errorDescription: string;
  public statusCode: number;

  constructor(errorCode: string, errorDescription: string, statusCode: number) {
    super(errorDescription);
    this.name = "InvalidReadError";
    this.errorCode = errorCode;
    this.errorDescription = errorDescription;
    this.statusCode = statusCode;
  }
}
