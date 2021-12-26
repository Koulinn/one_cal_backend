import { database } from './db_config.js'

const db_conn_resolve = (err) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('DB connected at ' + database)
  }
}

const db_generic_error = (err) => {
  console.error('connection error', err.stack)
}

const db_error_handlers = { db_conn_resolve, db_generic_error }

export default db_error_handlers
