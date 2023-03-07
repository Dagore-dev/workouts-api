import express from 'express'
import Workout from '../models/workouts'
import mongoose from 'mongoose'
import IAuthorizedRequest from '../interfaces/IAuthorizedRequest'

export function createWorkout (request: express.Request, response: express.Response): void {
  const { title, repetitions, load } = request.body
  const userId = (request as IAuthorizedRequest).user?._id

  const emptyFields: string[] = []

  if (title == null || title.length === 0) {
    emptyFields.push('title')
  }

  if (repetitions == null || repetitions === 0 || repetitions.length === 0) {
    emptyFields.push('repetitions')
  }

  if (load == null || load.length === 0) {
    emptyFields.push('load')
  }

  if (userId == null) {
    emptyFields.push('userId')
  }

  if (emptyFields.length > 0) {
    console.log(emptyFields)

    response
      .status(400)
      .send({ error: 'Por favor, rellena todos los campos.', emptyFields })
    return
  }

  Workout.create({ title, repetitions, load, userId })
    .then(workout => {
      response
        .status(200)
        .send(workout)
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

export function getAllWorkouts (request: express.Request, response: express.Response): void {
  const userId = (request as IAuthorizedRequest).user?._id
  if (userId == null) {
    response
      .status(400)
      .send({ error: 'Error inesperado.' })
    return
  }

  Workout.find({ userId }).sort({ createdAt: -1 })
    .then(workouts => response.send({ workouts }))
    .catch(error => {
      response.status(400)
      if (error instanceof Error) {
        response.send({ error: error.message })
      } else {
        response.send({ error })
      }
    })
}

export function getWorkoutById (request: express.Request, response: express.Response): void {
  const { id } = request.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    response
      .status(400)
      .send({
        error: 'Bad request'
      })

    return
  }

  Workout.findById(id)
    .then(workout => {
      if (workout != null) {
        response.send(workout)
      } else {
        response
          .status(404)
          .send({
            error: `Workout with id: "${id}" not found`
          })
      }
    })
    .catch(error => {
      response.status(500)
      if (error instanceof Error) {
        response.send({ error: error.message })
      } else {
        response.send({ error })
      }
    })
}

export function deleteWorkoutById (request: express.Request, response: express.Response): void {
  const { id } = request.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    response
      .status(400)
      .send({
        error: 'Bad request'
      })

    return
  }

  Workout.findByIdAndDelete(id)
    .then(workout => {
      if (workout != null) {
        response.send(workout)
      } else {
        response
          .status(404)
          .send({
            error: `Workout with id: "${id}" not found`
          })
      }
    })
    .catch(error => {
      response.status(500)
      if (error instanceof Error) {
        response.send({ error: error.message })
      } else {
        response.send({ error })
      }
    })
}

export function updateWorkoutById (request: express.Request, response: express.Response): void {
  const { id } = request.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    response
      .status(400)
      .send({
        error: 'Bad request'
      })

    return
  }

  Workout.findByIdAndUpdate(id, { ...request.body }, { new: true })
    .then(workout => {
      if (workout != null) {
        response.send(workout)
      } else {
        response
          .status(404)
          .send({
            error: `Workout with id: "${id}" not found`
          })
      }
    })
    .catch(error => {
      response.status(500)
      if (error instanceof Error) {
        response.send({ error: error.message })
      } else {
        response.send({ error })
      }
    })
}
