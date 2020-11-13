import 'reflect-metadata'
import './loadEnv'
import express, * as Express from 'express'
import history from 'connect-history-api-fallback'
import { Server } from 'ws'
import { createServer } from 'http'
import { join } from 'path'
import { Pubsub } from './websocket'
import apiRouter from './api'
import { createConn } from './utils'

export async function startServer() {
    await createConn()
    const app = express()
    app.enable('trust proxy')
    app.use(Express.json())
    app.use(apiRouter)
    app.use(history())
    app.use('/', Express.static(join(__dirname, 'site')))
    const server = createServer(app)
    const wss = new Server({ server })
    Pubsub.create(wss)
    const port = process.env.PORT || 1337
    server.listen(port, () => console.log(`Server started on port ${port}`))

    return server
}

startServer()