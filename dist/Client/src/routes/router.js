"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
const vue_router_1 = __importDefault(require("vue-router"));
const browse_1 = __importDefault(require("./browse"));
const lobby_1 = __importDefault(require("./lobby"));
const waitingRoom_1 = __importDefault(require("./waitingRoom"));
vue_1.default.use(vue_router_1.default);
const router = new vue_router_1.default({
    mode: 'history',
    routes: [
        browse_1.default,
        lobby_1.default,
        waitingRoom_1.default,
        {
            path: '*',
            redirect: ({ path, query }) => {
                const to = path.substr(path.lastIndexOf('/') + 1, path.length);
                return { path: `app/${to}`, query };
            }
        }
    ]
});
exports.default = router;
