import pkg from 'pg'
import config from '../config/index.js'
const { Client } = pkg

const {
    globalVariables: { APP_MODE },
} = config

export const database = APP_MODE === 'development' ? 'one_cal_dev' : 'one_cal'

const db_config = {
    database: database,
}

const client = new Client(db_config)

export default client
