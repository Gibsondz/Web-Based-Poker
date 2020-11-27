"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pubsub = void 0;
class Pubsub {
    constructor(wss) {
        this.rooms = new Map();
        this.wss = wss;
        this.wss.on('connection', (socket) => {
            this.onConnection(socket);
        });
    }
    static getInstance() {
        if (Pubsub.instance)
            return Pubsub.instance;
        else
            throw new Error('must use create method to instantiate first');
    }
    static create(wss) {
        if (!Pubsub.instance)
            Pubsub.instance = new Pubsub(wss);
        else
            throw new Error('an instance has already been created');
    }
    post(trigger, value) {
        this.publish({
            trigger,
            method: HttpMethod.POST,
            value
        });
    }
    patch(trigger, value) {
        this.publish({
            trigger,
            method: HttpMethod.PATCH,
            value
        });
    }
    delete(trigger, value) {
        this.publish({
            trigger,
            method: HttpMethod.DELETE,
            value
        });
    }
    publish(options) {
        if (this.rooms.has(options.trigger)) {
            const sockets = this.rooms.get(options.trigger);
            try {
                const data = JSON.stringify(options);
                for (let i = 0; i < sockets.length; i++) {
                    const ws = sockets[i];
                    try {
                        ws.send(data);
                    }
                    catch (_a) { }
                }
            }
            catch (_b) { }
        }
    }
    onConnection(ws) {
        ws.onerror = () => ws.close();
        ws.onclose = () => this.purge(ws);
        ws.onmessage = (messageEvent) => {
            try {
                const data = messageEvent.data.toString();
                const message = JSON.parse(data);
                if (message.unsubscribe)
                    this.unsubscribe(message.unsubscribe, ws);
                else if (message.subscribe)
                    this.subscribe(message.subscribe, ws);
            }
            catch (_a) { }
        };
    }
    subscribe(trigger, ws) {
        if (this.rooms.has(trigger)) {
            const sockets = this.rooms.get(trigger);
            const index = sockets.findIndex(socket => socket === ws);
            if (index < 0)
                sockets.push(ws);
        }
        else
            this.rooms.set(trigger, [ws]);
    }
    unsubscribe(trigger, ws) {
        if (this.rooms.has(trigger)) {
            const sockets = this.rooms.get(trigger);
            const index = sockets.findIndex(socket => socket === ws);
            if (index >= 0)
                sockets.splice(index, 1);
        }
    }
    purge(ws) {
        if (!ws.CLOSED)
            ws.close();
        for (let [trigger, sockets] of this.rooms.entries()) {
            let index = sockets.findIndex(socket => socket === ws);
            if (index >= 0)
                sockets.splice(index, 1);
            if (sockets.length <= 0)
                this.rooms.delete(trigger);
        }
    }
}
exports.Pubsub = Pubsub;
Pubsub.instance = null;
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["POST"] = "POST";
    HttpMethod["PATCH"] = "PATCH";
    HttpMethod["DELETE"] = "DELETE";
})(HttpMethod || (HttpMethod = {}));
