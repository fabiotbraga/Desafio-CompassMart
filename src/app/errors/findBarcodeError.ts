class BarcodesExist {
  public readonly message: string;
  public readonly statusCode: number;

  constructor () {
    this.message = 'Barcodes already exist.';
    this.statusCode = 400;
  }
}

export default BarcodesExist;