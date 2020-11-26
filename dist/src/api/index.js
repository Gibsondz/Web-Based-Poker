"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = __importDefault(require("./users"));
const pokerGames_1 = __importDefault(require("./pokerGames"));
const router = express_1.Router();
router.use('/api', users_1.default);
router.use('/api', pokerGames_1.default);
exports.default = router;
