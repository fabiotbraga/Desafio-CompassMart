export class ApiError extends Error {
  public readonly message: string;
	public readonly statusCode: number

	constructor(message: string, statusCode: number) {
		super()
    this.message = message;
		this.statusCode = statusCode
	}
}

export class EmailExistsError extends ApiError {
	constructor() {
		super('User email already exists', 400)
	}
}

export class PasswordInvalid extends ApiError {
	constructor() {
		super('Password Invalid', 400)
	}
}

export class UserNotFound extends ApiError {
	constructor() {
		super('User Not Found', 404)
	}
}