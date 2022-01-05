const db_conn_resolve = (err) => {
    console.error('connection error', err)
}

const db_error_handlers = { db_conn_resolve }

export default db_error_handlers
