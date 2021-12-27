import client from '../../db_config.js'

const insert_user = async (email, uid) => {
    const query = 'INSERT INTO users(email, uid) VALUES($1, $2) RETURNING email, uid'
    const values = [email, uid]

    try {
        const DB_res = await client.query(query, values)
        return DB_res
    } catch (error) {
        console.log(error)
    }
}

const query_handler = { insert_user }

export default query_handler
