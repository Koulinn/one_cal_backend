import express from 'express'
import meal_handlers from './meal_handlers.js'
import FirebaseAuthService from '../../../firebase/firebase_auth.js'
const { authorizeUser } = FirebaseAuthService

const {
    add_meal_to_user,
    checkExistentMealOrCreate,
    delete_meal,
    edit_meal,
    edit_meal_eaten,
    delete_meal_eaten,
} = meal_handlers

const router = express.Router()

router
    .route('/')
    .post(authorizeUser, checkExistentMealOrCreate, add_meal_to_user)
    .get()

router
    .route('/meal_eaten/:user_meal_id')
    .put(authorizeUser, edit_meal_eaten)
    .delete(authorizeUser, delete_meal_eaten)

router
    .route('/:_id')
    .delete(authorizeUser, delete_meal)
    .put(authorizeUser, edit_meal)

export default router
