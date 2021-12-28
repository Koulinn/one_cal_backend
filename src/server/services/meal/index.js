import express from 'express'
import meal_handlers from './meal_handlers.js'

const { add_meal_to_user, checkExistentMealOrCreate, delete_meal, edit_meal, edit_meal_eaten, delete_meal_eaten } =
    meal_handlers

const router = express.Router()

router.route('/').post(checkExistentMealOrCreate, add_meal_to_user).get()

router.route('/meal_eaten/:user_meal_id').put(edit_meal_eaten).delete(delete_meal_eaten)

router.route('/:_id').delete(delete_meal).put(edit_meal)

export default router
