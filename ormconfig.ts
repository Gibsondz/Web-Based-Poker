import * as ORM from './src/entities'

const connString = process.env.MYSQLCONNSTR_localdb || process.env.SQL_CONN_STR
const parts = connString.split(';')
console.log( connString)
module.exports = {
    type: 'sqlite',
    host: parts[1].replace('Data Source=', '').split(':')[0],
    port: parts[1].replace('Data Source=', '').split(':')[1],
    username: parts[2].replace('User Id=', ''),
    password: parts[3].replace('Password=', ''),
    database: parts[0].replace('Database=', ''),
    logging: ['error', 'warn', 'schema'],
    options: { encrypt: true },
    synchronize: true,
    charset: 'utf8mb4',
    insecureAuth: true,
    entities: Object.keys(ORM).map(k => ORM[k])
}
