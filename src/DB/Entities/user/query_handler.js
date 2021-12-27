import client from '../../db_config.js'

const read_query = async (query, values) => {
    try {
        const DB_res = await client.query(query, values)
        return DB_res
    } catch (error) {
        console.log('========= Error from insert_user ======== ')
        console.log(error)
    }
}

const query_handler = { read_query }

export default query_handler
