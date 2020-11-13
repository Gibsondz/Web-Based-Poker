import Vue from 'vue'

class WS {
    private readonly handlers: Map<string, Function[]>
    private ws: WebSocket
    private _connected: boolean
    private connecting: Promise<void>

    constructor() {
        this.handlers = new Map()
        this._connected = false
        this.connecting = null
    }

    get connected() {
        return this._connected
    }

    connect(): Promise<void> {
        if(this.connecting) return this.connecting
        else {
            this.connecting =  new Promise((resolve, reject) => {
                try {
                    let protocol = window.location.protocol.replace('http', 'ws')
                    this.ws = new WebSocket(`${protocol}//${window.location.host}/api`)
                    this.ws.onerror = (err) => reject(err)
                    this.ws.onopen = () => {
                        this.ws.onmessage = ev => {
                            try {
                                const data: Message<any> = JSON.parse(ev.data)
                                const handlers = this.handlers.get(data.trigger)
                                for(let i = 0; i < handlers.length; i++) {
                                    try {
                                        handlers[i](Object.assign({}, data))
                                    }
                                    catch {}
                                }
                            }
                            catch {}
                        }
                        this._connected = true
                        this.ws.onerror = null
                        resolve()
                        this.connecting = null
                    }
                }
                catch(err) {
                    reject(err)
                }
            })
            return this.connecting
        }
    }

    close() {
        this.ws.close()
        for(let trigger of this.handlers.keys()) {
            this.unsubscribe(trigger)
        }
        this.handlers.clear()
        this.ws = null
        this._connected = false
    }

    on<T>(trigger: string, handler: (message: Message<T>) => any) {
        if(this.handlers.has(trigger)) this.handlers.get(trigger).push(handler)
        else {
            this.handlers.set(trigger, [ handler ])
            this.subscribe(trigger)
        }
    }

    remove(handler: Function) {
        for(let [trigger, handlers] of this.handlers.entries()) {
            for(let i = 0; i< handlers.length; i++) {
                if(handlers[i] == handler) {
                    handlers.splice(i, 1)
                    if(handlers.length === 0) {
                        this.unsubscribe(trigger)
                        this.handlers.delete(trigger)
                    }
                    return
                }
            }
        }
    }

    private subscribe(trigger: string) {
        const subscribe = {
            subscribe: trigger
        }
        this.ws.send(JSON.stringify(subscribe))
    }

    private unsubscribe(trigger: string) {
        const unsubscribe = {
            unsubscribe: trigger
        }
        this.ws.send(JSON.stringify(unsubscribe))
    }
}

type Message<T> = {
    trigger: string
    method: 'POST'|'PATCH'|'DELETE'
    value: T
}

Vue.use(Vue => Vue.prototype.$ws = new WS())

declare module 'vue/types/vue' {
    export interface Vue {
      $ws: WS
    }
}