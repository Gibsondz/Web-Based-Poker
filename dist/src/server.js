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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
require("reflect-metadata");
require("./loadEnv");
const express_1 = __importStar(require("express")), Express = express_1;
const connect_history_api_fallback_1 = __importDefault(require("connect-history-api-fallback"));
const ws_1 = require("ws");
const http_1 = require("http");
const path_1 = require("path");
const websocket_1 = require("./websocket");
const api_1 = __importDefault(require("./api"));
const utils_1 = require("./utils");
async function startServer() {
    await utils_1.createConn();
    const app = express_1.default();
    app.enable('trust proxy');
    app.use(Express.json());
    app.use(api_1.default);
    app.use(connect_history_api_fallback_1.default());
    app.use('/', Express.static(path_1.join(__dirname, 'site')));
    const server = http_1.createServer(app);
    const wss = new ws_1.Server({ server });
    websocket_1.Pubsub.create(wss);
    const port = process.env.PORT || 1337;
    server.listen(port, () => console.log(`Server started on port ${port}`));
    return server;
}
exports.startServer = startServer;
startServer();
