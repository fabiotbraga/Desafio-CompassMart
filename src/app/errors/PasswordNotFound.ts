class PasswordInvalid {
  public readonly message: string;
  public readonly statusCode: number;

  constructor () {
    this.message = 'Password Not Found.';
    this.statusCode = 400;
  }
}

export default PasswordInvalid;