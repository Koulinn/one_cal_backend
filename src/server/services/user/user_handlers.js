import user_queries from '../../../DB/Entities/user/query_handler.js'

const { insert_user } = user_queries

const create = async (req, res, next) => {
    try {
        const { email, uid } = req.body

        const DB_response = await insert_user(email, uid)
        const newUser = DB_response.rows[0]

        res.status(201).send(newUser)
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: 'Server error' })
    }
}

const userHandlers = {
    create,
}

export default userHandlers
