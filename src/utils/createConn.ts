import { getConnectionOptions, createConnection } from 'typeorm'

export async function createConn() {
    const connectionOptions = await getConnectionOptions()
    const connection = await createConnection({
        ...connectionOptions,
        name: 'default'
    })
    return connection
}

