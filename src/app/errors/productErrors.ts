export class ApiError extends Error {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

export class ProductsNotFoundError extends ApiError {
  constructor() {
    super("Product Not found", 404);
  }
}

export class FileNotFoundError extends ApiError {
  constructor() {
    super("File Not found", 404);
  }
}

export class IdNotFoundError extends ApiError {
  constructor() {
    super("ID not found", 404);
  }
}

export class BarCodeExistsError extends ApiError {
  constructor() {
    super("Barcodes already exist.", 400);
  }
}

export class IdInvalidError extends ApiError {
  constructor() {
    super("ID format invalid.", 400);
  }
}

export class FileBigError extends ApiError {
  constructor() {
    super("File is too big.", 400);
  }
}

export class FileTypeError extends ApiError {
  constructor() {
    super("File is not a csv file.", 400);
  }
}
