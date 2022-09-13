"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdInvalidError = exports.BarCodeExistsError = exports.IdNotFoundError = exports.FileNotFoundError = exports.ProductsNotFoundError = exports.ApiError = void 0;
class ApiError extends Error {
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.ApiError = ApiError;
class ProductsNotFoundError extends ApiError {
    constructor() {
        super('Product Not found', 404);
    }
}
exports.ProductsNotFoundError = ProductsNotFoundError;
class FileNotFoundError extends ApiError {
    constructor() {
        super('File Not found', 404);
    }
}
exports.FileNotFoundError = FileNotFoundError;
class IdNotFoundError extends ApiError {
    constructor() {
        super('ID not found', 404);
    }
}
exports.IdNotFoundError = IdNotFoundError;
class BarCodeExistsError extends ApiError {
    constructor() {
        super('Barcodes already exist.', 400);
    }
}
exports.BarCodeExistsError = BarCodeExistsError;
class IdInvalidError extends ApiError {
    constructor() {
        super('ID format invalid.', 400);
    }
}
exports.IdInvalidError = IdInvalidError;
