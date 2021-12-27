import express from 'express'

import userHandlers from './user_handlers.js'

const { create, isExistentUser, userValidation } = userHandlers

const router = express.Router()

router.route('/').post(userValidation, isExistentUser, create)

export default router
