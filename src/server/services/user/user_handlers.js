import lib from '../../../library/index.js'
import fireStorage from '../../../firebase/firebase_storage.js'

const { uploadFile } = fireStorage

const {
    aux: { read_query },
} = lib

const create = async (req, res, next) => {
    try {
        const { email, uid } = req.user
        const query = `INSERT INTO users(email, uid) VALUES('${email}','${uid}')`

        const DB_response = await read_query(query)

        if (DB_response) {
            res.status(201).send({ success: true })
        } else {
            res.status(404).send({ success: false })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: 'Server error' })
    }
}

const login = async (req, res, next) => {
    try {
        const { email, uid } = req.user
        const query = `SELECT name, surname, birth_date, avatar, email FROM users WHERE email='${email}' OR uid='${uid}'`

        const DB_response = await read_query(query)

        const user = DB_response[0][0]

        if (user) {
            res.status(200).send({ success: true, user })
        } else {
            res.status(404).send({ success: false, msg: 'User not found' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: 'Server error' })
    }
}

const isExistentUser = async (req, res, next) => {
    try {
        const { email, uid } = req.user
        const query = `SELECT email, uid FROM users WHERE email='${email}' OR uid='${uid}'`

        const DB_res = await read_query(query)
        const isExistentUser = DB_res[1].rowCount

        if (isExistentUser) {
            res.status(400).send({ msg: 'E-mail already registered', email })
        } else {
            next()
        }
    } catch (error) {
        res.status(500).send({ msg: 'Server error' })
    }
}

const editUser = async (req, res, next) => {
    try {
        const { email, uid } = req.user
        const { name, surname, birth_date } = req.body

        const query = `
            UPDATE users
            SET email='${email}', name='${name}', surname='${surname}', birth_date='${birth_date}'
            WHERE uid='${uid}'
            RETURNING name, surname, birth_date
        `

        const DB_response = await read_query(query)
        const updatedUser = DB_response[0][0]

        if (updatedUser) {
            res.status(200).send(updatedUser)
        } else {
            res.status(404).send({ msg: 'Not updated' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: 'Server error' })
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const { uid } = req.user
        const query = `DELETE FROM users WHERE uid='${uid}'`

        const DB_response = await read_query(query)

        const isDeleted = DB_response[1].rowCount

        if (isDeleted) {
            res.status(203).send({
                msg: `User with ID ${uid} was successfully deleted from the database`,
            })
        } else {
            res.status(400).send({ msg: `User not deleted`, success: false })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: 'Server error' })
    }
}

const uploadAvatar = async (req, res, next) => {
    try {
        const file = req.file
        const { uid } = req.user

        const extension = file.originalname.split('.')[1]

        const res_upload = await uploadFile(file.buffer, uid + '.' + extension)

        const query = `
            UPDATE users
            SET avatar='${res_upload}'
            WHERE uid='${uid}'
            RETURNING avatar
        `

        const DB_response = await read_query(query)
        const updatedUser = DB_response[0][0]

        if (updatedUser) {
            res.status(200).send(updatedUser)
        } else {
            res.status(404).send({ msg: 'Not updated' })
        }
    } catch (error) {
        console.log(error)
        next()
    }
}

const userHandlers = {
    create,
    isExistentUser,
    editUser,
    deleteUser,
    login,
    uploadAvatar,
}

export default userHandlers
