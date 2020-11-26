"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
class WS {
    constructor() {
        this.handlers = new Map();
        this._connected = false;
        this.connecting = null;
    }
    get connected() {
        return this._connected;
    }
    connect() {
        if (this.connecting)
            return this.connecting;
        else {
            this.connecting = new Promise((resolve, reject) => {
                try {
                    let protocol = window.location.protocol.replace('http', 'ws');
                    this.ws = new WebSocket(`${protocol}//${window.location.host}/api`);
                    this.ws.onerror = (err) => reject(err);
                    this.ws.onopen = () => {
                        this.ws.onmessage = ev => {
                            try {
                                const data = JSON.parse(ev.data);
                                const handlers = this.handlers.get(data.trigger);
                                for (let i = 0; i < handlers.length; i++) {
                                    try {
                                        handlers[i](Object.assign({}, data));
                                    }
                                    catch (_a) { }
                                }
                            }
                            catch (_b) { }
                        };
                        this._connected = true;
                        this.ws.onerror = null;
                        resolve();
                        this.connecting = null;
                    };
                }
                catch (err) {
                    reject(err);
                }
            });
            return this.connecting;
        }
    }
    close() {
        this.ws.close();
        for (let trigger of this.handlers.keys()) {
            this.unsubscribe(trigger);
        }
        this.handlers.clear();
        this.ws = null;
        this._connected = false;
    }
    on(trigger, handler) {
        if (this.handlers.has(trigger))
            this.handlers.get(trigger).push(handler);
        else {
            this.handlers.set(trigger, [handler]);
            this.subscribe(trigger);
        }
    }
    remove(handler) {
        for (let [trigger, handlers] of this.handlers.entries()) {
            for (let i = 0; i < handlers.length; i++) {
                if (handlers[i] == handler) {
                    handlers.splice(i, 1);
                    if (handlers.length === 0) {
                        this.unsubscribe(trigger);
                        this.handlers.delete(trigger);
                    }
                    return;
                }
            }
        }
    }
    subscribe(trigger) {
        const subscribe = {
            subscribe: trigger
        };
        this.ws.send(JSON.stringify(subscribe));
    }
    unsubscribe(trigger) {
        const unsubscribe = {
            unsubscribe: trigger
        };
        this.ws.send(JSON.stringify(unsubscribe));
    }
}
vue_1.default.use(Vue => Vue.prototype.$ws = new WS());
