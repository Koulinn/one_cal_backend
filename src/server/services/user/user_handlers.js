import user_queries from '../../../DB/Entities/user/query_handler.js'
import lib from '../../../library/index.js'

const { read_query } = user_queries
const {
    aux: { errorMsgOnValidation },
} = lib

const create = async (req, res, next) => {
    try {
        const { email, uid } = req.body
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
        const { email, uid } = req.body
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

const userValidation = (req, res, next) => {
    const expectedProperties = ['email', 'uid']
    let checked = 0
    const isValid = 2
    let missingPropertiesText = `The properties are missing`

    expectedProperties.forEach((property) => {
        if (req.body[property] !== undefined) {
            checked++
        } else {
            missingPropertiesText += ` ${property},`
        }
    })

    if (isValid === checked) {
        next()
    } else {
        const msg = errorMsgOnValidation(missingPropertiesText)

        res.status(400).send({ msg })
    }
}

const userHandlers = {
    create,
    isExistentUser,
    userValidation,
}

export default userHandlers
