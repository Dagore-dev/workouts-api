import express from 'express'
import User from '../models/user'

export function loginUser (request: express.Request, response: express.Response): void {
  response.send({ message: 'Login' })
}

export function signupUser (request: express.Request, response: express.Response): void {
  const { email, password } = request.body

  User.signup(email, password)
    .then(user => {
      response.send({ email, user })
    })
    .catch(error => {
      response.status(400)
      if (error instanceof Error) {
        response.send({ error: error.message })
      } else {
        response.send({ error })
      }
    })
}
