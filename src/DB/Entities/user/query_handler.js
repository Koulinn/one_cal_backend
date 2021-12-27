import client from '../../db_config.js'

const read_query = async (query) => {
    try {
        const DB_res = await client.query(query)
        return DB_res
    } catch (error) {
        console.log('========= Error from read query ======== ')
        console.log(error)
    }
}

const query_handler = { read_query }

export default query_handler
