class IdProductInvalid {
  public readonly message: string;
  public readonly statusCode: number;

  constructor () {
    this.message = 'ID format invalid.';
    this.statusCode = 400;
  }
}

export default IdProductInvalid;