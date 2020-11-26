"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
function loadEnv() {
    const env = process.env.NODE_ENV = '.env.development';
    const path = path_1.resolve(__dirname, env);
    const data = fs_1.readFileSync(path, 'UTF-8');
    const lines = data.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        for (let k = 0; k < line.length; k++) {
            if (line.charAt(k) === '=') {
                const key = line.substr(0, k);
                const val = line.substr(k + 1, line.length - key.length);
                process.env[key] = val;
                break;
            }
        }
    }
}
loadEnv();
