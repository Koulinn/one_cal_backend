import express from 'express'
import meal_handlers from './meal_handlers.js'

const { add_meal_to_user, checkExistentMealOrCreate, delete_meal, edit_meal } = meal_handlers

const router = express.Router()

router.route('/').post(checkExistentMealOrCreate, add_meal_to_user).get()

router.route('/:_id').delete(delete_meal).put(edit_meal)

export default router
