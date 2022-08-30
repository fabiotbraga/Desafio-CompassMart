class UserExist {
  public readonly message: string;
  public readonly statusCode: number;

  constructor () {
    this.message = 'User already exist.';
    this.statusCode = 400;
  }
}

export default UserExist;