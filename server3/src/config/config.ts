import 'dotenv/config'

const MONGO_URL = process.env.MONGO_URL || ''

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 5500

const ORIGIN = process.env.ORIGIN || ''

export const config = {
    mongo: {
        URL: MONGO_URL
    },
    server: {
        PORT: SERVER_PORT
    },
    origin: ORIGIN
}
