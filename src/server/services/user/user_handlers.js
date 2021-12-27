import user_queries from '../../../DB/Entities/user/query_handler.js'
import lib from '../../../library/index.js'

const { read_query } = user_queries
const {
    aux: {},
} = lib

const create = async (req, res, next) => {
    try {
        const { email, uid } = req.user
        const query = 'INSERT INTO users(email, uid) VALUES($1, $2) RETURNING email, uid'
        const values = [email, uid]

        const DB_response = await read_query(query, values)
        const newUser = DB_response.rows[0]

        res.status(201).send(newUser)
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: 'Server error' })
    }
}

const isExistentUser = async (req, res, next) => {
    try {
        const { email, uid } = req.user
        const query = 'SELECT email, uid FROM users WHERE email = $1 OR uid = $2'
        const values = [email, uid]

        const DB_res = await read_query(query, values)
        const isExistentUser = DB_res.rowCount

        if (isExistentUser) {
            res.status(400).send({ msg: 'E-mail already registered', email })
        } else {
            next()
        }
    } catch (error) {
        res.status(500).send({ msg: 'Server error' })
    }
}

const userHandlers = {
    create,
    isExistentUser,
}

export default userHandlers
