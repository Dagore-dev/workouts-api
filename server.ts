import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import userRouter from './routes/user'
import workoutsRouter from './routes/workouts'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status - :response-time ms'))

app.get('/', (request, response) => {
  response.send({
    message: 'Hello'
  })
})

app.use('/api/v1/user/', userRouter)
app.use('/api/v1/workouts/', workoutsRouter)

const MONGO_URI = process.env.MONGO_URI
if (MONGO_URI != null) {
  mongoose.connect(MONGO_URI)
    .then(() => {
      const PORT = process.env.PORT ?? '8080'
      app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
      })
    })
    .catch(console.error)
} else {
  console.error('DB connection string not provided')
}
