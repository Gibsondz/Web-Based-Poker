"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoHandleError = void 0;
class NoHandleError extends Error {
    constructor() {
        super('channel requires handle');
        this.message = 'channel requires handle';
    }
}
exports.NoHandleError = NoHandleError;
