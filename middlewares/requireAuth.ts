import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/user'
import IAuthorizedRequest from '../interfaces/IAuthorizedRequest'

export default function requireAuth (request: express.Request, response: express.Response, next: express.NextFunction): void {
  const { authorization } = request.headers
  if (authorization == null || authorization.length === 0) {
    response
      .status(401)
      .send({ error: 'Requiere token de autorización' })
    return
  }

  const secret = process.env.SECRET
  if (secret == null) {
    throw new Error('No variable named "SECRET" in environment.')
  }
  const token = authorization.split(' ')[1]

  try {
    const decoded = jwt.verify(token, secret)
    const { id } = decoded as jwt.JwtPayload
    User.findById(id)
      .then(user => {
        if (user != null) {
          (request as IAuthorizedRequest).user = user
          next()
        } else {
          response
            .status(400)
            .send({ error: 'El usuario no existe.' })
        }
      })
      .catch(error => {
        response
          .status(401)
          .send({ error })
      })
  } catch (e) {
    console.error(e)
    response
      .status(401)
      .send({ error: 'Petición no autorizada.' })
  }
}
