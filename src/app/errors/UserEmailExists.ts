class UserEmailExists {
  public readonly message: string;
  public readonly statusCode: number;

  constructor () {
    this.message = 'User Exists.';
    this.statusCode = 400;
  }
}

export default UserEmailExists;