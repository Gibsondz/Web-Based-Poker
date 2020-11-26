"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConn = void 0;
const typeorm_1 = require("typeorm");
async function createConn() {
    const connectionOptions = await typeorm_1.getConnectionOptions();
    const connection = await typeorm_1.createConnection(Object.assign(Object.assign({}, connectionOptions), { name: 'default' }));
    return connection;
}
exports.createConn = createConn;
