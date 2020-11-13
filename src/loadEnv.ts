import { resolve } from 'path'
import { readFileSync } from 'fs'

function loadEnv() {
    const env = process.env.NODE_ENV = '.env.development'
    const path = resolve(__dirname, env)
    const data = readFileSync(path, 'UTF-8')
    const lines = data.split('\n')
    for(let i = 0; i < lines.length; i++) {
        let line = lines[i].trim()
        for(let k = 0; k < line.length; k++) {
            if(line.charAt(k) === '=') {
                const key = line.substr(0, k)
                const val = line.substr(k+1, line.length - key.length)
                process.env[key] = val
                break
            }
        }
    }
}

loadEnv()
