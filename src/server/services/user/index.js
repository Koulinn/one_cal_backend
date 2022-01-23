import express from 'express'
import FirebaseAuthService from '../../../firebase/firebase_auth.js'
import userHandlers from './user_handlers.js'
import multer from 'multer'

const { create, isExistentUser, editUser, deleteUser, login, uploadAvatar } =
    userHandlers
const { authorizeUser } = FirebaseAuthService

const router = express.Router()

router
    .route('/')
    .post(authorizeUser, isExistentUser, create)
    .get(authorizeUser, login)
    .put(authorizeUser, editUser)
    .delete(authorizeUser, deleteUser) //SHOULD TEST AGAIN WHEN FRONT-END IS DONE

router
    .route('/avatar')
    .put(authorizeUser, multer().single('avatar'), uploadAvatar)

export default router
