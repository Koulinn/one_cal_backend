import config from '../config/index.js'
import { Sequelize } from 'sequelize'

const {
    globalVariables: { APP_MODE },
} = config

const { PGUSER, PGHOST, PGPASSWORD, PGPORT, DATABASE_URL } = process.env

const database = APP_MODE === 'development' ? 'one_cal_dev' : 'Prod_DB'

console.log(database, '<<<<<<<database connected')

const db_config_DEV_MODE = {
    database: database,
    username: PGUSER,
    password: PGPASSWORD,
    host: PGHOST,
    port: PGPORT,
    dialect: 'postgres',
}

const db_config = APP_MODE === 'production' ? DATABASE_URL : db_config_DEV_MODE

export const sequelize = new Sequelize(db_config)

export default sequelize
