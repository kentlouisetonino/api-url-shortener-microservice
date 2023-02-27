require('dotenv').config()
import cors from 'cors'
import express, { json, urlencoded } from 'express'
import mongoose, { ConnectOptions } from 'mongoose'
import morgan from 'morgan'
import HomeRouter from './router/HomeRouter'
import URLShortenerRouter from './router/URLShortenerRouter'

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const app = express()

// * listen for requests
app.listen(PORT, function () {
  console.log('Server is live at http://localhost:' + PORT)
})

// * connect with mongodb
mongoose.connect(MONGODB_URI ?? '', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions)

// * middlewares
app.use(morgan('tiny'))
app.use(urlencoded({ extended: true }))
app.use(json())
app.use(cors({ optionsSuccessStatus: 200 })) // * some legacy browsers choke on 204
app.use(express.static('public')) // * http://expressjs.com/en/starter/static-files.html

// * endpoints
app.use('/', HomeRouter)
app.use('/api', URLShortenerRouter)
