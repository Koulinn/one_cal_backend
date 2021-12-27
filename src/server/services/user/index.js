import express from 'express'
import FirebaseAuthService from '../../../firebase/firebase_auth.js'
import userHandlers from './user_handlers.js'

const { create, isExistentUser } = userHandlers
const { authorizeUser } = FirebaseAuthService

const router = express.Router()

router
    .route('/')
    .post(authorizeUser, isExistentUser, create)
    .put(authorizeUser, (req, res, next) => {
        console.log(req._uid, req.email)
    })
    .delete()

export default router
