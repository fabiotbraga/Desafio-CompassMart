class IdProductExist {
  public readonly message: string;
  public readonly statusCode: number;

  constructor () {
    this.message = 'ID not exist.';
    this.statusCode = 404;
  }
}

export default IdProductExist;