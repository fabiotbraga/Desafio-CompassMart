class UserIncorrectPassword {
  public readonly message: string;
  public readonly statusCode: number;

  constructor () {
    this.message = 'password wrong.';
    this.statusCode = 404;
  }
}

export default UserIncorrectPassword;