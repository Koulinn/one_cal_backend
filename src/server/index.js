import express from 'express'
import cors from 'cors'
import config from '../config/index.js'
import '../DB/index.js'
import userRoutes from './services/user/index.js'

const {
    globalVariables: { PORT },
} = config

const server = express()

server.use(cors())
server.use(express.json())

server.use('/user', userRoutes)

server.listen(PORT, () => console.log('Server listening on ' + PORT))
server.on('error', (error) => console.log('Server crashed due ' + error))
