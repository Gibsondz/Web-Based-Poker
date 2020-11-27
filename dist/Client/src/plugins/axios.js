"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
const axios_1 = __importDefault(require("axios"));
vue_1.default.use(Vue => {
    Vue.prototype.$axios = axios_1.default.create({
        baseURL: `${window.location.protocol}//${window.location.host}/api/`,
        withCredentials: true
    });
});
