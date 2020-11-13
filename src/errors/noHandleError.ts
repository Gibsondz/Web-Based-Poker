export class NoHandleError extends Error {
    message: string
    constructor() {
        super('channel requires handle')
        this.message = 'channel requires handle'
    }
}