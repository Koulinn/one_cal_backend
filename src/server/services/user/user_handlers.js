import user_queries from '../../../DB/Entities/user/query_handler.js'
import lib from '../../../library/index.js'

const { insert_user, check_existent_user } = user_queries
const {
    aux: { errorMsgOnValidation },
} = lib

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

const isExistentUser = async (req, res, next) => {
    try {
        const { email, uid } = req.body
        const DB_res = await check_existent_user(email, uid)
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
        // const lastComa = missingProperties.lastIndexOf(',')
        // const msg = missingProperties.slice(0, lastComa) + '.'
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
