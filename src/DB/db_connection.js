import client, { database } from './db_config.js'
import db_error_handlers from './db_error_handlers.js'

const { db_conn_resolve, db_generic_error } = db_error_handlers

const db_connect = async () => {
  await client.connect(db_conn_resolve)

  client.on('error', db_generic_error)
}

export default db_connect
