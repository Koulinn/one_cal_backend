import client from '../DB/db_config.js'

const read_query = async (query) => {
    try {
        const DB_res = await client.query(query)
        return DB_res
    } catch (error) {
        console.log('======== Error from read query ======== ')
        console.log(error)
        throw '======== Error from read_query ========'
    }
}

const aux = { read_query }

export default aux
