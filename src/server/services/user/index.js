import express from 'express'
import FirebaseAuthService from '../../../firebase/firebase_auth.js'
import userHandlers from './user_handlers.js'

const { create, isExistentUser, editUser, deleteUser } = userHandlers
const { authorizeUser } = FirebaseAuthService

const router = express.Router()

router
    .route('/')
    .post(authorizeUser, isExistentUser, create)
    .put(authorizeUser, isExistentUser, editUser)
    .delete(authorizeUser, isExistentUser, deleteUser)

export default router
