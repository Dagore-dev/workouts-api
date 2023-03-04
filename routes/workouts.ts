import express from 'express'
import { createWorkout, deleteWorkoutById, getAllWorkouts, getWorkoutById, updateWorkoutById } from '../controllers/workouts'

const router = express.Router()

router
  .get('/', getAllWorkouts)
  .get('/:id', getWorkoutById)
  .post('/', createWorkout)
  .patch('/:id', updateWorkoutById)
  .delete('/:id', deleteWorkoutById)

export default router
