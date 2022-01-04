import lib from '../../../library/index.js'

const {
    aux: { read_query },
} = lib

const create = async (req, res, next) => {
    try {
        const { name, calories } = req.body
        const query = `INSERT INTO meal(name, calories) VALUES('${name}','${calories}') RETURNING *`

        const DB_res = await read_query(query)
        const is_meal_added = DB_res[1] === 1

        if (is_meal_added) {
            req.added_meal_id = DB_res[0][0]._id
            next()
        } else {
            res.status(404).send({ success: false, msg: 'Meal not added' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: 'Server error' })
    }
}

const checkExistentMealOrCreate = async (req, res, next) => {
    try {
        const { name } = req.body
        const query = `SELECT name, _id FROM meal WHERE name='${name}'`

        const DB_res = await read_query(query)
        console.log(DB_res)
        const isExistentMeal = DB_res[1].rowCount

        if (isExistentMeal) {
            req.added_meal_id = DB_res[0][0]._id
            next()
        } else {
            await create(req, res, next)
        }
    } catch (error) {
        res.status(500).send({ msg: 'Server error' })
    }
}

const add_meal_to_user = async (req, res, next) => {
    try {
        const meal_id = req.added_meal_id
        const { uid } = req.user
        const { time_eaten } = req.body

        const query = `INSERT INTO user_meal(user_id, meal_id, time_eaten) VALUES('${uid}','${meal_id}', '${time_eaten}') RETURNING meal_id, time_eaten, user_meal_id`

        const DB_res = await read_query(query)
        const is_meal_added = DB_res[1] === 1

        const meal_added = DB_res[0]

        if (is_meal_added) {
            res.status(201).send({ success: true, meal_added })
        } else {
            res.status(404).send({ success: false, msg: 'Meal not added' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: 'Server error' })
    }
}

const get_meal = async (req, res, next) => {
    try {
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: 'Server error' })
    }
}

const delete_meal = async (req, res, next) => {
    try {
        const { _id } = req.params
        const query = `DELETE FROM meal WHERE _id='${_id}'`

        const DB_response = await read_query(query)

        const isDeleted = DB_response[1].rowCount

        if (isDeleted) {
            res.status(203).send({
                msg: `Meal with ID ${_id} was successfully deleted from the database`,
            })
        } else {
            res.status(400).send({ msg: `Meal not deleted`, success: false })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: 'Server error' })
    }
}

const delete_meal_eaten = async (req, res, next) => {
    try {
        const { user_meal_id } = req.params
        const query = `DELETE FROM user_meal WHERE user_meal_id='${user_meal_id}'`

        const DB_response = await read_query(query)

        const isDeleted = DB_response[1].rowCount

        if (isDeleted) {
            res.status(203).send({
                msg: `Meal eaten with ID ${user_meal_id} was successfully deleted from the database`,
            })
        } else {
            res.status(400).send({
                msg: `Meal eaten not deleted`,
                success: false,
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: 'Server error' })
    }
}

const edit_meal = async (req, res, next) => {
    try {
        const { _id } = req.params
        const { name, calories } = req.body

        const query = `
            UPDATE meal
            SET name='${name}', calories='${calories}'
            WHERE _id='${_id}'
            RETURNING name, calories
        `

        const DB_response = await read_query(query)
        const updatedMeal = DB_response[0][0]

        if (updatedMeal) {
            res.status(200).send(updatedMeal)
        } else {
            res.status(404).send({ msg: 'Not updated' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: 'Server error' })
    }
}

const edit_meal_eaten = async (req, res, next) => {
    try {
        const { user_meal_id } = req.params
        const { time_eaten } = req.body

        const query = `UPDATE user_meal SET time_eaten='${time_eaten}' WHERE user_meal_id='${user_meal_id}' RETURNING *`

        const DB_response = await read_query(query)
        const updatedMeal = DB_response[0][0]

        if (updatedMeal) {
            res.status(200).send(updatedMeal)
        } else {
            res.status(404).send({ msg: 'Not updated' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: 'Server error' })
    }
}

const get_user_meal_data = async (req, res, next) => {
    try {
        const { uid } = req.user

        // Get all the food history
        // SELECT * FROM user_meal INNER JOIN meal ON (user_meal.meal_id = meal._id) WHERE user_meal.user_id ='ksQlDZVWM2fJlcbFEbAadzfiVRP2';

        const getAllMealsFromToday = `SELECT time_eaten, name, calories FROM user_meal INNER JOIN meal ON (user_meal.meal_id = meal._id) WHERE (user_meal.user_id ='${uid}') AND (user_meal.time_eaten::TIMESTAMP::DATE = CURRENT_DATE);`

        const getCaloriesSumYesterday = `SELECT SUM (meal.calories) AS calorie_total_yesterday FROM user_meal INNER JOIN meal ON (user_meal.meal_id = meal._id) WHERE (user_meal.user_id ='${uid}') AND (user_meal.time_eaten::TIMESTAMP::DATE =CURRENT_DATE - INTEGER '1');`
        const getCaloriesSumToday = `SELECT SUM (meal.calories) AS calorie_total_today FROM user_meal INNER JOIN meal ON (user_meal.meal_id = meal._id) WHERE (user_meal.user_id ='${uid}') AND (user_meal.time_eaten::TIMESTAMP::DATE =CURRENT_DATE);`

        const promisesList = [
            read_query(getCaloriesSumToday),
            read_query(getCaloriesSumYesterday),
            read_query(getAllMealsFromToday),
        ]

        const DB_response = await Promise.all(promisesList)

        const [{ calorie_total_today }] = DB_response[0][0]
        const [{ calorie_total_yesterday }] = DB_response[1][0]
        const mealsFromToday = DB_response[2][0]

        const response = {
            success: true,
            calorie_total_today,
            calorie_total_yesterday,
            mealsFromToday,
        }

        res.status(200).send(response)
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: 'Server error' })
    }
}

const meal_handlers = {
    add_meal_to_user,
    checkExistentMealOrCreate,
    get_meal,
    edit_meal,
    delete_meal,
    edit_meal_eaten,
    delete_meal_eaten,
    get_user_meal_data,
}

export default meal_handlers
