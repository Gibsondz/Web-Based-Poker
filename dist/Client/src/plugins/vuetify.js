"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
const lib_1 = __importDefault(require("vuetify/lib"));
const vuetify_1 = __importDefault(require("vuetify"));
vue_1.default.use(lib_1.default);
const vuetify = new vuetify_1.default({
    icons: {
        iconfont: 'md'
    },
    theme: {
        dark: true
    }
});
exports.default = vuetify;
