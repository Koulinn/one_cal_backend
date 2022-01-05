import config from '../config/index.js'
import { Sequelize } from 'sequelize'

const {
    globalVariables: { APP_MODE },
} = config

const { PGUSER, PGHOST, PGPASSWORD, PGPORT, DATABASE_URL } = process.env

const database = APP_MODE === 'development' ? 'one_cal_dev' : 'Prod_DB'

console.log(database, '<<<<<<<database connected')

const DEV_URI = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${database}`

const DB_URI_STRING = APP_MODE === 'production' ? DATABASE_URL : DEV_URI

const db_config_options_DEV = {}
const db_config_options_PROD = {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
}

const DB_CONFIG_OPTIONS =
    APP_MODE === 'production' ? db_config_options_PROD : db_config_options_DEV

export const sequelize = new Sequelize(DB_URI_STRING, DB_CONFIG_OPTIONS)

export default sequelize
