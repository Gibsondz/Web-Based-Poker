"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ORM = __importStar(require("./src/entities"));
const connString = process.env.MYSQLCONNSTR_localdb || process.env.SQL_CONN_STR;
const parts = connString.split(';');
console.log(connString);
module.exports = {
    type: 'sqlite',
    host: parts[1].replace('Data Source=', '').split(':')[0],
    port: parts[1].replace('Data Source=', '').split(':')[1],
    username: parts[2].replace('User Id=', ''),
    password: parts[3].replace('Password=', ''),
    database: parts[0].replace('Database=', ''),
    logging: ['error', 'warn', 'schema'],
    options: { encrypt: true },
    synchronize: true,
    charset: 'utf8mb4',
    insecureAuth: true,
    entities: Object.keys(ORM).map(k => ORM[k])
};
