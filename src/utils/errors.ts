export class AuthError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "AuthError";
    }
}

export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NotFoundError";
    }
}

export class DataValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DataValidationError";
    }
}

export class DatabaseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DatabaseError";
    }
}

export class UserFriendlyError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UserFriendlyError";
    }
}
