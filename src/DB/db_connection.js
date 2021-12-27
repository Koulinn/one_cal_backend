import sequelize from './db_config.js'
import db_error_handlers from './db_error_handlers.js'

const { db_conn_resolve, db_generic_error } = db_error_handlers

const db_connect = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

export default db_connect
