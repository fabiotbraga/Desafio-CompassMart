"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenInvalid = exports.NoTokenProvided = exports.UserNotFound = exports.PasswordInvalid = exports.EmailExistsError = exports.ApiError = void 0;
class ApiError extends Error {
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.ApiError = ApiError;
class EmailExistsError extends ApiError {
    constructor() {
        super('User email already exists', 400);
    }
}
exports.EmailExistsError = EmailExistsError;
class PasswordInvalid extends ApiError {
    constructor() {
        super('Password Invalid', 401);
    }
}
exports.PasswordInvalid = PasswordInvalid;
class UserNotFound extends ApiError {
    constructor() {
        super('User Not Found', 404);
    }
}
exports.UserNotFound = UserNotFound;
class NoTokenProvided extends ApiError {
    constructor() {
        super('No Token Provided', 401);
    }
}
exports.NoTokenProvided = NoTokenProvided;
class TokenInvalid extends ApiError {
    constructor() {
        super('Token Invalid', 401);
    }
}
exports.TokenInvalid = TokenInvalid;
