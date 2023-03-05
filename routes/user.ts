import express from 'express'
import { loginUser, signupUser } from '../controllers/user'

const router = express.Router()

router
  .post('/login', loginUser)
  .post('/signup', signupUser)

export default router
