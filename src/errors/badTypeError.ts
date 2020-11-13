export class BadTypeError extends Error {
    input: Object
    format: Object
    errors: string[]
    constructor(intput:Object, format:Object, errors: string[]) {
        super()
        this.input = intput
        this.format = format
        this.errors = errors;
        
    }
}
