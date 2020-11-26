"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadTypeError = void 0;
class BadTypeError extends Error {
    constructor(intput, format, errors) {
        super();
        this.input = intput;
        this.format = format;
        this.errors = errors;
    }
}
exports.BadTypeError = BadTypeError;
