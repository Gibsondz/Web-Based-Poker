import * as WebSocket from 'ws'

export class Pubsub {
    private static instance: Pubsub = null
    private rooms: Map<string, WebSocket[]>
    private wss: WebSocket.Server
    
    private constructor(wss: WebSocket.Server) {
        this.rooms = new Map()
        this.wss = wss
        this.wss.on('connection', (socket: WebSocket) => {
            this.onConnection(socket)
        })
    }

    static getInstance(): Pubsub {
        if(Pubsub.instance) return Pubsub.instance
        else throw new Error('must use create method to instantiate first')
    }

    static create(wss: WebSocket.Server) {
        if(!Pubsub.instance) Pubsub.instance = new Pubsub(wss)
        else throw new Error('an instance has already been created')
    }

    post<T>(trigger: string, value: T) {
        this.publish({
            trigger,
            method: HttpMethod.POST,
            value
        })
    }

    patch<T>(trigger: string, value: T) {
        this.publish({
            trigger,
            method: HttpMethod.PATCH,
            value
        })
    }

    delete<T>(trigger: string, value: T) {
        this.publish({
            trigger,
            method: HttpMethod.DELETE,
            value
        })
    }

    private publish<T>(options: PublishOptions<T>) {
        if(this.rooms.has(options.trigger)) {
            const sockets = this.rooms.get(options.trigger)
            try {
                const data = JSON.stringify(options)
                for(let i = 0; i < sockets.length; i++) {
                    const ws = sockets[i]
                    try {
                        ws.send(data)
                    }
                    catch {}
                }
            }
            catch {}
        }
    }

    private onConnection(ws: WebSocket) {
        ws.onerror = () => ws.close()
        ws.onclose = () => this.purge(ws)
        ws.onmessage = (messageEvent: WebSocket.MessageEvent) => {
            try {
                const data = messageEvent.data.toString()
                const message = JSON.parse(data) as Message
                if(message.unsubscribe) this.unsubscribe(message.unsubscribe, ws)
                else if(message.subscribe) this.subscribe(message.subscribe, ws)
            }
            catch {}
        }
    }

    private subscribe(trigger: string, ws: WebSocket) {
        if(this.rooms.has(trigger)) {
            const sockets = this.rooms.get(trigger)
            const index = sockets.findIndex(socket => socket === ws)
            if(index < 0) sockets.push(ws)
        }
        else this.rooms.set(trigger, [ws])
    }

    private unsubscribe(trigger: string, ws: WebSocket) {
        if(this.rooms.has(trigger)) {
            const sockets = this.rooms.get(trigger)
            const index = sockets.findIndex(socket => socket === ws)
            if(index >= 0) sockets.splice(index , 1)
        }
    }

    private purge(ws: WebSocket) {
        if(!ws.CLOSED) ws.close()
        for(let [trigger, sockets] of this.rooms.entries()) {
            let index = sockets.findIndex(socket => socket === ws)
            if(index >= 0) sockets.splice(index, 1)
            if(sockets.length <= 0)  this.rooms.delete(trigger)
        }
    }
}

type Message = {
    subscribe?: string
    unsubscribe?: string
}

type PublishOptions<T> = {
    trigger: string
    method: HttpMethod
    value: T
}

enum HttpMethod {
    POST = 'POST',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}