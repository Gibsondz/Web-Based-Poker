"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchNotFound = exports.catchBadRequest = exports.HttpError = void 0;
class HttpError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
exports.HttpError = HttpError;
HttpError.BadRequest = new HttpError(400, 'bad request');
HttpError.Unauthorized = new HttpError(401, 'unauthorized');
HttpError.Forbidden = new HttpError(403, 'forbidden');
HttpError.NotFound = new HttpError(404, 'not found');
HttpError.InternalError = new HttpError(500, 'internal server error');
HttpError.NotImplemented = new HttpError(501, 'not implemented');
HttpError.PaymentRequired = new HttpError(402, 'payment token required');
function catchBadRequest() {
    throw HttpError.BadRequest;
}
exports.catchBadRequest = catchBadRequest;
function catchNotFound() {
    throw HttpError.NotFound;
}
exports.catchNotFound = catchNotFound;
