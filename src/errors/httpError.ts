export class HttpError extends Error {
    static BadRequest = new HttpError(400, 'bad request')
    static Unauthorized = new HttpError(401, 'unauthorized')
    static Forbidden = new HttpError(403, 'forbidden')
    static NotFound = new HttpError(404, 'not found')
    static InternalError = new HttpError(500, 'internal server error')
    static NotImplemented = new HttpError(501, 'not implemented')
    static PaymentRequired = new HttpError(402, 'payment token required')
    
    status: number
    message: string

    constructor(status: number, message: string) {
        super(message)
        this.status = status
        this.message = message
    }
}

export function catchBadRequest(): never {
    throw HttpError.BadRequest
}

export function catchNotFound(): never {
    throw HttpError.NotFound
}