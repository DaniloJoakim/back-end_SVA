class BadRequestError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = 'BadRequestError';
    }
}

class NotFoundError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = 'NotFoundError';
    }
}

export { BadRequestError, NotFoundError }
