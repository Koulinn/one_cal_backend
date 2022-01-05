import sequelize from './db_config.js'
import db_error_handlers from './db_error_handlers.js'
import table_creation_queries from './Entities/index.js'

const { db_conn_resolve } = db_error_handlers

const db_connect = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.query(table_creation_queries)
        console.log('Connection to DB has been established successfully.')
    } catch (error) {
        db_conn_resolve(error)
    }
}

export default db_connect
