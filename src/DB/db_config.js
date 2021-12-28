import config from '../config/index.js'
import { Sequelize } from 'sequelize'

const {
    globalVariables: { APP_MODE },
} = config

const { PGUSER, PGHOST, PGPASSWORD, PGPORT } = process.env

export const database = APP_MODE === 'development' ? 'one_cal_dev' : 'one_cal'

console.log(database, '<<<<<<<database connected')

const db_config = {
    database: database,
    username: PGUSER,
    password: PGPASSWORD,
    host: PGHOST,
    port: PGPORT,
    dialect: 'postgres',
}
export const sequelize = new Sequelize(db_config)

export default sequelize
