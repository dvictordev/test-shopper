export class AlreadyExisteMeasuresOnDate extends Error {
  public errorCode: string;
  public errorDescription: string;

  constructor(errorCode: string, errorDescription: string) {
    super(errorDescription);
    this.name = "CustomError"; // Nome do erro
    this.errorCode = errorCode;
    this.errorDescription = errorDescription;
  }
}
