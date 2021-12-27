import firebase from './firebase_config.js'

const auth = firebase.auth

const authorizeUser = async (req, res, next) => {
    const authorizationHeader = req.headers['authorization']

    if (!authorizationHeader) {
        res.status(404).send({ msg: 'Missing token' })
    }

    const token = authorizationHeader.split(' ')[1]

    try {
        const decodedToken = await auth.verifyIdToken(token)
        req.user = {}
        req.user.uid = decodedToken.user_id
        req.user.email = decodedToken.email

        next()
    } catch (error) {
        console.log(error)
        res.status(403).send({ msg: 'No authorized' })
    }
}

const FirebaseAuthService = {
    authorizeUser,
}

export default FirebaseAuthService
