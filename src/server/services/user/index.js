import express from 'express'

import userHandlers from './user_handlers.js'

const { create } = userHandlers

const router = express.Router()

router.route('/').post(create)

export default router
